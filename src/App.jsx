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
   results: [], 
   totalResults: 0,
   snackbar: {
      detail: false,
      fast: false
   }
}

function reducer(state, action) {
   let results;
   let page;

   switch (action.type) {
      case 'setMovies':
         if (action.searchTerm) {
            // new search
            results = action.results
            page = 1

            return {
               ...state, 
               searchTerm: action.searchTerm, 
               page, 
               results, 
               totalResults: action.totalResults
            };
         }
         // updating existing results
         results = action.results

         return {...state, results};
      case 'addPage': 
         results = [...state.results, ...action.results]
         page = state.page + 1;
         return {...state, page, results};
      case 'toggleDetail':
         results = action.results || state.results
         return {...state, detailMode: !state.detailMode, results, snackbar: {
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
   console.log('movieState:', movieState)
   const [isLoading, setIsLoading] = useState(false);
   
   const [searchTxt, setSearchTxt] = useState("time");
   const xsScreen = useMediaQuery('(max-width:599px)');

   const useStyles = makeStyles((theme) => ({
      app: {
         backgroundColor: theme.palette.background.default,
         height: "100%",
         maxWidth: "100vw",
         minHeight: "100vh",
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
            backgroundColor: movieState.detailMode ?
               "rgba(229, 9, 20, 1)" : 
               "rgba(43, 89, 195, 1)",
            color: "white",
            justifyContent: "center",
            minWidth: "200px",
         }
      },
   }));

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
            dispatch({
               type: "setMovies", 
               results: res, 
               totalResults: results.totalResults, 
               searchTerm: trimmedQuery
            })
            setIsLoading(false);
         })
      } else {
         dispatch({
            type: "setMovies", 
            results: results.Search, 
            totalResults: results.totalResults, 
            searchTerm: trimmedQuery
         })
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
      } 
      // else if (results.Search) {
      //    return {results: results.Search, totalResults: results.totalResults}
      // }
      
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
      if (!movieState.detailMode && movieState.searchTerm && movieState.totalResults) {
         let changes = false;
         const results = movieState.results.map(
            (res) => {
            if (res.Ratings) {
               return res;
            } else {
               if (!changes) {
                  changes = true
               }
               return fetchData({query: res.imdbID, param: "i"});
            }
         });

         if (changes) {
            await Promise.all(results).then(res => {
               updatedResults = res
            })
         }
      } 
      
      dispatch({type: "toggleDetail", results: updatedResults})
   };

   const handleGetSingleMovieDetails = async (index) => {
      const movieResults = {...movieState.results};
      const movie = movieResults.results[index];
      const movieDetails = await fetchData({query: movie.imdbID, param: "i"})
      movieResults.splice(index, 1, movieDetails)

      dispatch({type: "setMovies", results: movieResults, searchTerm: movieState.searchTerm});
   }

   const addPage = () => {
      console.log('addPage triggered')
      if (isLoading) return;

      if (movieState.totalResults > movieState.results.length) {
         setIsLoading(true);

         let results = fetchData({
            query: movieState.searchTerm, 
            param: "s", 
            page: movieState.page + 1
         })
      
         Promise.resolve(results).then(res => {

            if (movieState.detailMode) {
               Promise.all(res.results).then(detailedRes => {
                  dispatch({
                     type: "addPage", 
                     results: detailedRes, 
                     page: movieState.page + 1
                  })
                  setIsLoading(false);
               })
            } else {

               dispatch({
                  type: "addPage", 
                  results: res.Search, 
                  page: movieState.page + 1
               })
               setIsLoading(false);
            }
         })
         // if (movieState.detailMode) {
         //    Promise.resolve(results)
         //    Promise.all(results.results).then(res => {
         //       dispatch({
         //          type: "addPage", 
         //          results: res, 
         //          page: movieState.page + 1
         //       })
         //       setIsLoading(false);
         //    })
         // } else {
         //    Promise.resolve(results).then(res => {

         //       dispatch({
         //          type: "addPage", 
         //          results: res.Search, 
         //          page: movieState.page + 1
         //       })
         //       setIsLoading(false);
         //    })
         //    // dispatch({
         //    //    type: "addPage", 
         //    //    results: results.Search, 
         //    //    page: movieState.page + 1
         //    // })
         //    // setIsLoading(false);
         // }
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
                  isLoading={isLoading}
                  movieResults={movieState.results}
                  searchTxt={searchTxt}
                  xsScreen={xsScreen}
               />
            </section>
            <BottomScrollListener
               debounceOptions={200}
               offset={250}
               onBottom={addPage}
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
