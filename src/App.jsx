import React, { useState, useEffect } from "react";
import './App.module.scss';
import Dashboard from "./containers/Dashboard"
import Navbar from "./components/Navbar"
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import BottomScrollListener from 'react-bottom-scroll-listener';



function App() {

  const [movieName, setMovieName] = useState();
  const [page, setPage] = useState(1);
  const [movieResults, setMovieResults] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [detailMode, setDetailMode] = useState([true])
  // const [dashMessage, setDashMessage] = useState("Type a movie name in the search bar to get started.")

  //change useState to useReducer?

  const useStyles = makeStyles((theme) => ({
    app: {
      backgroundColor: theme.palette.background.default,
      width: "100vw",
      minHeight: "100vh",
      height: "100%"
    },
    dashboard: {
      padding: "0px 16px"
    }
  }))

  const classes = useStyles();

  useEffect(() => {

    if (movieName && page > 1) {
      fetchData(movieName);
    }
    else if (movieName) {
      fetchData(movieName);
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [movieName, detailMode, page]);

  const reInitSearch = () => {
    setMovieDetails([]);
    setMovieResults([]);
    setPage(1)
  }

  const changeDetailMode = () => {
    reInitSearch();
    setDetailMode(!detailMode);
  }

  const getMovieName = (name) => {
    reInitSearch()
    setMovieName(name)
  }

  const setDetails = (result, type) => {
    if (type === "id") { 
      setMovieDetails(movieDetails => [...movieDetails, result])
    }  
    else {
      setMovieResults(() => [...movieResults.concat(...result.Search)]);
      console.log(movieResults);
    }
  }

  const fetchData = async (input, type) => {
    const parameter = type === "id" ? "i" : "s"
    await fetch(`https://www.omdbapi.com/?apikey=a6790f0e&${parameter}=${input}&page=${page}`) 
    .then (result => result.json())
    .then(result => setDetails(result, type))
    .catch(err => console.log(err))
  }

  return (
    <>
      <section className={classes.app}>
        <Navbar getMovieName={getMovieName} changeDetailMode={changeDetailMode} />
        <section className={classes.dashboard}>
          <Dashboard detailMode={detailMode} movieResults={movieResults} movieDetails={movieDetails} fetchData={fetchData} />
        </section>
      <BottomScrollListener onBottom={() => setPage(page+1)} />
      </section>
    </>
  );
}

export default App;
