export type SummaryCard = {
  title: string;
  value: string;
  note: string;
  icon: "briefcase" | "badge-dollar" | "users" | "shield";
};

export type PriorityCase = {
  caseId: string;
  client: string;
  issue: string;
  owner: string;
  status: string;
  recovery: string;
};

export type TeamMember = {
  analyst: string;
  focus: string;
  load: number;
  cases: number;
  sla: string;
};

export type OperationFeedItem = {
  title: string;
  detail: string;
  time: string;
};

export type WorkflowStage = {
  label: string;
  count: number;
  color: string;
};

export type AlertSeverity = "Critical" | "High" | "Medium";
export type AlertState = "Open" | "Under review" | "Resolved";
export type ApprovalState = "Pending" | "Approved" | "On hold";
export type CommunicationStatus =
  | "Ready to send"
  | "Needs review"
  | "Scheduled"
  | "Sent";
export type ModuleEventTone = "neutral" | "success" | "warning";

export type AlertItem = {
  id: string;
  severity: AlertSeverity;
  headline: string;
  detail: string;
  owner: string;
  state: AlertState;
};

export type ApprovalItem = {
  item: string;
  subject: string;
  amount: string;
  approver: string;
  state: ApprovalState;
};

export type CommunicationItem = {
  audience: string;
  title: string;
  status: CommunicationStatus;
  note: string;
};

export type ModuleEvent = {
  id: string;
  title: string;
  detail: string;
  tone: ModuleEventTone;
};

export type AdminPortalState = {
  alerts: AlertItem[];
  approvals: ApprovalItem[];
  communications: CommunicationItem[];
  moduleEvents: ModuleEvent[];
};
