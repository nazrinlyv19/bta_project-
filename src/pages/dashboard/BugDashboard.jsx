import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  ChartBarIcon,
  ListBulletIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import BugList from '../buglist/BugList';
import Header from '../../components/layout/Header';
import BugDetailsModal from '../../components/ui/BugDetailsModal';

// Mock data with proper structure - updated with updatedAt and uppercase status
const MOCK_BUGS = [
  { id: 'BUG-2490', title: 'Login fails when 2FA is enabled for enterprise accounts', squad: 'Payments', status: 'IN_PROGRESS', qualityScore: 85, rejectCount: 0, reporter: 'Sarah J.', assignee: 'Mike R.', createdAt: '2023-10-24', updatedAt: '2023-10-25' },
  { id: 'BUG-2488', title: 'Dashboard charts not loading on mobile view', squad: 'Reporting', status: 'BACKLOG', qualityScore: 55, rejectCount: 0, reporter: 'David L.', assignee: 'Unassigned', createdAt: '2023-10-23', updatedAt: '2023-10-23' },
  { id: 'BUG-2482', title: 'Transaction history CSV export returns 500 error', squad: 'Core', status: 'IN_REVIEW', qualityScore: 30, rejectCount: 0, reporter: 'Priya M.', assignee: 'John D.', createdAt: '2023-10-21', updatedAt: '2023-10-22' },
  { id: 'BUG-2475', title: 'Typo in the settings modal description', squad: 'Auth', status: 'CLOSED', qualityScore: 92, rejectCount: 0, reporter: 'Alex M.', assignee: 'Alex M.', createdAt: '2023-10-19', updatedAt: '2023-10-20' },
  { id: 'BUG-2460', title: 'Incorrect currency symbol for JPY transactions', squad: 'Payments', status: 'TESTING', qualityScore: 76, rejectCount: 0, reporter: 'Tom H.', assignee: 'Mike R.', createdAt: '2023-10-15', updatedAt: '2023-10-18' },
  { id: 'BUG-2458', title: 'API Latency spike during peak hours', squad: 'Core', status: 'BACKLOG', qualityScore: 45, rejectCount: 0, reporter: 'James W.', assignee: 'Unassigned', createdAt: '2023-10-14', updatedAt: '2023-10-14' },
  { id: 'BUG-2455', title: 'User profile image upload fails on Safari', squad: 'Auth', status: 'CLOSED', qualityScore: 88, rejectCount: 0, reporter: 'Linda K.', assignee: 'Linda K.', createdAt: '2023-10-12', updatedAt: '2023-10-13' },
  { id: 'BUG-2451', title: 'Search filter broken for archived items', squad: 'Reporting', status: 'IN_REVIEW', qualityScore: 62, rejectCount: 0, reporter: 'Raj P.', assignee: 'Mike R.', createdAt: '2023-10-10', updatedAt: '2023-10-11' },
  { id: 'BUG-2448', title: 'Mobile view overlap in footer', squad: 'Mobile', status: 'IN_PROGRESS', qualityScore: 40, rejectCount: 0, reporter: 'Sophie L.', assignee: 'Unassigned', createdAt: '2023-10-09', updatedAt: '2023-10-10' },
  { id: 'BUG-2442', title: '404 on Help page link', squad: 'Core', status: 'RELEASED', qualityScore: 95, rejectCount: 0, reporter: 'Mark T.', assignee: 'John D.', createdAt: '2023-10-08', updatedAt: '2023-10-09' },
  { id: 'BUG-2439', title: 'Session timeout message missing', squad: 'Auth', status: 'BACKLOG', qualityScore: 25, rejectCount: 0, reporter: 'Emma S.', assignee: 'Unassigned', createdAt: '2023-10-06', updatedAt: '2023-10-06' },
  { id: 'BUG-2435', title: 'CSV Export formatting issues', squad: 'Reporting', status: 'TESTING', qualityScore: 70, rejectCount: 0, reporter: 'Chris B.', assignee: 'Mike R.', createdAt: '2023-10-05', updatedAt: '2023-10-07' },
  { id: 'BUG-2430', title: 'Payment gateway timeout', squad: 'Payments', status: 'REJECTED', qualityScore: 35, rejectCount: 2, reporter: 'Anna K.', assignee: 'Mike R.', createdAt: '2023-09-28', updatedAt: '2023-10-01' },
  { id: 'BUG-2425', title: 'Email notifications not sending', squad: 'Core', status: 'BLOCKED', qualityScore: 48, rejectCount: 0, reporter: 'Peter S.', assignee: 'John D.', createdAt: '2023-09-25', updatedAt: '2023-09-27' },
  { id: 'BUG-2420', title: 'Dashboard loading slowly', squad: 'Reporting', status: 'ANALYSIS', qualityScore: 80, rejectCount: 0, reporter: 'Lisa M.', assignee: 'Unassigned', createdAt: '2023-09-20', updatedAt: '2023-09-22' },
  { id: 'BUG-2415', title: 'Login button misaligned', squad: 'Auth', status: 'BACKLOG', qualityScore: 90, rejectCount: 0, reporter: 'Tom H.', assignee: 'Tom H.', createdAt: '2023-09-15', updatedAt: '2023-09-16' },
  { id: 'BUG-2410', title: 'Data export crashes on large datasets', squad: 'Core', status: 'REJECTED', qualityScore: 22, rejectCount: 3, reporter: 'Sarah J.', assignee: 'Unassigned', createdAt: '2023-09-10', updatedAt: '2023-09-12' },
  { id: 'BUG-2405', title: 'Footer links broken', squad: 'Mobile', status: 'TO_DO', qualityScore: 85, rejectCount: 0, reporter: 'David L.', assignee: 'Sarah J.', createdAt: '2023-09-05', updatedAt: '2023-09-07' },
  { id: 'BUG-2401', title: 'Payment gateway timeout on credit cards', squad: 'Payments', status: 'IN_PROGRESS', qualityScore: 42, reporter: 'Sarah J.', assignee: 'Mike R.', createdAt: '2023-11-20', updatedAt: '2023-11-22' },
];

