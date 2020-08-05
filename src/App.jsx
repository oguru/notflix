import "./App.module.scss";
import React, {useEffect, useState} from "react";
import {Slide, Snackbar} from "@material-ui/core";
import BottomScrollListener from "react-bottom-scroll-listener";
import Dashboard from "./containers/Dashboard";
import Navbar from "./components/Navbar";
import {makeStyles} from "@material-ui/core/styles";

const App = () => {
  const [searchOpen, toggleSearch] = useState(false);
  const [initState, changeInit] = useState(true);
  const [searchTxt, setSearchTxt] = useState("");
  const [movieName, setMovieName] = useState("");
  const [page, setPage] = useState(1);
  const [movieResults, setMovieResults] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [detailMode, setDetailMode] = useState(true);
  const [posterImages, setImage] = useState([]);
  const [modalData, storeModal] = useState({});
  const [windowWidth, setWindowWidth] = useState();
  const [scrollDir, setScrollDir] = useState("up");
  const [snackbarState, toggleSnackbar] = useState({
    detail: false,
    fast: false
  });

  const useStyles = makeStyles((theme) => ({
    app: {
      backgroundColor: theme.palette.background.default,
      height: "100%",
      maxWidth: "100vw",
      minHeight: "100vh",
      paddingBottom: theme.spacing(2)
    },
    dashboard: {
      padding: `0px ${theme.spacing(2)}px`,
      paddingTop: theme.spacing(10)
    },
    sBarDetailMode: {backgroundColor: theme.palette.secondary.main},
    sBarFastMode: {backgroundColor: theme.palette.secondary.dark},
    snackBar: {bottom: "16px"}
  }));

  const classes = useStyles();

  const snackbarBackground = detailMode ?
    "rgba(229, 9, 20, 1)" : "rgba(43, 89, 195, 1)";

  const snackbarStyles = makeStyles({root: {
    backgroundColor: snackbarBackground,
    color: "white",
    justifyContent: "center",
    maxWidth: "300px",
    minWidth: "200px"
  }}, {name: "MuiSnackbarContent"});

  snackbarStyles();

  useEffect(() => {
    if (movieName && page > 1) {
      fetchData(movieName);
    } else if (movieName) {
      fetchData(movieName);
    }
  }, [movieName, detailMode, page]);

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

  const scrollbarWidth = windowWidth - document.documentElement.clientWidth;

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
    setMovieName(name);
    if (searchOpen) {
      toggleSearch(false);
    }
  };

  const setDetails = (result, type) => {
    if (type === "id") {
      if (detailMode) {
        setMovieDetails(() => [...movieDetails, result]);
      } else {
        storeModal(result);
      }
    } else if (result.Search && !type) {
      if (detailMode) {
        setMovieResults(result.Search);
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


  /*
   * const handleClickVariant = (variant) => () => {
   *   // variant could be success, error, warning, info, or default
   *   enqueueSnackbar('This is a success message!', { variant });
   * };
   */

  const snackbar = detailMode ?
    {
      mode: snackbarState.detail,
      message: "Detail mode enabled",
      key: "detail"
    } : {
      mode: snackbarState.fast,
      message: "Fast mode enabled",
      key: "fast"
    };

  return (
    <>
      <section className={classes.app} onClick={() => searchOpen ? toggleSearch(false) : ""}>
        <Navbar
          searchOpen={searchOpen}
          toggleSearch={toggleSearch}
          scrollDir={scrollDir}
          getMovieName={getMovieName}
          changeDetailMode={changeDetailMode}
          detailMode={detailMode}
          searchTxt={searchTxt}
          setSearchTxt={setSearchTxt}
          windowWidth={windowWidth} />
        <section className={classes.dashboard}>
          <Dashboard
            initState={initState}
            movieName={Boolean(movieName)}
            detailMode={detailMode}
            fetchData={fetchData}
            movieResults={movieResults}
            modalData={modalData}
            movieDetails={movieDetails}
            posterImages={posterImages}
            scrollbarWidth={scrollbarWidth}
            setImage={setImage}
            setMovieDetails={setMovieDetails}
            storeModal={storeModal}
            windowWidth={windowWidth}
          />
        </section>
        <BottomScrollListener offset={250} onBottom={() => addPage()} />
      </section>
      {/* <Snackbar
        open={snackbarState.detail}
        onClose={() => toggleSnackbar({...snackbarState, detail: false})}
        // TransitionComponent={slide}
        autoHideDuration={100}
        message="Detail mode enabled"
        key={"detail"}
      /> */}
      <Snackbar
        open={snackbar.mode}
        onClose={() => toggleSnackbar({detail: false,
          fast: false})}
        TransitionComponent={Slide}
        autoHideDuration={1500}
        message={snackbar.message}
        key={snackbar.key}
        classes={{root: classes.snackBar,
          content: classes.snackBarContent}}
        // classes={`${{root: classes.snackBar}} ${classes.snackBarContent}`}
      />
    </>
  );
};

export default App;
