import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Bug, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../../components/ui/use-toast';
import { InteractiveBackground } from '../../components/InteractiveBackground';
import axios from 'axios';

export default function HackerAuth() {
  return (
    <Routes>
      <Route path="login" element={<LoginForm />} />
      <Route path="register" element={<RegisterForm />} />
    </Routes>
    
  );
  
}

const role = "hacker";


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
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        email: data.email,
        pseudo: data.pseudo,
        password: data.password,
        role,
      });
  
      if (response.status !== 200) throw new Error("Échec de l'inscription");
  
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <InputField
            id="pseudo"
            type="text"
            register={register}
            required
            placeholder='Pseudo'
            error={errors.pseudo}
            validation={{
              required: "Le pseudo est requis.",
              
              minLength: {
                value: 3,
                message: "Le pseudo doit contenir au moins 3 caractères.",
                
              },
              
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <InputField
            id="email"
            type="email"
            register={register}
            required
            placeholder="Email"  
            error={errors.email}
            validation={{
              required: 'L\'email est requis.',
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: 'L\'email est invalide. Il doit contenir un "@".',
              },
            }}
          />

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <InputField placeholder="Mot de passe" id="password" type="password" register={register} required />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <InputField placeholder="Confirmer le mot de passe" id="confirmPassword" type="password" register={register} required />
        </motion.div>

        {confirmPassword && confirmPassword !== password && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm"
          >
            Les mots de passe ne correspondent pas
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <PasswordRequirements password={password} requirements={passwordRequirements} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="space-y-4"
        >
          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300" disabled={isLoading}>
            {isLoading ? 'Chargement...' : "S'inscrire"}
          </Button>

          <Button type="button" className="w-full" variant="link" onClick={() => navigate('/hacker/login')}>
            Déjà un compte ? Se connecter
          </Button>
        </motion.div>
      </form>
    </AuthContainer>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const login = async (data: any) => {
    setIsLoading(true);
  
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        email: data.email,
        password: data.password,
        role,
      }, {
        withCredentials: true, // Pour inclure les cookies
      });
  
      if (response.status !== 200) throw new Error("Identifiants incorrects");
  
      toast({ title: "Connexion réussie", description: "Bienvenue !" });
      const { token } = response.data;
      localStorage.setItem('authToken', token);
  
      navigate("/HackerDashboard");
    } catch (error) {
      toast({ variant: "destructive", title: "Échec", description: "Identifiants incorrects." });
    } finally {
      setIsLoading(false);
    }
  };

  const onLoginSubmit = (data: any) => {
    login(data);
  };
  

  return (
    
    <AuthContainer title="Connexion Hacker">
      
      <form onSubmit={handleSubmit(onLoginSubmit)} className="space-y-6">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <InputField placeholder="Email" id="email" type="email" register={register} required />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <InputField placeholder="Mot de passe" id="password" type="password" register={register} required />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="text-left">
            <Button
              type="button"
              className="p-0 text-sm text-blue-600 hover:text-blue-800 transition-colors duration-300"
              variant="link"
              onClick={() => navigate('/forgot-password')}
            >
              Mot de passe oublié ?
            </Button>
          </div>

          <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300" disabled={isLoading}>
            {isLoading ? 'Chargement...' : 'Se connecter'}
          </Button>

          <Button type="button" className="w-full" variant="link" onClick={() => navigate('/hacker/register')}>
            Pas de compte ? Créer un compte
          </Button>
        </motion.div>
      </form>
    </AuthContainer>
  );
}

function AuthContainer({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <InteractiveBackground />
      <div className="max-w-md w-full space-y-8">
        <motion.div 
          className="bg-white/10  backdrop-blur-lg rounded-xl shadow-2xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              <Bug className="w-12 h-12 mx-auto text-blue-600 mb-4" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title}
            </h1>
          </motion.div>
          {children}
        </motion.div>
      </div>
    </div>
  );
}

function InputField({ label, id, type, register, required, error, validation, placeholder }: any) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="">{label}</Label>
      <Input
        id={id}
        type={type}
        {...register(id, { required, ...validation })}
        placeholder={placeholder}  
        className=" text-white w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 custom-placeholder"
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-500 text-sm"
        >
          {error.message || `${label} requis`}
        </motion.p>
      )}
    </div>
  );
}


function PasswordRequirements({ password, requirements }: any) {
  return (
    <div className="space-y-2">
      
      {requirements.map((req: any, index: number) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-center text-sm"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={req.regex.test(password) ? 'check' : 'x'}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              {req.regex.test(password) ? (
                <Check className="w-4 h-4 text-green-500 mr-2" />
              ) : (
                <X className="w-4 h-4 text-gray-300 mr-2" />
              )}
            </motion.div>
          </AnimatePresence>
          <span className={req.regex.test(password) ? 'text-green-500' : 'text-gray-500'}>
            {req.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

