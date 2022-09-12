import { configureStore } from '@reduxjs/toolkit';
import customization from './customizationSlice';

const persister = 'Free';
// ==============================|| REDUX - MAIN STORE ||============================== //
const store = configureStore({
    reducer: {
        customization
    }
});

export default store;

export { persister };
