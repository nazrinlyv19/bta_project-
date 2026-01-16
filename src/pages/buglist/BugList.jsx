import { useState, useMemo, useEffect } from 'react';
import BugTable from '../../components/ui/BugTable';
import BugFilters from '../../components/ui/BugFilters';
import PaginationControls from '../../components/ui/PaginationControls';
import BugDetailsModal from '../../components/ui/BugDetailsModal';

// Mock data with proper structure
const MOCK_BUGS = [
  { id: 'BUG-2401', title: 'Payment gateway timeout on credit card validation', tribe: 'Payments & Cards', squad: 'Squad Alpha', status: 'IN_PROGRESS', priority: 'high', qualityScore: 42, reporter: 'Sarkhan M.', assignee: 'Gunay H.', createdAt: '2023-11-20', updatedAt: '2023-11-22' },
  { id: 'BUG-2402', title: 'Login screen flicker on biometric authentication', tribe: 'Digital Banking', squad: 'Squad Beta', status: 'RESOLVED', priority: 'medium', qualityScore: 95, reporter: 'Ali V.', assignee: 'Leyla K.', createdAt: '2023-11-18', updatedAt: '2023-11-20' },
  { id: 'BUG-2403', title: 'Missing localization strings in Loans module', tribe: 'Retail Lending', squad: 'Squad Gamma', status: 'NEW', priority: 'low', qualityScore: 72, reporter: 'Ruslan G.', assignee: 'Sabina M.', createdAt: '2023-11-15', updatedAt: '2023-11-15' },
  { id: 'BUG-2398', title: 'Transaction history not sorting by amount correctly in dashboard view', tribe: 'Core Banking', squad: 'Squad Alpha', status: 'CLOSED', priority: 'medium', qualityScore: 88, reporter: 'Fuad E.', assignee: 'Elvin B.', createdAt: '2023-11-10', updatedAt: '2023-11-12' },
  { id: 'BUG-2490', title: 'Login fails when 2FA is enabled for enterprise accounts', tribe: 'Payments & Cards', squad: 'Payments', status: 'IN_PROGRESS', priority: 'blocker', qualityScore: 85, reporter: 'Sarah J.', assignee: 'Mike R.', createdAt: '2023-10-24', updatedAt: '2023-10-25' },
  { id: 'BUG-2488', title: 'Dashboard charts not loading on mobile view', tribe: 'Digital Banking', squad: 'Reporting', status: 'NEW', priority: 'low', qualityScore: 55, reporter: 'David L.', assignee: 'Unassigned', createdAt: '2023-10-23', updatedAt: '2023-10-23' },
  { id: 'BUG-2482', title: 'Transaction history CSV export returns 500 error', tribe: 'Core Banking', squad: 'Core', status: 'IN_REVIEW', priority: 'high', qualityScore: 30, reporter: 'Priya M.', assignee: 'John D.', createdAt: '2023-10-21', updatedAt: '2023-10-22' },
  { id: 'BUG-2475', title: 'Typo in the settings modal description', tribe: 'Digital Banking', squad: 'Auth', status: 'CLOSED', priority: 'low', qualityScore: 92, reporter: 'Alex M.', assignee: 'Alex M.', createdAt: '2023-10-19', updatedAt: '2023-10-20' },
  { id: 'BUG-2460', title: 'Incorrect currency symbol for JPY transactions', tribe: 'Payments & Cards', squad: 'Payments', status: 'IN_PROGRESS', priority: 'medium', qualityScore: 76, reporter: 'Tom H.', assignee: 'Mike R.', createdAt: '2023-10-15', updatedAt: '2023-10-18' },
  { id: 'BUG-2458', title: 'API Latency spike during peak hours', tribe: 'Core Banking', squad: 'Core', status: 'NEW', priority: 'high', qualityScore: 45, reporter: 'James W.', assignee: 'Unassigned', createdAt: '2023-10-14', updatedAt: '2023-10-14' },
  { id: 'BUG-2455', title: 'User profile image upload fails on Safari', tribe: 'Digital Banking', squad: 'Auth', status: 'CLOSED', priority: 'medium', qualityScore: 88, reporter: 'Linda K.', assignee: 'Linda K.', createdAt: '2023-10-12', updatedAt: '2023-10-13' },
  { id: 'BUG-2451', title: 'Search filter broken for archived items', tribe: 'Retail Lending', squad: 'Reporting', status: 'IN_REVIEW', priority: 'medium', qualityScore: 62, reporter: 'Raj P.', assignee: 'Mike R.', createdAt: '2023-10-10', updatedAt: '2023-10-11' },
  { id: 'BUG-2448', title: 'Mobile view overlap in footer', tribe: 'Digital Banking', squad: 'Mobile', status: 'IN_PROGRESS', priority: 'low', qualityScore: 40, reporter: 'Sophie L.', assignee: 'Unassigned', createdAt: '2023-10-09', updatedAt: '2023-10-10' },
  { id: 'BUG-2442', title: '404 on Help page link', tribe: 'Core Banking', squad: 'Core', status: 'RESOLVED', priority: 'low', qualityScore: 95, reporter: 'Mark T.', assignee: 'John D.', createdAt: '2023-10-08', updatedAt: '2023-10-09' },
  { id: 'BUG-2439', title: 'Session timeout message missing', tribe: 'Digital Banking', squad: 'Auth', status: 'NEW', priority: 'high', qualityScore: 25, reporter: 'Emma S.', assignee: 'Unassigned', createdAt: '2023-10-06', updatedAt: '2023-10-06' },
  { id: 'BUG-2435', title: 'CSV Export formatting issues', tribe: 'Retail Lending', squad: 'Reporting', status: 'IN_PROGRESS', priority: 'medium', qualityScore: 70, reporter: 'Chris B.', assignee: 'Mike R.', createdAt: '2023-10-05', updatedAt: '2023-10-07' },
  { id: 'BUG-2430', title: 'Payment gateway timeout', tribe: 'Payments & Cards', squad: 'Payments', status: 'CLOSED', priority: 'high', qualityScore: 35, reporter: 'Anna K.', assignee: 'Mike R.', createdAt: '2023-09-28', updatedAt: '2023-10-01' },
  { id: 'BUG-2425', title: 'Email notifications not sending', tribe: 'Core Banking', squad: 'Core', status: 'BLOCKED', priority: 'blocker', qualityScore: 48, reporter: 'Peter S.', assignee: 'John D.', createdAt: '2023-09-25', updatedAt: '2023-09-27' },
  { id: 'BUG-2420', title: 'Dashboard loading slowly', tribe: 'Digital Banking', squad: 'Reporting', status: 'NEW', priority: 'medium', qualityScore: 80, reporter: 'Lisa M.', assignee: 'Unassigned', createdAt: '2023-09-20', updatedAt: '2023-09-22' },
  { id: 'BUG-2415', title: 'Login button misaligned', tribe: 'Digital Banking', squad: 'Auth', status: 'NEW', priority: 'low', qualityScore: 90, reporter: 'Tom H.', assignee: 'Tom H.', createdAt: '2023-09-15', updatedAt: '2023-09-16' },
  { id: 'BUG-2410', title: 'Data export crashes on large datasets', tribe: 'Core Banking', squad: 'Core', status: 'CLOSED', priority: 'blocker', qualityScore: 22, reporter: 'Sarah J.', assignee: 'Unassigned', createdAt: '2023-09-10', updatedAt: '2023-09-12' },
  { id: 'BUG-2405', title: 'Footer links broken', tribe: 'Digital Banking', squad: 'Mobile', status: 'RESOLVED', priority: 'low', qualityScore: 85, reporter: 'David L.', assignee: 'Sarah J.', createdAt: '2023-09-05', updatedAt: '2023-09-07' },
  // Bugs waiting for QA
  { id: 'BUG-2501', title: 'User authentication flow validation errors', tribe: 'Digital Banking', squad: 'Auth', status: 'TESTING', priority: 'high', qualityScore: 78, reporter: 'John D.', assignee: 'Mike R.', createdAt: '2023-11-22', updatedAt: '2023-11-23' },
  { id: 'BUG-2502', title: 'Payment processing timeout handling', tribe: 'Payments & Cards', squad: 'Payments', status: 'TESTING', priority: 'blocker', qualityScore: 82, reporter: 'Sarah J.', assignee: 'Leyla K.', createdAt: '2023-11-21', updatedAt: '2023-11-22' },
  { id: 'BUG-2503', title: 'Dashboard widget refresh mechanism', tribe: 'Core Banking', squad: 'Reporting', status: 'READY_FOR_TESTING', priority: 'medium', qualityScore: 65, reporter: 'Mark T.', assignee: 'Gunay H.', createdAt: '2023-11-20', updatedAt: '2023-11-21' },
  { id: 'BUG-2504', title: 'Mobile responsive layout issues', tribe: 'Digital Banking', squad: 'Mobile', status: 'READY_FOR_TESTING', priority: 'high', qualityScore: 70, reporter: 'Emma S.', assignee: 'Sabina M.', createdAt: '2023-11-19', updatedAt: '2023-11-20' },
  { id: 'BUG-2505', title: 'Loan calculation formula verification', tribe: 'Retail Lending', squad: 'Squad Gamma', status: 'PASSED_TO_QA', priority: 'high', qualityScore: 88, reporter: 'Ruslan G.', assignee: 'Elvin B.', createdAt: '2023-11-18', updatedAt: '2023-11-19' },
  { id: 'BUG-2506', title: 'Transaction history export functionality', tribe: 'Core Banking', squad: 'Core', status: 'PASSED_TO_QA', priority: 'medium', qualityScore: 75, reporter: 'Priya M.', assignee: 'John D.', createdAt: '2023-11-17', updatedAt: '2023-11-18' },
  { id: 'BUG-2507', title: 'Credit card validation edge cases', tribe: 'Payments & Cards', squad: 'Squad Alpha', status: 'TESTING', priority: 'high', qualityScore: 80, reporter: 'Tom H.', assignee: 'Mike R.', createdAt: '2023-11-16', updatedAt: '2023-11-17' },
  { id: 'BUG-2508', title: 'User profile update API endpoints', tribe: 'Digital Banking', squad: 'Auth', status: 'READY_FOR_TESTING', priority: 'low', qualityScore: 68, reporter: 'Linda K.', assignee: 'Gunay H.', createdAt: '2023-11-15', updatedAt: '2023-11-16' },
  { id: 'BUG-2509', title: 'Search functionality performance optimization', tribe: 'Retail Lending', squad: 'Reporting', status: 'PASSED_TO_QA', priority: 'medium', qualityScore: 72, reporter: 'Raj P.', assignee: 'Leyla K.', createdAt: '2023-11-14', updatedAt: '2023-11-15' },
  { id: 'BUG-2510', title: 'Notification system integration testing', tribe: 'Core Banking', squad: 'Core', status: 'TESTING', priority: 'high', qualityScore: 85, reporter: 'Chris B.', assignee: 'Sabina M.', createdAt: '2023-11-13', updatedAt: '2023-11-14' },
];

