import { useEffect, useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Shield, CheckCircle, XCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "../../../components/ui/use-toast";
import axios from "axios";

const VerificationMagicLink = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [message, setMessage] = useState("Vérification en cours...");
  const [hasError, setHasError] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const didRequest = useRef(false);
  const role = localStorage.getItem("role");
  

  useEffect(() => {
    if (didRequest.current) return;
    didRequest.current = true;

    if (!token) {
      setMessage("❌ Token invalide ou manquant.");
      setHasError(true);
      toast({ variant: "destructive", title: "Erreur", description: "Token invalide ou expiré." });
      setTimeout(() => navigate("/#"), 2000);
      return;
    }

    const verifyMagicLink = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/mail/verify/${encodeURIComponent(token)}`);

        if (response.status === 200) {
          setMessage("✅ Lien vérifié avec succès !");
          setHasError(false);
          toast({ title: "Succès", description: "Redirection en cours..." });

          // Vérification et redirection en fonction du rôle
          if (role === "entreprise") {
            setTimeout(() => navigate("/entreprise/login"), 2000);
          } else if (role === "hacker") {
            setTimeout(() => navigate("/hacker/login"), 2000);
          } else {
            setTimeout(() => navigate("/#"), 2000); // Redirection par défaut
          }
        } else {
          throw new Error(response.data.message);
        }
        console.log(role)
      } catch (error) {
        console.error("Erreur lors de la vérification :", error);
        setMessage("❌ Lien invalide ou expiré.");
        setHasError(true);
        toast({ variant: "destructive", title: "Erreur", description: "Lien invalide ou expiré." });
        setTimeout(() => navigate("/#"), 2000);
      }
    };

    verifyMagicLink();
  }, [token, navigate, role, API_BASE_URL, toast]);

  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-md mx-auto p-6 mt-8">
        <motion.div
          className="bg-white rounded-lg shadow-xl p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Shield className="w-16 h-16 mx-auto text-primary mb-6" />
          <h1 className={`text-2xl font-bold mb-4 ${hasError ? 'text-red-600' : 'text-green-600'}`}>{message}</h1>
          <div className={`w-16 h-16 mx-auto ${hasError ? 'text-red-600' : 'text-green-500'}`}>
            {hasError ? <XCircle className="w-full h-full" /> : <CheckCircle className="w-full h-full" />}
          </div>
          <p className="text-sm text-gray-500 mt-4">Vous serez redirigé automatiquement.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default VerificationMagicLink;
