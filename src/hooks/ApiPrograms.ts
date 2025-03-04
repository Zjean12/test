import axios from 'axios';
import { Program } from '../types/programs';


// Interface pour les données à envoyer lors de la création/mise à jour
export interface ProgramPayload {
  name: string;
  description: string;
  bountyRanges: {
    low: string;
    medium: string;
    high: string;
    critical: string;
  };
  markdown: string;
  scope: Array<{
    type: string;
    target: string;
    description: string;
  }>;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Créer un nouveau programme
export const createProgram = async (programData: ProgramPayload): Promise<Program> => {
  try {
    // Construire l'objet correctement formaté
    const payload = {
      statut: "nouveau",
      programmeData: {
        program: {
          name: programData.name,
          exclusions: [
            "Attaques d’ingénierie sociale",
            "attaques DDoS",
            "tests de sécurité physique"
          ],
          reward_ranges: programData.bountyRanges,
          program_assets: programData.scope.map(asset => ({
            asset: asset.target,
            type: asset.type,
            coverage: "Inclus",
            severity: "Critique",
            bounty: "Éligible"
          })),
          program_rules: [
            "Veuillez fournir des rapports détaillés avec des étapes reproductibles.",
            "Si le rapport n'est pas suffisamment détaillé pour reproduire le problème, il ne sera pas éligible à une récompense.",
            "Soumettez une vulnérabilité par rapport, sauf si vous devez enchaîner des vulnérabilités pour montrer l'impact.",
            "Lorsque cela est applicable (par exemple, XSS), nous ne récompensons que le premier rapport reçu pour une vulnérabilité spécifique et ne récompenserons pas les doublons.",
            "Veuillez ne pas forcer nos services.",
            "L'ingénierie sociale (par exemple, phishing, vishing, smishing) est interdite.",
            "Faites un effort de bonne foi pour éviter les violations de la vie privée, la destruction des données et l'interruption ou la dégradation de notre service.",
            "N'interagissez qu'avec des comptes que vous possédez ou avec l'autorisation explicite du titulaire du compte."
          ],
          test_plan: {
            instruction: "Veuillez vous inscrire ici pour obtenir votre compte. Veuillez noter que le service d'inscription n'est pas destiné au piratage.",
            guide: "Une fois connecté au site, vous pouvez cliquer sur le bouton \"TestPrep\" pour accéder au guide de navigation des fonctionnalités fourni sur la plateforme."
          },
          documentation: {
            api_rest: "Documentation de l'API REST",
            integration: "Documentation d'intégration",
            academy: "StackPath Academy pour en savoir plus sur les produits SSDLF et BISE.",
            credentials: "h1@example.com:moderator.com#Academy#01"
          },
          rewards: {
            critical: {
              vulnerability: "Exécution de code à distance",
              amount: "3000 $"
            },
            high: {
              vulnerability: "Lecture de fichiers arbitraires",
              amount: "1500 $"
            },
            medium: {
              vulnerability: "Injection SQL",
              amount: "500 $"
            },
            low: {
              vulnerability: "XSS (External Entity Processing)",
              amount: "150 $"
            }
          }
        }
      }
    };

    // Envoyer la requête POST avec le bon format
    const response = await axios.post(`${API_BASE_URL}/api/programme/add`, payload);
    
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du programme:', error);
    throw error;
  }
};


// Mettre à jour un programme existant
export const updateProgram = async (id: string, programData: ProgramPayload): Promise<Program> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/programme/update${id}`, programData);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du programme ${id}:`, error);
    throw error;
  }
};

// Récupérer tous les programmes
export const getAllPrograms = async (): Promise<Program[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/programs`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des programmes:', error);
    throw error;
  }
};

// Récupérer un programme spécifique
export const getProgramById = async (id: string): Promise<Program> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/programme/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du programme ${id}:`, error);
    throw error;
  }
};

// Mettre à jour le statut d'un programme
export const updateProgramStatus = async (id: string, status: 'Active' | 'Closed'): Promise<Program> => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/api/programme/update/statut${id}/status`, { status });
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du statut du programme ${id}:`, error);
    throw error;
  }
};

// Récupérer les programmes par utilisateur
export const getProgramsByUser = async (userId: string): Promise<Program[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/programs`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des programmes de l'utilisateur ${userId}:`, error);
    throw error;
  }
};