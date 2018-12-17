import React, {Component} from 'react';
import './EventsMenu.css';

class EventsMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            setEvent: props.setEvent ? props.setEvent : this.setEvent
        };

        this.setEvent = this.setEvent.bind(this);
        this.createEvent = this.createEvent.bind(this);
    }

    /**
     * Default setEvent function in case one isn't supplied as a prop
     * @param eventType
     * @returns {*}
     */
    setEvent = (eventType) => {
        return eventType;
    };

    /**
     * Event creator that returns the selected date id and the event type in an object
     * @param type
     * @returns {{id, type: *}}
     */
    createEvent = (type) => {
        return {id: this.props.eventState.id, type};
    };

    render() {
        const setEvent = this.state.setEvent;
        return (
            <div>
                {this.props.eventState && this.props.eventState.visible ? <div className="EventsMenu" style={{
                    top: this.props.eventState.top,
                    left: this.props.eventState.left
                }}>
                    <ul>
                        <li id='holiday' className="holiday" onClick={() => setEvent(this.createEvent('holiday'))}>
                            Holiday
                        </li>
                        <li id='birthday' className="birthday" onClick={() => setEvent(this.createEvent('birthday'))}>
                            Birthday
                        </li>
                        <li id='busy' className="busy" onClick={() => setEvent(this.createEvent('busy'))}>Busy</li>
                        <li id='anniversary' className="anniversary"
                            onClick={() => setEvent(this.createEvent('anniversary'))}>Anniversary
                        </li>
                    </ul>
                </div> : null}</div>
        );
    }
}

export default EventsMenu;