// Status color mappings based on workflow diagram - using uppercase keys
const STATUS_COLORS = {
  'BACKLOG': 'bg-gray-100 text-gray-700 border-gray-200',
  'ANALYSIS': 'bg-blue-50 text-blue-600 border-blue-100',
  'TO_DO': 'bg-gray-100 text-gray-600 border-gray-200',
  'IN_PROGRESS': 'bg-blue-100 text-blue-700 border-blue-200',
  'BLOCKED': 'bg-red-100 text-red-700 border-red-200',
  'IN_REVIEW': 'bg-purple-100 text-purple-700 border-purple-200',
  'READY_FOR_TESTING': 'bg-blue-50 text-blue-700 border-blue-100',
  'PASSED_TO_QA': 'bg-blue-50 text-blue-600 border-blue-100',
  'TESTING': 'bg-blue-100 text-blue-700 border-blue-200',
  'TESTING_OK': 'bg-green-100 text-green-700 border-green-200',
  'READY_FOR_RELEASE': 'bg-gray-100 text-gray-600 border-gray-200',
  'RELEASE_IN_PROGRESS': 'bg-blue-100 text-blue-700 border-blue-200',
  'RELEASED': 'bg-green-100 text-green-700 border-green-200',
  'REJECTED': 'bg-red-100 text-red-700 border-red-200',
  'CLOSED': 'bg-green-100 text-green-700 border-green-200',
  'DONE': 'bg-green-100 text-green-700 border-green-200',
};

// Status display names
const STATUS_DISPLAY = {
  'BACKLOG': 'Backlog',
  'ANALYSIS': 'Analysis',
  'TO_DO': 'To Do',
  'IN_PROGRESS': 'In Progress',
  'BLOCKED': 'Blocked',
  'IN_REVIEW': 'In Review',
  'READY_FOR_TESTING': 'Ready for Testing',
  'PASSED_TO_QA': 'Passed to QA',
  'TESTING': 'Testing',
  'TESTING_OK': 'Testing OK',
  'READY_FOR_RELEASE': 'Ready for Release',
  'RELEASE_IN_PROGRESS': 'Release in Progress',
  'RELEASED': 'Released',
  'REJECTED': 'Rejected',
  'CLOSED': 'Closed',
  'DONE': 'Done',
};


function BugDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [activeFilter, setActiveFilter] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTribe, setSelectedTribe] = useState('All Tribes');
  const [selectedBug, setSelectedBug] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBugClick = (bug) => {
    setSelectedBug(bug);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBug(null);
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Filter logic with toggle
  const handleCardClick = (filterType) => {
    if (activeFilter === filterType) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filterType);
    }
    setCurrentPage(1);
  };

  // Get all bugs (source data)
  const allBugs = useMemo(() => MOCK_BUGS, []);

  // Filtered bugs based on card filter and search
  const filteredBugs = useMemo(() => {
    let result = [...allBugs];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(bug => 
        bug.id.toLowerCase().includes(query) ||
        bug.title.toLowerCase().includes(query) ||
        bug.squad.toLowerCase().includes(query) ||
        bug.reporter?.toLowerCase().includes(query) ||
        bug.assignee?.toLowerCase().includes(query)
      );
    }

    // Apply card filter
    if (activeFilter) {
      const today = new Date('2023-10-24'); // Mock today date
      
      switch (activeFilter) {
        case 'total':
          result = result.filter(bug => {
            const bugDate = new Date(bug.createdAt);
            return bugDate.getMonth() === today.getMonth() && 
                   bugDate.getFullYear() === today.getFullYear();
          });
          break;
        
        case 'old':
          result = result.filter(bug => {
            const bugDate = new Date(bug.createdAt);
            const daysDiff = Math.floor((today - bugDate) / (1000 * 60 * 60 * 24));
            return daysDiff > 15;
          });
          break;
        
        case 'highQuality':
          result = result.filter(bug => bug.qualityScore >= 75);
          break;
        
        case 'lowQuality':
          result = result.filter(bug => bug.qualityScore < 50);
          break;
        
        case 'rejected':
          result = result.filter(bug => 
            bug.status === 'REJECTED' || bug.rejectCount > 0
          );
          break;
        
        default:
          break;
      }
    }

    return result;
  }, [allBugs, activeFilter, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredBugs.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedBugs = filteredBugs.slice(startIndex, endIndex);

  // Reset page when filters change or total pages decrease
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredBugs.length, rowsPerPage, currentPage, totalPages]);

  // Calculate stats
  const today = new Date('2023-10-24');
  
  const totalBugsThisMonth = allBugs.filter(bug => {
    const bugDate = new Date(bug.createdAt);
    return bugDate.getMonth() === today.getMonth() && 
           bugDate.getFullYear() === today.getFullYear();
  }).length;
  
  const oldBugs = allBugs.filter(bug => {
    const bugDate = new Date(bug.createdAt);
    const daysDiff = Math.floor((today - bugDate) / (1000 * 60 * 60 * 24));
    return daysDiff > 15;
  }).length;
  
  const highQualityPercent = Math.round((allBugs.filter(bug => bug.qualityScore >= 75).length / allBugs.length) * 100);
  const lowQualityPercent = Math.round((allBugs.filter(bug => bug.qualityScore < 50).length / allBugs.length) * 100);
  const rejectedCount = allBugs.filter(bug => bug.status === 'REJECTED' || bug.rejectCount > 0).length;

  const getStatIcon = (iconType) => {
    const iconClass = "w-5 h-5";
    switch(iconType) {
      case 'pest':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20,8h-2.81c-0.45-0.78-1.07-1.45-1.82-1.96L17,4.41L15.59,3l-2.17,2.17C12.96,5.06,12.49,5,12,5 c-0.49,0-0.96,0.06-1.41,0.17L8.41,3L7,4.41l1.62,1.63C7.88,6.55,7.26,7.22,6.81,8H4v2h2.09c-0.05,0.33-0.09,0.66-0.09,1v1H4v2 h2v1c0,0.34,0.04,0.67,0.09,1H4v2h2.81c1.04,1.79,2.97,3,5.19,3s4.15-1.21,5.19-3H20v-2h-2.09c0.05-0.33,0.09-0.66,0.09-1v-1h2v-2 h-2v-1c0-0.34-0.04-0.67-0.09-1H20V8z M14,16h-4v-2h4V16z M14,12h-4v-2h4V12z"/>
          </svg>
        );
      case 'clock':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'check':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'warning':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      case 'refresh':
        return (
          <svg className={iconClass} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      default:
        return null;
    }
  };

  const stats = [
    {
      id: 'total',
      title: 'Total Bugs',
      subtitle: 'for this month',
      value: totalBugsThisMonth.toString(),
      change: '+12%',
      changeText: 'vs last month',
      isPositive: true,
      icon: 'pest',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 'old',
      title: 'Bugs > 15 Days',
      value: oldBugs.toString(),
      change: '+5%',
      changeText: 'vs last month',
      isPositive: false,
      icon: 'clock',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600'
    },
    {
      id: 'highQuality',
      title: 'High Quality %',
      value: `${highQualityPercent}%`,
      change: '+2%',
      changeText: 'above target',
      isPositive: true,
      icon: 'check',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      id: 'lowQuality',
      title: 'Low Quality %',
      value: `${lowQualityPercent}%`,
      change: '-1%',
      changeText: 'improving',
      isPositive: true,
      icon: 'warning',
      bgColor: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      id: 'rejected',
      title: 'High Reject Count',
      value: rejectedCount.toString(),
      change: '+8%',
      changeText: 'needs review',
      isPositive: false,
      icon: 'refresh',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  const getQualityBadge = (score) => {
    if (score >= 75) {
      return { text: `${score}% High`, color: 'bg-green-100 text-green-700 border-green-200' };
    } else if (score >= 50) {
      return { text: `${score}% Med`, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' };
    } else {
      return { text: `${score}% Low`, color: 'bg-red-100 text-red-700 border-red-200' };
    }
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
              onClick={() => setActiveNav('dashboard')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                activeNav === 'dashboard' ? 'bg-[#E31E24]/10 text-[#E31E24]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ChartBarIcon className="w-5 h-5" />
              <span className={`text-sm ${activeNav === 'dashboard' ? 'font-bold' : 'font-medium'}`}>Dashboard</span>
            </button>
            <button
              onClick={() => navigate('/bug-list')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                location.pathname === '/bug-list' ? 'bg-[#E31E24]/10 text-[#E31E24]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ListBulletIcon className="w-5 h-5" />
              <span className={`text-sm ${location.pathname === '/bug-list' ? 'font-bold' : 'font-medium'}`}>Bug List</span>
            </button>
            <button
              onClick={() => navigate('/bug-statistics')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                location.pathname === '/bug-statistics' ? 'bg-[#E31E24]/10 text-[#E31E24]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ChartPieIcon className="w-5 h-5" />
              <span className={`text-sm ${location.pathname === '/bug-statistics' ? 'font-bold' : 'font-medium'}`}>Statistics</span>
            </button>
            <button
              onClick={() => navigate('/settings')}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                location.pathname === '/settings' ? 'bg-[#E31E24]/10 text-[#E31E24]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Cog6ToothIcon className="w-5 h-5" />
              <span className={`text-sm ${activeNav === 'settings' ? 'font-bold' : 'font-medium'}`}>Settings</span>
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
          {activeNav === 'buglist' ? (
            <BugList searchQuery={searchQuery} selectedTribe={selectedTribe} />
          ) : (
            <div className="p-6 md:p-8">
              <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
            {/* Title Section */}
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h2>
              <p className="text-sm text-gray-500">Monitoring bug lifecycle metrics and quality standards for Q3 2023.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {stats.map((stat) => (
                <button
                  key={stat.id}
                  onClick={() => handleCardClick(stat.id)}
                  className={`bg-white rounded-xl p-5 border-2 shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-all text-left cursor-pointer ${
                    activeFilter === stat.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
                      {stat.subtitle && (
                        <p className="text-gray-500 text-xs mt-0.5">{stat.subtitle}</p>
                      )}
                    </div>
                    <span className={`${stat.id === 'total' ? 'text-[#E31E24]/80 bg-[#E31E24]/10' : `${stat.bgColor} ${stat.iconColor}`} p-1 rounded`}>
                      {getStatIcon(stat.icon)}
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</p>
                    <div className="flex items-center gap-1">
                      <span className={`text-xs font-bold flex items-center ${stat.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.isPositive ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M5 10l7-7m0 0l7 7m-7-7v18"} />
                        </svg>
                        {stat.change}
                      </span>
                      <span className="text-gray-500 text-xs">{stat.changeText}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Bug List Table */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col">
              {/* Table Header */}
              <div className="p-5 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-gray-900 text-lg font-bold">Bug List</h3>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-500">Rows per page:</label>
                  <select 
                    value={rowsPerPage} 
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>

              {/* Active Filters - Only for card filter */}
              {activeFilter && (
                <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mr-2">Active Filters:</span>
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 text-xs font-medium">
                    {stats.find(s => s.id === activeFilter)?.title}
                    <button 
                      onClick={() => {
                        setActiveFilter(null);
                        setCurrentPage(1);
                      }} 
                      className="hover:text-blue-900"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                      <th className="py-3 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Bug ID</th>
                      <th className="py-3 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider" style={{ maxWidth: '200px', width: '20%' }}>Bug Title</th>
                      <th className="py-3 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Squad</th>
                      <th className="py-3 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Status</th>
                      <th className="py-3 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center">Quality Score</th>
                      <th className="py-3 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Reporter</th>
                      <th className="py-3 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Assignee</th>
                      <th className="py-3 px-5 text-xs font-semibold text-gray-600 uppercase tracking-wider">Created</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {paginatedBugs.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-gray-500">
                          No bugs found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      paginatedBugs.map((bug) => {
                        const qualityBadge = getQualityBadge(bug.qualityScore);
                        const statusColor = STATUS_COLORS[bug.status] || 'bg-gray-100 text-gray-700 border-gray-200';
                        const statusDisplay = STATUS_DISPLAY[bug.status] || bug.status;
                        
                        return (
                          <tr key={bug.id} className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleBugClick(bug)}>
                            <td className="py-3 px-5 text-sm font-medium">
                              <a href="#" className="text-blue-600 hover:underline" onClick={(e) => e.preventDefault()}>
                                {bug.id}
                              </a>
                            </td>
                            <td className="py-3 px-5 text-sm text-gray-900 font-normal" style={{ maxWidth: '200px' }}>
                              <div className="truncate" title={bug.title}>{bug.title}</div>
                            </td>
                            <td className="py-3 px-5 text-center">
                              <span className="inline-flex items-center justify-center px-4 py-0.5 rounded text-[13px] font-medium bg-gray-100 text-gray-800 border border-gray-200 w-[86px]">
                                {bug.squad}
                              </span>
                            </td>
                            <td className="py-3 px-5 text-center">
                              <span className={`inline-flex items-center justify-center px-2 py-0.5 rounded text-[13px] font-medium border ${statusColor} w-28`}>
                                {statusDisplay}
                              </span>
                            </td>
                            <td className="py-3 px-5 text-center">
                              <span className={`inline-flex items-center justify-center px-3 py-0.5 rounded-full text-[13px] font-semibold border ${qualityBadge.color} w-28`}>
                                {qualityBadge.text}
                              </span>
                            </td>
                            <td className="py-3 px-5 text-sm text-gray-900">{bug.reporter}</td>
                            <td className="py-3 px-5 text-sm text-gray-500">
                              {bug.assignee === 'Unassigned' ? (
                                <span className="text-gray-400">Unassigned</span>
                              ) : (
                                bug.assignee
                              )}
                            </td>
                            <td className="py-3 px-5 text-sm text-gray-500 whitespace-nowrap">
                              {new Date(bug.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="p-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
                <span className="text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-900">{startIndex + 1}-{Math.min(endIndex, filteredBugs.length)}</span> of <span className="font-medium text-gray-900">{filteredBugs.length}</span> bugs
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 rounded border border-gray-300 text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-1.5 rounded border text-sm ${
                          currentPage === page
                            ? 'border-gray-300 text-gray-900 bg-white font-medium'
                            : 'border-transparent text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </button>
                    );
                  })}
                  {totalPages > 5 && <span className="px-2 py-1.5 text-sm text-gray-500">...</span>}
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 rounded border border-gray-300 text-sm text-gray-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
          )}
        </div>
      </main>

      {/* Bug Details Modal */}
      <BugDetailsModal 
        bug={selectedBug}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default BugDashboard;
