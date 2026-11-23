import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

// Rebrand note: storage keys moved from `smarttools-*` to `tool2u-*`.
// We still read the legacy key as a fallback so existing users don't
// lose their saved favorites/recently-used tools after the rebrand.
function readMigratedList(newKey, legacyKey) {
  const saved = localStorage.getItem(newKey) ?? localStorage.getItem(legacyKey);
  return saved ? JSON.parse(saved) : [];
}

export function UserProvider({ children }) {
  const [favorites, setFavorites] = useState(() => readMigratedList('tool2u-favorites', 'smarttools-favorites'));

  const [recentlyUsed, setRecentlyUsed] = useState(() => readMigratedList('tool2u-recent', 'smarttools-recent'));

  useEffect(() => {
    localStorage.setItem('tool2u-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('tool2u-recent', JSON.stringify(recentlyUsed));
  }, [recentlyUsed]);

  const toggleFavorite = (toolId) => {
    setFavorites(prev => 
      prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId]
    );
  };

  const addRecentlyUsed = (toolId) => {
    setRecentlyUsed(prev => {
      const filtered = prev.filter(id => id !== toolId);
      return [toolId, ...filtered].slice(0, 6);
    });
  };

  return (
    <UserContext.Provider value={{ favorites, recentlyUsed, toggleFavorite, addRecentlyUsed }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
