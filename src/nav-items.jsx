import { Home, User } from "lucide-react";
import Index from "./pages/Index.jsx";
import UserPage from "./pages/UserPage.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "User",
    to: "/user",
    icon: <User className="h-4 w-4" />,
    page: <UserPage />,
  },
];
