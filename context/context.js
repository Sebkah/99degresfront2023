import { createContext, useState, useContext } from 'react';

const AppContext = createContext(null);

export function Context({ children }) {
  const [language, setLanguage] = useState('en');

  return (
    <AppContext.Provider value={{ language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
