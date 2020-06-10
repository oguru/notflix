import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard"
import {Grid, Card} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { shadows } from '@material-ui/system';

const useStyles = makeStyles({
  gridCard: {
    width: "300px",
    height: "560px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& img": {
      objectFit: "contain"
    }
  },
  cardStyle: {
    width: "100%",
    height: "100%",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    textAlign: "center"
  },
})

const Dashboard = (props) => {

  const {movieResults, fetchData, movieDetails} = props;

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

  const classes = useStyles();

  const createMovieCards = () => {  
    
    return movieDetails.map((movie, index) => {
      return (
        <Grid key={movie.imdbID} onClick={() => showDetails(index)} className={classes.gridCard} item xs={12} sm={6} md={4} lg={3} xl={2} >
          <MovieCard movie={movie} index={index} />
        </Grid>
      )
    }
    )
  }

  const showDetails = index => {
    alert(index);
  }

  return (
    <>
      <Grid container>
        {createMovieCards()}
      </Grid>
    </>
  );
};

export default Dashboard;
