import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Bell } from 'lucide-react';
import { motion } from 'framer-motion'; // Importation de motion

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notifications] = useState([
    { id: 1, title: 'Nouveau message', message: 'Votre rapport a été reçu.', time: '2 min', unread: true },
    { id: 2, title: 'Message', message: 'Le rapport a été validé.', time: '1h', unread: false },
  ]);

  const navigate = useNavigate();

  // Récupérer l'email et l'avatar du hacker depuis localStorage
  const hackerEmail = localStorage.getItem('hackerEmail') || 'hacker@example.com';
  const hackerAvatar = localStorage.getItem('hackerAvatar') || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&h=250&q=80';
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const handleLogout = async () => {
    try {
      // Appel à l'API pour la déconnexion
      const response = await fetch(`${API_BASE_URL}/auth/logout`, { method: 'POST' });
      if (!response.ok) {
        throw new Error('Erreur lors de la déconnexion');
      }

      // Effacer les informations du localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('hackerEmail');
      localStorage.removeItem('hackerAvatar');

      // Rediriger l'utilisateur vers la page de connexion
      navigate('/hacker/login');
    } catch (error) {
      console.error('Erreur de déconnexion', error);
    }
  };

  return (
    <div className="bg-white shadow-lg fixed top-0 left-0 right-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/HackerDashboard" className="text-xl font-bold text-primary hover:text-blue-500 transition duration-200">
              Tableau de bord Hacker
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <Link to="/HackerDashboard" className="text-sm font-medium text-gray-700 hover:text-primary transition duration-200">
                Programmes
              </Link>
              <Link to="/hacker/gains" className="text-sm font-medium text-gray-700 hover:text-primary transition duration-200">
                Mes Rapports
              </Link>
              <Link to="/hacker/Rapports" className="text-sm font-medium text-gray-700 hover:text-primary transition duration-200">
                Gains
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100 rounded-full p-2 transition duration-200"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.filter(n => n.unread).length}
                </span>
              </Button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-300">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-gray-700">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${notification.unread ? 'bg-blue-50' : ''}`}
                      >
                        <h4 className="font-medium text-gray-800">{notification.title}</h4>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Affichage de l'avatar et de l'email du hacker */}
            <div className="relative flex items-center gap-4">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                <img
                  src={hackerAvatar}
                  alt="Hacker Avatar"
                  className="w-10 h-10 rounded-full border-2 border-[#67b09d] shadow-md transition-transform transform hover:scale-105"
                />
                <span className="text-sm text-[#67b09d]">{hackerEmail}</span>
              </div>

              {/* Menu déroulant profil */}
              {showProfileMenu && (
                <motion.div 
                  className="absolute top-16 right-0 w-48 bg-white rounded-xl shadow-lg py-3 px-4 space-y-2 z-50"
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Link
                    to="/hacker/settings"
                    className="w-full text-left text-black hover:bg-[#e0e7ff] rounded-xl p-2"
                  >
                    Mon profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-red-600 hover:bg-[#f8f9fe] rounded-xl p-2"
                  >
                    Déconnexion
                  </button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
