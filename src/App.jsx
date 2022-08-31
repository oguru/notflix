import React, {useEffect, useReducer, useState, useRef} from "react";
import {Modal, Slide, Snackbar, useScrollTrigger} from "@material-ui/core";
import BottomScrollListener from "react-bottom-scroll-listener";
import Dashboard from "./containers/Dashboard";
import Navbar from "./components/Navbar";
import {makeStyles} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

let addingPage = false;

const initialState = {
   searchTerm: "", 
   page: 1, 
   detailMode: true, 
   movieResults: {results: [], totalResults: 0},
   snackbar: {
      detail: false,
      fast: false
   }
}

function reducer(state, action) {
   let searchTerm
   let movieResults;
   let page;

   console.log("reducer action: ", action.type)

   switch (action.type) {
   //   case 'toggleDetailMode':
   //     return {detailMode: !state.detailMode};
      case 'setMovies':
         if (action.searchTerm != state.searchTerm) {
            // new search
            searchTerm = action.searchTerm
            movieResults = action.movieResults
            page = 1
         } else if (action.page) {
            // adding page
            movieResults = [...state.movieResults, ...action.movieResults]
            page = action.page;
            searchTerm = state.searchTerm;
         } else {
            // updating existing results
            movieResults = action.movieResults
            page = state.page;
            console.log('state.searchTerm:', state.searchTerm)
            searchTerm = state.searchTerm;
         }

         return {...state, searchTerm, page, movieResults};
      case 'updateMovies':
         return {...state, movieResults: [...state.movieResults, ...action.movieResults], snackbar: {
            detail: false,
            fast: false
         }};
      case 'updateSingleMovie':
         const updatedResults = state.movieResults.results;
      case 'addPage': 
         // merge with setMovies ?
         movieResults = [...state.movieResults.results, ...action.movieResults.results]
         page = state.page + 1;

         return {...state, page, movieResults: {...state.movieResults, results: movieResults}};
      case 'toggleDetail':
         movieResults = action.movieResults || state.movieResults
         return {...state, detailMode: !state.detailMode, movieResults, snackbar: {
            detail: !state.detailMode,
            fast: state.detailMode
         }}
      case 'closeSnackbar':
         return {...state, snackbar: {
            detail: false,
            fast: false
         }}
      case 'reset':
         return {initialState, detailMode: state.detailMode}
     default:
       throw new Error();
   }
 }

