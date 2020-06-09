import React, { useState } from "react";
import styles from "./Navbar.module.scss";
// import Button from "../Button";
import {InputBase, IconButton, Typography, Toolbar, AppBar, Button, Switch} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import notflixImg from "../../assets/notflix-logo-800.png";
import HelpIcon from '@material-ui/icons/Help';

const Navbar = (props) => {
  const { getMovieName, displayMode, setDisplayMode } = props;

  const [searchTxt, setSearchTxt] = useState("");

    // .MuiSwitch-switchBase {color} = switch main
  // .MuiSwitch-colorSecondary.Mui-checked {color} = switch main when on

  // .MuiSwitch-track {background-color: #000} = switch track when off
  // .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track {background-color: red} = switch track when on

  const useStyles = makeStyles((theme) => ({
    appBarStyles: {
      // backgroundColor: "#055E94"
    },
    navStyles: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    notflix: {
      height: '40px'
    },
    displaySwitch: {
      margin: theme.spacing(0, 2)
    },
    search: {
      justifyContent: "center",
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchCont: {
      display: "flex",
      alignItems: "center"
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    button: {
      marginLeft: theme.spacing(1),
    }
  }));

  // const styledSwitch = styled
  
  const classes = useStyles();

  const displayHelp = () => alert("help");

  const handleKeyInput = e => {
    // e.key === "enter" ? 
    // setSearchTxt(e.target.value)
    
    // setSearchTxt(e.target.value)
  }

  return (
    <>
      {/* <nav className={classes.root}> */}
      <AppBar className={classes.appBarStyles} position="static">
        <Toolbar className={classes.navStyles}>
          <img className={classes.notflix} src={notflixImg} alt="Notflix Logo"/>
          <div className={classes.searchCont}>
              <HelpIcon className={classes.helpIcon} onClick={() => displayHelp()} />
              <Switch className={classes.displaySwitch} />
            <div className={classes.search}>
              <span className={classes.searchIcon}>
                <SearchIcon />
              </span>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onKeyPress={e => e.key === "Enter" ? getMovieName(searchTxt) : null}
                onInput={e => setSearchTxt(e.target.value)}
              />
            </div>
            <Button id="searchButton" className={classes.button}
              onClick={() => getMovieName(searchTxt)} variant="contained" color="secondary">
                Go!
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      {/* </nav> */}
    </>
  );
};

export default Navbar;
