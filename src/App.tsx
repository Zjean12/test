import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster'; // Pour afficher les notifications

import Home from './pages/Home';
import Programs from './pages/Programs';
import Hackers from './pages/Hackers';
import ForgotPassword from './pages/auth/motpass/ForgotPassword';
import Dashboard from './pages/DashboardEntre/Dashboard';
import EmailVerificationEn from './pages/auth/verifierMail/EmailVerificationEn';
import EmailVerificationHack from './pages/auth/verifierMail/EmailVerificationHacker';
import VerificationMagicLink from './pages/auth/MagicLink/VerificationMagicLinkEnt';
import HackerAuth from './pages/auth/loginHacker';
import EntrepriseAuth from './pages/auth/loginEntreprise';
import CompanyProfile from './pages/auth/inscriptionComp';
import ProgramDetail from './pages/programDetail';
import ProgramDetailHacker from './pages/DashboardHacker/programDetailhacker'; // Corrigé le nom de l'import
import HackerDashboard from './pages/DashboardHacker/Dashboard';
import Settings from './pages/DashboardHacker/setting';
import Earnings from './pages/DashboardHacker/gains';
import Reports from './pages/DashboardHacker/Rapports';
import ReportDetails from './pages/DashboardHacker/reports/ReportDetails';
import EntrepriseSettings from './pages/DashboardEntre/setting';

import { AvatarProvider } from './components/ui/AvatarContext'; // Importer le provider Avatar


const AppRouter = () => {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        {/* Routes d'authentification des hackers */}
        <Route path="/hacker/*" element={<HackerAuth />} />
        <Route path="/entreprise/*" element={<EntrepriseAuth />} />

        {/* Routes publiques */}
        <Route path="/" element={<Home />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:id" element={<ProgramDetail />} />
        <Route path="/hackers" element={<Hackers />} />
        <Route path="/EmailVerificationEn" element={<EmailVerificationEn />} />
        <Route path="/EmailVerificationHack" element={<EmailVerificationHack />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/InscriptionComp" element={<CompanyProfile />} />

        <Route path="/verification/meth1/:token" element={<VerificationMagicLink />} />


        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/settings" element={<EntrepriseSettings />} />


        {/* Routes protégées pour le tableau de bord hacker */}
        <Route  >
          <Route path="/HackerDashboard" element={<HackerDashboard />} />
          <Route path="/hacker/settings" element={<Settings />} />
          <Route path="/hacker/Rapports" element={<Reports />} />
          <Route path="/hacker/gains" element={<Earnings />} />
          <Route path="/programDetailhacker/:id" element={<ProgramDetailHacker />} />
          <Route path="/reports/:id" element={<ReportDetails />} />
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AvatarProvider>
        <AppRouter />
      </AvatarProvider>
    </Router>
  );
}

export default App;
