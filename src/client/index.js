import React from "react";
import ReactDOM from "react-dom";
import Routes from "./../Routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./../store";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
