import React from "react";
import { useAdminData } from "../../AdminDataContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { getSummaryIcon } from "./utils";

export const AdminSummaryGrid: React.FC = () => {
  const { metrics, clients } = useAdminData();
  const summaryCards = [
    {
      title: "Open investigations",
      value: String(metrics.openCases),
      note: `${metrics.urgentCases} high-priority cases need review`,
      icon: "briefcase" as const,
    },
    {
      title: "Recovery pipeline",
      value: `$${metrics.pipelineValue.toLocaleString()}`,
      note: `${metrics.resolvedCases} resolved cases in the system`,
      icon: "badge-dollar" as const,
    },
    {
      title: "Active clients",
      value: String(metrics.activeClients),
      note: `${clients.length} total client records available`,
      icon: "users" as const,
    },
    {
      title: "Operational tasks",
      value: String(metrics.pendingTasks),
      note: "Pending follow-up work across all admin cases",
      icon: "shield" as const,
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {summaryCards.map(({ title, value, note, icon }) => {
        const Icon = getSummaryIcon(icon);

        return (
          <Card key={title} className="border-slate-200/80 shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <CardDescription>{title}</CardDescription>
                <CardTitle className="text-3xl">{value}</CardTitle>
              </div>
              <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                <Icon className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">{note}</p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
};
