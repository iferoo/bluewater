import { Fragment, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

//state mangement
import { useDispatch } from 'react-redux';
import { addEvent, deleteEvent, updateEvent } from 'store/calenderSlice';

//react big calender
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
const localizer = momentLocalizer(moment);

// component
import CalenderDialog from './calenderDialog';

export default function Calender({ events }) {
    const dispatch = useDispatch();

    // handle Events
    const [myEvents, setEvents] = useState([]);

    useEffect(() => {
        let newEvents = events.map((event) => {
            return {
                ...event,
                start: new Date(event.start),
                end: new Date(event.end)
            };
        });
        setEvents(newEvents);
    }, [events]);

    //Handle Dialog Variable
    const [status, setStatus] = useState('ADD');
    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [ID, setId] = useState(null);

    // Calender Events
    const handleSelectSlot = ({ start, end }) => {
        setStatus('SELECT_SLOT');
        setTitle('');
        setStart(start);
        setEnd(end);
        setOpenDialog(true);
    };

    const handleSelectEvent = ({ id, title, start, end }) => {
        setStatus('SELECT_EVENT');
        setId(id);
        setTitle(title);
        setStart(start);
        setEnd(end);
        setOpenDialog(true);
    };

    //Handle Add Event Calender
    const handleAddEvent = useCallback(
        (title, start, end) => {
            const event = {
                id: Math.random(),
                title,
                start: start.toISOString(),
                end: end.toISOString()
            };
            dispatch(addEvent(event));
        },
        [dispatch]
    );

    //Handle Update Event Calender
    const handleUpdateEvent = useCallback(
        (id, title, start, end) => {
            const event = {
                id,
                title,
                start: start.toISOString(),
                end: end.toISOString()
            };
            dispatch(updateEvent(event));
        },
        [dispatch]
    );

    //Handle Delete Event Calender
    const handleDeleteEvent = useCallback(
        (id, title, start, end) => {
            const event = {
                id,
                title,
                start: start.toISOString(),
                end: end.toISOString()
            };
            dispatch(deleteEvent(event));
        },
        [dispatch]
    );

    return (
        <Fragment>
            <CalenderDialog
                id={ID}
                taskTitle={title}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                start={start}
                setStart={setStart}
                end={end}
                setEnd={setEnd}
                handleAddEvent={handleAddEvent}
                handleUpdateEvent={handleUpdateEvent}
                handleDeleteEvent={handleDeleteEvent}
                status={status}
            />
            <Calendar
                dayLayoutAlgorithm="no-overlap"
                defaultDate={new Date()}
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
    events: PropTypes.array
};
