import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Shield, AlertTriangle, CheckCircle2, Image as ImageIcon, FileText } from 'lucide-react';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Header from '../HeaderHack';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  role: 'hacker' | 'company';
  attachments?: Attachment[]; // Utilisation de l'interface Attachment
}

interface Attachment {
  type: 'image' | 'file' | 'video';
  url: string;
  name: string;
}

const mockReport = {
  id: '1',
  programName: 'Sécurité des Applications Web',
  company: 'TechCorp',
  submissionDate: '2024-03-15',
  status: 'Accepté',
  severity: 'Critique',
  bounty: '500,000',
  description: 'Vulnérabilité d\'exécution de code à distance dans le système de connexion',
  details: `# Résumé de la Vulnérabilité

Une vulnérabilité d'exécution de code à distance (RCE) a été découverte dans le système d'authentification principal. Cette faille permet à un attaquant d'exécuter du code arbitraire sur le serveur via une payload spécialement conçue.

## Impact

- Exécution de code arbitraire sur le serveur
- Accès potentiel aux données sensibles
- Compromission possible de l'infrastructure

## Étapes de Reproduction

1. Intercepter la requête de connexion
2. Modifier le paramètre 'username' avec la payload
3. Observer l'exécution du code

\`\`\`http
POST /api/auth/login HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "username": "'; DROP TABLE users; --",
  "password": "test123"
}
\`\`\`

## Capture d'écran

![Interface de connexion vulnérable](https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&q=80)

## Recommandations

- Implémenter une validation stricte des entrées
- Mettre à jour les bibliothèques concernées
- Ajouter des contrôles de sécurité supplémentaires

### Exemple de correction

\`\`\`javascript
// Avant
const query = \`SELECT * FROM users WHERE username = '\${username}'\`;

// Après
const query = 'SELECT * FROM users WHERE username = $1';
const values = [username];
await client.query(query, values);
\`\`\``,
  timeline: [
    { date: '2024-03-15', event: 'Rapport soumis' },
    { date: '2024-03-16', event: 'Triage initial' },
    { date: '2024-03-17', event: 'Confirmation de la vulnérabilité' },
    { date: '2024-03-18', event: 'Prime acceptée' }
  ]
};

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Alice Security',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    content: `**Excellent rapport !** La reproduction est claire et l'impact bien détaillé.

Voici une capture d'écran supplémentaire montrant le problème :`,
    timestamp: '2024-03-16T10:30:00Z',
    role: 'hacker',
  },
  {
    id: '2',
    author: 'TechCorp Security Team',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TechCorp',
    content: `Merci pour ce rapport détaillé. Nous avons confirmé la vulnérabilité et commencé les correctifs.

Voici une vidéo de notre analyse :`,
    timestamp: '2024-03-17T14:20:00Z',
    role: 'company',
  }
];

export default function ReportDetails() {
 // const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [avatar] = useState(() => {
    const savedAvatar = localStorage.getItem('avatar');
    return savedAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=1';
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'accepté': return 'bg-[#9fef00] text-black';
      case 'en cours de revue': return 'bg-[#ffb800] text-black';
      case 'rejeté': return 'bg-red-500 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critique':
        return <Shield className="h-5 w-5 text-red-500" />;
      case 'élevée':
        return <AlertTriangle className="h-5 w-5 text-[#ff6b00]" />;
      default:
        return <CheckCircle2 className="h-5 w-5 text-cyan-500" />;
    }
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'Vous',
      avatar: avatar,
      content: newComment,
      timestamp: new Date().toISOString(),
      role: 'hacker'
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  const AttachmentPreview = ({ attachment }: { attachment: Attachment }) => {
    switch (attachment.type) {
      case 'image':
        return (
          <div className="mt-3 relative group">
            <img
              src={attachment.url}
              alt={attachment.name}
              className="rounded-lg max-h-96 w-auto"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
              <a
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black bg-opacity-50 text-white px-4 py-2 rounded-full flex items-center"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Voir l'image
              </a>
            </div>
          </div>
        );
      case 'video':
        return (
          <div className="mt-3">
            <iframe
              src={attachment.url}
              width="100%"
              height="400"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="rounded-lg"
            />
          </div>
        );
      case 'file':
        return (
          <div className="mt-3">
            <a
              href={attachment.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-[#2a3655] text-white rounded-lg hover:bg-[#374873] transition-colors"
            >
              <FileText className="h-4 w-4 mr-2" />
              {attachment.name}
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#141d2b] text-gray-100">
      <Header avatar={avatar} />
      
      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <Link
            to="/hacker/Rapports"
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour aux rapports
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a2332] rounded-lg shadow-xl overflow-hidden border border-[#2a3655] mb-8"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{mockReport.programName}</h1>
                <p className="text-gray-400">{mockReport.company}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(mockReport.status)}`}>
                  {mockReport.status}
                </span>
                <div className="flex items-center bg-[#2a3655] px-4 py-2 rounded-full">
                  {getSeverityIcon(mockReport.severity)}
                  <span className="ml-2 text-sm font-medium">{mockReport.severity}</span>
                </div>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <div className="bg-[#232b3d] rounded-lg p-6 mb-6">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  className="markdown-content"
                  components={{
                    img: ({ node, ...props }) => (
                      <div className="my-4">
                        <img
                          {...props}
                          className="rounded-lg max-h-96 w-auto"
                          alt={props.alt || 'Report image'}
                        />
                      </div>
                    ),
                    code: ({ node, className, children, ...props }) => (
                      <code
                        className={`${className} bg-[#1a2332] p-4 rounded-lg block overflow-x-auto`}
                        {...props}
                      >
                        {children}
                      </code>
                    )
                  }}
                >
                  {mockReport.details}
                </ReactMarkdown>
              </div>

              <div className="border-t border-[#2a3655] pt-6 mt-6">
                <h2 className="text-xl font-semibold mb-4">Timeline</h2>
                <div className="space-y-4">
                  {mockReport.timeline.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-32 text-sm text-gray-400">{item.date}</div>
                      <div className="flex-1">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="bg-[#1a2332] rounded-lg shadow-xl border border-[#2a3655] p-6">
          <h2 className="text-xl font-semibold mb-6">Commentaires</h2>
          
          <div className="space-y-6 mb-6">
            <AnimatePresence>
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex space-x-4"
                >
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="font-medium">{comment.author}</span>
                      <span className="mx-2">•</span>
                      <span className="text-sm text-gray-400">
                        {format(new Date(comment.timestamp), 'dd MMM yyyy HH:mm')}
                      </span>
                      <span
                        className={`ml-2 px-2 py-1 rounded text-xs ${
                          comment.role === 'company' ? 'bg-blue-500' : 'bg-[#9fef00] text-black'
                        }`}
                      >
                        {comment.role === 'company' ? 'Entreprise' : 'Hacker'}
                      </span>
                    </div>
                    <div className="text-gray-300">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        className="markdown-content"
                      >
                        {comment.content}
                      </ReactMarkdown>
                      {comment.attachments?.map((attachment, index) => (
                        <AttachmentPreview key={index} attachment={attachment} />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSubmitComment} className="relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire... (Supporte le Markdown)"
              className="w-full bg-[#232b3d] border border-[#2a3655] rounded-lg p-4 pr-12 min-h-[100px] text-gray-100 placeholder-gray-500 focus:border-[#9fef00] focus:ring-[#9fef00]"
            />
            <button
              type="submit"
              className="absolute bottom-4 right-4 p-2 text-[#9fef00] hover:text-white transition-colors disabled:opacity-50"
              disabled={!newComment.trim()}
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 