const App = () => {
   const [movieState, dispatch] = useReducer(reducer, initialState);
   const [isLoading, setIsLoading] = useState(false);
   
   const [searchTxt, setSearchTxt] = useState("time");
   const xsScreen = useMediaQuery('(max-width:599px)');

   const useStyles = makeStyles((theme) => ({
      app: {
         backgroundColor: theme.palette.background.default,
         height: "100%",
         maxWidth: "100vw",
         // height: "100vh",
         minHeight: "100vh",
         // overflow: "auto",
         paddingBottom: theme.spacing(2)
      },
      dashboard: {
         padding: `0 ${theme.spacing(2)}px`,
         paddingTop: theme.spacing(10)
      },
      sBarDetailMode: {backgroundColor: theme.palette.secondary.main},
      sBarFastMode: {backgroundColor: theme.palette.secondary.dark},
      snackBar: {
         bottom: theme.spacing(2),
         "& .MuiSnackbarContent-root": {
            backgroundColor: snackbarBackground,
            color: "white",
            justifyContent: "center",
            minWidth: "200px",
         }
      },
   }));

   const snackbarBackground = movieState.detailMode ?
      "rgba(229, 9, 20, 1)" : "rgba(43, 89, 195, 1)";

   const classes = useStyles();

   // const appRef = useRef(null);

/*    useEffect(() => {
      const threshold = 0;
      let lastScrollY = window.pageYOffset;
      let ticking = false;

      // const updateScrollDir = () => {
      //    const scrollY = window.pageYOffset;

      //    if (Math.abs(scrollY - lastScrollY) < threshold) {
      //       ticking = false;

      //       return;
      //    }

      //    setScrollDir(scrollY > lastScrollY ? "down" : "up");
      //    lastScrollY = scrollY > 0 ? scrollY : 0;
      //    ticking = false;
      // };

      window.addEventListener("scroll", onScroll);

   }, []); */

   /* change detail mode - if (detailMode && movieState.searchTerm === query && !movieState.detailedResults) {
      fetchData detailed using store movies
      dispatch setMovies
   } else if () {
      
   }*/

   /*  */
   // if movies exist, don't set to store

   const handleSearch = async ({query}) => {
      const trimmedQuery = query;
      if (!trimmedQuery) {
         dispatch({type: "reset"})
         return;
      }
      setIsLoading(true);
      let results = await fetchData({query: trimmedQuery, param: "s"})
      
      if (movieState.detailMode) {
         Promise.all(results.results).then(res => {
            dispatch({type: "setMovies", movieResults: {results: res, totalResults: results.totalResults}, searchTerm: trimmedQuery})
            setIsLoading(false);
         })
      } else {
         console.log('results:', results)
         dispatch({type: "setMovies", movieResults: results, searchTerm: trimmedQuery})
         setIsLoading(false);
      }
   }

   const fetchData = async ({query, param, page = 1}) => {
      let results = await fetch(`https://www.omdbapi.com/?apikey=a6790f0e&${param}=${query}&page=${page}&plot=full`).then(res => res.json())

      let detailedResults = [];

      if (movieState.detailMode && param === 's') {

         // detailedResults = results.Search.map(res => fetchData({query: res.imdbID, param: "i"}))

         for (let i = 0; i < results.Search.length; i++) {
            const detailedResult = fetchData({query: results.Search[i].imdbID, param: "i"})
            detailedResults.push(detailedResult);
         }
      }

      if (movieState.detailMode && param === 's') {
         return {results: detailedResults, totalResults: results.totalResults};
      } else if (results.Search) {
         return {results: results.Search, totalResults: results.totalResults}
      }

      if (movieState.detailMode && param === 's') {
         console.log("results even though");
      }
      return results;
   };

   // const reInitSearch = () => {
   //    setMovieName();
   //    setMovieResults([]);
   //    setMovieDetails([]);
   //    setPage(1);
   // };

   const handleToggleDetailMode = async () => {
      let updatedResults;
      // if turning detail mode on with current results
      if (!movieState.detailMode && movieState.searchTerm && movieState.movieResults.results.length) {
         let changes = false;
         const results = movieState.movieResults.results.map(res => {
            if (res.Ratings) {
               return res;
            } else {
               console.log('movieState.movieResults:', movieState.movieResults.results)
               if (!changes) {
                  changes = true
               }
               return fetchData({query: res.imdbID, param: "i"}).results;
            }
         });

         if (changes) {
            console.log('changes:', changes)
            await Promise.all(results).then(res => updatedResults = res)
         }
      } 
      
      dispatch({type: "toggleDetail", movieResults: updatedResults})
   };

   const handleGetSingleMovieDetails = async (index) => {
      const movieResults = {...movieState.movieResults};
      const movie = movieResults.results[index];
      const movieDetails = await fetchData({query: movie.imdbID, param: "i"})
      movieResults.results.splice(index, 1, movieDetails)

      dispatch({type: "setMovies", movieResults, searchTerm: movieState.searchTerm});
   }

   const addPage = async () => {
      if (isLoading) return;

      if (movieState.movieResults.totalResults > movieState.movieResults.results.length) {
         setIsLoading(true);

         let results = await fetchData({query: movieState.searchTerm, param: "s", page: movieState.page + 1})
      
         if (movieState.detailMode) {
            Promise.all(results.results).then(res => {
               dispatch({type: "addPage", movieResults: {results: res}})
               setIsLoading(false);
            })
         } else {
            dispatch({type: "addPage", movieResults: results})
            setIsLoading(false);
         }
      }
   };

   const snackbar = movieState.detailMode ?
      {
         key: "detail",
         message: "Detail mode enabled",
         mode: movieState.snackbar.detail
      } : {
         key: "fast",
         message: "Fast mode enabled",
         mode: movieState.snackbar.fast
      };

   return (
      <>
         <section className={classes.app}>
            <Navbar
               handleToggleDetailMode={handleToggleDetailMode}
               detailMode={movieState.detailMode}
               handleSubmitSearch={handleSearch}
               isLoading={isLoading}
               searchTxt={searchTxt}
               setSearchTxt={setSearchTxt}
               xsScreen={xsScreen} />
            <section className={classes.dashboard}>
               <Dashboard
                  detailMode={movieState.detailMode}
                  handleGetSingleMovieDetails={handleGetSingleMovieDetails}
                  movieResults={movieState.movieResults.results}
                  searchTxt={searchTxt}
                  xsScreen={xsScreen}
               />
            </section>
            <BottomScrollListener
               offset={250}
               onBottom={() => addPage()}
            />
         </section>
         <Snackbar
            TransitionComponent={Slide}
            autoHideDuration={1500}
            classes= {{
               root: classes.snackBar
            }}
            message={snackbar.message}
            key={snackbar.key}
            onClose={() => dispatch({type: "closeSnackbar"})
         }
            open={snackbar.mode}
         />
      </>
   );
};

export default App;
