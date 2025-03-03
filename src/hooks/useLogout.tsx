// hooks/useLogout.ts
import { useToast } from '../components/ui/use-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
      
  
      const response = await axios.post(
        `${API_BASE_URL}/auth/logout`,
        {},
        {      
          withCredentials: true,
        }
      );
  
      if (response.status !== 200) {
        throw new Error('Erreur lors de la déconnexion');
      }
  
      localStorage.removeItem('authToken');
      localStorage.removeItem('hackerEmail');
      localStorage.removeItem('hackerAvatar');
  
      toast({ variant: 'success', title: 'Déconnexion réussie', description: 'À bientôt!' });
      navigate('/#');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Impossible de se déconnecter.';
        toast({ variant: 'destructive', title: 'Erreur', description: errorMessage });
      } else {
        toast({ variant: 'destructive', title: 'Erreur', description: 'Erreur inconnue.' });
      }
    }
  };

  return { handleLogout };
};

export default useLogout;
