import React, { useState, useEffect } from "react";
import styles from "./MovieCard.module.scss";
import {Grid, Card, Typography, Grow, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useImage from 'use-image';
import posterPlaceholder from "../../assets/poster-placeholder.png"
import imdbIcon from "../../assets/imdb-logo.png"
import metaIcon from "../../assets/metacritic-icon.png"
import rtIcon from "../../assets/tomato-svg-logo-2.png"

const MovieCard = (props) => {
  const { movie, detailMode, showModal, index, setImgCount, imgCount, movieImages } = props;

  const [hovered, setHovered] = useState(false)
  const [hoverLink, setHoverLink] = useState(false)
  
  const useStyles = makeStyles((theme) => ({
    
    movieCard: {
      width: "300px",
      height: "100%",
      padding: theme.spacing(2.5),
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      textAlign: "center",
      },
      
    flexColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center"
    },
    
    noPosterStyle: {
      position: "absolute",
      top: theme.spacing(5),
      maxWidth: "60%"
    },
    
    textSpacing: {
      margin: "5px"
    },
    
    cardImg: {
      objectFit: "contain",
      maxHeight: "300px",
      minWidth: "250px",
      maxWidth: "260px",
      // marginBottom: "10px",
      borderRadius: theme.spacing(0.5)
    },
    
    title: {
      fontSize: "16px",
      height: "75px",
      // marginBottom: "15px",
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center"
    },

    cardBottom: {
      height: "130px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },
    
    scores: {
      display: "flex", 
      justifyContent: "space-around", 
      alignItems: "center"
    },

    scoreText: {
      fontSize: "14px"
    },
    
    rating: {
      height: "55px",
      width: "40px",
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
    
    cardExpandOn: {
      transform: "scale(1.075)",
      transition: "0.2s ease-in-out"
    },
    
    cardExpandOff: {
      transform: "scale(1)",
      transition: "0.2s ease-in-out"
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
  
  // const movieRating = () => detailMode ? movie.imdbRating : "";

  const getRating = rating => {
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
      <div onMouseEnter={() => setHoverLink(true)} onMouseOut={() => setHoverLink(false)} className={classes.rating}>
        <a href={siteLink} rel={"noopener noreferrer"} target={"_blank"}>
          <img className={classes.ratingIcon} src={siteIcon} alt={siteName}/>
        </a>
        <Typography className={`${classes.textSpacing} ${classes.scoreText}`} component="p">{rating.Value}</Typography>
    </div>
    )

  }

  const movieRatings = () => {
    if (detailMode) {
      return (
        <section className={classes.scores}>
          {movie.Ratings.map(rating => getRating(rating))}
        </section>
      )
    }
    return ""
  }

  const cardExpand = ((hovered && detailMode) ? "cardExpandOn" : "cardExpandOff");

  return (
    <>
      <Card raised={hovered} 
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} 
        onClick={() => showModal(movie, hoverLink)}
        boxShadow={1} className={`${classes.movieCard} ${classes[cardExpand]}`}>
          <div className={classes.flexColumn}>
            <div className={`${classes.noPosterStyle} ${classes.flexColumn}`}>
              {noPosterTxt}
            </div>
            <img className={classes.cardImg} src={poster} alt={movie.Title}/>
          </div>
          <div className={classes.cardBottom}>
            <Typography className={`${classes.textSpacing} ${classes.title}`} variant="h6">
              <Box lineHeight={1}>
                {`${movie.Title} (${movie.Year})`}
              </Box>
            </Typography>
            {/* <Typography className={classes.textSpacing} component="p">{movie.Year}</Typography> */}
            {movieRatings()}
          </div>
          {/* <p>{movieDetails[imdbId]}</p> */}
        </Card>
    </>
  );
};

export default MovieCard;
