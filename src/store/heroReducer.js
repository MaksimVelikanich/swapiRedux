const initialState = {
    hero: null,
    films: [],
    loading: false,
    error: null,
  };
  export const SET_SELECTED_FILM = 'SET_SELECTED_FILM';

  export const setSelectedFilm = (film) => ({
    type: SET_SELECTED_FILM,
    payload: film,
  });
  
  const heroReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_HERO_DETAILS_START':
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case 'FETCH_HERO_DETAILS_SUCCESS':
        return {
          ...state,
          loading: false,
          hero: action.payload.hero,
          films: action.payload.films,
        };
  
      case 'FETCH_HERO_DETAILS_ERROR':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case SET_SELECTED_FILM:
          return {
            ...state,
            selectedFilm: action.payload,
          };
      default:
        return state;
    }
  };
  
  export default heroReducer;
  