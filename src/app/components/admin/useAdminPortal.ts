import React from "react";
import { api } from "../../api";
import { useAuth } from "../../AuthContext";
import { initialAdminPortalState } from "./data";
import type { AdminPortalState, ApprovalState } from "./types";

function readInitialState(): AdminPortalState {
  return initialAdminPortalState;
}

export function useAdminPortal() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [state, setState] = React.useState<AdminPortalState>(readInitialState);

  React.useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated || user?.role !== "admin") {
      setState(readInitialState());
      return;
    }

    let active = true;

    api
      .get<AdminPortalState>("/admin-portal")
      .then((data) => {
        if (active) {
          setState(data);
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [isAuthenticated, isLoading, user?.role]);

  const reviewAlert = React.useCallback(
    (id: string) => {
      void api
        .post<AdminPortalState>("/admin-portal/action", {
          type: "reviewAlert",
          id,
        })
        .then((data) => {
          setState(data);
        });
    },
    [],
  );

  const resolveAlert = React.useCallback(
    (id: string) => {
      void api
        .post<AdminPortalState>("/admin-portal/action", {
          type: "resolveAlert",
          id,
        })
        .then((data) => {
          setState(data);
        });
    },
    [],
  );

  const updateApproval = React.useCallback(
    (item: string, nextState: ApprovalState) => {
      void api
        .post<AdminPortalState>("/admin-portal/action", {
          type: "updateApproval",
          item,
          state: nextState,
        })
        .then((data) => {
          setState(data);
        });
    },
    [],
  );

  const sendCommunication = React.useCallback(
    (title: string) => {
      void api
        .post<AdminPortalState>("/admin-portal/action", {
          type: "sendCommunication",
          title,
        })
        .then((data) => {
          setState(data);
        });
    },
    [],
  );

  const resetPortal = React.useCallback(() => {
    void api
      .post<AdminPortalState>("/admin-portal/action", {
        type: "reset",
      })
      .then((data) => {
        setState(data);
      });
  }, []);

  const criticalAlerts = state.alerts.filter(
    (alert) => alert.severity === "Critical" && alert.state !== "Resolved",
  ).length;
  const pendingApprovals = state.approvals.filter(
    (approval) => approval.state === "Pending",
  ).length;
  const messagesWaitingReview = state.communications.filter(
    (message) =>
      message.status === "Needs review" || message.status === "Ready to send",
  ).length;
  const resolvedAlerts = state.alerts.filter(
    (alert) => alert.state === "Resolved",
  ).length;
  const approvedItems = state.approvals.filter(
    (approval) => approval.state === "Approved",
  ).length;
  const sentMessages = state.communications.filter(
    (message) => message.status === "Sent",
  ).length;

  const readiness = Math.min(
    100,
    62 +
      resolvedAlerts * 8 +
      approvedItems * 6 +
      sentMessages * 6 -
      criticalAlerts * 10,
  );

  return {
    ...state,
    criticalAlerts,
    pendingApprovals,
    messagesWaitingReview,
    readiness,
    reviewAlert,
    resolveAlert,
    updateApproval,
    sendCommunication,
    resetPortal,
  };
}
