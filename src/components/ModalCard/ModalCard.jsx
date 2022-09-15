import React, {useEffect, useState} from "react";
import CloseIcon from "@material-ui/icons/Close";
import MovieRatings from "../MovieRatings/MovieRatings";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import posterPlaceholder from "../../assets/poster-placeholder.png";
import useModalCardStyles from "../../styles/modalCardStyles";
import useSharedStyles from "../../styles/shared";

const ModalCard = ({closeModal, movie}) => {
   ModalCard.propTypes = {
      closeModal: PropTypes.func,
      movie: PropTypes.object
   };

   const getWidth = () => document.documentElement.clientWidth;
   const getHeight = () => document.documentElement.clientHeight;
   const upperFirst = text => text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

   const [noPoster, setNoPoster] = useState(movie.Poster === "N/A");
   const [clientDimensions, setClientDimensions] = useState({
      width: getWidth(),
      height: getHeight()
   });

   const medScreenPlus = clientDimensions.width >= 960;

   const getModalHeight = () => {
      const {height} = clientDimensions;

      if (!medScreenPlus) {
         if (height > 550) {
            return height * 0.8;
         }

         return height;
      }

      return 465;
   };

   const getModalWidth = () => {
      const {width} = clientDimensions;

      if (width < 400) {
         return width;
      }

      if (width < 600) {
         return width * 0.9;
      }

      if (!medScreenPlus) {
         return width * 0.8;
      }

      return 750;
   };

   const classes = {
      ...useSharedStyles(),
      ...useModalCardStyles({
         modalHeight: getModalHeight(),
         modalWidth: getModalWidth(),
         halfClientWidth: clientDimensions.width / 2
      })
   };

   useEffect(() => {
      const onResize = () => {
         let timer;

         return () => {
            if (timer) {
               clearTimeout(timer);
            }

            timer = setTimeout(() => setClientDimensions({
               width: getWidth(),
               height: getHeight()
            }), 100);
         };
      };

      window.addEventListener("resize", onResize());

      return () => window.removeEventListener("resize", onResize());
   }, []);

   return (
      <>
         <article className={`${classes.modalCard}`}>
            <div className={`${classes.flexRow} ${classes.titleBar}`}>
               <Typography
                  className={`${classes.title}`}
                  variant="h6"
               >
                  {movie.Title}
                  {medScreenPlus &&
                        <span>({movie.Year} {upperFirst(movie.Type)})</span>
                  }
               </Typography>
               <CloseIcon
                  fontSize="inherit"
                  className={classes.closeIcon}
                  onClick={() => closeModal()}
               />
            </div>
            <div className={`${classes.modalContent} ${classes.customScrollbar}`}>
               <img
                  className={`${classes.cardImg} modalImg`}
                  src={noPoster ? posterPlaceholder : movie.Poster}
                  alt={movie.Title}
                  onError={() => setNoPoster(true)}
               />
               <div className={classes.modalBody}>
                  {!medScreenPlus && (
                     <Typography
                        className={`${classes.textBody} ${classes.yearTitle}`}
                        component="p">
                                 ({movie.Year} - {upperFirst(movie.Type)})
                     </Typography>
                  )}
                  <div className={classes.plotCont}>
                     <Typography
                        className={classes.textHead}
                        component="p">
                                 Plot
                     </Typography>
                     <Typography
                        className={`${classes.textBody} ${classes.plotTxt} ${classes.customScrollbar}`}
                        component="p">
                        {upperFirst(movie.Plot)}
                     </Typography>
                  </div>
                  {movie.Ratings &&
                     <MovieRatings
                        styles={classes.scoresModal}
                        ratings={movie.Ratings}
                        title={movie.title}
                        imdbId={movie.imdbID}
                     />
                  }
               </div>
            </div>
         </article>
      </>
   );
};

export default ModalCard;
