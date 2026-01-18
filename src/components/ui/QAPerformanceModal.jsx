import { useState, useEffect, useMemo } from 'react';

// Mock data for QAs with 0 bugs opened
const MOCK_QAS_NO_BUGS = [
  { id: 1, name: 'Anar Aliyev', team: 'Retail Core' },
  { id: 2, name: 'Gunay Mammadova', team: 'Mobile App' },
  { id: 3, name: 'Rashad Ibrahimov', team: 'Card Processing' },
  { id: 4, name: 'Leyla Huseynova', team: 'Wealth Mgmt' },
  { id: 5, name: 'Murad Safarov', team: 'Payments' },
  { id: 6, name: 'Farid Guliyev', team: 'CRM Systems' },
  { id: 7, name: 'Aysel Mammadova', team: 'Digital Banking' },
  { id: 8, name: 'Ramil Ismayilov', team: 'Core Banking' },
  { id: 9, name: 'Nigar Aliyeva', team: 'Lending' },
  { id: 10, name: 'Elvin Hasanov', team: 'Acquiring' },
  { id: 11, name: 'Sabina Karimova', team: 'Corporate Banking' },
  { id: 12, name: 'Tural Novruzov', team: 'Payments' },
];

// Mock data for QAs with high reject count
const MOCK_QAS_HIGH_REJECT = [
  { id: 1, name: 'Teymur Abdullayev', team: 'Corporate Banking', rejectCount: 15, initials: 'TA' },
  { id: 2, name: 'Nigar Musayeva', team: 'Lending', rejectCount: 12, initials: 'NM' },
  { id: 3, name: 'Emin Hasanov', team: 'Acquiring', rejectCount: 9, initials: 'EH' },
  { id: 4, name: 'Arzu Karimova', team: 'Digital Banking', rejectCount: 14, initials: 'AK' },
  { id: 5, name: 'Samir Mammadov', team: 'Payments', rejectCount: 11, initials: 'SM' },
  { id: 6, name: 'Zaur Mehdiyev', team: 'Mobile App', rejectCount: 85, initials: 'ZM', isPercentage: true },
  { id: 7, name: 'Leyla Mammadova', team: 'Retail Core', rejectCount: 8, initials: 'LM' },
  { id: 8, name: 'Rashad Safarov', team: 'Card Processing', rejectCount: 10, initials: 'RS' },
];

