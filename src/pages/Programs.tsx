import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Flag, Users, Bug, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/footer';

const PRICE_RANGES = [
  { label: 'All', min: 0, max: Infinity },
  { label: '50k-500k', min: 50000, max: 500000 },
  { label: '500k-2M', min: 500000, max: 2000000 },
  { label: '2M+', min: 2000000, max: Infinity }
];

const mockPrograms = [
  {
    id: 1,
    title: "CyberSentinel",
    description: "Accès à des missions de sécurité variées",
    organization: "Safe harbor",
    isDemo: true,
    recent: true,
    stats: {
      reports: 12,
      participants: 50,
      bugs: 5,
      rewardMin: "100.000",
      rewardMax: "1.000.000"
    },
    status: "nouveau",
    icon: "🛡️",
    scope: ["JavaScript", "Python"]
  },
  {
    id: 2,
    title: "ShadowSec",
    description: "Audits de sécurité complets",
    organization: "Safe harbor",
    isDemo: true,
    recent: false,
    stats: {
      reports: 8,
      participants: 30,
      bugs: 2,
      rewardMin: "25.000",
      rewardMax: "50.000"
    },
    status: "fermé",
    icon: "☕",
    scope: ["Python"]
  },
  {
    id: 3,
    title: "BugHunter",
    description: "Mise à jour de l'audit de sécurité",
    organization: "ShadowSec",
    isDemo: false,
    recent: true,
    stats: {
      reports: 15,
      participants: 70,
      bugs: 3,
      rewardMin: "100.000",
      rewardMax: "150.000"
    },
    status: "mise à jour",
    icon: "🐞",
    scope: ["C", "Java"]
  },
  {
    id: 2,
    title: "ShadowSec",
    description: "Audits de sécurité complets",
    organization: "Safe harbor",
    isDemo: true,
    recent: false,
    stats: {
      reports: 8,
      participants: 30,
      bugs: 2,
      rewardMin: "25.000",
      rewardMax: "50.000"
    },
    status: "fermé",
    icon: "☕",
    scope: ["Python"]
  },
  {
    id: 2,
    title: "ShadowSec",
    description: "Audits de sécurité complets",
    organization: "Safe harbor",
    isDemo: true,
    recent: false,
    stats: {
      reports: 8,
      participants: 30,
      bugs: 2,
      rewardMin: "25.000",
      rewardMax: "50.000"
    },
    status: "fermé",
    icon: "☕",
    scope: ["Python"]
  },
  {
    id: 2,
    title: "ShadowSec",
    description: "Audits de sécurité complets",
    organization: "Safe harbor",
    isDemo: true,
    recent: false,
    stats: {
      reports: 8,
      participants: 30,
      bugs: 2,
      rewardMin: "25.000",
      rewardMax: "50.000"
    },
    status: "fermé",
    icon: "☕",
    scope: ["Python"]
  },
  {
    id: 2,
    title: "ShadowSec",
    description: "Audits de sécurité complets",
    organization: "Safe harbor",
    isDemo: true,
    recent: false,
    stats: {
      reports: 8,
      participants: 30,
      bugs: 2,
      rewardMin: "25.000",
      rewardMax: "50.000"
    },
    status: "fermé",
    icon: "☕",
    scope: ["Python"]
  },
  {
    id: 2,
    title: "ShadowSec",
    description: "Audits de sécurité complets",
    organization: "Safe harbor",
    isDemo: true,
    recent: false,
    stats: {
      reports: 8,
      participants: 30,
      bugs: 2,
      rewardMin: "25.000",
      rewardMax: "50.000"
    },
    status: "fermé",
    icon: "☕",
    scope: ["Python"]
  },
  {
    id: 2,
    title: "ShadowSec",
    description: "Audits de sécurité complets",
    organization: "Safe harbor",
    isDemo: true,
    recent: false,
    stats: {
      reports: 8,
      participants: 30,
      bugs: 2,
      rewardMin: "25.000",
      rewardMax: "50.000"
    },
    status: "fermé",
    icon: "☕",
    scope: ["Python"]
  },
  {
    id: 2,
    title: "ShadowSec",
    description: "Audits de sécurité complets",
    organization: "Safe harbor",
    isDemo: true,
    recent: false,
    stats: {
      reports: 8,
      participants: 30,
      bugs: 2,
      rewardMin: "25.000",
      rewardMax: "50.000"
    },
    status: "fermé",
    icon: "☕",
    scope: ["Python"]
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedScope, setSelectedScope] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(PRICE_RANGES[0]);
  const [filter, setFilter] = useState('all');

  const allScopes = Array.from(new Set(mockPrograms.flatMap(p => p.scope)));

  const filteredPrograms = mockPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.scope.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesScope = selectedScope.length === 0 ||
                        program.scope.some(s => selectedScope.includes(s));
    
    const rewardMax = parseInt(program.stats.rewardMax.replace(/\./g, ''));
    const matchesPriceRange = rewardMax >= selectedPriceRange.min && rewardMax <= selectedPriceRange.max;

    const matchesFilter = filter === 'all' || (filter === 'recent' && program.recent);

    return matchesSearch && matchesScope && matchesPriceRange && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 sm:pt-20 md:pt-24 pb-12">
        <div className="mb-8 sm:mb-12">
        <motion.h2
          className="md:leading-[1.30] sm:leading-[1.30] text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Programmes de Cybersécurité
        </motion.h2>

          
          <div className="relative">
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5 " />
                <Input
                  type="text"
                  placeholder="Rechercher des programmes, compétences..."
                  className="pl-10 pr-4 sm:pr-32 bg-gray-800 text-white border-gray-700 focus:border-cyan-400 w-full md:w-11/12"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cyan-600 hover:bg-cyan-500 text-white hidden sm:flex"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres {(selectedScope.length > 0 || selectedPriceRange !== PRICE_RANGES[0]) && `(${selectedScope.length + (selectedPriceRange !== PRICE_RANGES[0] ? 1 : 0)})`}
                </Button>
              </div>
              
              <div className="flex mt-2 sm:mt-0 space-x-2 sm:space-x-4">
                <Button
                  onClick={() => setFilter('all')}
                  className={`flex-1 sm:flex-none transition-all duration-200 text-xs sm:text-sm
                    ${filter === 'all' ? 'bg-cyan-600 text-white hover:bg-cyan-500' : 'bg-gray-800 text-cyan-400 border border-cyan-400 hover:bg-cyan-600/10'}`}
                >
                  Tout
                </Button>
                <Button
                  onClick={() => setFilter('recent')}
                  className={`flex-1 sm:flex-none transition-all duration-200 text-xs sm:text-sm
                    ${filter === 'recent' ? 'bg-cyan-600 text-white hover:bg-cyan-500' : 'bg-gray-800 text-cyan-400 border border-cyan-400 hover:bg-cyan-600/10'}`}
                >
                  Récent
                </Button>
                <Button
                  className="flex-1 sm:hidden bg-cyan-600 hover:bg-cyan-500 text-white text-xs"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  Filtres {(selectedScope.length > 0 || selectedPriceRange !== PRICE_RANGES[0]) && `(${selectedScope.length + (selectedPriceRange !== PRICE_RANGES[0] ? 1 : 0)})`}
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="z-10 mt-2 w-full bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-cyan-400">Filtres</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsFilterOpen(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Prix</h4>
                      <div className="flex flex-wrap gap-2">
                        {PRICE_RANGES.map((range) => (
                          <Button
                            key={range.label}
                            variant={selectedPriceRange === range ? 'default' : 'outline'}
                            size="sm"
                            className={`${
                              selectedPriceRange === range 
                                ? 'bg-cyan-600 text-white hover:bg-cyan-500' 
                                : 'border-gray-600 hover:border-cyan-400 text-cyan-400'
                            }`}
                            onClick={() => setSelectedPriceRange(range)}
                          >
                            {range.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Compétences</h4>
                      <div className="flex flex-wrap gap-2">
                        {allScopes.map(scope => (
                          <Button
                            key={scope}
                            variant={selectedScope.includes(scope) ? 'default' : 'outline'}
                            size="sm"
                            className={`${
                              selectedScope.includes(scope)
                                ? 'bg-cyan-600 text-white hover:bg-cyan-500'
                                : 'border-gray-600 hover:border-cyan-400 text-cyan-400'
                            }`}
                            onClick={() => {
                              setSelectedScope(prev =>
                                prev.includes(scope)
                                  ? prev.filter(s => s !== scope)
                                  : [...prev, scope]
                              );
                            }}
                          >
                            {scope}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {(selectedScope.length > 0 || selectedPriceRange !== PRICE_RANGES[0]) && (
                      <div className="pt-4 border-t border-gray-700">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-gray-400 hover:text-white"
                          onClick={() => {
                            setSelectedScope([]);
                            setSelectedPriceRange(PRICE_RANGES[0]);
                          }}
                        >
                          Effacer les filtres
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {filteredPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-2xl p-3 sm:p-4 relative flex flex-col justify-between hover:shadow-xl hover:shadow-cyan-400/20 transition-all duration-200"
            >
              {program.status && (
                <span
                  className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold uppercase rounded-2xl 
                    ${program.status === "nouveau" ? "bg-green-900/10 text-green-500 border-green-500/20" : ""}
                    ${program.status === "fermé" ? "bg-red-900/10 text-red-500 border-red-500/20" : ""}
                    ${program.status === "mise à jour" ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" : ""}`}
                >
                  {program.status}
                </span>
              )}

              <div className="flex justify-center text-3xl sm:text-4xl mb-2 transition-transform duration-200 transform hover:scale-110">
                {program.icon}
              </div>

              <div className="mb-2 text-center">
                <h3 className="text-base sm:text-lg font-semibold text-cyan-400">{program.title}</h3>
                <p className="text-xs text-gray-500">{program.description}</p>
              </div>

              <div className="grid grid-cols-3 gap-1 sm:gap-2 text-center text-xs text-gray-400 mt-4 sm:mt-6">
                <div className="justify-center flex flex-col items-center bg-gray-700 w-full h-[50px] sm:h-[60px] md:h-[65px] hover:bg-gray-600 transition-all rounded-lg">
                  <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  <p className="p-1 text-white text-sm sm:text-base md:text-lg">{program.stats.reports}</p>
                </div>
                <div className="justify-center rounded-lg flex flex-col items-center bg-gray-700 p-1 hover:bg-gray-600 transition-all w-full h-[50px] sm:h-[60px] md:h-[65px]">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  <p className="p-1 text-white text-sm sm:text-base md:text-lg">{program.stats.participants}</p>
                </div>
                <div className="justify-center rounded-lg flex flex-col items-center bg-gray-700 p-1 hover:bg-gray-600 transition-all w-full h-[50px] sm:h-[60px] md:h-[65px]">
                  <Bug className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                  <p className="p-1 text-white text-sm sm:text-base md:text-lg">{program.stats.bugs}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-3">
                <div className="text-center">
                  <p className="text-xs sm:text-sm font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                    {program.stats.rewardMin} ₣ - {program.stats.rewardMax} ₣
                  </p>
                </div>
                <Link
                  to={`/programs/${program.id}`}
                  className="w-full px-3 py-1 bg-cyan-600 text-white text-xs sm:text-sm rounded-lg transition-all hover:bg-cyan-500 text-center"
                >
                  Voir
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
      <Footer/>
    </div>
  );
}

export default App;