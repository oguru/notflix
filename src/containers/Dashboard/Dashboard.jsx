import {Backdrop, Fade, Grid, Grow, Modal} from "@material-ui/core";
import React, {useState} from "react";
import LoadingBox from "../../components/LoadingBox/LoadingBox";
import ModalCard from "../../components/ModalCard";
import MovieCard from "../../components/MovieCard";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import useMovieCardStyles from "../../styles/movieCardStyles";
import useSharedStyles from "../../styles/shared";

const Dashboard = (props) => {
   const {
      detailMode,
      isLoading,
      movieResults,
      searchError,
      searchTxt,
      updateSingleMovieDetails,
      xsScreen
   } = props;

   Dashboard.propTypes = {
      detailMode: PropTypes.bool,
      isLoading: PropTypes.bool,
      movieResults: PropTypes.array,
      searchError: PropTypes.bool,
      searchTxt: PropTypes.string,
      updateSingleMovieDetails: PropTypes.func,
      xsScreen: PropTypes.bool
   };

   const [modalState, setModalState] = useState({
      open: false,
      index: 0
   });

   const useStyles = makeStyles((theme) => ({
      gridCard: {
         alignItems: "center",
         display: "flex",
         height: `${detailMode ? 500 : 450}px`,
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

   const movieCardClasses = {
      ...useMovieCardStyles(),
      ...useSharedStyles()
   };

   const getDashText = () => {
      if (searchError) {
         return "No results found. Please ensure spelling and spacing is correct.";
      } else if (searchTxt.length === 0) {
         if (xsScreen) {
            return "Click the top bar to reveal the search bar, then type in a movie name to get started...";
         }

         return "Type a movie name in the search bar to get started...";
      }

      return "";
   };

   const handleShowModal = ({ratings, index}) => {
      if (!ratings) {
         updateSingleMovieDetails(index);
      }

      setModalState({index,
         open: true});
   };

   const handleCloseModal = () => {
      setModalState((prev) => {
         return {...prev,
            open: false};
      });
   };

   return (
      <>
         <p className={classes.initTxt}>
            {!movieResults.length && getDashText()}
         </p>
         <Grid container>
            {movieResults.map((movie, i) => {
               return (
                  <Grow key={movie.imdbID} in={true}>
                     <Grid
                        className={classes.gridCard}
                        item xs={12} sm={6} md={4} lg={3} xl={2}
                     >
                        <MovieCard
                           classes={movieCardClasses}
                           detailMode={detailMode}
                           handleShowModal={() => handleShowModal({
                              index: i,
                              ratings: movie.Ratings,
                              id: movie.imdbID
                           })}
                           movie={movie}
                        />
                     </Grid>
                  </Grow>
               );
            })}
            {isLoading && !searchError &&
               [...Array(10).keys()].map((key) => (
                  <Grow key={`ghostBox${key}`} in={true}>
                     <Grid
                        className={classes.gridCard}
                        item xs={12} sm={6} md={4} lg={3} xl={2}
                     >
                        <LoadingBox
                           cardClasses={movieCardClasses}
                           index={key}
                           showRatings={detailMode}
                        />
                     </Grid>
                  </Grow>))}
         </Grid>
         <Modal
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
               timeout: 500
            }}
            onClose={handleCloseModal}
            open={modalState.open}
         >
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
