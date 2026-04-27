import React from "react";
import { ArrowUpRight, FileSearch } from "lucide-react";
import { priorityQueue, workflowStages } from "./data";
import { statusBadgeClasses } from "./utils";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export const AdminPipelineSection: React.FC = () => {
  return (
    <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Priority case queue</CardTitle>
            <CardDescription>
              High-touch investigations needing operational attention
            </CardDescription>
          </div>
          <Button className="gap-2 self-start">
            Assign follow-up
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Case</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Exposure</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priorityQueue.map((caseItem) => (
                <TableRow key={caseItem.caseId}>
                  <TableCell className="font-medium">{caseItem.caseId}</TableCell>
                  <TableCell>{caseItem.client}</TableCell>
                  <TableCell>{caseItem.issue}</TableCell>
                  <TableCell>{caseItem.owner}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusBadgeClasses(caseItem.status)}`}
                    >
                      {caseItem.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {caseItem.recovery}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-slate-200/80 shadow-sm">
        <CardHeader>
          <CardTitle>Recovery workflow</CardTitle>
          <CardDescription>
            Distribution across the current case pipeline
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {workflowStages.map((stage) => (
            <div key={stage.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-slate-800">{stage.label}</span>
                <span className="text-slate-500">{stage.count} cases</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full rounded-full ${stage.color}`}
                  style={{ width: `${Math.min(stage.count * 3, 100)}%` }}
                />
              </div>
            </div>
          ))}

          <Separator />

          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-800">
              <FileSearch className="h-4 w-4" />
              Investigation health
            </div>
            <div className="mt-3">
              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>Evidence completeness score</span>
                <span>82%</span>
              </div>
              <Progress value={82} />
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
