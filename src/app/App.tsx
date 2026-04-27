import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AdminDataProvider } from "./AdminDataContext";
import { AuthProvider } from "./AuthContext";
import { MessagesProvider } from "./MessagesContext";

export default function App() {
  return (
    <AuthProvider>
      <AdminDataProvider>
        <MessagesProvider>
          <RouterProvider router={router} />
        </MessagesProvider>
      </AdminDataProvider>
    </AuthProvider>
  );
}
