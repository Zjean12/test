import { useState } from 'react';
import { Search, Filter } from 'lucide-react';

interface Hacker {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  totalReports: number;
  totalBounties: string;
}

interface Report {
  id: string;
  programId: string;
  hackerId: string;
  title: string;
  severity: string;
  status: string;
  bounty: string;
  submittedDate: string;
}

interface Program {
  id: string;
  name: string;
  status: 'Active' | 'Closed';
  [key: string]: any;
}

interface HackerViewProps {
  hackers: Hacker[];
  reports: Report[];
  programs: Program[];
  onSelectProgram: (programId: string | null) => void;
  onSelectHacker: (hackerId: string | null) => void;
  selectedProgramId: string | null;
  selectedHackerId: string | null;
}

export default function HackerView({
  hackers,
  reports,
  programs,
  onSelectProgram,
  onSelectHacker,
  selectedProgramId,
  selectedHackerId
}: HackerViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'hackers' | 'reports'>('hackers');

  // Filter hackers based on search term
  const filteredHackers = hackers.filter(hacker => 
    hacker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hacker.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get program name by ID
  const getProgramName = (programId: string) => {
    const program = programs.find(p => p.id === programId);
    return program ? program.name : 'Programme inconnu';
  };

  // Get hacker name by ID
  const getHackerName = (hackerId: string) => {
    const hacker = hackers.find(h => h.id === hackerId);
    return hacker ? hacker.name : 'Hacker inconnu';
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">
          {view === 'hackers' ? 'Hackers' : 'Rapports de sécurité'}
        </h2>
        <div className="flex space-x-4">
          <div className="flex">
            <button
              onClick={() => setView('hackers')}
              className={`px-4 py-2 ${
                view === 'hackers'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              } rounded-l-md`}
            >
              Hackers
            </button>
            <button
              onClick={() => setView('reports')}
              className={`px-4 py-2 ${
                view === 'reports'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-700 text-gray-300'
              } rounded-r-md`}
            >
              Rapports
            </button>
          </div>
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
        <div className="flex space-x-4">
          <div className="relative">
            <select
              value={selectedProgramId || ''}
              onChange={(e) => onSelectProgram(e.target.value || null)}
              className="pl-4 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
            >
              <option value="">Tous les programmes</option>
              {programs.map(program => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
          </div>
          {view === 'reports' && (
            <div className="relative">
              <select
                value={selectedHackerId || ''}
                onChange={(e) => onSelectHacker(e.target.value || null)}
                className="pl-4 pr-10 py-2 bg-gray-700 border border-gray-600 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
              >
                <option value="">Tous les hackers</option>
                {hackers.map(hacker => (
                  <option key={hacker.id} value={hacker.id}>
                    {hacker.name}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
            </div>
          )}
        </div>
      </div>

      {view === 'hackers' ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-4 text-gray-400">Nom</th>
                <th className="pb-4 text-gray-400">Email</th>
                <th className="pb-4 text-gray-400">Date d'inscription</th>
                <th className="pb-4 text-gray-400">Rapports</th>
                <th className="pb-4 text-gray-400">Primes</th>
                <th className="pb-4 text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHackers.map((hacker) => (
                <tr key={hacker.id} className="border-b border-gray-700">
                  <td className="py-4 text-white">{hacker.name}</td>
                  <td className="py-4 text-gray-300">{hacker.email}</td>
                  <td className="py-4 text-gray-300">{formatDate(hacker.joinedDate)}</td>
                  <td className="py-4 text-gray-300">{hacker.totalReports}</td>
                  <td className="py-4 text-primary-400">{hacker.totalBounties}</td>
                  <td className="py-4">
                    <button
                      onClick={() => {
                        onSelectHacker(hacker.id);
                        setView('reports');
                      }}
                      className="px-3 py-1 bg-primary-900/50 text-primary-400 rounded-md hover:bg-primary-800/50"
                    >
                      Voir les rapports
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-4 text-gray-400">Titre</th>
                <th className="pb-4 text-gray-400">Programme</th>
                <th className="pb-4 text-gray-400">Hacker</th>
                <th className="pb-4 text-gray-400">Sévérité</th>
                <th className="pb-4 text-gray-400">Statut</th>
                <th className="pb-4 text-gray-400">Prime</th>
                <th className="pb-4 text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-700">
                  <td className="py-4 text-white">{report.title}</td>
                  <td className="py-4 text-gray-300">{getProgramName(report.programId)}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}