import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Shield, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../../components/ui/use-toast';

const companyProfileSchema = z.object({
  companyName: z.string().min(1, 'Le nom de l\'entreprise est requis'),
  website: z.string().url('URL du site web invalide'),
  registrationNumber: z.string().min(1, 'Le numéro d\'enregistrement est requis'),
  address: z.string().min(1, 'L\'adresse est requise'),
  contactPerson: z.string().min(1, 'Le nom du contact est requis'),
  contactPhone: z.string().min(1, 'Le téléphone de contact est requis'),
  documents: z.array(z.instanceof(File)).min(1, 'Veuillez télécharger au moins un fichier'),
});

type CompanyProfileForm = z.infer<typeof companyProfileSchema>;

export default function CompanyProfile() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<CompanyProfileForm>({
    resolver: zodResolver(companyProfileSchema)
  });

  const onSubmit = async (data: CompanyProfileForm) => {
    try {
      // TODO: Call your API to update company profile and upload files
      console.log('Données du profil de l\'entreprise:', data);
      toast({
        title: "Profil mis à jour",
        description: "Le profil de votre entreprise a été complété",
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Erreur de mise à jour du profil:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Échec de la mise à jour du profil. Veuillez réessayer.",
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setValue('documents', Array.from(files));
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-2xl mx-auto p-6 mt-8">
        <motion.div
          className="bg-white rounded-lg shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <Shield className="w-12 h-12 mx-auto text-primary mb-4" />
            <h1 className="text-2xl font-bold">Complétez le Profil de l'Entreprise</h1>
            <p className="text-gray-600">Veuillez fournir les détails de votre entreprise</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="companyName">Nom de l'Entreprise</Label>
                <Input
                  id="companyName"
                  {...register('companyName')}
                  className={errors.companyName ? 'border-red-500' : ''}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="website">Site Web</Label>
                <Input
                  id="website"
                  type="url"
                  {...register('website')}
                  className={errors.website ? 'border-red-500' : ''}
                />
                {errors.website && (
                  <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="registrationNumber">Numéro d'Enregistrement</Label>
                <Input
                  id="registrationNumber"
                  {...register('registrationNumber')}
                  className={errors.registrationNumber ? 'border-red-500' : ''}
                />
                {errors.registrationNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.registrationNumber.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="address">Adresse</Label>
                <Input
                  id="address"
                  {...register('address')}
                  className={errors.address ? 'border-red-500' : ''}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactPerson">Personne de Contact</Label>
                <Input
                  id="contactPerson"
                  {...register('contactPerson')}
                  className={errors.contactPerson ? 'border-red-500' : ''}
                />
                {errors.contactPerson && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactPerson.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="contactPhone">Téléphone de Contact</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  {...register('contactPhone')}
                  className={errors.contactPhone ? 'border-red-500' : ''}
                />
                {errors.contactPhone && (
                  <p className="text-red-500 text-sm mt-1">{errors.contactPhone.message}</p>
                )}
              </div>
            </div>

            <div className="border-2 border-dashed rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-gray-600 mb-2">
                Téléchargez les documents de vérification de l'entreprise
              </p>
              <p className="text-xs text-gray-500">
                (Enregistrement de l'entreprise, licences ou autres documents pertinents)
              </p>
              <Input
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
                multiple
                id="documents"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                variant="outline"
                className="mt-4"
                onClick={() => document.getElementById('documents')?.click()}
              >
                Sélectionner les fichiers
              </Button>
            </div>

            {errors.documents && (
              <p className="text-red-500 text-sm mt-1">{errors.documents.message}</p>
            )}

            <Button type="submit" className="w-full">
              Compléter le Profil
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
