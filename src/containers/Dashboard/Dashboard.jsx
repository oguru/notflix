import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.scss";
import Movies from "../../components/Movies"
import {Grid, Card} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Dashboard = (props) => {

  const {movieResults, fetchData, movieDetails} = props;

  const [movieHtml, storeMovieHtml] = useState("")

  useEffect(() => {
    if (movieResults) {
      getMovieDetails(movieResults);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieResults]);

  useEffect(() => {
    createMovieCards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieDetails])

  const getMovieDetails = results => {
    results.forEach(result => fetchData(result.imdbID, "id"));
  };

  const useStyles = makeStyles({
    cardStyle: {
      width: "300px",
      height: "500px",
      padding: "10px"
    },
    cardImg: {
      width: "280px",
      height: "415px",
      objectFit: "cover"
    }
  })

  const classes = useStyles();

  const createMovieCards = () => {      
    const movieMap = movieDetails.map((movie, index) => {
      return (
        <Grid key={movie.imdbID} onClick={() => showDetails(index)} item xs={12} sm={6} md={4} lg={3} xl={2} >
          <Card className={classes.cardStyle}>
            <img className={classes.cardImg} src={movie.Poster} alt={movie.Title}/>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <p>{movie.imdbRating}</p>
            {/* <p>{movieDetails[imdbId]}</p> */}
          </Card>
        </Grid>
      )
    }
    )
    storeMovieHtml(movieMap)
  }



  const showDetails = index => {
    alert(index);
  }

  return (
    <>
      <Grid container>
        {movieHtml}
      </Grid>
    </>
  );
};

export default Dashboard;
