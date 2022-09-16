import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const LoadingBox = (props) => {
   const {
      cardClasses,
      index,
      showRatings
   } = props;

   LoadingBox.propTypes = {
      cardClasses: PropTypes.object,
      index: PropTypes.number,
      showRatings: PropTypes.bool
   };

   const useLoadingBoxStyles = makeStyles((theme) => ({
      "@keyframes pulse": {
         "0%": {transform: "scale(1)",
            opacity: 0.5},
         "40%": {transform: "scale(1)",
            opacity: 0.5},
         "50%": {transform: "scale(1.01)",
            opacity: 1},
         "60%": {transform: "scale(1)",
            opacity: 0.5},
         "100%": {transform: "scale(1)",
            opacity: 0.5}
      },

      contentWidth: {
         width: "230px"
      },

      ghostContainer: {
         backgroundColor: "rgba(255,255,255,0.1)",
         borderRadius: theme.shape.borderRadius
      },

      ghostImage: {
         height: "250px"
      },

      ghostTitle: {
         height: "85px"
      },

      pulse: {
         animation: `
            $pulse 
            3s 
            ${theme.transitions.easing.easeInOut} 
            ${(props.index + 1) * 0.1}s 
            infinite`
      }
   }));

   const classes = useLoadingBoxStyles();

   return (
      <>
         <Card
            className={`
               ${cardClasses.flexColumn} 
               ${cardClasses.movieCard} 
               ${classes.pulse}`
            }
            elevation={1}
         >
            <div className={`
               ${cardClasses.cardImg} 
               ${classes.contentWidth}
               ${classes.ghostContainer} 
               ${classes.ghostImage}`
            } />
            <div className={`${cardClasses.cardBottom}  ${classes.contentWidth}`}>
               <div className={`
                  ${cardClasses.title} 
                  ${classes.ghostContainer}
                  ${classes.ghostTitle}`
               } />
               {showRatings &&
                  <section className={`${cardClasses.scores}`}>
                     {[...Array(3).keys()].map((key) => (
                        <div
                           className={`
                              ${cardClasses.rating} 
                              ${classes.ghostRating} 
                              ${classes.ghostContainer}`
                           }
                           key={`rating${index}${key}`}
                        />
                     ))}
                  </section>}
            </div>
         </Card>
      </>
   );
};

export default LoadingBox;