// ROOT APPLICATION LAYER
import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import "index.scss";

import Application from "components/Application";

// to configure the default base URL for production
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}
//Rendering  Application to React Server
ReactDOM.render(<Application />, document.getElementById("root"));

