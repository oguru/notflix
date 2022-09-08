import {makeStyles} from "@material-ui/core";

const useModalCardStyles = makeStyles((theme) => ({
   closeIcon: {
      "&:hover": {
         transform: "scale(1.1)"
      },
      alignSelf: "flex-start",
      color: "white",
      cursor: "pointer",
      fontSize: "30px",
      transition: "0.2s",

      [theme.breakpoints.up("md")]: {
         right: theme.spacing(2),
         top: theme.spacing(2)
      }
   },

   customScrollbar: {
      "&::-webkit-scrollbar": {
         width: "7px"
      },

      "&::-webkit-scrollbar-track": {
         backgroundColor: "rgb(247, 247, 247)",
         boxShadow: "inset 0 0 6px rgba(207, 207, 207, 0.096)"
      },

      "&::-webkit-scrollbar-thumb": {
         backgroundColor: "rgba(229, 9, 20, 1)",
         borderRadius: "2px"
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
         paddingLeft: theme.spacing(2)
      }
   },

   modalCard: {
      backgroundColor: "#eef1fc",
      // border:
      //    `${theme.palette.background.default}
      //    solid
      //    ${theme.spacing(2)}px`,
      borderTop: 0,
      borderRadius: theme.spacing(0.5),
      boxShadow: theme.shadows[5],
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      height: (props) => `${props.modalHeight}px`,
      left: (props) => `${props.halfClientWidth - props.modalWidth / 2}px`,
      // left: () => 0,
      overflow: "hidden",
      position: "fixed",
      // top: (props) => `calc(50vh - ${props.modalHeight}px/2)`,
      top: (props) => `calc(50vh - ${props.modalHeight}px/2)`,
      width: (props) => `${props.modalWidth}px`,
      // width: () => "100vw",

      [theme.breakpoints.up("sm")]: {
         // height: (props) => `${props.modalHeight * 1.25}px`,
         // left: (props) => `${props.halfClientWidth - props.modalWidth * 0.625}px`,
         // top: (props) => `calc(50vh - ${props.modalHeight * 0.625}px)`
         // width: (props) => `${props.modalWidth * 1.25}px`
      },

      [theme.breakpoints.up("md")]: {

         // height: (props) => `${props.modalHeight}px`,
         // left: (props) => `${props.halfClientWidth - props.modalWidth * 1.125}px`,
         overflow: "visible"
         // top: (props) => `calc(50vh - ${props.modalHeight / 2}px)`
         // width: (props) => `${props.modalWidth * 2.25}px`
      }
   },

   modalContent: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      // height: (props) => `${props.modalHeight - 65}px`,
      justifyContent: "space-between",
      overflow: "auto",
      padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,

      "@media (max-height: 550px)": {
         paddingBottom: theme.spacing(5)
      },

      [theme.breakpoints.up("sm")]: {
         height: (props) => `${props.modalHeight * 1.25 - 65}px`
      },

      [theme.breakpoints.up("md")]: {
         alignItems: "flex-start",
         flexDirection: "row",
         height: (props) => `${props.modalHeight - 65}px`,
         overflow: "hidden",
         justifyContent: "flex-start"
         // padding: `${theme.spacing(2)}px ${theme.spacing(2)}px 0`
      }
   },

   plotCont: {
      [theme.breakpoints.up("md")]: {
         display: "flex",
         flexDirection: "column",
         order: "2",
         flexGrow: 1
      }
   },

   plotTxt: {
      overflowY: "auto",
      [theme.breakpoints.up("md")]: {
         flexGrow: 1,
         height: "240px",
         marginBottom: theme.spacing(2),
         paddingRight: theme.spacing(1)
      }
   },

   scoresModal: {
      justifyContent: "space-evenly",
      margin: `${theme.spacing(3)}px 0 ${theme.spacing(1)}px`,
      // paddingBottom: theme.spacing(2),

      [theme.breakpoints.up("md")]: {
         "& .rating": {
            marginLeft: theme.spacing(4)
         },

         justifyContent: "flex-end",
         margin: `
            0 
            ${theme.spacing(1)}px`
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
      color: "white",
      fontSize: "26px",
      fontWeight: "600",
      textAlign: "left",
      fontFamily: "BebasNeue",
      textTransform: "uppercase",
      letterSpacing: "2px",
      lineHeight: 1,
      // padding: theme.spacing(2),
      paddingTop: "5px",
      paddingRight: theme.spacing(1),

      [theme.breakpoints.up("md")]: {
         "& span": {
            fontSize: "20px",
            fontWeight: "normal",
            textTransform: "none",
            letterSpacing: "1px",
            marginLeft: theme.spacing(1.5)
         }

      }
   },

   titleBar: {
      backgroundColor: theme.palette.secondary.main,
      borderBottom: "7px white solid",
      padding: theme.spacing(2),
      width: "100%"
   },

   yearTitle: {
      lineHeight: `${theme.spacing(2.5)}px`,
      margin: `${theme.spacing(1.25)}px 0`,
      textAlign: "center",

      [theme.breakpoints.up("md")]: {
         marginBottom: "0",
         marginTop: "0",
         order: "1",
         textAlign: "left"
      }
   }
}));

export default useModalCardStyles;