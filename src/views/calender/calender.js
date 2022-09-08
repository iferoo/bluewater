import { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Calendar, Views, DateLocalizer, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './event';
import { useCallback } from 'react';
import { useState } from 'react';

const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'lightblue'
        }
    });

const localizer = momentLocalizer(moment);

export default function Calender() {
    const { defaultDate } = useMemo(
        () => ({
            components: {
                timeSlotWrapper: ColoredDateCellWrapper
            },
            defaultDate: new Date(),
            views: Object.keys(Views).map((k) => Views[k])
        }),
        []
    );
    const [myEvents, setEvents] = useState(events);
    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            const title = window.prompt('New Event Name');
            if (title) {
                setEvents((prev) => [...prev, { start, end, title }]);
            }
        },
        [setEvents]
    );

    const handleSelectEvent = useCallback((event) => window.alert(event.title), []);
    return (
        <Fragment>
            <Calendar
                dayLayoutAlgorithm="no-overlap"
                defaultDate={defaultDate}
                events={myEvents}
                localizer={localizer}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                showMultiDayTimes
                step={60}
                defaultView={Views.WEEK}
                style={{ height: '100vh' }}
            />
        </Fragment>
    );
}
Calender.propTypes = {
    localizer: PropTypes.instanceOf(DateLocalizer),
    showDemoLink: PropTypes.bool
};
