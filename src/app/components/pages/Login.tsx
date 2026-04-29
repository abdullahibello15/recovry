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

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const signupSuccess =
    (location.state as { signupSuccess?: string } | null)?.signupSuccess || "";

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
              {signupSuccess ? (
                <p className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {signupSuccess}
                </p>
              ) : null}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Login"}
              </Button>
            </form>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              Client users can create a new account from the signup page, then sign in once registration is complete.
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
            <CardTitle>Secure Portal Access</CardTitle>
            <CardDescription className="text-slate-300">
              Admin credentials are managed in the backend seed data and should be shared through a secure channel.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <p className="text-slate-400">Admin access</p>
              <p className="mt-1 text-white">
                Sign in with the admin account provisioned in the local seed database.
              </p>
            </div>
            <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-amber-100">
              Passwords are stored as scrypt hashes. Rotate all seed credentials before using the project in production.
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
              <p className="text-slate-400">Client access</p>
              <p className="mt-1 text-white">
                New clients can create their own account from the signup page.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
