import {Box, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import React, { useState } from "react";
import MovieRatings from "../MovieRatings/MovieRatings";
import sharedStyles from "../../styles/shared";
import { useEffect } from "react";
import modalCardStyles from "../../styles/modalCardStyles";

const ModalCard = (props) => {
   const {
      closeModal,
      movie,
   } = props;

   ModalCard.propTypes = {
      closeModal: PropTypes.func,
      movie: PropTypes.object,
   };

   const getWidth = () => document.documentElement.clientWidth / 2;

   const [halfClientWidth, setHalfClientWidth] = useState(getWidth())

   useEffect(() => {
      const onResize = () => {
         let timer;
         return () => {
           if (timer) {
            clearTimeout(timer);
           }
           timer = setTimeout(() => setHalfClientWidth(getWidth()), 100);
         };
      }

      window.addEventListener("resize", onResize())

      return () => window.removeEventListener("resize", onResize())
   }, [])

   const minModalWidth = 300;
   const minModalHeight = 465;

   const classes = {
      ...modalCardStyles({minModalHeight, minModalWidth, halfClientWidth}), 
      ...sharedStyles()
   };

   const [isLoading, setIsLoading] = useState(true);

   const capitalise = word => word ? word.charAt(0).toUpperCase() + word.slice(1) : "";

   return (
      <>
         <article className={classes.modalCard}>
            <Typography className={`${classes.textSpacing} ${classes.title}`} variant="h6">
               <Box lineHeight={1}>
                  {movie.Title}
               </Box>
            </Typography>
            <CloseIcon
               className={classes.closeIcon}
               onClick={() => closeModal()}
            />
            <div className={classes.modalContent}>
               {movie.Poster !== "N/A" && 
                  <img
                     className={`${classes.cardImg} ${classes.modalImg}`}
                     src={movie.Poster}
                     alt={movie.Title}
                     onLoad={() => setIsLoading(false)}
                  />
               }
               {!isLoading && 
                  <div className={classes.modalBody}>
                     <Typography
                        className={`${classes.textBody} ${classes.yearTitle}`}
                        component="p">
                           ({movie.Year} - {capitalise(movie.Type)})
                     </Typography>
                     <div>
                        <Typography
                           className={classes.textHead}
                           component="p">
                              Plot
                        </Typography>
                        <Typography
                           className={`${classes.textBody} ${classes.plotTxt}`}
                           component="p">
                           {capitalise(movie.Plot)}
                        </Typography>
                     </div>
                  </div>
               }
            </div>
            {!isLoading && movie.Ratings &&
               <MovieRatings 
                  styles={classes.scoresModal}
                  ratings={movie.Ratings}
                  title={movie.title}
                  imdbId={movie.imdbID}
               />
            }
         </article>
      </>
   );
};

export default ModalCard;
