import React, { Component } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import Landing from "./components/layout/landing";
import Register from "./components/auth/register";
import Login from "./components/auth/login";
import jwt_decode  from 'jwt-decode';
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import store from './store';


//this code makes sure the user is logged in even on switching to other pages 
if(localStorage.jwtToken){
  setAuthToken(localStorage.jwtToken)
const decoded =jwt_decode(localStorage.jwtToken)

store.dispatch(setCurrentUser(decoded))
}

class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Landing} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
