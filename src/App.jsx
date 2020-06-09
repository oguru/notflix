import React, { useState, useEffect } from "react";
import './App.module.scss';
import Dashboard from "./containers/Dashboard"
import Navbar from "./components/Navbar"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {

  const [movieName, getMovieName] = useState();
  const [movieResults, setMovieResults] = useState();
  const [movieDetails, setMovieDetails] = useState([]);
  const [displayMode, setDisplayMode] = useState([true])

  //change useState to useReducer?

  useEffect(() => {
    if (movieName) {
      setMovieDetails([]);
      fetchData(movieName);
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [movieName]);

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

  // const theme = createMuiTheme({
  //   palette: {
  //     main: {
  //       primary: "#000000"
  //       // secondary: green,
  //     }
  //   }
  // });

  return (
    // <section className="App">
    <>
      {/* <ThemeProvider theme={theme}> */}
        <Navbar getMovieName={getMovieName} setDisplayMode={setDisplayMode} displayMode={displayMode} />
        <Dashboard movieResults={movieResults} movieDetails={movieDetails} fetchData={fetchData} />
      {/* </ThemeProvider> */}
    </>
    // {/* </section> */}
  );
}

export default App;
