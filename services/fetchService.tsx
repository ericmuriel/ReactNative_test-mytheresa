import React, { useContext, useEffect } from 'react';
import { GenericContext } from '@/context/GenericContext';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZGM5NmM1Y2M5Zjg3OGY3ZGFhMThkYzFjODNkYWRkZiIsIm5iZiI6MTcyMzA1Mjc5OS43NTQ5MDksInN1YiI6IjY2YjNiMTkyYzQxNGFmMGE3ZGE4N2I0NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YtpBjW9NxZL80M3SeXgzUmQMh2IxW4-vg9SkYIqowFg';
const API_URL = 'https://api.themoviedb.org/3/movie/top_rated';

const FetchMoviesComponent: React.FC = () => {
  const { setData, setIsLoading } = useContext(GenericContext);

  useEffect(() => {
    setIsLoading(true);
    fetch(API_URL, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      setData(data.results || []);
    })
    .catch(error => {
      console.error('Error fetching movies:', error);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [setData]);
  return null;
};

export default FetchMoviesComponent;
