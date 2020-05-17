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
  
  const setState = (result, parameter) => {
    if (parameter.split("")[0] === "i") { //if input is an imdb ID
      return result;
    }
    else { //If input is a movie name
      setMovieResults(result.Search); //set basic movie array in movieResults state
    }
  }

  const fetchData = (input, type) => {
    let parameter;
    if (type === "id") { //If input is an imdb ID
      parameter = `i=${input}`; //search by imdb ID
    }
    else { //If input is a movie name
      parameter = `s=${input}` //search by movie name
    }
    fetch(`https://www.omdbapi.com/?apikey=a6790f0e&${parameter}`)
    .then(result => result.json())
    .then(result => setState(result, parameter))
    .catch(err => console.log(err))
  }

  return (
    <section className="App">
      <Navbar getMovieName={getMovieName} />
      <Dashboard movieResults={movieResults} fetchData={fetchData} setMovieDetails={setMovieDetails} movieDetails={movieDetails} />
    </section>
  );
}

export default App;
