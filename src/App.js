import React, { Component } from 'react';
import './App.css';

// Import the new Calendar component
import Calendar from './components/Calendar';

class App extends Component {
  state = { year: 2018 };

  render() {
    return (
      <div className="App">
          <h1>{this.state.year}</h1>
          <Calendar year={this.state.year}/>
      </div>
    );
  }
}

export default App;
