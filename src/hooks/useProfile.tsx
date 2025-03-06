import { useState, useEffect } from 'react';
import { useToast } from '../components/ui/use-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Program } from '../types/programs';

interface Profile {
  email: string;
  avatarUrl: string;
  pseudo: string;
  stats: {
    total_prime: string;
    total_prg: Array<string>;
    reputation: number;
    success_rate: number;
  };
}

const role = "hacker";

const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [programme, setProgramme] = useState<Program | null>(null);
  const [programmeDetails, setProgrammeDetails] = useState<any | null>(null); // Stocke le contenu du JSON
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
        // Récupérer le profil
        const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
          withCredentials: true,
        });
        setProfile(response.data);
  
        // Récupérer les programmes de l'entreprise
        const programmeData = await axios.get(`${API_BASE_URL}/api/programmes/entreprise`, {
          withCredentials: true,
        });
        setProgramme(programmeData.data);
  
        // Vérifier si les programmes existent
        if (programmeData.data?.programmes && programmeData.data.programmes.length > 0) {
          // Prendre le premier programme par exemple
          const firstProgramme = programmeData.data.programmes[0];
  
          if (firstProgramme.url) {
            const jsonUrl = `${API_BASE_URL}${firstProgramme.url}`;
            console.log("URL du fichier JSON:", jsonUrl); // Affiche l'URL pour vérification
  
            // Récupérer le contenu du fichier JSON
            const jsonResponse = await axios.get(jsonUrl, {
              withCredentials: true, // Ajouter les credentials si nécessaire
            });
            setProgrammeDetails(jsonResponse.data); // Stocker les données du JSON
          }

          // Récupérer les détails de tous les programmes
          const allProgrammesDetails = [];
          for (const programme of programmeData.data.programmes) {
            if (programme.url) {
              const jsonUrl = `${API_BASE_URL}${programme.url}`;
              const jsonResponse = await axios.get(jsonUrl, { withCredentials: true });
              allProgrammesDetails.push(jsonResponse.data);
            }
          }

          // Mettre à jour l'état avec toutes les données des programmes
          setProgrammeDetails(allProgrammesDetails);
        }
      } catch (error) {
        setError('Erreur lors de la récupération du profil.');
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401 && role === "hacker") {
            navigate('/hacker/login'); // Rediriger vers la page de connexion si non authentifié
          } else {
            navigate('/entreprise/login');
          }
        } else {
          toast({ variant: 'destructive', title: 'Erreur', description: 'Erreur inconnue.' });
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, [toast, navigate]);

  return { profile, loading, error, programme, programmeDetails };
};

export default useProfile;
