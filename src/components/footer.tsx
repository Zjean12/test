import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 items-start">
          {/* Logo Section */}
          <div className="flex justify-center md:justify-start">
            <img src="/logo.png" alt="Logo" className="h-24" />
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-cyan-400">À Propos</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-4">
              Plateforme de bug bounty et de sécurité informatique pour connecter les entreprises et les chercheurs en sécurité.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-cyan-400">Liens Rapides</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors">Accueil</Link></li>
              <li><Link to="/programs" className="text-gray-400 hover:text-cyan-400 transition-colors">Programmes</Link></li>
              <li><Link to="/hackers" className="text-gray-400 hover:text-cyan-400 transition-colors">Classement</Link></li>
            </ul>
          </div>

          {/* Join Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-cyan-400">Rejoindre</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li><Link to="/entreprise/register" className="text-gray-400 hover:text-cyan-400 transition-colors">En tant qu'Entreprise</Link></li>
              <li><Link to="/hacker/register" className="text-gray-400 hover:text-cyan-400 transition-colors">En tant que Hacker</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-cyan-400">Contact</h3>
            <ul className="space-y-3 text-sm sm:text-base">
              <li className="flex items-start"><MapPin className="h-5 w-5 mr-2 text-cyan-400 flex-shrink-0 mt-0.5" /><span className="text-gray-400">Abidjan, Côte d'Ivoire</span></li>
              <li className="flex items-center"><Phone className="h-5 w-5 mr-2 text-cyan-400 flex-shrink-0" /><span className="text-gray-400">+225 07 XX XX XX XX</span></li>
              <li className="flex items-center"><Mail className="h-5 w-5 mr-2 text-cyan-400 flex-shrink-0" /><span className="text-gray-400">contact@example.com</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6">
          <p className="text-center text-xs sm:text-sm text-gray-500">© {new Date().getFullYear()} Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
