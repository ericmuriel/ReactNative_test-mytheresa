import { Dispatch, SetStateAction } from "react";

export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }

export interface GenericContextValue{
    data: Movie[],
    setData: Dispatch<SetStateAction<Movie[]>>
    loading:boolean ,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    sortOrder: string;
    setSortOrder: React.Dispatch<React.SetStateAction<string>>;
    searchReference: string;
    setSearchReference: React.Dispatch<React.SetStateAction<string>>;
    movies: Movie[],
    setMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
    searchTerm: string,
    setSearchTerm:React.Dispatch<React.SetStateAction<string>>;
    wishlist: Movie[];
    addToWishlist: (film: Movie) => void;
    removeFromWishlist:(num: number) => void;

}
