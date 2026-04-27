import React from "react";
import { Link } from "react-router";
import { useAuth } from "../../AuthContext";
import { AdminHero } from "../admin/AdminHero";
import { AdminOperationsSection } from "../admin/AdminOperationsSection";
import { AdminPipelineSection } from "../admin/AdminPipelineSection";
import { RiskAndApprovalsModule } from "../admin/RiskAndApprovalsModule";
import { AdminSummaryGrid } from "../admin/AdminSummaryGrid";
import { useAdminPortal } from "../admin/useAdminPortal";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { FolderKanban, MessageSquareReply } from "lucide-react";

export const AdminDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const portal = useAdminPortal();

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef4ff_45%,#ffffff_100%)] p-4 md:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <AdminHero
          userName={user?.name}
          userEmail={user?.email}
          onLogout={logout}
        />
        <AdminSummaryGrid />
        <AdminPipelineSection />
        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Client messaging center</CardTitle>
                <CardDescription>
                  Open the dedicated reply page to manage client conversations from the admin portal
                </CardDescription>
              </div>
              <Button asChild className="gap-2 self-start">
                <Link to="/admin/messages">
                  <MessageSquareReply className="h-4 w-4" />
                  Open Messages Page
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                Replies you send from the separate messages page will continue to appear instantly in the client portal.
              </div>
            </CardContent>
          </Card>
          <Card className="border-slate-200/80 shadow-sm">
            <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <CardTitle>Records management</CardTitle>
                <CardDescription>
                  Create clients, open cases, assign analysts, and track tasks from a dedicated admin workspace
                </CardDescription>
              </div>
              <Button asChild className="gap-2 self-start">
                <Link to="/admin/records">
                  <FolderKanban className="h-4 w-4" />
                  Open Records Page
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                Use the records center to manage the operational data that powers cases, assignments, and follow-up work.
              </div>
            </CardContent>
          </Card>
        </section>
        <RiskAndApprovalsModule portal={portal} />
        <AdminOperationsSection />
      </div>
    </div>
  );
};
