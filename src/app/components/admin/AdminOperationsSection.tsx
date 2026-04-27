import React from "react";
import { CircleCheckBig, Clock3, ListTodo, ShieldCheck } from "lucide-react";
import { operationsFeed, teamWorkload } from "./data";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";

export const AdminOperationsSection: React.FC = () => {
  return (
    <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-[1fr_1fr_0.9fr]">
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Analyst workload</CardTitle>
          <CardDescription>
            Balance assignments before queue pressure builds
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {teamWorkload.map((member) => (
            <div key={member.analyst} className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium text-slate-900">{member.analyst}</p>
                  <p className="text-sm text-slate-500">{member.focus}</p>
                </div>
                <Badge variant="outline">{member.cases} cases</Badge>
              </div>
              <Progress value={member.load} />
              <div className="flex items-center justify-between text-sm text-slate-500">
                <span>{member.load}% allocated</span>
                <span>{member.sla}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Operations feed</CardTitle>
          <CardDescription>
            Live updates from case management and compliance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {operationsFeed.map((item, index) => (
            <div key={item.title}>
              <div className="flex gap-3">
                <div className="mt-1 rounded-full bg-emerald-100 p-2 text-emerald-700">
                  <CircleCheckBig className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-slate-900">{item.title}</p>
                  <p className="text-sm text-slate-600">{item.detail}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    {item.time}
                  </p>
                </div>
              </div>
              {index < operationsFeed.length - 1 ? (
                <Separator className="mt-4" />
              ) : null}
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Admin checklist</CardTitle>
          <CardDescription>
            Small tasks that keep the portal operational
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2 font-medium text-amber-900">
              <Clock3 className="h-4 w-4" />
              Review pending audit pack
            </div>
            <p className="mt-2 text-sm text-amber-800">
              Two cases are still missing signed authorization documents.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center gap-2 font-medium text-slate-900">
              <ListTodo className="h-4 w-4" />
              Team sync at 3:30 PM
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Agenda includes escalations, legal blockers, and new lead triage.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <div className="flex items-center gap-2 font-medium text-emerald-900">
              <ShieldCheck className="h-4 w-4" />
              Backup status healthy
            </div>
            <p className="mt-2 text-sm text-emerald-700">
              Client records and uploaded evidence synced successfully.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