function BugList({ searchQuery = '', selectedTribe = 'All Tribes', sidebarOpen = true }) {
  const contentPadding = 'px-6 sm:px-8 lg:px-10';
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
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
  
  // Filter states
  const [createdDateFilter, setCreatedDateFilter] = useState('');
  const [customDateFrom, setCustomDateFrom] = useState('');
  const [customDateTo, setCustomDateTo] = useState('');
  const [lastUpdatedFilter, setLastUpdatedFilter] = useState('');
  const [selectedSquads, setSelectedSquads] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);
  const [selectedReporter, setSelectedReporter] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [selectedQualityScore, setSelectedQualityScore] = useState('');
  const [sortOrder, setSortOrder] = useState('newest-first'); // 'newest-first' or 'oldest-first'

  // Get all unique values for filters
  const allSquads = useMemo(() => [...new Set(MOCK_BUGS.map(bug => bug.squad))].sort(), []);
  const allReporters = useMemo(() => [...new Set(MOCK_BUGS.map(bug => bug.reporter))].sort(), []);
  const allAssignees = useMemo(() => [...new Set(MOCK_BUGS.filter(bug => bug.assignee !== 'Unassigned').map(bug => bug.assignee))].sort(), []);
  const allStatuses = useMemo(() => [...new Set(MOCK_BUGS.map(bug => bug.status))].sort(), []);

  // Filter bugs
  const filteredBugs = useMemo(() => {
    let result = [...MOCK_BUGS];

    // Tribe filter - filter by selected tribe
    if (selectedTribe && selectedTribe !== 'All Tribes') {
      result = result.filter(bug => {
        // Map tribe names to match bug data
        const tribeMapping = {
          'Payments': 'Payments & Cards',
          'Digital Banking': 'Digital Banking',
          'Core Banking': 'Core Banking',
          'Retail Lending': 'Retail Lending',
        };
        const mappedTribe = tribeMapping[selectedTribe] || selectedTribe;
        return bug.tribe === mappedTribe;
      });
    }
    // If "All Tribes" is selected, show all bugs (no filtering)

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(bug => 
        bug.id.toLowerCase().includes(query) ||
        bug.title.toLowerCase().includes(query) ||
        bug.squad.toLowerCase().includes(query) ||
        bug.reporter.toLowerCase().includes(query) ||
        bug.assignee.toLowerCase().includes(query)
      );
    }

    // Created Date Filter
    if (createdDateFilter) {
      const today = new Date('2023-11-24');
      const now = today.getTime();
      
      if (createdDateFilter === 'custom') {
        if (customDateFrom && customDateTo) {
          const fromDate = new Date(customDateFrom).getTime();
          const toDate = new Date(customDateTo).getTime();
          result = result.filter(bug => {
            const createdDate = new Date(bug.createdAt).getTime();
            return createdDate >= fromDate && createdDate <= toDate;
          });
        }
      } else {
        result = result.filter(bug => {
          const createdDate = new Date(bug.createdAt).getTime();
          const daysDiff = Math.floor((now - createdDate) / (1000 * 60 * 60 * 24));
          
          switch (createdDateFilter) {
            case 'older_than_14':
              return daysDiff > 14;
            case 'older_than_21':
              return daysDiff > 21;
            case 'older_than_30':
              return daysDiff > 30;
            default:
              return true;
          }
        });
      }
    }

    // Last Updated Filter
    if (lastUpdatedFilter) {
      const today = new Date('2023-11-24');
      const now = today.getTime();
      
      result = result.filter(bug => {
        const updatedDate = new Date(bug.updatedAt).getTime();
        const daysDiff = Math.floor((now - updatedDate) / (1000 * 60 * 60 * 24));
        
        switch (lastUpdatedFilter) {
          case 'last_3_days':
            return daysDiff <= 3;
          case 'last_7_days':
            return daysDiff <= 7;
          case 'last_14_days':
            return daysDiff <= 14;
          case 'last_30_days':
            return daysDiff <= 30;
          case 'more_than_30_days':
            return daysDiff > 30;
          default:
            return true;
        }
      });
    }

    // Squad Filter
    if (selectedSquads.length > 0) {
      result = result.filter(bug => selectedSquads.includes(bug.squad));
    }

    // Status Filter (multiple selection)
    if (selectedStatuses.length > 0) {
      result = result.filter(bug => selectedStatuses.includes(bug.status));
    }

    // Priority Filter (multiple selection)
    if (selectedPriorities.length > 0) {
      result = result.filter(bug => selectedPriorities.includes(bug.priority));
    }

    // Reporter Filter
    if (selectedReporter) {
      result = result.filter(bug => bug.reporter === selectedReporter);
    }

    // Assignee Filter
    if (selectedAssignee) {
      result = result.filter(bug => bug.assignee === selectedAssignee);
    }

    // Quality Score Filter
    if (selectedQualityScore) {
      result = result.filter(bug => {
        switch (selectedQualityScore) {
          case 'high':
            return bug.qualityScore >= 81;
          case 'medium':
            return bug.qualityScore >= 51 && bug.qualityScore <= 80;
          case 'low':
            return bug.qualityScore >= 41 && bug.qualityScore <= 50;
          case 'lowest':
            return bug.qualityScore >= 0 && bug.qualityScore <= 40;
          default:
            return true;
        }
      });
    }

    return result;
  }, [selectedTribe, searchQuery, createdDateFilter, customDateFrom, customDateTo, lastUpdatedFilter, selectedSquads, selectedStatuses, selectedPriorities, selectedReporter, selectedAssignee, selectedQualityScore]);

  // Sort bugs by date
  const sortedBugs = useMemo(() => {
    const sorted = [...filteredBugs];
    sorted.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      if (sortOrder === 'newest-first') {
        return dateB - dateA; // Newest first
      } else {
        return dateA - dateB; // Oldest first
      }
    });
    return sorted;
  }, [filteredBugs, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedBugs.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedBugs = sortedBugs.slice(startIndex, endIndex);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortedBugs.length, rowsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleRowsPerPageChange = (rows) => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };

  // Calculate summary stats
  const criticalBugs = sortedBugs.filter(bug => bug.qualityScore < 30).length;
  const pendingReview = sortedBugs.filter(bug => 
    bug.status === 'TESTING' || 
    bug.status === 'PASSED_TO_QA' || 
    bug.status === 'READY_FOR_TESTING'
  ).length;
  const avgQualityScore = Math.round(sortedBugs.reduce((sum, bug) => sum + bug.qualityScore, 0) / sortedBugs.length) || 0;
  const avgResolution = '2.4d'; // Mock value

  // Check if Critical Bugs filter is active
  const isCriticalBugsSelected = selectedPriorities.length === 2 && 
    selectedPriorities.includes('high') && 
    selectedPriorities.includes('blocker');

  // Handle Critical Bugs card click - toggle filter by high and blocker priority
  const handleCriticalBugsClick = () => {
    if (isCriticalBugsSelected) {
      // If already selected, remove the filter
      setSelectedPriorities([]);
    } else {
      // If not selected, apply the filter
      setSelectedPriorities(['high', 'blocker']);
    }
    setCurrentPage(1);
  };

  // Check if Pending Review filter is active
  const isPendingReviewSelected = selectedStatuses.length === 3 &&
    selectedStatuses.includes('TESTING') &&
    selectedStatuses.includes('PASSED_TO_QA') &&
    selectedStatuses.includes('READY_FOR_TESTING');

  // Handle Pending Review card click - filter by TESTING, PASSED_TO_QA, READY_FOR_TESTING
  const handlePendingReviewClick = () => {
    if (isPendingReviewSelected) {
      // If already selected, remove the filter
      setSelectedStatuses(prev => prev.filter(s => 
        s !== 'TESTING' && s !== 'PASSED_TO_QA' && s !== 'READY_FOR_TESTING'
      ));
    } else {
      // If not selected, apply the filter
      setSelectedStatuses(['TESTING', 'PASSED_TO_QA', 'READY_FOR_TESTING']);
    }
    setCurrentPage(1);
  };

  return (
    <>
      <div className="p-6 md:p-8">
        <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
          {/* Title Section */}
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Bug List</h2>
            <p className="text-sm text-gray-500">Tribe-level bug monitoring and quality control</p>
          </div>

          {/* Content Area */}
          <div className="flex flex-col gap-8">
        {/* Summary Cards - Moved to top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div 
            className={`bg-white p-4 rounded-xl border-2 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-all ${
              isCriticalBugsSelected 
                ? 'border-[#E31E24] bg-red-50/30 shadow-md' 
                : 'border-gray-200'
            }`}
            onClick={handleCriticalBugsClick}
          >
            <div className="size-10 rounded-lg bg-red-50 flex items-center justify-center text-[#E31E24]">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Critical Bugs</p>
              <p className="text-xl font-black text-gray-900">{criticalBugs}</p>
            </div>
          </div>
          <div 
            className={`bg-white p-4 rounded-xl border-2 cursor-pointer hover:bg-gray-50 transition-all ${
              isPendingReviewSelected 
                ? 'border-purple-500 bg-purple-50/30 shadow-md' 
                : 'border-gray-200'
            }`}
            onClick={handlePendingReviewClick}
          >
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-lg bg-purple-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  {/* Two checkmarks stacked vertically */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 8l2 2 4-4" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                  {/* Two horizontal lines to the right */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 9h2" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 13h2" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">WAITING IN QA</p>
                <p className="text-xl font-black text-gray-900">{pendingReview}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="size-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Avg Quality Score</p>
              <p className="text-xl font-black text-gray-900">{avgQualityScore}%</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-4">
            <div className="size-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">Avg Resolution</p>
              <p className="text-xl font-black text-gray-900">{avgResolution}</p>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <BugFilters
          createdDateFilter={createdDateFilter}
          setCreatedDateFilter={setCreatedDateFilter}
          customDateFrom={customDateFrom}
          setCustomDateFrom={setCustomDateFrom}
          customDateTo={customDateTo}
          setCustomDateTo={setCustomDateTo}
          lastUpdatedFilter={lastUpdatedFilter}
          setLastUpdatedFilter={setLastUpdatedFilter}
          selectedSquads={selectedSquads}
          setSelectedSquads={setSelectedSquads}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
          selectedPriorities={selectedPriorities}
          setSelectedPriorities={setSelectedPriorities}
          selectedReporter={selectedReporter}
          setSelectedReporter={setSelectedReporter}
          selectedAssignee={selectedAssignee}
          setSelectedAssignee={setSelectedAssignee}
          selectedQualityScore={selectedQualityScore}
          setSelectedQualityScore={setSelectedQualityScore}
          allSquads={allSquads}
          allReporters={allReporters}
          allAssignees={allAssignees}
          allStatuses={allStatuses}
        />

        {/* Bug Table */}
        <BugTable
          bugs={paginatedBugs}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
          sortOrder={sortOrder}
          onSortOrderChange={(value) => {
            setSortOrder(value);
            setCurrentPage(1);
          }}
          sidebarOpen={sidebarOpen}
          onBugClick={handleBugClick}
          sortOrder={sortOrder}
          onSortOrderChange={(value) => {
            setSortOrder(value);
            setCurrentPage(1);
          }}
        />

        {/* Pagination */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={sortedBugs.length}
          onPageChange={handlePageChange}
        />
          </div>
        </div>
      </div>

      {/* Bug Details Modal */}
      <BugDetailsModal 
        bug={selectedBug}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default BugList;
