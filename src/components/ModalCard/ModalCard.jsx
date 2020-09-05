import {Box, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const ModalCard = (props) => {
   const {
      closeModal,
      movie,
      movieCardStyles,
      movieRatings,
      poster,
      scrollbarWidth
   } = props;

   ModalCard.propTypes = {
      closeModal: PropTypes.func,
      movie: PropTypes.object,
      movieCardStyles: PropTypes.object,
      movieRatings: PropTypes.func,
      poster: PropTypes.string,
      scrollbarWidth: PropTypes.number
   };

   const minModalWidth = 300;
   const minModalHeight = 465;

   const useStyles = makeStyles((theme) => ({

      closeIcon: {
         "&:hover": {
            transform: "scale(1.1)"
         },
         cursor: "pointer",
         position: "absolute",
         right: theme.spacing(0.75),
         top: theme.spacing(0.75),
         transition: "0.2s",
         [theme.breakpoints.up("md")]: {
            right: theme.spacing(2),
            top: theme.spacing(2)
         }
      },

      flexColumn: {
         alignItems: "center",
         display: "flex",
         flexDirection: "column",
         justifyContent: "space-between"
      },

      flexRow: {
         alignItems: "center",
         display: "flex",
         justifyContent: "space-between"
      },

      modalBody: {
         width: "100%",
         [theme.breakpoints.up("md")]: {
            display: "flex",
            flexDirection: "column-reverse",
            height: "100%",
            justifyContent: "space-between",
            paddingLeft: theme.spacing(1)
         }
      },

      modalCard: {
         backgroundColor: "white",
         border: `${theme.palette.background.default} solid ${theme.spacing(2)}px`,
         borderRadius: theme.spacing(0.5),
         boxShadow: theme.shadows[5],
         height: `${minModalHeight}px`,
         left: `calc(50vw - ${minModalWidth}px/2 - ${scrollbarWidth}px/2)`,
         overflow: "scroll",
         padding: theme.spacing(2),
         position: "fixed",
         scrollbarWidth: "thin",
         top: `calc(50vh - ${minModalHeight}px/2)`,
         width: `${minModalWidth}px`,
         [theme.breakpoints.up("sm")]: {
            height: `${minModalHeight * 1.25}px`,
            left: `calc(50vw - ${minModalWidth * 1.25}px/2 - ${scrollbarWidth}px/2)`,
            top: `calc(50vh - ${minModalHeight * 1.25}px/2)`,
            width: `${minModalWidth * 1.25}px`
         },
         [theme.breakpoints.up("md")]: {
            height: `${minModalHeight}px`,
            left: `calc(50vw - ${minModalWidth * 2.25}px/2  - ${scrollbarWidth}px/2)`,
            overflow: "visible",
            top: `calc(50vh - ${minModalHeight}px/2)`,
            width: `${minModalWidth * 2.25}px`
         }
      },

      modalContent: {
         alignItems: "center",
         display: "flex",
         flexDirection: "column",
         justifyContent: "space-between",
         [theme.breakpoints.up("md")]: {
            alignItems: "flex-start",
            flexDirection: "row",
            height: "300px",
            justifyContent: "flex-start",
            marginBottom: theme.spacing(2)
         }
      },

      modalImg: {
         maxHeight: "300px"
      },

      plotTxt: {
         [theme.breakpoints.up("md")]: {
            height: "240px",
            marginBottom: theme.spacing(1.5),
            overflowY: "scroll",
            paddingRight: theme.spacing(1),
            scrollbarWidth: "thin"
         }
      },

      textBody: {
         fontSize: "14px"
      },

      textHead: {
         fontSize: "14px",
         fontWeight: "bold",
         lineHeight: `${theme.spacing(2)}px`,
         marginBottom: theme.spacing(1.5)
      },

      title: {
         fontSize: "18px",
         marginBottom: theme.spacing(2),
         textAlign: "center"
      },

      yearTitle: {
         lineHeight: `${theme.spacing(2.5)}px`,
         margin: `${theme.spacing(1.25)}px 0`,
         textAlign: "center",
         [theme.breakpoints.up("md")]: {
            marginBottom: "0",
            marginTop: "0",
            textAlign: "left"
         }
      }
   }));

   const classes = useStyles();

   const capitalise = word => word ? word.charAt(0).toUpperCase() + word.slice(1) : "";

   return (
      <>
         <article className={classes.modalCard}>
            <Typography className={`${movieCardStyles.textSpacing} ${classes.title}`} variant="h6">
               <Box lineHeight={1}>
                  {movie.Title}
               </Box>
            </Typography>
            <CloseIcon
               className={classes.closeIcon}
               onClick={() => closeModal()}
            />
            <div className={classes.modalContent}>
               <img
                  className={`${movieCardStyles.cardImg} ${classes.modalImg}`}
                  src={poster}
                  alt={movie.Title}
               />
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
            </div>
            {movieRatings(movie, "modal")}
         </article>
      </>
   );
};

export default ModalCard;
