import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Bug, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <Bug className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">Ilimigroup</span>
            </Link>
          </div>

          {/* Menu bureau */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/programs" className="text-gray-700 hover:text-primary px-3 py-2">
              Programmes
            </Link>
            <Link to="/hackers" className="text-gray-700 hover:text-primary px-3 py-2">
              Classement
            </Link>
            <div className="ml-4 flex items-center space-x-2">
              <Button asChild>
                <Link to="/hacker/register">Commencer</Link>
              </Button>
            </div>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/programs"
              className="block px-3 py-2 text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Programmes
            </Link>
            <Link
              to="/hackers"
              className="block px-3 py-2 text-gray-700 hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Classement
            </Link>
            <div className="mt-4 space-y-2 px-3">
              <Button className="w-full" asChild>
                <Link to="/hacker/register" onClick={() => setIsMenuOpen(false)}>
                Commencer
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
