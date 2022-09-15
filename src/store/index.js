import { configureStore } from '@reduxjs/toolkit';
import customization from './customizationSlice';
import calender from './calenderSlice';

const persister = 'Free';
// ==============================|| REDUX - MAIN STORE ||============================== //
const store = configureStore({
    reducer: {
        customization,
        calender
    }
});

export default store;

export { persister };
