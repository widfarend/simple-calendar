import React, { Component } from 'react';
import './Calendar.css';
import * as calendarConfig from '../../config/calendar.json';

class Calendar extends Component {
  constructor(props) {
    super(props);

    // Used to highlight current date
    const today = new Date();

    // Year to display is passed in as a prop / if it's blank, then use the current year
    this.state = {
      year: props.year || new Date().getFullYear(),
        today
    }
  }

    /**
     * Main function to render all of the months in the year
     * @returns {Array}
     */
  renderMonths = () => {
    const months = [];

    calendarConfig.months.forEach((month, index) => {
        const currentMonth = this.state.today.getMonth() === index;

        months.push(
        <div key={month} className="Calendar-month">
          <div className={`Calendar-month-header ${currentMonth ? 'Calendar-month-current' : null}`}><h1>{month}</h1></div>
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
      return dayCalc-(offsetDate.getDate());
  };

    /**
     * Takes a yea and a month and renders all of the days in the month
     * @param y
     * @param m
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
      let daysInMonth = this.daysInMonth({y,m});

      // Push blank day blocks if the first day is not on a Sunday
      for(let i=0; i < day; i++) {
        days.push(<div key={'pre_blank_' + i} className="Calendar-day-blank">&nbsp;</div>)
      }

      // Push all of the day blocks in
      for(let i = 1; i <= daysInMonth; i++) {
          days.push(<div key={'day_' + i} className={`${i === currentDay ? 'Calendar-day-current' : 'Calendar-day'}`}>{i}</div>);
      }

      // Calculate the offsets -- if the number of blocks in the month is over 35, then we need to calculate
      // with 42 blocks (35 = 7 days * 5 rows / 42 = 7 days * 6 rows)
      const offsetCalc = days.length > 35 ? 42 : 35;
      const offset = offsetCalc - days.length;

      // Add any further empty day blocks if an offset was created
      for(let i=0; i < offset; i++) {
          days.push(<div key={'post_blank_' + i} className="Calendar-day-blank">&nbsp;</div>)
      }

      // Return the rendered days
      return days;
  };

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

  render() {
    return (
        <div className="Calendar">{this.renderMonths()}</div>
    );
  }
}

export default Calendar;
