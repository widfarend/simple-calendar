import React, {Component} from 'react';
import YearNavigator from './components/YearNavigator';
import './App.css';

// Import the new Calendar component
import Calendar from './components/Calendar';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {year: new Date().getFullYear()};

        this.updateYear = this.updateYear.bind(this);
    }

    updateYear = (year) => {
        this.setState({year});
    };

    render() {
        return (
            <div className="App">
                <YearNavigator year={this.state.year} updateYear={this.updateYear}/>
                <Calendar year={this.state.year}/>
            </div>
        );
    }
}

export default App;
