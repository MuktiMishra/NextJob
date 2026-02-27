import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import {CookiesProvider} from "react-cookie";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CookiesProvider>
    <Provider store={store}>
      <App />
      <Toaster position="top-right" />
    </Provider>
    </CookiesProvider>
  </React.StrictMode>
);
