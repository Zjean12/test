import { motion } from 'framer-motion';
import { Trophy, Award, Medal } from 'lucide-react';


const topHackers = [
  {
    rank: 1,
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop',
    points: 15780,
    findings: 342,
    specialties: ['Web', 'API', 'Mobile']
  },
  {
    rank: 2,
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    points: 12450,
    findings: 289,
    specialties: ['Infrastructure', 'Cloud', 'Web']
  },
  {
    rank: 3,
    name: 'Michael Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150&h=150&fit=crop',
    points: 10890,
    findings: 256,
    specialties: ['Mobile', 'IoT', 'API']
  }
];

const leaderboardHackers = [
  {
    rank: 4,
    name: 'Emily Zhang',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    points: 9870,
    findings: 198
  },
  {
    rank: 5,
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    points: 8940,
    findings: 176
  },
  {
    rank: 6,
    name: 'Lisa Thompson',
    avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop',
    points: 7890,
    findings: 154
  },
  {
    rank: 7,
    name: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    points: 6780,
    findings: 143
  },
  {
    rank: 8,
    name: 'Maria Garcia',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop',
    points: 5670,
    findings: 132
  },
  {
    rank: 9,
    name: 'Robert Lee',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    points: 4560,
    findings: 121
  },
  {
    rank: 10,
    name: 'Anna Brown',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    points: 3450,
    findings: 98
  }
];

const RankIcon = ({ rank }: { rank: number }) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-8 w-8 text-yellow-400" />;
    case 2:
      return <Medal className="h-8 w-8 text-gray-400" />;
    case 3:
      return <Award className="h-8 w-8 text-amber-600" />;
    default:
      return <span className="text-xl font-bold text-gray-600">#{rank}</span>;
  }
};

export default function Hackers() {
  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-12">Top Security Researchers</h1>

        {/* Top 3 Hackers */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {topHackers.map((hacker, index) => (
            <motion.div
              key={hacker.rank}
              className="bg-white rounded-lg shadow-lg p-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="relative mb-6">
                <img
                  src={hacker.avatar}
                  alt={hacker.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <div className="absolute -top-2 -right-2">
                  <RankIcon rank={hacker.rank} />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{hacker.name}</h3>
              <p className="text-primary font-bold mb-2">{hacker.points.toLocaleString()} points</p>
              <p className="text-gray-600 mb-4">{hacker.findings} findings</p>
              <div className="flex flex-wrap justify-center gap-2">
                {hacker.specialties.map(specialty => (
                  <span
                    key={specialty}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">Leaderboard</h2>
            <div className="space-y-6">
              {leaderboardHackers.map((hacker, index) => (
                <motion.div
                  key={hacker.rank}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center space-x-4">
                    <RankIcon rank={hacker.rank} />
                    <img
                      src={hacker.avatar}
                      alt={hacker.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold">{hacker.name}</h3>
                      <p className="text-sm text-gray-600">{hacker.findings} findings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">
                      {hacker.points.toLocaleString()} points
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

