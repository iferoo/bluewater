import { Fragment, useMemo, useState, useCallback } from 'react';

import PropTypes from 'prop-types';

import moment from 'moment';

import { Calendar, Views, DateLocalizer, momentLocalizer } from 'react-big-calendar';

import CalenderDialog from './calenderDialog';

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import events from './event';

const ColoredDateCellWrapper = ({ children }) =>
    React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'lightblue'
        }
    });

const localizer = momentLocalizer(moment);

export default function Calender() {
    const [myEvents, setEvents] = useState(events);

    //Handle calencder Events
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

    const handleSelectSlot = useCallback(({ start, end }) => {
        setStatus('ADD');
        setTitle('');
        setStart(start);
        setEnd(end);
        setOpenDialog(true);
    }, []);

    const handleSelectEvent = useCallback(({ title, start, end }) => {
        setStatus('UPDATE');
        setTitle(title);
        setStart(start);
        setEnd(end);
        setOpenDialog(true);
    }, []);

    //Handle Dialog Variable
    const [status, setStatus] = useState('ADD');
    const [openDialog, setOpenDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    //Handle Calender Task submit
    const handleSubmite = useCallback(
        (status, title, start, end) => {
            if (status === 'ADD') {
                setEvents([...events, { start, end, title }]);
            } else {
                console.log('object');
            }
        },
        [setEvents]
    );

    return (
        <Fragment>
            <CalenderDialog
                taskTitle={title}
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                start={start || undefined}
                end={end || undefined}
                status={status}
                handleSubmite={handleSubmite}
            />
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
