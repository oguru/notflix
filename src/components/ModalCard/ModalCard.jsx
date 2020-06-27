import React, {useState, useEffect} from "react";
import styles from "./ModalCard.module.scss";
import {Box, Grid, Grow, Modal, Fade, Backdrop, Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import posterPlaceholder from "../../assets/poster-placeholder.png"
import imdbIcon from "../../assets/imdb-logo.png"
import metaIcon from "../../assets/metacritic-icon.png"
import rtIcon from "../../assets/tomato-svg-logo-2.png"

const ModalCard = (props) => {
  const {modalState, modalData, movie, detailMode, setMovieDetails} = props;

  const useStyles = makeStyles((theme) => ({

    modalCard: {
      position: "fixed",
      left: "25vw",
      top: "25vh",
      width: "50vw",
      height: "50vh",
      backgroundColor: "#9DB9C9",
      boxShadow: theme.shadows[5],
      border: "black 2px solid"
    },

    rating: {
      height: "60px",
      width: "40px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center"
    },

    textSpacing: {
      margin: "4px"
    },

    flexColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center"
    },

  }));
  
  const classes = useStyles();

  let poster; 
  
  if (movie.Poster === "N/A") {
    poster = posterPlaceholder;
  } 
  else {
    poster = movie.Poster;
  }

  return (
    <>
        <div className={`${classes.flexColumn} ${classes.modalCard}`}>
          <Typography className={classes.textSpacing} variant="h6">
            <Box lineHeight={1}>
              {movie.Title}
            </Box>
          </Typography>
          <img className={classes.cardImg} src={poster} alt={movie.Title}/>
          <Typography className={classes.textSpacing} component="p">{movie.Year}</Typography>
          <section display="flex" justifyContent="space-around" alignItems="center">
              <div className={classes.rating}>
                <img src={imdbIcon} alt=""/>
                <Typography className={classes.textSpacing} component="p">{movie.imdbRating}</Typography>
              </div>
            </section>
        </div>
    </>
  );
};

export default ModalCard;
