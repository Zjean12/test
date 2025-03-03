const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Chemin vers le fichier de données
const dataPath = path.join(__dirname, 'data', 'programs.json');

// Assurer que le dossier data existe
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}

// Créer le fichier programs.json s'il n'existe pas
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([], null, 2));
}

// Fonction pour lire les programmes
const getPrograms = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lors de la lecture des programmes:', error);
    return [];
  }
};

// Fonction pour écrire les programmes
const savePrograms = (programs) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(programs, null, 2));
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des programmes:', error);
    return false;
  }
};

// Routes API

// GET - Récupérer tous les programmes
app.get('/api/programs', (req, res) => {
  const programs = getPrograms();
  res.json(programs);
});

// GET - Récupérer un programme par ID
app.get('/api/programs/:id', (req, res) => {
  const programs = getPrograms();
  const program = programs.find(p => p.id === req.params.id);
  
  if (!program) {
    return res.status(404).json({ message: 'Programme non trouvé' });
  }
  
  res.json(program);
});

// POST - Ajouter un nouveau programme
app.post('/api/programs', (req, res) => {
  try {
    const programs = getPrograms();
    const newProgram = {
      ...req.body,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      lastUpdated: null,
      reports: 0,
      bounties: req.body.bounties || '$0',
      status: 'Active'
    };
    
    programs.push(newProgram);
    
    if (savePrograms(programs)) {
      res.status(201).json(newProgram);
    } else {
      res.status(500).json({ message: 'Erreur lors de l\'enregistrement du programme' });
    }
  } catch (error) {
    console.error('Erreur lors de l\'ajout du programme:', error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// PUT - Modifier un programme existant
app.put('/api/programs/:id', (req, res) => {
  try {
    const programs = getPrograms();
    const programIndex = programs.findIndex(p => p.id === req.params.id);
    
    if (programIndex === -1) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }
    
    // Conserver certaines propriétés existantes
    const existingProgram = programs[programIndex];
    const updatedProgram = {
      ...req.body,
      id: existingProgram.id, // Conserver l'ID original
      createdAt: existingProgram.createdAt, // Conserver la date de création
      lastUpdated: new Date().toISOString(), // Mettre à jour la date de modification
      reports: existingProgram.reports, // Conserver le nombre de rapports
      status: req.body.status || existingProgram.status // Utiliser le nouveau statut ou conserver l'ancien
    };
    
    programs[programIndex] = updatedProgram;
    
    if (savePrograms(programs)) {
      res.json(updatedProgram);
    } else {
      res.status(500).json({ message: 'Erreur lors de la mise à jour du programme' });
    }
  } catch (error) {
    console.error('Erreur lors de la modification du programme:', error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// DELETE - Supprimer un programme
app.delete('/api/programs/:id', (req, res) => {
  try {
    const programs = getPrograms();
    const filteredPrograms = programs.filter(p => p.id !== req.params.id);
    
    if (filteredPrograms.length === programs.length) {
      return res.status(404).json({ message: 'Programme non trouvé' });
    }
    
    if (savePrograms(filteredPrograms)) {
      res.json({ message: 'Programme supprimé avec succès' });
    } else {
      res.status(500).json({ message: 'Erreur lors de la suppression du programme' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du programme:', error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur API démarré sur le port ${PORT}`);
});