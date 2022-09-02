import { makeStyles } from "@material-ui/core";

const modalCardStyles = makeStyles((theme) => ({

   closeIcon: {
      "&:hover": {
         transform: "scale(1.1)"
      },
      cursor: "pointer",
      position: "absolute",
      right: theme.spacing(0.75),
      top: theme.spacing(0.75),
      transition: "0.2s",
      
      [theme.breakpoints.up("md")]: {
         right: theme.spacing(2),
         top: theme.spacing(2)
      }
   },

   flexColumn: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
   },

   flexRow: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-between"
   },

   modalBody: {
      width: "100%",

      [theme.breakpoints.up("md")]: {
         display: "flex",
         flexDirection: "column-reverse",
         height: "100%",
         justifyContent: "space-between",
         paddingLeft: theme.spacing(1)
      }
   },

   modalCard: {
      backgroundColor: "white",
      border: 
         `${theme.palette.background.default} 
         solid 
         ${theme.spacing(2)}px`,
      borderRadius: theme.spacing(0.5),
      boxShadow: theme.shadows[5],
      height: (props) => `${props.minModalHeight}px`,
      left: (props) => 
         `${props.halfClientWidth - props.minModalWidth / 2}px`,
      overflow: "scroll",
      padding: theme.spacing(2),
      position: "fixed",
      scrollbarWidth: "thin",
      top: (props) => `calc(50vh - ${props.minModalHeight}px/2)`,
      width: (props) => `${props.minModalWidth}px`,

      [theme.breakpoints.up("sm")]: {
         height: (props) => `${props.minModalHeight * 1.25}px`,
         left: (props) => 
            `${props.halfClientWidth - props.minModalWidth * 0.625}px`,
         top: (props) => 
            `calc(50vh - ${props.minModalHeight * 0.625}px)`,
         width: (props) => `${props.minModalWidth * 1.25}px`
      },

      [theme.breakpoints.up("md")]: {
         height: (props) => `${props.minModalHeight}px`,
         left: (props) => 
            `${props.halfClientWidth - props.minModalWidth * 1.125}px`,
         overflow: "visible",
         top: (props) => `calc(50vh - ${props.minModalHeight / 2}px)`,
         width: (props) => `${props.minModalWidth * 2.25}px`
      }
   },

   modalContent: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",

      [theme.breakpoints.up("md")]: {
         alignItems: "flex-start",
         flexDirection: "row",
         height: "300px",
         justifyContent: "flex-start",
         marginBottom: theme.spacing(2)
      }
   },

   modalImg: {
      maxHeight: "300px"
   },

   plotTxt: {
      "&::-webkit-scrollbar": {
         width: "7px"
      },
      "&::-webkit-scrollbar-track": {
         backgroundColor: "rgb(247, 247, 247)",
         boxShadow: "inset 0 0 6px rgba(207, 207, 207, 0.096)",
      },
      "&::-webkit-scrollbar-thumb": {
         backgroundColor: "rgba(229, 9, 20, 1)",
         borderRadius: "2px"
      },

      [theme.breakpoints.up("md")]: {
         height: "240px",
         marginBottom: theme.spacing(1.5),
         overflowY: "auto",
         paddingRight: theme.spacing(1),
      }
   },

   scoresModal: {
      margin: `${theme.spacing(1.5)}px 0`,

      [theme.breakpoints.up("md")]: {
         justifyContent: "space-evenly",
         margin: `0 ${theme.spacing(5)}px`
      }
   },

   textBody: {
      fontSize: "14px"
   },

   textHead: {
      fontSize: "14px",
      fontWeight: "bold",
      lineHeight: `${theme.spacing(2)}px`,
      marginBottom: theme.spacing(1.5)
   },

   title: {
      fontSize: "18px",
      marginBottom: theme.spacing(2),
      textAlign: "center"
   },

   yearTitle: {
      lineHeight: `${theme.spacing(2.5)}px`,
      margin: `${theme.spacing(1.25)}px 0`,
      textAlign: "center",

      [theme.breakpoints.up("md")]: {
         marginBottom: "0",
         marginTop: "0",
         textAlign: "left"
      }
   },
}));

export default modalCardStyles;