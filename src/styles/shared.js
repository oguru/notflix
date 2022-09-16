import {makeStyles} from "@material-ui/core";

const useSharedStyles = makeStyles((theme) => ({
   cardImg: {
      borderRadius: theme.spacing(0.5),
      maxHeight: "280px",
      maxWidth: "260px",
      minWidth: "230px",
      objectFit: "contain",

      "&.modalImg": {
         maxHeight: "300px",
         objectFit: "contain",

         [theme.breakpoints.up("md")]: {
            height: "368px",
            maxHeight: "100%",
            maxWidth: "360px",
            minWidth: "240px",
            objectFit: "cover",
            top: theme.spacing(2)
         }
      }
   },

   textSpacing: {
      margin: theme.spacing(1)
   }
}));

export default useSharedStyles;