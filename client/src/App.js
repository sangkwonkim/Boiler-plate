import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth'

function App() {
  return (
    <div className="App">

        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Auth(LandingPage, null)} />
            <Route exact path='/login' component={Auth(LoginPage, false)} />
            <Route exact path='/register' component={Auth(RegisterPage, false)} />
          </Switch>
        </BrowserRouter>

    </div>
  );
}

export default App;
