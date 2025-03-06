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
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create a new program
export const createProgram = async (programData: ProgramPayload): Promise<Program> => {
  try {
    const payload = {
      statut: 'nouveau',
      programmeData: {
        name: programData.name,
        description: programData.description,
        bountyRanges: programData.bountyRanges,
        scope: programData.scope.map(asset => ({
          type: asset.type,
          target: asset.target,
          description: asset.description,
        })),
        markdown: programData.markdown,
      },
    };

    const response = await axios.post(`${API_BASE_URL}/api/programme/add`, payload, { withCredentials: true }); 
    return response.data.programme;
  } catch (error) {
    console.error('Error creating program:', error);
    throw error;
  }
  
};

// Update an existing program
export const updateProgram = async (programId: string, programData: ProgramPayload): Promise<Program> => {
  try {
    const payload = {
      programId,
      statut: 'actif',
      programmeData: {
        name: programData.name,
        description: programData.description,
        bountyRanges: programData.bountyRanges,
        scope: programData.scope.map(asset => ({
          type: asset.type,
          target: asset.target,
          description: asset.description,
        })),
        markdown: programData.markdown,
      },
    };

    const response = await axios.put(
      `${API_BASE_URL}/api/programme/update`,
      payload,
      { withCredentials: true }
    );
    return response.data.programme;
  } catch (error) {
    console.error('Error updating program:', error);
    throw error;
  }
};
console.log("yfvy",updateProgram)

// Get all programs
export const getAllPrograms = async (): Promise<Program[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/programme/user`);
    return response.data.programmes;
  } catch (error) {
    console.error('Error fetching programs:', error);
    throw error;
  }
};

// Get a specific program
export const getProgramById = async (id: string): Promise<Program> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/programme/${id}`);
    return response.data.programme;
  } catch (error) {
    console.error(`Error fetching program ${id}:`, error);
    throw error;
  }
};

// Update program status
export const updateProgramStatus = async (programId: string, status: string): Promise<Program> => {
  try {
    const payload = {
      programId,
      statut: status.toLowerCase(),
    };

    const response = await axios.put(`${API_BASE_URL}/api/programme/update/statut`, payload);
    return response.data.programme;
  } catch (error) {
    console.error(`Error updating program status ${programId}:`, error);
    throw error;
  }
};
