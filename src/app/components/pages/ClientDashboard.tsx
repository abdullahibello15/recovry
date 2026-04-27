import React, { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../AuthContext";
import { useMessages } from "../../MessagesContext";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import {
  Calendar,
  FileText,
  MessageSquare,
  Upload,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Phone,
  Mail,
  X,
  Send,
} from "lucide-react";

export const ClientDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Client Dashboard</h1>
            <p className="text-sm md:text-base text-gray-600">
              Welcome back, {user?.name}
            </p>
          </div>
          <Button
            onClick={logout}
            variant="outline"
            className="w-full md:w-auto"
          >
            Logout
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-2">
            <TabsTrigger value="overview" className="text-xs md:text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="cases" className="text-xs md:text-sm">
              Cases
            </TabsTrigger>
            <TabsTrigger value="report" className="text-xs md:text-sm">
              Report
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-xs md:text-sm">
              Docs
            </TabsTrigger>
            <TabsTrigger value="messages" className="text-xs md:text-sm">
              Messages
            </TabsTrigger>
            <TabsTrigger value="profile" className="text-xs md:text-sm">
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <OverviewTab />
          </TabsContent>

          <TabsContent value="cases" className="space-y-6">
            <CasesTab />
          </TabsContent>

          <TabsContent value="report" className="space-y-6">
            <ReportCaseTab />
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <DocumentsTab />
          </TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <MessagesTab />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <ProfileTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const OverviewTab: React.FC = () => {
  const { getUnreadCount } = useMessages();

  return (
  <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2</div>
          <p className="text-xs text-muted-foreground">
            1 in progress, 1 completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Recovered</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,000</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Next Update</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Tomorrow</div>
          <p className="text-xs text-muted-foreground">Case #1234 review</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{getUnreadCount("client")}</div>
          <p className="text-xs text-muted-foreground">
            From your recovery agent
          </p>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Case Progress</CardTitle>
          <CardDescription>Track your active recovery cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">
                  Case #1234 - Crypto Recovery
                </span>
                <Badge variant="secondary">75%</Badge>
              </div>
              <Progress value={75} className="w-full" />
              <p className="text-sm text-gray-600 mt-1">
                Investigation phase complete, awaiting legal review
              </p>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-medium">
                  Case #1200 - Investment Fraud
                </span>
                <Badge variant="default">100%</Badge>
              </div>
              <Progress value={100} className="w-full" />
              <p className="text-sm text-green-600 mt-1">
                Recovery complete - $25,000 recovered
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates on your cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Payment processed</p>
                <p className="text-xs text-gray-600">
                  Case #1200 - $25,000 transferred to your account
                </p>
                <p className="text-xs text-gray-400">2 days ago</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Document review complete</p>
                <p className="text-xs text-gray-600">
                  Case #1234 - All submitted documents verified
                </p>
                <p className="text-xs text-gray-400">1 week ago</p>
              </div>
            </div>
            <Separator />
            <div className="flex items-start space-x-3">
              <MessageSquare className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">New message from agent</p>
                <p className="text-xs text-gray-600">
                  Please review the updated case timeline
                </p>
                <p className="text-xs text-gray-400">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </>
  );
};

const CasesTab: React.FC = () => {
  const { sendClientMessage } = useMessages();
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [contactMethod, setContactMethod] = useState("email");

  const cases = [
    {
      id: 1234,
      title: "Crypto Recovery",
      type: "Bitcoin scam",
      amount: 50000,
      status: "In Progress",
      statusColor: "secondary",
      progress: 75,
      currentStatus: "Legal Review",
      agent: "Sarah Johnson",
      agentEmail: "sarah.johnson@fundrecovery.com",
      agentPhone: "+1 (555) 234-5678",
      started: "Jan 15, 2024",
      nextStep: "Court Filing",
      description:
        "You were contacted via email about an investment opportunity in Bitcoin mining. The scammer convinced you to transfer $50,000 to their wallet address.",
      timeline: [
        { date: "Jan 15, 2024", event: "Case Started", status: "completed" },
        {
          date: "Jan 25, 2024",
          event: "Documentation Review",
          status: "completed",
        },
        {
          date: "Feb 5, 2024",
          event: "Investigation Phase",
          status: "completed",
        },
        { date: "Feb 20, 2024", event: "Legal Review", status: "current" },
        { date: "Mar 10, 2024", event: "Court Filing", status: "pending" },
        { date: "Apr 15, 2024", event: "Expected Recovery", status: "pending" },
      ],
    },
    {
      id: 1200,
      title: "Investment Fraud",
      type: "Ponzi scheme",
      amount: 30000,
      status: "Completed",
      statusColor: "default",
      progress: 100,
      currentStatus: "Funds Recovered",
      agent: "Mike Chen",
      agentEmail: "mike.chen@fundrecovery.com",
      agentPhone: "+1 (555) 345-6789",
      started: "Nov 3, 2023",
      nextStep: "None",
      description:
        "You invested in what appeared to be a legitimate investment fund. After research, we discovered it was a Ponzi scheme.",
      timeline: [
        { date: "Nov 3, 2023", event: "Case Started", status: "completed" },
        {
          date: "Nov 15, 2023",
          event: "Documentation Review",
          status: "completed",
        },
        {
          date: "Dec 1, 2023",
          event: "Investigation Phase",
          status: "completed",
        },
        { date: "Jan 10, 2024", event: "Legal Action", status: "completed" },
        {
          date: "Mar 12, 2024",
          event: "Recovery Complete",
          status: "completed",
        },
      ],
      recovered: 25000,
    },
  ];

  const handleViewDetails = (caseItem: any) => {
    setSelectedCase(caseItem);
    setOpenDetailsDialog(true);
  };

  const handleContactAgent = (caseItem: any) => {
    setSelectedCase(caseItem);
    setOpenContactDialog(true);
  };

  const handleSendMessage = () => {
    if (!selectedCase || !contactMessage.trim()) {
      return;
    }

    sendClientMessage({
      body: contactMessage,
      caseId: String(selectedCase.id),
      subject: `Client reply for Case #${selectedCase.id}`,
    });
    setContactMessage("");
    setOpenContactDialog(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>My Recovery Cases</CardTitle>
          <CardDescription>Detailed view of all your cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {cases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="border rounded-lg p-3 md:p-6 space-y-3 md:space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3 md:mb-4">
                  <div className="flex-1">
                    <h3 className="text-base md:text-lg font-semibold">
                      Case #{caseItem.id} - {caseItem.title}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      {caseItem.type} - ${caseItem.amount.toLocaleString()} lost
                    </p>
                  </div>
                  <Badge
                    variant={caseItem.statusColor as any}
                    className="w-fit"
                  >
                    {caseItem.status}
                  </Badge>
                </div>
                <Progress
                  value={caseItem.progress}
                  className="w-full mb-2 md:mb-4"
                />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 text-xs md:text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Status</p>
                    <p className="font-medium text-xs md:text-sm">
                      {caseItem.status === "Completed" ? (
                        <span className="text-green-600">
                          {caseItem.currentStatus}
                        </span>
                      ) : (
                        caseItem.currentStatus
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Agent</p>
                    <p className="font-medium text-xs md:text-sm">
                      {caseItem.agent}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Started</p>
                    <p className="font-medium text-xs md:text-sm">
                      {caseItem.started}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">
                      {caseItem.status === "Completed"
                        ? "Completed"
                        : "Next Step"}
                    </p>
                    <p className="font-medium text-xs md:text-sm">
                      {caseItem.nextStep}
                    </p>
                  </div>
                </div>
                <Separator className="my-2 md:my-4" />
                {caseItem.status === "Completed" && caseItem.recovered && (
                  <div className="bg-green-50 p-3 md:p-4 rounded-lg mb-2 md:mb-4">
                    <p className="text-xs md:text-sm text-green-800">
                      <CheckCircle className="h-3 w-3 md:h-4 md:w-4 inline mr-1 md:mr-2" />
                      Recovery successful! $
                      {caseItem.recovered.toLocaleString()} has been transferred
                      to your account.
                    </p>
                  </div>
                )}
                <div className="flex flex-col md:flex-row gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewDetails(caseItem)}
                    className="w-full md:w-auto"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    <span className="hidden md:inline">View Details</span>
                    <span className="md:hidden">Details</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleContactAgent(caseItem)}
                    className="w-full md:w-auto"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    <span className="hidden md:inline">Contact Agent</span>
                    <span className="md:hidden">Contact</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className="w-full max-w-sm md:max-w-2xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedCase &&
                `Case #${selectedCase.id} - ${selectedCase.title}`}
            </DialogTitle>
            <DialogDescription>
              {selectedCase && selectedCase.description}
            </DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Amount Lost</p>
                  <p className="text-lg font-bold">
                    ${selectedCase.amount.toLocaleString()}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="text-lg font-bold">{selectedCase.progress}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className="text-lg font-bold">
                    {selectedCase.currentStatus}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Recovery Agent</p>
                  <p className="text-sm font-medium">{selectedCase.agent}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Case Started</p>
                  <p className="text-sm font-medium">{selectedCase.started}</p>
                </div>
                {selectedCase.recovered && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Amount Recovered</p>
                    <p className="text-lg font-bold text-green-600">
                      ${selectedCase.recovered.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="font-semibold mb-3">Case Timeline</h4>
                <div className="space-y-3">
                  {selectedCase.timeline.map((item: any, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {item.status === "completed" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : item.status === "current" ? (
                          <Clock className="h-5 w-5 text-blue-500" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{item.event}</p>
                        <p className="text-xs text-gray-600">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Quick Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="w-full">
                    <Phone className="h-4 w-4 mr-1 md:mr-2" />
                    <span className="hidden md:inline">
                      Call {selectedCase.agent.split(" ")[0]}
                    </span>
                    <span className="md:hidden">Call</span>
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    <Mail className="h-4 w-4 mr-1 md:mr-2" />
                    <span className="hidden md:inline">Email Agent</span>
                    <span className="md:hidden">Email</span>
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" className="w-full md:w-auto">
                Close
              </Button>
            </DialogClose>
            <Button
              onClick={() => handleContactAgent(selectedCase)}
              className="w-full md:w-auto"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Contact Agent Dialog */}
      <Dialog open={openContactDialog} onOpenChange={setOpenContactDialog}>
        <DialogContent className="w-full max-w-sm md:max-w-md">
          <DialogHeader>
            <DialogTitle>Contact {selectedCase?.agent}</DialogTitle>
            <DialogDescription>
              Send a message to your recovery agent about your case
            </DialogDescription>
          </DialogHeader>

          {selectedCase && (
            <div className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm font-medium">Case Information</p>
                <p className="text-xs text-gray-600">
                  Case #{selectedCase.id} - {selectedCase.title}
                </p>
              </div>

              <div className="space-y-2">
                <Label>Contact Method</Label>
                <Select value={contactMethod} onValueChange={setContactMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="message">Message (In-App)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Your Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="bg-gray-50 p-3 rounded-lg text-sm">
                <p className="font-medium mb-1">Agent Details:</p>
                <p className="text-xs text-gray-600">
                  📧 {selectedCase.agentEmail}
                </p>
                <p className="text-xs text-gray-600">
                  📞 {selectedCase.agentPhone}
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleSendMessage}
              disabled={!contactMessage.trim()}
            >
              <Send className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const DocumentsTab: React.FC = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Document Management</CardTitle>
        <CardDescription>
          Upload and manage case-related documents
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Upload Documents</h3>
            <p className="text-gray-600 mb-4">
              Drag and drop files or click to browse
            </p>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Choose Files
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Recent Documents</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Bank Statement.pdf</p>
                    <p className="text-sm text-gray-600">Uploaded 2 days ago</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Transaction Records.xlsx</p>
                    <p className="text-sm text-gray-600">Uploaded 1 week ago</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const MessagesTab: React.FC = () => {
  const { messages, sendClientMessage, markInboxRead, getUnreadCount } =
    useMessages();
  const [messageBody, setMessageBody] = useState("");
  const [selectedCaseId, setSelectedCaseId] = useState("1234");

  useEffect(() => {
    markInboxRead("client");
  }, [markInboxRead]);

  const clientMessages = useMemo(
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
    () => clientMessages.filter((message) => message.caseId === selectedCaseId),
    [clientMessages, selectedCaseId],
  );

  const handleSend = () => {
    if (!messageBody.trim()) {
      return;
    }

    sendClientMessage({
      body: messageBody,
      caseId: selectedCaseId,
      subject: `Client message for Case #${selectedCaseId}`,
    });
    setMessageBody("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>Client Chat Room</CardTitle>
              <CardDescription>
                Chat with the admin team by case and receive replies in real time
              </CardDescription>
            </div>
            <Badge variant="outline">{getUnreadCount("client")} unread</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 lg:grid-cols-[250px_1fr]">
            <div className="space-y-3">
              {chatRooms.map((room) => (
                <button
                  key={room.caseId}
                  type="button"
                  onClick={() => setSelectedCaseId(room.caseId)}
                  className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                    selectedCaseId === room.caseId
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium">Case #{room.caseId}</p>
                    <span
                      className={`text-xs ${
                        selectedCaseId === room.caseId
                          ? "text-blue-100"
                          : "text-slate-400"
                      }`}
                    >
                      {new Date(room.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p
                    className={`mt-2 text-xs uppercase tracking-[0.16em] ${
                      selectedCaseId === room.caseId
                        ? "text-blue-100"
                        : "text-slate-500"
                    }`}
                  >
                    {room.subject}
                  </p>
                  <p
                    className={`mt-2 line-clamp-2 text-sm ${
                      selectedCaseId === room.caseId
                        ? "text-blue-50"
                        : "text-slate-600"
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
                    Conversation for Case #{selectedCaseId}
                  </p>
                  <p className="text-sm text-slate-500">
                    Your replies here go directly to the admin messages page
                  </p>
                </div>
                <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                  Connected
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {activeMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderRole === "client" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                        message.senderRole === "client"
                          ? "bg-emerald-600 text-white"
                          : "border border-blue-200 bg-white text-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">
                          {message.senderRole === "admin" ? "Admin Team" : "You"}
                        </p>
                        <span
                          className={`text-[11px] ${
                            message.senderRole === "client"
                              ? "text-emerald-100"
                              : "text-slate-400"
                          }`}
                        >
                          {new Date(message.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p
                        className={`mt-1 text-[11px] uppercase tracking-[0.16em] ${
                          message.senderRole === "client"
                            ? "text-emerald-100"
                            : "text-slate-400"
                        }`}
                      >
                        {message.subject}
                      </p>
                      <p
                        className={`mt-2 text-sm ${
                          message.senderRole === "client"
                            ? "text-white"
                            : "text-slate-600"
                        }`}
                      >
                        {message.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <h4 className="font-medium">Reply in this room</h4>
                <Textarea
                  rows={4}
                  placeholder="Type your message here..."
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button onClick={handleSend} disabled={!messageBody.trim()}>
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProfileTab: React.FC = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Profile Settings</CardTitle>
        <CardDescription>Manage your account information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg"
                defaultValue="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border rounded-lg"
                defaultValue="client@fundrecovery.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                className="w-full p-3 border rounded-lg"
                defaultValue="+1 (555) 123-4567"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Preferred Contact Method
              </label>
              <select className="w-full p-3 border rounded-lg">
                <option>Email</option>
                <option>Phone</option>
                <option>Both</option>
              </select>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="font-medium mb-3">Security Settings</h4>
            <div className="space-y-3">
              <Button variant="outline">Change Password</Button>
              <Button variant="outline">
                Enable Two-Factor Authentication
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex justify-end space-x-3">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const ReportCaseTab: React.FC = () => {
  const [formData, setFormData] = useState({
    scamType: "",
    amountLost: "",
    dateOccurred: "",
    description: "",
    contactMethod: "",
    urgency: "medium",
    additionalInfo: "",
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    alert(
      "Case report submitted successfully! Our team will review it within 24 hours.",
    );
    setIsSubmitting(false);

    // Reset form
    setFormData({
      scamType: "",
      amountLost: "",
      dateOccurred: "",
      description: "",
      contactMethod: "",
      urgency: "medium",
      additionalInfo: "",
    });
    setUploadedFiles([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2" />
            Report a New Case
          </CardTitle>
          <CardDescription>
            Submit details about your scam experience. Our team will review and
            contact you within 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="scamType">Type of Scam *</Label>
                <Select
                  value={formData.scamType}
                  onValueChange={(value) =>
                    handleInputChange("scamType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select scam type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="crypto">
                      Crypto & Bitcoin Scam
                    </SelectItem>
                    <SelectItem value="romance">Romance Scam</SelectItem>
                    <SelectItem value="investment">Investment Fraud</SelectItem>
                    <SelectItem value="forex">Forex Trading Scam</SelectItem>
                    <SelectItem value="bank">Bank Wire Fraud</SelectItem>
                    <SelectItem value="casino">Online Casino Fraud</SelectItem>
                    <SelectItem value="phishing">Phishing Attack</SelectItem>
                    <SelectItem value="ponzi">Ponzi Scheme</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amountLost">Amount Lost (USD) *</Label>
                <Input
                  id="amountLost"
                  type="number"
                  placeholder="e.g., 50000"
                  value={formData.amountLost}
                  onChange={(e) =>
                    handleInputChange("amountLost", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOccurred">Date of Incident *</Label>
                <Input
                  id="dateOccurred"
                  type="date"
                  value={formData.dateOccurred}
                  onChange={(e) =>
                    handleInputChange("dateOccurred", e.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactMethod">How were you contacted?</Label>
                <Select
                  value={formData.contactMethod}
                  onValueChange={(value) =>
                    handleInputChange("contactMethod", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="app">Mobile App</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Detailed Description *</Label>
              <Textarea
                id="description"
                placeholder="Please provide as much detail as possible about what happened, including names, websites, account numbers, and any other relevant information..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={6}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level</Label>
              <Select
                value={formData.urgency}
                onValueChange={(value) => handleInputChange("urgency", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    Low - Can wait a few weeks
                  </SelectItem>
                  <SelectItem value="medium">
                    Medium - Need assistance soon
                  </SelectItem>
                  <SelectItem value="high">
                    High - Urgent assistance needed
                  </SelectItem>
                  <SelectItem value="critical">
                    Critical - Immediate action required
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Any additional details, questions, or special circumstances..."
                value={formData.additionalInfo}
                onChange={(e) =>
                  handleInputChange("additionalInfo", e.target.value)
                }
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <Label>Supporting Documents</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload screenshots, emails, transaction records, or any
                    other relevant documents
                  </p>
                  <Input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <Label htmlFor="file-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" size="sm">
                      Choose Files
                    </Button>
                  </Label>
                </div>
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-2">
                  <Label>Uploaded Files:</Label>
                  {uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-50 rounded"
                    >
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-gray-500">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(index)}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">
                    What happens next?
                  </h4>
                  <ul className="text-sm text-blue-800 mt-1 space-y-1">
                    <li>• Our team will review your case within 24 hours</li>
                    <li>• We'll contact you to discuss next steps</li>
                    <li>
                      • A dedicated recovery agent will be assigned to your case
                    </li>
                    <li>• All information is kept strictly confidential</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline">
                Save as Draft
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Case Report"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
