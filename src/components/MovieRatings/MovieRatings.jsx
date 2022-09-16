import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import imdbIcon from "../../assets/imdb-logo.png";
import metaIcon from "../../assets/metacritic-icon.png";
import rtIcon from "../../assets/tomato-svg-logo-2.png";
import useMovieCardStyles from "../../styles/movieCardStyles";

const MovieRatings = (props) => {
   const {imdbId, ratings, styles = "", title} = props;

   MovieRatings.propTypes = {
      imdbId: PropTypes.string,
      ratings: PropTypes.arrayOf(PropTypes.object),
      styles: PropTypes.string,
      title: PropTypes.string
   };

   const ratingData = {
      "Internet Movie Database": {
         siteIcon: imdbIcon,
         siteLink: `https://www.imdb.com/title/${imdbId}`
      },
      "Rotten Tomatoes": {
         siteIcon: rtIcon,
         siteLink: `https://www.rottentomatoes.com/search?search=${title}`
      },
      "Metacritic": {
         siteIcon: metaIcon,
         siteLink: `https://www.metacritic.com/search/all/${title}/results`
      }
   };

   const classes = useMovieCardStyles();

   return (
      <section className={`${classes.scores} ${styles}`}>
         {ratings.map(rating => (
            <div
               key={`${imdbId}${rating.Source}`}
               className={`${classes.rating} rating`}
            >
               <a
                  href={ratingData[rating.Source].siteLink}
                  onClick={(event) => event.stopPropagation()}
                  rel={"noopener noreferrer"}
                  target={"_blank"}
               >
                  <img
                     className={classes.ratingIcon}
                     src={ratingData[rating.Source].siteIcon}
                     alt={rating.Source}
                  />
               </a>
               <Typography
                  className={classes.scoreText}
                  component="p"
               >
                  {rating.Value}
               </Typography>
            </div>
         ))}
      </section>
   );
};

export default MovieRatings;
