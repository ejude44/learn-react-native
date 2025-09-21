import { createContext, useState, ReactNode, useContext } from 'react';

interface FavoritesContextType {
  ids: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextType>({
  ids: [],
  addFavorite: (_id: string) => {},
  removeFavorite: (_id: string) => {},
});

export function useFavoriteMealContext() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      'useFavoriteMealContext must be used within FavoritesContextProvider'
    );
  }
  return context;
}

interface Props {
  children: ReactNode;
}

function FavoritesContextProvider({ children }: Props) {
  const [favoriteMealIds, setFavoriteMealIds] = useState<string[]>([]);

  function addFavorite(id: string) {
    setFavoriteMealIds((currentFavIds) => [...currentFavIds, id]);
  }

  function removeFavorite(id: string) {
    setFavoriteMealIds((currentFavIds) =>
      currentFavIds.filter((mealId) => mealId !== id)
    );
  }

  const value = {
    ids: favoriteMealIds,
    addFavorite,
    removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default FavoritesContextProvider;
