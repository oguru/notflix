# Movie Database App

## Description
An app to search for movies, TV shows and games, and display them on a user friendly UI with card components showing posters, name, genre and ratings (if detailed mode is on). Clicking the card opens a modal to show more information on a result. Fully responsive with adaptive navbar on mobile screens.

## 1.1 Updates 09/2022
* Changed main movie state to use useReducer.
* Code/architecture overhaul to minimise re-renders and significantly improve performance and code readability.
* Added loading spinner on search button and new placeholder loading boxes on searching/lazy loading more results for better user experience.
* Various style updates and tweaks.

## Future Considerations
Where time will allow, I may further work on the app (in order of importance) to:
* Add unit tests.
* Add option to search by year and type (TV, Movie or Episode).
* Build UI for sign up and log in, then add authentication so users can sign up and log in, save their favourite movies, and give them a personal score.

## Setup
1 - Clone the repository.\
2 - Install dependencies with ```yarn install``` or ```npm install```.\
3 - Run ```yarn start``` or ```npm start``` in the project directory from the command line .\
4 - Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Built Using
React\
Material-UI\

#### [Link](https://notflix.peterdev.co.uk/) to live hosted project.
