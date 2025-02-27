import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Trophy, Medal } from 'lucide-react';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

interface Hacker {
  id: number;
  name: string;
  impact: number;
  status: string;
  date: string;
  rank: number;
  avatar: string;
  specialties?: string[];
  findings?: number;
}

const hackers: Hacker[] = [
  { 
    id: 1, 
    name: "Alex Smith", 
    impact: 95, 
    status: "Active", 
    date: "Feb 1, 2025", 
    rank: 1,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    specialties: ['Web', 'API', 'Cloud'],
    findings: 342
  },
  { 
    id: 2, 
    name: "Sarah Chen", 
    impact: 92, 
    status: "Active", 
    date: "Feb 2, 2025", 
    rank: 2,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
    specialties: ['Mobile', 'IoT', 'Infrastructure'],
    findings: 289
  },
  { 
    id: 3, 
    name: "Mike Johnson", 
    impact: 88, 
    status: "Active", 
    date: "Feb 3, 2025", 
    rank: 3,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    specialties: ['API', 'Cloud', 'Web'],
    findings: 256
  },
  { 
    id: 4, 
    name: "Emma Wilson", 
    impact: 85, 
    status: "Active", 
    date: "Feb 4, 2025", 
    rank: 4,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    findings: 198
  },
  { 
    id: 5, 
    name: "David Lee", 
    impact: 82, 
    status: "Active", 
    date: "Feb 5, 2025", 
    rank: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
    findings: 176
  },
  { 
    id: 6, 
    name: "Emma Wilson", 
    impact: 85, 
    status: "Active", 
    date: "Feb 4, 2025", 
    rank: 6,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    findings: 198
  },
  { 
    id: 7, 
    name: "David Lee", 
    impact: 82, 
    status: "Active", 
    date: "Feb 5, 2025", 
    rank: 7,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
    findings: 176
  },
  { 
    id: 8, 
    name: "Emma Wilson", 
    impact: 85, 
    status: "Active", 
    date: "Feb 4, 2025", 
    rank: 8,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    findings: 198
  },
  { 
    id: 9, 
    name: "David Lee", 
    impact: 82, 
    status: "Active", 
    date: "Feb 5, 2025", 
    rank: 9,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
    findings: 176
  },
];

