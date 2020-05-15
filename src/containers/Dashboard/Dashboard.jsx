import React, { useState } from "react";
import styles from "./Dashboard.module.scss";
import Navbar from "../../components/Navbar"
import Movies from "../../components/Movies"

const Dashboard = () => {

  const [movieName, getMovieName] = useState("");


  return (
    <>
      <Navbar getMovieName={getMovieName} />
      <Movies movieName={movieName} />
    </>
  );
};

export default Dashboard;
