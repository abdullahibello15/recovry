import type {
  AdminPortalState,
  OperationFeedItem,
  PriorityCase,
  SummaryCard,
  TeamMember,
  WorkflowStage,
} from "./types";

export const summaryCards: SummaryCard[] = [
  {
    title: "Open investigations",
    value: "156",
    note: "18 high-risk cases require review today",
    icon: "briefcase",
  },
  {
    title: "Recovery pipeline",
    value: "$2.84M",
    note: "$420K expected to close this week",
    icon: "badge-dollar",
  },
  {
    title: "Active clients",
    value: "42",
    note: "7 new intakes since Monday",
    icon: "users",
  },
  {
    title: "Compliance readiness",
    value: "94%",
    note: "2 documents pending before audit lock",
    icon: "shield",
  },
];

export const priorityQueue: PriorityCase[] = [
  {
    caseId: "FR-1284",
    client: "Evelyn Carter",
    issue: "Exchange withdrawal freeze",
    owner: "M. Okeke",
    status: "Escalated",
    recovery: "$180,000",
  },
  {
    caseId: "FR-1281",
    client: "Daniel Brooks",
    issue: "Wire fraud tracing",
    owner: "T. Hassan",
    status: "Legal review",
    recovery: "$95,000",
  },
  {
    caseId: "FR-1277",
    client: "Sophia Reed",
    issue: "Wallet compromise",
    owner: "A. Cole",
    status: "Evidence requested",
    recovery: "$41,500",
  },
  {
    caseId: "FR-1274",
    client: "Noah Bennett",
    issue: "Investment platform scam",
    owner: "R. Adeyemi",
    status: "Recovery in progress",
    recovery: "$230,000",
  },
];

export const teamWorkload: TeamMember[] = [
  {
    analyst: "Miriam Okeke",
    focus: "Crypto tracing",
    load: 92,
    cases: 14,
    sla: "2 urgent items",
  },
  {
    analyst: "Tunde Hassan",
    focus: "Banking disputes",
    load: 76,
    cases: 11,
    sla: "On track",
  },
  {
    analyst: "Rina Cole",
    focus: "Client verification",
    load: 68,
    cases: 9,
    sla: "Awaiting files",
  },
];

export const operationsFeed: OperationFeedItem[] = [
  {
    title: "Escalation cleared for FR-1274",
    detail: "Counterparty disclosure received and transferred to legal.",
    time: "12 minutes ago",
  },
  {
    title: "3 new consultations assigned",
    detail: "High-value leads routed to the investigations pod.",
    time: "38 minutes ago",
  },
  {
    title: "Compliance reminder triggered",
    detail: "KYC refresh is overdue for 2 active recovery cases.",
    time: "1 hour ago",
  },
  {
    title: "Client update sent",
    detail: "Weekly status digest delivered to 11 active clients.",
    time: "2 hours ago",
  },
];

export const workflowStages: WorkflowStage[] = [
  { label: "Intake", count: 12, color: "bg-sky-500" },
  { label: "Evidence review", count: 19, color: "bg-amber-500" },
  { label: "Tracing", count: 26, color: "bg-indigo-500" },
  { label: "Recovery action", count: 15, color: "bg-emerald-500" },
  { label: "Resolved", count: 84, color: "bg-slate-900" },
];

export const initialAdminPortalState: AdminPortalState = {
  alerts: [
    {
      id: "AL-204",
      severity: "Critical",
      headline: "Suspicious payout instruction flagged",
      detail:
        "FR-1284 includes a destination wallet that failed prior screening.",
      owner: "Compliance desk",
      state: "Open",
    },
    {
      id: "AL-198",
      severity: "High",
      headline: "Duplicate identity document detected",
      detail:
        "Client onboarding pack for FR-1277 requires manual verification.",
      owner: "Client verification",
      state: "Open",
    },
    {
      id: "AL-193",
      severity: "Medium",
      headline: "High-volume inbound messages",
      detail:
        "A potential scam cluster is affecting 4 new consultation requests.",
      owner: "Intake team",
      state: "Open",
    },
  ],
  approvals: [
    {
      item: "Release external trace request",
      subject: "FR-1281",
      amount: "$12,400 fee reserve",
      approver: "Legal + finance",
      state: "Pending",
    },
    {
      item: "Client reimbursement transfer",
      subject: "FR-1200",
      amount: "$25,000 recovery payout",
      approver: "Finance controller",
      state: "Pending",
    },
    {
      item: "Evidence vendor invoice",
      subject: "FR-1274",
      amount: "$3,600 due today",
      approver: "Operations lead",
      state: "Pending",
    },
  ],
  communications: [
    {
      audience: "11 active clients",
      title: "Weekly recovery status digest",
      status: "Ready to send",
      note: "Includes updated milestones and pending document requests.",
    },
    {
      audience: "New consultation leads",
      title: "Intake expectation setting",
      status: "Needs review",
      note: "Clarifies required evidence before assigning an analyst.",
    },
    {
      audience: "Dormant cases",
      title: "Re-engagement campaign",
      status: "Scheduled",
      note: "Targets clients waiting more than 21 days on missing paperwork.",
    },
  ],
  moduleEvents: [
    {
      id: "evt-1",
      title: "Module activated",
      detail: "Risk, approvals, and comms controls are ready for admin actions.",
      tone: "neutral",
    },
  ],
};
