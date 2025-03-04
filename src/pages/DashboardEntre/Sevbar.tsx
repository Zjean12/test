import { Home, FileText, Users, Settings } from "lucide-react";

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-gray-800 border-r border-gray-700 shadow-lg">
      <div className="flex items-center p-6 border-b border-gray-700">
        <div className="w-8 h-8 text-primary mr-2" />
        <span className="text-xl font-bold text-white">Tableau de Bord</span>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <button 
              className={`w-full flex items-center px-4 py-2 text-left rounded-md ${currentView === 'dashboard' ? 'bg-primary-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setCurrentView('dashboard')}
            >
              <Home className="mr-2 h-4 w-4" />
              Tableau de bord
            </button>
          </li>
          <li>
            <button 
              className={`w-full flex items-center px-4 py-2 text-left rounded-md ${currentView === 'programs' ? 'bg-primary-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setCurrentView('programs')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Programmes
            </button>
          </li>
          <li>
            <button 
              className={`w-full flex items-center px-4 py-2 text-left rounded-md ${currentView === 'hackers' ? 'bg-primary-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setCurrentView('hackers')}
            >
              <Users className="mr-2 h-4 w-4" />
              Hackers
            </button>
          </li>
          <li>
            <button 
              className={`w-full flex items-center px-4 py-2 text-left rounded-md ${currentView === 'settings' ? 'bg-primary-600 text-white' : 'hover:bg-gray-700 text-gray-300'}`}
              onClick={() => setCurrentView('settings')}
            >
              <Settings className="mr-2 h-4 w-4" />
              Paramètres
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
