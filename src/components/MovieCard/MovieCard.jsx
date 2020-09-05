import {Backdrop, Box, Card, Fade, Modal, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import ModalCard from "../ModalCard";
import PropTypes from "prop-types";
import imdbIcon from "../../assets/imdb-logo.png";
import {makeStyles} from "@material-ui/core/styles";
import metaIcon from "../../assets/metacritic-icon.png";
import posterPlaceholder from "../../assets/poster-placeholder.png";
import rtIcon from "../../assets/tomato-svg-logo-2.png";

const MovieCard = (props) => {
   const {
      detailMode,
      fetchData,
      modalData,
      movie,
      scrollbarWidth,
      storeModal
   } = props;

   MovieCard.propTypes = {
      detailMode: PropTypes.bool,
      fetchData: PropTypes.func,
      modalData: PropTypes.object,
      movie: PropTypes.object,
      scrollbarWidth: PropTypes.number,
      storeModal: PropTypes.func
   };

   const [hovered, setHovered] = useState(false);
   const [modalState, setModalState] = useState(false);
   const [noPosterTxt, setPosterTxt] = useState("");
   const [poster, setPoster] = useState("");

   useEffect(() => {
      getPoster();
   }, []);

   const useStyles = makeStyles((theme) => ({
      cardBottom: {
         display: "flex",
         flexDirection: "column",
         height: "160px",
         justifyContent: "space-between"
      },

      cardExpandOff: {
         transform: "scale(1)",
         transition: "0.2s ease-in-out"
      },

      cardExpandOn: {
         transform: "scale(1.075)",
         transition: "0.2s ease-in-out"
      },

      cardImg: {
         borderRadius: theme.spacing(0.5),
         maxHeight: "280px",
         maxWidth: "260px",
         minWidth: "230px",
         objectFit: "contain"
      },

      flexColumn: {
         alignItems: "center",
         display: "flex",
         flexDirection: "column",
         justifyContent: "flex-start"
      },

      genre: {
         fontSize: "14px",
         padding: theme.spacing(1, 0)
      },

      movieCard: {
         display: "flex",
         flexDirection: "column",
         height: "100%",
         justifyContent: "space-between",
         padding: theme.spacing(2.5),
         textAlign: "center",
         width: "300px"
      },

      noPosterStyle: {
         maxWidth: "60%",
         position: "absolute",
         top: theme.spacing(5)
      },

      rating: {
         alignItems: "center",
         display: "flex",
         flexDirection: "column",
         height: theme.spacing(6),
         justifyContent: "space-between",
         width: theme.spacing(5)
      },

      ratingIcon: {
         "&:hover": {
            filter: "drop-shadow(0 3px 3px grey)",
            transform: "translate(0, -3px)"
         },
         "a": {
            border: "none",
            outline: "0"
         },
         height: theme.spacing(3),
         transition: "0.2s"
      },

      scoreText: {
         fontSize: "14px"
      },

      scores: {
         alignItems: "center",
         display: "flex",
         justifyContent: "space-around"
      },

      scoresModal: {
         margin: `${theme.spacing(1.5)}px 0`,
         [theme.breakpoints.up("md")]: {
            justifyContent: "space-evenly",
            margin: `0 ${theme.spacing(5)}px`
         }
      },

      textSpacing: {
         margin: theme.spacing(1)
      },

      title: {
         alignItems: "center",
         display: "flex",
         flexDirection: "column",
         fontSize: "16px",
         height: "105px",
         justifyContent: "center"
      }
   }));

   const classes = useStyles();

   const showModal = () => {
      setModalState(true);

      if (detailMode) {
         storeModal(movie);
      } else {
         storeModal("");
         fetchData(movie.imdbID, "id");
      }
   };

   const closeModal = () => {
      setModalState(false);
   };

   const getPoster = () => {
      if (movie.Poster === "N/A") {
         setPoster(posterPlaceholder);
         setPosterTxt(<>
            <h3>{movie.Title}</h3>
            <p>(No poster)</p>
         </>);
      } else {
         setPoster(movie.Poster);
      }
   };

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
            siteIcon = rtIcon;
            siteLink = `https://www.rottentomatoes.com/search?search=${movie.Title}`;
            break;
         case "Metacritic":
            siteIcon = metaIcon;
            siteLink = `https://www.metacritic.com/search/all/${movie.Title}/results`;
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
      );
   };

   const movieRatings = (movieData, source) => {
      if (movieData) {
         const ratingClass = source === "modal" ? `${classes.scores} ${classes.scoresModal}` : `${classes.scores}`;

         return (
            <section className={ratingClass}>
               {movieData.Ratings.map(rating => getRating(rating))}
            </section>
         );
      }
   };

   const movieRatingsCheck = () => {
      if (detailMode) {
         return movieRatings(movie);
      }
   };

   const cardExpand = hovered && detailMode ? "cardExpandOn" : "cardExpandOff";

   console.log(typeof movieRatings);
   // console.log(typeof poster);

   return (
      <>
         <Card raised={hovered}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => showModal()}
            boxShadow={1} className={`${classes.movieCard} ${classes[cardExpand]}`}>
            <div className={classes.flexColumn}>
               <div className={`${classes.noPosterStyle} ${classes.flexColumn}`}>
                  {noPosterTxt}
               </div>
               <img className={classes.cardImg} src={poster} alt={movie.Title}/>
            </div>
            <div className={classes.cardBottom}>
               <div className={`${classes.textSpacing} ${classes.title}`}>
                  <Typography variant="h6">
                     <Box lineHeight={1}>
                        {`${movie.Title} (${movie.Year})`}
                     </Box>
                  </Typography>
                  <Typography className={classes.genre}
                     variant="p">
                     <Box lineHeight={1}>
                        {movie.Genre}
                     </Box>
                  </Typography>
               </div>
               {movieRatingsCheck()}
            </div>
         </Card>
         <Modal open={modalState}
            className={classes.modal}
            onClose={closeModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500
            }}>
            <Fade in={modalState}>
               <ModalCard
                  closeModal={closeModal}
                  movie={modalData}
                  detailMode={detailMode}
                  movieRatings={movieRatings}
                  movieCardStyles={classes}
                  poster={poster}
                  scrollbarWidth={scrollbarWidth} />
            </Fade>
         </Modal>
      </>
   );
};

export default MovieCard;
