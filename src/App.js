import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Book from './components/Book/Book';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import { createContext, useState } from 'react';

export const UserContext = createContext();


function App() {
const [loggedInUser, setLoggedInUser] = useState({});

  return (

    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <p>Name : {loggedInUser.name}</p>
      <Router>
      <Header></Header>
        <Switch>
          <Route path='/home'><Home/></Route>
          <Route path='/login'><Login/></Route>
          <Route path='/book/:bedType'><Book/></Route>
          
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
