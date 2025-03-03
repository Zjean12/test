

// URL de base de l'API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Récupère tous les programmes
 * @returns {Promise<Array>} Liste des programmes
 */
export const fetchPrograms = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/programs`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des programmes:', error);
    throw error;
  }
};

/**
 * Récupère un programme par son ID
 * @param {string} id - ID du programme
 * @returns {Promise<Object>} Données du programme
 */
export const fetchProgramById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/programs/${id}`);
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la récupération du programme ${id}:`, error);
    throw error;
  }
};

/**
 * Ajoute un nouveau programme
 * @param {Object} programData - Données du programme à ajouter
 * @returns {Promise<Object>} Programme créé
 */
export const addProgram = async (programData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/programme/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(programData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de l\'ajout du programme:', error);
    throw error;
  }
};

/**
 * Met à jour un programme existant
 * @param {string} id - ID du programme à mettre à jour
 * @param {Object} programData - Nouvelles données du programme
 * @returns {Promise<Object>} Programme mis à jour
 */
export const updateProgram = async (id, programData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/programme/update${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(programData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du programme ${id}:`, error);
    throw error;
  }
};

/**
 * Supprime un programme
 * @param {string} id - ID du programme à supprimer
 * @returns {Promise<Object>} Message de confirmation
 */
export const deleteProgram = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/programs/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la suppression du programme ${id}:`, error);
    throw error;
  }
};