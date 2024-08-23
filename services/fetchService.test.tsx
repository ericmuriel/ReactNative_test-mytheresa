import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { GenericContextValue } from '@/context/type';
import FetchMoviesComponent from './fetchService';
import { GenericContext } from '@/context/GenericContext';

const mockSetData = jest.fn();
const mockSetIsLoading = jest.fn();

const mockContextValue: GenericContextValue = {
  data: [],
  setData: mockSetData,
  loading: false,
  setIsLoading: mockSetIsLoading,
  movies: [],
  setMovies: jest.fn(),
  wishlist: [],
  addToWishlist: jest.fn(),
  removeFromWishlist: jest.fn(),
};

const API_URL = 'https://api.themoviedb.org/3/movie/top_rated';

describe('FetchMoviesComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should call setIsLoading(true) on mount', () => {
    render(
      <GenericContext.Provider value={mockContextValue}>
        <FetchMoviesComponent />
      </GenericContext.Provider>
    );

    expect(mockSetIsLoading).toHaveBeenCalledWith(true);
  });

  it('should call setIsLoading(false) after fetch is completed', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [{ id: 1, title: 'Test Movie' }] }),
    } as unknown as Response);

    render(
      <GenericContext.Provider value={mockContextValue}>
        <FetchMoviesComponent />
      </GenericContext.Provider>
    );

    await waitFor(() => {
      expect(mockSetIsLoading).toHaveBeenCalledWith(false);
    });
  });

  it('should call setData with data from API response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ results: [{ id: 1, title: 'Test Movie' }] }),
    } as unknown as Response);

    render(
      <GenericContext.Provider value={mockContextValue}>
        <FetchMoviesComponent />
      </GenericContext.Provider>
    );

    await waitFor(() => {
      expect(mockSetData).toHaveBeenCalledWith([{ id: 1, title: 'Test Movie' }]);
    });
  });

  it('should not call setData if fetch fails', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Fetch error'));

    render(
      <GenericContext.Provider value={mockContextValue}>
        <FetchMoviesComponent />
      </GenericContext.Provider>
    );

    await waitFor(() => {
      expect(mockSetData).not.toHaveBeenCalled();
    });
  });
});
