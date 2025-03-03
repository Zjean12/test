import { motion } from 'framer-motion';

export function InteractiveBackground() {
  return (
    <motion.div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: 'url(/assets/formHack.jpg)', // Remplacez par le chemin de votre image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Vous pouvez ajouter des éléments interactifs ici */}
    </motion.div>
  );
}