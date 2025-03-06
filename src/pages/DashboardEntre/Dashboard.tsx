import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  FileText,
  Shield,
  Edit,
  X,
  Check,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import AddProgram from './AddProgram';
import  EditProgram  from './UpdProgramme';
import Header from './HeaderEntre';
import { Program } from '../../types/programs';
import HackerView from './HackerView';
import ProgramReports from './ProgramReports';
import SidebarEnt from './SevbarEnt';
import useProfile from '../../hooks/useProfile';

// Données fictives pour démonstration
const initialPrograms = [
  {
    id: '1',
    name: 'Sécurité des Applications Web',
    description: 'Tests de sécurité pour nos applications web',
    status: 'Active' as const,
    reports: 12,
    bounties: '100€-5000€',
    createdAt: '2023-01-15T12:00:00Z',
    lastUpdated: null,
    bountyRanges: {
      low: "100",
      medium: "500",
      high: "1000",
      critical: "5000",
    },
    scope: [
      { id: '1', type: 'Web', target: '*.example.com', description: 'Site web principal' },
    ],
    markdown: '# Programme de Sécurité des Applications Web\n\nCe programme se concentre sur la recherche de vulnérabilités dans nos applications web.',
  },
  {
    id: '2',
    name: 'Sécurité des Applications Mobiles',
    description: 'Tests de sécurité pour nos applications mobiles',
    status: 'Active' as const,
    reports: 8,
    bounties: '100€-3000€',
    createdAt: '2023-02-20T14:30:00Z',
    lastUpdated: null,
    bountyRanges: {
      low: "100",
      medium: "500",
      high: "1000",
      critical: "3000",
    },
    scope: [
      { id: '1', type: 'Android', target: 'com.example.app', description: 'Application Android' },
      { id: '2', type: 'iOS', target: 'com.example.app', description: 'Application iOS' },
    ],
    markdown: '# Programme de Sécurité des Applications Mobiles\n\nCe programme se concentre sur la recherche de vulnérabilités dans nos applications mobiles.',
  },
  {
    id: '3',
    name: 'Tests de Sécurité des API',
    description: 'Tests de sécurité pour nos API',
    status: 'Closed' as const,
    reports: 15,
    bounties: '150€-7000€',
    createdAt: '2023-03-10T09:15:00Z',
    lastUpdated: '2023-04-05T10:30:00Z',
    bountyRanges: {
      low: "150",
      medium: "700",
      high: "1500",
      critical: "7000",
    },
    scope: [
      { id: '1', type: 'API', target: 'api.example.com', description: 'Points de terminaison API publics' },
    ],
    markdown: '# Programme de Tests de Sécurité des API\n\nCe programme se concentre sur la recherche de vulnérabilités dans nos points de terminaison API.',
  },
];

// Données fictives pour les hackers et les rapports
const initialHackers = [
  {
    id: '1',
    name: 'Alice Sécurité',
    email: 'alice@security.com',
    joinedDate: '2023-01-10T10:00:00Z',
    totalReports: 18,
    totalBounties: '8500€',
  },
  {
    id: '2',
    name: 'Bob Hacker',
    email: 'bob@hacker.com',
    joinedDate: '2023-02-15T14:20:00Z',
    totalReports: 12,
    totalBounties: '5200€',
  },
  {
    id: '3',
    name: 'Charlie Pentester',
    email: 'charlie@pentester.com',
    joinedDate: '2023-03-05T09:30:00Z',
    totalReports: 5,
    totalBounties: '2000€',
  },
];

const initialReports = [
  {
    id: '1',
    programId: '1',
    hackerId: '1',
    title: 'Vulnérabilité XSS dans la fonction de recherche',
    severity: 'High',
    status: 'Pending',
    bounty: '800€',
    submittedDate: '2023-04-10T15:30:00Z',
    description: 'J\'ai découvert une vulnérabilité XSS réfléchie dans la fonction de recherche. Lors de la recherche d\'un terme avec des balises de script, le script est exécuté dans le contexte du navigateur de l\'utilisateur.',
    steps: '1. Aller à la page de recherche\n2. Entrer la charge utile suivante : <script>alert(document.cookie)</script>\n3. Soumettre la recherche\n4. Le script s\'exécute et affiche les cookies de l\'utilisateur',
    impact: 'Cette vulnérabilité pourrait permettre aux attaquants de voler les cookies des utilisateurs, d\'effectuer des actions au nom de l\'utilisateur ou de rediriger les utilisateurs vers des sites malveillants.',
    poc: 'https://example.com/search?q=<script>alert(document.cookie)</script>',
    comments: [],
  },
];

export interface Report {
  id: string;
  programId: string;
  hackerId: string;
  title: string;
  severity: string;
  status: string;
  bounty: string;
  submittedDate: string;
  description: string;
  steps: string;
  impact: string;
  poc: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  author: string;
  date: string;
  text: string;
}

