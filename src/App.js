import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import User from './components/Users/User';
import About from './components/layouts/pages/About';
import Alert from './components/layouts/Alert';
import Home from './components/layouts/pages/Home';
import notFound from './components/layouts/pages/notFound';

import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

import './App.css';

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <main>
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
                <Route component={notFound} />
              </Switch>
            </div>
          </main>
        </Router>
      </AlertState>
    </GithubState>
  );
};

export default App;
