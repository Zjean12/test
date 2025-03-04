import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../../components/ui/use-toast';
import useProfile from '../../hooks/useProfile';
import useLogout from '../../hooks/useLogout';

// Données fictives pour démonstration
const notifications = [
  {
    id: 1,
    title: 'Nouveau rapport soumis',
    message: 'Un nouveau rapport de vulnérabilité a été soumis pour le Programme A',
    time: 'il y a 2 heures',
    unread: true,
  },
  {
    id: 2,
    title: 'Statut du rapport mis à jour',
    message: 'Votre rapport pour le Programme B a été examiné',
    time: 'il y a 1 jour',
    unread: false,
  },
];

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { profile, loading, error } = useProfile();  // Utilisation du hook useProfile
  const { handleLogout } = useLogout();
  const { toast } = useToast();
  const navigate = useNavigate();

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
      navigate('entreprise/login'); // Redirection vers la page de connexion
    }
  }, [loading, profile, navigate]);

  // Si l'utilisateur est en cours de chargement ou a une erreur
  if (loading || error) {
    return null; // ou un loader ou message d'erreur si tu veux
  }

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Entreprise</h1>
        <p className="text-gray-400">Bienvenue</p>
      </div>

      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <div className="relative">
          <button
            className="relative text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.filter((n) => n.unread).length}
            </span>
          </button>

          {showNotifications && (
            <motion.div
              className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg z-50 border border-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="p-4 border-b border-gray-700">
                <h3 className="font-semibold text-white">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-700 hover:bg-gray-700 cursor-pointer ${
                      notification.unread ? 'bg-gray-700' : ''
                    }`}
                  >
                    <h4 className="font-medium text-white">{notification.title}</h4>
                    <p className="text-sm text-gray-300">{notification.message}</p>
                    <span className="text-xs text-gray-400">{notification.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Menu utilisateur */}
        <div className="relative">
          <button
            className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <img
              src={profile?.avatarUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"}
              alt="Profil"
              className="w-8 h-8 rounded-full"
            />
            <span>{profile?.email || 'Jean Dupont'}</span>
            <ChevronDown className="h-4 w-4" />
          </button>

          {showProfileMenu && (
            <motion.div
              className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-3 px-4 space-y-2 z-50 border border-gray-700"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Link
                to="/dashboard/settings"
                className="block w-full text-left text-cyan-500 hover:bg-gray-700 rounded-lg p-2 transition duration-200"
              >
                Mon profil
              </Link>
              <button
                onClick={onLogout}
                className="block w-full text-left text-red-500 hover:bg-gray-700 rounded-lg p-2 transition duration-200"
              >
                Déconnexion
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}