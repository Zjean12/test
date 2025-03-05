import axios from 'axios';
import { Program } from '../types/programs';

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
  statut: string;
  programData?: {
    program: {
      name: string;
      exclusions: string[];
      reward_ranges: {
        low: string;
        medium: string;
        high: string;
        critical: string;
      };
      program_assets: Array<{
        asset: string;
        type: string;
        coverage: string;
        severity: string;
        bounty: string;
      }>;
      program_rules: string[];
      test_plan: {
        instruction: string;
        guide: string;
      };
      documentation: {
        api_rest: string;
        integration: string;
        academy: string;
        credentials: string;
      };
      rewards: {
        critical: {
          vulnerability: string;
          amount: string;
        };
        high: {
          vulnerability: string;
          amount: string;
        };
        medium: {
          vulnerability: string;
          amount: string;
        };
        low: {
          vulnerability: string;
          amount: string;
        };
      };
    };
  };
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Valeurs par défaut pour bountyRanges
const DEFAULT_BOUNTY_RANGES = {
  low: "1",
  medium: "2",
  high: "3",
  critical: "4",
};


// Create a new program
export const createProgram = async (programmeData: ProgramPayload): Promise<Program> => {
  try {
    // Vérifie que programmeData.bountyRanges est défini, sinon utilise les valeurs par défaut
    const bountyRanges = programmeData.bountyRanges || DEFAULT_BOUNTY_RANGES;

    const data = {
      statut: "nouveau", // Ajout du statut
      programmeData: {
        program: {
          name: programmeData.name,
          exclusions: [
            "Attaques d’ingénierie sociale",
            "attaques DDoS",
            "tests de sécurité physique"
          ],
          reward_ranges: {
            low: `${bountyRanges.low} ₣`, // Utiliser directement la chaîne
            medium: `${bountyRanges.medium} ₣`,
            high: `${bountyRanges.high} ₣`,
            critical: `${bountyRanges.critical} ₣`
          },
          program_assets: programmeData.scope.map(asset => ({
            asset: asset.target,
            type: asset.type,
            coverage: "Inclus",
            severity: "Critique",
            bounty: "Éligible"
          })),
          program_rules: [
            "Veuillez fournir des rapports détaillés avec des étapes reproductibles.",
            "Si le rapport n'est pas suffisamment détaillé pour reproduire le problème, il ne sera pas éligible à une récompense."
          ],
          test_plan: {
            instruction: "Veuillez vous inscrire ici pour obtenir votre compte.",
            guide: "Cliquez sur le bouton 'TestPrep' pour accéder au guide de navigation."
          },
          documentation: {
            api_rest: "Documentation de l'API REST",
            integration: "Documentation d'intégration",
            academy: "StackPath Academy pour en savoir plus.",
            credentials: "h1@example.com:moderator.com#Academy#01"
          },
          rewards: {
            critical: { vulnerability: "Exécution de code à distance", amount: "3000 $" },
            high: { vulnerability: "Lecture de fichiers arbitraires", amount: "1500 $" },
            medium: { vulnerability: "Injection SQL", amount: "500 $" },
            low: { vulnerability: "XSS (External Entity Processing)", amount: "150 $" }
          }
        }
      }
    };

    const response = await axios.post(`${API_BASE_URL}/api/programme/add`, data, { withCredentials: true });
    return response.data.programme;
  } catch (error) {
    console.error('Error creating program:', error);
    throw error;
  }
  
};


// Update an existing program
export const updateProgram = async (programId: string, programmeData: ProgramPayload): Promise<Program> => {
  try {
    // Vérifie que programmeData.bountyRanges est défini, sinon utilise les valeurs par défaut
    const bountyRanges = programmeData.bountyRanges || DEFAULT_BOUNTY_RANGES;

    const data = {
      programId,
      statut: "actif", // Ajout du statut
      programmeData: {
        program: {
          name: programmeData.name,
          exclusions: [
            "Attaques d’ingénierie sociale",
            "attaques DDoS",
            "tests de sécurité physique"
          ],
          reward_ranges: {
            low: `${bountyRanges.low} ₣`, // Utiliser directement la chaîne
            medium: `${bountyRanges.medium} ₣`,
            high: `${bountyRanges.high} ₣`,
            critical: `${bountyRanges.critical} ₣`
          },
          program_assets: programmeData.scope.map(asset => ({
            asset: asset.target,
            type: asset.type,
            coverage: "Inclus",
            severity: "Critique",
            bounty: "Éligible"
          })),
          program_rules: [
            "Veuillez fournir des rapports détaillés avec des étapes reproductibles.",
            "Si le rapport n'est pas suffisamment détaillé pour reproduire le problème, il ne sera pas éligible à une récompense."
          ],
          test_plan: {
            instruction: "Veuillez vous inscrire ici pour obtenir votre compte.",
            guide: "Cliquez sur le bouton 'TestPrep' pour accéder au guide de navigation."
          },
          documentation: {
            api_rest: "Documentation de l'API REST",
            integration: "Documentation d'intégration",
            academy: "StackPath Academy pour en savoir plus.",
            credentials: "h1@example.com:moderator.com#Academy#01"
          },
          rewards: {
            critical: { vulnerability: "Exécution de code à distance", amount: "3000 $" },
            high: { vulnerability: "Lecture de fichiers arbitraires", amount: "1500 $" },
            medium: { vulnerability: "Injection SQL", amount: "500 $" },
            low: { vulnerability: "XSS (External Entity Processing)", amount: "150 $" }
          }
        }
      }
    };

    const response = await axios.put(`${API_BASE_URL}/api/programme/update`, data, { withCredentials: true });
    return response.data.programme;
  } catch (error) {
    console.error(`Error updating program ${programId}:`, error);
    throw error;
  }
};
// Get all programs
export const getAllPrograms = async (): Promise<Program[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/programme/user`, { withCredentials: true });

    // Convertir les valeurs de bountyRanges en chaînes si nécessaire
    const programs = response.data.programmes.map((program: Program) => ({
      ...program,
      bountyRanges: {
        low: String(program.bountyRanges?.low || DEFAULT_BOUNTY_RANGES.low),
        medium: String(program.bountyRanges?.medium || DEFAULT_BOUNTY_RANGES.medium),
        high: String(program.bountyRanges?.high || DEFAULT_BOUNTY_RANGES.high),
        critical: String(program.bountyRanges?.critical || DEFAULT_BOUNTY_RANGES.critical),
      },
    }));

    return programs;
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw error;
  }
};

export const getProgramById = async (id: string): Promise<Program> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/programme/${id}`, { withCredentials: true });
    const program = response.data.programme;

    // Convertir les valeurs de bountyRanges en chaînes si nécessaire
    if (!program.bountyRanges) {
      program.bountyRanges = DEFAULT_BOUNTY_RANGES;
    } else {
      program.bountyRanges = {
        low: String(program.bountyRanges.low),
        medium: String(program.bountyRanges.medium),
        high: String(program.bountyRanges.high),
        critical: String(program.bountyRanges.critical),
      };
    }

    return program;
  } catch (error) {
    console.error(`Error fetching program ${id}:`, error);
    throw error;
  }
};

// Update program status
export const updateProgramStatus = async (programId: string, status: string): Promise<Program> => {
  try {
    const data = {
      programId,
      statut: status.toLowerCase() // Ajout du statut
    };

    const response = await axios.put(`${API_BASE_URL}/api/programme/update/statut`, data, { withCredentials: true });
    return response.data.programme;
  } catch (error) {
    console.error(`Error updating program status ${programId}:`, error);
    throw error;
  }
};

