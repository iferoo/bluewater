import { Fragment, useState, useCallback } from 'react';

import moment from 'moment';

import { Calendar, Views, momentLocalizer } from 'react-big-calendar';

import CalenderDialog from './calenderDialog';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

import events from './event';

export default function Calender() {
    const [myEvents, setEvents] = useState(events);

    //Handle Dialog Variable
    const [status, setStatus] = useState('ADD');
    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [ID, setId] = useState(null);

    const handleSelectSlot = ({ start, end }) => {
        setTitle('');
        setStart(start);
        setEnd(end);
        setStatus('ADD');
        setOpenDialog(true);
    };

    const handleSelectEvent = ({ id, title, start, end }) => {
        setStatus('UPDATE');
        setTitle(title);
        setStart(start);
        setEnd(end);
        setId(id);
        setOpenDialog(true);
    };
    //Handle Calender Task submit
    const handleSubmite = useCallback(
        (status, title, start, end, id) => {
            let newEvents = null;
            switch (status) {
                case 'ADD':
                    setEvents([...myEvents, { id: Math.random(), start, end, title }]);
                    break;
                case 'UPDATE':
                    const eventIndex = myEvents.findIndex((event) => event.id === id);
                    newEvents = myEvents;
                    newEvents.splice(eventIndex, 1, { id, start, end, title });
                    setEvents(newEvents);
                    break;
                case 'DELETE':
                    newEvents = myEvents.filter((event) => event.id !== id);
                    setEvents(newEvents);

                    break;
                default:
                    break;
            }
        },
        [myEvents]
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
                status={status}
                handleSubmite={handleSubmite}
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
