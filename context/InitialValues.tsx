import { GenericContextValue } from "./type";

export const initialValue: GenericContextValue = {
    data: [],
    setData: () => {[]},
    loading:false,
    setIsLoading:() => {},
    movies:[],
    setMovies: () => {[]},
    wishlist: [],
    addToWishlist: () => {[]},
    removeFromWishlist: () => {},
}
    