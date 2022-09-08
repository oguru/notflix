import {makeStyles} from "@material-ui/core";

const useMovieCardStyles = makeStyles((theme) => ({
   cardBottom: {
      display: "flex",
      flexDirection: "column",
      height: "160px",
      justifyContent: "space-between"
   },

   cardExpandOff: {
      transform: "scale(1)",
      transition: "0.2s ease-in-out"
   },

   cardExpandOn: {
      transform: "scale(1.075)",
      transition: "0.2s ease-in-out"
   },

   flexColumn: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start"
   },

   genre: {
      fontSize: "14px",
      padding: theme.spacing(1, 0)
   },

   movieCard: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "space-between",
      padding: theme.spacing(2.5),
      textAlign: "center",
      width: "300px"
   },

   noPosterStyle: {
      maxWidth: "60%",
      position: "absolute",
      top: theme.spacing(5)
   },

   rating: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      height: theme.spacing(6),
      justifyContent: "space-between",
      width: theme.spacing(5)
   },

   ratingIcon: {
      "&:hover": {
         filter: "drop-shadow(0 3px 3px grey)",
         transform: "translate(0, -3px)"
      },

      "a": {
         border: "none",
         outline: "0"
      },

      height: theme.spacing(3),
      transition: "0.2s"
   },

   scoreText: {
      fontSize: "14px"
   },

   scores: {
      alignItems: "center",
      display: "flex",
      justifyContent: "space-around"
   },

   title: {
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
      fontSize: "16px",
      height: "105px",
      justifyContent: "center",

      "& h6": {
         display: "-webkit-box",
         "-webkit-box-orient": "vertical",
         "-webkit-line-clamp": 2,
         overflow: "hidden"
      }
   }
}));

export default useMovieCardStyles;