function AnimatedCard({ 
  hacker, 
  icon: Icon, 
  iconColor, 
  barColor, 
  barHeight, 
  imageSize, 
  delay 
}: { 
  hacker: Hacker, 
  icon: any, 
  iconColor: string, 
  barColor: string, 
  barHeight: string, 
  imageSize: string,
  delay: number 
}) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = hacker.impact / steps;
    let currentStep = 0;

    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (currentStep < steps) {
          setCurrentValue(prev => Math.min(prev + increment, hacker.impact));
          currentStep++;
        } else {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [hacker.impact, delay]);

  return (
    <motion.div 
      className="w-48 flex flex-col items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      <div className="relative -mb-12 z-10">
        <motion.div 
          className={`${imageSize} rounded-2xl overflow-hidden border-4 border-cyan-400/20 shadow-lg shadow-cyan-400/10`}
          whileHover={{ scale: 1.05, borderColor: 'rgb(34 211 238 / 0.4)', transition: { duration: 0.2 } }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img 
            src={hacker.avatar} 
            alt={hacker.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: (delay / 1000) + 0.3, type: "spring", stiffness: 200 }}
        >
          <Icon className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 ${iconColor} drop-shadow-lg`} />
        </motion.div>
      </div>
      <motion.div 
        className="bg-gray-800/80 backdrop-blur-sm p-4 pt-16 rounded-t-lg w-full text-center border border-cyan-400/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: (delay / 1000) + 0.2 }}
        whileHover={{ backgroundColor: 'rgb(31 41 55 / 0.9)' }}
      >
        <p className="font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">{hacker.name}</p>
        <p className="text-sm text-cyan-200">Impact: {hacker.impact}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {hacker.specialties?.map((specialty, index) => (
            <motion.span
              key={specialty}
              className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded-full text-xs border border-cyan-400/20"
              initial={{ opacity: 0, scale: 0, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: (delay / 1000) + 0.4 + (index * 0.1) }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgb(34 211 238 / 0.2)' }}
            >
              {specialty}
            </motion.span>
          ))}
        </div>
      </motion.div>
      <div className={`bg-gray-800/80 backdrop-blur-sm ${barHeight} w-full overflow-hidden rounded-b-lg border-x border-b border-cyan-400/20`}>
        <div className="relative w-full h-full">
          <motion.div 
            className={`absolute bottom-0 left-0 w-full ${barColor}`}
            style={{ height: `${currentValue}%` }}
            initial={{ height: "0%" }}
            animate={{ height: `${currentValue}%` }}
            transition={{ duration: 1, delay: (delay / 1000) + 0.5 }}
          />
          <motion.div 
            className="absolute inset-0 flex items-center justify-center font-bold text-2xl bg-gradient-to-r from-black to-blue-800 bg-clip-text text-transparent"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: (delay / 1000) + 0.7, type: "spring" }}
          >
            {Math.round(currentValue)}%
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function App() {
  const topThree = hackers.slice(0, 3);
  const remainingHackers = hackers.slice(3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <motion.h2 
          className="text-4xl font-bold text-center mb-24 mt-20 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Top Security Researchers
        </motion.h2>

        <div className="flex justify-center items-end gap-4 h-80 mb-20">
          <AnimatedCard 
            hacker={topThree[1]} 
            icon={Trophy} 
            iconColor="text-gray-300" 
            barColor="bg-gradient-to-t from-gray-400 to-gray-300" 
            barHeight="h-32"
            imageSize="w-24 h-24"
            delay={200}
          />
          <AnimatedCard 
            hacker={topThree[0]} 
            icon={Crown} 
            iconColor="text-yellow-500" 
            barColor="bg-gradient-to-t from-yellow-600 to-yellow-400" 
            barHeight="h-40"
            imageSize="w-28 h-28"
            delay={0}
          />
          <AnimatedCard 
            hacker={topThree[2]} 
            icon={Medal} 
            iconColor="text-orange-700" 
            barColor="bg-gradient-to-t from-orange-800 to-orange-600" 
            barHeight="h-24"
            imageSize="w-24 h-24"
            delay={400}
          />
        </div>

        <motion.div 
          className="mt-20 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="overflow-x-auto">
            <table className="w-full bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-cyan-400/20">
              <thead>
                <tr className="border-b border-cyan-400/20">
                  <th className="p-4 text-left text-cyan-400">Rank</th>
                  <th className="p-4 text-left text-cyan-400">Hacker</th>
                  <th className="p-4 text-left text-cyan-400">Impact</th>
                  <th className="p-4 text-left text-cyan-400">Findings</th>
                  <th className="p-4 text-left text-cyan-400">Status</th>
                  <th className="p-4 text-left text-cyan-400">Date</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {remainingHackers.map((hacker, index) => (
                    <motion.tr 
                      key={hacker.id} 
                      className="border-b border-cyan-400/10 hover:bg-cyan-400/5"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + (index * 0.1) }}
                      whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                    >
                      <td className="p-4">#{hacker.rank}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <motion.div 
                            className="w-10 h-10 rounded-2xl overflow-hidden border border-cyan-400/20"
                            whileHover={{ scale: 1.1, borderColor: 'rgb(34 211 238 / 0.4)' }}
                          >
                            <img 
                              src={hacker.avatar} 
                              alt={hacker.name}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            {hacker.name}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">{hacker.impact}</td>
                      <td className="p-4">{hacker.findings}</td>
                      <td className="p-4">
                        <motion.span 
                          className="px-2 py-1 bg-cyan-500/10 text-cyan-400 rounded-2xl text-sm border border-cyan-400/20"
                          whileHover={{ scale: 1.05, backgroundColor: 'rgb(34 211 238 / 0.2)' }}
                        >
                          {hacker.status}
                        </motion.span>
                      </td>
                      <td className="p-4">{hacker.date}</td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      <footer className="bg-gray-800/50 backdrop-blur-sm border-t border-cyan-400/20 text-gray-400 py-8 px-6">
        <motion.div 
          className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="text-sm mb-4 md:mb-0">© 2025 IlimiGroup. All rights reserved.</div>
          <div className="flex gap-4 text-sm">
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Cookie Settings
            </motion.a>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

export default App;