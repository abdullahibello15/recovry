export type ApiMethod = "GET" | "POST" | "PATCH";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";
const AUTH_TOKEN_STORAGE_KEY = "auth_token";

let authToken =
  typeof window !== "undefined"
    ? window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY)
    : null;

async function request<T>(
  path: string,
  method: ApiMethod = "GET",
  body?: unknown,
): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "API request failed");
  }

  return response.json() as Promise<T>;
}

function persistAuthToken(token: string | null) {
  authToken = token;

  if (typeof window === "undefined") {
    return;
  }

  if (token) {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  } else {
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }
}

export const api = {
  get: <T>(path: string) => request<T>(path, "GET"),
  post: <T>(path: string, body?: unknown) => request<T>(path, "POST", body),
  patch: <T>(path: string, body?: unknown) => request<T>(path, "PATCH", body),
  getAuthToken: () => authToken,
  setAuthToken: (token: string | null) => persistAuthToken(token),
};
