import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSupabaseAuth } from '../integrations/supabase/auth';
import { Button } from "@/components/ui/button";
import { navItems } from '../nav-items';

const Layout = ({ children }) => {
  const { session, logout } = useSupabaseAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">MyApp</Link>
          <nav className="hidden md:flex space-x-4">
            {navItems.map(({ title, to }) => (
              <Link key={to} to={to} className="hover:text-gray-300">{title}</Link>
            ))}
            {session ? (
              <Button onClick={logout} variant="outline">Logout</Button>
            ) : (
              <Link to="/login" className="hover:text-gray-300">Login</Link>
            )}
          </nav>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            Menu
          </button>
        </div>
      </header>
      {isMenuOpen && (
        <div className="md:hidden bg-gray-700 text-white p-4">
          {navItems.map(({ title, to }) => (
            <Link
              key={to}
              to={to}
              className="block py-2 hover:text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {title}
            </Link>
          ))}
          {session ? (
            <Button onClick={logout} variant="outline" className="w-full mt-2">Logout</Button>
          ) : (
            <Link
              to="/login"
              className="block py-2 hover:text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto text-center">
          © 2024 MyApp. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
