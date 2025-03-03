import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Plus, Minus, ArrowLeft, Eye } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FieldError } from 'react-hook-form';
import Header from './HeaderEntre';


// Définition du schéma de validation avec Zod
const programSchema = z.object({
  name: z.string().min(1, 'Le nom du programme est requis'),
  description: z.string().min(1, 'La description est requise'),
  bountyRanges: z.object({
    low: z.string().min(1, 'Le bounty pour la faible sévérité est requis'),
    medium: z.string().min(1, 'Le bounty pour la sévérité moyenne est requis'),
    high: z.string().min(1, 'Le bounty pour la haute sévérité est requis'),
    critical: z.string().min(1, 'Le bounty pour la sévérité critique est requis'),
  }),
  markdown: z.string().min(1, 'Les détails du programme sont requis'),
});

type ProgramForm = z.infer<typeof programSchema>;

export interface ScopeItem {
  id: string;
  type: string;
  target: string;
  description: string;
  
}

export interface Program extends ProgramForm {
  id: string;
  status: 'Active' | 'Closed';
  scope: ScopeItem[];
  reports: number;
  bounties: string;
  createdAt: string;
  lastUpdated: string | null; // Ajoutez cette ligne
  
  
  
}

interface AddProgramProps {
  onCancel?: () => void;
  onProgramAdded?: (program: Program) => void;
  initialProgram?: Program;
  
}

const markdownGuide = `
# Guide Markdown

## Titres
# Titre 1
## Titre 2
### Titre 3

## Mise en forme
*italique* ou _italique_
**gras** ou __gras__
**_gras et italique_**

## Listes
* Élément de liste non ordonnée
* Autre élément
  * Sous-élément

1. Élément de liste ordonnée
2. Autre élément
   1. Sous-élément

## Liens et Images
[Texte du lien](URL)
![Texte alternatif de l'image](URL de l'image)

## Code
\`code en ligne\`

\`\`\`javascript
// Bloc de code
function example() {
  return 'Hello World!';
}
\`\`\`

## Tableaux
| Entête 1 | Entête 2 |
|----------|----------|
| Cellule 1| Cellule 2|

## Citations
> Ceci est une citation
`;

