import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useToast } from '../../components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';


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

interface ScopeItem {
  id: string;
  type: string;
  target: string;
  description: string;
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

export default function AddProgram() {
  const [scope, setScope] = useState<ScopeItem[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }, watch } = useForm<ProgramForm>({
    resolver: zodResolver(programSchema),
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
      console.log('Données du programme:', { ...data, scope });
      toast({
        title: "Succès",
        description: "Le programme a été créé avec succès",
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur lors de la création du programme:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Échec de la création du programme. Veuillez réessayer.",
      });
    }
  };

  const watchMarkdown = watch('markdown');

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-2xl font-bold mb-8">Créer un nouveau programme</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Informations de base */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nom du programme</Label>
                <Input
                  id="name"
                  {...register('name')}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description courte</Label>
                <Input
                  id="description"
                  {...register('description')}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>

            {/* Bounty Ranges */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Plages de bounty</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['low', 'medium', 'high', 'critical'].map((severity) => (
                  <div key={severity}>
                    <Label htmlFor={severity} className="capitalize">
                      {severity}
                    </Label>
                    <Input
                      id={severity}
                      placeholder="$100-$500"
                      {...register(`bountyRanges.${severity}`)}
                      className={errors.bountyRanges?.[severity] ? 'border-red-500' : ''}
                    />
                    {errors.bountyRanges?.[severity] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.bountyRanges[severity]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Scope */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Scope</h3>
                <Button type="button" onClick={addScopeItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter un élément de scope
                </Button>
              </div>

              <div className="space-y-4">
                {scope.map((item) => (
                  <div key={item.id} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <Input
                        placeholder="Type (ex : Web, API, Mobile)"
                        value={item.type}
                        onChange={(e) => updateScopeItem(item.id, 'type', e.target.value)}
                        className="mb-2"
                      />
                      <Input
                        placeholder="Target (ex : *.example.com)"
                        value={item.target}
                        onChange={(e) => updateScopeItem(item.id, 'target', e.target.value)}
                        className="mb-2"
                      />
                      <Input
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => updateScopeItem(item.id, 'description', e.target.value)}
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeScopeItem(item.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Markdown Editor */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Détails du programme</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Champ Markdown & Guide */}
                <div className="flex flex-col w-full">
                  <div className="flex flex-col w-full">
                    <Label htmlFor="markdown">Écrire</Label>
                    <textarea
                      id="markdown"
                      {...register("markdown")}
                      className={`w-full min-h-[573px] p-4 border rounded-md font-mono resize-y ${
                        errors.markdown ? "border-red-500" : ""
                      }`}
                    />
                    {errors.markdown && (
                      <p className="text-red-500 text-sm mt-1">{errors.markdown.message}</p>
                    )}
                  </div>
                </div>

                {/* Guide Markdown à droite */}
                <div className="bg-gray-50 p-4 rounded-md max-h-[calc(500px+6rem)] overflow-y-auto">
                  <h3 className="text-lg font-semibold mb-2">Guide Markdown</h3>
                  <pre className="whitespace-pre-wrap font-mono text-sm">
                    {markdownGuide}
                  </pre>
                </div>
              </div>

              {/* Prévisualisation Markdown */}
              <div className="max-w-screen-lg h-96 p-4 min-h-[1000px] border rounded-md overflow-y-auto prose prose-sm mt-6">
                <Label>Prévisualisation</Label>
                <ReactMarkdown
                  children={watchMarkdown}
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
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Créer le programme
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}