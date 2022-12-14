import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { Provider } from "react-redux";
import store from "./redux/store";
import * as serviceWorker from "./serviceWorker";

import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist";

let persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
