import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/Layout/ProtectedRoute';
import Layout from './components/Layout/Layout';

// Lazy-loaded pages
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CaseManagement = lazy(() => import('./pages/CaseManagement'));
const AgentManagement = lazy(() => import('./pages/AgentManagement'));
const ActivityLog = lazy(() => import('./pages/ActivityLog'));


export default function App() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-xl">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="cases" element={<CaseManagement />} />
          <Route path="agents" element={<AgentManagement />} />
          <Route path="logs" element={<ActivityLog />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
