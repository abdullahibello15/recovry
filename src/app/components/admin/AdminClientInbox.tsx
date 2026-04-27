import React, { useEffect, useMemo, useState } from "react";
import { MessageSquareReply, Send } from "lucide-react";
import { useMessages } from "../../MessagesContext";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Textarea } from "../ui/textarea";

export const AdminClientInbox: React.FC = () => {
  const { messages, sendAdminReply, markInboxRead, getUnreadCount } = useMessages();
  const [caseId, setCaseId] = useState("1234");
  const [replyBody, setReplyBody] = useState("");

  useEffect(() => {
    markInboxRead("admin");
  }, [markInboxRead]);

  const orderedMessages = useMemo(
    () =>
      [...messages].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      ),
    [messages],
  );

  const chatRooms = useMemo(() => {
    const latestByCase = new Map<string, (typeof messages)[number]>();

    for (const message of messages) {
      const current = latestByCase.get(message.caseId);
      if (
        !current ||
        new Date(message.timestamp).getTime() > new Date(current.timestamp).getTime()
      ) {
        latestByCase.set(message.caseId, message);
      }
    }

    return [...latestByCase.values()].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }, [messages]);

  const activeMessages = useMemo(
    () => orderedMessages.filter((message) => message.caseId === caseId),
    [caseId, orderedMessages],
  );

  const handleReply = () => {
    if (!replyBody.trim()) {
      return;
    }

    sendAdminReply({
      body: replyBody,
      caseId,
      subject: `Admin reply for Case #${caseId}`,
    });
    setReplyBody("");
  };

  return (
    <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card className="border-slate-200/80 shadow-sm xl:col-span-2">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>Client chat room</CardTitle>
              <CardDescription>
                Manage case conversations in real time and reply directly into the client portal
              </CardDescription>
            </div>
            <Badge variant="outline">{getUnreadCount("admin")} unread</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 xl:grid-cols-[280px_1fr]">
            <div className="space-y-3">
              {chatRooms.map((room) => (
                <button
                  key={room.caseId}
                  type="button"
                  onClick={() => setCaseId(room.caseId)}
                  className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                    caseId === room.caseId
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">Case #{room.caseId}</p>
                    <span
                      className={`text-xs ${
                        caseId === room.caseId ? "text-slate-300" : "text-slate-400"
                      }`}
                    >
                      {new Date(room.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p
                    className={`mt-2 text-xs uppercase tracking-[0.16em] ${
                      caseId === room.caseId ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {room.subject}
                  </p>
                  <p
                    className={`mt-2 line-clamp-2 text-sm ${
                      caseId === room.caseId ? "text-slate-200" : "text-slate-600"
                    }`}
                  >
                    {room.body}
                  </p>
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                  <p className="text-lg font-semibold text-slate-900">
                    Conversation for Case #{caseId}
                  </p>
                  <p className="text-sm text-slate-500">
                    Replies sent here appear instantly in the client portal
                  </p>
                </div>
                <div className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                  Live sync
                </div>
              </div>
              <div className="mt-4 space-y-3">
                {activeMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderRole === "admin" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                        message.senderRole === "admin"
                          ? "bg-slate-900 text-white"
                          : "border border-amber-200 bg-white text-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{message.senderName}</p>
                        <span
                          className={`text-[11px] ${
                            message.senderRole === "admin"
                              ? "text-slate-300"
                              : "text-slate-400"
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p
                        className={`mt-1 text-[11px] uppercase tracking-[0.16em] ${
                          message.senderRole === "admin"
                            ? "text-slate-400"
                            : "text-slate-400"
                        }`}
                      >
                        {message.subject}
                      </p>
                      <p
                        className={`mt-2 text-sm ${
                          message.senderRole === "admin"
                            ? "text-slate-100"
                            : "text-slate-600"
                        }`}
                      >
                        {message.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-900">
                  <MessageSquareReply className="h-4 w-4" />
                  Reply in this room
                </div>
                <Textarea
                  rows={5}
                  placeholder="Type your response to the client..."
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                />
                <div className="mt-3 flex justify-end">
                  <Button
                    onClick={handleReply}
                    disabled={!replyBody.trim()}
                    className="gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
