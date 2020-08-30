import {Grid, Grow} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import MovieCard from "../../components/MovieCard";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const Dashboard = (props) => {

   const {
      detailMode,
      fetchData,
      modalData,
      movieDetails,
      movieResults,
      scrollbarWidth,
      searchTxt,
      storeModal,
      windowWidth
   } = props;

   Dashboard.propTypes = {
      detailMode: PropTypes.bool,
      fetchData: PropTypes.func,
      modalData: PropTypes.object,
      movieDetails: PropTypes.array,
      movieResults: PropTypes.array,
      scrollbarWidth: PropTypes.number,
      searchTxt: PropTypes.string,
      storeModal: PropTypes.func,
      windowWidth: PropTypes.number
   };

   const [cardHeight, setCardHeight] = useState(500);

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
         if (windowWidth < 600) {
            return "Click the top bar to reveal the search bar, then type in a movie name to get started...";
         }

         return "Type a movie name in the search bar to get started...";
      }

      return "";
   };

   const createMovieCards = () => {
      if (movieResults.length > 0
          && movieResults !== "error"
      ) {
         const resultsCopy = detailMode ?
            [...movieDetails] : [...movieResults];
         const movieImages = resultsCopy.map((movie) => {
            const moviePoster = new Image();
            moviePoster.src = movie.Poster;

            return moviePoster;
         });

         const detailType = detailMode ? movieDetails : movieResults;

         return detailType.map((movie) => {
            return (
               <Grow key={movie.imdbID} in={true}>
                  <Grid
                     className={classes.gridCard}
                     item xs={12} sm={6} md={4} lg={3} xl={2}
                  >
                     <MovieCard
                        detailMode={detailMode}
                        fetchData={fetchData}
                        movie={movie}
                        movieImages={movieImages}
                        modalData={modalData}
                        scrollbarWidth={scrollbarWidth}
                        storeModal={storeModal}
                     />
                  </Grid>
               </Grow>
            );
         });
      }

      return (
         <p className={classes.initTxt}>{dashText()}</p>
      );
   };

   return (
      <>
         <Grid container>
            {createMovieCards()}
         </Grid>
      </>
   );
};

export default Dashboard;
