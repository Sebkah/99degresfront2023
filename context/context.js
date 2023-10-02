import { createContext, useState, useContext } from 'react';

const AppContext = createContext(null);

export function Context({ children }) {
  const [language, setLanguage] = useState('fr');
  const [directorFeatured, setDirectorFeatured] = useState(null);

  return (
    <AppContext.Provider
      value={{ language, setLanguage, directorFeatured, setDirectorFeatured }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
