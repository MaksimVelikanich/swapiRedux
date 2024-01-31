import axios from 'axios';

const SET_FILMS = 'SET_FILMS';
const SET_SELECTED_FILM = 'SET_SELECTED_FILM';


export const setFilms = (films) => ({
  type: SET_FILMS,
  payload: films,
});

export const setSelectedFilm = (film) => ({
  type: SET_SELECTED_FILM,
  payload: film,
});



const initialState = {
  films: [],
};

const filmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILMS:
      return {
        ...state,
        films: action.payload,
      };
    default:
      return state;
  }
};

export const fetchFilms = () => async (dispatch) => {
  try {
    const response = await axios.get('https://swapi.dev/api/films');
    const filmsData = response.data.results;

    dispatch(setFilms(filmsData));
  } catch (error) {
    console.error('Error fetching films:', error);
  }
};

export default filmsReducer;
