
import React, {
  createContext,
  useState,
  useContext,
  useEffect
} from 'react';

// 1. Declaration du contexte
export const ThemeContext = createContext(null);

// 2. Creation du ThemeProvider
export function ThemeProvider({ children }) {

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('app_theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  // 3. Fonction de modification du theme
  const toggleTheme = () => {
    setTheme((prev) =>
      prev === 'light' ? 'dark' : 'light'
    );
  };

  // 4. Fournir les donnees aux composants enfants
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 5. Hook personnalise
export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useTheme doit etre utilise a l interieur d un ThemeProvider'
    );
  }

  return context;
}
