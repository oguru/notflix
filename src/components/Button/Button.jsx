import React from "react";
import styles from "./Button.module.scss";

const Button = (props) => {
  const { btnTxt, isPrimary, handleClick } = props

  const btnStyles = isPrimary ? "btn-success" : "btn-danger";

  return (
    <>
      <button type="button" class={`btn ${btnStyles}`} onClick={handleClick}>{btnTxt} </button>
    </>
  );
};

export default Button;
