import {AppBar, Button, Drawer, InputBase, Paper, Popper, Switch, Toolbar, Typography} from "@material-ui/core";
import React, {useState} from "react";
import {fade, makeStyles} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import HelpIcon from "@material-ui/icons/Help";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import notflixImg from "../../assets/notflix-logo-800.png";

const Navbar = (props) => {
  const {
    changeDetailMode,
    detailMode,
    getMovieName,
    scrollDir,
    searchOpen,
    searchTxt,
    setSearchTxt,
    toggleSearch,
    windowWidth
  } = props;

  Navbar.propTypes = {
    changeDetailMode: PropTypes.func,
    detailMode: PropTypes.bool,
    getMovieName: PropTypes.func,
    scrollDir: PropTypes.string,
    searchOpen: PropTypes.bool,
    searchTxt: PropTypes.string,
    setSearchTxt: PropTypes.func,
    toggleSearch: PropTypes.func,
    windowWidth: PropTypes.number
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const navHeight = "unset";

  const useStyles = makeStyles((theme) => ({
    appBarStyles: {position: "fixed",
      transition: "0.6s"},

    button: {marginLeft: theme.spacing(1)},

    closeIcon: {
      position: "absolute",
      top: theme.spacing(3),
      right: theme.spacing(1),
      cursor: "pointer"
    },

    displaySwitch: {marginLeft: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {margin: theme.spacing(
        0, 2, 0, 1
      )}},

    helpIcon: {
      "&:hover": {color: "#2b59c3"},
      "&:active": {color: "#e50914"},
      transition: "0.1s",
      cursor: "pointer",
      float: "right"
    },

    helpTitle: {fontWeight: "bold"},

    inputInput: {
      padding: theme.spacing(
        1, 1, 1, 0
      ),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "16ch",
      [theme.breakpoints.up("sm")]: {width: "12ch",
        "&:focus": {width: "18ch"}},
      [theme.breakpoints.up("md")]: {width: "16ch",
        "&:focus": {width: "24ch"}}
    },

    inputRoot: {color: "inherit"},

    navHide: {transform: "translateY(-48px)",
      [theme.breakpoints.up("sm")]: {transform: "translateY(-56px)"}},

    navShow: {transform: "translateY(0)"},

    navStyles: {
      display: "flex",
      // flexDirection: "column",
      justifyContent: "center",
      height: `${navHeight}`,
      transition: "1s",
      // flexWrap: "wrap",
      paddingRight: theme.spacing(1),
      [theme.breakpoints.up("sm")]: {
        height: "unset",
        alignItems: "center",
        // flexDirection: "row",
        justifyContent: "space-between",
        paddingRight: theme.spacing(3)
      }
    },

    notflix: {height: theme.spacing(5)},

    popper: {zIndex: 3000},

    paperHelp: {
      backgroundColor: "white",
      padding: theme.spacing(1),
      margin: theme.spacing(2, 0),
      width: "300px",
      boxShadow: "0px 4px 12px -2px rgba(201,201,201,0.4)",
      color: "rgb(0, 0, 0, 1)"
    },

    search: {
      justifyContent: "center",
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {backgroundColor: fade(theme.palette.common.white, 0.25)}
    },

    searchCont: {
      alignItems: "center",
      display: "flex",
      flexWrap: "wrap",
      height: theme.spacing(8),
      justifyContent: "flex-end",
      paddingRight: theme.spacing(2),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        paddingRight: "0",
        width: "unset"
      }
    },

    searchIcon: {
      alignItems: "center",
      display: "flex",
      height: "100%",
      justifyContent: "center",
      padding: theme.spacing(0, 2),
      pointerEvents: "none",
      position: "absolute"
    },

    topBar: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      [theme.breakpoints.up("sm")]: {flexGrow: "1",
        width: "unset"}
    },

    topRightNav: {
      alignItems: "center",
      display: "flex"
    }

  }));

  const classes = useStyles();

  const toggleHelp = (e) => {
    e.stopPropagation();
    setAnchorEl(anchorEl ? null : e.currentTarget);
  };

  const helpOpen = Boolean(anchorEl);
  const helpId = helpOpen ? "popper" : undefined;

  const toggleNav = scrollDir === "down" ? classes.navHide : classes.navShow;

  const checkSearch = () => !searchOpen;

  const infoToggle = detailMode ? "" : "/movie scores";

  const searchBar = <div className={classes.searchCont}>
    <div className={classes.search}>
      <span className={classes.searchIcon}>
        <SearchIcon />
      </span>
      <InputBase
        placeholder="Search…"
        classes={{root: classes.inputRoot,
          input: classes.inputInput}}
        value={searchTxt}
        inputProps={{"aria-label": "search"}}
        onKeyPress={e => e.key === "Enter" ? getMovieName(searchTxt) : null}
        onInput={e => setSearchTxt(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        autoFocus={true}
      />
    </div>
    <Button id="searchButton" className={classes.button}
      onClick={() => getMovieName(searchTxt)}
      variant="contained" color="secondary">
        Go!
    </Button>
  </div>;

  return (
    <>
      <AppBar className={`${classes.appBarStyles} ${toggleNav}`} position="static" onClick={() => toggleSearch(() => checkSearch())}>
        <Toolbar className={classes.navStyles}>
          <div className={classes.topBar}>
            <img className={classes.notflix} src={notflixImg} alt="Notflix Logo"/>
            <Popper className={classes[helpId]} open={helpOpen} anchorEl={anchorEl}>
              <Paper onClick={e => e.stopPropagation()} className={classes.paperHelp} variant="outlined" backgroundColor="white" elevation={23}>
                <CloseIcon onClick={() => setAnchorEl(false)} className={classes.closeIcon} />
                <Typography paragraph={true}><span className={classes.helpTitle}>Switch On - Full Mode:</span> Loads all movie details allowing scores to be shown on front of cards.</Typography>
                <Typography paragraph={true}><span className={classes.helpTitle}>Switch Off - Fast Mode:</span> Loads images, titles and years of movies.</Typography>
                <Typography paragraph={true}>Click on a movie card to see more detailed information{infoToggle}, and a score icon to open the relevant website.</Typography>
              </Paper>
            </Popper>
            <div className={classes.topRightNav}>
              <HelpIcon className={classes.helpIcon} onClick={toggleHelp} />
              <Switch
                className={classes.displaySwitch}
                onClick={(e) => e.stopPropagation()}
                onChange={() => changeDetailMode()}
                checked={detailMode}
              />
            </div>
          </div>
          {windowWidth < 600 ?
            <Drawer variant="persistent" anchor="top" open={searchOpen}>{searchBar}</Drawer> : searchBar}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
