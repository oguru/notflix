import React, { useState, useEffect } from "react";
import styles from "./Movies.module.scss";
import MovieCard from "../MovieCard"
import Modal from "../Modal"
import Grid from '@material-ui/core/Grid';

const Movies = (props) => {
  const { movieName } = props;

  const [movieDetails, setMovieDetails] = useState([]);
  const [singleMovie, setSingleMovie] = useState()
  const [modifiedResults, setModifiedResults] = useState("");

  // const setState = (result, parameter) => {
    
  //   if (parameter.split("")[0] === "i") { //if input is an imdb ID
      
  //     return result;
  //     // console.log(parameter);
      
  //     // setSingleMovie(result); //set movie details in movieDetails state array
  //     // console.log("set movie details");
  //   }
  //   else { //If input is a movie name
  //     setMovieResults(result); //set basic movie array in movieResults state
  //   }
  // }


  // const appendDetails = () => {
  //   setModifiedResults(movieResults.Search.map(movie => {
  //     return Object.assign(movie, {score: movieDetails.imdbRating});
  //     })
  //   )
  // }


  const getImdbScore = (imdbId) => {

  }
  


  return (
    <>
      {/* <Modal fetchData={fetchData} movieResults={movieResults} setMovieDetails={setMovieDetails}, movieDetails={movieDetails} />
      <MovieCard modifiedResults={modifiedResults.Search} /> */}
    </>
  );
};

export default Movies;
