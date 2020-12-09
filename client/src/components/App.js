const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/addUser" exact comonent={Upload} />
      </Switch>
    </Router>
  );
};
export default App;
