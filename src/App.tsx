import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Programs from './pages/Programs';
import Hackers from './pages/Hackers';
import ForgotPassword from './pages/auth/motpass/ForgotPassword';
import Dashboard from './pages/Dashboard';
import AddProgram from './pages/AddProgram';
import EmailVerificationEn from './pages/auth/verifierMail/EmailVerificationEn';
import EmailVerificationHack from './pages/auth/verifierMail/EmailVerificationHacker';
import VerificationMagicLink from './pages/auth/MagicLink/VerificationMagicLinkEnt';
import HackerAuth from './pages/auth/loginHacker'; // Correction ici
import EntrepriseAuth from './pages/auth/loginEntreprise';
import CompanyProfile from './pages/auth/inscriptionComp';

const AppRouter = () => {
  const location = useLocation();

  // Liste des chemins où la Navbar ne doit pas apparaître
  const noNavbarPaths = [
    '/hacker/login',
    '/hacker/register',
    '/entreprise/login',
    '/entreprise/register',
    '/forgot-password',
    '/EmailVerification',
    '/verification/meth1',
    '/dashboard',
    '/InscriptionComp', // exemple pour la page de vérification par lien magique
  ];

  const shouldHideNavbar = noNavbarPaths.some(path => location.pathname.startsWith(path));

  return (
    <div className="min-h-screen bg-background">
      {/* Affiche la Navbar seulement si la route ne correspond pas à celles de formulaire */}
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/hackers" element={<Hackers />} />
        <Route path="/EmailVerificationEn" element={<EmailVerificationEn />} />
        <Route path="/EmailVerificationHack" element={<EmailVerificationHack />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/InscriptionComp" element={<CompanyProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-program" element={<AddProgram />} />
        <Route path="/verification/meth1/:token" element={<VerificationMagicLink />} />

        {/* Routes d'authentification des hackers */}
        <Route path="/hacker/*" element={<HackerAuth />} />
        <Route path="/entreprise/*" element={<EntrepriseAuth />} />
      </Routes>
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
