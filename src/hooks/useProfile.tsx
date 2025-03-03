import { useState, useEffect } from 'react';
import { useToast } from '../components/ui/use-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
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
        const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
          withCredentials: true,
        });

        setProfile(response.data); // Set profile if authenticated
      } catch (error) {
        setError('Erreur lors de la récupération du profil.');
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            navigate('/hacker/login'); // Rediriger vers la page de connexion si non authentifié
          } else {
            const errorMessage = error.response?.data?.message || 'Erreur inconnue.';
            toast({ variant: 'destructive', title: 'Erreur', description: errorMessage });
          }
        } else {
          toast({ variant: 'destructive', title: 'Erreur', description: 'Erreur inconnue.' });
        }
      } finally {
        setLoading(false); // Fin de la récupération
      }
    };

    fetchProfile();
  }, [toast, navigate]);

  return { profile, loading, error };
};

export default useProfile;
