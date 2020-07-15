import React, { useState, useEffect } from "react";
import {Backdrop, Fade, Card, Modal, Typography, Box} from '@material-ui/core';
import ModalCard from "../ModalCard";
import { makeStyles } from '@material-ui/core/styles';
import posterPlaceholder from "../../assets/poster-placeholder.png"
import imdbIcon from "../../assets/imdb-logo.png"
import metaIcon from "../../assets/metacritic-icon.png"
import rtIcon from "../../assets/tomato-svg-logo-2.png"

const MovieCard = (props) => {
  const { movie, detailMode, modalData, storeModal, fetchData, scrollbarWidth } = props;

  const [modalState, setModalState] = useState(false);
  const [hovered, setHovered] = useState(false)
  const [poster, setPoster] = useState("")
  
  useEffect(() => {
    getPoster()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [movie])

  const useStyles = makeStyles((theme) => ({
    
    cardBottom: {
      height: "130px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    },

    cardExpandOn: {
      transform: "scale(1.075)",
      transition: "0.2s ease-in-out"
    },
    
    cardExpandOff: {
      transform: "scale(1)",
      transition: "0.2s ease-in-out"
    },

    cardImg: {
      objectFit: "contain",
      maxHeight: "300px",
      minWidth: "250px",
      maxWidth: "260px",
      borderRadius: theme.spacing(0.5)
    },
    
    flexColumn: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center"
    },

    movieCard: {
      width: "300px",
      height: "100%",
      padding: theme.spacing(2.5),
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      textAlign: "center",
      },
    
    noPosterStyle: {
      position: "absolute",
      top: theme.spacing(5),
      maxWidth: "60%"
    },
        
    rating: {
      height: theme.spacing(6),
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
      }
    },   

    scores: {
      display: "flex", 
      justifyContent: "space-around", 
      alignItems: "center"
    },

    scoresModal: {
      margin: `${theme.spacing(1.5)}px 0`,
      [theme.breakpoints.up('md')]: {
        justifyContent: "space-evenly",
        margin: `0 ${theme.spacing(5)}px`
      }
    },

    scoreText: {
      fontSize: "14px"
    },

    textSpacing: {
      margin: theme.spacing(1)
    },
    
    title: {
      fontSize: "16px",
      height: "75px",
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center"
    },
  }));
  
  const classes = useStyles();

  const showModal = (movie) => {
    setModalState(true)
    if (detailMode) {
        storeModal(movie)
      }
    else {
      storeModal("")
        fetchData(movie.imdbID, "id")
      }
  }

  const closeModal = () => {
    setModalState(false)
  }
  
  let noPosterTxt = ""; 
  
  const getPoster = () => {
    if (movie.Poster === "N/A") {
      setPoster(posterPlaceholder);
      noPosterTxt = 
        <>
          <h3>{movie.Title}</h3>
          <p>(No poster)</p>
        </>
    } 
    else {
      setPoster(movie.Poster);
    }
  }

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
      <div className={`${classes.rating} ${classes.ratingModal}`}>
        <a href={siteLink} onClick={(event) => event.stopPropagation()} rel={"noopener noreferrer"} target={"_blank"}>
          <img className={classes.ratingIcon} src={siteIcon} alt={siteName}/>
        </a>
        <Typography className={classes.scoreText} component="p">{rating.Value}</Typography>
    </div>
    )
  }

  const movieRatings = (movie, source) => {
    if (movie) {

      const ratingClass = source === "modal" ? `${classes.scores} ${classes.scoresModal}` : `${classes.scores}`;

      return (
        <section className={ratingClass}>
          {movie.Ratings.map(rating => getRating(rating))}
        </section>
      )
    }
  }

  const movieRatingsCheck = () => {
    if (detailMode) {
      return movieRatings(movie);
    }
  }

  const cardExpand = ((hovered && detailMode) ? "cardExpandOn" : "cardExpandOff");

  return (
    <>
      <Card raised={hovered} 
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} 
        onClick={() => showModal(movie)}
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
            {movieRatingsCheck()}
          </div>
        </Card>
        <Modal open={modalState}
        className={classes.modal}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
          <Fade in={modalState}>
            <ModalCard closeModal={closeModal} movie={modalData} detailMode={detailMode} movieRatings={movieRatings} movieCardStyles={classes} poster={poster} scrollbarWidth={scrollbarWidth} />
          </Fade>
        </Modal>
    </>
  );
};

export default MovieCard;
