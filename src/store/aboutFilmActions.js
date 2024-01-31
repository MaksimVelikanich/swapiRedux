import axios from 'axios';

export const SET_FILM_DETAILS = 'SET_FILM_DETAILS';
export const SET_CHARACTERS = 'SET_CHARACTERS';
export const SET_CHARACTER_NAMES = 'SET_CHARACTER_NAMES';
export const SET_PLANETS = 'SET_PLANETS';
export const SET_STARSHIPS_NAMES = 'SET_STARSHIPS_NAMES';
export const SET_STARSHIPS = 'SET_STARSHIPS';
export const SET_VEHICLES = 'SET_VEHICLES';
export const SET_SPECIES = 'SET_SPECIES';
export const RESET_FILM_DETAILS = 'RESET_FILM_DETAILS';

export const resetFilmDetails = () => ({
  type: RESET_FILM_DETAILS,
});

export const setFilmDetails = (filmDetails) => ({
  type: SET_FILM_DETAILS,
  payload: filmDetails,
});

export const setCharacters = (characters) => ({
  type: SET_CHARACTERS,
  payload: characters,
});

export const setCharacterNames = (characterNames) => ({
  type: SET_CHARACTER_NAMES,
  payload: characterNames,
});

export const setPlanets = (planets) => ({
  type: SET_PLANETS,
  payload: planets,
});

export const setStarships = (starships) => ({
  type: SET_STARSHIPS,
  payload: starships,
});

export const setVehicles = (vehicles) => ({
  type: SET_VEHICLES,
  payload: vehicles,
});

export const setSpecies = (species) => ({
  type: SET_SPECIES,
  payload: species,
});

export const fetchFilmDetails = (filmId) => async (dispatch) => {
  try {
    const response = await axios.get(`https://swapi.dev/api/films/${filmId}`);
    const filmData = response.data;

    const charactersData = await Promise.all(
      filmData.characters.map(async (characterUrl) => {
        const characterResponse = await axios.get(characterUrl);
        const characterData = characterResponse.data;
        return { name: characterData.name, url: characterUrl };
      })
    );

    const planetsData = await Promise.all(
      filmData.planets.map(async (planetUrl) => {
        const planetResponse = await axios.get(planetUrl);
        return planetResponse.data;
      })
    );

    const starshipsData = await Promise.all(
      filmData.starships.map(async (starshipUrl) => {
        const starshipResponse = await axios.get(starshipUrl);
        return starshipResponse.data;
      })
    );

    const vehiclesData = await Promise.all(
      filmData.vehicles.map(async (vehicleUrl) => {
        const vehicleResponse = await axios.get(vehicleUrl);
        return vehicleResponse.data;
      })
    );

    const speciesData = await Promise.all(
      filmData.species.map(async (specieUrl) => {
        const specieResponse = await axios.get(specieUrl);
        return specieResponse.data;
      })
    );

    const filmsDetailsData = {
      title: filmData.title,
      episode_id: filmData.episode_id,
      opening_crawl: filmData.opening_crawl,
      director: filmData.director,
      producer: filmData.producer,
      release_date: filmData.release_date,
      characters: charactersData,
      planets: planetsData,
      species: speciesData,
      starships: starshipsData,
      vehicles: vehiclesData,
    };
    
    dispatch(setFilmDetails(filmsDetailsData));    

    dispatch(setFilmDetails(filmsDetailsData));
    dispatch(setCharacters(charactersData));
    dispatch(setCharacterNames(charactersData.map(character => character.name)));
    dispatch(setPlanets(planetsData));
    dispatch(setStarships(starshipsData));
    dispatch(setVehicles(vehiclesData));
    dispatch(setSpecies(speciesData));
  } catch (error) {
    console.error('Error fetching film details:', error);
    console.error('Response:', error.response);
  }
};
