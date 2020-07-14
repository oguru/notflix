import React, {useState, useEffect} from "react";
import styles from "./ModalCard.module.scss";
import {Box, Grid, Card, Grow, Modal, Fade, Backdrop, Switch, Typography} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import posterPlaceholder from "../../assets/poster-placeholder.png"
import imdbIcon from "../../assets/imdb-logo.png"
import metaIcon from "../../assets/metacritic-icon.png"
import rtIcon from "../../assets/tomato-svg-logo-2.png"
import BottomScrollListener, { useBottomScrollListener } from 'react-bottom-scroll-listener';

const ModalCard = (props) => {
  const {modalState, modalData, movie, closeModal, detailMode, setMovieDetails} = props;

  const minModalWidth = 300;
  const minModalHeight = 460;

  const useStyles = makeStyles((theme) => ({

    cardImg: {
      display: "flex",
      justifyContent: "center",
      objectFit: "contain",
      maxHeight: "300px",
      minWidth: "250px",
      maxWidth: "260px",
      borderRadius: theme.spacing(0.5),
    },

    closeIcon: {
      position: "absolute",
      right: theme.spacing(2),
      top: theme.spacing(2),
      cursor: "pointer",
      transition: "0.2s",
      "&:hover": {
        transform: "scale(1.1)"
      }
    },

    flexColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center"
    },

    flexRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    },

    modalBody: {
      [theme.breakpoints.up('md')]: {
        height: "100%",
        paddingLeft: theme.spacing(1),
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column-reverse"
      }
    },

    modalCard: {
      position: "fixed",
      left: `calc(50vw - ${minModalWidth}px/2)`,
      top: `calc(50vh - ${minModalHeight}px/2)`,
      width: `${minModalWidth}px`,
      height: `${minModalHeight}px`,
      padding: theme.spacing(2),
      backgroundColor: "white",
      boxShadow: theme.shadows[5],
      borderRadius: theme.spacing(0.5),
      border: `${theme.palette.background.default} solid 15px`,
      overflow: "scroll",
      scrollbarWidth: "thin",
      [theme.breakpoints.up('sm')]: {
        left: `calc(50vw - ${minModalWidth*1.25}px/2)`,
        top: `calc(50vh - ${minModalHeight*1.25}px/2)`,
        width: `${minModalWidth*1.25}px`,
        height: `${minModalHeight*1.25}px`,
      },
      [theme.breakpoints.up('md')]: {
        left: `calc(50vw - ${minModalWidth*2.25}px/2)`,
        top: `calc(50vh - ${minModalHeight*1}px/2)`,
        width: `${minModalWidth*2.25}px`,
        height: `${minModalHeight*1}px`,
        overflow: "visible"
      },
    },

    modalContent: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center",
      [theme.breakpoints.up('md')]: {
        height: "300px",
        marginBottom: "15px",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start"
      }
    },

    plotTxt: {
      marginBottom: theme.spacing(2.5),
      [theme.breakpoints.up('md')]: {
        overflowY: "scroll",
        scrollbarWidth: "thin",
        height: "200px"
      }
    },
    
    rating: {
      height: theme.spacing(7),
      width: theme.spacing(5),
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "center"
    },

    ratingIcon: {
      height: theme.spacing(3),
      transition: "0.2s",
      "a": {
        outline: "0",
        border: "none"
      },
      "&:hover": {
        transform: "translate(0, -3px)",
        filter: "drop-shadow(0 3px 3px grey)"
        // transform: "translate(0, 5px)"
      }
    },
    
    scores: {
      display: "flex", 
      justifyContent: "space-around", 
      alignItems: "center",
      margin: `${theme.spacing(1.5)}px 0`,
      [theme.breakpoints.up('md')]: {
        justifyContent: "space-evenly",
        margin: `0 ${theme.spacing(5)}px`
      }
    },

    scoreText: {
      fontSize: "14px"
    },

    textBody: {
      fontSize: "14px",
      marginBottom: theme.spacing(1.25),
      [theme.breakpoints.up('md')]: {
        height: theme.spacing(30),
      }
    },

    textHead: {
      textDecoration: "underline",
      marginBottom: "5px"
    },
    
    textSpacing: {
      margin: theme.spacing(0.75)
    },

    title: {
      fontSize: "18px",
      marginBottom: theme.spacing(2),
      textAlign: "center"
    },
    
    yearTitle: {
      textAlign: "center",
      marginTop: theme.spacing(1.25),
      [theme.breakpoints.up('md')]: {
        textAlign: "left",
        marginTop: "0",
        marginBottom: "0"
      }
    }
  }));
  
  const classes = useStyles();

  let poster, noPosterTxt = ""; 
  
  if (movie.Poster === "N/A") {
    poster = posterPlaceholder;
    noPosterTxt = 
      <>
        <h3>{movie.Title}</h3>
        <p>(No poster)</p>
      </>
  } 
  else {
    poster = movie.Poster;
  }

  const getRating = (rating) => {
    const siteName = rating.Source;
    let siteIcon;
    let siteLink;

    switch (rating.Source) {
      case "Internet Movie Database":
        siteIcon = imdbIcon;
        siteLink = `https://www.imdb.com/title/${movie.imdbID}`;
        break;
      case "Rotten Tomatoes":
        siteIcon = rtIcon
        siteLink = `https://www.rottentomatoes.com/search?search=${movie.Title}`
        break;
      case "Metacritic":
        siteIcon = metaIcon
        siteLink = `https://www.metacritic.com/search/all/${movie.Title}/results`
        break;
      default: break;
    }

    return (
      <div className={classes.rating}>
        <a href={siteLink} rel={"noopener noreferrer"} target={"_blank"}>
          <img className={classes.ratingIcon} src={siteIcon} alt={siteName}/>
        </a>
        <Typography className={`${classes.textSpacing} ${classes.scoreText}`} component="p">{rating.Value}</Typography>
    </div>
    )

  }

  const movieRatings = () => {
    if (movie) {
      return (
        <section className={classes.scores}>
          {movie.Ratings.map(rating => getRating(rating))}
        </section>
      )
    }
  }

  const capitalise = word =>  word ? word.charAt(0).toUpperCase() + word.slice(1) : ""

  return (
    <>
      <article className={classes.modalCard}>
        <Typography className={`${classes.textSpacing} ${classes.title}`} variant="h6">
          <Box lineHeight={1}>
            {movie.Title}
          </Box>
        </Typography>
        <CloseIcon className={classes.closeIcon} onClick={() => closeModal()}/>
        <div className={classes.modalContent}>
          <img className={classes.cardImg} src={poster} alt={movie.Title}/>
          <div className={classes.modalBody}>
            <Typography className={`${classes.textBody} ${classes.yearTitle}`} component="p">({movie.Year} - {capitalise(movie.Type)})</Typography>
            <div>
              <Typography className={classes.textHead}component="p">Plot</Typography>
              <Typography className={`${classes.textBody} ${classes.plotTxt}`} component="p">{capitalise(movie.Plot)}</Typography>
            </div>
          </div>
        </div>
        {movieRatings()}
      </article>
    </>
  );
};

export default ModalCard;
