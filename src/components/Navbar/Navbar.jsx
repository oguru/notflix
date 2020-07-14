import React, { useState } from "react";
import styles from "./Navbar.module.scss";
// import Button from "../Button";
import {InputBase, IconButton, Typography, Toolbar, AppBar, Button, Switch, Popper, Paper, SwipeableDrawer} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import notflixImg from "../../assets/notflix-logo-800.png";
import HelpIcon from '@material-ui/icons/Help';
import zIndex from "@material-ui/core/styles/zIndex";

const Navbar = (props) => {
  const { getMovieName, detailMode, changeDetailMode, searchTxt, setSearchTxt} = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const [navOpen, toggleNav] = useState(false)

    // .MuiSwitch-switchBase {color} = switch main
  // .MuiSwitch-colorSecondary.Mui-checked {color} = switch main when on

  // .MuiSwitch-track {background-color: #000} = switch track when off
  // .MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track {background-color: red} = switch track when on

  const useStyles = makeStyles((theme) => ({
    appBarStyles: {
      marginBottom: theme.spacing(2)
    },
    closeIcon: {
      position: "absolute",
      top: theme.spacing(3),
      right: theme.spacing(1),
      cursor: "pointer"
    },
    navStyles: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    notflix: {
      height: theme.spacing(5)
    },
    popper: {
      zIndex: 3000
    },
    helpIcon: {
      transition: "0.1s",
      cursor: "pointer",
      "&:hover": {
        color: "#2b59c3"
      },
      "&:active": {
        color: "#e50914"
      }
    },
    paperHelp: {
      backgroundColor: "white",
      padding: theme.spacing(1),
      margin: theme.spacing(2, 0),
      width: "300px",
      boxShadow: "0px 4px 12px -2px rgba(201,201,201,0.4)",
      color: "rgb(0, 0, 0, 1)"
    },
    helpTitle: {
      fontWeight: "bold"
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
      // [theme.breakpoints.up('sm')]: {

      // }
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

  const toggleHelp = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const helpOpen = Boolean(anchorEl);
  const helpId = helpOpen ? 'popper' : undefined;

  // const handleKeyInput = e => {
  //   // e.key === "enter" ? 
  //   // setSearchTxt(e.target.value)
    
  //   // setSearchTxt(e.target.value)
  // }
  
  return (
    <>
      {/* <nav className={classes.root}> */}
      {/* <SwipeableDrawer             
        open={navOpen}
        anchor={"top"}
        onClose={toggleNav(false)}
        onOpen={toggleNav(true)}
      > */}
        <AppBar className={classes.appBarStyles} position="static">
          <Toolbar className={classes.navStyles}>
            <img className={classes.notflix} src={notflixImg} alt="Notflix Logo"/>
            <div className={classes.searchCont}>
              <Popper className={classes[helpId]} open={helpOpen} anchorEl={anchorEl}>
                {/* <div className={classes.helpWindow}> */}
                  <Paper className={classes.paperHelp} variant="outlined" backgroundColor="white" elevation={23}>
                    <CloseIcon onClick={() => setAnchorEl(false)} className={classes.closeIcon} />
                    <Typography paragraph={true}><span className={classes.helpTitle}>Switch On - Full Mode:</span> Loads all movie details allowing scores to be shown on front of cards.</Typography>
                    <Typography paragraph={true}><span className={classes.helpTitle}>Switch Off - Fast Mode:</span> Loads images, titles and years of movies.</Typography>
                    <Typography>Click on a movie card to see more detailed information (including scores).</Typography>
                  </Paper>
                {/* </div> */}
              </Popper>
                <HelpIcon className={classes.helpIcon} onClick={toggleHelp} />
                <Switch 
                  className={classes.displaySwitch}
                  onChange={() => changeDetailMode()} 
                  checked={detailMode}/>
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
                  value={searchTxt}
                  inputProps={{ 'aria-label': 'search' }}
                  onKeyPress={e => e.key === "Enter" ? getMovieName(searchTxt) : null}
                  onInput={e =>  setSearchTxt(e.target.value)}
                />
              </div>
              <Button id="searchButton" className={classes.button}
                onClick={() => getMovieName(searchTxt)} 
                variant="contained" color="secondary">
                  Go!
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      {/* </SwipeableDrawer> */}
      {/* </nav> */}
    </>
  );
};

export default Navbar;
