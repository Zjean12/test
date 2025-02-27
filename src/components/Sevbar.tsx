import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Shield,
  AlertTriangle,
  Send,
  Trophy
} from "lucide-react";
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from "../components/ui/use-toast";



function SevBar() {
  const [isOpen, setIsOpen] = useState(true);
  const [, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    navigate('/hacker/register');
    toast({
      title: "Authentification requise",
      description: "Veuillez vous inscrire ou vous connecter en tant que hacker pour soumettre un rapport.😉",
      variant: "default",
    });
  };
  
  

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed right-0 top-1/2 -translate-y-1/2 flex items-center z-50`}>
      <button
        onClick={toggleSidebar}
        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white p-3 rounded-l-xl shadow-xl transition-all duration-300"
        aria-label={isOpen ? "Fermer la barre de sévérité" : "Ouvrir la barre"}
      >
        {isOpen ? (
          <ChevronRight size={22} className="transition-transform duration-300" />
        ) : (
          <ChevronLeft size={22} className="transition-transform duration-300" />
        )}
      </button>

      <div
        className={`bg-gray-900 shadow-2xl rounded-l-2xl transition-all duration-500 overflow-hidden ${
          isOpen ? "w-96 opacity-100" : "w-0 opacity-0"
        }`}
      >
        <div className="h-[500px] bg-gray-800 text-white rounded-lg m-4 flex flex-col border border-gray-700">
          <div className="p-6 space-y-8 flex-1 overflow-y-auto">
            <div className="flex items-center space-x-3 border-b border-gray-700 pb-4">
              <Shield className="text-cyan-400" size={26} />
              <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Bug Bounty Program
              </h2>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-cyan-400">
                À propos du programme
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Ce programme récompense les chercheurs en sécurité pour leurs
                rapports sur les vulnérabilités détectées. Nous valorisons la
                sécurité et la collaboration avec la communauté.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Trophy className="text-yellow-500" size={20} />
                <h3 className="text-lg font-semibold text-cyan-400">
                  Niveaux de Sévérité
                </h3>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 hover:border-red-400/30 transition-all">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="text-red-400" size={18} />
                    <span className="font-medium bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent">
                      Critique
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm mt-1">Jusqu'à 2.000.000 ₣</div>
                </div>
                
                <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 hover:border-orange-400/30 transition-all">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="text-orange-400" size={18} />
                    <span className="font-medium bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                      Élevé
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm mt-1">Jusqu'à 500.000 ₣</div>
                </div>

                <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 hover:border-yellow-400/30 transition-all">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="text-yellow-400" size={18} />
                    <span className="font-medium bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                      Moyen
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm mt-1">Jusqu'à 100.000 ₣</div>
                </div>

                <div className="bg-gray-900 p-3 rounded-lg border border-gray-700 hover:border-cyan-400/30 transition-all">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="text-cyan-400" size={18} />
                    <span className="font-medium bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                      Faible
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm mt-1">Jusqu'à 50.000 ₣</div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 mt-auto">
          <Button
              className="w-full md:w-auto bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium py-6 rounded-xl shadow-lg flex items-center justify-center gap-3 text-lg"
              size="lg"
              onClick={handleModalConfirm}
            >
              <Send className="h-5 w-5" />
              Soumettre un rapport
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SevBar;