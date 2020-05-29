import React, { useState } from "react";
import styles from "./Navbar.module.scss";
// import Button from "../Button";
import {InputBase, IconButton, Typography, Toolbar, AppBar, Button} from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import notflixImg from "../../assets/notflix-logo-800.png";


const Navbar = (props) => {
  const { getMovieName } = props;

  const [searchTxt, setSearchTxt] = useState("");

  const useStyles = makeStyles((theme) => ({
    // root: {
    //   flexGrow: 1,
    // },
    // title: {
    //   flexGrow: 1,
    //   display: 'none',
    //   [theme.breakpoints.up('sm')]: {
    //     display: 'block',
    //   },
    // },
    navStyles: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    notflix: {
      height: '40px'
    },
    search: {
      // display: "flex",
      justifyContent: "center",
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      // marginLeft: 0,
      // width: `400px`,
      // width: '100%',
      // [theme.breakpoints.up('sm')]: {
      //   marginLeft: theme.spacing(1),
      //   width: 'auto',
      // },
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
      display: "flex"
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
  
  const classes = useStyles();

  return (
    <>
      <nav className={classes.root}>
      <AppBar position="static">
        <Toolbar className={classes.navStyles}>
          {/* <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography> */}
          <img className={classes.notflix} src={notflixImg} alt="Notflix Logo"/>

          <div className={classes.searchCont}>
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
                onInput={e => setSearchTxt(e.target.value)}
              />
            </div>
            <Button className={classes.button}
              onClick={() => getMovieName(searchTxt)} variant="contained" color="primary">
                Go!
            </Button>
          </div>

        </Toolbar>
      </AppBar>

        {/* <label for="basic-search"></label>
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
        </div> */}
      </nav>
    </>
  );
};

export default Navbar;
