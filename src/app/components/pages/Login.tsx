import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const ADMIN_EMAIL = "admin@fundrecovery.com";
const ADMIN_PASSWORD = "FR-Admin-2026!";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    const success = await login(email, password);
    setIsSubmitting(false);

    if (success) {
      const nextPath =
        (location.state as { from?: { pathname?: string } } | null)?.from
          ?.pathname || "/dashboard";
      navigate(nextPath, { replace: true });
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card>
          <CardHeader>
            <CardTitle>Login to Fund Recovery</CardTitle>
            <CardDescription>
              Enter your credentials to access the client or admin portal.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              {error ? <p className="text-sm text-red-500">{error}</p> : null}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Login"}
              </Button>
            </form>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              Client users can create a new account from the signup page and will be signed in automatically after registration.
            </div>

            <p className="text-sm text-gray-600">
              New client?{" "}
              <Link to="/signup" className="font-medium text-blue-600 hover:underline">
                Create an account
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-slate-950 text-white">
          <CardHeader>
            <CardTitle>Admin Login Details</CardTitle>
            <CardDescription className="text-slate-300">
              Generated admin credentials for this project seed setup.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <p className="text-slate-400">Email</p>
              <p className="mt-1 font-mono text-base text-white">{ADMIN_EMAIL}</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <p className="text-slate-400">Password</p>
              <p className="mt-1 font-mono text-base text-white">{ADMIN_PASSWORD}</p>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-amber-100">
              These credentials are stored in the local seed database. Change them before using the project in production.
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <p className="text-slate-400">Default client seed</p>
              <p className="mt-1 font-mono text-white">client@fundrecovery.com / client123</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
