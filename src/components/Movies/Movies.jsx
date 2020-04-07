import React, { useState } from "react";
import styles from "./Movies.module.scss";
import GetMovies from "../GetMovies"
import MovieCard from "../MovieCard"

const Movies = (props) => {
  const { movie } = props;

  const [movieValues, storeMovieValues] = useState([]);

  return (
    <>
      <GetMovies searchTxt={movie} storeMovieValues={storeMovieValues} />
      <MovieCard movieValues={movieValues} />
    </>
  );
};

export default Movies;
