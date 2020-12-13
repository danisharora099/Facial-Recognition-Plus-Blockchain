import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./containers/Landing/Landing";
import Home from "./components/Home";
import Navbar from "./containers/Navbar/Navbar";
import Table from "./components/Table"

import "./App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/addUser" exact component={Home} />
        <Route path='/database' exact component={Table} />
      </Switch>
    </Router>
  );
};
export default App;
