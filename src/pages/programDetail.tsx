import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Send, ArrowLeft, Shield, Target, AlertTriangle, Trophy, Users, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '../components/ui/button';
import readmeContent from './README.md?raw';
import { useNavigate } from 'react-router-dom';
import { useToast } from "../components/ui/use-toast";
import Navbar from '../components/Navbar';
import SevBar from '../components/Sevbar';

// Mock program data
const programData = {
    id: '1',
    name: 'Programme de Sécurité des Applications Web',
    description: 'Trouvez des vulnérabilités dans nos applications web',
    exclusions: "Attaques d'ingénierie sociale, attaques DDoS, tests de sécurité physique",
    bountyRanges: {
      low: '50 000',
      medium: '100 000',
      high: '500 000',
      critical: '2 000 000'
    },
    assets: [
      {
        id: 1,
        name: "*.example.com",
        description: "Application web principale",
        type: "Domaine",
        coverage: "Inclus",
        severity: "Critique",
        bounty: "Éligible"
      },
      {
        id: 2,
        name: "api.example.com",
        description: "Endpoints de l'API",
        type: "API",
        coverage: "Inclus",
        severity: "Critique",
        bounty: "Éligible",
        isNew: true
      },
      {
        id: 3,
        name: "mobile.example.com",
        type: "Mobile",
        coverage: "Inclus",
        severity: "Élevé",
        bounty: "Éligible"
      }
    ],
    stats: {
      hackers: 324,
      reports: 892,
      bounties: '3.5M'
    }
};

interface HackerProfile {
  id: number;
  name: string;
  reputation: number;
  avatar: string;
}

