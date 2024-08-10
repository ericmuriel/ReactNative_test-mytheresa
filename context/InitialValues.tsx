import { GenericContextValue } from "./type";

export const initialValue: GenericContextValue = {
    data: [],
    setData: () => {[]},
    loading:false,
    setIsLoading:() => {},
    sortOrder: 'asc',
    setSortOrder: () => {'asc'},
    searchReference: '',
    setSearchReference: () => {''},
    movies:[],
    setMovies: () => {[]},
    searchTerm: '',
    setSearchTerm: () => {''},
    wishlist: [],
    addToWishlist: () => {[]},
    removeFromWishlist: () => {},
}
    