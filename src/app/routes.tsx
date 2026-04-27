import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Homepage } from "./components/pages/Homepage";
import { Services } from "./components/pages/Services";
import { HowItWorks } from "./components/pages/HowItWorks";
import { AboutUs } from "./components/pages/AboutUs";
import { SuccessStories } from "./components/pages/SuccessStories";
import { Contact } from "./components/pages/Contact";
import { FreeConsultation } from "./components/pages/FreeConsultation";
import { Login } from "./components/pages/Login";
import { Signup } from "./components/pages/Signup";
import { Dashboard } from "./components/pages/Dashboard";
import { AdminRecordsPage } from "./components/pages/AdminRecordsPage";
import { AdminMessagesPage } from "./components/pages/AdminMessagesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Homepage },
      { path: "services", Component: Services },
      { path: "how-it-works", Component: HowItWorks },
      { path: "about", Component: AboutUs },
      { path: "success-stories", Component: SuccessStories },
      { path: "contact", Component: Contact },
      { path: "consultation", Component: FreeConsultation },
    ],
  },
  { path: "/login", Component: Login },
  { path: "/signup", Component: Signup },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/messages",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminMessagesPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/records",
    element: (
      <ProtectedRoute requiredRole="admin">
        <AdminRecordsPage />
      </ProtectedRoute>
    ),
  },
]);
