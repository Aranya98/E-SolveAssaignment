import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAgents = createAsyncThunk('agents/fetchAgents', async () => {
    const res = await fetch('/api/agents');
    const data = await res.json();
    return data.agents;
});

export const addAgent = createAsyncThunk('agents/addAgent', async (agent) => {
    const res = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agent),
    });
    const data = await res.json();
    return data.agent;
});

export const updateAgent = createAsyncThunk('agents/updateAgent', async (agent) => {
    const res = await fetch(`/api/agents/${agent.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(agent),
    });
    const data = await res.json();
    return data.agent;
});

export const deleteAgent = createAsyncThunk('agents/deleteAgent', async (id) => {
    await fetch(`/api/agents/${id}`, { method: 'DELETE' });
    return id;
});

const agentSlice = createSlice({
    name: 'agents',
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAgents.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAgents.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(addAgent.fulfilled, (state, action) => {
                state.list.push(action.payload);
            })
            .addCase(updateAgent.fulfilled, (state, action) => {
                const idx = state.list.findIndex((a) => a.id === action.payload.id);
                if (idx !== -1) state.list[idx] = action.payload;
            })
            .addCase(deleteAgent.fulfilled, (state, action) => {
                state.list = state.list.filter((a) => a.id !== action.payload);
            });
    },
});

export default agentSlice.reducer;
