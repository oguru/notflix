import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard"
import {Grid, Grow} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const Dashboard = (props) => {
  
  const {movieResults, fetchData, movieDetails, detailMode, storeModal, modalData, scrollbarWidth} = props;
    
  const [imgCount, setImgCount] = useState(0)
  const [cardHeight, setCardHeight] = useState(500)
  
  useEffect(() => {
    if (movieResults.length > 0 && detailMode) {
      getMovieDetails(movieResults);
    }
    if (detailMode) {
      setCardHeight(500)
    }
    else {
      setCardHeight(450)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieResults]);

  const useStyles = makeStyles((theme) => ({
    gridCard: {
      height: `${cardHeight}px`,
      padding: theme.spacing(1.5),
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },

    initTxt: {
      color: theme.palette.text.primary,
      fontStyle: "italic",
      margin: theme.spacing(1)
    }
  }))

  const classes = useStyles();

  const getMovieDetails = results => {
    results.forEach(result => fetchData(result.imdbID, "id"));
  };      
  
  const createMovieCards = () => {  
    if (movieResults.length > 0) {
      const resultsCopy = detailMode ? [...movieDetails] : [...movieResults];
      const movieImages = resultsCopy.map((movie) => {
         const moviePoster = new Image();
         moviePoster.src = movie.Poster;
         return moviePoster;
      })

      const detailType = detailMode ? movieDetails : movieResults;

      return detailType.map((movie, index) => {
        return (
          <Grow in={true}>
            <Grid  key={movie.imdbID} 
            className={classes.gridCard} item xs={12} sm={6} md={4} lg={3} xl={2} >
              <MovieCard fetchData={fetchData} movie={movie} modalData={modalData} storeModal={storeModal} movieImages={movieImages} index={index} detailMode={detailMode} imgCount={imgCount} setImgCount={setImgCount} scrollbarWidth={scrollbarWidth}/>
            </Grid>
          </Grow>
        )
      }
      )
    }

    return (
      <p className={classes.initTxt}>Type a movie name in the search bar to get started...</p>
    )
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
