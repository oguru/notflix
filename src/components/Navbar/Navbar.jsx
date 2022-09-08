import {AppBar, Button, CircularProgress, Drawer, InputBase, Paper, Popper, Switch, Toolbar, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import CloseIcon from "@material-ui/icons/Close";
import HelpIcon from "@material-ui/icons/Help";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import nImg from "../../assets/n-logo.png";
import notflixImg from "../../assets/notflix-logo-800.png";
import useNavbarStyles from "../../styles/navbarStyles.js";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

const Navbar = (props) => {
   const {
      detailMode,
      handleSubmitSearch,
      handleToggleDetailMode,
      isLoading,
      searchTxt,
      setSearchTxt,
      xsScreen
   } = props;

   Navbar.propTypes = {
      detailMode: PropTypes.bool,
      handleSubmitSearch: PropTypes.func,
      handleToggleDetailMode: PropTypes.func,
      isLoading: PropTypes.bool,
      searchTxt: PropTypes.string,
      setSearchTxt: PropTypes.func,
      xsScreen: PropTypes.bool
   };

   const [anchorEl, setAnchorEl] = useState(null);
   const [searchOpen, toggleSearch] = useState(false);
   const scrollTrigger = useScrollTrigger();

   const helpOpen = Boolean(anchorEl);
   const classes = useNavbarStyles({
      isLoading,
      nIconSpeed: searchOpen ? 225 : 425
   });

   useEffect(() => {
      if (searchOpen && scrollTrigger) {
         toggleSearch(false);
      }
   }, [scrollTrigger]);

   const handleToggleSearch = () => {
      if (xsScreen) {
         toggleSearch(!searchOpen);
      }
   };

   const handleSubmit = () => {
      toggleSearch();
      handleSubmitSearch({query: searchTxt});
   };

   const toggleHelp = (e) => {
      e.stopPropagation();
      setAnchorEl(anchorEl ? null : e.currentTarget);
   };

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
                  autoFocus={true}
                  classes={{
                     input: classes.inputInput,
                     root: classes.inputRoot
                  }}
                  inputProps={{"aria-label": "search"}}
                  onClick={(e) => e.stopPropagation()}
                  onInput={e => setSearchTxt(e.target.value)}
                  onKeyPress={e => e.key === "Enter" ? handleSubmit() : null}
                  placeholder="Search…"
                  value={searchTxt}
               />
            </div>
            <div className={classes.buttonCont}>
               {isLoading &&
                  <CircularProgress
                     color="secondary"
                     size={25}
                     thickness={5}
                  />
               }
               <Button
                  className={classes.button}
                  color="secondary"
                  disabled={isLoading}
                  onClick={handleSubmit}
                  variant="contained"
               >
                  Go!
               </Button>
            </div>
         </div>
      </div>;

   return (
      <AppBar
         className={`
            ${classes.appBarStyles} 
            ${scrollTrigger ? classes.navHide : classes.navShow}
         `}
         position="static"
         onClick={() => handleToggleSearch()}
      >
         <Toolbar className={classes.navStyles}>
            <div className={classes.topBar}>
               <img
                  className={`
                     ${classes.notflix} 
                     ${searchOpen ? classes.nfAnim : ""}
                  `}
                  src={notflixImg}
                  alt="Notflix Logo"
               />
               <Popper
                  className={classes[helpOpen ? "popper" : ""]}
                  open={helpOpen}
                  anchorEl={anchorEl}
               >
                  <Paper
                     onClick={e => e.stopPropagation()}
                     className={classes.paperHelp}
                     variant="outlined"
                     backgroundColor="white"
                     elevation={23}
                  >
                     <CloseIcon
                        onClick={() => setAnchorEl(false)}
                        className={classes.closeIcon}
                     />
                     <Typography className={classes.helpTitle} paragraph={false}>
                        Switch On - Full Mode:
                     </Typography>
                     <Typography paragraph={true}>
                        Loads all movie details allowing scores to be shown on front of cards.
                     </Typography>
                     <Typography className={classes.helpTitle} paragraph={false}>
                        Switch Off - Fast Mode:
                     </Typography>
                     <Typography paragraph={true}>
                        Loads images, titles and years of movies.
                     </Typography>
                     <Typography>
                        Click on a movie card to see more detailed information{detailMode ? "" : "/movie scores"}, and a score icon to open the relevant website.
                     </Typography>
                  </Paper>
               </Popper>
               <div className={classes.topRightNav}>
                  <HelpIcon
                     className={classes.helpIcon}
                     onClick={toggleHelp}
                  />
                  <Switch
                     className={classes.displaySwitch}
                     onClick={(e) => e.stopPropagation()}
                     onChange={() => handleToggleDetailMode()}
                     checked={detailMode}
                  />
               </div>
            </div>
            {xsScreen ?
               <Drawer
                  variant="persistent"
                  anchor="top"
                  open={searchOpen}
               >
                  {searchBar}
               </Drawer> : searchBar}
         </Toolbar>
      </AppBar>
   );
};

export default Navbar;
