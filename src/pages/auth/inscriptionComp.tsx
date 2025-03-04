import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  Building,
  Upload,
  User,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Calendar,
  Briefcase,
  Globe,
  Linkedin,
  Facebook,
  Twitter,
  Image,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Liste des types d'entreprises
const typesEntreprise = [
  "SARL - Société à responsabilité limitée",
  "SA - Société anonyme",
  "SAS - Société par actions simplifiée",
  "SASU - Société par actions simplifiée unipersonnelle",
  "EURL - Entreprise unipersonnelle à responsabilité limitée",
  "SNC - Société en nom collectif",
  "SCI - Société civile immobilière",
  "EI - Entreprise individuelle",
  "EIRL - Entreprise individuelle à responsabilité limitée",
  "Micro-entreprise",
  "Association",
  "Autre",
];

// Liste des pays (exemple simplifié)
const pays = [
  { code: "FR", nom: "France" },
  { code: "BE", nom: "Belgique" },
  { code: "CH", nom: "Suisse" },
  { code: "CA", nom: "Canada" },
  { code: "US", nom: "États-Unis" },
  { code: "DE", nom: "Allemagne" },
  { code: "ES", nom: "Espagne" },
  { code: "IT", nom: "Italie" },
  { code: "UK", nom: "Royaume-Uni" },
  { code: "MA", nom: "Maroc" },
  { code: "SN", nom: "Sénégal" },
  { code: "CI", nom: "Côte d'Ivoire" },
  { code: "CM", nom: "Cameroun" },
  { code: "DZ", nom: "Algérie" },
  { code: "TN", nom: "Tunisie" },
];

// Villes par pays (exemple simplifié)
const villesParPays: Record<string, string[]> = {
  FR: ["Paris", "Lyon", "Marseille", "Bordeaux", "Lille", "Toulouse", "Nice", "Nantes", "Strasbourg"],
  BE: ["Bruxelles", "Anvers", "Gand", "Liège", "Bruges", "Namur", "Louvain", "Charleroi"],
  CH: ["Zurich", "Genève", "Bâle", "Lausanne", "Berne", "Lucerne", "Lugano"],
  CA: ["Montréal", "Toronto", "Vancouver", "Québec", "Ottawa", "Calgary", "Edmonton"],
  US: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"],
  DE: ["Berlin", "Munich", "Hambourg", "Cologne", "Francfort", "Stuttgart", "Düsseldorf"],
  ES: ["Madrid", "Barcelone", "Valence", "Séville", "Saragosse", "Malaga", "Murcie"],
  IT: ["Rome", "Milan", "Naples", "Turin", "Palerme", "Gênes", "Bologne"],
  UK: ["Londres", "Manchester", "Birmingham", "Glasgow", "Liverpool", "Édimbourg", "Bristol"],
  MA: ["Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir", "Meknès"],
  SN: ["Dakar", "Thiès", "Kaolack", "Saint-Louis", "Ziguinchor", "Touba", "Rufisque"],
  CI: ["Abidjan", "Bouaké", "Daloa", "Yamoussoukro", "Korhogo", "San-Pédro", "Man"],
  CM: ["Douala", "Yaoundé", "Garoua", "Bamenda", "Maroua", "Bafoussam", "Ngaoundéré"],
  DZ: ["Alger", "Oran", "Constantine", "Annaba", "Blida", "Batna", "Sétif"],
  TN: ["Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte", "Gabès", "Ariana"],
};

