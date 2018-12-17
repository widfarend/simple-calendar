import React, {Component} from 'react';
import './YearNavigator.css';

class YearNavigator extends Component {
    constructor(props) {
        super(props);

        this.state = {
            year: props.year
        };
        this.yearUp = this.yearUp.bind(this);
        this.yearDown = this.yearDown.bind(this);
        this.currentYear = this.currentYear.bind(this);
    }

    /**
     * Adds one to the current year and sends the year in the callback
     */
    yearUp = () => {
        let {year} = this.state;
        year++;
        this.setState({year});
        this.props.updateYear(year);
    };

    /**
     * Removes one from the current year and sends the year in a callback
     */
    yearDown = () => {
        let {year} = this.state;
        year--;
        this.setState({year});
        this.props.updateYear(year);

    };

    /**
     * Jumps to the current year
     */
    currentYear = () => {
        const year = new Date().getFullYear();
        this.setState({year});
        this.props.updateYear(year);
    };

    render() {
        return (
            <div className="YearNavigator">
                <h1>
                    <span id="yearDown" className="YearNavigator-nav" onClick={this.yearDown}>&lt; </span>
                    {this.state.year}
                    <span id="yearUp" className="YearNavigator-nav" onClick={this.yearUp}> &gt;</span>
                    <span id="currentYear" className="YearNavigator-nav" onClick={this.currentYear}> &#x25B2;</span>
                </h1>
            </div>
        );
    }
}

export default YearNavigator;
