// project imports
import config from 'config';

import { createSlice } from '@reduxjs/toolkit';

const customizationSlice = createSlice({
    name: 'customization',
    initialState: {
        isOpen: [], // for active default menu
        fontFamily: config.fontFamily,
        borderRadius: config.borderRadius,
        opened: true
    },
    reducers: {
        menuOpen: (state, action) => {
            state.isOpen = [action.payload];
        },
        setMenu: (state, action) => {
            state.opened = action.payload;
        },
        setFamilyFont: (state, action) => {
            state.fontFamily = action.payload;
        },
        setRadiusBorder: (state, action) => {
            state.borderRadius = action.payload;
        }
    }
});

export const { menuOpen, setMenu, setFamilyFont, setRadiusBorder } = customizationSlice.actions;
export default customizationSlice.reducer;
