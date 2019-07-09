import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> is fast abhi
        </p>
        <a
          className="App-link"
          href="https://fb.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export class Btt extends Component {
  update = () => {
    console.log("asdf");
    setTimeout(() => {
      this.setState({ c: "col-12" });
    }, 1000);
  };
  state = { nice: "adf", c: "col-2", x: 0 };
  render() {
    setTimeout(() => {
      this.setState({
        x: (this.state.x + 1) % 2,
        c: this.state.x ? "col-2" : "col-12"
      });
    }, 1000);
    return (
      <button onClick={this.update} className={this.state.c}>
        {this.state.nice}
      </button>
    );
  }
}

export default App;
