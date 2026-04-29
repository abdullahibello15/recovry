import { createServer } from "node:http";
import { promises as fs } from "node:fs";
import path from "node:path";
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "db.json");
const port = Number(process.env.API_PORT || 8787);
const host = "127.0.0.1";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7;
const PASSWORD_HASH_PREFIX = "scrypt";
const initialDbSnapshot = JSON.parse(await fs.readFile(dbPath, "utf8"));

async function readDb() {
  const raw = await fs.readFile(dbPath, "utf8");
  return JSON.parse(raw);
}

async function writeDb(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

function json(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end(JSON.stringify(payload));
}

function notFound(res) {
  json(res, 404, { error: "Not found" });
}

function unauthorized(res, message = "Unauthorized") {
  json(res, 401, { error: message });
}

function forbidden(res, message = "Forbidden") {
  json(res, 403, { error: message });
}

function badRequest(res, message) {
  json(res, 400, { error: message });
}

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(String(password), salt, 64).toString("hex");
  return `${PASSWORD_HASH_PREFIX}:${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  if (!storedHash?.startsWith(`${PASSWORD_HASH_PREFIX}:`)) {
    return false;
  }

  const [, salt, expectedHash] = storedHash.split(":");
  if (!salt || !expectedHash) {
    return false;
  }

  const actual = scryptSync(String(password), salt, 64);
  const expected = Buffer.from(expectedHash, "hex");

  return expected.length === actual.length && timingSafeEqual(actual, expected);
}

function verifyLegacyPassword(password, user) {
  return typeof user.password === "string" && user.password === String(password);
}

function upgradeLegacyPassword(user, password) {
  user.passwordHash = hashPassword(password);
  delete user.password;
}

async function parseBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  if (chunks.length === 0) {
    return {};
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function addAdminEvent(db, title, detail, tone) {
  db.adminPortal.moduleEvents = [
    {
      id: `evt-${Date.now()}`,
      title,
      detail,
      tone,
    },
    ...db.adminPortal.moduleEvents.slice(0, 4),
  ];
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

function validateSignupInput(body) {
  if (!body.name?.trim()) {
    return "Full name is required";
  }
  if (!isValidEmail(body.email)) {
    return "A valid email address is required";
  }
  if (!body.password || String(body.password).length < 8) {
    return "Password must be at least 8 characters";
  }
  return null;
}

function validateContactSubmission(body) {
  if (!body.name?.trim()) {
    return "Full name is required";
  }
  if (!isValidEmail(body.email)) {
    return "A valid email address is required";
  }
  if (!body.phone?.trim()) {
    return "Phone number is required";
  }
  if (!body.message?.trim() || body.message.trim().length < 10) {
    return "Message must be at least 10 characters";
  }
  return null;
}

function validateConsultationSubmission(body) {
  if (!body.name?.trim()) {
    return "Full name is required";
  }
  if (!isValidEmail(body.email)) {
    return "A valid email address is required";
  }
  if (!body.phone?.trim()) {
    return "Phone number is required";
  }
  if (!body.scamType?.trim()) {
    return "Please select a scam type";
  }
  if (!body.amountRange?.trim()) {
    return "Please select an amount range";
  }
  if (!body.description?.trim() || body.description.trim().length < 20) {
    return "Incident description must be at least 20 characters";
  }
  if (body.consent !== true) {
    return "Consent is required before submitting";
  }
  return null;
}

function ensureAuthState(db) {
  if (!db.auth) {
    db.auth = { users: [], sessions: [] };
  }

  if (!Array.isArray(db.auth.users)) {
    db.auth.users = [];
  }

  if (!Array.isArray(db.auth.sessions)) {
    db.auth.sessions = [];
  }
}

function sanitizeUser(user) {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  };
}

function getBearerToken(req) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  return authHeader.slice("Bearer ".length).trim();
}

async function getSessionUser(req) {
  const token = getBearerToken(req);
  if (!token) {
    return null;
  }

  const db = await readDb();
  ensureAuthState(db);

  const now = Date.now();
  const activeSessions = db.auth.sessions.filter(
    (session) => new Date(session.expiresAt).getTime() > now,
  );

  if (activeSessions.length !== db.auth.sessions.length) {
    db.auth.sessions = activeSessions;
    await writeDb(db);
  }

  const session = activeSessions.find((entry) => entry.token === token);
  if (!session) {
    return null;
  }

  const user = db.auth.users.find((entry) => entry.id === session.userId);
  if (!user) {
    return null;
  }

  return { db, session, token, user };
}

async function requireAuth(req, res) {
  const sessionUser = await getSessionUser(req);
  if (!sessionUser) {
    unauthorized(res);
    return null;
  }
  return sessionUser;
}

async function requireRole(req, res, role) {
  const sessionUser = await requireAuth(req, res);
  if (!sessionUser) {
    return null;
  }

  if (sessionUser.user.role !== role) {
    forbidden(res);
    return null;
  }

  return sessionUser;
}

const server = createServer(async (req, res) => {
  if (!req.url) {
    return notFound(res);
  }

  if (req.method === "OPTIONS") {
    return json(res, 204, {});
  }

  const url = new URL(req.url, `http://localhost:${port}`);
  const pathname = url.pathname;

  try {
    if (req.method === "GET" && pathname === "/api/health") {
      return json(res, 200, { ok: true });
    }

    if (req.method === "POST" && pathname === "/api/contact-submissions") {
      const db = await readDb();
      const body = await parseBody(req);
      const validationError = validateContactSubmission(body);

      if (validationError) {
        return badRequest(res, validationError);
      }

      const submission = {
        id: `contact-${Date.now()}`,
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        subject: body.subject?.trim() || "General inquiry",
        message: body.message.trim(),
        createdAt: new Date().toISOString(),
      };

      db.contactSubmissions.push(submission);
      await writeDb(db);

      return json(res, 201, {
        ok: true,
        message: "Your message has been received. We'll contact you within 24 hours.",
      });
    }

    if (req.method === "POST" && pathname === "/api/consultation-submissions") {
      const db = await readDb();
      const body = await parseBody(req);
      const validationError = validateConsultationSubmission(body);

      if (validationError) {
        return badRequest(res, validationError);
      }

      const submission = {
        id: `consult-${Date.now()}`,
        name: body.name.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        scamType: body.scamType.trim(),
        amountRange: body.amountRange.trim(),
        description: body.description.trim(),
        consent: true,
        createdAt: new Date().toISOString(),
      };

      db.consultationSubmissions.push(submission);
      await writeDb(db);

      return json(res, 201, {
        ok: true,
        message:
          "Your consultation request has been submitted. A recovery specialist will contact you within 24 hours.",
      });
    }

    if (req.method === "POST" && pathname === "/api/auth/login") {
      const db = await readDb();
      ensureAuthState(db);
      const { email, password } = await parseBody(req);

      if (!email || !password) {
        return unauthorized(res, "Email and password are required");
      }

      const user = db.auth.users.find(
        (entry) => entry.email.toLowerCase() === String(email).toLowerCase(),
      );

      const isValidPassword =
        user &&
        (verifyPassword(password, user.passwordHash) ||
          verifyLegacyPassword(password, user));

      if (!user || !isValidPassword) {
        return unauthorized(res, "Invalid email or password");
      }

      if (!user.passwordHash) {
        upgradeLegacyPassword(user, password);
      }

      db.auth.sessions = db.auth.sessions.filter(
        (session) => session.userId !== user.id,
      );

      const token = randomUUID();
      const expiresAt = new Date(Date.now() + SESSION_TTL_MS).toISOString();

      db.auth.sessions.push({
        token,
        userId: user.id,
        expiresAt,
      });
      await writeDb(db);

      return json(res, 200, {
        token,
        user: sanitizeUser(user),
      });
    }

    if (req.method === "POST" && pathname === "/api/auth/signup") {
      const db = await readDb();
      ensureAuthState(db);
      const body = await parseBody(req);
      const validationError = validateSignupInput(body);

      if (validationError) {
        return badRequest(res, validationError);
      }

      const email = String(body.email).trim().toLowerCase();
      const existingUser = db.auth.users.find(
        (entry) => entry.email.toLowerCase() === email,
      );

      if (existingUser) {
        return badRequest(res, "An account with this email already exists");
      }

      const user = {
        id: `user-${Date.now()}`,
        email,
        passwordHash: hashPassword(body.password),
        role: "client",
        name: String(body.name).trim(),
      };

      db.auth.users.push(user);
      await writeDb(db);

      return json(res, 201, {
        ok: true,
        user: sanitizeUser(user),
      });
    }

    if (req.method === "GET" && pathname === "/api/auth/session") {
      const sessionUser = await requireAuth(req, res);
      if (!sessionUser) {
        return;
      }

      return json(res, 200, { user: sanitizeUser(sessionUser.user) });
    }

    if (req.method === "POST" && pathname === "/api/auth/logout") {
      const token = getBearerToken(req);
      if (!token) {
        return json(res, 200, { ok: true });
      }

      const db = await readDb();
      ensureAuthState(db);
      db.auth.sessions = db.auth.sessions.filter((session) => session.token !== token);
      await writeDb(db);

      return json(res, 200, { ok: true });
    }

    if (req.method === "GET" && pathname === "/api/admin-data") {
      const sessionUser = await requireRole(req, res, "admin");
      if (!sessionUser) {
        return;
      }

      return json(res, 200, sessionUser.db.adminData);
    }

    if (req.method === "POST" && pathname === "/api/admin-data/clients") {
      const sessionUser = await requireRole(req, res, "admin");
      if (!sessionUser) {
        return;
      }

      const body = await parseBody(req);
      const record = { id: `cl-${Date.now()}`, ...body };
      sessionUser.db.adminData.clients.push(record);
      await writeDb(sessionUser.db);
      return json(res, 201, record);
    }

    if (req.method === "POST" && pathname === "/api/admin-data/cases") {
      const sessionUser = await requireRole(req, res, "admin");
      if (!sessionUser) {
        return;
      }

      const body = await parseBody(req);
      const record = { id: `${Date.now()}`, ...body };
      sessionUser.db.adminData.cases.push(record);
      await writeDb(sessionUser.db);
      return json(res, 201, record);
    }

    if (req.method === "POST" && pathname === "/api/admin-data/tasks") {
      const sessionUser = await requireRole(req, res, "admin");
      if (!sessionUser) {
        return;
      }

      const body = await parseBody(req);
      const record = { id: `task-${Date.now()}`, completed: false, ...body };
      sessionUser.db.adminData.tasks.push(record);
      await writeDb(sessionUser.db);
      return json(res, 201, record);
    }

    if (req.method === "PATCH" && pathname.startsWith("/api/admin-data/cases/")) {
      const sessionUser = await requireRole(req, res, "admin");
      if (!sessionUser) {
        return;
      }

      const caseId = pathname.split("/").pop();
      const body = await parseBody(req);
      sessionUser.db.adminData.cases = sessionUser.db.adminData.cases.map((caseItem) =>
        caseItem.id === caseId ? { ...caseItem, ...body } : caseItem,
      );
      await writeDb(sessionUser.db);
      return json(res, 200, { ok: true });
    }

    if (req.method === "PATCH" && pathname.startsWith("/api/admin-data/tasks/")) {
      const sessionUser = await requireRole(req, res, "admin");
      if (!sessionUser) {
        return;
      }

      const taskId = pathname.split("/").pop();
      sessionUser.db.adminData.tasks = sessionUser.db.adminData.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      );
      await writeDb(sessionUser.db);
      return json(res, 200, { ok: true });
    }

    if (req.method === "GET" && pathname === "/api/messages") {
      const sessionUser = await requireAuth(req, res);
      if (!sessionUser) {
        return;
      }

      return json(res, 200, sessionUser.db.messages);
    }

    if (req.method === "POST" && pathname === "/api/messages") {
      const sessionUser = await requireAuth(req, res);
      if (!sessionUser) {
        return;
      }

      const body = await parseBody(req);
      const message = {
        id: `msg-${Date.now()}`,
        timestamp: new Date().toISOString(),
        ...body,
      };
      sessionUser.db.messages.push(message);
      await writeDb(sessionUser.db);
      return json(res, 201, message);
    }

    if (req.method === "PATCH" && pathname === "/api/messages/read") {
      const sessionUser = await requireAuth(req, res);
      if (!sessionUser) {
        return;
      }

      const { role } = await parseBody(req);
      sessionUser.db.messages = sessionUser.db.messages.map((message) =>
        role === "admin"
          ? { ...message, readByAdmin: true }
          : { ...message, readByClient: true },
      );
      await writeDb(sessionUser.db);
      return json(res, 200, { ok: true });
    }

    if (req.method === "GET" && pathname === "/api/admin-portal") {
      const sessionUser = await requireRole(req, res, "admin");
      if (!sessionUser) {
        return;
      }

      return json(res, 200, sessionUser.db.adminPortal);
    }

    if (req.method === "POST" && pathname === "/api/admin-portal/action") {
      const sessionUser = await requireRole(req, res, "admin");
      if (!sessionUser) {
        return;
      }

      const body = await parseBody(req);

      if (body.type === "reviewAlert") {
        sessionUser.db.adminPortal.alerts = sessionUser.db.adminPortal.alerts.map((alert) =>
          alert.id === body.id && alert.state === "Open"
            ? { ...alert, state: "Under review" }
            : alert,
        );
        addAdminEvent(
          sessionUser.db,
          `Alert ${body.id} moved to review`,
          "The flagged item has been assigned for immediate follow-up.",
          "warning",
        );
      }

      if (body.type === "resolveAlert") {
        sessionUser.db.adminPortal.alerts = sessionUser.db.adminPortal.alerts.map((alert) =>
          alert.id === body.id ? { ...alert, state: "Resolved" } : alert,
        );
        addAdminEvent(
          sessionUser.db,
          `Alert ${body.id} resolved`,
          "The alert has been cleared from the active risk queue.",
          "success",
        );
      }

      if (body.type === "updateApproval") {
        sessionUser.db.adminPortal.approvals = sessionUser.db.adminPortal.approvals.map(
          (approval) =>
            approval.item === body.item
              ? { ...approval, state: body.state }
              : approval,
        );
        addAdminEvent(
          sessionUser.db,
          `${body.item} marked ${String(body.state).toLowerCase()}`,
          "Approval state updated by admin action.",
          body.state === "Approved" ? "success" : "warning",
        );
      }

      if (body.type === "sendCommunication") {
        sessionUser.db.adminPortal.communications = sessionUser.db.adminPortal.communications.map(
          (message) =>
            message.title === body.title ? { ...message, status: "Sent" } : message,
        );
        addAdminEvent(
          sessionUser.db,
          `Message sent to ${body.title}`,
          "Communication dispatched from the admin module.",
          "success",
        );
      }

      if (body.type === "reset") {
        sessionUser.db.adminPortal = structuredClone(initialDbSnapshot.adminPortal);
        await writeDb(sessionUser.db);
        return json(res, 200, sessionUser.db.adminPortal);
      }

      await writeDb(sessionUser.db);
      return json(res, 200, sessionUser.db.adminPortal);
    }

    return notFound(res);
  } catch (error) {
    return json(res, 500, {
      error: "Server error",
      detail: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

server.listen(port, host, () => {
  console.log(`API server listening on http://${host}:${port}`);
});
