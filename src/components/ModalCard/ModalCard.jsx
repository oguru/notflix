import React from "react";
import {Box, Typography} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const ModalCard = (props) => {
  const {movie, movieRatings, poster, closeModal, movieCardStyles, scrollbarWidth} = props;

  const minModalWidth = 300;
  const minModalHeight = 460;

  const useStyles = makeStyles((theme) => ({

    closeIcon: {
      position: "absolute",
      right: theme.spacing(0.75),
      top: theme.spacing(0.75),
      cursor: "pointer",
      transition: "0.2s",
      "&:hover": {
        transform: "scale(1.1)"
      },
      [theme.breakpoints.up('md')]: {
        right: theme.spacing(2),
        top: theme.spacing(2),
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
      left: `calc(50vw - ${minModalWidth}px/2 - ${scrollbarWidth}px/2)`,
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
        left: `calc(50vw - ${minModalWidth*1.25}px/2 - ${scrollbarWidth}px/2)`,
        top: `calc(50vh - ${minModalHeight*1.25}px/2)`,
        width: `${minModalWidth*1.25}px`,
        height: `${minModalHeight*1.25}px`,
      },
      [theme.breakpoints.up('md')]: {
        left: `calc(50vw - ${minModalWidth*2.25}px/2  - ${scrollbarWidth}px/2)`,
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
      [theme.breakpoints.up('md')]: {
        paddingRight: theme.spacing(1),
        marginBottom: theme.spacing(1.5),
        overflowY: "scroll",
        scrollbarWidth: "thin",
        height: "240px"
      }
    },

    textBody: {
      fontSize: "14px",
    },

    textHead: {
      lineHeight: theme.spacing(2) + "px",
      textDecoration: "underline",
      marginBottom: theme.spacing(1.5)
    },

    title: {
      fontSize: "18px",
      marginBottom: theme.spacing(2),
      textAlign: "center"
    },
    
    yearTitle: {
      lineHeight: theme.spacing(2.5) + "px",
      textAlign: "center",
      margin: `${theme.spacing(1.25)}px 0`,
      [theme.breakpoints.up('md')]: {
        textAlign: "left",
        marginTop: "0",
        marginBottom: "0"
      }
    }
  }));
  
  const classes = useStyles();

  const capitalise = word =>  word ? word.charAt(0).toUpperCase() + word.slice(1) : ""

  return (
    <>
      <article className={classes.modalCard}>
        <Typography className={`${movieCardStyles.textSpacing} ${classes.title}`} variant="h6">
          <Box lineHeight={1}>
            {movie.Title}
          </Box>
        </Typography>
        <CloseIcon className={classes.closeIcon} onClick={() => closeModal()}/>
        <div className={classes.modalContent}>
          <img className={movieCardStyles.cardImg} src={poster} alt={movie.Title}/>
          <div className={classes.modalBody}>
            <Typography className={`${classes.textBody} ${classes.yearTitle}`} component="p">({movie.Year} - {capitalise(movie.Type)})</Typography>
            <div>
              <Typography className={classes.textHead}component="p">Plot</Typography>
              <Typography className={`${classes.textBody} ${classes.plotTxt}`} component="p">{capitalise(movie.Plot)}</Typography>
            </div>
          </div>
        </div>
        {movieRatings(movie, "modal")}
      </article>
    </>
  );
};

export default ModalCard;
