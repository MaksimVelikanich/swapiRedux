import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFilms } from '../store/filmsReducer';
import { useNavigate } from 'react-router-dom';

import space from '../img/space.jpeg';
import { setSelectedFilm } from '../store/heroReducer';

function Films() {
  const dispatch = useDispatch();
  const films = useSelector((state) => state.films.films);
  

  useEffect(() => {
    dispatch(fetchFilms());
  }, [dispatch]);

  const navigate = useNavigate();

  const navigateToAboutFilm = (film, index) => {
    dispatch(setSelectedFilm(film))
    const getFilmIndexByUrl = (url) => {
      const matches = url.match(/\/films\/(\d+)/);
      return matches ? matches[1] : null;
    }
    const filmId = getFilmIndexByUrl(film.url);
    navigate(`/about-film/${filmId}`);

  };

  return (
    <div className="container">
      <img src={space} alt='space' className='backSpace' />
      <div className="content">
        <div className='filmsInfo'>
          {films.map((film, index) => (
            <div key={index} className="filmsAbout" onClick={() => navigateToAboutFilm(film, index)}>
              <p id="title">{film.title}</p>
              <p id="director"> {film.director}</p>
              <p id="release"> {film.release_date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Films;
