import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../../AuthContext";
import { AdminDashboard } from "./AdminDashboard";
import { ClientDashboard } from "./ClientDashboard";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return user.role === "admin" ? <AdminDashboard /> : <ClientDashboard />;
};
