import React, { useState, useEffect } from "react";
// import styles from "./Dashboard.module.scss";
import Movies from "../../components/Movies"
import {Grid, Card} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {createUseStyles} from "react-jss";

const useStyles = makeStyles({
  gridCard: {
    width: "300px",
    height: "500px",
    padding: "10px",
    border: "black, 10px, solid",
    "& $cardStyle": {
      width: "280px",
      height: "415px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    "& img": {
      objectFit: "contain"
    }
  },
  
})

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

  const classes = useStyles();

  const createMovieCards = () => {      
    const movieMap = movieDetails.map((movie, index) => {
      return (
        <Grid key={movie.imdbID} onClick={() => showDetails(index)} className={classes.gridCard} item xs={12} sm={6} md={4} lg={3} xl={2} >
          <Card className={classes.cardStyle}>
            <img className={classes.cardImg} src={movie.Poster} alt={movie.Title}/>
            <div>
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>
              <p>{movie.imdbRating}</p>
            </div>
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
