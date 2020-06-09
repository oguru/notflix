import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// nice orange rgba(252, 91, 5, 1)

const theme = createMuiTheme({
  overrides: {
    MuiSwitch: {
      "&$checked": {
        track: {
        backgroundColor: "#c9c254",
        opacity: 1
        }
      },
      track: {
        backgroundColor: "#2b59c3",
        opacity: 1
        
      }
    } 
  },
  palette: {
    common: {
      black: "#000",
      white: "#fff"
    },
    background: {
      paper: "rgba(22, 59, 80, 1)",
      default: "#163b50"
    },
    primary: {
      light: "rgba(201, 194, 84, 1)",
      main: "rgba(10, 35, 50, 1)",
      dark: "rgba(37, 130, 187, 1)",
      contrastText: "#fff"
    },
    secondary: {
      light: "#ff4081",
      main: "rgba(229, 9, 20, 1)",
      dark: "rgba(43, 89, 195, 1)",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "rgba(229, 9, 20, 1)",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)"
    }
  }
});
// #055E94 - old nav colour
// #4486AF - old search colour

//#0d3b4d page bg
//#0f2837 card and nav bg

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
