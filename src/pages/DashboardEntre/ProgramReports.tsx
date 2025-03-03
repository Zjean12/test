import { useState } from 'react';
import { ArrowLeft, Search, Filter, Check, X, MessageSquare, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Report } from './Dashboard';
import { Program } from './AddProgram';

interface Hacker {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  totalReports: number;
  totalBounties: string;
}

interface ProgramReportsProps {
  reports: Report[];
  program: Program;
  hackers: Hacker[];
  onBack: () => void;
  onUpdateStatus: (reportId: string, newStatus: string, bountyAmount?: string) => void;
  onAddComment: (reportId: string, commentText: string) => void;
}

export default function ProgramReports({
  reports,
  program,
  hackers,
  onBack,
  onUpdateStatus,
  onAddComment
}: ProgramReportsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [newComment, setNewComment] = useState('');
  const [bountyAmount, setBountyAmount] = useState('');

  // Filtrer les rapports en fonction du terme de recherche et du statut
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getHackerName(report.hackerId).toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Obtenir le nom du hacker par ID
  const getHackerName = (hackerId: string) => {
    const hacker = hackers.find(h => h.id === hackerId);
    return hacker ? hacker.name : 'Hacker inconnu';
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmitComment = () => {
    if (selectedReport && newComment.trim()) {
      onAddComment(selectedReport.id, newComment);
      setNewComment('');
    }
  };

  const handleUpdateStatus = (status: string) => {
    if (selectedReport) {
      let amount = selectedReport.bounty;
      
      if (status === 'Validated' && bountyAmount) {
        amount = bountyAmount.startsWith('€') ? bountyAmount : `${bountyAmount}€`;
      }
      
      onUpdateStatus(selectedReport.id, status, status === 'Validated' ? amount : undefined);
      setBountyAmount('');
    }
  };

  if (selectedReport) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => setSelectedReport(null)} 
            className="mr-2 p-2 rounded-full hover:bg-gray-700 text-gray-300"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold text-white">Détails du rapport</h2>
        </div>

        <div className="space-y-6">
          {/* En-tête du rapport */}
          <div className="border-b border-gray-700 pb-4">
            <h3 className="text-2xl font-bold mb-2 text-white">{selectedReport.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
              <div>
                <span className="font-medium text-gray-300">Soumis par:</span> {getHackerName(selectedReport.hackerId)}
              </div>
              <div>
                <span className="font-medium text-gray-300">Date:</span> {formatDate(selectedReport.submittedDate)}
              </div>
              <div>
                <span className="font-medium text-gray-300">Sévérité:</span> 
                <span className={`ml-1 px-2 py-0.5 rounded-full text-sm ${
                  selectedReport.severity === 'Critical'
                    ? 'bg-red-900/50 text-red-400'
                    : selectedReport.severity === 'High'
                    ? 'bg-orange-900/50 text-orange-400'
                    : selectedReport.severity === 'Medium'
                    ? 'bg-yellow-900/50 text-yellow-400'
                    : 'bg-green-900/50 text-green-400'
                }`}>
                  {selectedReport.severity}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-300">Statut:</span> 
                <span className={`ml-1 px-2 py-0.5 rounded-full text-sm ${
                  selectedReport.status === 'Validated'
                    ? 'bg-primary-900/50 text-primary-400'
                    : selectedReport.status === 'Fixed'
                    ? 'bg-green-900/50 text-green-400'
                    : selectedReport.status === 'Rejected'
                    ? 'bg-red-900/50 text-red-400'
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  {selectedReport.status}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-300">Prime:</span> <span className="text-primary-400">{selectedReport.bounty}</span>
              </div>
            </div>
          </div>

          {/* Contenu du rapport */}
          <div className="space-y-4">
            <div>
              <h4 className="text-lg font-semibold mb-2 text-white">Description</h4>
              <div className="bg-gray-700 p-4 rounded-md text-gray-300">
                <p>{selectedReport.description}</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-white">Étapes pour reproduire</h4>
              <div className="bg-gray-700 p-4 rounded-md text-gray-300">
                <ReactMarkdown
                  children={selectedReport.steps}
                  remarkPlugins={[remarkGfm]}
                />
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-white">Impact</h4>
              <div className="bg-gray-700 p-4 rounded-md text-gray-300">
                <p>{selectedReport.impact}</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2 text-white">Preuve de concept</h4>
              <div className="bg-gray-700 p-4 rounded-md font-mono text-sm overflow-x-auto text-gray-300">
                <pre>{selectedReport.poc}</pre>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-b border-gray-700 py-4">
            <h4 className="text-lg font-semibold mb-2 text-white">Actions</h4>
            <div className="flex flex-wrap gap-3">
              {selectedReport.status === 'Pending' && (
                <>
                  <div className="flex items-center">
                    <button 
                      onClick={() => handleUpdateStatus('Validated')}
                      className="px-3 py-1.5 bg-primary-600 text-white rounded-md hover:bg-primary-700 flex items-center"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Valider
                    </button>
                    <div className="ml-2">
                      <input
                        type="text"
                        placeholder="Montant (€)"
                        value={bountyAmount}
                        onChange={(e) => setBountyAmount(e.target.value)}
                        className="w-32 px-2 py-1.5 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={() => handleUpdateStatus('Rejected')}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                  >
                    <X className="h-4 w-4 mr-1" />
                    Rejeter
                  </button>
                </>
              )}
              {selectedReport.status === 'Validated' && (
                <button 
                  onClick={() => handleUpdateStatus('Fixed')}
                  className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                >
                  <Check className="h-4 w-4 mr-1" />
                  Marquer comme corrigé
                </button>
              )}
              {selectedReport.status === 'Rejected' && (
                <button 
                  onClick={() => handleUpdateStatus('Pending')}
                  className="px-3 py-1.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center"
                >
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Réévaluer
                </button>
              )}
            </div>
          </div>

          {/* Commentaires */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Commentaires</h4>
            
            {selectedReport.comments.length > 0 ? (
              <div className="space-y-4 mb-4">
                {selectedReport.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-700 p-4 rounded-md">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-white">{comment.author}</span>
                      <span className="text-sm text-gray-400">{formatDate(comment.date)}</span>
                    </div>
                    <p className="text-gray-300">{comment.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 mb-4">Aucun commentaire pour le moment.</p>
            )}
            
            <div className="flex">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Ajouter un commentaire..."
                className="flex-1 p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                rows={3}
              />
            </div>
            <div className="flex justify-end mt-2">
              <button 
                onClick={handleSubmitComment}
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Commenter
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
      <div className="flex items-center mb-6">
        <button 
          onClick={onBack} 
          className="mr-2 p-2 rounded-full hover:bg-gray-700 text-gray-300"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-xl font-semibold text-white">{program.name} - Rapports</h2>
          <p className="text-gray-400">{program.description}</p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
          />
        </div>
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="pl-4 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
          >
            <option value="all">Tous les statuts</option>
            <option value="Pending">En attente</option>
            <option value="Validated">Validé</option>
            <option value="Fixed">Corrigé</option>
            <option value="Rejected">Rejeté</option>
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
        </div>
      </div>

      {filteredReports.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-4 text-gray-400">Titre</th>
                <th className="pb-4 text-gray-400">Hacker</th>
                <th className="pb-4 text-gray-400">Sévérité</th>
                <th className="pb-4 text-gray-400">Statut</th>
                <th className="pb-4 text-gray-400">Prime</th>
                <th className="pb-4 text-gray-400">Date</th>
                <th className="pb-4 text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((report) => (
                <tr key={report.id} className="border-b border-gray-700">
                  <td className="py-4 text-white">{report.title}</td>
                  <td className="py-4 text-gray-300">{getHackerName(report.hackerId)}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        report.severity === 'Critical'
                          ? 'bg-red-900/50 text-red-400'
                          : report.severity === 'High'
                          ? 'bg-orange-900/50 text-orange-400'
                          : report.severity === 'Medium'
                          ? 'bg-yellow-900/50 text-yellow-400'
                          : 'bg-green-900/50 text-green-400'
                      }`}
                    >
                      {report.severity}
                    </span>
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        report.status === 'Validated'
                          ? 'bg-primary-900/50 text-primary-400'
                          : report.status === 'Fixed'
                          ? 'bg-green-900/50 text-green-400'
                          : report.status === 'Rejected'
                          ? 'bg-red-900/50 text-red-400'
                          : 'bg-gray-700 text-gray-300'
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="py-4 text-primary-400">{report.bounty}</td>
                  <td className="py-4 text-gray-300">{formatDate(report.submittedDate)}</td>
                  <td className="py-4">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="px-3 py-1 bg-primary-900/50 text-primary-400 rounded-md hover:bg-primary-800/50"
                    >
                      Voir détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-400">Aucun rapport trouvé pour ce programme.</p>
        </div>
      )}
    </div>
  );
}