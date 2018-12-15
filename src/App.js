import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = { year: 2018 };

  render() {
    return (
      <div className="App">
          <h1>{this.state.year}</h1>
      </div>
    );
  }
}

export default App;
