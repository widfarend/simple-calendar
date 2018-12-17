import React from 'react';
import {shallow, mount, unmount} from 'enzyme';
import EventsMenu from './EventsMenu';
import '../../setupTests';

describe('EventsMenu', () => {
    it('renders without crashing with no props', () => {
        shallow(<EventsMenu/>);
    });

    it('renders without crashing with props', () => {
        const eventState = {
            top: 0, left: 0,
            visible: true, id: '2018'
        };

        shallow(<EventsMenu eventState={eventState}/>);
    });

    it('should return an event type for a holiday when clicked', () => {
        const id = '2018-01-01';
        const eventState = {
            top: 0, left: 0,
            visible: true, id
        };

        const expected = {'id': id, 'type': 'holiday'};

        const setEvent = jest.fn((e) => e);

        const wrapper = shallow(<EventsMenu setEvent={setEvent} eventState={eventState}/>);

        // wrapper.instance().setEvent = jest.fn();
        const btn = wrapper.find('#holiday');
        btn.simulate('click');
        expect(setEvent).toHaveBeenCalledWith(expected);
    });

    it('should return an event type for a birthday when clicked', () => {
        const id = '2018-01-01';
        const eventState = {
            top: 0, left: 0,
            visible: true, id
        };

        const expected = {'id': id, 'type': 'birthday'};

        const setEvent = jest.fn((e) => e);

        const wrapper = shallow(<EventsMenu setEvent={setEvent} eventState={eventState}/>);

        // wrapper.instance().setEvent = jest.fn();
        const btn = wrapper.find('#birthday');
        btn.simulate('click');
        expect(setEvent).toHaveBeenCalledWith(expected);
    });

    it('should return an event type for a busy event when clicked', () => {
        const id = '2018-01-01';
        const eventState = {
            top: 0, left: 0,
            visible: true, id
        };

        const expected = {'id': id, 'type': 'busy'};

        const setEvent = jest.fn((e) => e);

        const wrapper = shallow(<EventsMenu setEvent={setEvent} eventState={eventState}/>);

        // wrapper.instance().setEvent = jest.fn();
        const btn = wrapper.find('#busy');
        btn.simulate('click');
        expect(setEvent).toHaveBeenCalledWith(expected);
    });

    it('should return an event type for an anniversary when clicked', () => {
        const id = '2018-01-01';
        const eventState = {
            top: 0, left: 0,
            visible: true, id
        };

        const expected = {'id': id, 'type': 'anniversary'};

        const setEvent = jest.fn((e) => e);

        const wrapper = shallow(<EventsMenu setEvent={setEvent} eventState={eventState}/>);

        // wrapper.instance().setEvent = jest.fn();
        const btn = wrapper.find('#anniversary');
        btn.simulate('click');
        expect(setEvent).toHaveBeenCalledWith(expected);
    });

});
