import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

// Mock data
const mockPrograms = [
  {
    id: '1',
    name: 'Web Application Security',
    description: 'Find vulnerabilities in our web applications',
    bounty_ranges: {
      low: '50,000',
      critical: '2,000,000'
    },
    scope: [
      { id: '1', type: 'Web' },
      { id: '2', type: 'API' }
    ],
    status: 'active'
  },
  {
    id: '2',
    name: 'Mobile App Security',
    description: 'Security assessment of our mobile applications',
    bounty_ranges: {
      low: '100,000',
      critical: '3,000,000'
    },
    scope: [
      { id: '3', type: 'iOS' },
      { id: '4', type: 'Android' }
    ],
    status: 'active'
  }
];

export default function Programs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScope, setSelectedScope] = useState<string[]>([]);

  const filteredPrograms = mockPrograms.filter(program => {
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesScope = selectedScope.length === 0 ||
                        program.scope.some(s => selectedScope.includes(s.type));
    return matchesSearch && matchesScope;
  });

  const allScopes = Array.from(new Set(mockPrograms.flatMap(p => p.scope.map(s => s.type))));

  return (
    <div className="">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 min-h-screen pt-24 bg-gray-50">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Bug Bounty Programs</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search programs..."
                className="pl-10"
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
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{program.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {program.scope.map(scope => (
                          <span
                            key={scope.id}
                            className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                          >
                            {scope.type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-semibold mb-2">
                      {program.bounty_ranges.low}₣ - {program.bounty_ranges.critical}₣
                    </div>
                    <Button className="flex items-center" asChild>
                      <Link to={`/programs/${program.id}`}>
                        View Details
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
    </div>
  );
}