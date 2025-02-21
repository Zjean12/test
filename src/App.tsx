import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Toaster } from './components/ui/toaster';

import Home from './pages/Home';
import Programs from './pages/Programs';
import Hackers from './pages/Hackers';
import ForgotPassword from './pages/auth/motpass/ForgotPassword';
import Dashboard from './pages/DashboardEntre/Dashboard';
import AddProgram from './pages/DashboardEntre/AddProgram';
import EmailVerificationEn from './pages/auth/verifierMail/EmailVerificationEn';
import EmailVerificationHack from './pages/auth/verifierMail/EmailVerificationHacker';
import VerificationMagicLink from './pages/auth/MagicLink/VerificationMagicLinkEnt';
import HackerAuth from './pages/auth/loginHacker'; // Correction ici
import EntrepriseAuth from './pages/auth/loginEntreprise';
import CompanyProfile from './pages/auth/inscriptionComp';
import ProgramDetail from './pages/programDetail';
import HackerDashboard from './pages/DashboardHacker/Dashboard';
import Settings from './pages/DashboardHacker/setting';
import Earnings from './pages/DashboardHacker/Rapports';
import Reports from './pages/DashboardHacker/gains';

const AppRouter = () => {
 
  return (
    <div className="min-h-screen bg-background">
      {/* Affiche la Navbar seulement si la route ne correspond pas à celles de formulaire */}
      {}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:id" element={<ProgramDetail />} />
        <Route path="/hackers" element={<Hackers />} />
        <Route path="/EmailVerificationEn" element={<EmailVerificationEn />} />
        <Route path="/EmailVerificationHack" element={<EmailVerificationHack />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/InscriptionComp" element={<CompanyProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-program" element={<AddProgram />} />
        <Route path="/verification/meth1/:token" element={<VerificationMagicLink />} />
        <Route path='/HackerDashboard' element={<HackerDashboard />}/>
        <Route path="/hacker/settings" element={<Settings />} />
        <Route path="/hacker/Rapports" element={<Earnings />} />
        <Route path="/hacker/gains" element={<Reports />} />

      


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
