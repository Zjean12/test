import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft, Shield, FileText, Send, Upload, Image, Video, Paperclip, X, Target, AlertTriangle, Trophy, Users, Camera, Film, File } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '../../components/ui/button';
import readmeContent from '../README.md?raw';
import Header from './HeaderHack';
import { useNavigate } from 'react-router-dom';

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

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'video' | 'file';
  url: string;
  size?: string;
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

function AttachmentItem({ attachment, onRemove }: { attachment: Attachment, onRemove: (id: string) => void }) {
  const getIcon = () => {
    switch (attachment.type) {
      case 'image': return <Image className="w-5 h-5 text-cyan-400" />;
      case 'video': return <Video className="w-5 h-5 text-cyan-400" />;
      default: return <File className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getPreview = () => {
    if (attachment.type === 'image') {
      return (
        <div className="w-10 h-10 rounded overflow-hidden mr-3 bg-gray-800 flex-shrink-0">
          <img src={attachment.url} alt={attachment.name} className="w-full h-full object-cover" />
        </div>
      );
    }
    return (
      <div className="w-10 h-10 rounded bg-gray-800 flex items-center justify-center mr-3 flex-shrink-0">
        {getIcon()}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg mb-2 border border-gray-600 hover:border-gray-500 transition-colors">
      <div className="flex items-center min-w-0">
        {getPreview()}
        <div className="min-w-0 flex-1">
          <div className="text-sm font-medium truncate text-gray-200">{attachment.name}</div>
          {attachment.size && <div className="text-xs text-gray-400">{attachment.size}</div>}
        </div>
      </div>
      <button 
        onClick={() => onRemove(attachment.id)}
        className="text-gray-400 hover:text-red-400 transition-colors ml-2 p-1 rounded-full hover:bg-gray-600"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

export default function ProgramDetailHacker() {
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [reportContent, setReportContent] = useState('');
  const navigate = useNavigate();
  const [previewMode, setPreviewMode] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [avatar] = useState(() => {
    const savedAvatar = localStorage.getItem('avatar');
    return savedAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=1';
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const newAttachments: Attachment[] = [];
    
    Array.from(files).forEach(file => {
      const fileType = file.type.startsWith('image/') 
        ? 'image' 
        : file.type.startsWith('video/') 
          ? 'video' 
          : 'file';
      
      // Create a temporary URL for the file
      const url = URL.createObjectURL(file);
      
      // Format file size
      const size = formatFileSize(file.size);
      
      newAttachments.push({
        id: `attachment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: fileType,
        url,
        size
      });
    });

    setAttachments(prev => [...prev, ...newAttachments]);
    
    // Reset the file input
    if (event.target) {
      event.target.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => {
      const attachment = prev.find(a => a.id === id);
      if (attachment) {
        // Revoke the object URL to free up memory
        URL.revokeObjectURL(attachment.url);
      }
      return prev.filter(a => a.id !== id);
    });
  };

  const handleSubmitReport = () => {
    // Here you would implement the actual submission logic
    
    // Clean up object URLs
    attachments.forEach(attachment => {
      URL.revokeObjectURL(attachment.url);
    });
    
    // Reset form and close modal
    setReportContent('');
    setAttachments([]);
    setPreviewMode(false);
    setShowSubmitModal(false);
    
    // Show success message (you would implement this)
    alert('Rapport soumis avec succès!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Header avatar={avatar} />
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-start gap-6 mb-12"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/hacker/Rapports')}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux programmes
          </Button>
          <div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {programData.name}
            </h1>
            <p className="text-gray-400 text-lg">{programData.description}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <Users className="h-8 w-8 text-cyan-400 mb-4" />
            <div className="text-2xl font-bold">{programData.stats.hackers}</div>
            <div className="text-gray-400">Hackers Actifs</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <FileText className="h-8 w-8 text-cyan-400 mb-4" />
            <div className="text-2xl font-bold">{programData.stats.reports}</div>
            <div className="text-gray-400">Rapports Soumis</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <Trophy className="h-8 w-8 text-yellow-500 mb-4" />
            <div className="text-2xl font-bold">{programData.stats.bounties}₣</div>
            <div className="text-gray-400">Primes Versées</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-white">Exclusions</h2>
          </div>
          <p className="text-gray-300 text-lg">{programData.exclusions}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700"
        >
          <div className="flex items-center gap-3 mb-8">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <h2 className="text-2xl font-bold text-white">Récompenses</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(programData.bountyRanges).map(([severity, amount], index) => (
              <motion.div
                key={severity}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-700"
              >
                <div className="text-lg font-medium text-gray-400 capitalize mb-2">
                  {severity}
                </div>
                <div className={`text-3xl font-bold bg-gradient-to-r ${severityColors[severity as keyof typeof severityColors]} bg-clip-text text-transparent`}>
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
          className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700"
        >
          <div className="flex items-center gap-3 mb-8">
            <Target className="h-6 w-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Périmètre du Programme</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 px-4 text-left text-gray-400">Asset</th>
                  <th className="py-4 px-4 text-left text-gray-400">Type</th>
                  <th className="py-4 px-4 text-left text-gray-400">Coverage</th>
                  <th className="py-4 px-4 text-left text-gray-400">Severity</th>
                  <th className="py-4 px-4 text-left text-gray-400">Bounty</th>
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
                    <td className="py-4 px-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          {asset.isNew && (
                            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">
                              Nouveau
                            </span>
                          )}
                          <span className="font-medium text-white">{asset.name}</span>
                        </div>
                        {asset.description && (
                          <span className="text-sm text-gray-400 mt-1">{asset.description}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{asset.type}</td>
                    <td className="py-4 px-4">
                      <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm">
                        {asset.coverage}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-300">{asset.severity}</td>
                    <td className="py-4 px-4 text-gray-300">{asset.bounty}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

       

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl font-bold mb-4 text-white" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-xl font-semibold mt-6 mb-3 text-white" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-lg font-medium mt-4 mb-2 text-white" {...props} />
              ),
              p: ({ node, ...props }) => <p className="mb-3 text-gray-300" {...props} />,
              pre: ({ node, ...props }) => (
                <pre className="bg-gray-900 p-4 rounded-xl mb-4 overflow-auto border border-gray-700" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-400" {...props} />
              ),
              table: ({ node, ...props }) => (
                <table className="border-collapse w-full" {...props} />
              ),
              th: ({ node, ...props }) => (
                <th className="px-4 py-2 border border-gray-700 text-left" {...props} />
              ),
              td: ({ node, ...props }) => (
                <td className="px-4 py-2 border border-gray-700" {...props} />
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
          className="bg-gray-800 rounded-xl p-8 mb-8 border border-gray-700"
        >
          <div className="flex items-center gap-3 mb-8">
            <Shield className="h-6 w-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Top Hackers</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hackers.map((hacker) => (
              <HackerCard key={hacker.id} hacker={hacker} />
            ))}
          </div>
        </motion.div>

        <div className="fixed bottom-8 left-0 right-0 px-4 md:px-0">
            <Button
              className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-6 rounded-xl shadow-lg flex items-center justify-center gap-3 text-lg"
              size="lg"
              onClick={() => setShowSubmitModal(true)}
            >
              <Send className="h-5 w-5" />
              Soumettre un rapport
            </Button>
          </div>

        {/* Modal de Soumission de Rapport */}
        {showSubmitModal && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-700 shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-700">
                <h2 className="text-2xl font-bold text-white ">Soumettre un Nouveau Rapport</h2>
                <Button variant="ghost" onClick={() => setShowSubmitModal(false)} className="text-gray-400 hover:text-white">
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <div className="flex-grow overflow-auto p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-white">Rédigez Votre Rapport</h3>
                      <Button 
                        size="sm" 
                        variant={previewMode ? "default" : "outline"}
                        onClick={() => setPreviewMode(!previewMode)}
                        className={previewMode ? "bg-cyan-500 hover:bg-cyan-600" : "text-cyan-400 border-cyan-500 hover:bg-cyan-500/20"}
                      >
                        {previewMode ? 'Mode Édition' : 'Aperçu'}
                      </Button>
                    </div>
                    
                    {!previewMode ? (
                      <textarea
                        className="w-full flex-grow p-4 border border-gray-600 rounded-lg font-mono text-sm resize-none bg-gray-700 text-gray-200 focus:border-cyan-500 focus:ring focus:ring-cyan-500/20 focus:outline-none"
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                        placeholder="Rédigez votre rapport ici en utilisant Markdown..."
                      />
                    ) : (
                      <div className="w-full flex-grow p-4 border border-gray-600 rounded-lg overflow-auto bg-gray-700">
                        <div className="prose prose-sm max-w-none prose-invert">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {reportContent || "*Aperçu du rapport (vide pour l'instant)*"}
                          </ReactMarkdown>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col h-full">
                    <div className="bg-gray-700 p-4 rounded-lg mb-4 border border-gray-600">
                      <h3 className="font-semibold mb-2 text-white">Guide Markdown</h3>
                      <div className="text-sm font-mono bg-gray-800 p-3 rounded border border-gray-600 text-gray-300">
                        <pre className="whitespace-pre-wrap">
                          {`# Titre 1
                          ## Titre 2
                          ### Titre 3

                          **Texte en gras**
                          *Texte en italique*

                          - Point de liste
                          - Autre point

                          1. Liste numérotée
                          2. Deuxième élément

                          \`\`\`
                          // bloc de code
                          function example() {
                            return true;
                          }
                          \`\`\`

                          [Lien](https://example.com)
                          ![Image](https://example.com/image.jpg)

                          > Citation

                          | Tableau | Entête |
                          |---------|--------|
                          | Donnée  | Donnée |`}
                        </pre>
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h3 className="font-semibold mb-2 text-white">Pièces jointes</h3>
                      
                      {/* Upload buttons */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <Button 
                          variant="outline" 
                          onClick={() => imageInputRef.current?.click()}
                          className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 flex items-center justify-center"
                        >
                          <Camera className="mr-2 h-4 w-4" />
                          Images
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => videoInputRef.current?.click()}
                          className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 flex items-center justify-center"
                        >
                          <Film className="mr-2 h-4 w-4" />
                          Vidéos
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => fileInputRef.current?.click()}
                          className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 flex items-center justify-center"
                        >
                          <File className="mr-2 h-4 w-4" />
                          Fichiers
                        </Button>
                        
                        <input
                          type="file"
                          ref={imageInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                          accept="image/*"
                          multiple
                        />
                        <input
                          type="file"
                          ref={videoInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                          accept="video/*"
                          multiple
                        />
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileUpload}
                          className="hidden"
                          multiple
                        />
                      </div>
                      
                      {/* Drag and drop area */}
                      <div 
                        className="border-2 border-dashed border-gray-600 rounded-lg p-6 mb-4 bg-gray-700/50 hover:bg-gray-700 hover:border-cyan-500/30 transition-colors cursor-pointer flex flex-col items-center justify-center"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-10 w-10 text-gray-500 mb-2" />
                        <p className="text-gray-400 text-center mb-1">Glissez-déposez vos fichiers ici</p>
                        <p className="text-gray-500 text-sm text-center">ou cliquez pour parcourir</p>
                      </div>
                      
                      {/* Attachments list */}
                      <div className="border border-gray-600 rounded-lg p-4 mb-4 bg-gray-700 min-h-[100px] max-h-[250px] overflow-y-auto">
                        {attachments.length > 0 ? (
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm text-gray-400">{attachments.length} fichier(s) joint(s)</span>
                              <button 
                                onClick={() => setAttachments([])}
                                className="text-xs text-gray-400 hover:text-red-400 transition-colors"
                              >
                                Tout supprimer
                              </button>
                            </div>
                            {attachments.map(attachment => (
                              <AttachmentItem 
                                key={attachment.id} 
                                attachment={attachment} 
                                onRemove={removeAttachment} 
                              />
                            ))}
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center h-[100px] text-gray-400">
                            <Paperclip className="h-8 w-8 mb-2" />
                            <p>Aucune pièce jointe</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-700 bg-gray-900 flex justify-end">
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowSubmitModal(false)}
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                  >
                    Annuler
                  </Button>
                  <Button 
                    onClick={handleSubmitReport}
                    disabled={!reportContent.trim()}
                    className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-700 disabled:text-gray-500"
                  >
                    <Send className="mr-2 h-4 w-4 " />
                    Soumettre le Rapport
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}