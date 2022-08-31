import {Backdrop, Fade, Grid, Grow, Modal} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import MovieCard from "../../components/MovieCard";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import ModalCard from "../../components/ModalCard";

const Dashboard = (props) => {

   const {
      detailMode,
      handleGetSingleMovieDetails,
      movieResults,
      scrollbarWidth,
      searchTxt,
      xsScreen
   } = props;

   Dashboard.propTypes = {
      detailMode: PropTypes.bool,
      handleGetSingleMovieDetails: PropTypes.func,
      movieResults: PropTypes.array,
      scrollbarWidth: PropTypes.number,
      searchTxt: PropTypes.string,
      xsScreen: PropTypes.bool
   };

   const [cardHeight, setCardHeight] = useState(500);
   const [modalState, setModalState] = useState({open: false, index: 0});

   useEffect(() => {
      if (detailMode) {
         setCardHeight(500);
      } else {
         setCardHeight(450);
      }
   }, [detailMode]);

   const useStyles = makeStyles((theme) => ({
      gridCard: {
         alignItems: "center",
         display: "flex",
         height: `${cardHeight}px`,
         justifyContent: "center",
         padding: theme.spacing(1.5)
      },
      initTxt: {
         color: theme.palette.text.primary,
         fontStyle: "italic",
         margin: theme.spacing(1)
      }
   }));

   const classes = useStyles();

   const dashText = () => {
      if (movieResults === "error") {
         return "No results found. Please ensure spelling and spacing is correct.";
      } else if (searchTxt.length === 0) {
         if (xsScreen) {
            return "Click the top bar to reveal the search bar, then type in a movie name to get started...";
         }

         return "Type a movie name in the search bar to get started...";
      }

      return "";
   };

   const handleShowModal = async ({ratings, id, index}) => {
      console.log('handleShowModal i:', index)
      if (!ratings) {
         await handleGetSingleMovieDetails(index)
      } 
      setModalState({index, open: true})
   }

   const handleCloseModal = () => {
      setModalState((prev) => {return {...prev, open: false}})
   }

   return (
      <>
         <p className={classes.initTxt}>{dashText()}</p>
         <Grid container>
            {movieResults.length > 0 && 
            movieResults !== "error" && (
               movieResults.map((movie, i) => {
                  return (
                     <Grow key={movie.imdbID} in={true}>
                        <Grid
                           className={classes.gridCard}
                           item xs={12} sm={6} md={4} lg={3} xl={2}
                        >
                           <MovieCard
                              detailMode={detailMode}
                              handleShowModal={() => handleShowModal({index: i, ratings: movie.Ratings, id: movie.imdbID})}
                              movie={movie}
                              scrollbarWidth={scrollbarWidth}
                           />
                        </Grid>
                     </Grow>
                  );
               })
            )}
         </Grid>
         <Modal open={modalState.open}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500
            }}>
            <Fade in={modalState.open}>
               <ModalCard
                  closeModal={handleCloseModal}
                  movie={movieResults[modalState.index]}
               />
            </Fade>
         </Modal>
      </>
   );
};

export default Dashboard;
