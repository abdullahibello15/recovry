import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Homepage } from "./components/pages/Homepage";
import { Services } from "./components/pages/Services";
import { HowItWorks } from "./components/pages/HowItWorks";
import { AboutUs } from "./components/pages/AboutUs";
import { SuccessStories } from "./components/pages/SuccessStories";
import { Contact } from "./components/pages/Contact";
import { FreeConsultation } from "./components/pages/FreeConsultation";

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
]);
