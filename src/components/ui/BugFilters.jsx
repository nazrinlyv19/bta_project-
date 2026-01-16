import { useState, useEffect, useRef, useMemo } from 'react';
import { FunnelIcon, XMarkIcon, MagnifyingGlassIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

function BugFilters({ 
  createdDateFilter, 
  setCreatedDateFilter, 
  customDateFrom, 
  setCustomDateFrom, 
  customDateTo, 
  setCustomDateTo,
  lastUpdatedFilter,
  setLastUpdatedFilter,
  selectedSquads,
  setSelectedSquads,
  selectedStatuses,
  setSelectedStatuses,
  selectedPriorities,
  setSelectedPriorities,
  selectedReporter,
  setSelectedReporter,
  selectedAssignee,
  setSelectedAssignee,
  selectedQualityScore,
  setSelectedQualityScore,
  allSquads,
  allReporters,
  allAssignees,
  allStatuses,
}) {
  const [showSquadDropdown, setShowSquadDropdown] = useState(false);
  const [showCreatedDateDropdown, setShowCreatedDateDropdown] = useState(false);
  const [showReporterDropdown, setShowReporterDropdown] = useState(false);
  const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
  const [reporterSearch, setReporterSearch] = useState('');
  const [assigneeSearch, setAssigneeSearch] = useState('');
  const [filtersExpanded, setFiltersExpanded] = useState(false);
  const squadDropdownRef = useRef(null);
  const createdDateDropdownRef = useRef(null);
  const reporterDropdownRef = useRef(null);
  const assigneeDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);
  const priorityDropdownRef = useRef(null);

  const toggleSquad = (squad) => {
    setSelectedSquads(prev => 
      prev.includes(squad) 
        ? prev.filter(s => s !== squad)
        : [...prev, squad]
    );
  };

  const toggleStatus = (status) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const togglePriority = (priority) => {
    setSelectedPriorities(prev => 
      prev.includes(priority) 
        ? prev.filter(p => p !== priority)
        : [...prev, priority]
    );
  };

  const getCreatedDateDisplay = () => {
    if (!createdDateFilter) return 'All Dates';
    if (createdDateFilter === 'custom') {
      if (customDateFrom && customDateTo) {
        return `${new Date(customDateFrom).toLocaleDateString()} - ${new Date(customDateTo).toLocaleDateString()}`;
      }
      return 'Custom Range';
    }
    const labels = {
      'older_than_14': 'Older than 14 days',
      'older_than_21': 'Older than 21 days',
      'older_than_30': 'Older than 30 days',
    };
    return labels[createdDateFilter] || 'All Dates';
  };

  const handleCreatedDateSelect = (value) => {
    if (value === 'custom') {
      setCreatedDateFilter('custom');
    } else {
      setCreatedDateFilter(value);
      setShowCreatedDateDropdown(false);
    }
  };

  // Filter reporters and assignees based on search
  const filteredReporters = useMemo(() => {
    if (!reporterSearch) return allReporters;
    return allReporters.filter(reporter => 
      reporter.toLowerCase().includes(reporterSearch.toLowerCase())
    );
  }, [allReporters, reporterSearch]);

  const filteredAssignees = useMemo(() => {
    if (!assigneeSearch) return allAssignees;
    return allAssignees.filter(assignee => 
      assignee.toLowerCase().includes(assigneeSearch.toLowerCase())
    );
  }, [allAssignees, assigneeSearch]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (squadDropdownRef.current && !squadDropdownRef.current.contains(event.target)) {
        setShowSquadDropdown(false);
      }
      if (createdDateDropdownRef.current && !createdDateDropdownRef.current.contains(event.target)) {
        setShowCreatedDateDropdown(false);
      }
      if (reporterDropdownRef.current && !reporterDropdownRef.current.contains(event.target)) {
        setShowReporterDropdown(false);
        setReporterSearch('');
      }
      if (assigneeDropdownRef.current && !assigneeDropdownRef.current.contains(event.target)) {
        setShowAssigneeDropdown(false);
        setAssigneeSearch('');
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setShowStatusDropdown(false);
      }
      if (priorityDropdownRef.current && !priorityDropdownRef.current.contains(event.target)) {
        setShowPriorityDropdown(false);
      }
    };

    if (showSquadDropdown || showCreatedDateDropdown || showReporterDropdown || showAssigneeDropdown || showStatusDropdown || showPriorityDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSquadDropdown, showCreatedDateDropdown, showReporterDropdown, showAssigneeDropdown, showStatusDropdown, showPriorityDropdown]);

  // Get active filters count
  const activeFilters = [];
  if (createdDateFilter) activeFilters.push({ type: 'createdDate', label: getCreatedDateDisplay() });
  if (lastUpdatedFilter) {
    const labels = {
      'last_3_days': 'Last 3 days',
      'last_7_days': 'Last 7 days',
      'last_14_days': 'Last 14 days',
      'last_30_days': 'Last 30 days',
      'more_than_30_days': 'More than 30 days ago',
    };
    activeFilters.push({ type: 'lastUpdated', label: labels[lastUpdatedFilter] || lastUpdatedFilter });
  }
  if (selectedSquads.length > 0) activeFilters.push({ type: 'squads', label: `Squad: ${selectedSquads.join(', ')}` });
  if (selectedStatuses.length > 0) {
    const statusLabels = {
      'BACKLOG': 'Backlog',
      'ANALYSIS': 'Analysis',
      'TO_DO': 'To Do',
      'DEVELOPMENT': 'Development',
      'BLOCKED': 'Blocked',
      'IN_REVIEW': 'In Review',
      'PASSED_TO_QA': 'Passed to QA',
      'TESTING': 'Testing',
      'READY_FOR_TESTING': 'Ready for Testing',
      'REJECTED': 'Rejected',
    };
    activeFilters.push({ type: 'statuses', label: `Status: ${selectedStatuses.map(s => statusLabels[s] || s).join(', ')}` });
  }
  if (selectedPriorities.length > 0) {
    const priorityLabels = {
      'low': 'Low',
      'medium': 'Medium',
      'high': 'High',
      'blocker': 'Blocker',
    };
    activeFilters.push({ type: 'priorities', label: `Priority: ${selectedPriorities.map(p => priorityLabels[p] || p).join(', ')}` });
  }
  if (selectedReporter) activeFilters.push({ type: 'reporter', label: `Reporter: ${selectedReporter}` });
  if (selectedAssignee) activeFilters.push({ type: 'assignee', label: `Assignee: ${selectedAssignee}` });
  if (selectedQualityScore) {
    const labels = {
      'high': 'High (81-100%)',
      'medium': 'Medium (51-80%)',
      'low': 'Low (41-50%)',
      'lowest': 'Lowest (0-40%)',
    };
    activeFilters.push({ type: 'qualityScore', label: `Quality: ${labels[selectedQualityScore] || selectedQualityScore}` });
  }

  const handleRemoveFilter = (filterType) => {
    switch (filterType) {
      case 'createdDate':
        setCreatedDateFilter('');
        setCustomDateFrom('');
        setCustomDateTo('');
        break;
      case 'lastUpdated':
        setLastUpdatedFilter('');
        break;
      case 'squads':
        setSelectedSquads([]);
        break;
      case 'statuses':
        setSelectedStatuses([]);
        break;
      case 'priorities':
        setSelectedPriorities([]);
        break;
      case 'reporter':
        setSelectedReporter('');
        break;
      case 'assignee':
        setSelectedAssignee('');
        break;
      case 'qualityScore':
        setSelectedQualityScore('');
        break;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div 
        className="flex items-center justify-between p-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setFiltersExpanded(!filtersExpanded)}
      >
        <div className="flex items-center gap-2">
          <FunnelIcon className="w-5 h-5 text-[#E31E24]" />
          <h3 className="text-gray-900 text-sm font-bold uppercase tracking-wider">Advanced Filters</h3>
        </div>
        <div className="flex items-center gap-4" onClick={(e) => e.stopPropagation()}>
          {activeFilters.length > 0 && (
            <button
              onClick={() => {
                setCreatedDateFilter('');
                setCustomDateFrom('');
                setCustomDateTo('');
                setLastUpdatedFilter('');
                setSelectedSquads([]);
                setSelectedStatuses([]);
                setSelectedPriorities([]);
                setSelectedReporter('');
                setSelectedAssignee('');
                setSelectedQualityScore('');
              }}
              className="text-xs text-[#E31E24] font-medium hover:underline"
            >
              Clear All
            </button>
          )}
          <div className="p-1 hover:bg-gray-100 rounded transition-colors">
            {filtersExpanded ? (
              <ChevronUpIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDownIcon className="w-5 h-5 text-gray-600" />
            )}
          </div>
        </div>
      </div>
      
      {filtersExpanded && (
        <>
          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="px-6 pt-4 pb-4 border-b border-gray-200">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider mr-2">Active Filters:</span>
                {activeFilters.map((filter, index) => (
                  <div
                    key={index}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E31E24]/10 text-[#E31E24] border border-[#E31E24]/20 text-xs font-medium"
                  >
                    <span>{filter.label}</span>
                    <button
                      onClick={() => handleRemoveFilter(filter.type)}
                      className="hover:bg-[#E31E24]/20 rounded-full p-0.5 transition-colors"
                      title="Remove filter"
                    >
                      <XMarkIcon className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Created Date Filter - Dropdown Style */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase px-1 tracking-wider">Created Date</label>
          <div className="relative" ref={createdDateDropdownRef}>
            <div
              onClick={() => setShowCreatedDateDropdown(!showCreatedDateDropdown)}
              className="flex items-center justify-between w-full h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors focus-within:border-[#E31E24] focus-within:ring-1 focus-within:ring-[#E31E24]"
            >
              <span className="truncate">{getCreatedDateDisplay()}</span>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {showCreatedDateDropdown && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-lg z-20 p-2 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => handleCreatedDateSelect('older_than_14')}
                    className={`flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded text-xs text-left transition-colors ${
                      createdDateFilter === 'older_than_14' ? 'bg-[#E31E24]/10 text-[#E31E24] font-medium' : 'text-gray-700'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      {createdDateFilter === 'older_than_14' && (
                        <span className="w-2 h-2 rounded-full bg-[#E31E24]"></span>
                      )}
                    </span>
                    Older than 14 days
                  </button>
                  <button
                    onClick={() => handleCreatedDateSelect('older_than_21')}
                    className={`flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded text-xs text-left transition-colors ${
                      createdDateFilter === 'older_than_21' ? 'bg-[#E31E24]/10 text-[#E31E24] font-medium' : 'text-gray-700'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      {createdDateFilter === 'older_than_21' && (
                        <span className="w-2 h-2 rounded-full bg-[#E31E24]"></span>
                      )}
                    </span>
                    Older than 21 days
                  </button>
                  <button
                    onClick={() => handleCreatedDateSelect('older_than_30')}
                    className={`flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded text-xs text-left transition-colors ${
                      createdDateFilter === 'older_than_30' ? 'bg-[#E31E24]/10 text-[#E31E24] font-medium' : 'text-gray-700'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      {createdDateFilter === 'older_than_30' && (
                        <span className="w-2 h-2 rounded-full bg-[#E31E24]"></span>
                      )}
                    </span>
                    Older than 30 days
                  </button>
                  <button
                    onClick={() => handleCreatedDateSelect('custom')}
                    className={`flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded text-xs text-left transition-colors ${
                      createdDateFilter === 'custom' ? 'bg-[#E31E24]/10 text-[#E31E24] font-medium' : 'text-gray-700'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      {createdDateFilter === 'custom' && (
                        <span className="w-2 h-2 rounded-full bg-[#E31E24]"></span>
                      )}
                    </span>
                    Custom
                  </button>
                </div>
                {createdDateFilter === 'custom' && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <input
                        type="date"
                        value={customDateFrom}
                        onChange={(e) => setCustomDateFrom(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="form-input flex-1 h-8 text-[11px] rounded border-gray-200 bg-gray-50 focus:border-[#E31E24] focus:ring-1 focus:ring-[#E31E24]"
                        placeholder="From"
                      />
                      <span className="text-gray-400 text-xs">to</span>
                      <input
                        type="date"
                        value={customDateTo}
                        onChange={(e) => setCustomDateTo(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="form-input flex-1 h-8 text-[11px] rounded border-gray-200 bg-gray-50 focus:border-[#E31E24] focus:ring-1 focus:ring-[#E31E24]"
                        placeholder="To"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Last Updated Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase px-1 tracking-wider">Last Updated</label>
          <select
            value={lastUpdatedFilter}
            onChange={(e) => setLastUpdatedFilter(e.target.value)}
            className="form-select block w-full h-10 rounded-lg border border-gray-200 bg-gray-50 pr-8 text-sm text-gray-600 focus:border-[#E31E24] focus:ring-0"
          >
            <option value="">All</option>
            <option value="last_3_days">Last 3 days</option>
            <option value="last_7_days">Last 7 days</option>
            <option value="last_14_days">Last 14 days</option>
            <option value="last_30_days">Last 30 days</option>
            <option value="more_than_30_days">More than 30 days ago</option>
          </select>
        </div>

        {/* Squad Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase px-1 tracking-wider">Squad</label>
          <div className="relative" ref={squadDropdownRef}>
            <div
              onClick={() => setShowSquadDropdown(!showSquadDropdown)}
              className="flex items-center justify-between w-full h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <span className="truncate">
                {selectedSquads.length === 0 ? 'Select Squads...' : selectedSquads.join(', ')}
              </span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {showSquadDropdown && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-lg z-20 p-2">
                <div className="flex flex-col gap-1">
                  {allSquads.map(squad => (
                    <label key={squad} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedSquads.includes(squad)}
                        onChange={() => toggleSquad(squad)}
                        className="rounded text-[#E31E24] focus:ring-[#E31E24] h-3 w-3"
                      />
                      <span>{squad}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Status Filter - Multiple Selection */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase px-1 tracking-wider">Status</label>
          <div className="relative" ref={statusDropdownRef}>
            <div
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
              className="flex items-center justify-between w-full h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <span className="truncate">
                {selectedStatuses.length === 0 ? 'Select Statuses...' : selectedStatuses.map(s => {
                  const statusLabels = {
                    'BACKLOG': 'Backlog',
                    'ANALYSIS': 'Analysis',
                    'TO_DO': 'To Do',
                    'DEVELOPMENT': 'Development',
                    'BLOCKED': 'Blocked',
                    'IN_REVIEW': 'In Review',
                    'PASSED_TO_QA': 'Passed to QA',
                    'TESTING': 'Testing',
                    'READY_FOR_TESTING': 'Ready for Testing',
                    'REJECTED': 'Rejected',
                  };
                  return statusLabels[s] || s;
                }).join(', ')}
              </span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {showStatusDropdown && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-lg z-20 p-2 max-h-64 overflow-y-auto">
                <div className="flex flex-col gap-1">
                  {['BACKLOG', 'ANALYSIS', 'TO_DO', 'DEVELOPMENT', 'BLOCKED', 'IN_REVIEW', 'PASSED_TO_QA', 'TESTING', 'READY_FOR_TESTING', 'REJECTED'].map(status => {
                    const statusLabels = {
                      'BACKLOG': 'Backlog',
                      'ANALYSIS': 'Analysis',
                      'TO_DO': 'To Do',
                      'DEVELOPMENT': 'Development',
                      'BLOCKED': 'Blocked',
                      'IN_REVIEW': 'In Review',
                      'PASSED_TO_QA': 'Passed to QA',
                      'TESTING': 'Testing',
                      'READY_FOR_TESTING': 'Ready for Testing',
                      'REJECTED': 'Rejected',
                    };
                    return (
                      <label key={status} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded text-xs cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedStatuses.includes(status)}
                          onChange={() => toggleStatus(status)}
                          className="rounded text-[#E31E24] focus:ring-[#E31E24] h-3 w-3 cursor-pointer"
                        />
                        <span>{statusLabels[status] || status}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Priority Filter - Multiple Selection */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase px-1 tracking-wider">Priority</label>
          <div className="relative" ref={priorityDropdownRef}>
            <div
              onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
              className="flex items-center justify-between w-full h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <span className="truncate">
                {selectedPriorities.length === 0 ? 'Select Priorities...' : selectedPriorities.map(p => {
                  const labels = { 'low': 'Low', 'medium': 'Medium', 'high': 'High', 'blocker': 'Blocker' };
                  return labels[p] || p;
                }).join(', ')}
              </span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {showPriorityDropdown && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-lg z-20 p-2">
                <div className="flex flex-col gap-1">
                  {['low', 'medium', 'high', 'blocker'].map(priority => (
                    <label key={priority} className="flex items-center gap-2 px-2 py-1.5 hover:bg-gray-50 rounded text-xs cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPriorities.includes(priority)}
                        onChange={() => togglePriority(priority)}
                        className="rounded text-[#E31E24] focus:ring-[#E31E24] h-3 w-3"
                      />
                      <span className="capitalize">{priority}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reporter Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase px-1 tracking-wider">Reporter</label>
          <div className="relative" ref={reporterDropdownRef}>
            <div
              onClick={() => setShowReporterDropdown(!showReporterDropdown)}
              className="flex items-center justify-between w-full h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <span className="truncate">
                {selectedReporter || 'All Reporters'}
              </span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {showReporterDropdown && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-lg z-20 overflow-hidden">
                <div className="p-2 border-b border-gray-200">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                      <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={reporterSearch}
                      onChange={(e) => {
                        e.stopPropagation();
                        setReporterSearch(e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      placeholder="Search reporters..."
                      className="w-full h-8 pl-8 pr-2 text-xs border border-gray-200 rounded bg-gray-50 focus:bg-white focus:border-[#E31E24] focus:ring-1 focus:ring-[#E31E24] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedReporter('');
                      setShowReporterDropdown(false);
                      setReporterSearch('');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors ${
                      !selectedReporter ? 'bg-[#E31E24]/10 text-[#E31E24] font-semibold' : 'text-gray-700'
                    }`}
                  >
                    All Reporters
                  </button>
                  {filteredReporters.length === 0 ? (
                    <div className="px-3 py-2 text-xs text-gray-500 text-center">No reporters found</div>
                  ) : (
                    filteredReporters.map(reporter => (
                      <button
                        key={reporter}
                        onClick={() => {
                          setSelectedReporter(reporter);
                          setShowReporterDropdown(false);
                          setReporterSearch('');
                        }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors ${
                          selectedReporter === reporter ? 'bg-[#E31E24]/10 text-[#E31E24] font-semibold' : 'text-gray-700'
                        }`}
                      >
                        {reporter}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Assignee Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase px-1 tracking-wider">Assignee</label>
          <div className="relative" ref={assigneeDropdownRef}>
            <div
              onClick={() => setShowAssigneeDropdown(!showAssigneeDropdown)}
              className="flex items-center justify-between w-full h-10 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <span className="truncate">
                {selectedAssignee || 'All Assignees'}
              </span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {showAssigneeDropdown && (
              <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-lg z-20 overflow-hidden">
                <div className="p-2 border-b border-gray-200">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                      <MagnifyingGlassIcon className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={assigneeSearch}
                      onChange={(e) => {
                        e.stopPropagation();
                        setAssigneeSearch(e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      placeholder="Search assignees..."
                      className="w-full h-8 pl-8 pr-2 text-xs border border-gray-200 rounded bg-gray-50 focus:bg-white focus:border-[#E31E24] focus:ring-1 focus:ring-[#E31E24] focus:outline-none"
                    />
                  </div>
                </div>
                <div className="max-h-48 overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedAssignee('');
                      setShowAssigneeDropdown(false);
                      setAssigneeSearch('');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors ${
                      !selectedAssignee ? 'bg-[#E31E24]/10 text-[#E31E24] font-semibold' : 'text-gray-700'
                    }`}
                  >
                    All Assignees
                  </button>
                  {filteredAssignees.length === 0 ? (
                    <div className="px-3 py-2 text-xs text-gray-500 text-center">No assignees found</div>
                  ) : (
                    filteredAssignees.map(assignee => (
                      <button
                        key={assignee}
                        onClick={() => {
                          setSelectedAssignee(assignee);
                          setShowAssigneeDropdown(false);
                          setAssigneeSearch('');
                        }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-gray-50 transition-colors ${
                          selectedAssignee === assignee ? 'bg-[#E31E24]/10 text-[#E31E24] font-semibold' : 'text-gray-700'
                        }`}
                      >
                        {assignee}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quality Score Filter */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 uppercase px-1 tracking-wider">Quality Score</label>
          <select
            value={selectedQualityScore}
            onChange={(e) => setSelectedQualityScore(e.target.value)}
            className="form-select block w-full h-10 rounded-lg border border-gray-200 bg-gray-50 pr-8 text-sm text-gray-600 focus:border-[#E31E24] focus:ring-0"
          >
            <option value="">All Scores</option>
            <option value="high">High (81-100%)</option>
            <option value="medium">Medium (51-80%)</option>
            <option value="low">Low (41-50%)</option>
            <option value="lowest">Lowest (0-40%)</option>
          </select>
        </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default BugFilters;
