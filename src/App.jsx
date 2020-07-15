import React, { useState, useEffect } from "react";
import './App.module.scss';
import Dashboard from "./containers/Dashboard"
import Navbar from "./components/Navbar"
import { makeStyles } from '@material-ui/core/styles';
import BottomScrollListener from 'react-bottom-scroll-listener';


function App() {

  const [searchTxt, setSearchTxt] = useState("");
  const [movieName, setMovieName] = useState("");
  const [page, setPage] = useState(1);
  const [movieResults, setMovieResults] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const [detailMode, setDetailMode] = useState(true);
  const [posterImages, setImage] = useState([]);
  const [modalData, storeModal] = useState("");
  
  // const [dashMessage, setDashMessage] = useState("Type a movie name in the search bar to get started.")

  //change useState to useReducer?

  const useStyles = makeStyles((theme) => ({
    app: {
      backgroundColor: theme.palette.background.default,
      maxWidth: "100vw",
      minHeight: "100vh",
      paddingBottom: theme.spacing(2),
      height: "100%"
    },
    dashboard: {
      padding: `0px ${theme.spacing(2)}px`
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

const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  const reInitSearch = () => {
    setMovieName()
    setMovieDetails([]);
    setMovieResults([]);
    setPage(1)
  }

  const changeDetailMode = () => {
    reInitSearch();
    setDetailMode(!detailMode);
  }

  const getMovieName = (name) => {
    reInitSearch();
    setMovieName(name);
  }

  const setDetails = (result, type) => {
    if (type === "id") {
      if (detailMode) {
        setMovieDetails(movieDetails => [...movieDetails, result])
      } 
      else {
        storeModal(result)
      }
    }  
    else if (result.Search) {
      if (detailMode) {
        setMovieResults(result.Search);
      }
      else {      
        setMovieResults(() => [...movieResults.concat(...result.Search)]);
      }
    }
  }

  const fetchData = async (input, type) => {
    const parameter = type === "id" ? "i" : "s"
    await fetch(`https://www.omdbapi.com/?apikey=a6790f0e&${parameter}=${input}&page=${page}&plot=full`) 
    .then (result => result.json())
    .then(result => setDetails(result, type))
    .catch(err => console.log(err))
  }

  const addPage = () => {
    const searchType = detailMode ? movieDetails : movieResults;
    if (searchType.length / page % 10 === 0) {
        setPage(page+1);
      }
  }

  return (
    <>
      <section className={classes.app}>
        <Navbar 
          getMovieName={getMovieName} 
          changeDetailMode={changeDetailMode} 
          detailMode={detailMode} 
          searchTxt={searchTxt} 
          setSearchTxt={setSearchTxt} />
        <section className={classes.dashboard}>
          <Dashboard 
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
            />
        </section>
      <BottomScrollListener onBottom={() => addPage()} />
      </section>
    </>
  );
}

export default App;
