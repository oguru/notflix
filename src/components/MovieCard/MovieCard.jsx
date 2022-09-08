import React, {useState} from "react";
import Card from "@material-ui/core/Card";
import MovieRatings from "../MovieRatings/MovieRatings";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import posterPlaceholder from "../../assets/poster-placeholder.png";

const MovieCard = (props) => {
   const {
      classes,
      detailMode,
      handleShowModal,
      movie
   } = props;

   MovieCard.propTypes = {
      classes: PropTypes.object,
      detailMode: PropTypes.bool,
      handleShowModal: PropTypes.func,
      movie: PropTypes.object
   };

   const [hovered, setHovered] = useState(false);
   const [noPoster, setNoPoster] = useState(movie.Poster === "N/A");

   const cardExpandClass = hovered && detailMode ? "cardExpandOn" : "cardExpandOff";

   return (
      <>
         <Card raised={hovered}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => handleShowModal()}
            elevation={1}
            className={`${classes.movieCard} ${classes[cardExpandClass]}`}
         >
            <div className={classes.flexColumn}>
               {noPoster && (
                  <div className={`${classes.noPosterStyle} ${classes.flexColumn}`}>
                     <h3>{movie.Title}</h3>
                     <Typography component="p">
                        (No poster)
                     </Typography>
                  </div>
               )}
               <img
                  className={classes.cardImg}
                  src={noPoster ? posterPlaceholder : movie.Poster}
                  onError={() => setNoPoster(true)}
                  alt={movie.Title}
               />
            </div>
            <div className={classes.cardBottom}>
               <div className={`${classes.textSpacing} ${classes.title}`}>
                  <Typography variant="h6">
                     {`${movie.Title} (${movie.Year})`}
                  </Typography>
                  <Typography className={classes.genre}>
                     {movie.Genre}
                  </Typography>
               </div>
               {movie.Ratings?.length && detailMode ?
                  <MovieRatings
                     ratings={movie.Ratings}
                     title={movie.title}
                     imdbId={movie.imdbID}
                  /> : null
               }
            </div>
         </Card>
      </>
   );
};

export default MovieCard;
