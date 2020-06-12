import React, { useState, useEffect } from "react";
import './App.module.scss';
import Dashboard from "./containers/Dashboard"
import Navbar from "./components/Navbar"
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';


function App() {

  const [movieName, getMovieName] = useState();
  const [movieResults, setMovieResults] = useState();
  const [movieDetails, setMovieDetails] = useState([]);
  const [detailMode, setDetailMode] = useState([true])

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
    if (movieName) {
      setMovieDetails([]);
      setMovieResults();
      fetchData(movieName);
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [movieName, detailMode]);

  const setDetails = (result, type) => {
    if (type === "id") { 
      setMovieDetails(movieDetails => [...movieDetails, result])
    }  
    else {
      setMovieResults(result.Search);
    }
  }
  
  const fetchData = async (input, type) => {
    const parameter = type === "id" ? "i" : "s"
    await fetch(`https://www.omdbapi.com/?apikey=a6790f0e&${parameter}=${input}`) 
    .then (result => result.json())
    .then(result => setDetails(result, type))
    .catch(err => console.log(err))
  }

  return (
    <>
      <section className={classes.app}>
        <Navbar getMovieName={getMovieName} setDetailMode={setDetailMode} detailMode={detailMode} />
        <section className={classes.dashboard}>
          <Dashboard detailMode={detailMode} movieResults={movieResults} movieDetails={movieDetails} fetchData={fetchData} />
        </section>
      </section>
    </>
  );
}

export default App;
