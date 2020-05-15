import React, { useState } from "react";
import styles from "./Navbar.module.scss";
import Button from "../Button";

const Navbar = (props) => {
  const { getMovieName } = props;

  const [searchTxt, setSearchTxt] = useState("");

  return (
    <>
      <nav class="nav">
        <label for="basic-search"></label>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon3">Search here...</span>
          </div>
          <input
            onInput={e => setSearchTxt(e.target.value)}
            type="text"
            class="form-control"
            id="basic-search"
            aria-describedby="basic-addon3" />
          <Button isPrimary={true} btnTxt={"Search"} handleClick={() => getMovieName(searchTxt)} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
