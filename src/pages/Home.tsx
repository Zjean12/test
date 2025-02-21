import { motion } from 'framer-motion';
import { Shield, Bug, Building2, Trophy, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';


export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="">
      <Navbar />
      {/* Section Héro avec Vidéo */}
      
      <section className="relative h-[80vh] overflow-hidden bg-black">
        <div className="relative z-10 h-full flex items-center justify-center text-white">
          <div className="text-center max-w-4xl px-4">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={fadeIn.transition}
            >
               L'INNOVATION SANS LIMITE
            </motion.h1>
            <motion.p
              className="text-xl mb-8"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: 0.2 }}
            >
              Connectez-vous avec les meilleurs chercheurs en sécurité et protégez vos applications.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: 0.4 }}
            >
              <Button size="lg" asChild>
                <Link to="/entreprise/register">
                  <Building2 className="mr-2 h-5 w-5 bg-slate-600" />
                  Rejoindre en tant qu'Entreprise
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10" asChild>
                <Link to="/hacker/register">
                  <Bug className="mr-2 h-5 w-5" />
                  Rejoindre en tant que Hacker
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section des Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={fadeIn.transition}
          >
            Nos Services
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
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
                className="p-6 rounded-lg shadow-lg bg-white"
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                transition={{ ...fadeIn.transition, delay: index * 0.2 }}
              >
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section des Programmes en Vedette */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Programmes en Vedette</h2>
            <Button variant="outline" asChild>
              <Link to="/programs">
                Voir tous les programmes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
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
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                initial={fadeIn.initial}
                animate={fadeIn.animate}
                transition={{ ...fadeIn.transition, delay: index * 0.2 }}
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
                      <p className="text-sm text-primary">{program.bounty}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <Button className="w-full" asChild>
                    <Link to={`/programs/${index + 1}`}>Voir les détails</Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Des Entreprises de Confiance</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {[
              'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=150&fit=crop',
              'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=150&h=150&fit=crop',
              'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=150&h=150&fit=crop',
              'https://images.unsplash.com/photo-1554200876-56c2f25224fa?w=150&h=150&fit=crop'
            ].map((logo, index) => (
              <motion.div
                key={index}
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-105">
                  <img
                    src={logo}
                    alt={`Partner ${index + 1}`}
                    className="h-20 object-contain mx-auto grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



    </div>
  );
}
