import { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { api } from "../../services/api";

interface MoviesProviderProps {
  children: ReactNode;
}

interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface MoviesContextData {
    selectedGenre: GenreResponseProps;
    selectedGenreId: number;
    genres: GenreResponseProps[];
    setSelectedGenreId: (id: number) => void;
}

export const MoviesContext = createContext<MoviesContextData>({} as MoviesContextData);

export function MoviesProvider({ children }: MoviesProviderProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  useEffect(() => {
    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);
      });
  }, [selectedGenreId]);

  useEffect(() => {
      api.get<GenreResponseProps[]>('genres').then(response => {
        setGenres(response.data);
      });
    }, []);

  return (
    <MoviesContext.Provider value={{selectedGenre, selectedGenreId, genres, setSelectedGenreId}}>
        {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MoviesContext)

  return context
}
