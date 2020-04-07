import React from "react";
import styles from "./GetMovies.module.scss";
import { useEffect } from "react";

const GetMovies = props => {

  const { searchTxt, storeMovieValues } = props;

  useEffect(() => {
    if (searchTxt) {
      const changeTxt = searchTxt.split(" ").join("+");

      fetch(`http://www.omdbapi.com/?apikey=a6790f0e&t=${changeTxt}`)
        .then(result => result.json())
        .then(result => {
          const fetchedData = Object.entries(result);
          updateMovie(fetchedData);
        })
        .catch(err => console.log(err))
    }
  }, [searchTxt]);

  const updateMovie = (fetchedData) => {
    storeMovieValues(fetchedData);
  };

  return (
    <>
    </>
  );
};

export default GetMovies;
