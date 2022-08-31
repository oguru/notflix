import {AppBar, Button, Drawer, InputBase, Paper, Popper, Switch, Toolbar, Typography, Slide} from "@material-ui/core";
import React, {useEffect, useRef, useState} from "react";
import {fade, makeStyles} from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import HelpIcon from "@material-ui/icons/Help";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import nImg from "../../assets/n-logo.png";
import notflixImg from "../../assets/notflix-logo-800.png";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const Navbar = (props) => {
   const {
      handleToggleDetailMode,
      detailMode,
      handleSubmitSearch,
      isLoading,
      searchTxt,
      setSearchTxt,
      xsScreen
   } = props;

   Navbar.propTypes = {
      handleToggleDetailMode: PropTypes.func,
      detailMode: PropTypes.bool,
      handleSubmitSearch: PropTypes.func,
      isLoading: PropTypes.bool,
      searchTxt: PropTypes.string,
      setSearchTxt: PropTypes.func,
      xsScreen: PropTypes.bool
   };

   const [anchorEl, setAnchorEl] = useState(null);
   const [searchOpen, toggleSearch] = useState(false);
   const scrollTrigger = useScrollTrigger();

   const handleToggleSearch = () => {
      if (xsScreen) {
         toggleSearch(!searchOpen)
      }
   }

   const handleSubmit = () => {
         toggleSearch();
         handleSubmitSearch({query: searchTxt});
   }

   const navHeight = "unset";

   const nIconSpeed = searchOpen ? 225 : 425;

   const useStyles = makeStyles((theme) => ({
      appBarStyles: {
         position: "fixed",
         transition: "0.6s"
      },

      button: {
         marginLeft: theme.spacing(1)
      },

      closeIcon: {
         cursor: "pointer",
         position: "absolute",
         right: theme.spacing(1),
         top: theme.spacing(3)
      },

      displaySwitch: {
         marginLeft: theme.spacing(1),
         [theme.breakpoints.up("sm")]: {
            margin: theme.spacing(
               0, 2, 0, 1
            )
         }
      },

      flexCont: {
         display: "flex"
      },

      helpIcon: {
         "&:active": {color: "#e50914"},
         "&:hover": {color: "#2b59c3"},
         cursor: "pointer",
         float: "right",
         transition: "0.1s"
      },

      helpTitle: {
         fontWeight: "bold"
      },

      inputInput: {
         "&:focus": {width: "125px"},
         padding: theme.spacing(
            1, 1, 1, 0
         ),
         paddingLeft: `calc(${theme.spacing(6)}px)`,
         transition: theme.transitions.create("width"),
         width: "85px",
         [theme.breakpoints.up("sm")]: {
            "&:focus": {width: "150px"},
            width: "100px"
         },
         [theme.breakpoints.up("md")]: {
            "&:focus": {width: "225px"},
            width: "150px"
         }
      },

      inputRoot: {
         color: "inherit"
      },

      navHide: {
         transform: "translateY(-48px)",
         [theme.breakpoints.up("sm")]: {
            transform: "translateY(-56px)"
         }
      },

      navShow: {
         transform: "translateY(0)"
      },

      navStyles: {
         display: "flex",
         // flexDirection: "column",
         height: `${navHeight}`,
         justifyContent: "center",
         overflow: "hidden",
         paddingRight: theme.spacing(1),
         transition: "1s",
         // flexWrap: "wrap",
         [theme.breakpoints.up("sm")]: {
            alignItems: "center",
            height: "unset",
            // flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: theme.spacing(3)
         }
      },

      nfAnim: {
         transform: "translateY(55px)",
         [theme.breakpoints.up("sm")]: {
            transform: "translateY(0px)"
         }
      },

      notflix: {
         height: theme.spacing(5),
         overflow: "hidden",
         transition: `transform ${nIconSpeed}ms cubic-bezier(0, 0, 0.2, 1) 0ms`
      },

      paperHelp: {
         backgroundColor: "white",
         boxShadow: "0px 4px 12px -2px rgba(201,201,201,0.4)",
         color: "rgb(0, 0, 0, 1)",
         margin: theme.spacing(2, 0),
         padding: theme.spacing(1),
         width: "300px"
      },

      popper: {
         zIndex: 3000
      },

      search: {
         "&:hover": {backgroundColor: fade(theme.palette.common.white, 0.25)},
         backgroundColor: fade(theme.palette.common.white, 0.15),
         borderRadius: theme.shape.borderRadius,
         position: "relative"
      },

      searchCont: {
         alignItems: "center",
         display: "flex",
         flexWrap: "wrap",
         height: theme.spacing(8),
         justifyContent: "space-between",
         padding: theme.spacing(0, 2),
         width: "100%",
         [theme.breakpoints.up("sm")]: {
            paddingRight: "0",
            width: "unset"
         },
         [theme.breakpoints.up("md")]: {
            padding: "0"
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
         [theme.breakpoints.up("sm")]: {
            flexGrow: "1",
            width: "unset"
         }
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

   useEffect(() => {
      if (searchOpen && scrollTrigger) {
         toggleSearch(false)
      }
    }, [scrollTrigger]);

   const searchBar =
      <div className={classes.searchCont}>
         {xsScreen ?
            <img className={classes.notflix} src={nImg} alt="N Logo"/> : ""}
         <div className={classes.flexCont}>
            <div className={classes.search}>
               <span className={classes.searchIcon}>
                  <SearchIcon />
               </span>
               <InputBase
                  placeholder="Search…"
                  classes={{
                     input: classes.inputInput,
                     root: classes.inputRoot
                  }}
                  value={searchTxt}
                  inputProps={{"aria-label": "search"}}
                  onKeyPress={e => e.key === "Enter" ? handleSubmit() : null}
                  onInput={e => setSearchTxt(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus={true}
               />
            </div>
            <Button
               disabled={isLoading}
               id="searchButton"
               className={classes.button}
               onClick={handleSubmit}
               variant="contained"
               color="secondary">
         Go!
            </Button>
         </div>
      </div>;

   return (
      <AppBar className={`${classes.appBarStyles} ${scrollTrigger ? classes.navHide : classes.navShow}`} position="static" onClick={() => handleToggleSearch()}>
         <Toolbar className={classes.navStyles}>
            <div className={classes.topBar}>
               <img className={`${classes.notflix} ${searchOpen ? classes.nfAnim : ""}`} src={notflixImg} alt="Notflix Logo"/>
               <Popper className={classes[helpOpen ? "popper" : ""]} open={helpOpen} anchorEl={anchorEl}>
                  <Paper onClick={e => e.stopPropagation()} className={classes.paperHelp} variant="outlined" backgroundColor="white" elevation={23}>
                     <CloseIcon onClick={() => setAnchorEl(false)} className={classes.closeIcon} />
                     <Typography paragraph={true}><span className={classes.helpTitle}>Switch On - Full Mode:</span> Loads all movie details allowing scores to be shown on front of cards.</Typography>
                     <Typography paragraph={true}><span className={classes.helpTitle}>Switch Off - Fast Mode:</span> Loads images, titles and years of movies.</Typography>
                     <Typography paragraph={true}>Click on a movie card to see more detailed information{detailMode ? "" : "/movie scores"}, and a score icon to open the relevant website.</Typography>
                  </Paper>
               </Popper>
               <div className={classes.topRightNav}>
                  <HelpIcon className={classes.helpIcon} onClick={toggleHelp} />
                  <Switch
                     className={classes.displaySwitch}
                     onClick={(e) => e.stopPropagation()}
                     onChange={() => handleToggleDetailMode()}
                     checked={detailMode}
                  />
               </div>
            </div>
            {xsScreen ?
               <Drawer variant="persistent" anchor="top" open={searchOpen}>{searchBar}</Drawer> : searchBar}
         </Toolbar>
      </AppBar>
   );
};

export default Navbar;
