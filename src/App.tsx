/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { AnalysisEngine } from "./pages/AnalysisEngine";
import { AuthPage } from "./pages/AuthPage";
import { RealTimeHub } from "./pages/RealTimeHub";
import { TopicDetection } from "./pages/TopicDetection";
import { PerformanceAnalytics } from "./pages/PerformanceAnalytics";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis" element={<AnalysisEngine />} />
          <Route path="/real-time" element={<RealTimeHub />} />
          <Route path="/topics" element={<TopicDetection />} />
          <Route path="/performance" element={<PerformanceAnalytics />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
