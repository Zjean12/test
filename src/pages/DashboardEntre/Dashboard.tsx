import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Plus,
  Settings,
  FileText,
  Home,
  Users,
  Shield,
  Edit,
  X,
  Check,
  AlertTriangle,
  Clock
} from 'lucide-react';
import AddProgram from './AddProgram';
import Header from './HeaderEntre';
import { Program } from '../../types/programs';
import HackerView from './HackerView';
import ProgramReports from './ProgramReports';
import Sidebar from './Sevbar';
// Données fictives pour démonstration
const initialPrograms = [
  {
    id: '1',
    name: 'Sécurité des Applications Web',
    description: 'Tests de sécurité pour nos applications web',
    status: 'Active' as const,
    reports: 12,
    bounties: '100€-5 000€',
    createdAt: '2023-01-15T12:00:00Z',
    lastUpdated: null,
    bountyRanges: {
      low: '100€-200€',
      medium: '200€-500€',
      high: '500€-1 000€',
      critical: '1 000€-5 000€',
    },
    scope: [
      { id: '1', type: 'Web', target: '*.example.com', description: 'Site web principal' }
    ],
    markdown: '# Programme de Sécurité des Applications Web\n\nCe programme se concentre sur la recherche de vulnérabilités dans nos applications web.'
  },
  {
    id: '2',
    name: 'Sécurité des Applications Mobiles',
    description: 'Tests de sécurité pour nos applications mobiles',
    status: 'Active' as const,
    reports: 8,
    bounties: '100€-3 000€',
    createdAt: '2023-02-20T14:30:00Z',
    lastUpdated: null,
    bountyRanges: {
      low: '100€-200€',
      medium: '200€-500€',
      high: '500€-1 000€',
      critical: '1 000€-3 000€',
    },
    scope: [
      { id: '1', type: 'Android', target: 'com.example.app', description: 'Application Android' },
      { id: '2', type: 'iOS', target: 'com.example.app', description: 'Application iOS' }
    ],
    markdown: '# Programme de Sécurité des Applications Mobiles\n\nCe programme se concentre sur la recherche de vulnérabilités dans nos applications mobiles.'
  },
  {
    id: '3',
    name: 'Tests de Sécurité des API',
    description: 'Tests de sécurité pour nos API',
    status: 'Closed' as const,
    reports: 15,
    bounties: '150€-7 000€',
    createdAt: '2023-03-10T09:15:00Z',
    lastUpdated: '2023-04-05T10:30:00Z',
    bountyRanges: {
      low: '150€-300€',
      medium: '300€-700€',
      high: '700€-1 500€',
      critical: '1 500€-7 000€',
    },
    scope: [
      { id: '1', type: 'API', target: 'api.example.com', description: 'Points de terminaison API publics' }
    ],
    markdown: '# Programme de Tests de Sécurité des API\n\nCe programme se concentre sur la recherche de vulnérabilités dans nos points de terminaison API.'
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
    totalBounties: '8 500€',
  },
  {
    id: '2',
    name: 'Bob Hacker',
    email: 'bob@hacker.com',
    joinedDate: '2023-02-15T14:20:00Z',
    totalReports: 12,
    totalBounties: '5 200€',
  },
  {
    id: '3',
    name: 'Charlie Pentester',
    email: 'charlie@pentester.com',
    joinedDate: '2023-03-05T09:30:00Z',
    totalReports: 5,
    totalBounties: '2 000€',
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
    comments: []
  },
  {
    id: '2',
    programId: '1',
    hackerId: '2',
    title: 'Injection SQL dans le formulaire de connexion',
    severity: 'Critical',
    status: 'Validated',
    bounty: '2 500€',
    submittedDate: '2023-04-12T11:20:00Z',
    description: 'Le formulaire de connexion est vulnérable aux attaques par injection SQL. En saisissant des entrées spécialement conçues, j\'ai pu contourner l\'authentification et accéder aux fonctions administratives.',
    steps: '1. Aller à la page de connexion\n2. Entrer ce qui suit dans le champ du nom d\'utilisateur : admin\' --\n3. Entrer n\'importe quel mot de passe\n4. Cliquer sur connexion\n5. Vous êtes maintenant connecté en tant qu\'administrateur',
    impact: 'Cette vulnérabilité permet un accès non autorisé aux fonctions administratives et potentiellement à toutes les données utilisateur dans la base de données.',
    poc: 'Nom d\'utilisateur : admin\' --\nMot de passe : n\'importe quoi',
    
    comments: [
      {
        id: 'c1',
        author: 'Admin',
        date: '2023-04-13T09:15:00Z',
        text: 'Merci pour ce signalement. Nous avons confirmé le problème et travaillons sur un correctif.'
      }
    ]
  },
  {
    id: '3',
    programId: '2',
    hackerId: '1',
    title: 'Contournement d\'authentification dans l\'application mobile',
    severity: 'Critical',
    status: 'Fixed',
    bounty: '2 800€',
    submittedDate: '2023-04-15T09:45:00Z',
    description: 'L\'application mobile ne valide pas correctement les jetons JWT. En modifiant la charge utile du jeton, j\'ai pu m\'authentifier en tant que n\'importe quel utilisateur.',
    steps: '1. Intercepter la requête d\'authentification avec un proxy\n2. Décoder le jeton JWT\n3. Modifier le champ user_id\n4. Recoder le jeton\n5. Envoyer le jeton modifié dans les requêtes suivantes',
    impact: 'Cette vulnérabilité permet à un attaquant d\'accéder au compte de n\'importe quel utilisateur et d\'effectuer des actions en son nom.',
    poc: 'JWT modifié : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYWRtaW4iLCJleHAiOjE2MTYwODg2MzB9.KPR5tnLH_FdJG9TJJ0b0S1PxlH5j0X9djzKJCnMxCvw',
    comments: [
      {
        id: 'c2',
        author: 'Admin',
        date: '2023-04-16T10:30:00Z',
        text: 'Nous avons vérifié ce problème et déployé un correctif. Merci pour votre rapport.'
      },
      {
        id: 'c3',
        author: 'Alice Sécurité',
        date: '2023-04-16T11:45:00Z',
        text: 'Merci pour la réponse rapide et le correctif !'
      }
    ]
  },
  {
    id: '4',
    programId: '3',
    hackerId: '3',
    title: 'Contournement de la limitation de débit dans l\'API',
    severity: 'Medium',
    status: 'Rejected',
    bounty: '0€',
    submittedDate: '2023-04-18T14:10:00Z',
    description: 'La limitation de débit de l\'API peut être contournée en modifiant l\'en-tête X-Forwarded-For dans les requêtes.',
    steps: '1. Envoyer une requête à l\'API avec une clé API valide\n2. Lorsque le débit est limité, changer l\'en-tête X-Forwarded-For\n3. Continuer à envoyer des requêtes',
    impact: 'Cette vulnérabilité permet aux attaquants de contourner la limitation de débit et potentiellement de provoquer un déni de service.',
    poc: 'curl -H "X-Forwarded-For: 192.168.1.1" -H "Authorization: Bearer API_KEY" https://api.example.com/endpoint',
    comments: [
      {
        id: 'c4',
        author: 'Admin',
        date: '2023-04-19T08:20:00Z',
        text: 'Cela fonctionne comme prévu. Notre limitation de débit est basée sur les clés API, pas sur les adresses IP. L\'en-tête X-Forwarded-For n\'est pas utilisé pour la limitation de débit.'
      }
    ]
  },
  {
    id: '5',
    programId: '1',
    hackerId: '1',
    title: 'CSRF dans les paramètres utilisateur',
    severity: 'Medium',
    status: 'Pending',
    bounty: '0€',
    submittedDate: '2023-04-20T16:30:00Z',
    description: 'La page des paramètres utilisateur est vulnérable aux attaques Cross-Site Request Forgery (CSRF). Il n\'y a pas de jetons CSRF ou d\'autres protections en place.',
    steps: '1. Créer une page HTML malveillante avec un formulaire qui soumet aux points de terminaison des paramètres utilisateur\n2. Lorsqu\'un utilisateur connecté visite la page, le formulaire est automatiquement soumis\n3. Les paramètres de l\'utilisateur sont modifiés à son insu',
    impact: 'Cette vulnérabilité permet aux attaquants de modifier les paramètres des utilisateurs, y compris les adresses e-mail et les mots de passe, à l\'insu de l\'utilisateur ou sans son consentement.',
    poc: '<form action="https://example.com/settings" method="POST" id="csrf-form">\n  <input type="hidden" name="email" value="attacker@evil.com">\n  <input type="hidden" name="password" value="hacked">\n</form>\n<script>document.getElementById("csrf-form").submit();</script>',
    comments: []
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

  const handleAddProgram = (program: Program) => {
    // Calculer la plage de bounty de low à critical
    const lowRange = program.bountyRanges.low.split('-')[0];
    const criticalRange = program.bountyRanges.critical.split('-')[1];
    const bountyRange = `${lowRange}-${criticalRange}`;
    
    const newProgram = {
      ...program,
      bounties: bountyRange
    };
    
    setPrograms([newProgram, ...programs]);
  };

  const handleEditProgram = (program: Program) => {
    setProgramToEdit(program);
    setCurrentView('edit-program');
  };

  const handleUpdateProgram = (updatedProgram: Program) => {
    // Calculer la plage de bounty de low à critical
    const lowRange = updatedProgram.bountyRanges.low.split('-')[0];
    const criticalRange = updatedProgram.bountyRanges.critical.split('-')[1];
    const bountyRange = `${lowRange}-${criticalRange}`;
    
    const newUpdatedProgram = {
      ...updatedProgram,
      bounties: bountyRange,
      lastUpdated: new Date().toISOString()
    };
    
    setPrograms(programs.map(p => p.id === newUpdatedProgram.id ? newUpdatedProgram : p));
    setProgramToEdit(null);
    setCurrentView('dashboard');
    
    // Mettre à jour le compteur de programmes mis à jour
    const updatedCount = programs.filter(p => p.id !== newUpdatedProgram.id && p.lastUpdated !== null).length + 1;
    setUpdatedProgramsCount(updatedCount);
  };

  const toggleProgramStatus = (id: string) => {
    setPrograms(programs.map(program => {
      if (program.id === id) {
        const newStatus = program.status === 'Active' ? 'Closed' : 'Active';
        
        // Mettre à jour le compteur de programmes fermés
        if (newStatus === 'Closed') {
          setClosedProgramsCount(prev => prev + 1);
        } else {
          setClosedProgramsCount(prev => prev - 1);
        }
        
        return { 
          ...program, 
          status: newStatus as 'Active' | 'Closed',
          lastUpdated: new Date().toISOString()
        };
      }
      return program;
    }));
  };

  // Filtrer les rapports en fonction du programme et/ou du hacker sélectionné
  const filteredReports = reports.filter(report => {
    const matchesProgram = !selectedProgramId || report.programId === selectedProgramId;
    const matchesHacker = !selectedHackerId || report.hackerId === selectedHackerId;
    return matchesProgram && matchesHacker;
  });

  const handleViewProgramReports = (programId: string) => {
    setSelectedProgramId(programId);
    setCurrentView('program-reports');
  };

  const updateReportStatus = (reportId: string, newStatus: string, bountyAmount?: string) => {
    setReports(reports.map(report => {
      if (report.id === reportId) {
        const updatedReport = { 
          ...report, 
          status: newStatus,
          bounty: bountyAmount || report.bounty
        };
        
        // Ajouter un commentaire sur le changement de statut
        const statusComment = {
          id: `c${Date.now()}`,
          author: 'Admin',
          date: new Date().toISOString(),
          text: `Statut changé en ${newStatus}${bountyAmount ? ` avec un montant de prime de ${bountyAmount}` : ''}`
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
          text: commentText
        };
        
        return {
          ...report,
          comments: [...report.comments, newComment]
        };
      }
      return report;
    }));
  };

  // Formater la date
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Jamais';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
      {/* Main Content */}
      <div className="ml-64 p-8">
        {currentView === 'programs' ? (
          <AddProgram 
            onCancel={() => setCurrentView('dashboard')} 
            onProgramAdded={handleAddProgram}
          />
        ) : currentView === 'edit-program' && programToEdit ? (
          <AddProgram 
            onCancel={() => {
              setProgramToEdit(null);
              setCurrentView('dashboard');
            }} 
            onProgramAdded={handleUpdateProgram}
            initialProgram={programToEdit}
          />
        ) : currentView === 'hackers' ? (
          <HackerView 
            hackers={hackers} 
            reports={filteredReports} 
            programs={programs}
            onSelectProgram={setSelectedProgramId}
            onSelectHacker={setSelectedHackerId}
            selectedProgramId={selectedProgramId}
            selectedHackerId={selectedHackerId}
          />
        ) : currentView === 'program-reports' ? (
          <ProgramReports
            reports={reports.filter(r => r.programId === selectedProgramId)}
            program={programs.find(p => p.id === selectedProgramId)!}
            hackers={hackers}
            onBack={() => setCurrentView('dashboard')}
            onUpdateStatus={updateReportStatus}
            onAddComment={addCommentToReport}
          />
        ) : (
          <>
            {/* Header */}
            <Header />

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              {[
                { 
                  title: 'Programmes Actifs', 
                  value: programs.filter(p => p.status === 'Active').length.toString(), 
                  color: 'bg-primary-600',
                  icon: <FileText className="h-6 w-6 text-primary-300" />
                },
                { 
                  title: 'Programmes Fermés', 
                  value: closedProgramsCount.toString(), 
                  color: 'bg-red-600',
                  icon: <X className="h-6 w-6 text-red-300" />
                },
                { 
                  title: 'Programmes Mis à Jour', 
                  value: updatedProgramsCount.toString(), 
                  color: 'bg-blue-600',
                  icon: <Clock className="h-6 w-6 text-blue-300" />
                },
                { 
                  title: 'Rapports Totaux', 
                  value: programs.reduce((sum, p) => sum + p.reports, 0).toString(), 
                  color: 'bg-emerald-600',
                  icon: <AlertTriangle className="h-6 w-6 text-emerald-300" />
                },
                { 
                  title: 'Primes Totales', 
                  value: programs.reduce((sum, p) => {
                    const amount = parseInt(p.bounties.replace(/[^0-9]/g, ''), 10) || 0;
                    return sum + amount;
                  }, 0).toLocaleString() + '€', 
                  color: 'bg-purple-600',
                  icon: <Shield className="h-6 w-6 text-purple-300" />
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

            {/* Programs */}
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