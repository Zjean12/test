import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpRight } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Link } from 'react-router-dom';
import Header from './HeaderHack';

// Données fictives pour les rapports
const mockReports = [
  {
    id: '1',
    programName: 'Sécurité des Applications Web',
    company: 'TechCorp',
    submissionDate: '2024-03-15',
    status: 'Accepté',
    severity: 'Critique',
    bounty: '500,000',
    description: 'Vulnérabilité d\'exécution de code à distance dans le système de connexion'
  },
  {
    id: '2',
    programName: 'Sécurité des Applications Mobiles',
    company: 'SecureBank',
    submissionDate: '2024-03-10',
    status: 'En Cours de Revue',
    severity: 'Élevée',
    bounty: 'En Attente',
    description: 'Contournement de l\'authentification dans l\'API mobile'
  }
];

export default function Reports() {
  const [searchTerm, setSearchTerm] = useState('');
  const [avatar] = useState(() => {
    const savedAvatar = localStorage.getItem('avatar');
    return savedAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=1';
  });

  const filteredReports = mockReports.filter(report =>
    report.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepté': return 'bg-cyan-500 text-black';
      case 'en cours de revue': return 'bg-[#ffb800] text-black';
      case 'rejeté': return 'bg-red-500 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critique': return 'bg-red-500 text-white';
      case 'élevée': return 'bg-[#ff6b00] text-white';
      case 'moyenne': return 'bg-[#ffb800] text-black';
      case 'faible': return 'bg-blue-500 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[#141d2b] text-gray-100">
      <Header avatar={avatar} />
      
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            <Input
              type="text"
              placeholder="Rechercher des rapports..."
              className="pl-10 bg-[#1a2332] border-[#2a3655] text-gray-100 placeholder-gray-500 focus:border-cyan-500 focus:ring-cyan-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              className="bg-[#1a2332] rounded-lg shadow-xl overflow-hidden border border-[#2a3655]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-gray-100">{report.programName}</h3>
                    <p className="text-sm text-gray-400 mb-2">{report.company}</p>
                    <p className="text-sm text-gray-400 mb-4">{report.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs ${getSeverityColor(report.severity)}`}>
                        {report.severity}
                      </span>
                      <span className="px-3 py-1 bg-[#2a3655] text-gray-100 rounded-full text-xs">
                        Soumis le : {report.submissionDate}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-cyan-500 font-semibold mb-2">
                      {report.bounty !== 'En Attente' ? `${report.bounty}₣` : 'En Attente '}
                    </div>
                    <Button 
                      className="bg-[#2a3655] hover:bg-[#374873] text-gray-100 border-none" 
                      asChild
                    >
                      <Link to={`/reports/${report.id}`}>
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
    </div>
  );
}