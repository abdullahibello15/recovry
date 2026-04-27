import React from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../../AuthContext";
import { AdminClientInbox } from "../admin/AdminClientInbox";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export const AdminMessagesPage: React.FC = () => {
  const { user, logout } = useAuth();

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
                  Admin messages
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
                  Reply to clients from a dedicated page and keep every conversation synced with the client portal.
                </p>
              </div>
              <p className="text-sm text-slate-500">
                Signed in as {user?.name} • {user?.email}
              </p>
            </div>
            <Card className="w-full border-slate-200 bg-slate-50 md:max-w-sm">
              <CardHeader>
                <CardTitle className="text-base">Messaging workspace</CardTitle>
                <CardDescription>
                  This page is reserved for admin-to-client communication.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={logout} variant="outline" className="w-full">
                  Logout
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <AdminClientInbox />
      </div>
    </div>
  );
};
