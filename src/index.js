import "./index.css";
import * as serviceWorker from "./serviceWorker";
import {ThemeProvider, createMuiTheme, makeStyles} from "@material-ui/core/styles";
import App from "./App";
import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";

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
      error: {
         main: "rgba(229, 9, 20, 1)"
      },
      primary: {
         main: "rgba(10, 35, 50, 1)"
      },
      secondary: {
         dark: "rgba(43, 89, 195, 1)",
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

const useGlobalStyles = makeStyles({
   "@global": {
      body: {
         backgroundColor: theme.palette.background.default
      },
      html: {
         "&::-webkit-scrollbar": {
            width: "17px"
         },
         "&::-webkit-scrollbar-track": {
            backgroundColor: theme.palette.background.default,
            boxShadow: "inset 0 0 6px rgba(255, 255, 255, 0.1)",
            borderLeft: `2px solid ${theme.palette.primary.main}`
         },
         "&::-webkit-scrollbar-thumb": {
            borderLeft: `${theme.palette.primary.main} solid 3px`,
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "3px"
         }
      }
   }
});

const MyThemeProvider = ({children}) => {
   MyThemeProvider.propTypes = {
      children: PropTypes.object
   };

   useGlobalStyles();
   return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

ReactDOM.render(
   <React.StrictMode>
      <MyThemeProvider theme={theme}>
         <App />
      </MyThemeProvider>
   </React.StrictMode>,
   document.getElementById("root")
);

/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
