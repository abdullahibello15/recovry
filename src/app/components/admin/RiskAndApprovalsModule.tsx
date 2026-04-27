import React from "react";
import {
  CircleCheckBig,
  FileCheck2,
  MessageSquareMore,
  Siren,
} from "lucide-react";
import { alertStateBadgeClasses, approvalStateBadgeClasses, communicationStateBadgeClasses, eventToneClasses, severityBadgeClasses } from "./utils";
import type { ModuleEvent } from "./types";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useAdminPortal } from "./useAdminPortal";

type RiskAndApprovalsModuleProps = {
  portal: ReturnType<typeof useAdminPortal>;
};

export const RiskAndApprovalsModule: React.FC<RiskAndApprovalsModuleProps> = ({
  portal,
}) => {
  const {
    alerts,
    approvals,
    communications,
    moduleEvents,
    criticalAlerts,
    pendingApprovals,
    messagesWaitingReview,
    readiness,
    reviewAlert,
    resolveAlert,
    updateApproval,
    sendCommunication,
    resetPortal,
  } = portal;

  return (
    <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Risk and approvals module</CardTitle>
            <CardDescription>
              Centralized review for fraud alerts, admin approvals, and outbound
              client communications
            </CardDescription>
          </div>
          <div className="flex gap-2 self-start">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Open incident playbook</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Incident response playbook</DialogTitle>
                  <DialogDescription>
                    Use this checklist when a flagged case requires immediate
                    admin attention.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3 text-sm text-slate-600">
                  <div className="rounded-xl bg-slate-50 p-3">
                    1. Freeze outbound movement on the affected case and log the
                    alert reference.
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    2. Assign legal or compliance review within 30 minutes for
                    critical incidents.
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    3. Notify the assigned analyst and prepare a client-safe
                    status update.
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={resetPortal}>
              Reset module
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="alerts" className="space-y-4">
            <TabsList className="grid h-auto w-full grid-cols-3">
              <TabsTrigger value="alerts" className="gap-2">
                <Siren className="h-4 w-4" />
                Alerts
              </TabsTrigger>
              <TabsTrigger value="approvals" className="gap-2">
                <FileCheck2 className="h-4 w-4" />
                Approvals
              </TabsTrigger>
              <TabsTrigger value="comms" className="gap-2">
                <MessageSquareMore className="h-4 w-4" />
                Comms
              </TabsTrigger>
            </TabsList>

            <TabsContent value="alerts" className="space-y-4">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">
                          {alert.headline}
                        </span>
                        <span
                          className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${severityBadgeClasses(alert.severity)}`}
                        >
                          {alert.severity}
                        </span>
                        <span
                          className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${alertStateBadgeClasses(alert.state)}`}
                        >
                          {alert.state}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600">{alert.detail}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                        {alert.id} • {alert.owner}
                      </p>
                    </div>
                    <div className="flex gap-2 self-start">
                      <Button
                        variant="outline"
                        onClick={() => reviewAlert(alert.id)}
                        disabled={alert.state !== "Open"}
                      >
                        Review
                      </Button>
                      <Button
                        onClick={() => resolveAlert(alert.id)}
                        disabled={alert.state === "Resolved"}
                      >
                        Resolve
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="approvals" className="space-y-3">
              {approvals.map((approval) => (
                <div
                  key={approval.item}
                  className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-medium text-slate-900">{approval.item}</p>
                    <p className="text-sm text-slate-600">
                      {approval.subject} • {approval.amount}
                    </p>
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      {approval.approver}
                    </p>
                    <div className="mt-2">
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${approvalStateBadgeClasses(approval.state)}`}
                      >
                        {approval.state}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => updateApproval(approval.item, "On hold")}
                      disabled={approval.state === "Approved"}
                    >
                      Hold
                    </Button>
                    <Button
                      onClick={() => updateApproval(approval.item, "Approved")}
                      disabled={approval.state === "Approved"}
                    >
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="comms" className="space-y-3">
              {communications.map((message) => (
                <div
                  key={message.title}
                  className="rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-slate-900">{message.title}</p>
                      <p className="text-sm text-slate-600">{message.note}</p>
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                        {message.audience}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${communicationStateBadgeClasses(message.status)}`}
                      >
                        {message.status}
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => sendCommunication(message.title)}
                        disabled={
                          message.status === "Sent" ||
                          message.status === "Needs review"
                        }
                      >
                        Send now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Module health</CardTitle>
          <CardDescription>
            Snapshot of the new admin control surface
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">Critical alerts</p>
            <p className="mt-2 text-3xl font-semibold text-red-900">
              {criticalAlerts}
            </p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-800">
              Pending approvals
            </p>
            <p className="mt-2 text-3xl font-semibold text-amber-900">
              {pendingApprovals}
            </p>
          </div>
          <div className="rounded-2xl bg-sky-50 p-4">
            <p className="text-sm font-medium text-sky-800">
              Messages waiting review
            </p>
            <p className="mt-2 text-3xl font-semibold text-sky-900">
              {messagesWaitingReview}
            </p>
          </div>
          <Separator />
          <div>
            <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
              <span>Admin response readiness</span>
              <span>{readiness}%</span>
            </div>
            <Progress value={readiness} />
          </div>
          <Separator />
          <div className="space-y-3">
            <p className="text-sm font-medium text-slate-900">
              Recent module activity
            </p>
            {moduleEvents.map((event: ModuleEvent) => (
              <div
                key={event.id}
                className="rounded-2xl border border-slate-200 bg-white p-3"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 rounded-full p-2 ${eventToneClasses(event.tone)}`}
                  >
                    <CircleCheckBig className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {event.title}
                    </p>
                    <p className="text-sm text-slate-600">{event.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
