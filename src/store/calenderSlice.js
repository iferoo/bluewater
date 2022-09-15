const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const getEvents = createAsyncThunk('calender/getEvents', async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch('http://localhost:3004/events');
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const addEvent = createAsyncThunk('calender/addEvent', async (event, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch('http://localhost:3004/events', {
            method: 'POST',
            body: JSON.stringify(event),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const updateEvent = createAsyncThunk('calender/updateEvent', async (event, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`http://localhost:3004/events/${event.id}`, {
            method: 'PUT',
            body: JSON.stringify(event),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const deleteEvent = createAsyncThunk('calender/dleteEvent', async (event, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res = await fetch(`http://localhost:3004/events/${event.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        });
        return event;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
const calenderSlice = createSlice({
    name: 'calender',
    initialState: { events: [], isLoading: false, error: null },
    extraReducers: {
        //get events
        [getEvents.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [getEvents.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.events = action.payload;
        },
        [getEvents.rejected]: (state, action) => {
            state.isLoading = true;
            state.error = action.payload;
        },

        //add events
        [addEvent.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [addEvent.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.events.push(action.payload);
        },
        [addEvent.rejected]: (state, action) => {
            state.isLoading = true;
            state.error = action.payload;
        },

        //update events
        [updateEvent.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [updateEvent.fulfilled]: (state, action) => {
            state.isLoading = false;
            const eventIndex = state.events.findIndex((event) => event.id === action.payload.id);
            let newEvents = state.events;
            newEvents.splice(eventIndex, 1, action.payload);
            state.events = newEvents;
        },
        [updateEvent.rejected]: (state, action) => {
            state.isLoading = true;
            state.error = action.payload;
        },

        //delete events
        [deleteEvent.pending]: (state, action) => {
            state.isLoading = true;
            state.error = null;
        },
        [deleteEvent.fulfilled]: (state, action) => {
            state.isLoading = false;
            let newEvents = state.events.filter((event) => event.id !== action.payload.id);
            state.events = newEvents;
        },
        [deleteEvent.rejected]: (state, action) => {
            state.isLoading = true;
            state.error = action.payload;
        }
    }
});
export default calenderSlice.reducer;
