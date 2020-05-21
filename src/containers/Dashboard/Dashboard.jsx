import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.scss";
import Movies from "../../components/Movies"
import Grid from '@material-ui/core/Grid';

const Dashboard = (props) => {

  const {movieResults, fetchData, movieDetails} = props;

  const [movieHtml, storeMovieHtml] = useState("")

  useEffect(() => {
    if (movieResults && movieDetails.length === movieResults.length) {
      createMovieCards();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieDetails])

  useEffect(() => {
    if (movieResults) {
      getMovieDetails(movieResults);
      // createMovieCards();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieResults]);

  const getMovieDetails = results => {
    results.forEach(result => fetchData(result.imdbID, "id"));
  };

  const createMovieCards = () => {      
    const movieMap = movieResults.map((movie, index) => {
      // const imdbId = movie.imdbID;
      
      return (
        <Grid key={movie.imdbID} onClick={() => showDetails(index)} item xs={12} sm={6} md={4} lg={3} xl={2} className={styles.card}>
          <img src={movie.Poster} alt={movie.Title}/>
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
          {/* <p>Score: {movieDetails[movie.imdbID].imdbRating}</p> */}

        </Grid>
      )
    }
    )
    storeMovieHtml(movieMap)
    for (let i = 0; i<movieDetails.length; i++) {
      console.log(movieDetails[i].Title)
      console.log(movieResults[i].Title)
    }
  }



  const showDetails = index => {
    alert(index);
  }

  return (
    <>
      {/* <Movies movieName={movieName} /> */}
      <Grid container>
        {movieHtml}
      </Grid>
    </>
  );
};

export default Dashboard;
