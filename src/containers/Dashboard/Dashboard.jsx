import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.scss";
import Movies from "../../components/Movies"
import Grid from '@material-ui/core/Grid';

const Dashboard = (props) => {

  const {movieName, fetchData, movieResults, setMovieDetails} = props;
  
  const [movieHtmlArr, storeMovieHtml] = useState([]);

  useEffect(() => {
    const movieData = () => {
      
      return movieResults.map((movie, index) => {
        return (
          <Grid key={movie.imdbId} onClick={() => showDetails(index)} item xs={12} sm={6} md={4} lg={3} xl={2} className={styles.card}>
            <img src={movie.Poster} alt={movie.Title}/>
            <p>{movie.Title}</p>
            <p>{movie.Year}</p>
            <p>{movie.imdbID}</p>
          </Grid>
        )
      }
      )
    }
    if (movieResults) {
      storeMovieHtml(movieData());
      // console.log(movieResults.map(movie => fetchData(movie.imdbID)))
      
      // setMovieDetails()
    }

    // if (movieHtmlArr) {
    //   fetchData()
    // }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieResults]);

  const showDetails = index => {
    alert(index);
  }

  return (
    <>
      {/* <Movies movieName={movieName} /> */}
      <Grid container>
        {movieHtmlArr}
      </Grid>
    </>
  );
};

export default Dashboard;
