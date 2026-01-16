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
import BugDetailsModal from '../../components/ui/BugDetailsModal';

// Mock bugs data for quality modal
const MOCK_QUALITY_BUGS = [
  // LOWEST (0-40%)
  { id: 'BB-1402', title: 'Session timeout occurs randomly during checkout', status: 'IN_PROGRESS', qualityScore: 15, createdAt: '2023-10-24', updatedAt: '2023-10-24', reporter: 'A. Kerimov' },
  { id: 'BB-1398', title: 'Profile image upload failing on mobile devices', status: 'TO_DO', qualityScore: 22, createdAt: '2023-10-23', updatedAt: '2023-10-23', reporter: 'M. Taghiyev' },
  { id: 'BB-1385', title: 'Notification badge count incorrect after reading', status: 'IN_REVIEW', qualityScore: 18, createdAt: '2023-10-21', updatedAt: '2023-10-21', reporter: 'L. Rasulova' },
  { id: 'BB-1372', title: 'Password reset link expires immediately', status: 'TO_DO', qualityScore: 12, createdAt: '2023-10-20', updatedAt: '2023-10-20', reporter: 'E. Aliyeva' },
  { id: 'BB-1365', title: 'Search filter not persisting after page refresh', status: 'IN_REVIEW', qualityScore: 25, createdAt: '2023-10-18', updatedAt: '2023-10-18', reporter: 'R. Mammadov' },
  { id: 'BB-1358', title: 'Dashboard widgets not loading on first visit', status: 'IN_PROGRESS', qualityScore: 35, createdAt: '2023-10-17', updatedAt: '2023-10-18', reporter: 'S. Huseynov' },
  { id: 'BB-1350', title: 'Export to PDF button unresponsive', status: 'TO_DO', qualityScore: 38, createdAt: '2023-10-16', updatedAt: '2023-10-16', reporter: 'N. Guliyev' },
  { id: 'BB-1501', title: 'Login form validation not working properly', status: 'IN_PROGRESS', qualityScore: 28, createdAt: '2023-10-25', updatedAt: '2023-10-25', reporter: 'F. Hasanov' },
  { id: 'BB-1502', title: 'API endpoint returning 500 error intermittently', status: 'TO_DO', qualityScore: 32, createdAt: '2023-10-25', updatedAt: '2023-10-25', reporter: 'G. Ismayilova' },
  { id: 'BB-1503', title: 'Memory leak in dashboard component', status: 'IN_REVIEW', qualityScore: 19, createdAt: '2023-10-24', updatedAt: '2023-10-25', reporter: 'H. Jafarov' },
  { id: 'BB-1504', title: 'CSS styles not loading on Safari browser', status: 'IN_PROGRESS', qualityScore: 8, createdAt: '2023-10-24', updatedAt: '2023-10-24', reporter: 'I. Karimova' },
  { id: 'BB-1505', title: 'Data not syncing between tabs', status: 'TO_DO', qualityScore: 14, createdAt: '2023-10-23', updatedAt: '2023-10-23', reporter: 'J. Mammadli' },
  { id: 'BB-1506', title: 'Push notifications not received on Android', status: 'IN_REVIEW', qualityScore: 27, createdAt: '2023-10-23', updatedAt: '2023-10-24', reporter: 'K. Novruzov' },
  { id: 'BB-1507', title: 'Report generation fails for large datasets', status: 'IN_PROGRESS', qualityScore: 33, createdAt: '2023-10-22', updatedAt: '2023-10-23', reporter: 'A. Kerimov' },
  // LOW (41-50%)
  { id: 'BB-1342', title: 'User avatar not displaying correctly in comments', status: 'IN_PROGRESS', qualityScore: 45, createdAt: '2023-10-15', updatedAt: '2023-10-16', reporter: 'A. Kerimov' },
  { id: 'BB-1335', title: 'Form validation error messages unclear', status: 'IN_REVIEW', qualityScore: 48, createdAt: '2023-10-14', updatedAt: '2023-10-15', reporter: 'M. Taghiyev' },
  { id: 'BB-1508', title: 'Table sorting indicator missing', status: 'TO_DO', qualityScore: 42, createdAt: '2023-10-22', updatedAt: '2023-10-22', reporter: 'L. Rasulova' },
  { id: 'BB-1509', title: 'Modal close button not accessible via keyboard', status: 'IN_PROGRESS', qualityScore: 44, createdAt: '2023-10-21', updatedAt: '2023-10-22', reporter: 'E. Aliyeva' },
  { id: 'BB-1510', title: 'Date picker showing wrong month initially', status: 'IN_REVIEW', qualityScore: 47, createdAt: '2023-10-21', updatedAt: '2023-10-21', reporter: 'R. Mammadov' },
  { id: 'BB-1511', title: 'Dropdown menu overlapping with footer', status: 'TO_DO', qualityScore: 41, createdAt: '2023-10-20', updatedAt: '2023-10-20', reporter: 'S. Huseynov' },
  { id: 'BB-1512', title: 'Image carousel autoplay not stopping on hover', status: 'IN_PROGRESS', qualityScore: 49, createdAt: '2023-10-20', updatedAt: '2023-10-21', reporter: 'N. Guliyev' },
  { id: 'BB-1513', title: 'Search results pagination incorrect count', status: 'IN_REVIEW', qualityScore: 43, createdAt: '2023-10-19', updatedAt: '2023-10-20', reporter: 'F. Hasanov' },
  { id: 'BB-1514', title: 'Tooltip text truncated on long content', status: 'TO_DO', qualityScore: 46, createdAt: '2023-10-19', updatedAt: '2023-10-19', reporter: 'G. Ismayilova' },
  { id: 'BB-1515', title: 'Chart legend colors not matching data', status: 'IN_PROGRESS', qualityScore: 50, createdAt: '2023-10-18', updatedAt: '2023-10-19', reporter: 'H. Jafarov' },
  // MEDIUM (51-80%)
  { id: 'BB-1328', title: 'Sorting by date not working in reports', status: 'TO_DO', qualityScore: 52, createdAt: '2023-10-13', updatedAt: '2023-10-13', reporter: 'L. Rasulova' },
  { id: 'BB-1320', title: 'Chart tooltips cut off on smaller screens', status: 'IN_PROGRESS', qualityScore: 58, createdAt: '2023-10-12', updatedAt: '2023-10-13', reporter: 'E. Aliyeva' },
  { id: 'BB-1312', title: 'Email notifications delayed by several hours', status: 'IN_REVIEW', qualityScore: 62, createdAt: '2023-10-11', updatedAt: '2023-10-12', reporter: 'R. Mammadov' },
  { id: 'BB-1305', title: 'Dark mode toggle not saving preference', status: 'TO_DO', qualityScore: 68, createdAt: '2023-10-10', updatedAt: '2023-10-10', reporter: 'S. Huseynov' },
  { id: 'BB-1298', title: 'Pagination breaks when filtering results', status: 'IN_PROGRESS', qualityScore: 72, createdAt: '2023-10-09', updatedAt: '2023-10-10', reporter: 'N. Guliyev' },
  { id: 'BB-1290', title: 'API response time degradation under load', status: 'IN_REVIEW', qualityScore: 78, createdAt: '2023-10-08', updatedAt: '2023-10-09', reporter: 'A. Kerimov' },
  { id: 'BB-1516', title: 'Filter dropdown not closing on outside click', status: 'TO_DO', qualityScore: 55, createdAt: '2023-10-18', updatedAt: '2023-10-18', reporter: 'I. Karimova' },
  { id: 'BB-1517', title: 'Loading spinner not centered on mobile', status: 'IN_PROGRESS', qualityScore: 61, createdAt: '2023-10-17', updatedAt: '2023-10-18', reporter: 'J. Mammadli' },
  { id: 'BB-1518', title: 'Breadcrumb navigation missing home link', status: 'IN_REVIEW', qualityScore: 66, createdAt: '2023-10-17', updatedAt: '2023-10-17', reporter: 'K. Novruzov' },
  { id: 'BB-1519', title: 'Form autofill causing layout shift', status: 'TO_DO', qualityScore: 74, createdAt: '2023-10-16', updatedAt: '2023-10-16', reporter: 'A. Kerimov' },
  { id: 'BB-1520', title: 'Sidebar menu items not highlighting active state', status: 'IN_PROGRESS', qualityScore: 79, createdAt: '2023-10-16', updatedAt: '2023-10-17', reporter: 'M. Taghiyev' },
  { id: 'BB-1521', title: 'Table header sticky position incorrect', status: 'IN_REVIEW', qualityScore: 53, createdAt: '2023-10-15', updatedAt: '2023-10-16', reporter: 'L. Rasulova' },
  { id: 'BB-1522', title: 'Button hover state not visible enough', status: 'TO_DO', qualityScore: 59, createdAt: '2023-10-15', updatedAt: '2023-10-15', reporter: 'E. Aliyeva' },
  { id: 'BB-1523', title: 'Input placeholder text color too light', status: 'IN_PROGRESS', qualityScore: 64, createdAt: '2023-10-14', updatedAt: '2023-10-15', reporter: 'R. Mammadov' },
  { id: 'BB-1524', title: 'Scroll position not preserved on back navigation', status: 'IN_REVIEW', qualityScore: 70, createdAt: '2023-10-14', updatedAt: '2023-10-14', reporter: 'S. Huseynov' },
  { id: 'BB-1525', title: 'Avatar upload preview not showing', status: 'TO_DO', qualityScore: 76, createdAt: '2023-10-13', updatedAt: '2023-10-13', reporter: 'N. Guliyev' },
  // HIGH (81-100%)
  { id: 'BB-1282', title: 'Mobile menu animation stuttering', status: 'TO_DO', qualityScore: 82, createdAt: '2023-10-07', updatedAt: '2023-10-07', reporter: 'M. Taghiyev' },
  { id: 'BB-1275', title: 'User permissions not updating in real-time', status: 'IN_PROGRESS', qualityScore: 85, createdAt: '2023-10-06', updatedAt: '2023-10-07', reporter: 'L. Rasulova' },
  { id: 'BB-1268', title: 'File upload progress indicator missing', status: 'IN_REVIEW', qualityScore: 88, createdAt: '2023-10-05', updatedAt: '2023-10-06', reporter: 'E. Aliyeva' },
  { id: 'BB-1260', title: 'Keyboard navigation not working in dropdowns', status: 'TO_DO', qualityScore: 92, createdAt: '2023-10-04', updatedAt: '2023-10-04', reporter: 'R. Mammadov' },
  { id: 'BB-1252', title: 'Cache invalidation causing stale data display', status: 'IN_PROGRESS', qualityScore: 95, createdAt: '2023-10-03', updatedAt: '2023-10-04', reporter: 'S. Huseynov' },
  { id: 'BB-1526', title: 'Session management improvements needed', status: 'IN_REVIEW', qualityScore: 83, createdAt: '2023-10-12', updatedAt: '2023-10-13', reporter: 'F. Hasanov' },
  { id: 'BB-1527', title: 'Error boundary not catching all errors', status: 'TO_DO', qualityScore: 86, createdAt: '2023-10-12', updatedAt: '2023-10-12', reporter: 'G. Ismayilova' },
  { id: 'BB-1528', title: 'Performance optimization for large lists', status: 'IN_PROGRESS', qualityScore: 89, createdAt: '2023-10-11', updatedAt: '2023-10-12', reporter: 'H. Jafarov' },
  { id: 'BB-1529', title: 'Accessibility audit findings implementation', status: 'IN_REVIEW', qualityScore: 93, createdAt: '2023-10-11', updatedAt: '2023-10-11', reporter: 'I. Karimova' },
  { id: 'BB-1530', title: 'Unit test coverage improvements', status: 'TO_DO', qualityScore: 97, createdAt: '2023-10-10', updatedAt: '2023-10-10', reporter: 'J. Mammadli' },
  { id: 'BB-1531', title: 'Code documentation updates required', status: 'IN_PROGRESS', qualityScore: 84, createdAt: '2023-10-10', updatedAt: '2023-10-11', reporter: 'K. Novruzov' },
  { id: 'BB-1532', title: 'Security vulnerability in authentication flow', status: 'IN_REVIEW', qualityScore: 91, createdAt: '2023-10-09', updatedAt: '2023-10-10', reporter: 'A. Kerimov' },
  { id: 'BB-1533', title: 'Database query optimization needed', status: 'TO_DO', qualityScore: 87, createdAt: '2023-10-09', updatedAt: '2023-10-09', reporter: 'M. Taghiyev' },
  { id: 'BB-1534', title: 'API rate limiting implementation', status: 'IN_PROGRESS', qualityScore: 94, createdAt: '2023-10-08', updatedAt: '2023-10-09', reporter: 'L. Rasulova' },
  { id: 'BB-1535', title: 'Logging and monitoring enhancements', status: 'IN_REVIEW', qualityScore: 98, createdAt: '2023-10-08', updatedAt: '2023-10-08', reporter: 'E. Aliyeva' },
];

