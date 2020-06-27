import React, {useState, useEffect} from "react";
import styles from "./Modal.module.scss";
import { makeStyles } from '@material-ui/core/styles';

const Modal = (props) => {

//   const {fetchData, movieResults, setMovieDetails, movieDetails} = props;

//     const getMovieDetails = () => {
//     // let movieDetailArr = []
//     const movieDetails = movieResults.Search.map((movie, index) => 
//     fetchData(movie.imdbID)
//     );

//     setMovieDetails(movieDetails);
//   };

//   useEffect(() => {
//     if (movieResults) {
//       getMovieDetails
//     }
//   }, [movieResults])

const useStyles = makeStyles((theme) => ({

  // modalCard: {
  //   display: "fixed",
  //   left: "50%",
  //   top: "50%",
  //   width: "50vw",
  //   height: "50vh",
  //   border: "black 19px solid"
  // },

  flexColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center"
  }
}));

const classes = useStyles();


  return (
    <>
      <p className={classes.modalCard}>Modal works</p>
    </>
  );
};

export default Modal;
