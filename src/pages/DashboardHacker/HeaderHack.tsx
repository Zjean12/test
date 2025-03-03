import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../../components/ui/use-toast';
import useProfile from '../../hooks/useProfile';
import useLogout from '../../hooks/useLogout';

interface HeaderProps {
  avatar: string;
}

const Header = ({ avatar }: HeaderProps) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { profile, loading, error } = useProfile();  // Utilisation du hook useProfile
  const { handleLogout } = useLogout();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [notifications] = useState([
    { id: 1, title: 'Nouveau message', message: 'Votre rapport a été reçu.', time: '2 min', unread: true },
    { id: 2, title: 'Message', message: 'Le rapport a été validé.', time: '1h', unread: false },
  ]);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const onLogout = () => {
    handleLogout();
    toast({
      variant: 'success', // Ou 'destructive', 'info' en fonction du type de message
      title: 'Déconnexion réussie',
      description: 'Vous avez été déconnecté avec succès.',
    });
  };

  useEffect(() => {
    // Si l'utilisateur n'est pas authentifié, rediriger vers la page de login
    if (!loading && !profile) {
      navigate('/hacker/login'); // Redirection vers la page de connexion
    }
  }, [loading, profile, navigate]);

  // Si l'utilisateur est en cours de chargement ou a une erreur
  if (loading || error) {
    return null; // ou un loader ou message d'erreur si tu veux
  }

  return (
    <div className="bg-[#1a2332] shadow-xl fixed top-0 left-0 right-0 z-50 border-b border-[#2a3655]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link
              to="/HackerDashboard"
              className="text-xl font-bold text-cyan-400 hover:text-cyan-600 transition duration-300 transform hover:scale-105"
            >
              Tableau de bord Hacker
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              <Link
                to="/HackerDashboard"
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive('/HackerDashboard')
                    ? 'text-black bg-cyan-500 px-4 py-2 rounded-xl shadow-lg'
                    : 'text-gray-100 hover:bg-[#2a3655] hover:text-cyan-500 rounded-lg px-4 py-2'
                }`}
              >
                Programmes
              </Link>
              <Link
                to="/hacker/Rapports"
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive('/hacker/Rapports')
                    ? 'text-black bg-cyan-500 px-4 py-2 rounded-xl shadow-lg'
                    : 'text-gray-100 hover:bg-[#2a3655] hover:text-cyan-500 rounded-lg px-4 py-2'
                }`}
              >
                Mes Rapports
              </Link>
              <Link
                to="/hacker/gains"
                className={`text-sm font-medium transition-all duration-300 ${
                  isActive('/hacker/gains')
                    ? 'text-black bg-cyan-500 px-4 py-2 rounded-xl shadow-lg'
                    : 'text-gray-100 hover:bg-[#2a3655] hover:text-cyan-500 rounded-lg px-4 py-2'
                }`}
              >
                Gains
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-[#2a3655] rounded-full p-2 transition duration-200 transform hover:scale-110"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5 text-gray-100" />
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.filter((n) => n.unread).length}
                </span>
              </Button>

              {showNotifications && (
                <motion.div
                  className="absolute right-0 mt-2 w-80 bg-[#1a2332] rounded-lg shadow-xl z-50 border border-[#2a3655]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="p-4 border-b border-[#2a3655]">
                    <h3 className="font-semibold text-gray-100">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b border-[#2a3655] hover:bg-[#2a3655] cursor-pointer ${
                          notification.unread ? 'bg-[#2a3655]' : ''
                        }`}
                      >
                        <h4 className="font-medium text-gray-100">{notification.title}</h4>
                        <p className="text-sm text-gray-400">{notification.message}</p>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="relative flex items-center gap-4">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <img
                  src={profile?.avatarUrl || avatar}
                  alt="Hacker Avatar"
                  className="w-10 h-10 rounded-full border-2 border-cyan-500 shadow-xl transform hover:scale-105 transition duration-300"
                />
                <span className="text-sm text-gray-100">{profile?.pseudo || 'Utilisateur'}</span>
              </div>

              {showProfileMenu && (
                <motion.div
                  className="absolute top-16 right-0 w-48 bg-[#1a2332] rounded-xl shadow-xl py-3 px-4 space-y-2 z-50 border border-[#2a3655]"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <Link
                    to="/hacker/settings"
                    className="block w-full text-left text-cyan-500 hover:bg-[#2a3655] rounded-xl p-2 transition duration-200"
                  >
                    Mon profil
                  </Link>
                  <button
                    onClick={onLogout} // Utilisation de toast après la déconnexion
                    className="block w-full text-left text-red-500 hover:bg-[#2a3655] rounded-xl p-2 transition duration-200"
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
