import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
<<<<<<< HEAD:client/src/components/App.js
import Upload from "./Upload";
import Home from "./Home";
import Table from './Table'
=======
import Landing from "./containers/Landing/Landing";
import Home from "./components/Home";
import Navbar from "./containers/Navbar/Navbar";

import "./App.css";
>>>>>>> b50325de1f8dc4c16522dd982299ca1e92740252:client/src/App.js

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
