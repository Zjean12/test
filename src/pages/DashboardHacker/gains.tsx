import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpRight, FileText, Send } from 'lucide-react';
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
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const [previewMode, setPreviewMode] = useState(false);

  const filteredReports = mockReports.filter(report =>
    report.programName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepté': return 'bg-green-100 text-green-800';
      case 'en cours de revue': return 'bg-yellow-100 text-yellow-800';
      case 'rejeté': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critique': return 'bg-red-100 text-red-800';
      case 'élevée': return 'bg-orange-100 text-orange-800';
      case 'moyenne': return 'bg-yellow-100 text-yellow-800';
      case 'faible': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Mes Rapports</h1>
          <Button onClick={() => setShowSubmitModal(true)}>
            <FileText className="mr-2 h-4 w-4" />
            Soumettre un Nouveau Rapport
          </Button>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher des rapports..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid gap-6">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{report.programName}</h3>
                    <p className="text-sm text-gray-500 mb-2">{report.company}</p>
                    <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs ${getSeverityColor(report.severity)}`}>
                        {report.severity}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
                        Soumis le : {report.submissionDate}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-semibold mb-2">
                      {report.bounty !== 'En Attente' ? `₣${report.bounty}` : 'En Attente de Revue'}
                    </div>
                    <Button className="flex items-center" asChild>
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

      {/* Modal de Soumission de Rapport */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Soumettre un Nouveau Rapport</h2>
              <Button variant="ghost" onClick={() => setShowSubmitModal(false)}>×</Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Rédigez Votre Rapport</h3>
                <textarea
                  className="w-full h-[500px] p-4 border rounded-lg font-mono"
                  value={reportContent}
                  onChange={(e) => setReportContent(e.target.value)}
                  placeholder="Rédigez votre rapport ici en utilisant Markdown..."
                />
              </div>

              <div>
                <div className="sticky top-0">
                  <h3 className="font-semibold mb-4">Guide Markdown</h3>
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <pre className="text-sm">
                      # Titre 1
                      ## Titre 2
                      **Texte en gras**
                      *Texte en italique*
                      - Point de liste
                      1. Liste numérotée
                      ```bloc de code```
                      [Lien](url)
                      ![Image](url)
                    </pre>
                  </div>

                  <Button
                    className="w-full mb-4"
                    onClick={() => setPreviewMode(!previewMode)}
                  >
                    {previewMode ? 'Mode Édition' : 'Mode Aperçu'}
                  </Button>

                  {previewMode && (
                    <div className="bg-white border rounded-lg p-4">
                      {/* Ajoutez ici le rendu de l'aperçu Markdown */}
                      <div dangerouslySetInnerHTML={{ __html: reportContent }} />
                    </div>
                  )}

                  <Button
                    className="w-full"
                    onClick={() => {
                      // Gérer la soumission du rapport
                      setShowSubmitModal(false);
                    }}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Soumettre le Rapport
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}