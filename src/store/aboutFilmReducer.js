import { RESET_FILM_DETAILS, SET_FILM_DETAILS, SET_CHARACTERS, SET_PLANETS, SET_STARSHIPS, SET_VEHICLES, SET_SPECIES } from './aboutFilmActions';

const initialState = {
  filmDetails: null,
  characters: [],
  planets: [],
  starships: [],
  vehicles: [],
  species: [],
  loading: false,
};

const aboutFilmReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FILM_DETAILS:
      return {
        ...state,
        filmDetails: null,
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
      };

    case SET_FILM_DETAILS:
      return {
        ...state,
        filmDetails: action.payload,
      };

    case SET_CHARACTERS:
      return {
        ...state,
        characters: action.payload,
      };

    case SET_PLANETS:
      return {
        ...state,
        planets: action.payload,
      };

    case SET_STARSHIPS:
      return {
        ...state,
        starships: action.payload,
      };

    case SET_VEHICLES:
      return {
        ...state,
        vehicles: action.payload,
      };

    case SET_SPECIES:
      return {
        ...state,
        species: action.payload,
      };

    case SET_FILM_DETAILS:
      const newState = {
        ...state,
        filmDetails: action.payload,
      };
    return newState;

    default:
      return state;
  }

};

export default aboutFilmReducer;
