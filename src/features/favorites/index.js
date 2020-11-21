import { useState, useEffect } from "react";
import Favorites from "./Favorites";

const initFavorites = () => {
  const favorites = new Favorites();

  return () => {
    const [favs, setFavs] = useState(null);

    useEffect(() => {
      setFavs(favs + 1);
    }, []);

    const toggleFavorite = (id) => {
      setFavs(favs + 1);
      if (favorites.has(id)) {
        favorites.remove(id);
      } else {
        favorites.add(id);
      }
    };

    const isFavorite = (id) => {
      return favorites.has(id);
    };

    const getIds = () => {
      return favorites.get();
    };

    return { toggleFavorite, isFavorite, getIds };
  };
};

export const useFavorites = initFavorites();
