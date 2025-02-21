import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Shield, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../../../components/ui/use-toast';

export default function EmailVerificationEn() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  

  // Initialiser le countdown à partir de localStorage ou 600 (10 minutes par défaut)
  const [countdown, setCountdown] = useState(() => {
    const savedCountdown = localStorage.getItem('countdown');
    return savedCountdown ? parseInt(savedCountdown, 10) : 600;
  });

  const [canResend, setCanResend] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const email = location.state?.email;
  const role = "entreprise";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Sauvegarde le rôle dans localStorage si trouvé dans location.state
  useEffect(() => {
    if (role) {
      localStorage.setItem('role', role);
    }
  }, [role]);

  useEffect(() => {
    if (!email) {
      navigate('/entreprise/login');
      return;
    }

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prevCountdown) => {
          const newCountdown = prevCountdown - 1;
          localStorage.setItem('countdown', newCountdown.toString());
          return newCountdown;
        });
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown, email]);

  console.log("Le rôle est :", role);

  const handleResendEmail = async () => {
    if (attempts >= 3 || isLocked) {
      toast({ variant: "destructive", title: "Trop de tentatives", description: "Réessayez dans 15 minutes." });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/mail/resend-magic-link`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role })
      });

      if (response.status === 403) {
        setIsLocked(true);
        toast({ variant: "destructive", title: "Trop de tentatives", description: "Réessayez dans 15 minutes." });
        return;
      }

      if (response.ok) {
        setCountdown(600);
        setCanResend(false);
        localStorage.setItem('countdown', '600');
        setAttempts((prevAttempts) => prevAttempts + 1);
        toast({ title: "Email envoyé", description: "Veuillez vérifier votre boîte mail." });
      } else {
        toast({ variant: "destructive", title: "Erreur", description: "Impossible d'envoyer l'email." });
      }
    } catch (error) {
      console.error('Erreur lors de l’envoi de l’email:', error);
      toast({ variant: "destructive", title: "Erreur", description: "Impossible d'envoyer l'email." });
    }
  };

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
          <h1 className="text-2xl font-bold mb-4">Vérifiez votre email</h1>
          <p className="text-gray-600 mb-6">
            Un email de vérification a été envoyé à :<br />
            <span className="font-semibold">{email}</span>
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-8">
            <Mail className="w-4 h-4" />
            <span>Vérifiez votre boîte mail</span>
          </div>

          <Button
            onClick={handleResendEmail}
            disabled={!canResend || isLocked}
            className={`w-full mb-4 ${isLocked ? 'bg-red-600' : ''}`}
          >
            {canResend && !isLocked ? (
              <>
                Renvoyer l'email
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            ) : isLocked ? (
              'Trop de tentatives. Réessayez dans 15 minutes.'
            ) : (
              `Renvoyer disponible dans ${Math.floor(countdown / 60)}min${countdown % 60 < 10 ? '0' + (countdown % 60) : countdown % 60}s`
            )}
          </Button>

          <p className="text-sm text-gray-500">
            Après vérification, vous serez redirigé vers la connexion.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
