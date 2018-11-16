import React, { Component } from "react";
import "./App.css";
import Basic from "./views/MainView/Basic";
import About from "./views/About/About";
import OrderForm from "./views/OrderForm/OrderForm";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <Router>
      <div className="App">
      <header className="App-header" onClick={() => this.setState({view:'main'})}>
        <h1 className="App-title">Storyflip</h1>
        <Link to="/">Go Back to Main Page</Link>

      </header>
        <Route path="/" exact component={Basic} />
        <Route path="/about/" component={About} />
        <Route path="/order/" component={OrderForm} />
      </div>
    </Router>
      );
    }
  }
  
  export default App;
