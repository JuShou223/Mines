import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
  Redirect, NavLink
} from 'react-router-dom';
import Home from '../container/HomePage'
function App() {
  const height = window.innerHeight;
  return (
    <Router>
      <div className="App" style={{height: height}}>
        <Switch>
          <Route path="/home" component={Home} />
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
