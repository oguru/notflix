import React, {useEffect, useState} from "react";
import {Slide, Snackbar} from "@material-ui/core";
import BottomScrollListener from "react-bottom-scroll-listener";
import Dashboard from "./containers/Dashboard";
import Navbar from "./components/Navbar";
import {makeStyles} from "@material-ui/core/styles";

const App = () => {
   const [detailMode, setDetailMode] = useState(true);
   const [initState, changeInit] = useState(true);
   const [modalData, storeModal] = useState({});
   const [movieDetails, setMovieDetails] = useState([]);
   const [movieName, setMovieName] = useState("");
   const [movieResults, setMovieResults] = useState([]);
   const [page, setPage] = useState(1);
   const [scrollDir, setScrollDir] = useState("up");
   const [snackbarState, toggleSnackbar] = useState({
      detail: false,
      fast: false
   });
   const [searchOpen, toggleSearch] = useState(false);
   const [searchTxt, setSearchTxt] = useState("");
   const [windowWidth, setWindowWidth] = useState();

   const [fetchCount, setFetchCount] = useState(0);

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
            backgroundColor: snackbarBackground,
            color: "white",
            justifyContent: "center",
            minWidth: "200px",
         }
      },
   }));

   const snackbarBackground = detailMode ?
      "rgba(229, 9, 20, 1)" : "rgba(43, 89, 195, 1)";

   const classes = useStyles();

   useEffect(() => {
      if (movieName && page > 1) {
         fetchData(movieName);
      } else if (movieName) {
         fetchData(movieName);
      }

   }, [movieName, detailMode, page]);

   useEffect(() => {
      const getMovieDetails = results => {
         results.forEach(result => fetchData(result.imdbID, "id"));
      };

      if (movieResults.length > 0
            && detailMode
            && movieResults !== "error"
      ) {
         getMovieDetails(movieResults);
      }

   }, [movieResults]);

   useEffect(() => {
      const threshold = 0;
      let lastScrollY = window.pageYOffset;
      let ticking = false;

      const updateScrollDir = () => {
         const scrollY = window.pageYOffset;

         if (Math.abs(scrollY - lastScrollY) < threshold) {
            ticking = false;

            return;
         }

         setScrollDir(scrollY > lastScrollY ? "down" : "up");
         lastScrollY = scrollY > 0 ? scrollY : 0;
         ticking = false;
      };

      const onScroll = () => {
         if (!ticking) {
            window.requestAnimationFrame(updateScrollDir);
            ticking = true;
         }
      };

      window.addEventListener("scroll", onScroll);

   }, []);

   useEffect(() => {
      const getWidth = () => setWindowWidth(window.innerWidth);

      window.addEventListener("resize", getWidth);
      getWidth();
   }, []);

   const scrollbarWidth =
    windowWidth - document.documentElement.clientWidth;

   const reInitSearch = () => {
      setMovieName();
      setMovieResults([]);
      setMovieDetails([]);
      setPage(1);
   };

   const changeDetailMode = () => {
      reInitSearch();
      detailMode ?
         toggleSnackbar({
            detail: false,
            fast: true
         }) :
         toggleSnackbar({
            detail: true,
            fast: false
         });
      setDetailMode(!detailMode);
   };

   const getMovieName = (name) => {
      if (initState) {
         changeInit(false);
      }

      reInitSearch();
      setMovieName(name.trim());

      if (searchOpen) {
         toggleSearch(false);
      }
   };

   const setDetails = (result, type) => {
      if (type === "id") {
         if (detailMode) {
            setMovieDetails(currentMovDetails => [...currentMovDetails, result]);
         } else {
            storeModal(result);
         }
      } else if (result.Search && !type) {
         if (detailMode) {
            setMovieResults(result.Search);
            setFetchCount((currentFetch) => currentFetch + 1);
         } else {
            setMovieResults(() => [...movieResults.concat(...result.Search)]);
         }
      } else {
         setMovieResults("error");
      }
   };

   const fetchData = (input, type) => {
      const parameter = type === "id" ? "i" : "s";
      fetch(`https://www.omdbapi.com/?apikey=a6790f0e&${parameter}=${input}&page=${page}&plot=full`)
         .then(result => result.json())
         .then(result => setDetails(result, type))
         .catch(err => console.log(err));
   };

   const addPage = () => {
      const searchType = detailMode ? movieDetails : movieResults;

      if (searchType.length / page % 10 === 0) {
         setPage(page + 1);
      }
   };

   const snackbar = detailMode ?
      {
         key: "detail",
         message: "Detail mode enabled",
         mode: snackbarState.detail
      } : {
         key: "fast",
         message: "Fast mode enabled",
         mode: snackbarState.fast
      };

   return (
      <>
         <section
            className={classes.app}
            onClick={() => searchOpen ? toggleSearch(false) : ""}>
            <Navbar
               changeDetailMode={changeDetailMode}
               detailMode={detailMode}
               getMovieName={getMovieName}
               scrollDir={scrollDir}
               searchOpen={searchOpen}
               searchTxt={searchTxt}
               setSearchTxt={setSearchTxt}
               toggleSearch={toggleSearch}
               windowWidth={windowWidth} />
            <section className={classes.dashboard}>
               <Dashboard
                  detailMode={detailMode}
                  fetchData={fetchData}
                  initState={initState}
                  modalData={modalData}
                  movieDetails={movieDetails}
                  movieName={Boolean(movieName)}
                  movieResults={movieResults}
                  scrollbarWidth={scrollbarWidth}
                  searchTxt={searchTxt}
                  setMovieDetails={setMovieDetails}
                  storeModal={storeModal}
                  windowWidth={windowWidth}
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
            onClose={() => toggleSnackbar({
               detail: false,
               fast: false
            })}
            open={snackbar.mode}
         />
      </>
   );
};

export default App;
