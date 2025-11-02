import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLogs = createAsyncThunk('logs/fetchLogs', async () => {
    const res = await fetch('/api/logs');
    const data = await res.json();
    return data.logs;
});

export const addLog = createAsyncThunk('logs/addLog', async (log) => {
    const res = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(log),
    });
    const data = await res.json();
    return data.log;
});

const logSlice = createSlice({
    name: 'logs',
    initialState: { list: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogs.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(addLog.fulfilled, (state, action) => {
                state.list.push(action.payload);
            });
    },
});

export default logSlice.reducer;