export default function AddProgram({ onCancel, onProgramAdded, initialProgram }: AddProgramProps) {
  const [scope, setScope] = useState<ScopeItem[]>(initialProgram?.scope || []);
  const [showPreview, setShowPreview] = useState(false);

  const { register, handleSubmit, formState: { errors }, watch, getValues } = useForm<ProgramForm>({
    resolver: zodResolver(programSchema),
    defaultValues: initialProgram ? {
      name: initialProgram.name,
      description: initialProgram.description,
      bountyRanges: initialProgram.bountyRanges,
      markdown: initialProgram.markdown,
    } : {
      name: '',
      description: '',
      bountyRanges: {
        low: '',
        medium: '',
        high: '',
        critical: '',
      },
      markdown: '',
    }
  });

  const addScopeItem = () => {
    setScope([
      ...scope,
      { id: Date.now().toString(), type: '', target: '', description: '' },
    ]);
  };

  const removeScopeItem = (id: string) => {
    setScope(scope.filter((item) => item.id !== id));
  };

  const updateScopeItem = (id: string, field: keyof ScopeItem, value: string) => {
    setScope(scope.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const onSubmit = async (data: ProgramForm) => {
    try {
      const newProgram: Program = {
        ...data, // Nouvelles données
        id: initialProgram?.id || Date.now().toString(), // Utiliser l'ID existant ou en générer un nouveau
        status: initialProgram?.status || 'Active', // Utiliser le statut existant ou définir par défaut 'Active'
        scope, // Scope défini ailleurs dans le code
        reports: initialProgram?.reports || 0, // Utiliser le nombre de rapports existant ou définir par défaut 0
        bounties: initialProgram?.bounties || '$0', // Utiliser les primes existantes ou définir par défaut '$0'
        createdAt: initialProgram?.createdAt || new Date().toISOString(), // Utiliser la date de création existante ou définir la date actuelle
        lastUpdated: initialProgram?.lastUpdated || null, // Utiliser la date de mise à jour existante ou définir par défaut null
      };
      
      console.log('Données du programme:', newProgram);
      
      if (onProgramAdded) {
        onProgramAdded(newProgram);
      }
      
      if (onCancel) onCancel();
    } catch (error) {
      console.error('Erreur lors de la création du programme:', error);
    }
  };

  const handlePreview = () => {
    // Vérifier si le formulaire est valide avant d'afficher l'aperçu
    if (Object.keys(errors).length === 0) {
      setShowPreview(true);
    }
  };

  const watchMarkdown = watch('markdown');
  const formValues = getValues();

  if (showPreview) {
    return (
      <div className="bg-gray-900">
        
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
            <div className="flex items-center mb-6">
              <button 
                onClick={() => setShowPreview(false)} 
                className="mr-2 p-2 rounded-full hover:bg-gray-700 text-gray-300"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-2xl font-bold text-white">Aperçu du programme</h1>
            </div>

            <div className="space-y-8">
              <div className="border-b border-gray-700 pb-4">
                <h2 className="text-xl font-semibold mb-4 text-white">{formValues.name}</h2>
                <p className="text-gray-300">{formValues.description}</p>
              </div>

              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-lg font-semibold mb-3 text-white">Plages de bounty</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(formValues.bountyRanges).map(([severity, range]) => (
                    <div key={severity} className="bg-gray-700 p-3 rounded-md">
                      <div className="text-sm font-medium capitalize text-gray-300">{severity}</div>
                      <div className="text-lg font-semibold text-primary-400">{range}</div>
                    </div>
                  ))}
                </div>
              </div>

              {scope.length > 0 && (
                <div className="border-b border-gray-700 pb-4">
                  <h3 className="text-lg font-semibold mb-3 text-white">Scope</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-gray-700">
                          <th className="pb-2 pr-4 text-gray-400">Type</th>
                          <th className="pb-2 pr-4 text-gray-400">Target</th>
                          <th className="pb-2 text-gray-400">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scope.map((item) => (
                          <tr key={item.id} className="border-b border-gray-700">
                            <td className="py-2 pr-4 text-gray-300">{item.type}</td>
                            <td className="py-2 pr-4 text-gray-300">{item.target}</td>
                            <td className="py-2 text-gray-300">{item.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold mb-3 text-white">Détails du programme</h3>
                <div className="prose prose-sm max-w-none bg-gray-700 p-4 rounded-md prose-invert">
                  <ReactMarkdown
                    children={formValues.markdown}
                    remarkPlugins={[remarkGfm]}
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 text-gray-300"
                >
                  Modifier
                </button>
                <button 
                  type="button" 
                  onClick={() => onSubmit(formValues)}
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  {initialProgram ? 'Mettre à jour' : 'Confirmer et créer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900">
      {/* Header */}
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 border border-gray-700">
          <div className="flex items-center mb-6">
            {onCancel && (
              <button 
                onClick={onCancel} 
                className="mr-2 p-2 rounded-full hover:bg-gray-700 text-gray-300"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            <h1 className="text-2xl font-bold text-white">
              {initialProgram ? 'Modifier le programme' : 'Créer un nouveau programme'}
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Informations de base */}
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Nom du programme
                </label>
                <input
                  id="name"
                  {...register('name')}
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white ${errors.name ? 'border-red-500' : 'border-gray-600'}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                  Description courte
                </label>
                <input
                  id="description"
                  {...register('description')}
                  className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white ${errors.description ? 'border-red-500' : 'border-gray-600'}`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Bounty Ranges */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Plages de bounty</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(['low', 'medium', 'high', 'critical'] as const).map((severity) => {
                  const error = errors.bountyRanges?.[severity] as FieldError | undefined;

                  return (
                    <div key={severity}>
                      <label htmlFor={severity} className="block text-sm font-medium text-gray-300 mb-1 capitalize">
                        {severity}
                      </label>
                      <input
                        id={severity}
                        placeholder="$100"
                        {...register(`bountyRanges.${severity}`)}
                        className={`w-full px-3 py-2 bg-gray-700 border rounded-md text-white ${
                          error ? 'border-red-500' : 'border-gray-600'
                        }`}
                      />
                      {error && (
                        <p className="text-red-500 text-sm mt-1">
                          {error.message}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>




            {/* Scope */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Scope</h3>
                <button 
                  type="button" 
                  onClick={addScopeItem}
                  className="flex items-center px-3 py-1.5 bg-primary-600 text-white rounded-md hover:bg-primary-700 text-sm"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter un élément de scope
                </button>
              </div>

              <div className="space-y-4">
                {scope.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input
                        placeholder="Type (ex : Web, API, Mobile)"
                        value={item.type}
                        onChange={(e) => updateScopeItem(item.id, 'type', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md mb-2 text-white"
                      />
                      <input
                        placeholder="Target (ex : *.example.com)"
                        value={item.target}
                        onChange={(e) => updateScopeItem(item.id, 'target', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md mb-2 text-white"
                      />
                      <input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateScopeItem(item.id, 'description', e.target.value)}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeScopeItem(item.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-700 rounded-full"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Markdown Editor */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Détails du programme</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Champ Markdown & Guide */}
                <div className="flex flex-col w-full">
                  <div className="flex flex-col w-full">
                    <label htmlFor="markdown" className="block text-sm font-medium text-gray-300 mb-1">
                      Écrire
                    </label>
                    <textarea
                      id="markdown"
                      {...register("markdown")}
                      className={`w-full min-h-[400px] p-4 bg-gray-700 border rounded-md font-mono resize-y text-white ${
                        errors.markdown ? "border-red-500" : "border-gray-600"
                      }`}
                    />
                    {errors.markdown && (
                      <p className="text-red-500 text-sm mt-1">{errors.markdown.message}</p>
                    )}
                  </div>
                </div>

                {/* Guide Markdown à droite */}
                <div className="bg-gray-700 p-4 rounded-md max-h-[400px] overflow-y-auto border border-gray-600">
                  <h3 className="text-lg font-semibold mb-2 text-white">Guide Markdown</h3>
                  <pre className="whitespace-pre-wrap font-mono text-sm text-gray-300">
                    {markdownGuide}
                  </pre>
                </div>
              </div>

              {/* Prévisualisation Markdown */}
              <div className="max-w-screen-lg p-4 min-h-[400px] border border-gray-600 rounded-md overflow-y-auto prose prose-sm mt-6 prose-invert bg-gray-700">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Prévisualisation
                </label>
                <ReactMarkdown
                  children={watchMarkdown || ''}
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
                      <pre
                        className="bg-gray-800 p-3 rounded-2xl mb-3 overflow-auto text-gray-300"
                        {...props}
                      />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        className="border-l-4 border-gray-500 pl-4 italic text-gray-400"
                        {...props}
                      />
                    ),
                    table: ({ node, ...props }) => (
                      <table className="table-auto w-full border-collapse" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th className="px-4 py-2 border border-gray-600 text-gray-300" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-4 py-2 border border-gray-600 text-gray-300" {...props} />
                    ),
                  }}
                />
              </div>
            </div>

            <div className="flex space-x-4">
              {onCancel && (
                <button 
                  type="button" 
                  onClick={onCancel}
                  className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 text-gray-300"
                >
                  Annuler
                </button>
              )}
              <button 
                type="button" 
                onClick={handlePreview}
                className="flex items-center px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700 text-gray-300"
              >
                <Eye className="h-4 w-4 mr-2" />
                Visualiser
              </button>
              <button 
                type="submit" 
                className="bg-cyan-700 hover:bg-cyan-950 flex-1 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
              >
                {initialProgram ? 'Mettre à jour' : 'Créer le programme'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}