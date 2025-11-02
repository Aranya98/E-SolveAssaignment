import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCases = createAsyncThunk('cases/fetchCases', async () => {
    const res = await fetch('/api/cases');
    const data = await res.json();
    return data.cases;
});

export const updateCase = createAsyncThunk('cases/updateCase', async (updatedCase) => {
    const res = await fetch(`/api/cases/${updatedCase.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCase),
    });
    const data = await res.json();
    return data.case;
});

const caseSlice = createSlice({
    name: 'cases',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCases.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCases.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchCases.rejected, (state) => {
                state.loading = false;
            })
            .addCase(updateCase.fulfilled, (state, action) => {
                const index = state.list.findIndex((c) => c.id === action.payload.id);
                if (index !== -1) state.list[index] = action.payload;
            });
    },
});

export default caseSlice.reducer;
