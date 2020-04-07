import React, { useState } from "react";
import styles from "./Dashboard.module.scss";
import Navbar from "../../components/Navbar"
import Movies from "../../components/Movies"

const Dashboard = () => {

  const [movie, getMovie] = useState("");


  return (
    <>
      <Navbar getMovie={getMovie} />
      <Movies movie={movie} />
    </>
  );
};

export default Dashboard;
