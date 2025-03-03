// AvatarContext.tsx
import  { createContext, useContext, useState, ReactNode } from 'react';

interface AvatarContextType {
  avatar: string;
  setAvatar: (avatar: string) => void;
}

const AvatarContext = createContext<AvatarContextType | undefined>(undefined);

export const AvatarProvider = ({ children }: { children: ReactNode }) => {
  const [avatar, setAvatar] = useState<string>('default-avatar-url'); // Valeur par défaut

  return (
    <AvatarContext.Provider value={{ avatar, setAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

export const useAvatar = (): AvatarContextType => {
  const context = useContext(AvatarContext);
  if (!context) {
    throw new Error('useAvatar must be used within an AvatarProvider');
  }
  return context;
};
