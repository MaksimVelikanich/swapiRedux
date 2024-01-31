import { combineReducers } from 'redux';
import filmsReducer from './filmsReducer';
import aboutFilmReducer from './aboutFilmReducer';
import heroReducer from './heroReducer';


const rootReducer = combineReducers({
  films: filmsReducer,
  aboutFilm: aboutFilmReducer,
  hero: heroReducer, 
});

export default rootReducer;

