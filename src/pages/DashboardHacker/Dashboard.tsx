import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpRight, HelpCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Link } from 'react-router-dom';
import Header from './HeaderHack';

// Données fictives
const mockPrograms = [
  {
    id: '1',
    name: 'Sécurité des Applications Web',
    description: 'Trouvez des vulnérabilités dans nos applications web',
    bounty_ranges: {
      low: '50,000',
      critical: '2,000,000'
    },
    scope: [
      { id: '1', type: 'Web' },
      { id: '2', type: 'API' }
    ],
    status: 'active',
    company: 'TechCorp'
  },
  {
    id: '2',
    name: 'Sécurité des Applications Mobiles',
    description: 'Évaluation de la sécurité de nos applications mobiles',
    bounty_ranges: {
      low: '100,000',
      critical: '3,000,000'
    },
    scope: [
      { id: '3', type: 'iOS' },
      { id: '4', type: 'Android' }
    ],
    status: 'active',
    company: 'SecureBank'
  }
];

export default function HackerDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScope, setSelectedScope] = useState<string[]>([]);
  const [avatar] = useState(() => {
    const savedAvatar = localStorage.getItem('avatar');
    return savedAvatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=1';
  });

  const filteredPrograms = mockPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesScope = selectedScope.length === 0 ||
                        program.scope.some(s => selectedScope.includes(s.type));
    return matchesSearch && matchesScope;
  });

  const allScopes = Array.from(new Set(mockPrograms.flatMap(p => p.scope.map(s => s.type))));

  return (
    <div className="min-h-screen bg-[#141d2b] text-gray-100">
      <Header avatar={avatar} />

      <div className="pt-24 pb-16 max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-100">Programmes Disponibles</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Rechercher des programmes..."
                className="pl-10 bg-[#1a2332] border-[#2a3655] text-gray-100 placeholder-gray-500 focus:border-[#9fef00] focus:ring-[#9fef00]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {allScopes.map(scope => (
                <Button
                  key={scope}
                  variant={selectedScope.includes(scope) ? 'default' : 'outline'}
                  size="sm"
                  className={selectedScope.includes(scope) 
                    ? 'bg-[#9fef00] hover:bg-[#8bdf00] text-black border-none'
                    : 'bg-[#2a3655] text-gray-100 border-[#374873] hover:bg-[#374873]'
                  }
                  onClick={() => {
                    setSelectedScope(prev =>
                      prev.includes(scope)
                        ? prev.filter(s => s !== scope)
                        : [...prev, scope]
                    );
                  }}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {scope}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          {filteredPrograms.map((program, index) => (
            <motion.div
              key={program.id}
              className="bg-[#1a2332] rounded-lg shadow-xl overflow-hidden border border-[#2a3655]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-gray-100">{program.name}</h3>
                    <p className="text-sm text-gray-400 mb-2">{program.company}</p>
                    <p className="text-sm text-gray-400 mb-4">{program.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {program.scope.map(scope => (
                        <span
                          key={scope.id}
                          className="px-2 py-1 bg-[#2a3655] text-gray-100 rounded-full text-xs"
                        >
                          {scope.type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[#9fef00] font-semibold mb-2">
                      {program.bounty_ranges.low}₣ - {program.bounty_ranges.critical}₣
                    </div>
                    <Button 
                      className="bg-[#2a3655] hover:bg-[#374873] text-gray-100 border-none" 
                      asChild
                    >
                      <Link to={`/programDetailhacker/${program.id}`}>
                        Voir les Détails
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Button
        variant="default"
        size="icon"
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg bg-[#9fef00] hover:bg-[#8bdf00] text-black"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}