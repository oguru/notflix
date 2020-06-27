import React, { useState, useEffect } from "react";
import MovieCard from "../../components/MovieCard"
import ModalCard from "../../components/ModalCard";
import {Grid, Grow, Modal, Fade, Backdrop} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { shadows } from '@material-ui/system';
import useImage from 'use-image';

const useStyles = makeStyles((theme) => ({
  gridCard: {
    width: "100px",
    height: "500px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
  }))

const Dashboard = (props) => {
  
  const {movieResults, fetchData, setMovieDetails, movieDetails, detailMode, modalState, 
    storeModal, modalData, 
    setModalState} = props;
  
  // const [image, status] = useImage(url, "NA");
  const [imgCount, setImgCount] = useState(0)
  // const [modalData, storeModal] = useState("");


  useEffect(() => {
    if (movieResults.length > 0 && detailMode) {
      getMovieDetails(movieResults);
    }

    // if (modalState && !detailMode) {
    //   fetchData(movie, "id")
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieResults]);
  
  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [modalData, modalState]);

  const getMovieDetails = results => {
    results.forEach(result => fetchData(result.imdbID, "id"));
  };

  const classes = useStyles();

  // const modalVis = modalState ? "display: fixed" : "display: none"

  // let modalCard = "";

  //  if (modalState) {
  //    modalCard = <ModalCard movie={modalData} />
  //  }

  const showModal = movie => {
    setModalState(true)
    if (detailMode) {
        storeModal(movie)
      }
    else {
        fetchData(movie.imdbID, "id")
      }
  }

  console.log(modalData);
  

  const closeModal = () => {
    // modalCard = "";
    storeModal("")
    setModalState(false)
  }
  
  const createMovieCards = () => {  
    if (movieResults) {
      
      const resultsCopy = detailMode ? [...movieDetails] : [...movieResults];

      const movieImages = resultsCopy.map((movie) => {
         const moviePoster = new Image();
         moviePoster.src = movie.Poster;
         return moviePoster;
      })

      const detailType = detailMode ? movieDetails : movieResults;

      return detailType.map((movie, index) => {
        return (
          <Grow in={true} appear={true}>
            <Grid key={movie.imdbID} onClick={() => showModal(movie)} className={classes.gridCard} item xs={12} sm={6} md={4} lg={3} xl={2} >
              <MovieCard movie={movie} movieImages={movieImages} index={index} detailMode={detailMode} imgCount={imgCount} setImgCount={setImgCount}/>
            </Grid>
          </Grow>
        )
      }
      )
    }
  }

  return (
    <>
        {/* {modalState} */}
      {/* <div className={classes.modalCard}> */}
        <Modal open={modalState}
        className={classes.modal}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
          <Fade in={modalState}>
            <ModalCard movie={modalData} />
          </Fade>
        </Modal>
      {/* </div> */}
      <Grid container>
          {createMovieCards()}
      </Grid>
    </>
  );
};

export default Dashboard;
