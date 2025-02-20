import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const programs = [
  {
    id: 1,
    company: 'TechCorp',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    title: 'Cloud Infrastructure Security Program',
    description: 'Find and report security vulnerabilities in our cloud infrastructure.',
    bountyRange: '$500 - $10,000',
    scope: ['API', 'Web Application', 'Mobile Apps'],
    status: 'Active'
  },
  {
    id: 2,
    company: 'SecureBank',
    logo: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=100&h=100&fit=crop',
    title: 'Banking Applications Security Assessment',
    description: 'Help us identify security issues in our banking applications.',
    bountyRange: '$1,000 - $20,000',
    scope: ['Web Application', 'Mobile Apps'],
    status: 'Active'
  },
  {
    id: 3,
    company: 'DataGuard',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
    title: 'Data Protection Systems',
    description: 'Test our data protection systems for potential vulnerabilities.',
    bountyRange: '$2,000 - $15,000',
    scope: ['API', 'Infrastructure'],
    status: 'Active'
  }
];

export default function Programs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScope, setSelectedScope] = useState<string[]>([]);

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesScope = selectedScope.length === 0 ||
                        program.scope.some(scope => selectedScope.includes(scope));
    return matchesSearch && matchesScope;
  });

  const allScopes = Array.from(new Set(programs.flatMap(p => p.scope)));

  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
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
                    <img
                      src={program.logo}
                      alt={program.company}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{program.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{program.company}</p>
                      <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {program.scope.map(scope => (
                          <span
                            key={scope}
                            className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                          >
                            {scope}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-primary font-semibold mb-2">
                      {program.bountyRange}
                    </div>
                    <Button className="flex items-center" asChild>
                      <a href={`/programs/${program.id}`}>
                        View Details
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </a>
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