import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpRight,Bell, Settings, LogOut } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Link } from 'react-router-dom';
import Header from './HeaderHack';
import useProfile from '../../hooks/useProfile'; // Ajout de l'import



const mockEarnings = [
  {
    id: '1',
    programName: 'Sécurité des Applications Web',
    company: 'TechCorp',
    totalBounties: '2,500,000',
    reportsSubmitted: 5,
    acceptedReports: 3,
    lastActivity: '2024-03-15',
    details: {
      criticalFindings: 2,
      highFindings: 1,
      mediumFindings: 2,
      averageResponseTime: '48 heures'
    }
  },
  {
    id: '2',
    programName: 'Sécurité des Applications Mobiles',
    company: 'SecureBank',
    totalBounties: '1,800,000',
    reportsSubmitted: 3,
    acceptedReports: 2,
    lastActivity: '2024-03-10',
    details: {
      criticalFindings: 1,
      highFindings: 1,
      mediumFindings: 1,
      averageResponseTime: '72 heures'
    }
  }
];

export default function Earnings() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const { profile } = useProfile(); // Utilisation du hook

  const filteredEarnings = mockEarnings.filter(earning =>
    earning.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    earning.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
console.log(profile)
  return (
    <div className="min-h-screen bg-[#141d2b] text-gray-100">
      <div className="bg-[#1a2332] shadow-lg fixed top-0 left-0 right-0 z-50 border-b border-[#2a3655]">
        <Header avatar={profile?.avatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'} />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-[#2a3655] text-gray-300 hover:text-gray-100"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-cyan-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </Button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-[#1a2332] rounded-lg shadow-xl border border-[#2a3655] z-50">
                    <div className="p-4 border-b border-[#2a3655]">
                      <h3 className="font-semibold text-gray-100">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      <div className="p-4 border-b border-[#2a3655] hover:bg-[#2a3655] cursor-pointer transition-colors">
                        <h4 className="font-medium text-gray-100">Statut du Rapport Mis à Jour</h4>
                        <p className="text-sm text-gray-400">Votre rapport pour la sécurité des applications web a été examiné</p>
                        <span className="text-xs text-gray-500">il y a 2 heures</span>
                      </div>
                      <div className="p-4 border-b border-[#2a3655] hover:bg-[#2a3655] cursor-pointer transition-colors">
                        <h4 className="font-medium text-gray-100">Prime Attribuée</h4>
                        <p className="text-sm text-gray-400">Vous avez reçu une prime pour votre rapport sur la sécurité des applications mobiles</p>
                        <span className="text-xs text-gray-500">il y a 1 jour</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-[#2a3655] text-gray-300 hover:text-gray-100"
                asChild
              >
                <Link to="/hacker/settings?tab=profile">
                  <Settings className="h-5 w-5" />
                </Link>
              </Button>

              <Button 
                variant="ghost" 
                size="icon"
                className="hover:bg-[#2a3655] text-gray-300 hover:text-gray-100"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-100">Mes Gains</h1>

          {/* Carte de Résumé */}
          <div className="bg-[#1a2332] rounded-lg shadow-xl p-6 mb-8 border border-[#2a3655]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Carte 1: Gains Totaux */}
              <div className="bg-[#1a2332] rounded-lg shadow-lg p-6 border border-[#2a3655]">
                <h3 className="text-lg font-semibold mb-2 text-gray-400">Gains Totaux</h3>
                <p className="text-3xl font-bold text-cyan-500">{profile?.stats.total_prime} ₣</p>
              </div>

              {/* Carte 2: Programmes Totaux */}
              <div className="bg-[#1a2332] rounded-lg shadow-lg p-6 border border-[#2a3655]">
                <h3 className="text-lg font-semibold mb-2 text-gray-400">Programmes Totaux</h3>
                <p className="text-3xl font-bold text-gray-100">{profile?.stats.total_prg.length}</p>
              </div>

              {/* Carte 3: Réputation */}
              <div className="bg-[#1a2332] rounded-lg shadow-lg p-6 border border-[#2a3655]">
                <h3 className="text-lg font-semibold mb-2 text-gray-400">Réputation</h3>
                <p className="text-3xl font-bold text-gray-100">{profile?.stats.reputation}</p>
              </div>

              {/* Carte 4: Taux de Réussite */}
              <div className="bg-[#1a2332] rounded-lg shadow-lg p-6 border border-[#2a3655]">
                <h3 className="text-lg font-semibold mb-2 text-gray-400">Taux de Réussite</h3>
                <p className="text-3xl font-bold text-cyan-500">
                  {profile?.stats.success_rate}%
                </p>
              </div>
            </div>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Rechercher des programmes..."
              className="pl-10 bg-[#1a2332] border-[#2a3655] text-gray-100 placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-800"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6">
          {filteredEarnings.map((earning, index) => (
            <motion.div
              key={earning.id}
              className="bg-[#1a2332] rounded-lg shadow-xl overflow-hidden border border-[#2a3655]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-gray-100">{earning.programName}</h3>
                    <p className="text-sm text-gray-400 mb-2">{earning.company}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-400">Rapports Soumis </p>
                        <p className="font-semibold text-gray-100">{earning.reportsSubmitted}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Rapports Acceptés</p>
                        <p className="font-semibold text-gray-100">{earning.acceptedReports}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Dernière activité : {earning.lastActivity}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-500 font-semibold mb-2">
                      {earning.totalBounties}₣
                    </div>
                    <Button
                      className="bg-[#2a3655] hover:bg-[#374873] text-gray-100 border-none"
                      onClick={() => setSelectedProgram(earning.id)}
                    >
                      Voir les Détails
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Détails Étendus */}
                {selectedProgram === earning.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-[#2a3655]"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Vulnérabilités Critiques</h4>
                        <p className="text-lg font-semibold text-red-400">
                          {earning.details.criticalFindings}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Vulnérabilités Élevées</h4>
                        <p className="text-lg font-semibold text-orange-400">
                          {earning.details.highFindings}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Vulnérabilités Moyennes</h4>
                        <p className="text-lg font-semibold text-yellow-400">
                          {earning.details.mediumFindings}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-400">Temps de Réponse Moyen</h4>
                        <p className="text-lg font-semibold text-gray-100">
                          {earning.details.averageResponseTime}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
