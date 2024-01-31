export const fetchHeroDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: 'FETCH_HERO_DETAILS_START', payload: id });
  
      const heroResponse = await fetch(`https://swapi.dev/api/people/${id}/`);
      if (!heroResponse.ok) {
        throw new Error(`Error fetching hero details: ${heroResponse.statusText}`);
      }
      const heroData = await heroResponse.json();
  
      const filmsData = await Promise.all(
        heroData.films.map(async (filmUrl) => {
          const filmResponse = await fetch(filmUrl);
          if (!filmResponse.ok) {
            throw new Error(`Error fetching film details: ${filmResponse.statusText}`);
          }
          return filmResponse.json();
        })
      );
  
      dispatch({ type: 'FETCH_HERO_DETAILS_SUCCESS', payload: { hero: heroData, films: filmsData } });
    } catch (error) {
      dispatch({ type: 'FETCH_HERO_DETAILS_ERROR', payload: error.message });
    }
  };
  