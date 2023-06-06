import {fade, makeStyles} from "@material-ui/core";

const useNavbarStyles = makeStyles((theme) => ({
   appBarStyles: {
      position: "fixed",
      transition: "0.6s"
   },

   button: {
      position: "absolute",

      "&.MuiButton-contained.Mui-disabled": {
         boxShadow: (props) => props.isLoading ? `0 0 0 2px rgba(255, 255, 255, 0.15) inset` : "none"
      }
   },

   buttonCont: {
      alignItems: "center",
      display: "flex",
      justifyContent: "center",
      marginLeft: theme.spacing(1),
      position: "relative",
      width: "64px"
   },

   closeIcon: {
      "&:hover": {
         transform: "scale(1.1)"
      },

      cursor: "pointer",
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(3),
      transition: "0.2s"
   },

   displaySwitch: {
      marginLeft: theme.spacing(1),

      [theme.breakpoints.up("sm")]: {
         margin: theme.spacing(0, 2, 0, 1)
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

      padding: theme.spacing(1, 1, 1, 0),
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
      height: "unset",
      justifyContent: "center",
      overflow: "hidden",
      paddingRight: theme.spacing(1),
      transition: "1s",

      [theme.breakpoints.up("sm")]: {
         alignItems: "center",
         height: "unset",
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
      transition: (props) => `transform ${props.nIconTransition}ms cubic-bezier(0, 0, 0.2, 1) 0ms`
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
      "&:hover": {
         backgroundColor: fade(theme.palette.common.white, 0.25)
      },

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

export default useNavbarStyles;