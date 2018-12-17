import React from 'react';
import {shallow} from 'enzyme';
import Calendar from './Calendar';
import '../../setupTests';

describe('Calendar', () => {
    it('renders without crashing', () => {
        shallow(<Calendar/>);
    });

    it('renders current the month of January heading', () => {
        const year = 'January';
        const wrapper = shallow(<Calendar year="2018"/>);
        const yearMessage = <h1>{year}</h1>;
        expect(wrapper.contains(yearMessage)).toEqual(true);
    });

    it('renders current the month of December heading', () => {
        const year = 'December';
        const wrapper = shallow(<Calendar year="2018"/>);
        const yearMessage = <h1>{year}</h1>;
        expect(wrapper.contains(yearMessage)).toEqual(true);
    });

    it('one month of the current year should be rendered with a current month class', () => {
        const wrapper = shallow(<Calendar/>);

        const complexComponents = wrapper.findWhere(n => n.hasClass('Calendar-month-current'));

        expect(complexComponents.length).toEqual(1);
    });

    it('one day of the current year should be rendered with a current day class', () => {
        const wrapper = shallow(<Calendar/>);

        const complexComponents = wrapper.findWhere(n => n.hasClass('Calendar-day-current'));

        expect(complexComponents.length).toEqual(1);
    });

    it('should count 28 days in February', () => {
        const expected = 28;
        const wrapper = shallow(<Calendar year="2018"/>);

        // Months are counted from zero, e.g. January: 0, Febrary: 1
        const daysInMonth = wrapper.instance().daysInMonth({y: 2018, m: 1});

        expect(daysInMonth).toEqual(expected);
    });

    it('should count 29 days in February during a leap year', () => {
        const expected = 29;
        const year = 2020; // 2020 is a leap year
        const wrapper = shallow(<Calendar year={year}/>);

        // Months are counted from zero, e.g. January: 0, Febrary: 1
        const daysInMonth = wrapper.instance().daysInMonth({y: year, m: 1});

        expect(daysInMonth).toEqual(expected);
    });

    it('should count 31 days in December', () => {
        const expected = 31;
        const wrapper = shallow(<Calendar year="2018"/>);

        // Months are counted from zero, e.g. January: 0, Febrary: 1
        const daysInMonth = wrapper.instance().daysInMonth({y: 2018, m: 11});

        expect(daysInMonth).toEqual(expected);
    });

    it('should render a week header with 7 days', () => {
        const wrapper = shallow(<Calendar year="2018"/>);
        const dayHeader = wrapper.instance().renderDayHeader();

        expect(dayHeader.length).toEqual(7);
    });

    it('should 12 months', () => {
        const wrapper = shallow(<Calendar year="2018"/>);
        const months = wrapper.instance().renderMonths();

        expect(months.length).toEqual(12);
    });

    it('should 12 months', () => {
        const id = '2018-01-01';
        const offsetTop = 10;
        const offsetLeft = 10;
        const offsetHeight = 100;

        const fakeEvent = {
            stopPropagation: () => null,
            target: {
                getAttribute: (d) => id,
                offsetTop,
                offsetLeft,
                offsetHeight
            }
        };

        const wrapper = shallow(<Calendar year="2018"/>);
        wrapper.instance().setState = jest.fn();
        wrapper.instance().setEvent(fakeEvent);

        expect(wrapper.instance().setState).toHaveBeenCalledWith({
            eventsMenu: {
                top: (offsetTop + offsetHeight) + 'px',
                left: offsetLeft + 'px',
                visible: true,
                id
            }
        });
    });
});
