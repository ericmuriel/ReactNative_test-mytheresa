import React, { createContext, useState } from 'react'
import { initialValue } from './InitialValues';
import { GenericContextValue, Movie } from './type';

export const GenericContext = createContext<GenericContextValue>(initialValue)

export default function GenericContextProvider({ children }: any) {
    const [data, setData] = useState<Movie[]>([]);
    const [loading, setIsLoading] = useState<boolean>(false);
    const [sortOrder, setSortOrder] = useState<string>('desc');
    const [searchReference, setSearchReference] = useState<string>('');
    const [movies, setMovies] = useState<Movie[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [wishlist, setWishlist] = useState<Movie[]>([]);

    const addToWishlist = (film: Movie) => {
        setWishlist((prevWishlist) => {
            if (!prevWishlist.some(item => item.id === film.id)) {
                return [...prevWishlist, film];
            }
            return prevWishlist;
        });
    };

    const removeFromWishlist = (movieId: number) => {
        setWishlist(prevWishlist => prevWishlist.filter(movie => movie.id !== movieId));
    };

    const contextValue: GenericContextValue = {
        data,
        setData,
        loading,
        setIsLoading,
        sortOrder, 
        setSortOrder,
        searchReference, 
        setSearchReference,
        movies,
        setMovies,
        searchTerm,
        setSearchTerm,
        wishlist,
        addToWishlist,
        removeFromWishlist
    }

    return (
        <GenericContext.Provider value={contextValue}>
            {children}
        </GenericContext.Provider>)
}