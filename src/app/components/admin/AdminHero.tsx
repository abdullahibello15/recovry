import React from "react";
import { AlertTriangle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type AdminHeroProps = {
  userName?: string;
  userEmail?: string;
  onLogout: () => void;
};

export const AdminHero: React.FC<AdminHeroProps> = ({
  userName,
  userEmail,
  onLogout,
}) => {
  return (
    <section className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 text-white shadow-xl shadow-slate-300/30">
      <div className="grid gap-6 p-6 md:grid-cols-[1.5fr_0.9fr] md:p-8">
        <div className="space-y-5">
          <Badge className="bg-white/12 text-white hover:bg-white/12">
            Admin portal
          </Badge>
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Operations command center for active fund recovery cases
            </h1>
            <p className="max-w-2xl text-sm text-slate-300 md:text-base">
              Monitor investigations, unblock analysts, and keep client
              communication moving from one place.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
            <span>Signed in as {userName}</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-500 md:inline-block" />
            <span>{userEmail}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/6 p-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-300">Today&apos;s focus</p>
              <p className="mt-2 text-2xl font-semibold">8 urgent actions</p>
            </div>
            <Button
              onClick={onLogout}
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              Logout
            </Button>
          </div>

          <div className="mt-5 space-y-4">
            <div className="rounded-2xl bg-white/10 p-4">
              <div className="flex items-center gap-2 text-sm text-slate-200">
                <AlertTriangle className="h-4 w-4" />
                Cases breaching SLA in under 24 hours
              </div>
              <p className="mt-2 text-3xl font-semibold">3</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  New leads
                </p>
                <p className="mt-2 text-xl font-semibold">11</p>
              </div>
              <div className="rounded-2xl bg-white/8 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Client replies
                </p>
                <p className="mt-2 text-xl font-semibold">27</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
