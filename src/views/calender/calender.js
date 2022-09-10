import { Fragment, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Calendar, Views, DateLocalizer, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import events from './event';
import { useCallback } from 'react';
import { useState } from 'react';
import CalenderDialog from './calenderDialog';
import { useEffect } from 'react';

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

    const [openDialog, setOpenDialog] = useState(false);
    const [start, setStart] = useState(null);
    const [end, setEnd] = useState(null);

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            setStart(start);
            setEnd(end);
            setOpenDialog(true);
        },
        [setEvents]
    );

    const handleSelectEvent = useCallback((event) => window.alert(event.start), []);
    return (
        <Fragment>
            <CalenderDialog
                openDialog={openDialog}
                setOpenDialog={setOpenDialog}
                start={start}
                end={end}
                events={myEvents}
                setEvents={setEvents}
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
