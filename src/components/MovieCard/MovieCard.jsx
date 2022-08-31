import {Backdrop, Box, Card, Fade, Modal, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import ModalCard from "../ModalCard";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import posterPlaceholder from "../../assets/poster-placeholder.png";
import MovieRatings from "../MovieRatings/MovieRatings";
import useMovieCardStyles from "../../styles/movieCardStyles";
import sharedStyles from "../../styles/shared";

const MovieCard = (props) => {
   const {
      detailMode,
      handleShowModal,
      movie,
   } = props;

   MovieCard.propTypes = {
      detailMode: PropTypes.bool,
      handleShowModal: PropTypes.func,
      movie: PropTypes.object,
   };

   const [hovered, setHovered] = useState(false);

   const classes = {...useMovieCardStyles(), ...sharedStyles()};

   const hasPoster = movie.Poster !== "N/A"
   const cardExpand = hovered && detailMode ? "cardExpandOn" : "cardExpandOff";

   return (
      <>
         <Card raised={hovered}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => handleShowModal()}
            elevation={1} className={`${classes.movieCard} ${classes[cardExpand]}`}
         >
            <div className={classes.flexColumn}>
               {!hasPoster && (
                  <div className={`${classes.noPosterStyle} ${classes.flexColumn}`}>
                        <h3>{movie.Title}</h3>
                        <p>(No poster)</p>
                  </div>
               )}
               <img className={classes.cardImg} src={hasPoster ? movie.Poster : posterPlaceholder} alt={movie.Title}/>
            </div>
            <div className={classes.cardBottom}>
               <div className={`${classes.textSpacing} ${classes.title}`}>
                  <Typography variant="h6">
                     {/* <Box lineHeight={1}> */}
                        {`${movie.Title} (${movie.Year})`}
                     {/* </Box> */}
                  </Typography>
                  <Typography className={classes.genre}>
                     {/* <Box lineHeight={1}> */}
                        {movie.Genre}
                     {/* </Box> */}
                  </Typography>
               </div>
               {movie.Ratings?.length && detailMode &&
                  <MovieRatings 
                     ratings={movie.Ratings} 
                     title={movie.title}
                     imdbId={movie.imdbID}
                  />
               }
            </div>
         </Card>
      </>
   );
};

export default MovieCard;
