import React, { useState, useEffect } from "react";
import styles from "./MovieCard.module.scss";
import Grid from '@material-ui/core/Grid';

const MovieCard = (props) => {
  const { modifiedResults } = props;


  // console.log(modifiedResults.map(movie => <p>{movie}</p>));
  

  const [pushedData, pushToArray] = useState([]);

  const showDetails = index => {
    alert(index);
  }

  useEffect(() => {
    const movieData = () => {
      return modifiedResults.map((movie, index) => {
        return (
          <Grid onClick={showDetails(index)} item xs={12} sm={6} md={4} lg={3} xl={2} className={styles.card}>
            <img src={movie.Poster} alt={movie.Title}/>
            <p>{movie.Title}</p>
            <p>{movie.Year}</p>
            <p>{movie.imdbID}</p>
          </Grid>
        )
      }
      )
    }
    if (modifiedResults) {
      pushToArray(movieData());
    }
  }, [modifiedResults]);


  return (
    <>
      <Grid container>
        {pushedData}
      </Grid>
    </>
  );
};


// const movieData = () => {
//   return (movieResults.map(movie =>
//     <p>{`${movie[0]}: ${movie[1]}`}</p>))
// }

export default MovieCard;
