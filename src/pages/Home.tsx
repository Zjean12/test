import { motion } from 'framer-motion';
import { Shield, Bug, Building2, Trophy, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Scene from '../components/Scene';
import IvoryCoastMap from '../components/IvoryCoastMap';
import Footer from '../components/footer';

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  

  const partenaires = [
    { img: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=200&fit=crop', title: 'Entreprise A', description: 'Expert en cybersécurité.' },
    { img: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=300&h=200&fit=crop', title: 'Entreprise B', description: 'Leader en bug bounty.' },
    { img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=300&h=200&fit=crop', title: 'Entreprise C', description: 'Solutions innovantes.' },
    { img: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?w=300&h=200&fit=crop', title: 'Entreprise D', description: 'Protection avancée.' },
  ];

  return (
    <div className="overflow-x-hidden w-full bg-gray-900 text-white">
    <Navbar />
    
    {/* Section Héro avec Vidéo */}
    <section className="relative h-[100vh] overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <Scene />
        <div className="absolute inset-0 flex items-center justify-center">
          <IvoryCoastMap />
        </div>
        <div className="absolute inset-0">
          <motion.div
            className="w-full h-full"
            animate={{
              background: [
                'radial-gradient(circle at 30% 30%, rgba(0, 255, 255, 0.1) 0%, transparent 70%)',
                'radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.1) 0%, transparent 70%)'
              ]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            />
          </div>
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 text-cyan-400"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={fadeIn.transition}
            >
              L'INNOVATION SANS LIMITE
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl mb-8"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: 0.2 }}
            >
              Connectez-vous avec les meilleurs chercheurs en sécurité <br />et protégez vos applications.
            </motion.p>
            <motion.div
              className="flex gap-4"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: 0.4 }}
            >
              <Button size="lg" className="bg-cyan-500 hover:bg-cyan-800" asChild>
                <Link to="/entreprise/register" className="flex items-center">
                  <Building2 className="mr-2 h-5 w-5" />
                  Rejoindre en tant qu'Entreprise
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-cyan-400/40" asChild>
                <Link to="/hacker/register" className="flex items-center">
                  <Bug className="mr-2 h-5 w-5" />
                  Rejoindre en tant que Hacker
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section des Services */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-cyan-400"
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
          >
            Nos Services
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Gestion des Vulnérabilités',
                description: 'Système complet d\'évaluation et de gestion des vulnérabilités.'
              },
              {
                icon: Bug,
                title: 'Programmes de Bug Bounty',
                description: 'Créez et gérez des programmes de Bug Bounty avec des récompenses flexibles.'
              },
              {
                icon: Trophy,
                title: 'Récompenses & Reconnaissance',
                description: 'Reconnaître et récompenser les chercheurs en sécurité pour leurs découvertes.'
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg shadow-lg bg-gray-700 hover:bg-gray-600 transition duration-300"
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                transition={{ ...fadeIn.transition, delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <service.icon className="h-12 w-12 text-cyan-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section des Programmes en Vedette */}
      <section className="py-20 bg-gray-700">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center sm:text-left text-cyan-400">
              Programmes en Vedette
            </h2>
            <Button variant="outline" className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/10" asChild>
              <Link to="/programs" className="flex items-center">
                Voir tous les programmes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                company: 'TechCorp',
                logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
                bounty: '$500 - $10,000',
                description: 'Trouver des vulnérabilités dans notre infrastructure cloud'
              },
              {
                company: 'SecureBank',
                logo: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=100&h=100&fit=crop',
                bounty: '$1,000 - $20,000',
                description: 'Évaluation de la sécurité des applications bancaires'
              },
              {
                company: 'DataGuard',
                logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
                bounty: '$2,000 - $15,000',
                description: 'Protéger les systèmes de gestion des données sensibles'
              }
            ].map((program, index) => (
              <motion.div
                key={index}
                className="bg-gray-600 rounded-lg shadow-lg overflow-hidden"
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                transition={{ ...fadeIn.transition, delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={program.logo}
                      alt={program.company}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{program.company}</h3>
                      <p className="text-sm text-cyan-400">{program.bounty}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{program.description}</p>
                  <Button className="w-full bg-cyan-500 hover:bg-cyan-600" asChild>
                    <Link to={`/programs/${index + 1}`}>Voir les détails</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section des Partenaires */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-cyan-400">Nos Partenaires</h2>
            <p className="text-lg text-gray-400 mt-2">Des entreprises de confiance avec lesquelles nous collaborons.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {partenaires.map((partenaire, index) => (
              <motion.div
                key={index}
                className="bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <img src={partenaire.img} alt={partenaire.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-bold text-cyan-400">{partenaire.title}</h3>
                  <p className="text-gray-400 mt-2">{partenaire.description}</p>
                </div>
                
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
  
}