import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Bug, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900/50 backdrop-blur-md fixed w-full z-50 py-4">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Bug className="h-8 w-8 text-cyan-400" />
          <span className="text-xl font-bold text-white">Ilimigroup</span>
        </Link>
        
        {/* Menu bureau */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/programs" className="text-gray-300 hover:text-white transition duration-300">Programmes</Link>
          <Link to="/hackers" className="text-gray-300 hover:text-white transition duration-300">Classement</Link>
          <div className="ml-4 flex items-center space-x-2">
            <Button variant="ghost" className="text-white bg-cyan-500 hover:bg-cyan-600 hover:text-cyan-400 transition" asChild>
              <Link to="/hacker/register">Commencer</Link>
            </Button>
          </div>
        </div>

        {/* Bouton menu mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-cyan-400 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/programs"
              className="block px-3 py-2 text-gray-700 hover:text-cyan-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Programmes
            </Link>
            <Link
              to="/hackers"
              className="block px-3 py-2 text-gray-700 hover:text-cyan-400 transition duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Classement
            </Link>
            <div className="mt-4 space-y-2 px-3">
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white" asChild>
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