const QAPerformanceModal = ({ isOpen, onClose, timePeriod = 'Last 30 Days' }) => {
  const [activeTab, setActiveTab] = useState('no-activity');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedCount, setDisplayedCount] = useState(6);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveTab('no-activity');
      setSearchQuery('');
      setDisplayedCount(6);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Filter QAs based on search query
  const filteredNoBugsQAs = useMemo(() => {
    let filtered = MOCK_QAS_NO_BUGS;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = MOCK_QAS_NO_BUGS.filter(qa => 
        qa.name.toLowerCase().includes(query) || 
        qa.team.toLowerCase().includes(query)
      );
    }
    return filtered.slice(0, displayedCount);
  }, [searchQuery, displayedCount]);

  const filteredHighRejectQAs = useMemo(() => {
    let filtered = MOCK_QAS_HIGH_REJECT;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = MOCK_QAS_HIGH_REJECT.filter(qa => 
        qa.name.toLowerCase().includes(query) || 
        qa.team.toLowerCase().includes(query)
      );
    }
    return filtered.slice(0, displayedCount);
  }, [searchQuery, displayedCount]);

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getRejectBadgeColor = (count) => {
    if (count >= 13) {
      return 'bg-red-50 text-[#E31E24] border-[#E31E24]/20';
    }
    return 'bg-orange-50 text-orange-600 border-orange-200';
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl flex flex-col h-[90vh] border border-gray-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-white">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">QA Performance Overview</h2>
              <div className="flex items-center gap-2 mt-1">
                <svg className="w-4 h-4 text-[#E31E24]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <div className="relative inline-block">
                  <select 
                    className="appearance-none bg-transparent border-none p-0 pr-6 text-sm font-semibold text-gray-700 focus:ring-0 cursor-pointer"
                    defaultValue={timePeriod}
                  >
                    <option>Last 30 Days</option>
                    <option>Q1</option>
                    <option>Q2</option>
                    <option>Q3</option>
                    <option>Q4</option>
                    <option>Last 12 Months</option>
                  </select>
                  <svg className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <svg className="w-6 h-6 text-gray-400 group-hover:text-[#E31E24] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-gray-200 bg-white flex items-center gap-8">
          <button 
            onClick={() => setActiveTab('no-activity')}
            className={`py-4 text-sm font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'no-activity' 
                ? 'text-[#E31E24] border-b-2 border-[#E31E24] font-bold' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
            0 Bugs Opened
          </button>
          <button 
            onClick={() => setActiveTab('high-reject')}
            className={`py-4 text-sm font-semibold transition-colors flex items-center gap-2 ${
              activeTab === 'high-reject' 
                ? 'text-[#E31E24] border-b-2 border-[#E31E24] font-bold' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            High Reject Rate
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
          <div className="relative group">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#E31E24] transition-colors w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search QA by name or team..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#E31E24]/20 focus:border-[#E31E24] outline-none transition-all"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'no-activity' && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">QAs with No Activity</h3>
                <span className="text-[11px] font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {MOCK_QAS_NO_BUGS.length} Total
                </span>
              </div>
              <div className="max-h-[480px] overflow-auto border border-gray-200 rounded-xl bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                      <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">QA Engineer</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Team</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase text-right">Metrics</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredNoBugsQAs.map((qa) => (
                      <tr key={qa.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-4 text-sm font-medium text-gray-900">{qa.name}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">{qa.team}</td>
                        <td className="px-4 py-4 text-sm text-right text-gray-400 font-mono">0 bugs opened</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {displayedCount < MOCK_QAS_NO_BUGS.length && !searchQuery && (
                <div className="mt-4 flex flex-col items-center gap-2">
                  <button 
                    onClick={() => setDisplayedCount(prev => Math.min(prev + 6, MOCK_QAS_NO_BUGS.length))}
                    className="text-xs font-semibold text-gray-500 hover:text-[#E31E24] flex items-center gap-1.5 transition-colors"
                  >
                    Load more activity
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <p className="text-[11px] text-gray-400">
                    Showing {Math.min(displayedCount, filteredNoBugsQAs.length)} of {MOCK_QAS_NO_BUGS.length} results
                  </p>
                </div>
              )}
              {searchQuery && (
                <p className="mt-4 text-[11px] text-gray-400 text-center">
                  Showing {filteredNoBugsQAs.length} of {MOCK_QAS_NO_BUGS.length} results
                </p>
              )}
            </section>
          )}

          {activeTab === 'high-reject' && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500">QAs with High Reject Rate</h3>
                <span className="text-[11px] font-medium bg-red-50 text-[#E31E24] px-2 py-0.5 rounded uppercase tracking-wider">
                  Attention Required
                </span>
              </div>
              <div className="max-h-[480px] overflow-auto border border-gray-200 rounded-xl bg-white">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                      <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">QA Engineer</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase">Team</th>
                      <th className="px-4 py-3 text-xs font-semibold text-gray-600 uppercase text-right">Rejects</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredHighRejectQAs.map((qa) => (
                      <tr key={qa.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`size-8 rounded-full flex items-center justify-center ${
                              qa.rejectCount >= 13 ? 'bg-[#E31E24]/10' : 'bg-orange-100'
                            }`}>
                              <span className={`text-xs font-bold ${
                                qa.rejectCount >= 13 ? 'text-[#E31E24]' : 'text-orange-600'
                              }`}>
                                {qa.initials || getInitials(qa.name)}
                              </span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">{qa.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500">{qa.team}</td>
                        <td className="px-4 py-4 text-right">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${
                            qa.rejectCount >= 13 
                              ? 'bg-[#E31E24]/10 text-[#E31E24] border-[#E31E24]/20'
                              : 'bg-orange-50 text-orange-600 border-orange-200'
                          }`}>
                            {qa.isPercentage ? `${qa.rejectCount}%` : `${qa.rejectCount} rejects`}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-[11px] text-gray-400">
                  Showing {filteredHighRejectQAs.length} of {MOCK_QAS_HIGH_REJECT.length} results
                </p>
                <button className="px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                  View All Rejects
                </button>
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-gray-50/30">
          <span className="text-xs text-gray-400 italic">Data last synced: 5 mins ago</span>
          <button 
            onClick={onClose}
            className="px-8 py-2.5 bg-[#E31E24] hover:bg-red-700 text-white text-sm font-bold rounded-lg shadow-lg shadow-[#E31E24]/20 transition-all focus:ring-2 focus:ring-[#E31E24] focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QAPerformanceModal;
