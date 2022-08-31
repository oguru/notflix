import { makeStyles } from "@material-ui/core";

const sharedStyles = makeStyles((theme) => ({
   cardImg: {
      borderRadius: theme.spacing(0.5),
      maxHeight: "280px",
      maxWidth: "260px",
      minWidth: "230px",
      objectFit: "contain"
   },
   textSpacing: {
      margin: theme.spacing(1)
   },
}));

export default sharedStyles;