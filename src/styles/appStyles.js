import {makeStyles} from "@material-ui/core";

const useAppStyles = makeStyles((theme) => ({
   app: {
      backgroundColor: theme.palette.background.default,
      height: "100%",
      maxWidth: "100vw",
      minHeight: "100vh",
      paddingBottom: theme.spacing(2)
   },

   dashboard: {
      padding: `0 ${theme.spacing(2)}px`,
      paddingTop: theme.spacing(10)
   },

   sBarDetailMode: {
      backgroundColor: theme.palette.secondary.main
   },

   sBarFastMode: {
      backgroundColor: theme.palette.secondary.dark
   },

   snackBar: {
      bottom: theme.spacing(2),

      "& .MuiSnackbarContent-root": {
         backgroundColor: (props) => props.detailMode ?
            "rgba(229, 9, 20, 1)" :
            "rgba(43, 89, 195, 1)",
         color: "white",
         justifyContent: "center",
         minWidth: "200px"
      }
   }
}));

export default useAppStyles;