import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, CheckCircle2, FolderKanban, Users } from "lucide-react";
import { useAuth } from "../../AuthContext";
import { useAdminData } from "../../AdminDataContext";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";

export const AdminRecordsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const {
    clients,
    cases,
    tasks,
    addClient,
    addCase,
    addTask,
    updateCasePriority,
    updateCaseStatus,
    toggleTask,
    getClientName,
    metrics,
  } = useAdminData();

  const [clientForm, setClientForm] = useState({
    name: "",
    email: "",
    phone: "",
    riskLevel: "Medium" as const,
    status: "Pending" as const,
  });
  const [caseForm, setCaseForm] = useState({
    clientId: clients[0]?.id ?? "",
    title: "",
    type: "",
    amount: "",
    status: "Intake" as const,
    priority: "Medium" as const,
    assignedTo: "",
  });
  const [taskForm, setTaskForm] = useState({
    caseId: cases[0]?.id ?? "",
    title: "",
    owner: "",
    dueDate: "",
  });

  const orderedCases = useMemo(
    () =>
      [...cases].sort((a, b) => {
        const priorityWeight = {
          Critical: 4,
          High: 3,
          Medium: 2,
          Low: 1,
        };
        return priorityWeight[b.priority] - priorityWeight[a.priority];
      }),
    [cases],
  );

  const handleAddClient = () => {
    if (!clientForm.name || !clientForm.email || !clientForm.phone) {
      return;
    }

    addClient(clientForm);
    setClientForm({
      name: "",
      email: "",
      phone: "",
      riskLevel: "Medium",
      status: "Pending",
    });
  };

  const handleAddCase = () => {
    if (
      !caseForm.clientId ||
      !caseForm.title ||
      !caseForm.type ||
      !caseForm.amount ||
      !caseForm.assignedTo
    ) {
      return;
    }

    addCase({
      clientId: caseForm.clientId,
      title: caseForm.title,
      type: caseForm.type,
      amount: Number(caseForm.amount),
      status: caseForm.status,
      priority: caseForm.priority,
      assignedTo: caseForm.assignedTo,
    });
    setCaseForm((current) => ({
      ...current,
      title: "",
      type: "",
      amount: "",
      assignedTo: "",
    }));
  };

  const handleAddTask = () => {
    if (!taskForm.caseId || !taskForm.title || !taskForm.owner || !taskForm.dueDate) {
      return;
    }

    addTask(taskForm);
    setTaskForm((current) => ({
      ...current,
      title: "",
      owner: "",
      dueDate: "",
    }));
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef4ff_45%,#ffffff_100%)] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <Button asChild variant="outline" className="gap-2">
                <Link to="/dashboard">
                  <ArrowLeft className="h-4 w-4" />
                  Back to dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-950">
                  Admin records center
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
                  Create clients, open new cases, assign priorities, and track
                  operational tasks from one admin workspace.
                </p>
              </div>
              <p className="text-sm text-slate-500">
                Signed in as {user?.name} • {user?.email}
              </p>
            </div>
            <Card className="w-full border-slate-200 bg-slate-50 md:max-w-sm">
              <CardHeader>
                <CardTitle className="text-base">Portal controls</CardTitle>
                <CardDescription>
                  These records persist locally and are structured for future API migration.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={logout} variant="outline" className="w-full">
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={<Users className="h-5 w-5" />}
            title="Active clients"
            value={String(metrics.activeClients)}
            note={`${clients.length} total client records`}
          />
          <MetricCard
            icon={<FolderKanban className="h-5 w-5" />}
            title="Open cases"
            value={String(metrics.openCases)}
            note={`${metrics.urgentCases} urgent cases need attention`}
          />
          <MetricCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            title="Pending tasks"
            value={String(metrics.pendingTasks)}
            note={`${tasks.length - metrics.pendingTasks} tasks completed`}
          />
          <MetricCard
            icon={<FolderKanban className="h-5 w-5" />}
            title="Pipeline value"
            value={`$${metrics.pipelineValue.toLocaleString()}`}
            note={`${metrics.resolvedCases} resolved cases`}
          />
        </section>

        <Tabs defaultValue="clients" className="space-y-6">
          <TabsList className="grid h-auto w-full grid-cols-3">
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <Card className="border-slate-200/80 shadow-sm">
                <CardHeader>
                  <CardTitle>Add client</CardTitle>
                  <CardDescription>
                    Create a new client record for intake and case assignment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Field label="Full name">
                    <Input
                      value={clientForm.name}
                      onChange={(e) =>
                        setClientForm((current) => ({ ...current, name: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Email">
                    <Input
                      type="email"
                      value={clientForm.email}
                      onChange={(e) =>
                        setClientForm((current) => ({ ...current, email: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Phone">
                    <Input
                      value={clientForm.phone}
                      onChange={(e) =>
                        setClientForm((current) => ({ ...current, phone: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Risk level">
                    <Select
                      value={clientForm.riskLevel}
                      onValueChange={(value) =>
                        setClientForm((current) => ({
                          ...current,
                          riskLevel: value as typeof clientForm.riskLevel,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Status">
                    <Select
                      value={clientForm.status}
                      onValueChange={(value) =>
                        setClientForm((current) => ({
                          ...current,
                          status: value as typeof clientForm.status,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Dormant">Dormant</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Button onClick={handleAddClient} className="w-full">
                    Save Client Record
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-slate-200/80 shadow-sm">
                <CardHeader>
                  <CardTitle>Client registry</CardTitle>
                  <CardDescription>
                    View client risk and engagement status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {clients.map((client) => (
                    <div
                      key={client.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="font-medium text-slate-900">{client.name}</p>
                          <p className="text-sm text-slate-600">{client.email}</p>
                          <p className="text-sm text-slate-500">{client.phone}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">{client.status}</Badge>
                          <Badge variant="outline">{client.riskLevel} risk</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="cases" className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <Card className="border-slate-200/80 shadow-sm">
                <CardHeader>
                  <CardTitle>Open new case</CardTitle>
                  <CardDescription>
                    Create and assign a recovery case from the admin portal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Field label="Client">
                    <Select
                      value={caseForm.clientId}
                      onValueChange={(value) =>
                        setCaseForm((current) => ({ ...current, clientId: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Case title">
                    <Input
                      value={caseForm.title}
                      onChange={(e) =>
                        setCaseForm((current) => ({ ...current, title: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Case type">
                    <Input
                      value={caseForm.type}
                      onChange={(e) =>
                        setCaseForm((current) => ({ ...current, type: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Loss amount">
                    <Input
                      type="number"
                      value={caseForm.amount}
                      onChange={(e) =>
                        setCaseForm((current) => ({ ...current, amount: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Assigned analyst">
                    <Input
                      value={caseForm.assignedTo}
                      onChange={(e) =>
                        setCaseForm((current) => ({
                          ...current,
                          assignedTo: e.target.value,
                        }))
                      }
                    />
                  </Field>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Field label="Status">
                      <Select
                        value={caseForm.status}
                        onValueChange={(value) =>
                          setCaseForm((current) => ({
                            ...current,
                            status: value as typeof caseForm.status,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Intake">Intake</SelectItem>
                          <SelectItem value="Evidence review">
                            Evidence review
                          </SelectItem>
                          <SelectItem value="Tracing">Tracing</SelectItem>
                          <SelectItem value="Recovery action">
                            Recovery action
                          </SelectItem>
                          <SelectItem value="Resolved">Resolved</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Priority">
                      <Select
                        value={caseForm.priority}
                        onValueChange={(value) =>
                          setCaseForm((current) => ({
                            ...current,
                            priority: value as typeof caseForm.priority,
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <Button onClick={handleAddCase} className="w-full">
                    Create Case
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-slate-200/80 shadow-sm">
                <CardHeader>
                  <CardTitle>Case management</CardTitle>
                  <CardDescription>
                    Update priorities and move cases through the workflow
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderedCases.map((caseItem) => (
                    <div
                      key={caseItem.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                        <div className="space-y-1">
                          <p className="font-medium text-slate-900">
                            Case #{caseItem.id} - {caseItem.title}
                          </p>
                          <p className="text-sm text-slate-600">
                            {getClientName(caseItem.clientId)} • {caseItem.type}
                          </p>
                          <p className="text-sm text-slate-500">
                            ${caseItem.amount.toLocaleString()} • Analyst: {caseItem.assignedTo}
                          </p>
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                          <Select
                            value={caseItem.status}
                            onValueChange={(value) =>
                              updateCaseStatus(
                                caseItem.id,
                                value as typeof caseItem.status,
                              )
                            }
                          >
                            <SelectTrigger className="min-w-[180px] bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Intake">Intake</SelectItem>
                              <SelectItem value="Evidence review">
                                Evidence review
                              </SelectItem>
                              <SelectItem value="Tracing">Tracing</SelectItem>
                              <SelectItem value="Recovery action">
                                Recovery action
                              </SelectItem>
                              <SelectItem value="Resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select
                            value={caseItem.priority}
                            onValueChange={(value) =>
                              updateCasePriority(
                                caseItem.id,
                                value as typeof caseItem.priority,
                              )
                            }
                          >
                            <SelectTrigger className="min-w-[160px] bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Low">Low</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="High">High</SelectItem>
                              <SelectItem value="Critical">Critical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
              <Card className="border-slate-200/80 shadow-sm">
                <CardHeader>
                  <CardTitle>Create operational task</CardTitle>
                  <CardDescription>
                    Assign follow-up items tied to live cases
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Field label="Case">
                    <Select
                      value={taskForm.caseId}
                      onValueChange={(value) =>
                        setTaskForm((current) => ({ ...current, caseId: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cases.map((caseItem) => (
                          <SelectItem key={caseItem.id} value={caseItem.id}>
                            Case #{caseItem.id} - {caseItem.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Task title">
                    <Textarea
                      rows={4}
                      value={taskForm.title}
                      onChange={(e) =>
                        setTaskForm((current) => ({ ...current, title: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Owner">
                    <Input
                      value={taskForm.owner}
                      onChange={(e) =>
                        setTaskForm((current) => ({ ...current, owner: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Due date">
                    <Input
                      type="date"
                      value={taskForm.dueDate}
                      onChange={(e) =>
                        setTaskForm((current) => ({ ...current, dueDate: e.target.value }))
                      }
                    />
                  </Field>
                  <Button onClick={handleAddTask} className="w-full">
                    Add Task
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-slate-200/80 shadow-sm">
                <CardHeader>
                  <CardTitle>Task board</CardTitle>
                  <CardDescription>
                    Track pending operational work and close completed items
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="font-medium text-slate-900">{task.title}</p>
                          <p className="text-sm text-slate-600">
                            Case #{task.caseId} • {task.owner}
                          </p>
                          <p className="text-sm text-slate-500">
                            Due {task.dueDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">
                            {task.completed ? "Completed" : "Pending"}
                          </Badge>
                          <Button
                            variant="outline"
                            onClick={() => toggleTask(task.id)}
                          >
                            {task.completed ? "Reopen" : "Mark done"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
  note: string;
}> = ({ icon, title, value, note }) => (
  <Card className="border-slate-200/80 shadow-sm">
    <CardHeader className="flex flex-row items-start justify-between space-y-0">
      <div className="space-y-1">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-3xl">{value}</CardTitle>
      </div>
      <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">{icon}</div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-slate-600">{note}</p>
    </CardContent>
  </Card>
);

const Field: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    {children}
  </div>
);
