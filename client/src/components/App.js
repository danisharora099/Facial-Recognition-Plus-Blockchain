import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Upload from "./Upload";
import Home from "./Home";
import Table from './Table'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Upload} />
        <Route path="/addUser" exact component={Home} />
        <Route path='/database' exact component={Table} />
      </Switch>
    </Router>
  );
};
export default App;
