import React, {useReducer, useState} from "react";
import BottomScrollListener from "react-bottom-scroll-listener";
import Dashboard from "./containers/Dashboard";
import Navbar from "./components/Navbar";
import Slide from "@material-ui/core/Slide";
import Snackbar from "@material-ui/core/Snackbar";
import useAppStyles from "./styles/appStyles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const initialState = {
   detailMode: true,
   page: 1,
   results: [],
   searchTerm: "",
   snackbar: false,
   totalResults: 0
};

const reducer = (state, action) => {
   let results;
   let page;

   switch (action.type) {
      case "setMovies":
         // if new search
         if (action.searchTerm) {
            results = action.results;
            page = 1;

            return {
               ...state,
               page,
               results,
               searchTerm: action.searchTerm,
               totalResults: action.totalResults
            };
         }

         // if updating existing results
         results = action.results;

         return {
            ...state,
            results
         };
      case "addPage":
         results = [...state.results, ...action.results];
         page = state.page + 1;
         return {
            ...state,
            page,
            results
         };
      case "toggleDetail":
         results = action.results || state.results;
         return {
            ...state,
            detailMode: !state.detailMode,
            results,
            snackbar: true
         };
      case "closeSnackbar":
         return {
            ...state,
            snackbar: false
         };
      case "reset":
         return {
            ...initialState,
            detailMode: state.detailMode
         };
      default:
         throw new Error();
   }
};

const App = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [movieState, dispatch] = useReducer(reducer, initialState);
   const [searchTxt, setSearchTxt] = useState("");
   const xsScreen = useMediaQuery("(max-width:599px)");
   const classes = useAppStyles({detailMode: movieState.detailMode});

   const fetchData = async ({query, param, page = 1}) => {
      const path = `https://www.omdbapi.com/?apikey=a6790f0e&${param}=${query}&page=${page}&plot=full`;

      const results = await fetch(path).then(res => res.json());

      const detailedResults = [];

      if (movieState.detailMode &&
         param === "s" &&
         !results.Error
      ) {
         for (let i = 0; i < results.Search.length; i++) {
            const detailedResult = fetchData({
               query: results.Search[i].imdbID,
               param: "i"
            });
            detailedResults.push(detailedResult);
         }

         return {
            results: detailedResults,
            totalResults: results.totalResults
         };
      }

      return results;
   };

   const handleSearch = async ({query}) => {
      const trimmedQuery = query.trim();

      if (movieState.searchTerm) {
         dispatch({type: "reset"});
      }

      if (!trimmedQuery) {
         return;
      }

      setIsLoading(true);

      const results = await fetchData({
         param: "s",
         query: trimmedQuery
      });

      if (!results.Error) {
         if (movieState.detailMode) {
            Promise.all(results.results).then(res => {
               dispatch({
                  results: res,
                  searchTerm: trimmedQuery,
                  totalResults: results.totalResults,
                  type: "setMovies"
               });
               setIsLoading(false);
            });
         } else {
            dispatch({
               results: results.Search,
               searchTerm: trimmedQuery,
               totalResults: results.totalResults,
               type: "setMovies"
            });
            setIsLoading(false);
         }
      } else {
         // if error
         dispatch({
            results: [],
            searchTerm: trimmedQuery,
            totalResults: 0,
            type: "setMovies"
         });
         setIsLoading(false);
      }
   };

   const handleToggleDetailMode = async () => {
      let updatedResults;

      // if turning detail mode on with current results
      if (!movieState.detailMode &&
         movieState.searchTerm &&
         movieState.totalResults
      ) {
         let changes = false;
         const results = movieState.results.map((res) => {
            if (res.Ratings) {
               return res;
            }

            if (!changes) {
               changes = true;
            }

            // get detailed movie results
            return fetchData({
               query: res.imdbID,
               param: "i"
            });

         });

         if (changes) {
            await Promise.all(results).then(res => {
               updatedResults = res;
            });
         }
      }

      dispatch({
         results: updatedResults,
         type: "toggleDetail"
      });
   };

   const updateSingleMovieDetails = async (index) => {
      const movieResults = [...movieState.results];
      const movie = movieResults[index];
      const movieDetails = await fetchData({
         query: movie.imdbID,
         param: "i"
      });
      movieResults.splice(index, 1, movieDetails);

      dispatch({
         results: movieResults,
         type: "setMovies"
      });
   };

   const addPage = () => {
      if (isLoading) {
         return;
      }

      if (movieState.totalResults > movieState.results.length) {
         setIsLoading(true);

         const newPageNum = movieState.page + 1;

         const results = fetchData({
            page: newPageNum,
            param: "s",
            query: movieState.searchTerm
         });

         Promise.resolve(results).then(res => {
            if (movieState.detailMode) {
               Promise.all(res.results).then(detailedRes => {
                  dispatch({
                     page: newPageNum,
                     results: detailedRes,
                     type: "addPage"
                  });
                  setIsLoading(false);
               });
            } else {
               dispatch({
                  page: newPageNum,
                  results: res.Search,
                  type: "addPage"
               });
               setIsLoading(false);
            }
         });
      }
   };

   return (
      <>
         <section className={classes.app}>
            <Navbar
               detailMode={movieState.detailMode}
               handleSubmitSearch={handleSearch}
               handleToggleDetailMode={handleToggleDetailMode}
               isLoading={isLoading}
               searchTxt={searchTxt}
               setSearchTxt={setSearchTxt}
               xsScreen={xsScreen} />
            <section className={classes.dashboard}>
               <Dashboard
                  detailMode={movieState.detailMode}
                  isLoading={isLoading}
                  movieResults={movieState.results}
                  searchError={
                     Boolean(movieState.searchTerm && !movieState.totalResults)
                  }
                  searchTxt={searchTxt}
                  updateSingleMovieDetails={updateSingleMovieDetails}
                  xsScreen={xsScreen}
               />
            </section>
            <BottomScrollListener
               debounceOptions={200}
               offset={250}
               onBottom={addPage}
               triggerOnNoScroll={movieState.totalResults}
            />
         </section>
         <Snackbar
            TransitionComponent={Slide}
            autoHideDuration={1500}
            classes={{root: classes.snackBar}}
            key={movieState.detailMode ? "d" : "f"}
            message={movieState.detailMode ?
               "Detail mode enabled" :
               "Fast mode enabled"
            }
            onClose={() => dispatch({type: "closeSnackbar"})}
            open={movieState.snackbar}
         />
      </>
   );
};

export default App;
