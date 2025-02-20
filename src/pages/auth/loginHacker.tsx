import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Bug, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '../../components/ui/use-toast';

export default function HackerAuth() {
  return (
    <Routes>
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegisterForm />} />
    </Routes>
  );
}


// ----------------------
// FORMULAIRE D'INSCRIPTION
// ----------------------
function RegisterForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');
  const role = "hacker";

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const passwordRequirements = [
    { label: 'Au moins 8 caractères', regex: /.{8,}/ },
    { label: 'Une majuscule', regex: /[A-Z]/ },
    { label: 'Une minuscule', regex: /[a-z]/ },
    { label: 'Un chiffre', regex: /[0-9]/ },
    { label: 'Un caractère spécial', regex: /[^A-Za-z0-9]/ },
  ];

  const onRegisterSubmit = async (data: any) => {
    if (data.password !== confirmPassword) {
      toast({ variant: 'destructive', title: 'Erreur', description: 'Les mots de passe ne correspondent pas.' });
      return;
    }
  
    setIsLoading(true);
  
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password, role }),
      });
  
      if (!response.ok) throw new Error('Échec de l’inscription');
  
      toast({ title: "Inscription réussie", description: "Veuillez vérifier votre email" });
  
      navigate('/EmailVerificationHack', { state: { email: data.email } });
    } catch (error) {
      toast({ variant: "destructive", title: "Erreur", description: "Veuillez vérifier votre email. Le lien expirera dans 24 heures.." });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContainer title="Inscription Hacker">
      <form onSubmit={handleSubmit(onRegisterSubmit)} className="space-y-6">
        <InputField
          label="Email"
          id="email"
          type="email"
          register={register}
          required
          error={errors.email}
          validation={{
            required: 'L\'email est requis.',
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: 'L\'email est invalide. Il doit contenir un "@".',
            },
          }}
        />
        <InputField label="Mot de passe" id="password" type="password" register={register} required />
        <InputField label="Confirmer le mot de passe" id="confirmPassword" type="password" register={register} required />
  
        {confirmPassword && confirmPassword !== password && (
          <p className="text-red-500 text-sm">Les mots de passe ne correspondent pas</p>
        )}
  
        <PasswordRequirements password={password} requirements={passwordRequirements} />
  
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Chargement...' : "S'inscrire"}
        </Button>
  
        <Button type="button" className="w-full" variant="link" onClick={() => navigate('/hacker/login')}>
          Déjà un compte ? Se connecter
        </Button>
      </form>
    </AuthContainer>
  );
}  

// ----------------------
// FORMULAIRE DE CONNEXION
// ----------------------
function LoginForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm();
  const role = "hacker";
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const onLoginSubmit = async (data: any) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password, role }),
      });

      if (!response.ok) throw new Error('Identifiants incorrects');

      toast({ title: "Connexion réussie", description: "Bienvenue !" });
      navigate('/#');
    } catch (error) {
      toast({ variant: "destructive", title: "Echec", description: "Ce compte est enregistré en tant que 'entreprise'." });
    } finally {
      setIsLoading(false);
    }
  };
  console.log(role)

  return (
    <AuthContainer title="Connexion Hacker">
      <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-6">
        <InputField label="Email" id="email" type="email" register={register} required />
        <InputField label="Mot de passe" id="password" type="password" register={register} required />

        <div className=" justify-between items-center">
          {/* Lien "Mot de passe oublié" aligné à gauche */}
          <div className="text-left">
            <Button
              type="button"
              className="p-0 text-sm"
              variant="link"
              onClick={() => navigate('/forgot-password')}
            >
              Mot de passe oublié ?
            </Button>
          </div>

          {/* Bouton "Se connecter" à droite */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Chargement...' : 'Se connecter'}
          </Button>
        </div>

        <Button type="button" className="w-full" variant="link" onClick={() => navigate('/hacker/register')}>
          Pas de compte ? Créer un compte
        </Button>
      </form>
    </AuthContainer>

  );
}

// ----------------------
// COMPOSANTS RÉUTILISABLES
// ----------------------
function AuthContainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <div className="max-w-md mx-auto p-6 mt-8">
        <motion.div
          className="bg-white rounded-lg shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <Bug className="w-12 h-12 mx-auto text-primary mb-4" />
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

function InputField({ label, id, type, register, required, error }: any) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} {...register(id, { required })} />
      {error && <p className="text-red-500 text-sm">{label} requis</p>}
    </div>
  );
}

function PasswordRequirements({ password, requirements }: any) {
  return (
    <div className="space-y-2">
      {requirements.map((req: any, index: number) => (
        <div key={index} className="flex items-center text-sm">
          {req.regex.test(password) ? <Check className="w-4 h-4 text-green-500 mr-2" /> : <X className="w-4 h-4 text-gray-300 mr-2" />}
          <span className={req.regex.test(password) ? 'text-green-500' : 'text-gray-500'}>{req.label}</span>
        </div>
      ))}
    </div>
  );
}
