import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Dashboard from './pages/dashboard/Dashboard';
import BugDashboard from './pages/dashboard/BugDashboard';
import BugStatistics from './pages/bugstatistics/BugStatistics';
import BugListPage from './pages/buglist/BugListPage';
import SettingsPage from './pages/settings/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<BugDashboard />} />
        <Route path="/dashboard/simple" element={<Dashboard />} />
        <Route path="/bug-list" element={<BugListPage />} />
        <Route path="/bug-statistics" element={<BugStatistics />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
