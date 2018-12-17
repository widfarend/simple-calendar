import React from 'react';
import {shallow} from 'enzyme';
import YearNavigator from './YearNavigator';
import '../../setupTests';

describe('EventsMenu', () => {
    it('renders without crashing', () => {
        shallow(<YearNavigator year="2018"/>);
    });

    it('should the subsequent year when the up chevron is clicked', () => {
        const year = 2018;

        const expected = 2019;

        const updateYear = jest.fn((e) => e);

        const wrapper = shallow(<YearNavigator updateYear={updateYear} year={year}/>);

        const btn = wrapper.find('#yearUp');
        btn.simulate('click');
        expect(updateYear).toHaveBeenCalledWith(expected);
    });

    it('should return the previous year when the down chevron is clicked', () => {
        const year = 2001;

        const expected = 2000;

        const updateYear = jest.fn((e) => e);

        const wrapper = shallow(<YearNavigator updateYear={updateYear} year={year}/>);

        const btn = wrapper.find('#yearDown');
        btn.simulate('click');
        expect(updateYear).toHaveBeenCalledWith(expected);
    });

    it('should jump to the current year when the up arrow is clicked', () => {
        const year = 2567;

        const expected = new Date().getFullYear();

        const updateYear = jest.fn((e) => e);

        const wrapper = shallow(<YearNavigator updateYear={updateYear} year={year}/>);

        const btn = wrapper.find('#currentYear');
        btn.simulate('click');
        expect(updateYear).toHaveBeenCalledWith(expected);
    });

});