// Quality Modal Component
const QualityBugsModal = ({ isOpen, onClose, qualityType, bugs, onBugClick }) => {
  if (!isOpen) return null;

  const qualityConfig = {
    HIGH: { title: 'High Quality Bugs', color: 'bg-green-100 text-green-700', range: '81-100%' },
    MEDIUM: { title: 'Medium Quality Bugs', color: 'bg-amber-100 text-amber-700', range: '51-80%' },
    LOW: { title: 'Low Quality Bugs', color: 'bg-orange-100 text-orange-700', range: '41-50%' },
    LOWEST: { title: 'Lowest Quality Bugs', color: 'bg-red-100 text-red-700', range: '0-40%' },
  };

  const config = qualityConfig[qualityType];

  const statusColors = {
    'IN_PROGRESS': 'bg-amber-50 text-amber-700',
    'TO_DO': 'bg-gray-100 text-gray-700',
    'IN_REVIEW': 'bg-purple-100 text-purple-700',
    'BACKLOG': 'bg-gray-100 text-gray-600',
    'BLOCKED': 'bg-red-100 text-red-700',
    'CLOSED': 'bg-slate-100 text-slate-700',
  };

  const getQualityBadge = (score) => {
    if (score >= 81) return { color: 'bg-green-100 text-green-700', label: 'HIGH' };
    if (score >= 51) return { color: 'bg-amber-100 text-amber-700', label: 'MEDIUM' };
    if (score >= 41) return { color: 'bg-orange-100 text-orange-700', label: 'LOW' };
    return { color: 'bg-red-100 text-red-700', label: 'LOWEST' };
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getRelativeTime = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(16, 22, 34, 0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-5xl h-[90vh] flex flex-col rounded-xl shadow-2xl overflow-hidden border border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="border-b border-gray-100 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{config.title}</h2>
            <p className="text-sm text-gray-500 mt-1">Detailed list of bugs requiring description improvements.</p>
          </div>
          <button 
            onClick={onClose}
            className="text-[#E31E24] hover:text-red-700 transition-colors cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Bug ID</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Bug Title</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">Quality Score</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Last Updated</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Reporter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bugs.map((bug) => {
                const qualityBadge = getQualityBadge(bug.qualityScore);
                const statusColor = statusColors[bug.status] || 'bg-gray-100 text-gray-700';
                return (
                  <tr 
                    key={bug.id} 
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onBugClick && onBugClick(bug)}
                  >
                    <td className="px-4 py-3">
                      <span className="text-blue-600 font-medium text-sm">{bug.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-900 truncate block max-w-[250px]" title={bug.title}>{bug.title}</span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold ${statusColor}`}>
                        {bug.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold ${qualityBadge.color}`}>
                        {bug.qualityScore}% <span className="ml-1 opacity-75">{qualityBadge.label}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{formatDate(bug.createdAt)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-500">{getRelativeTime(bug.updatedAt)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700">{bug.reporter}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4 flex items-center justify-between bg-white">
          <span className="text-sm text-blue-600">Showing {bugs.length} of {MOCK_QUALITY_BUGS.length} bugs</span>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-[#E31E24] text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

function BugStatistics() {
  const navigate = useNavigate();
  const location = useLocation();
  const [timePeriod, setTimePeriod] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTribe, setSelectedTribe] = useState('All Tribes');
  const [selectedQuality, setSelectedQuality] = useState(null);
  const [isQualityModalOpen, setIsQualityModalOpen] = useState(false);
  const [selectedBug, setSelectedBug] = useState(null);
  const [isBugDetailsModalOpen, setIsBugDetailsModalOpen] = useState(false);

  const handleQualityClick = (quality) => {
    setSelectedQuality(quality);
    setIsQualityModalOpen(true);
  };

  const handleCloseQualityModal = () => {
    setIsQualityModalOpen(false);
    setSelectedQuality(null);
  };

  const handleBugClick = (bug) => {
    // Ensure bug has assignee field for BugDetailsModal
    const bugWithAssignee = {
      ...bug,
      assignee: bug.assignee || 'Unassigned'
    };
    setSelectedBug(bugWithAssignee);
    setIsBugDetailsModalOpen(true);
  };

  const handleCloseBugDetailsModal = () => {
    setIsBugDetailsModalOpen(false);
    setSelectedBug(null);
  };

  const getFilteredBugsByQuality = (quality) => {
    switch (quality) {
      case 'HIGH': return MOCK_QUALITY_BUGS.filter(b => b.qualityScore >= 81);
      case 'MEDIUM': return MOCK_QUALITY_BUGS.filter(b => b.qualityScore >= 51 && b.qualityScore <= 80);
      case 'LOW': return MOCK_QUALITY_BUGS.filter(b => b.qualityScore >= 41 && b.qualityScore <= 50);
      case 'LOWEST': return MOCK_QUALITY_BUGS.filter(b => b.qualityScore <= 40);
      default: return [];
    }
  };

  const handleLogout = () => {
    navigate('/');
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
                location.pathname === '/dashboard' ? 'bg-[#E31E24]/10 text-[#E31E24]' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ChartBarIcon className="w-5 h-5" />
              <span className={`text-sm ${location.pathname === '/dashboard' ? 'font-bold' : 'font-medium'}`}>Dashboard</span>
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
                location.pathname === '/settings'
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
          <div className="p-6 md:p-8">
            <div className="max-w-7xl mx-auto flex flex-col gap-8 pb-10">
              {/* Title Section */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Bug Statistics View</h2>
                  <p className="text-sm text-gray-500">Enhanced analytics for bug tracking, aging, and backlog trends.</p>
                </div>
                <div className="flex flex-wrap items-end gap-3">
            <label className="flex flex-col min-w-[220px]">
              <span className="text-gray-900 text-xs font-semibold uppercase tracking-wide pb-1">Time Period</span>
              <div className="relative">
                <select
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="w-full appearance-none rounded-lg bg-white border border-gray-200 text-gray-900 py-2.5 pl-3 pr-10 text-sm focus:border-[#E31E24] focus:ring-1 focus:ring-[#E31E24] outline-none transition-all"
                >
                  <option>All</option>
                  <option>Q1</option>
                  <option>Q2</option>
                  <option>Q3</option>
                  <option>Q4</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </label>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Active Bugs */}
          <div className="flex flex-col justify-between gap-4 rounded-xl bg-white border border-gray-200 p-5 shadow-sm border-l-4 border-l-[#E31E24]">
            <div className="flex justify-between items-start">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Active Bugs</p>
              <span className="bg-red-50 text-[#E31E24] text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                5%
              </span>
            </div>
            <div>
              <p className="text-gray-900 text-3xl font-bold leading-tight">142</p>
              <p className="text-xs text-gray-500 mt-1">
                {timePeriod === 'All' ? 'vs. 128 previous quarter' : 
                 timePeriod === 'Q1' ? 'vs. 118 Q4' :
                 timePeriod === 'Q2' ? 'vs. 135 Q1' :
                 timePeriod === 'Q3' ? 'vs. 142 Q2' :
                 'vs. 148 Q3'}
              </p>
            </div>
          </div>

          {/* Rejection Rate */}
          <div className="flex flex-col justify-between gap-4 rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Rejection Rate</p>
              <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
                1.5%
              </span>
            </div>
            <div>
              <p className="text-gray-900 text-3xl font-bold leading-tight">8%</p>
              <p className="text-xs text-gray-500 mt-1">Improved bug triage quality</p>
            </div>
          </div>

          {/* Total Fixed Bugs */}
          <div className="flex flex-col justify-between gap-4 rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Total Fixed Bugs</p>
              <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                12%
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-gray-900 text-3xl font-bold leading-tight">324</p>
                <p className="text-xs text-gray-500 mt-1">This period</p>
              </div>
              <div className="flex items-end gap-1 h-8">
                <div className="w-1.5 bg-gray-300 rounded-t-sm h-[30%]"></div>
                <div className="w-1.5 bg-gray-300 rounded-t-sm h-[50%]"></div>
                <div className="w-1.5 bg-gray-400 rounded-t-sm h-[40%]"></div>
                <div className="w-1.5 bg-[#E31E24]/40 rounded-t-sm h-[70%]"></div>
                <div className="w-1.5 bg-[#E31E24]/60 rounded-t-sm h-[60%]"></div>
                <div className="w-1.5 bg-[#E31E24] rounded-t-sm h-[85%]"></div>
              </div>
            </div>
          </div>

          {/* Stale Bugs */}
          <div className="flex flex-col justify-between gap-4 rounded-xl bg-white border border-gray-200 p-5 shadow-sm">
            <div className="flex justify-between items-start">
              <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide">Stale Bugs</p>
              <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-900 text-3xl font-bold leading-tight">42</p>
              <p className="text-xs text-gray-500 mt-1">Not updated in &gt;14 days</p>
            </div>
          </div>
        </div>

        {/* Middle Section - Quality Distribution and Bug Age */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quality Distribution */}
          <div className="flex flex-col gap-4 rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900 text-lg font-bold">Quality Distribution</h3>
            </div>
            <p className="text-sm text-gray-500">Analysis of bug report completeness and clarity.</p>
            <div className="flex flex-col gap-4 mt-2 flex-1 justify-center">
              {/* High Quality */}
              <div 
                className="flex flex-col gap-2 p-2 -mx-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleQualityClick('HIGH')}
              >
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-800">High Quality (81-100%)</span>
                  <span className="text-gray-500">65%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-green-500 w-[65%] rounded-full"></div>
                </div>
              </div>
              {/* Medium Quality */}
              <div 
                className="flex flex-col gap-2 p-2 -mx-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleQualityClick('MEDIUM')}
              >
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-800">Medium Quality (51-80%)</span>
                  <span className="text-gray-500">25%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-amber-400 w-[25%] rounded-full"></div>
                </div>
              </div>
              {/* Low Quality */}
              <div 
                className="flex flex-col gap-2 p-2 -mx-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleQualityClick('LOW')}
              >
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-800">Low Quality (41-50%)</span>
                  <span className="text-gray-500">7%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-orange-500 w-[7%] rounded-full"></div>
                </div>
              </div>
              {/* Lowest Quality */}
              <div 
                className="flex flex-col gap-2 p-2 -mx-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleQualityClick('LOWEST')}
              >
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-800">Lowest Quality (0-40%)</span>
                  <span className="text-gray-500">3%</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div className="h-full bg-[#E31E24] w-[3%] rounded-full"></div>
                </div>
              </div>
              {/* Insight */}
              <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-start gap-3">
                <svg className="w-5 h-5 text-[#E31E24] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs text-gray-600 leading-relaxed">
                  <strong>Insight:</strong> High quality reports have increased by 12% since the new template rollout.
                </p>
              </div>
            </div>
          </div>

          {/* Bug Age */}
          <div className="flex flex-col gap-4 rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900 text-lg font-bold">Bug Age</h3>
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-[#E31E24]"></span>
                <span className="text-xs text-gray-500">Active Count</span>
              </div>
            </div>
            <p className="text-sm text-gray-500">Distribution of unresolved bugs by days open.</p>
            <div className="flex items-end gap-4 h-64 mt-4">
              {(() => {
                // Bug age data with counts
                const bugAgeData = [
                  { height: 100, count: 45, label: '0-7 Days', color: 'bg-blue-300' },
                  { height: 71, count: 32, label: '8-14 Days', color: 'bg-blue-400' },
                  { height: 62, count: 28, label: '15-30 Days', color: 'bg-blue-500' },
                  { height: 82, count: 37, label: '60+ Days', color: 'bg-blue-600' }
                ];
                
                return bugAgeData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2 group h-full">
                    <div className="flex-1 flex items-end w-full relative">
                      <div
                        className={`w-full ${item.color} rounded-t-sm hover:bg-blue-500 transition-colors cursor-pointer relative flex items-center justify-center`}
                        style={{ height: `${item.height}%` }}
                      >
                        <span className="text-sm font-bold text-white z-10 drop-shadow-md">{item.count}</span>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-xs font-semibold text-gray-500 text-center uppercase">{item.label}</span>
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>

        {/* Incoming vs. Resolved Trend */}
        <div className="w-full rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <h3 className="text-gray-900 text-lg font-bold">Incoming vs. Resolved Trend</h3>
              <p className="text-sm text-gray-500">Sprint-based volume of new bugs logged versus bugs fixed.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-[#E31E24] border border-white shadow-sm"></span>
                <span className="text-sm font-medium text-gray-700">New Bugs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-gray-400 border border-white shadow-sm"></span>
                <span className="text-sm font-medium text-gray-700">Fixed</span>
              </div>
            </div>
          </div>
          <div className="relative w-full h-[250px] md:h-[300px] flex flex-col">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
              <div className="w-full h-px bg-gray-100"></div>
              <div className="w-full h-px bg-gray-100"></div>
              <div className="w-full h-px bg-gray-100"></div>
              <div className="w-full h-px bg-gray-100"></div>
              <div className="w-full h-px bg-gray-100"></div>
            </div>
            {/* Chart SVG */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 300">
              <defs>
                <linearGradient id="gradientPrimary" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#E31E24" stopOpacity="0.1"></stop>
                  <stop offset="100%" stopColor="#E31E24" stopOpacity="0"></stop>
                </linearGradient>
              </defs>
              {/* Gradient Fill - 6 sprints */}
              <path
                d="M0,200 L166,180 L333,150 L500,120 L666,100 L833,90 L1000,80 L1000,300 L0,300 Z"
                fill="url(#gradientPrimary)"
              ></path>
              {/* New Bugs Line - 6 sprints */}
              <path
                d="M0,200 L166,180 L333,150 L500,120 L666,100 L833,90 L1000,80"
                fill="none"
                stroke="#E31E24"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              ></path>
              {/* Fixed Line - 6 sprints */}
              <path
                d="M0,240 L166,220 L333,200 L500,180 L666,160 L833,150 L1000,140"
                fill="none"
                stroke="#94a3b8"
                strokeDasharray="6 6"
                strokeWidth="3"
                vectorEffect="non-scaling-stroke"
              ></path>
            </svg>
          </div>
          {/* X-axis Labels - 6 sprints */}
          <div className="flex justify-between mt-4 px-2 text-xs font-semibold text-gray-500 uppercase tracking-widest">
            <span>Sprint 1</span>
            <span>Sprint 2</span>
            <span>Sprint 3</span>
            <span>Sprint 4</span>
            <span>Sprint 5</span>
            <span>Sprint 6</span>
          </div>
        </div>

        {/* Backlog Bugs */}
        <div className="w-full rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
          <div className="flex flex-col gap-1 mb-6">
            <h3 className="text-gray-900 text-lg font-bold">Backlog Bugs</h3>
            <p className="text-sm text-gray-500">Bugs waiting in backlog over time (This Quarter - 6 Sprints).</p>
          </div>
          <div className="flex items-end gap-4 h-48 w-full">
            {(() => {
              // Sprint data for 6 sprints with counts
              const sprintData = [
                { height: 40, count: 28 },
                { height: 55, count: 35 },
                { height: 70, count: 42 },
                { height: 85, count: 51 },
                { height: 95, count: 58 },
                { height: 100, count: 62 }
              ];
              
              return sprintData.map((sprint, sprintIndex) => {
                const isRecent = sprintIndex >= sprintData.length - 2;
                const bgColor = isRecent 
                  ? (sprintIndex === sprintData.length - 1 ? 'bg-amber-500' : 'bg-amber-400')
                  : (sprintIndex >= 3 ? 'bg-gray-400' : 'bg-gray-300');
                
                return (
                  <div
                    key={sprintIndex}
                    className="flex-1 group relative h-full flex flex-col items-center"
                  >
                    <div className="flex-1 flex items-end w-full">
                      <div
                        className={`w-full ${bgColor} rounded-t-sm hover:bg-amber-400 transition-colors cursor-pointer relative flex items-center justify-center`}
                        style={{ height: `${sprint.height}%` }}
                      >
                        <span className="text-sm font-bold text-white z-10 drop-shadow-md">{sprint.count}</span>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
          <div className="flex justify-between mt-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">
            <span>Sprint 1</span>
            <span>Sprint 2</span>
            <span>Sprint 3</span>
            <span>Sprint 4</span>
            <span>Sprint 5</span>
            <span>Sprint 6</span>
          </div>
        </div>
          </div>
        </div>
      </div>
      </main>

      {/* Quality Bugs Modal */}
      <QualityBugsModal
        isOpen={isQualityModalOpen}
        onClose={handleCloseQualityModal}
        qualityType={selectedQuality}
        bugs={selectedQuality ? getFilteredBugsByQuality(selectedQuality) : []}
        onBugClick={handleBugClick}
      />

      {/* Bug Details Modal */}
      <BugDetailsModal
        bug={selectedBug}
        isOpen={isBugDetailsModalOpen}
        onClose={handleCloseBugDetailsModal}
        size="small"
      />
    </div>
  );
}

export default BugStatistics;
