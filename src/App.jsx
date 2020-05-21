import React, { useState, useEffect } from "react";
import './App.module.scss';
import Dashboard from "./containers/Dashboard"
import Navbar from "./components/Navbar"

function App() {

  const [movieName, getMovieName] = useState();
  const [movieResults, setMovieResults] = useState();
  const [movieDetails, setMovieDetails] = useState([]);

  useEffect(() => {
    if (movieName) {
      fetchData(movieName);
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [movieName]);

  const setDetails = (result, type) => {
    if (type === "id") { 
      const imdbId = result.imdbID;
      const movDetailsObj = {
        [imdbId] : result
      }

      setMovieDetails(movieDetails => [...movieDetails, movDetailsObj])
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
    <section className="App">
      <Navbar getMovieName={getMovieName} />
      <Dashboard movieResults={movieResults} movieDetails={movieDetails} fetchData={fetchData} />
    </section>
  );
}

export default App;
