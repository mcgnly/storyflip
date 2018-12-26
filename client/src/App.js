import React, { Component } from "react";
import { loadReCaptcha } from 'react-recaptcha-google'
import "./App.css";
import Basic from "./views/MainView/Basic";
import About from "./views/About/About";
import OrderForm from "./views/OrderForm/OrderForm";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
  componentDidMount() {
    loadReCaptcha();
  }
  render() {
    return (
      <Router>
      <div className="App">
      <Link to="/" className="App-link" >
        <header className="App-header" >
          <h1 className="App-title">Storyflip</h1>
        </header>
      </Link>
        <Route path="/" exact component={Basic} />
        <Route path="/about/" component={About} />
        <Route path="/order/" component={OrderForm} />
      </div>
    </Router>
      );
    }
  }
  
  export default App;
