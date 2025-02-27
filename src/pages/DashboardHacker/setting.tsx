import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '../../components/ui/avatar';
import Header from './HeaderHack';
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
import { useSearchParams } from 'react-router-dom';

const predefinedAvatars = [
  'https://api.dicebear.com/9.x/identicon/svg?seed=Amaya',
  'https://api.dicebear.com/9.x/identicon/svg?seed=Mackenzie',
  'https://api.dicebear.com/9.x/identicon/svg?seed=Luis',
  'https://api.dicebear.com/9.x/identicon/svg?seed=Ryker',
  'https://api.dicebear.com/9.x/identicon/svg?seed=Mason',
];

export default function Settings() {
  const [avatar, setAvatar] = useState(() => {
    const savedAvatar = localStorage.getItem('avatar');
    return savedAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=1';
  });
  const [showAvatarSelector, setShowAvatarSelector] = useState(false);
  const [recoveryCodesRemaining, setRecoveryCodesRemaining] = useState(5);
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'profile';

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newAvatar = reader.result as string;
        setAvatar(newAvatar);
        localStorage.setItem('avatar', newAvatar);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelection = (avatarUrl: string) => {
    setAvatar(avatarUrl);
    localStorage.setItem('avatar', avatarUrl);
  };

  const generateRecoveryCodes = () => {
    if (recoveryCodesRemaining > 0) {
      setRecoveryCodesRemaining(prev => prev - 1);
      alert('Les codes de récupération ont été générés et envoyés à votre email');
    }
  };

  const requestAccountDeletion = () => {
    window.location.href = 'mailto:admin@bughunter.com?subject=Demande%20de%20suppression%20de%20compte';
  };

  return (
    <div className="min-h-screen bg-[#141d2b] text-gray-100">
      <Header avatar={avatar} />
      <div className="max-w-4xl mx-auto px-4 p-14">
        <div className="bg-[#1a2332] rounded-lg shadow-xl p-6 border border-[#2a3655]">
          <h1 className="text-2xl font-bold mb-6 text-gray-100">Paramètres du compte</h1>

          <Tabs defaultValue={tab} className="text-gray-100">
            <TabsList className="mb-6 bg-[#2a3655]">
              <TabsTrigger value="profile" className="data-[state=active]:bg-[#374873] data-[state=active]:text-gray-100">
                Profil
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-[#374873] data-[state=active]:text-gray-100">
                Sécurité
              </TabsTrigger>
              <TabsTrigger value="social" className="data-[state=active]:bg-[#374873] data-[state=active]:text-gray-100">
                Liens sociaux
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="space-y-6">
                <div className="flex items-start gap-6">
                  <div>
                    <Avatar className="h-24 w-24 border-2 border-[#9fef00]">
                      <AvatarImage src={avatar} />
                      <AvatarFallback className="bg-[#2a3655]">
                        <User className="h-12 w-12 text-gray-400" />
                      </AvatarFallback>
                    </Avatar>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Button 
                        variant="outline" 
                        onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                        className="bg-[#2a3655] text-gray-100 border-[#374873] hover:bg-[#374873] hover:text-gray-100"
                      >
                        Choisir parmi les préréglages
                      </Button>
                      <span className="mx-2 text-gray-400">ou</span>
                      <Button 
                        variant="outline" 
                        className="relative bg-[#2a3655] text-gray-100 border-[#374873] hover:bg-[#374873] hover:text-gray-100"
                      >
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
                            className="h-12 w-12 cursor-pointer hover:ring-2 hover:ring-[#9fef00] border border-[#2a3655]"
                            onClick={() => handleAvatarSelection(avatarUrl)}
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
                    <label className="block text-sm font-medium mb-2 text-gray-300">Pseudo</label>
                    <Input 
                      type="text" 
                      placeholder="Pseudo" 
                      className="bg-[#2a3655] border-[#374873] text-gray-100 placeholder-gray-500 focus:border-[#9fef00] focus:ring-[#9fef00]"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="bg-[#2a3655] border-[#374873] text-gray-100 placeholder-gray-500 focus:border-[#9fef00] focus:ring-[#9fef00]"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-100">Mot de passe</h3>
                  <div className="space-y-4">
                    <Input 
                      type="password" 
                      placeholder="Mot de passe actuel" 
                      className="bg-[#2a3655] border-[#374873] text-gray-100 placeholder-gray-500 focus:border-[#9fef00] focus:ring-[#9fef00]"
                    />
                    <Input 
                      type="password" 
                      placeholder="Nouveau mot de passe" 
                      className="bg-[#2a3655] border-[#374873] text-gray-100 placeholder-gray-500 focus:border-[#9fef00] focus:ring-[#9fef00]"
                    />
                    <Input 
                      type="password" 
                      placeholder="Confirmer le nouveau mot de passe" 
                      className="bg-[#2a3655] border-[#374873] text-gray-100 placeholder-gray-500 focus:border-[#9fef00] focus:ring-[#9fef00]"
                    />
                    <Button className="bg-[#9fef00] hover:bg-[#8bdf00] text-black border-none">
                      Mettre à jour le mot de passe
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-100">Codes de récupération</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Vous pouvez générer jusqu'à 5 codes de récupération. 
                    Restants : {recoveryCodesRemaining}
                  </p>
                  <Button 
                    onClick={generateRecoveryCodes}
                    disabled={recoveryCodesRemaining === 0}
                    className="bg-[#2a3655] hover:bg-[#374873] text-gray-100 border-none disabled:bg-gray-700"
                  >
                    <Key className="mr-2 h-4 w-4" />
                    Générer les codes de récupération
                  </Button>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-100">Statut du compte</h3>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline"
                      className="bg-[#2a3655] text-gray-100 border-[#374873] hover:bg-[#374873]"
                    >
                      Désactiver le compte
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={requestAccountDeletion}
                      className="bg-red-600 hover:bg-red-700 text-white"
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
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    <Globe className="inline-block mr-2 h-4 w-4" />
                    Site web
                  </label>
                  <Input 
                    type="url" 
                    placeholder="https://votre-site.com" 
                    className="bg-[#2a3655] border-[#374873] text-gray-100 placeholder-gray-500 focus:border-[#9fef00] focus:ring-[#9fef00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    <Github className="inline-block mr-2 h-4 w-4" />
                    GitHub
                  </label>
                  <Input 
                    type="url" 
                    placeholder="https://github.com/username" 
                    className="bg-[#2a3655] border-[#374873] text-gray-100 placeholder-gray-500 focus:border-[#9fef00] focus:ring-[#9fef00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    <Linkedin className="inline-block mr-2 h-4 w-4" />
                    LinkedIn
                  </label>
                  <Input 
                    type="url" 
                    placeholder="https://linkedin.com/in/username" 
                    className="bg-[#2a3655] border-[#374873] text-gray-100 placeholder-gray-500 focus:border-[#9fef00] focus:ring-[#9fef00]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-300">
                    <Facebook className="inline-block mr-2 h-4 w-4" />
                    Facebook
                  </label>
                  <Input 
                    type="url" 
                    placeholder="https://facebook.com/username" 
                    className="bg-[#2a3655] border-[#374873] text-gray-100 placeholder-gray-500 focus:border-[#9fef00] focus:ring-[#9fef00]"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 pt-6 border-t border-[#2a3655] flex justify-end gap-4">
            <Button 
              variant="outline"
              className="bg-[#2a3655] text-gray-100 border-[#374873] hover:bg-[#374873]"
            >
              Annuler
            </Button>
            <Button className="bg-[#9fef00] hover:bg-[#8bdf00] text-black border-none">
              Enregistrer les modifications
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}