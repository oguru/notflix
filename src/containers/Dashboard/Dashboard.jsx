import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard"
import {Grid, Grow} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { shadows } from '@material-ui/system';

const useStyles = makeStyles({
  gridCard: {
    width: "100px",
    height: "460px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
})

const Dashboard = (props) => {

  const {movieResults, fetchData, movieDetails, detailMode} = props;

  useEffect(() => {
    if (movieResults.length > 0 && detailMode) {
      getMovieDetails(movieResults);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieResults]);
  
  // useEffect(() => {
  //   createMovieCards();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [movieDetails])
  
  const getMovieDetails = results => {
    results.forEach(result => fetchData(result.imdbID, "id"));
  };

  const classes = useStyles();

  // const growStatus = movieResults ? true : false;

  const createMovieCards = () => {  
    if (movieResults) {
      
      const detailType = detailMode ? movieDetails : movieResults;
      // const detailType = detailMode ? movieDetails : [].concat(...movieResults);

      return detailType.map((movie, index) => {
        return (
          <Grow in={true} appear={true}>
            <Grid key={movie.imdbID} onClick={() => showDetails(index)} className={classes.gridCard} item xs={12} sm={6} md={4} lg={3} xl={2} >
              <MovieCard movie={movie} index={index} detailMode={detailMode}/>
            </Grid>
          </Grow>
        )
      }
      )
    }
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
