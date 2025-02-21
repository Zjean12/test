import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Send, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '../components/ui/button';
import readmeContent from './README.md?raw';
import { useNavigate } from 'react-router-dom';
import { useToast } from "../components/ui/use-toast";
import Navbar from '../components/Navbar';

// Mock program data
const programData = {
    id: '1',
    name: 'Programme de Sécurité des Applications Web',
    description: 'Trouvez des vulnérabilités dans nos applications web',
    exclusions: 'Attaques d’ingénierie sociale, attaques DDoS, tests de sécurité physique',
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

function HackerCard({ hacker }: { hacker: HackerProfile }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center gap-3 bg-white rounded-lg p-4 shadow-lg border border-gray-200 hover:border-primary/50 transition-all duration-300"
    >
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary">
          <img src={hacker.avatar} alt={hacker.name} className="w-full h-full object-cover" />
        </div>
        <div className="absolute -top-1 -right-1">
          <CheckCircle2 className="w-4 h-4 text-primary" />
        </div>
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-gray-900 truncate">{hacker.name}</div>
        <div className="text-sm text-gray-500">Reputation: {hacker.reputation}</div>
      </div>
    </motion.div>
  );
}

export default function ProgramDetail() {
  const navigate = useNavigate();
  const [isAuthenticated] = useState(false);
  const { toast } = useToast(); // Utiliser le hook useToast
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler l'affichage du modal

  const handleSubmitReport = () => {
      if (!isAuthenticated) {
          setIsModalOpen(true); // Ouvre le modal de confirmation
      } else {
          // Handle report submission
          toast({
              title: "Authentification requise",
              description: "Veuillez vous inscrire ou vous connecter en tant que hacker pour soumettre un rapport.😉",
              variant: "default", // Choisir le type de toast
          });
      }
  };

  const handleModalConfirm = () => {
      setIsModalOpen(false);
      navigate('/hacker/register');
      toast({
          title: "Authentification requise",
          description: "Veuillez vous inscrire ou vous connecter en tant que hacker pour soumettre un rapport.😉",
          variant: "default", // Choisir le type de toast
      });
  };

  const handleModalCancel = () => {
      setIsModalOpen(false); // Fermer la fenêtre modale sans faire d'action
  };

  return (
    <div className="">
      <Navbar />
      {/* Modal for Confirmation */}
      {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 min-h-screen bg-background pt-24">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                            <h3 className="text-lg font-semibold mb-4">Authentification requise</h3>
                            <p className="text-sm mb-6">Veuillez vous inscrire ou vous connecter en tant que hacker pour soumettre un rapport.😉</p>
                            <div className="flex justify-end gap-2">
                                <Button variant="ghost" onClick={handleModalCancel}>
                                    Annuler
                                </Button>
                                <Button variant="default" onClick={handleModalConfirm}>
                                    OK
                                </Button>
                            </div>
                        </div>
                    </div>
        )}
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8 flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/programs')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Programs
          </Button>
          <h1 className="text-3xl font-bold">{programData.name}</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Exclusions</h2>
          <p className="text-gray-600">{programData.exclusions}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Reward Ranges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(programData.bountyRanges).map(([severity, amount], index) => (
              <motion.div
                key={severity}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg shadow-lg bg-white border border-gray-200"
              >
                <div className="font-semibold text-lg capitalize">
                  {severity}
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold text-primary">{amount} ₣</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Program Assets</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-4 text-left">Asset</th>
                  <th className="py-4 px-4 text-left">Type</th>
                  <th className="py-4 px-4 text-left">Coverage</th>
                  <th className="py-4 px-4 text-left">Severity</th>
                  <th className="py-4 px-4 text-left">Bounty</th>
                </tr>
              </thead>
              <tbody>
                {programData.assets.map((asset) => (
                  <motion.tr
                    key={asset.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          {asset.isNew && (
                            <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded">
                              New
                            </span>
                          )}
                          <span className="font-medium">{asset.name}</span>
                        </div>
                        {asset.description && (
                          <span className="text-sm text-gray-500 mt-1">{asset.description}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">{asset.type}</td>
                    <td className="py-4 px-4">
                      <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                        {asset.coverage}
                      </span>
                    </td>
                    <td className="py-4 px-4">{asset.severity}</td>
                    <td className="py-4 px-4">{asset.bounty}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-8 prose prose-lg max-w-none"
            >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-2xl font-bold mb-4" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-xl font-semibold mt-6 mb-3" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-lg font-medium mt-4 mb-2" {...props} />
                    ),
                    p: ({ node, ...props }) => <p className="mb-3" {...props} />,
                    pre: ({ node, ...props }) => (
                      <pre
                        className="bg-gray-100 p-3 rounded-2xl mb-3 overflow-auto"
                        {...props}
                      />
                    ),
                
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        className="border-l-4 border-gray-500 pl-4 italic text-gray-700"
                        {...props}
                      />
                    ),
                    table: ({ node, ...props }) => (
                      <table className="table-auto w-full border-collapse" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th className="px-4 py-2 border" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-4 py-2 border" {...props} />
                    ),
                  }}
                >
                {readmeContent}
                </ReactMarkdown>

            </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white rounded-lg shadow-lg p-8 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Top Hackers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hackers.map((hacker) => (
              <HackerCard key={hacker.id} hacker={hacker} />
            ))}
          </div>
        </motion.div>

        <div className="fixed bottom-8 left-0 right-0 px-4 md:px-0">
          <div className="max-w-7xl mx-auto">
            <Button
              className="w-full md:w-auto flex items-center justify-center gap-2"
              size="lg"
              onClick={handleSubmitReport}
            >
              <Send className="h-4 w-4" />
                soumettre un rapport
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}