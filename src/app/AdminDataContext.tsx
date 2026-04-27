import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { useAuth } from "./AuthContext";

export type AdminClientRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  riskLevel: "Low" | "Medium" | "High";
  status: "Active" | "Pending" | "Dormant";
};

export type AdminCaseRecord = {
  id: string;
  clientId: string;
  title: string;
  type: string;
  amount: number;
  status:
    | "Intake"
    | "Evidence review"
    | "Tracing"
    | "Recovery action"
    | "Resolved";
  priority: "Low" | "Medium" | "High" | "Critical";
  assignedTo: string;
};

export type AdminTaskRecord = {
  id: string;
  caseId: string;
  title: string;
  owner: string;
  dueDate: string;
  completed: boolean;
};

type NewClientInput = Omit<AdminClientRecord, "id">;
type NewCaseInput = Omit<AdminCaseRecord, "id">;
type NewTaskInput = Omit<AdminTaskRecord, "id" | "completed">;

type AdminDataContextType = {
  clients: AdminClientRecord[];
  cases: AdminCaseRecord[];
  tasks: AdminTaskRecord[];
  addClient: (input: NewClientInput) => void;
  addCase: (input: NewCaseInput) => void;
  addTask: (input: NewTaskInput) => void;
  updateCaseStatus: (caseId: string, status: AdminCaseRecord["status"]) => void;
  updateCasePriority: (
    caseId: string,
    priority: AdminCaseRecord["priority"],
  ) => void;
  toggleTask: (taskId: string) => void;
  getClientName: (clientId: string) => string;
  metrics: {
    activeClients: number;
    openCases: number;
    resolvedCases: number;
    pendingTasks: number;
    pipelineValue: number;
    urgentCases: number;
  };
};

const seedClients: AdminClientRecord[] = [
  {
    id: "cl-1",
    name: "Evelyn Carter",
    email: "evelyn.carter@example.com",
    phone: "+1 (555) 201-4401",
    riskLevel: "High",
    status: "Active",
  },
  {
    id: "cl-2",
    name: "Daniel Brooks",
    email: "daniel.brooks@example.com",
    phone: "+1 (555) 334-8218",
    riskLevel: "Medium",
    status: "Active",
  },
  {
    id: "cl-3",
    name: "Sophia Reed",
    email: "sophia.reed@example.com",
    phone: "+1 (555) 912-0027",
    riskLevel: "Medium",
    status: "Pending",
  },
];

const seedCases: AdminCaseRecord[] = [
  {
    id: "1234",
    clientId: "cl-1",
    title: "Crypto Recovery",
    type: "Bitcoin scam",
    amount: 50000,
    status: "Tracing",
    priority: "Critical",
    assignedTo: "Miriam Okeke",
  },
  {
    id: "1200",
    clientId: "cl-2",
    title: "Investment Fraud",
    type: "Ponzi scheme",
    amount: 30000,
    status: "Resolved",
    priority: "Medium",
    assignedTo: "Tunde Hassan",
  },
  {
    id: "1277",
    clientId: "cl-3",
    title: "Wallet Compromise",
    type: "Unauthorized withdrawal",
    amount: 41500,
    status: "Evidence review",
    priority: "High",
    assignedTo: "Rina Cole",
  },
];

const seedTasks: AdminTaskRecord[] = [
  {
    id: "task-1",
    caseId: "1234",
    title: "Review exchange subpoena response",
    owner: "Miriam Okeke",
    dueDate: "2026-04-27",
    completed: false,
  },
  {
    id: "task-2",
    caseId: "1277",
    title: "Verify uploaded wallet screenshots",
    owner: "Rina Cole",
    dueDate: "2026-04-26",
    completed: false,
  },
  {
    id: "task-3",
    caseId: "1200",
    title: "Confirm final payout receipt",
    owner: "Tunde Hassan",
    dueDate: "2026-04-25",
    completed: true,
  },
];

const AdminDataContext = createContext<AdminDataContextType | undefined>(
  undefined,
);

function readInitialState() {
  return { clients: seedClients, cases: seedCases, tasks: seedTasks };
}

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [state, setState] = useState(readInitialState);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated || user?.role !== "admin") {
      setState(readInitialState());
      return;
    }

    let active = true;

    api
      .get<{
        clients: AdminClientRecord[];
        cases: AdminCaseRecord[];
        tasks: AdminTaskRecord[];
      }>("/admin-data")
      .then((data) => {
        if (active) {
          setState(data);
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [isAuthenticated, isLoading, user?.role]);

  const addClient = (input: NewClientInput) => {
    void api
      .post<AdminClientRecord>("/admin-data/clients", input)
      .then((record) => {
        setState((current) => ({
          ...current,
          clients: [...current.clients, record],
        }));
      });
  };

  const addCase = (input: NewCaseInput) => {
    void api.post<AdminCaseRecord>("/admin-data/cases", input).then((record) => {
      setState((current) => ({
        ...current,
        cases: [...current.cases, record],
      }));
    });
  };

  const addTask = (input: NewTaskInput) => {
    void api.post<AdminTaskRecord>("/admin-data/tasks", input).then((record) => {
      setState((current) => ({
        ...current,
        tasks: [...current.tasks, record],
      }));
    });
  };

  const updateCaseStatus = (
    caseId: string,
    status: AdminCaseRecord["status"],
  ) => {
    void api.patch(`/admin-data/cases/${caseId}`, { status }).then(() => {
      setState((current) => ({
        ...current,
        cases: current.cases.map((caseItem) =>
          caseItem.id === caseId ? { ...caseItem, status } : caseItem,
        ),
      }));
    });
  };

  const updateCasePriority = (
    caseId: string,
    priority: AdminCaseRecord["priority"],
  ) => {
    void api.patch(`/admin-data/cases/${caseId}`, { priority }).then(() => {
      setState((current) => ({
        ...current,
        cases: current.cases.map((caseItem) =>
          caseItem.id === caseId ? { ...caseItem, priority } : caseItem,
        ),
      }));
    });
  };

  const toggleTask = (taskId: string) => {
    void api.patch(`/admin-data/tasks/${taskId}`).then(() => {
      setState((current) => ({
        ...current,
        tasks: current.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task,
        ),
      }));
    });
  };

  const getClientName = (clientId: string) =>
    state.clients.find((client) => client.id === clientId)?.name ?? "Unknown client";

  const metrics = useMemo(() => {
    const activeClients = state.clients.filter(
      (client) => client.status === "Active",
    ).length;
    const openCases = state.cases.filter(
      (caseItem) => caseItem.status !== "Resolved",
    ).length;
    const resolvedCases = state.cases.filter(
      (caseItem) => caseItem.status === "Resolved",
    ).length;
    const pendingTasks = state.tasks.filter((task) => !task.completed).length;
    const pipelineValue = state.cases
      .filter((caseItem) => caseItem.status !== "Resolved")
      .reduce((sum, caseItem) => sum + caseItem.amount, 0);
    const urgentCases = state.cases.filter(
      (caseItem) => caseItem.priority === "Critical" || caseItem.priority === "High",
    ).length;

    return {
      activeClients,
      openCases,
      resolvedCases,
      pendingTasks,
      pipelineValue,
      urgentCases,
    };
  }, [state.cases, state.clients, state.tasks]);

  return (
    <AdminDataContext.Provider
      value={{
        clients: state.clients,
        cases: state.cases,
        tasks: state.tasks,
        addClient,
        addCase,
        addTask,
        updateCaseStatus,
        updateCasePriority,
        toggleTask,
        getClientName,
        metrics,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
};