export default function Dashboard() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);
  const [programToEdit, setProgramToEdit] = useState<Program | null>(null);
  const [hackers] = useState(initialHackers);
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [selectedHackerId, setSelectedHackerId] = useState<string | null>(null);
  const [closedProgramsCount, setClosedProgramsCount] = useState(initialPrograms.filter(p => p.status === 'Closed').length);
  const [updatedProgramsCount, setUpdatedProgramsCount] = useState(initialPrograms.filter(p => p.lastUpdated !== null).length);
  const { profile, loading, error, programmeDetails, programme } = useProfile();

  if (loading) return <p className="text-white">Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleAddProgram = (program: Program) => {
    if (!program.bountyRanges ||
      typeof program.bountyRanges.low !== 'number' ||
      typeof program.bountyRanges.medium !== 'number' ||
      typeof program.bountyRanges.high !== 'number' ||
      typeof program.bountyRanges.critical !== 'number') {
      console.log(program.bountyRanges);
      return;
    }

    const lowRange = program.bountyRanges.low;
    const criticalRange = program.bountyRanges.critical;
    const bountyRange = `${lowRange}€-${criticalRange}€`;

    const newProgram = {
      ...program,
      bounties: bountyRange,
    };

    setPrograms([newProgram, ...programs]);
    setCurrentView('dashboard'); // Retour au tableau de bord après l'ajout
  };

  const handleEditProgram = (program: Program) => {
    setProgramToEdit(program);
    setCurrentView('edit-program'); // Rediriger vers le formulaire de modification
  };

  const handleUpdateProgram = (updatedProgram: Program) => {
    const lowRange = updatedProgram.bountyRanges.low;
    const criticalRange = updatedProgram.bountyRanges.critical;
    const bountyRange = `${lowRange}€-${criticalRange}€`;

    const newUpdatedProgram = {
      ...updatedProgram,
      bounties: bountyRange,
      lastUpdated: new Date().toISOString(),
    };

    setPrograms(programs.map(p => p.id === newUpdatedProgram.id ? newUpdatedProgram : p));
    setProgramToEdit(null);
    setCurrentView('dashboard'); // Retour au tableau de bord après la modification

    const updatedCount = programs.filter(p => p.id !== newUpdatedProgram.id && p.lastUpdated !== null).length + 1;
    setUpdatedProgramsCount(updatedCount);
  };

  const toggleProgramStatus = (id: string) => {
    setPrograms(programs.map(program => {
      if (program.id === id) {
        const newStatus = program.status === 'Active' ? 'Closed' : 'Active';

        if (newStatus === 'Closed') {
          setClosedProgramsCount(prev => prev + 1);
        } else {
          setClosedProgramsCount(prev => prev - 1);
        }

        return {
          ...program,
          status: newStatus as 'Active' | 'Closed',
          lastUpdated: new Date().toISOString(),
        };
      }
      return program;
    }));
  };

  const handleViewProgramReports = (programId: string) => {
    setSelectedProgramId(programId);
    setCurrentView('program-reports'); // Rediriger vers les rapports du programme
  };

  const updateReportStatus = (reportId: string, newStatus: string, bountyAmount?: string) => {
    setReports(reports.map(report => {
      if (report.id === reportId) {
        const updatedReport = {
          ...report,
          status: newStatus,
          bounty: bountyAmount || report.bounty,
        };

        const statusComment = {
          id: `c${Date.now()}`,
          author: 'Admin',
          date: new Date().toISOString(),
          text: `Statut changé en ${newStatus}${bountyAmount ? ` avec un montant de prime de ${bountyAmount}` : ''}`,
        };

        updatedReport.comments = [...updatedReport.comments, statusComment];

        return updatedReport;
      }
      return report;
    }));
  };

  const addCommentToReport = (reportId: string, commentText: string) => {
    setReports(reports.map(report => {
      if (report.id === reportId) {
        const newComment = {
          id: `c${Date.now()}`,
          author: 'Admin',
          date: new Date().toISOString(),
          text: commentText,
        };

        return {
          ...report,
          comments: [...report.comments, newComment],
        };
      }
      return report;
    }));
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Jamais';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SidebarEnt currentView={currentView} setCurrentView={setCurrentView} />
      <div className="ml-64 p-8">
      {currentView === 'programs' ? (
        // Afficher le formulaire d'ajout
        <AddProgram
          onCancel={() => setCurrentView('dashboard')} // Retour au tableau de bord
          onProgramAdded={handleAddProgram} // Gestion de l'ajout
        />
      ) : currentView === 'edit-program' && programToEdit ? (
        // Afficher le formulaire de modification
        <EditProgram
          onCancel={() => {
            setProgramToEdit(null); // Réinitialiser le programme à modifier
            setCurrentView('dashboard'); // Retour au tableau de bord
          }}
          onProgramUpdated={handleUpdateProgram} // Gestion de la mise à jour
          program={programToEdit} // ✅ Utilisation correcte // Passer le programme à modifier
        />
      ) : currentView === 'hackers' ? (
        // Afficher la vue des hackers
        <HackerView
          hackers={hackers}
          reports={reports}
          programs={programs}
          onSelectProgram={setSelectedProgramId}
          onSelectHacker={setSelectedHackerId}
          selectedProgramId={selectedProgramId}
          selectedHackerId={selectedHackerId}
        />
      ) : currentView === 'program-reports' ? (
        // Afficher les rapports du programme
        <ProgramReports
          reports={reports.filter(r => r.programId === selectedProgramId)}
          program={programs.find(p => p.id === selectedProgramId)!}
          hackers={hackers}
          onBack={() => setCurrentView('dashboard')}
          onUpdateStatus={updateReportStatus}
          onAddComment={addCommentToReport}
        />
      ) : (
        // Afficher le tableau de bord par défaut
        <>
          <Header />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              {[
                {
                  title: 'Programmes Actifs',
                  value: programs.filter(p => p.status === 'Active').length.toString(),
                  color: 'bg-primary-600',
                  icon: <FileText className="h-6 w-6 text-primary-300" />,
                },
                {
                  title: 'Programmes Fermés',
                  value: closedProgramsCount.toString(),
                  color: 'bg-red-600',
                  icon: <X className="h-6 w-6 text-red-300" />,
                },
                {
                  title: 'Programmes Mis à Jour',
                  value: updatedProgramsCount.toString(),
                  color: 'bg-blue-600',
                  icon: <Clock className="h-6 w-6 text-blue-300" />,
                },
                {
                  title: 'Rapports Totaux',
                  value: programs.reduce((sum, p) => sum + p.reports, 0).toString(),
                  color: 'bg-emerald-600',
                  icon: <AlertTriangle className="h-6 w-6 text-emerald-300" />,
                },
                {
                  title: 'Primes Totales',
                  value: programs.reduce((sum, p) => {
                    const amount = parseInt(p.bounties.replace(/[^0-9]/g, ''), 10) || 0;
                    return sum + amount;
                  }, 0).toLocaleString() + '€',
                  color: 'bg-purple-600',
                  icon: <Shield className="h-6 w-6 text-purple-300" />,
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      {stat.icon}
                    </div>
                    <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {stat.title}
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8 border border-gray-700">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">Vos Programmes</h2>
                <button
                  onClick={() => setCurrentView('programs')}
                  className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un Programme
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-gray-700">
                      <th className="pb-4 text-gray-400">Nom du Programme</th>
                      <th className="pb-4 text-gray-400">Description</th>
                      <th className="pb-4 text-gray-400">Statut</th>
                      <th className="pb-4 text-gray-400">Rapports</th>
                      <th className="pb-4 text-gray-400">Primes Payées</th>
                      <th className="pb-4 text-gray-400">Dernière Mise à Jour</th>
                      <th className="pb-4 text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {programs.map((program) => (
                      <tr key={program.id} className="border-b border-gray-700">
                        <td className="py-4 text-white">{program.name}</td>
                        <td className="py-4 max-w-xs truncate text-gray-300">{program.description}</td>
                        <td className="py-4">
                          <span
                            className={`px-2 py-1 rounded-full text-sm ${
                              program.status === 'Active'
                                ? 'bg-emerald-900 text-emerald-300'
                                : 'bg-gray-700 text-gray-300'
                            }`}
                          >
                            {program.status === 'Active' ? 'Actif' : 'Fermé'}
                          </span>
                        </td>
                        <td className="py-4">
                          <button
                            onClick={() => handleViewProgramReports(program.id)}
                            className="text-primary-400 hover:text-primary-300 hover:underline"
                          >
                            {program.reports} rapports
                          </button>
                        </td>
                        <td className="py-4 text-gray-300">{program.bounties}</td>
                        <td className="py-4 text-gray-300">{formatDate(program.lastUpdated)}</td>
                        <td className="py-4">
                          <div className="flex space-x-2">
                            <button
                              className="flex items-center px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 rounded"
                              onClick={() => handleEditProgram(program)}
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Modifier
                            </button>
                            <button
                              className={`flex items-center px-2 py-1 text-sm rounded ${
                                program.status === 'Active'
                                  ? 'text-red-400 hover:bg-red-900/30'
                                  : 'text-emerald-400 hover:bg-emerald-900/30'
                              }`}
                              onClick={() => toggleProgramStatus(program.id)}
                            >
                              {program.status === 'Active' ? (
                                <>
                                  <X className="h-4 w-4 mr-1" />
                                  Fermer
                                </>
                              ) : (
                                <>
                                  <Check className="h-4 w-4 mr-1" />
                                  Activer
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}