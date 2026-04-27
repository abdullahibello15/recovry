import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "./api";
import { useAuth } from "./AuthContext";

export type PortalMessage = {
  id: string;
  senderRole: "admin" | "client";
  senderName: string;
  body: string;
  timestamp: string;
  caseId: string;
  subject: string;
  readByAdmin: boolean;
  readByClient: boolean;
};

type ComposeMessageInput = {
  body: string;
  caseId: string;
  subject: string;
};

type MessagesContextType = {
  messages: PortalMessage[];
  sendAdminReply: (input: ComposeMessageInput) => void;
  sendClientMessage: (input: ComposeMessageInput) => void;
  markInboxRead: (role: "admin" | "client") => void;
  getUnreadCount: (role: "admin" | "client") => number;
};

const initialMessages: PortalMessage[] = [
  {
    id: "msg-1",
    senderRole: "admin",
    senderName: "Sarah Johnson",
    body:
      "Please review the updated case timeline for Case #1234. We have new information about the recovery process.",
    timestamp: "2026-04-25T08:30:00.000Z",
    caseId: "1234",
    subject: "Case update",
    readByAdmin: true,
    readByClient: false,
  },
  {
    id: "msg-2",
    senderRole: "admin",
    senderName: "Mike Chen",
    body:
      "Great news. Your Case #1200 has been successfully resolved and the funds transfer has been initiated.",
    timestamp: "2026-04-22T14:15:00.000Z",
    caseId: "1200",
    subject: "Recovery complete",
    readByAdmin: true,
    readByClient: false,
  },
  {
    id: "msg-3",
    senderRole: "client",
    senderName: "Client User",
    body:
      "Thank you. I have uploaded the additional wallet screenshots you requested for Case #1234.",
    timestamp: "2026-04-24T16:20:00.000Z",
    caseId: "1234",
    subject: "Additional evidence uploaded",
    readByAdmin: false,
    readByClient: true,
  },
];

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

function readInitialMessages() {
  return initialMessages;
}

export const MessagesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const [messages, setMessages] = useState<PortalMessage[]>(readInitialMessages);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (!isAuthenticated) {
      setMessages(readInitialMessages());
      return;
    }

    let active = true;

    api
      .get<PortalMessage[]>("/messages")
      .then((data) => {
        if (active) {
          setMessages(data);
        }
      })
      .catch(() => undefined);

    return () => {
      active = false;
    };
  }, [isAuthenticated, isLoading]);

  const sendAdminReply = ({ body, caseId, subject }: ComposeMessageInput) => {
    const cleanBody = body.trim();
    if (!cleanBody) {
      return;
    }

    void api
      .post<PortalMessage>("/messages", {
        senderRole: "admin",
        senderName: "Admin User",
        body: cleanBody,
        caseId,
        subject,
        readByAdmin: true,
        readByClient: false,
      })
      .then((message) => {
        setMessages((current) => [...current, message]);
      });
  };

  const sendClientMessage = ({ body, caseId, subject }: ComposeMessageInput) => {
    const cleanBody = body.trim();
    if (!cleanBody) {
      return;
    }

    void api
      .post<PortalMessage>("/messages", {
        senderRole: "client",
        senderName: "Client User",
        body: cleanBody,
        caseId,
        subject,
        readByAdmin: false,
        readByClient: true,
      })
      .then((message) => {
        setMessages((current) => [...current, message]);
      });
  };

  const markInboxRead = (role: "admin" | "client") => {
    void api.patch("/messages/read", { role }).then(() => {
      setMessages((current) =>
        current.map((message) =>
          role === "admin"
            ? { ...message, readByAdmin: true }
            : { ...message, readByClient: true },
        ),
      );
    });
  };

  const getUnreadCount = useMemo(
    () => (role: "admin" | "client") =>
      messages.filter((message) =>
        role === "admin" ? !message.readByAdmin : !message.readByClient,
      ).length,
    [messages],
  );

  return (
    <MessagesContext.Provider
      value={{
        messages,
        sendAdminReply,
        sendClientMessage,
        markInboxRead,
        getUnreadCount,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};