const hackers: HackerProfile[] = [
  { id: 1, name: 'syahrul_akbar_r', reputation: 285, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop' },
  { id: 2, name: 'encodégars', reputation: 178, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop' },
  { id: 3, name: 'foui', reputation: 175, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop' }
];

const severityColors = {
  low: 'from-blue-400 to-blue-600',
  medium: 'from-yellow-400 to-yellow-600',
  high: 'from-orange-400 to-orange-600',
  critical: 'from-red-400 to-red-600'
};

function HackerCard({ hacker }: { hacker: HackerProfile }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700 hover:border-cyan-400/50 transition-all duration-300"
    >
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-cyan-400">
            <img src={hacker.avatar} alt={hacker.name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-1 -right-1">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
          </div>
        </div>
        <div className="min-w-0">
          <div className="text-sm font-medium text-white truncate">{hacker.name}</div>
          <div className="text-sm text-gray-400">Reputation: {hacker.reputation}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProgramDetail() {
  const navigate = useNavigate();
  const [isAuthenticated] = useState(false);
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitReport = () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
    } else {
      toast({
        title: "Authentification requise",
        description: "Veuillez vous inscrire ou vous connecter en tant que hacker pour soumettre un rapport.😉",
        variant: "default",
      });
    }
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate('/hacker/register');
    toast({
      title: "Authentification requise",
      description: "Veuillez vous inscrire ou vous connecter en tant que hacker pour soumettre un rapport.😉",
      variant: "default",
    });
  };
  

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar /> <SevBar />
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-gray-800 p-6 rounded-xl shadow-xl max-w-sm w-full mx-4 border border-gray-700"
          >
            <h3 className="text-xl font-semibold mb-4 text-cyan-400">Authentification requise</h3>
            <p className="text-gray-300 mb-6">Veuillez vous inscrire ou vous connecter en tant que hacker pour soumettre un rapport.😉</p>
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={handleModalCancel} className="text-gray-400 hover:text-white">
                Annuler
              </Button>
              <Button onClick={handleModalConfirm} className="bg-cyan-500 hover:bg-cyan-600">
                OK
              </Button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 pb-24 sm:pb-28 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/programs')}
            className="flex items-center gap-2 text-cyan-400 hover:text-black mb-4 md:mb-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux programmes
          </Button>
          <div>
            <h1 className=" md:leading-[1.30] text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {programData.name}
            </h1>
            <p className="text-gray-400 text-base sm:text-lg">{programData.description}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700"
          >
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 mb-2 sm:mb-4" />
            <div className="text-xl sm:text-2xl font-bold">{programData.stats.hackers}</div>
            <div className="text-sm sm:text-base text-gray-400">Hackers Actifs</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700"
          >
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 mb-2 sm:mb-4" />
            <div className="text-xl sm:text-2xl font-bold">{programData.stats.reports}</div>
            <div className="text-sm sm:text-base text-gray-400">Rapports Soumis</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-700 sm:col-span-2 md:col-span-1"
          >
            <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500 mb-2 sm:mb-4" />
            <div className="text-xl sm:text-2xl font-bold">{programData.stats.bounties}₣</div>
            <div className="text-sm sm:text-base text-gray-400">Primes Versées</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-xl p-5 sm:p-8 mb-6 sm:mb-8 border border-gray-700"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Exclusions</h2>
          </div>
          <p className="text-gray-300 text-base sm:text-lg">{programData.exclusions}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-xl p-5 sm:p-8 mb-6 sm:mb-8 border border-gray-700"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
            <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Récompenses</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {Object.entries(programData.bountyRanges).map(([severity, amount], index) => (
              <motion.div
                key={severity}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 rounded-xl p-3 sm:p-6 border border-gray-700"
              >
                <div className="text-sm sm:text-lg font-medium text-gray-400 capitalize mb-1 sm:mb-2">
                  {severity}
                </div>
                <div className={`text-lg sm:text-2xl md:text-3xl font-bold bg-gradient-to-r ${severityColors[severity as keyof typeof severityColors]} bg-clip-text text-transparent`}>
                  {amount} ₣
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-800 rounded-xl p-5 sm:p-8 mb-6 sm:mb-8 border border-gray-700"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
            <Target className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Périmètre du Programme</h2>
          </div>
          <div className="overflow-x-auto -mx-5 sm:-mx-8">
            <div className="inline-block min-w-full px-5 sm:px-8">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 sm:py-4 px-2 sm:px-4 text-left text-xs sm:text-sm text-gray-400">Asset</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-4 text-left text-xs sm:text-sm text-gray-400">Type</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-4 text-left text-xs sm:text-sm text-gray-400">Coverage</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-4 text-left text-xs sm:text-sm text-gray-400">Severity</th>
                    <th className="py-3 sm:py-4 px-2 sm:px-4 text-left text-xs sm:text-sm text-gray-400">Bounty</th>
                  </tr>
                </thead>
                <tbody>
                  {programData.assets.map((asset) => (
                    <motion.tr
                      key={asset.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-b border-gray-700 hover:bg-gray-700/50"
                    >
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <div className="flex flex-col">
                          <div className="flex flex-wrap items-center gap-2">
                            {asset.isNew && (
                              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
                                Nouveau
                              </span>
                            )}
                            <span className="font-medium text-white text-sm sm:text-base">{asset.name}</span>
                          </div>
                          {asset.description && (
                            <span className="text-xs sm:text-sm text-gray-400 mt-1">{asset.description}</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-300">{asset.type}</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4">
                        <span className="bg-cyan-500/20 text-cyan-400 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm">
                          {asset.coverage}
                        </span>
                      </td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-300">{asset.severity}</td>
                      <td className="py-3 sm:py-4 px-2 sm:px-4 text-xs sm:text-sm text-gray-300">{asset.bounty}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-800 rounded-xl p-5 sm:p-8 border border-gray-700 mb-6 sm:mb-8"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-lg sm:text-xl font-semibold mt-5 sm:mt-6 mb-2 sm:mb-3 text-white" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-base sm:text-lg font-medium mt-3 sm:mt-4 mb-1 sm:mb-2 text-white" {...props} />
              ),
              p: ({ node, ...props }) => <p className="mb-3 text-sm sm:text-base text-gray-300" {...props} />,
              pre: ({ node, ...props }) => (
                <pre className="bg-gray-900 p-3 sm:p-4 rounded-xl mb-3 sm:mb-4 overflow-auto text-xs sm:text-sm border border-gray-700" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-cyan-400 pl-3 sm:pl-4 italic text-sm sm:text-base text-gray-400" {...props} />
              ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto">
                  <table className="border-collapse w-full text-sm" {...props} />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th className="px-3 sm:px-4 py-1 sm:py-2 border border-gray-700 text-left text-xs sm:text-sm" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="px-3 sm:px-4 py-1 sm:py-2 border border-gray-700 text-xs sm:text-sm" {...props} />
              ),
            }}
          >
            {readmeContent}
          </ReactMarkdown>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gray-800 rounded-xl p-5 sm:p-8 mb-20 sm:mb-24 border border-gray-700"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-5 sm:mb-8">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">Top Hackers</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {hackers.map((hacker) => (
              <HackerCard key={hacker.id} hacker={hacker} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 sm:bottom-6 md:bottom-8 left-0 right-0 px-4 z-40"
        >
          <div className="max-w-7xl mx-auto">
            <Button
              className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-4 sm:py-6 rounded-xl shadow-lg flex items-center justify-center gap-2 sm:gap-3 text-base sm:text-lg"
              size="lg"
              onClick={handleSubmitReport}
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              Soumettre un rapport
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}