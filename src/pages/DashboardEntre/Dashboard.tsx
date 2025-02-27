import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Plus,
  Settings,
  LogOut,
  ChevronDown,
  FileText,
  Home,
  Users,
  Shield
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ui/use-toast';

// Mock data for demonstration
const notifications = [
  {
    id: 1,
    title: 'New Report Submitted',
    message: 'A new vulnerability report has been submitted for Program A',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Report Status Updated',
    message: 'Your report for Program B has been reviewed',
    time: '1 day ago',
    unread: false,
  },
];

const programs = [
  {
    id: 1,
    name: 'Web Application Security',
    status: 'Active',
    reports: 12,
    bounties: '$5,000',
  },
  {
    id: 2,
    name: 'Mobile App Security',
    status: 'Active',
    reports: 8,
    bounties: '$3,500',
  },
  {
    id: 3,
    name: 'API Security Testing',
    status: 'Closed',
    reports: 15,
    bounties: '$7,200',
  },
];

export default function Dashboard() {
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    // TODO: Implement logout logic
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/entreprise/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg">
        <div className="flex items-center p-6 border-b">
          <Shield className="w-8 h-8 text-primary mr-2" />
          <span className="text-xl font-bold">BugHunter</span>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#dashboard">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </a>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#programs">
                  <FileText className="mr-2 h-4 w-4" />
                  Programs
                </a>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#hackers">
                  <Users className="mr-2 h-4 w-4" />
                  Hackers
                </a>
              </Button>
            </li>
            <li>
              <Button variant="ghost" className="w-full justify-start" asChild>
                <a href="#settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </a>
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome back, John Doe</p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  2
                </span>
              </Button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer ${
                          notification.unread ? 'bg-blue-50' : ''
                        }`}
                      >
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <Button variant="ghost" className="flex items-center space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <span>John Doe</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>

            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Active Programs', value: '12', color: 'bg-blue-500' },
            { title: 'Total Reports', value: '156', color: 'bg-green-500' },
            { title: 'Total Bounties', value: '$25,400', color: 'bg-purple-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 ${stat.color} rounded-lg mb-4`} />
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Programs */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Your Programs</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Program
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-4">Program Name</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Reports</th>
                  <th className="pb-4">Bounties Paid</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program) => (
                  <tr key={program.id} className="border-b">
                    <td className="py-4">{program.name}</td>
                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          program.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {program.status}
                      </span>
                    </td>
                    <td className="py-4">{program.reports}</td>
                    <td className="py-4">{program.bounties}</td>
                    <td className="py-4">
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}