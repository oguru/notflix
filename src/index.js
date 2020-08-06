import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom";

// nice orange rgba(252, 91, 5, 1)

const theme = createMuiTheme({
   overrides: {
      MuiSwitch: {
         track: {
            backgroundColor: "rgba(43, 89, 195, 1)",
            opacity: 1
         }
      }
   },
   palette: {
      background: {
         default: "#163b50",
         paper: "#0a2332"
      },
      common: {
         black: "#000",
         white: "#fff"
      },
      error: {
         contrastText: "#fff",
         dark: "#d32f2f",
         light: "#e57373",
         main: "rgba(229, 9, 20, 1)"
      },
      primary: {
         contrastText: "#fff",
         dark: "rgba(37, 130, 187, 1)",
         light: "rgba(201, 194, 84, 1)",
         main: "rgba(10, 35, 50, 1)"
      },
      secondary: {
         contrastText: "#fff",
         dark: "rgba(43, 89, 195, 1)",
         light: "#ff4081",
         main: "rgba(229, 9, 20, 1)"
      },
      text: {
         disabled: "rgba(0, 0, 0, 0.38)",
         hint: "rgba(0, 0, 0, 0.38)",
         primary: "rgba(255, 255, 255, 1)",
         secondary: "rgba(0, 0, 0, 0.54)"
      }
   }
});

/*
 * #055E94 - old nav colour
 * #4486AF - old search colour
 */

/*
 *#163b50 page bg
 *#0f2837 card and nav bg
 */

ReactDOM.render(<React.StrictMode>
   <ThemeProvider theme={theme}>
      <App />
   </ThemeProvider>
</React.StrictMode>,
document.getElementById("root"));

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
