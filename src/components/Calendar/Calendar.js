import React, {Component} from 'react';
import './Calendar.css';
import EventsMenu from '../EventsMenu';
import * as calendarConfig from '../../config/calendar.json';

class Calendar extends Component {
    constructor(props) {
        super(props);

        // Used to highlight current date
        const today = new Date();

        // Year to display is passed in as a prop / if it's blank, then use the current year
        // The calendar state is stored in the component state, however, this could be easily stored in a redux store and/or
        // managed via a rest API
        this.state = {
            year: props.year || new Date().getFullYear(),
            today,
            eventsMenu: {top: 0, left: 0, visible: false, id: null},
            eventListState: {}
        };

        this.setEvent = this.setEvent.bind(this);
        this.getEvent = this.getEvent.bind(this);
    }

    /**
     * Main function to render all of the months in the year
     * @returns {Array}
     */
    renderMonths = () => {
        const months = [];

        calendarConfig.months.forEach((month, index) => {
            const currentMonth = this.state.today.getMonth() === index && this.state.today.getFullYear() === this.state.year;

            months.push(
                <div key={month} className="Calendar-month">
                    <div className={`Calendar-month-header ${currentMonth ? 'Calendar-month-current' : null}`}>
                        <h1>{month}</h1></div>
                    <div className="Calendar-day-header">{this.renderDayHeader()}</div>
                    <div className="Calendar-days">{this.renderDays(this.state.year, index, currentMonth)}</div>
                </div>
            );
        });

        return months;
    };

    /**
     * Get the number of days in a month
     * @param date
     * @returns {number}
     */
    daysInMonth = (date) => {
        const {y, m} = date;
        const dayCalc = 32;
        const offsetDate = new Date(y, m, dayCalc);

        // Calculates the number of dats in a month by adding 32 days to the first date of the current month (there are a maximum of 31 days in a month)
        // This gives us an offset number of days into the following month. By negating this offset number of days from 32, we will determine the number
        // of days in the current month
        return dayCalc - (offsetDate.getDate());
    };

    /**
     * Takes a year and a month and renders all of the days in the month
     * @param y
     * @param m
     * @param currentMonth
     * @returns {Array}
     */
    renderDays = (y, m, currentMonth) => {
        const days = [];
        const currentDay = currentMonth ? this.state.today.getDate() : null;


        // Create a new Date object for the first day of the month
        const monthDate = new Date(y, m, 1);

        // Determine what day the month starts on
        let day = monthDate.getDay();

        // Get the number of days in the current month
        let daysInMonth = this.daysInMonth({y, m});

        // Push blank day blocks if the first day is not on a Sunday
        for (let i = 0; i < day; i++) {
            days.push(<div key={'pre_blank_' + i} className="Calendar-day-blank">&nbsp;</div>)
        }

        // Push all of the day blocks in
        for (let i = 1; i <= daysInMonth; i++) {
            const id = `${y}-${m}-${i}`;
            let className = i === currentDay ? 'Calendar-day Calendar-day-current' : 'Calendar-day';
            if (this.state.eventListState[id] && i !== currentDay) {
                className = 'Calendar-day Calendar-day-' + this.state.eventListState[id];
            }
            days.push(<div
                data-id={`${id}`}
                key={`${id}`}
                onClick={this.setEvent}
                className={`${className}`}>{i}</div>);
        }

        // Calculate the offsets -- if the number of blocks in the month is over 35, then we need to calculate
        // with 42 blocks (35 = 7 days * 5 rows / 42 = 7 days * 6 rows)
        const offsetCalc = days.length > 35 ? 42 : 35;
        const offset = offsetCalc - days.length;

        // Add any further empty day blocks if an offset was created
        for (let i = 0; i < offset; i++) {
            days.push(<div key={'post_blank_' + i} className="Calendar-day-blank">&nbsp;</div>)
        }

        // Return the rendered days
        return days;
    };

    /**
     * Sets the state of the EventMenu (positions it below the selected date on the calendar / toggles visibility)
     * @param e
     */
    setEvent(e) {
        e.stopPropagation();
        let id = e.target.getAttribute('data-id');
        let visible;
        if (this.state.eventsMenu.id === id) {
            visible = false;
            id = null;
        } else {
            visible = true;
        }
        this.setState({
            eventsMenu: {
                top: (e.target.offsetTop + e.target.offsetHeight) + 'px',
                left: e.target.offsetLeft + 'px',
                visible,
                id
            }
        });
    }

    /**
     * Callback function passed to the EventsMenu component and handles the events states
     * @param eventType
     */
    getEvent(eventType) {
        if (this.state.eventListState[eventType.id]
            && this.state.eventListState[eventType.id] === eventType.type) {
            this.setState({
                eventListState: {...this.state.eventListState, [eventType.id]: null}
            })
        } else {
            this.setState({
                eventListState: {...this.state.eventListState, [eventType.id]: eventType.type}
            })
        }

        this.setState({
            eventsMenu: {...this.state.eventsMenu, visible: false, id: null}
        });
    }

    /**
     * Render the weekday labels
     * @returns {Array}
     */
    renderDayHeader = () => {
        const days = [];

        calendarConfig.days.forEach(day => {
            days.push(<div key={day} className="Calendar-day-label">{day}</div>);
        });

        return days;
    };

    componentWillUpdate(nextProps) {

        if (nextProps.year && nextProps.year !== this.state.year) {
            this.setState({year: nextProps.year});
        }
    }

    render() {
        return (
            <div>
                <div className="Calendar-key">
                    <ul>
                        <li className="Calendar-day-holiday white-text">Holiday</li>
                        <li className="Calendar-day-birthday white-text">Birthday</li>
                        <li className="Calendar-day-busy white-text">Busy</li>
                        <li className="Calendar-day-anniversary white-text">Anniversary</li>
                    </ul>
                </div>
                <div className="Calendar">
                    <EventsMenu setEvent={this.getEvent} eventState={this.state.eventsMenu}/>
                    {this.renderMonths()}
                </div>
            </div>
        );
    }
}

export default Calendar;
