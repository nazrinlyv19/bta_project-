import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChartBarIcon,
  ListBulletIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Header from '../../components/layout/Header';
import Settings from './Settings';

function SettingsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTribe, setSelectedTribe] = useState('All Tribes');

  const handleLogout = () => {
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-white border-r border-gray-200 flex flex-col justify-between flex-shrink-0 transition-all duration-300 overflow-hidden z-20`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 flex items-center gap-3">
            <div className="size-8 rounded-lg bg-[#E31E24] flex items-center justify-center text-white">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.5 10h-2v7h2v-7zm6 0h-2v7h2v-7zm8.5 9H2v2h19v-2zm-2.5-9h-2v7h2v-7zm-7-6.74L16.71 6H6.29l5.21-2.74m0-2.26L2 6v2h19V6l-9.5-5z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-gray-900 text-base font-bold leading-tight uppercase tracking-tight">QA Portal</h1>
              <p className="text-gray-600 text-[10px] font-semibold uppercase tracking-widest">Internal System</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 flex flex-col gap-1 overflow-y-auto">
            <button
              onClick={() => navigate('/dashboard')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                isActive('/dashboard')
                  ? 'bg-[#E31E24]/10 text-[#E31E24] font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ChartBarIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/bug-list')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                isActive('/bug-list')
                  ? 'bg-[#E31E24]/10 text-[#E31E24] font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ListBulletIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Bug List</span>
            </button>
            <button
              onClick={() => navigate('/bug-statistics')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                isActive('/bug-statistics')
                  ? 'bg-[#E31E24]/10 text-[#E31E24] font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ChartPieIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Statistics</span>
            </button>
            <button
              onClick={() => navigate('/settings')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                isActive('/settings')
                  ? 'bg-[#E31E24]/10 text-[#E31E24] font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Cog6ToothIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Settings</span>
            </button>
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                AM
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-sm font-medium text-gray-900">Alex Morgan</span>
                <span className="text-xs text-gray-500">Chapter Lead</span>
              </div>
              <button onClick={handleLogout} className="text-gray-500 hover:text-gray-900 cursor-pointer">
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-gray-50 overflow-hidden">
        {/* Header */}
        <Header
          sidebarOpen={sidebarOpen}
          onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedTribe={selectedTribe}
          onTribeChange={setSelectedTribe}
          showSearchAndTribe={true}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto mt-16">
          <Settings />
        </div>
      </main>
    </div>
  );
}

export default SettingsPage;
