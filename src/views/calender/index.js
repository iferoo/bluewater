import { lazy, useEffect } from 'react';

//state mangment
import { useSelector, useDispatch } from 'react-redux';
import { getEvents } from 'store/calenderSlice';

//material ui component
import { Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import Loadable from 'ui-component/Loadable';
import Loader from 'ui-component/Loader';

const Calender = Loadable(lazy(() => import('./calender')));

export default function Index() {
    const dispatch = useDispatch();
    const { isLoading, events, error } = useSelector((state) => state.calender);

    useEffect(() => {
        dispatch(getEvents());
    }, [dispatch]);

    return (
        <>
            {error === null ? (
                <>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <MainCard>
                            <Calender events={events} />
                        </MainCard>
                    )}
                </>
            ) : (
                <MainCard title="There is and error">
                    <Typography variant="h4" color="secondary" sx={{ textAlign: 'center', margin: '50px' }}>
                        {error}
                    </Typography>
                </MainCard>
            )}
        </>
    );
}
