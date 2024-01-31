import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchFilmDetails } from '../store/aboutFilmActions';
import { resetFilmDetails } from '../store/aboutFilmActions';

import star from '../img/star.jpeg';

const AboutFilm = () => {
  const dispatch = useDispatch();
  const selectedFilm = useSelector((state) => state.hero.selectedFilm);

  const filmInf = selectedFilm.url;
  const getFilmIndexByUrl = (url) => {
    const matches = url.match(/\/films\/(\d+)/);
    return matches ? matches[1] : null;
  };
  const filmId = getFilmIndexByUrl(filmInf);

  const filmDetails = useSelector((state) => state.aboutFilm.filmDetails);
  const characters = useSelector((state) => state.aboutFilm.characters);
  const planets = useSelector((state) => state.aboutFilm.planets);
  const starships = useSelector((state) => state.aboutFilm.starships);
  const vehicles = useSelector((state) => state.aboutFilm.vehicles);
  const species = useSelector((state) => state.aboutFilm.species);


  useEffect(() => {
    if (filmId) {
      dispatch(resetFilmDetails());

      dispatch(fetchFilmDetails(filmId));
      
    }
  }, [dispatch, filmId]);

  const navigate = useNavigate();

  const navigateToCharacter = (url) => {
    const match = url.match(/\/people\/(\d+)/);
    if (match) {
      const id = match[1];
      navigate(`/character/${id}`);
    }
  };

  if (!filmDetails) {
    return <p>Loading...</p>;
  }


  return (
    
    <div className='block'>
      <img src={star} alt='star' className='backStar' />
      <div className='filmInfo'>
        <p id="mainTitle"><span id='tekst'>{filmDetails.title}</span></p>
        <p id="mainDirector"><span id='tekst'>Director:</span> {filmDetails.director}</p>
        <p id="mainReleaseDate"><span id='tekst'>Release Date:</span> {filmDetails.release_date}</p>
        <p id="mainProducer"><span id='tekst'>Producer:</span> {filmDetails.producer}</p>
        <p id="mainOpening"><span id='tekst'>Opening:</span> {filmDetails.opening_crawl}</p>

        <div className='detailsInfo'>
        <div className='planets'>
          <p id="details">Planets:</p>
          {planets.map((planet, filmIndex) => (
            <p key={filmIndex}>{planet.name}</p>
          ))}
        </div>


          <div className="starships">
            <p id="details">Starships:</p>
            {starships.map((starship, filmIndex) => (
              <p key={filmIndex}>{starship.name}</p>
            ))}
          </div>

          <div className="vehicles">
            <p id="details">Vehicles:</p>
            {vehicles.map((vehicle, filmIndex) => (
              <p key={filmIndex}>{vehicle.name}</p>
            ))}
          </div>

          <div className="species">
            <p id="details">Species:</p>
            {species.map((specie, filmIndex) => (
              <p key={filmIndex}>{specie.name}</p>
            ))}
          </div>
          
          <div className="hero">
            <p id="details">Characters:</p>
            {characters.map((character, filmIndex) => (
              <p id="focus" key={filmIndex} onClick={() => navigateToCharacter(character.url)}>{character.name}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutFilm;

