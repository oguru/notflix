import React, { useState, useEffect } from "react";
import styles from "./MovieCard.module.scss";
import {Grid, Card, Typography, Grow, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const MovieCard = (props) => {
  const { movie, detailMode, index } = props;

  const [hovered, setHovered] = useState(false)

  const useStyles = makeStyles((theme) => ({

    movieCard: {
      width: "100%",
      height: "100%",
      padding: "22px 10px 10px 10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      textAlign: "center",
      // p: {
      //   color: theme.palette.common.white
      // }
    },

    textSpacing: {
      margin: "16px"
    },

    cardImg: {
      objectFit: "contain",
      maxHeight: "360px",
    },

    cardExpandOn: {
      transform: "scale(1.1)",
      transition: "0.2s ease-in-out"
    },

    cardExpandOff: {
      transform: "scale(1)",
      transition: "0.2s ease-in-out"
    }
  }));
  
  const classes = useStyles();

  const movieRating = () => detailMode ? movie.imdbRating : "";

  const cardExpand = ((hovered && detailMode) ? "cardExpandOn" : "cardExpandOff");


  // const hoverAnimation = (movie) => {

  // }

  return (
    <>
      <Card raised={hovered} 
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} boxShadow={1} className={`${classes.movieCard} ${classes[cardExpand]}`}>
            <img className={classes.cardImg} src={movie.Poster} alt={movie.Title}/>
          <div >
            <Typography className={classes.textSpacing} variant="h6">
              <Box lineHeight={1}>
                {movie.Title}
              </Box>
            </Typography>
            <Typography className={classes.textSpacing} component="p">{movie.Year}</Typography>
            <Typography className={classes.textSpacing} component="p">{movieRating()}</Typography>
          </div>
          {/* <p>{movieDetails[imdbId]}</p> */}
        </Card>
    </>
  );
};


// const movieData = () => {
//   return (movieResults.map(movie =>
//     <p>{`${movie[0]}: ${movie[1]}`}</p>))
// }

export default MovieCard;
