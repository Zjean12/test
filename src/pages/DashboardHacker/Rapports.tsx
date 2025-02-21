import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Link } from 'react-router-dom';
import Header from './HeaderHack';

// Données fictives pour les gains
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

  const filteredEarnings = mockEarnings.filter(earning =>
    earning.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    earning.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalEarnings = mockEarnings.reduce(
    (sum, earning) => sum + parseInt(earning.totalBounties.replace(/,/g, '')),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Mes Gains</h1>
          
          {/* Carte de Résumé */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Gains Totaux</h3>
                <p className="text-3xl font-bold text-primary">{totalEarnings.toLocaleString()} ₣</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Programmes Totaux</h3>
                <p className="text-3xl font-bold">{mockEarnings.length}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Taux de Réussite</h3>
                <p className="text-3xl font-bold text-green-600">
                  {Math.round(
                    (mockEarnings.reduce((sum, e) => sum + e.acceptedReports, 0) /
                    mockEarnings.reduce((sum, e) => sum + e.reportsSubmitted, 0)) * 100
                  )}%
                </p>
              </div>
            </div>
          </div>

          <div className="relative mb-8">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher des programmes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6">
          {filteredEarnings.map((earning, index) => (
            <motion.div
              key={earning.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{earning.programName}</h3>
                    <p className="text-sm text-gray-500 mb-2">{earning.company}</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Rapports Soumis</p>
                        <p className="font-semibold">{earning.reportsSubmitted}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Rapports Acceptés</p>
                        <p className="font-semibold">{earning.acceptedReports}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Dernière activité : {earning.lastActivity}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-semibold mb-2">
                      ₣{earning.totalBounties}
                    </div>
                    <Button
                      className="flex items-center"
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
                    className="mt-6 pt-6 border-t"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-600">Vulnérabilités Critiques</h4>
                        <p className="text-lg font-semibold text-red-600">
                          {earning.details.criticalFindings}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-600">Vulnérabilités Élevées</h4>
                        <p className="text-lg font-semibold text-orange-600">
                          {earning.details.highFindings}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-600">Vulnérabilités Moyennes</h4>
                        <p className="text-lg font-semibold text-yellow-600">
                          {earning.details.mediumFindings}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-600">Temps de Réponse Moyen</h4>
                        <p className="text-lg font-semibold">
                          {earning.details.averageResponseTime}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button asChild>
                        <Link to={`/reports?program=${earning.id}`}>
                          <TrendingUp className="mr-2 h-4 w-4" />
                          Voir Tous les Rapports
                        </Link>
                      </Button>
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