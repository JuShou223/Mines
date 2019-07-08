import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
  Redirect
} from 'react-router-dom';
import Home from '../container/HomePage'
import '../assets/stylus/reset.styl'
import Play from '../container/Play'
function App() {
  const height = window.innerHeight;
  return (
    <Router>
      <div className="App" style={{height: height}}>
        <Switch>
          <Route path="/play" component={Play} />
          <Route path="/home" component={Home} />
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
