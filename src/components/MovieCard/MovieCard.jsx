import React from "react";
import styles from "./MovieCard.module.scss";
import { useState } from "react";
import { useEffect } from "react";

const MovieCard = (props) => {
  const { movieValues } = props;

  const [pushedData, pushToArray] = useState([]);

  useEffect(() => {
    if (movieValues) {
      pushToArray(movieData());
    }
  }, [movieValues]);

  const movieData = () => {
    return (movieValues.map(movie =>
      <p>{`${movie[0]}: ${movie[1]}`}</p>))
  }

  return (
    <>
      <div>
        {pushedData}
      </div>
    </>
  );
};

export default MovieCard;
