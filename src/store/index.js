import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import caseReducer from './slices/caseSlice';
import agentReducer from './slices/agentSlice';
import logReducer from './slices/logSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cases: caseReducer,
        agents: agentReducer,
        logs: logReducer,
    },
});

export default store;
