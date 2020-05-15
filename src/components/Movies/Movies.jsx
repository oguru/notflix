import React, { useState, useEffect } from "react";
import styles from "./Movies.module.scss";
import MovieCard from "../MovieCard"
import Modal from "../Modal"
import Grid from '@material-ui/core/Grid';

const Movies = (props) => {
  const { movieName } = props;

  const [movieResults, setMovieResults] = useState();
  const [movieDetails, setMovieDetails] = useState([]);
  const [singleMovie, setSingleMovie] = useState()
  const [modifiedResults, setModifiedResults] = useState("");

  const setState = (result, parameter) => {
    
    if (parameter.split("")[0] === "i") { //if input is an imdb ID
      
      return result;
      // console.log(parameter);
      
      // setSingleMovie(result); //set movie details in movieDetails state array
      // console.log("set movie details");
    }
    else { //If input is a movie name
      setMovieResults(result); //set basic movie array in movieResults state
    }
  }

  const fetchData = input => {
    let parameter;
    let numbers = "";
    
    if (input && input.match(/\d+/g)) { //If input contains numbers
      numbers = input.match(/\d+/g)[0].split(""); //set numbers in numbers variable
    }

    const letters = input.match(/[a-zA-Z]+/g)[0]; //set letters from input

    if (numbers.length === 7 && letters === "tt") { //If input is an imdb ID
      parameter = `i=${input}`; //search by imdb ID
    }
    else { //If input is a movie name
      parameter = `s=${input}` //search by movie name
    }

    fetch(`https://www.omdbapi.com/?apikey=a6790f0e&${parameter}`)
    .then(result => result.json())
    .then(result => setState(result, parameter))
    .catch(err => console.log(err))
  }

  // const appendDetails = () => {
  //   setModifiedResults(movieResults.Search.map(movie => {
  //     return Object.assign(movie, {score: movieDetails.imdbRating});
  //     })
  //   )
  // }


  const getImdbScore = (imdbId) => {

  }
  
  useEffect(() => {
    // if (movieDetails) {
    //   // console.log(movieDetails);
      
    //   // appendDetails();
    // }
    if (movieResults) {
      // movieResults.Search.map(movie => console.log(movie));
      // console.log(detailsArray);
        // console.log(movieResults.Search.map(movie => movie.imdbID))

        // getMovieDetails()

    }
    else if (movieName) {      
      fetchData(movieName);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieName, movieResults, movieDetails]);

  return (
    <>
      <Modal fetchData={fetchData} movieResults={movieResults} setMovieDetails={setMovieDetails}, movieDetails={movieDetails} />
      <MovieCard modifiedResults={modifiedResults.Search} />
    </>
  );
};

export default Movies;
