import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import Header from './HeaderHack'; // Assure-toi d'importer le Header ici
import { 
  User, 
  Key, 
  Github, 
  Linkedin, 
  Facebook, 
  Globe, 
  Upload,
  AlertTriangle
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom'; // Ajouter l'import pour la gestion des paramètres URL

// Options d'avatars prédéfinis
const predefinedAvatars = [
  'https://api.dicebear.com/9.x/identicon/svg?seed=Amaya',
  'https://api.dicebear.com/9.x/identicon/svg?seed=Mackenzie',
  'https://api.dicebear.com/9.x/identicon/svg?seed=Luis',
  'https://api.dicebear.com/9.x/identicon/svg?seed=Ryker',
  'https://api.dicebear.com/9.x/identicon/svg?seed=Mason',
];

export default function Settings() {
  const [avatar, setAvatar] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=1');
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [recoveryCodesRemaining, setRecoveryCodesRemaining] = useState(5);
  const [searchParams] = useSearchParams();  // Utiliser les paramètres de recherche dans l'URL
  const tab = searchParams.get('tab') || 'profile';  // Par défaut, l'onglet "profile"

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateRecoveryCodes = () => {
    if (recoveryCodesRemaining > 0) {
      setRecoveryCodesRemaining(prev => prev - 1);
      // Dans une application réelle, cela génèrerait des codes de récupération réels
      alert('Les codes de récupération ont été générés et envoyés à votre email');
    }
  };

  const requestAccountDeletion = () => {
    window.location.href = 'mailto:admin@bughunter.com?subject=Demande%20de%20suppression%20de%20compte';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* En-tête */}
      <Header />
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Paramètres du compte</h1>

          <Tabs defaultValue={tab}>
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Profil</TabsTrigger>
              <TabsTrigger value="security">Sécurité</TabsTrigger>
              <TabsTrigger value="social">Liens sociaux</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div>
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={avatar} />
                      <AvatarFallback>
                        <User className="h-12 w-12" />
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                      >
                        Choisir parmi les préréglages
                      </Button>
                      <span className="mx-2">ou</span>
                      <Button variant="outline" className="relative">
                        <input
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                          onChange={handleFileUpload}
                        />
                        <Upload className="mr-2 h-4 w-4" />
                        Télécharger une image
                      </Button>
                    </div>

                    {showAvatarSelector && (
                      <div className="flex gap-4 mt-4">
                        {predefinedAvatars.map((avatarUrl, index) => (
                          <Avatar 
                            key={index}
                            className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-primary"
                            onClick={() => setAvatar(avatarUrl)}
                          >
                            <AvatarImage src={avatarUrl} />
                          </Avatar>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom complet</label>
                    <Input type="text" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="john@example.com" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Mot de passe</h3>
                  <div className="space-y-4">
                    <Input type="password" placeholder="Mot de passe actuel" />
                    <Input type="password" placeholder="Nouveau mot de passe" />
                    <Input type="password" placeholder="Confirmer le nouveau mot de passe" />
                    <Button>Mettre à jour le mot de passe</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Codes de récupération</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Vous pouvez générer jusqu'à 5 codes de récupération. 
                    Restants : {recoveryCodesRemaining}
                  </p>
                  <Button 
                    onClick={generateRecoveryCodes}
                    disabled={recoveryCodesRemaining === 0}
                  >
                    <Key className="mr-2 h-4 w-4" />
                    Générer les codes de récupération
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Statut du compte</h3>
                  <div className="flex items-center gap-4">
                    <Button variant="outline">Désactiver le compte</Button>
                    <Button 
                      variant="destructive" 
                      onClick={requestAccountDeletion}
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Demander la suppression du compte
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="social">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Globe className="inline-block mr-2 h-4 w-4" />
                    Site web
                  </label>
                  <Input type="url" placeholder="https://votre-site.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Github className="inline-block mr-2 h-4 w-4" />
                    GitHub
                  </label>
                  <Input type="url" placeholder="https://github.com/username" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Linkedin className="inline-block mr-2 h-4 w-4" />
                    LinkedIn
                  </label>
                  <Input type="url" placeholder="https://linkedin.com/in/username" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    <Facebook className="inline-block mr-2 h-4 w-4" />
                    Facebook
                  </label>
                  <Input type="url" placeholder="https://facebook.com/username" />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-6 border-t flex justify-end gap-4">
            <Button variant="outline">Annuler</Button>
            <Button>Enregistrer les modifications</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
