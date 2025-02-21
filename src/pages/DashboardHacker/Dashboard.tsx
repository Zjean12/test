import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpRight, Bell, Settings, LogOut, HelpCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Link } from 'react-router-dom';
import Header from './HeaderHack';

// Données fictives
const mockPrograms = [
  {
    id: '1',
    name: 'Sécurité des Applications Web',
    description: 'Trouvez des vulnérabilités dans nos applications web',
    bounty_ranges: {
      low: '50,000',
      critical: '2,000,000'
    },
    scope: [
      { id: '1', type: 'Web' },
      { id: '2', type: 'API' }
    ],
    status: 'active',
    company: 'TechCorp'
  },
  {
    id: '2',
    name: 'Sécurité des Applications Mobiles',
    description: 'Évaluation de la sécurité de nos applications mobiles',
    bounty_ranges: {
      low: '100,000',
      critical: '3,000,000'
    },
    scope: [
      { id: '3', type: 'iOS' },
      { id: '4', type: 'Android' }
    ],
    status: 'active',
    company: 'SecureBank'
  }
];

const notifications = [
  {
    id: 1,
    title: 'Statut du Rapport Mis à Jour',
    message: 'Votre rapport pour la sécurité des applications web a été examiné',
    time: 'il y a 2 heures',
    unread: true
  },
  {
    id: 2,
    title: 'Prime Attribuée',
    message: 'Vous avez reçu une prime pour votre rapport sur la sécurité des applications mobiles',
    time: 'il y a 1 jour',
    unread: false
  }
];

export default function HackerDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScope, setSelectedScope] = useState<string[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const filteredPrograms = mockPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesScope = selectedScope.length === 0 ||
                        program.scope.some(s => selectedScope.includes(s.type));
    return matchesSearch && matchesScope;
  });

  const allScopes = Array.from(new Set(mockPrograms.flatMap(p => p.scope.map(s => s.type))));

  return (
    <div className="min-h-screen bg-background">
  
      <div className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <Header />
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.filter(n => n.unread).length}
                  </span>
                </Button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b">
                      <h3 className="font-semibold">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                            notification.unread ? 'bg-blue-50' : ''
                          }`}
                        >
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <span className="text-xs text-gray-500">{notification.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Button variant="ghost" size="icon" asChild>
                <Link to="/hacker/settings?tab=profile">
                    <Settings className="h-5 w-5" />
                </Link>
              </Button>

              <Button variant="ghost" size="icon">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu Principal */}
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Programmes Disponibles</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher des programmes..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {allScopes.map(scope => (
                <Button
                  key={scope}
                  variant={selectedScope.includes(scope) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setSelectedScope(prev =>
                      prev.includes(scope)
                        ? prev.filter(s => s !== scope)
                        : [...prev, scope]
                    );
                  }}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {scope}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{program.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">{program.company}</p>
                    <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {program.scope.map(scope => (
                        <span
                          key={scope.id}
                          className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                        >
                          {scope.type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-semibold mb-2">
                      ₣{program.bounty_ranges.low} - ₣{program.bounty_ranges.critical}
                    </div>
                    <Button className="flex items-center" asChild>
                      <Link to={`/programs/${program.id}`}>
                        Voir les Détails
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bouton d'Aide */}
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}