// Schémas de validation
const companyInfoSchema = z.object({
  nom: z.string().min(1, "Le nom de l'entreprise est requis"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères").optional(),
  type: z.string().min(1, "Le type d'entreprise est requis"),
  secteur: z.string().min(1, "Le secteur d'activité est requis"),
  num_identification: z.string().min(1, "Le numéro d'identification est requis"),
  localisation: z.object({
    pays: z.string().min(1, "Le pays est requis"),
    ville: z.string().min(1, "La ville est requise"),
  }),
  statut_actuel: z.string().min(1, "Le statut est requis"),
  logo: z.instanceof(File).refine(file => file, "Le logo est requis"), // Fichier obligatoire
});

const contactInfoSchema = z.object({
  fix: z.string().optional(),
  email: z.string().email("Email invalide"),
  adresse: z.string().min(1, "L'adresse est requise"),
  urlSite: z.string().url("URL du site web invalide").optional(),
  reseaux_sociaux: z.object({
    linkedin: z.string().url("URL LinkedIn invalide").optional(),
    facebook: z.string().url("URL Facebook invalide").optional(),
    twitter: z.string().url("URL Twitter invalide").optional(),
  }),
  responsable: z.object({
    nom: z.string().min(1, "Le nom du responsable est requis"),
  }),
  contact: z.string().min(1, "Le numéro de récupération est requis").optional(),
});

const financialInfoSchema = z.object({
  registre_commerce: z.instanceof(File).refine(file => file, "Le registre de commerce est requis"), // Fichier obligatoire
  date_creation: z.string().min(1, "La date de création est requise"),
  langues: z.array(z.string()).optional(),
  modes_paiement: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
});

const companyProfileSchema = companyInfoSchema.merge(contactInfoSchema).merge(financialInfoSchema);

type CompanyProfileForm = z.infer<typeof companyProfileSchema>;

export default function CompanyProfile() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [registreFile, setRegistreFile] = useState<File | null>(null);
  const [registrePreview, setRegistrePreview] = useState<string | null>(null);
  const [selectedPays, setSelectedPays] = useState<string>("");
  const [villes, setVilles] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = useForm<CompanyProfileForm>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      statut_actuel: "actif",
      reseaux_sociaux: {
        linkedin: "",
        facebook: "",
        twitter: "",
      },
      localisation: {
        pays: "",
        ville: "",
      },
      responsable: {
        nom: "",
      },
      langues: [],
      modes_paiement: [],
      services: [],
      contact: "",
    },
  });

  const watchPays = watch("localisation.pays");

  useEffect(() => {
    if (watchPays) {
      setSelectedPays(watchPays);
      setVilles(villesParPays[watchPays] || []);
      setValue("localisation.ville", "");
    }
  }, [watchPays, setValue]);

  const handleNextStep = async () => {
    let isValid = false;

    if (step === 1) {
      isValid = await trigger(
        [
          'nom',
          'description',
          'type',
          'secteur',
          'num_identification',
          'localisation.pays',
          'localisation.ville',
          'statut_actuel',
          'logo',
        ],
        { shouldFocus: true }
      );
    } else if (step === 2) {
      isValid = await trigger(
        [
          'responsable.nom',
          'fix',
          'email',
          'adresse',
          'urlSite',
          'reseaux_sociaux.linkedin',
          'reseaux_sociaux.facebook',
          'reseaux_sociaux.twitter',
          'contact',
        ],
        { shouldFocus: true }
      );
    } else if (step === 3) {
      isValid = await trigger(
        [
          'registre_commerce',
          'date_creation',
          'langues',
          'modes_paiement',
          'services',
        ],
        { shouldFocus: true }
      );
    }

    if (isValid) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Validation de la taille du logo
      const maxSize = 2 * 1024 * 1024; // 2 Mo
      if (file.size > maxSize) {
        toast({
          title: "Erreur",
          description: "Le logo ne doit pas dépasser 2 Mo.",
          variant: "destructive",
        });
        return;
      }

      setLogoFile(file);
      setValue('logo', file);

      // Créer un aperçu du logo
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegistreChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      // Validation de la taille du fichier
      const maxSize = 2 * 1024 * 1024; // 2 Mo
      if (file.size > maxSize) {
        toast({
          title: "Erreur",
          description: "Le fichier ne doit pas dépasser 2 Mo.",
          variant: "destructive",
        });
        return;
      }

      setRegistreFile(file);
      setValue('registre_commerce', file);

      // Créer un aperçu du fichier
      const reader = new FileReader();
      reader.onload = (e) => {
        setRegistrePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    setValue('logo', new File([], "")); // An empty file
  };
  
  const removeRegistre = () => {
    setRegistreFile(null);
    setRegistrePreview(null);
    setValue('registre_commerce', new File([], "")); // An empty file
  };
  

  const onSubmit = async (formData: CompanyProfileForm) => {
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();

      // Ajouter les fichiers
      if (formData.logo) {
        formDataToSend.append('logo', formData.logo);
      }
      if (formData.registre_commerce) {
        formDataToSend.append('registre_commerce', formData.registre_commerce);
      }

      // Ajouter les autres champs
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'logo' && key !== 'registre_commerce') {
          if (typeof value === 'object' && value !== null) {
            formDataToSend.append(key, JSON.stringify(value));
          } else {
            formDataToSend.append(key, value as string);
          }
        }
      });

      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.put(`${API_BASE_URL}/api/entreprise/update`, formDataToSend, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200 && response.status !== 201) {
        throw new Error("Échec de l'enregistrement");
      }

      toast({
        title: "Profil complété",
        description: "Le profil de votre entreprise a été enregistré avec succès",
        variant: "default",
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'enregistrement du profil",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="w-full max-w-2xl">
        <motion.div
          className="bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.8 }}>
              <Building className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Profil de l'Entreprise
            </h1>
            <p className="text-gray-300 mt-2">Complétez les informations de votre entreprise</p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8 relative">
            <div className="w-full absolute top-1/2 h-0.5 bg-gray-700 -translate-y-1/2 z-0"></div>
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= stepNumber
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'bg-gray-700'
                } transition-all duration-300`}
              >
                {step > stepNumber ? (
                  <CheckCircle className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-white font-medium">{stepNumber}</span>
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center mb-4">
                    <Building className="w-5 h-5 mr-2 text-blue-500" />
                    <h2 className="text-lg font-semibold text-white">Informations de l'Entreprise</h2>
                  </div>

                  {/* Logo Upload */}
                  <div className="mb-6">
                    <Label className="text-gray-300 flex items-center mb-2">
                      <Image className="w-4 h-4 mr-1 text-blue-500" />
                      Logo de l'entreprise
                    </Label>

                    <div className="flex flex-col items-center">
                      {logoPreview ? (
                        <div className="relative mb-4">
                          <img
                            src={logoPreview}
                            alt="Logo preview"
                            className="w-32 h-32 object-contain rounded-lg border-2 border-blue-500"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 text-white rounded-full hover:bg-red-600"
                            onClick={removeLogo}
                          >
                            ×
                          </Button>
                        </div>
                      ) : (
                        <div className="w-32 h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center mb-4">
                          <Image className="w-12 h-12 text-gray-500" />
                        </div>
                      )}

                      <Input
                        type="file"
                        id="logo"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.svg"
                        onChange={handleLogoChange}
                      />

                      <Button
                        type="button"
                        variant="outline"
                        className="bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500/10"
                        onClick={() => document.getElementById('logo')?.click()}
                      >
                        {logoPreview ? 'Changer le logo' : 'Sélectionner un logo'}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nom" className="text-gray-300">
                        Nom de l'entreprise
                      </Label>
                      <Input
                        id="nom"
                        placeholder="Nom officiel de l'entreprise"
                        className="text-white border-gray-700 bg-gray-800/50 focus:border-blue-500"
                        {...register('nom')}
                      />
                      {errors.nom && (
                        <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="type" className="text-gray-300">
                        Type d'entreprise
                      </Label>
                      <select
                        id="type"
                        className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('type')}
                      >
                        <option value="">Sélectionnez un type</option>
                        {typesEntreprise.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      {errors.type && (
                        <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="secteur" className="text-gray-300">
                        Secteur d'activité
                      </Label>
                      <Input
                        id="secteur"
                        placeholder="Secteur d'activité"
                        className="text-white border-gray-700 bg-gray-800/50 focus:border-blue-500"
                        {...register('secteur')}
                      />
                      {errors.secteur && (
                        <p className="text-red-500 text-sm mt-1">{errors.secteur.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="num_identification" className="text-gray-300">
                        Numéro d'identification
                      </Label>
                      <Input
                        id="num_identification"
                        placeholder="Numéro fiscal ou légal"
                        className="text-white border-gray-700 bg-gray-800/50 focus:border-blue-500"
                        {...register('num_identification')}
                      />
                      {errors.num_identification && (
                        <p className="text-red-500 text-sm mt-1">{errors.num_identification.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="statut_actuel" className="text-gray-300">
                        Statut
                      </Label>
                      <select
                        id="statut_actuel"
                        className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('statut_actuel')}
                      >
                        <option value="actif">Actif</option>
                        <option value="inactif">Inactif</option>
                      </select>
                      {errors.statut_actuel && (
                        <p className="text-red-500 text-sm mt-1">{errors.statut_actuel.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="localisation.pays" className="text-gray-300">
                        Pays
                      </Label>
                      <select
                        id="localisation.pays"
                        className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('localisation.pays')}
                      >
                        <option value="">Sélectionnez un pays</option>
                        {pays.map((p) => (
                          <option key={p.code} value={p.code}>
                            {p.nom}
                          </option>
                        ))}
                      </select>
                      {errors.localisation?.pays && (
                        <p className="text-red-500 text-sm mt-1">{errors.localisation.pays.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="localisation.ville" className="text-gray-300">
                        Ville
                      </Label>
                      <select
                        id="localisation.ville"
                        className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800/50 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        {...register('localisation.ville')}
                        disabled={!selectedPays}
                      >
                        <option value="">Sélectionnez une ville</option>
                        {villes.map((ville) => (
                          <option key={ville} value={ville}>
                            {ville}
                          </option>
                        ))}
                      </select>
                      {errors.localisation?.ville && (
                        <p className="text-red-500 text-sm mt-1">{errors.localisation.ville.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-gray-300">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Description de votre entreprise"
                      className="text-white border-gray-700 bg-gray-800/50 focus:border-blue-500 min-h-[100px]"
                      {...register('description')}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center mb-4">
                    <User className="w-5 h-5 mr-2 text-blue-500" />
                    <h2 className="text-lg font-semibold text-white">Informations de Contact</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="responsable.nom" className="text-gray-300">
                        Nom de la personne en charge
                      </Label>
                      <Input
                        id="responsable.nom"
                        placeholder="Nom complet"
                        className="text-white border-gray-700 bg-gray-800/50 focus:border-blue-500"
                        {...register('responsable.nom')}
                      />
                      {errors.responsable?.nom && (
                        <p className="text-red-500 text-sm mt-1">{errors.responsable.nom.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="fix" className="text-gray-300">
                        Téléphone Fixe
                      </Label>
                      <Input
                        id="fix"
                        placeholder="Numéro de téléphone fixe"
                        className="text-white border-gray-700 bg-gray-800/50 focus:border-blue-500"
                        {...register('fix')}
                      />
                      {errors.fix && (
                        <p className="text-red-500 text-sm mt-1">{errors.fix.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-gray-300">
                        Email de récupération
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@entreprise.com"
                        className="text-white border-gray-700 bg-gray-800/50 focus:border-blue-500"
                        {...register('email')}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="adresse" className="text-gray-300">
                        Adresse
                      </Label>
                      <Input
                        id="adresse"
                        placeholder="Adresse complète"
                        className="text-white border-gray-700 bg-gray-800/50 focus:border-blue-500"
                        {...register('adresse')}
                      />
                      {errors.adresse && (
                        <p className="text-red-500 text-sm mt-1">{errors.adresse.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="urlSite" className="text-gray-300">
                        Site Web
                      </Label>
                      <Input
                        id="urlSite"
                        type="url"
                        placeholder="https://www.votreentreprise.com"
                        className="text-white border-gray-700 bg-gray-800/50 focus:border-blue-500"
                        {...register('urlSite')}
                      />
                      {errors.urlSite && (
                        <p className="text-red-500 text-sm mt-1">{errors.urlSite.message}</p>
                      )}
                    </div>

                    {/* Nouveau champ : Numéro de récupération */}
                    <div>
                      <Label htmlFor="contact" className="text-gray-300">
                        Numéro de récupération
                      </Label>
                      <Input
                        id="contact"
                        placeholder="Numéro de récupération en cas de perte de compte"
                        className="text-white border-gray-700 bg-gray-800/50 focus:border-blue-500"
                        {...register('contact')}
                      />
                      {errors.contact && (
                        <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-md font-semibold text-white flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-blue-500" />
                      Réseaux Sociaux
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="reseaux_sociaux.linkedin" className="text-gray-300 flex items-center">
                          <Linkedin className="w-4 h-4 mr-1 text-blue-500" />
                          LinkedIn
                        </Label>
                        <Input
                          id="reseaux_sociaux.linkedin"
                          type="url"
                          placeholder="https://linkedin.com/company/..."
                          className="text-white border-gray-700 bg-gray-800/50 focus:border-blue-500"
                          {...register('reseaux_sociaux.linkedin')}
                        />
                        {errors.reseaux_sociaux?.linkedin && (
                          <p className="text-red-500 text-sm mt-1">{errors.reseaux_sociaux.linkedin.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="reseaux_sociaux.facebook" className="text-gray-300 flex items-center">
                          <Facebook className="w-4 h-4 mr-1 text-blue-500" />
                          Facebook
                        </Label>
                        <Input
                          id="reseaux_sociaux.facebook"
                          type="url"
                          placeholder="https://facebook.com/..."
                          className="text-white border-gray-700 bg-gray-800/50 focus:border-blue-500"
                          {...register('reseaux_sociaux.facebook')}
                        />
                        {errors.reseaux_sociaux?.facebook && (
                          <p className="text-red-500 text-sm mt-1">{errors.reseaux_sociaux.facebook.message}</p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="reseaux_sociaux.twitter" className="text-gray-300 flex items-center">
                          <Twitter className="w-4 h-4 mr-1 text-blue-500" />
                          Twitter
                        </Label>
                        <Input
                          id="reseaux_sociaux.twitter"
                          type="url"
                          placeholder="https://twitter.com/..."
                          className="text-white border-gray-700 bg-gray-800/50 focus:border-blue-500"
                          {...register('reseaux_sociaux.twitter')}
                        />
                        {errors.reseaux_sociaux?.twitter && (
                          <p className="text-red-500 text-sm mt-1">{errors.reseaux_sociaux.twitter.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="flex items-center mb-4">
                    <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
                    <h2 className="text-lg font-semibold text-white">Informations Légales</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="registre_commerce" className="text-gray-300 flex items-center">
                        <Briefcase className="w-4 h-4 mr-1 text-blue-500" />
                        Registre du Commerce
                      </Label>
                      <div className="flex flex-col items-center">
                        {registrePreview ? (
                          <div className="relative mb-4">
                            <img
                              src={registrePreview}
                              alt="Registre preview"
                              className="w-32 h-32 object-contain rounded-lg border-2 border-blue-500"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute -top-2 -right-2 h-6 w-6 p-0 bg-red-500 text-white rounded-full hover:bg-red-600"
                              onClick={removeRegistre}
                            >
                              ×
                            </Button>
                          </div>
                        ) : (
                          <div className="w-32 h-32 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center mb-4">
                            <Briefcase className="w-12 h-12 text-gray-500" />
                          </div>
                        )}
                        <Input
                          type="file"
                          id="registre_commerce"
                          className="hidden"
                          accept=".pdf"
                          onChange={handleRegistreChange}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="bg-transparent border-blue-500 text-blue-500 hover:bg-blue-500/10"
                          onClick={() => document.getElementById('registre_commerce')?.click()}
                        >
                          {registrePreview ? 'Changer le fichier' : 'Sélectionner un fichier'}
                        </Button>
                      </div>
                      {errors.registre_commerce && (
                        <p className="text-red-500 text-sm mt-1">{errors.registre_commerce.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="date_creation" className="text-gray-300 flex items-center">
                        <Calendar className="w-4 h-4 mr-1 text-blue-500" />
                        Date de Création
                      </Label>
                      <Input
                        id="date_creation"
                        type="date"
                        className="text-white border-gray-700 bg-gray-800/50 focus:border-blue-500"
                        {...register('date_creation')}
                      />
                      {errors.date_creation && (
                        <p className="text-red-500 text-sm mt-1">{errors.date_creation.message}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
                  onClick={handlePreviousStep}
                  disabled={isLoading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Précédent
                </Button>
              ) : (
                <div></div>
              )}

              {step < 3 ? (
                <Button
                  type="button"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={handleNextStep}
                >
                  Suivant
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  disabled={isLoading}
                >
                  {isLoading ? 'Chargement...' : 'Compléter le Profil'}
                </Button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}