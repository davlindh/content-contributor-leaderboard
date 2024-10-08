import { Home, User, UserCircle, LogIn } from "lucide-react";
import Index from "./pages/Index.jsx";
import UserPage from "./pages/UserPage.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import LoginPage from "./pages/LoginPage.jsx";

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
    title: "Add Content",
    to: "/user",
    icon: <User className="h-4 w-4" />,
    page: <UserPage />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: <UserCircle className="h-4 w-4" />,
    page: <UserProfile />,
  },
  {
    title: "Login",
    to: "/login",
    icon: <LogIn className="h-4 w-4" />,
    page: <LoginPage />,
  },
];
