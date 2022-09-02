import { Card, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

const LoadingBox = (props) => {
   const {
      classes, 
      index,
      showRatings
   } = props;

   LoadingBox.propTypes = {
      classes: PropTypes.object,
      index: PropTypes.number
   };

   const useStyles = makeStyles((theme) => ({
      '@keyframes pulse': {
         "0%": {transform: "scale(1)", opacity: 0.5},
         "40%": {transform: "scale(1)", opacity: 0.5},
         "50%": {transform: "scale(1.01)", opacity: 1},
         "60%": {transform: "scale(1)", opacity: 0.5},
         "100%": {transform: "scale(1)", opacity: 0.5}
       },
       pulse: {
         animation: `$pulse 3s ${theme.transitions.easing.easeInOut} ${(index + 1) * 0.1}s infinite`
       },
       ghostContainer: {
         backgroundColor: "rgba(255,255,255,0.1)",
         borderRadius: theme.shape.borderRadius,
       },
       ghostImage: {
         height: "250px",
       },
       ghostTitle: {
         height: "85px"
       },
       ghostRating: {
         // transform: "scale(0.8)",
         // border: "rgba(255,255,255,0.3) solid 2px"
       },
       contentWidth: {
         width: "230px"
       }
   }));

   Object.assign(classes, useStyles())

   return (
      <>
         <Card
            elevation={1} 
            className={`${classes.movieCard} ${classes.flexColumn} ${classes.pulse}`}
         >
            <div className={`${classes.cardImg} ${classes.ghostContainer} ${classes.ghostImage} ${classes.contentWidth}`}>
            </div>
            <div className={`${classes.cardBottom}  ${classes.contentWidth}`}>
               <div className={`${classes.title} ${classes.ghostTitle} ${classes.ghostContainer}`}>
               </div>
               {showRatings &&
                  <section className={`${classes.scores}`}>
                  {[...Array(3).keys()].map(
                     (key) => (
                        <div key={`rating${index}${key}`} className={`${classes.rating} ${classes.ghostRating} ${classes.ghostContainer}`}>
                        </div>
                     )
                  )}
               </section>
               }
            </div>
         </Card>
      </>
   );
}

export default LoadingBox;