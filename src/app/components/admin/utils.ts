import {
  BadgeDollarSign,
  BriefcaseBusiness,
  ShieldCheck,
  Users,
} from "lucide-react";
import type {
  AlertSeverity,
  AlertState,
  ApprovalState,
  CommunicationStatus,
  ModuleEventTone,
  SummaryCard,
} from "./types";

export function getSummaryIcon(icon: SummaryCard["icon"]) {
  if (icon === "briefcase") {
    return BriefcaseBusiness;
  }

  if (icon === "badge-dollar") {
    return BadgeDollarSign;
  }

  if (icon === "users") {
    return Users;
  }

  return ShieldCheck;
}

export function statusBadgeClasses(status: string) {
  if (status === "Escalated") {
    return "bg-red-100 text-red-700 border-red-200";
  }

  if (status === "Legal review") {
    return "bg-amber-100 text-amber-800 border-amber-200";
  }

  if (status === "Recovery in progress") {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
}

export function severityBadgeClasses(severity: AlertSeverity) {
  if (severity === "Critical") {
    return "bg-red-100 text-red-700";
  }

  if (severity === "High") {
    return "bg-amber-100 text-amber-800";
  }

  return "bg-slate-100 text-slate-700";
}

export function alertStateBadgeClasses(state: AlertState) {
  if (state === "Resolved") {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }

  if (state === "Under review") {
    return "bg-blue-100 text-blue-700 border-blue-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
}

export function approvalStateBadgeClasses(state: ApprovalState) {
  if (state === "Approved") {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }

  if (state === "On hold") {
    return "bg-amber-100 text-amber-800 border-amber-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
}

export function communicationStateBadgeClasses(status: CommunicationStatus) {
  if (status === "Sent") {
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  }

  if (status === "Needs review") {
    return "bg-amber-100 text-amber-800 border-amber-200";
  }

  if (status === "Scheduled") {
    return "bg-blue-100 text-blue-700 border-blue-200";
  }

  return "bg-slate-100 text-slate-700 border-slate-200";
}

export function eventToneClasses(tone: ModuleEventTone) {
  if (tone === "success") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (tone === "warning") {
    return "bg-amber-100 text-amber-800";
  }

  return "bg-slate-100 text-slate-700";
}
