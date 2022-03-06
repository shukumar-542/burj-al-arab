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

function App() {
  return (
    <div>
      <Router>
      <Header></Header>
        <Switch>
          <Route path='/home'><Home/></Route>
          <Route path='/login'><Login/></Route>
          <Route path='/book'><Book/></Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
