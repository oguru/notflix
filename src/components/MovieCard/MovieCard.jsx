import React, { useState, useEffect } from "react";
import styles from "./MovieCard.module.scss";
import {Grid, Card} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  "img": {
      objectFit: "contain"
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


const MovieCard = (props) => {
  const { movie, index } = props;

  const [hovered, setHovered] = useState(false)
  
  const classes = useStyles();

  return (
    <>
      <Card raised={hovered} 
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} boxShadow={1} className={`${classes.cardStyle}`}>
          <img className={classes.cardImg} src={movie.Poster} alt={movie.Title}/>
          <div>
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <p>{movie.imdbRating}</p>
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
