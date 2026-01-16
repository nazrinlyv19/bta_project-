import { useEffect, useState } from 'react';

const BugDetailsModal = ({ bug, isOpen, onClose, size = 'normal' }) => {
  const [activeTab, setActiveTab] = useState('details');

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      setActiveTab('details');
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !bug) return null;

  // Mock additional data for the modal
  const mockData = {
    description: `The ${bug.title} issue has been identified and requires immediate attention. This bug affects the core functionality and has been reported by multiple users across different environments.`,
    stepsToReproduce: [
      'Login to the application with valid credentials',
      'Navigate to the affected module or feature',
      'Perform the action that triggers the bug',
      'Observe the unexpected behavior or error'
    ],
    expectedResult: 'The system should complete the operation successfully without any errors or unexpected behavior.',
    actualResult: 'The system displays an error or behaves unexpectedly, causing disruption to the user workflow.',
    environment: 'UAT (Integration)',
    platform: 'Web Dashboard',
    priority: 'High',
    severity: 'Critical',
    history: [
      { id: 1, action: 'Status changed', from: 'New', to: 'In Progress', user: 'Gunay H.', date: '2023-11-22 14:30' },
      { id: 2, action: 'Assigned to', value: 'Gunay H.', user: 'Sarkhan M.', date: '2023-11-21 10:15' },
      { id: 3, action: 'Priority changed', from: 'Medium', to: 'High', user: 'Ali V.', date: '2023-11-20 16:45' },
      { id: 4, action: 'Comment added', value: 'Investigating the root cause of this issue.', user: 'Gunay H.', date: '2023-11-20 11:20' },
      { id: 5, action: 'Bug created', user: 'Sarkhan M.', date: '2023-11-20 09:00' },
    ],
    attachments: [
      { id: 1, name: 'error_screenshot.png', size: '245 KB', type: 'image', uploadedBy: 'Sarkhan M.', date: '2023-11-20' },
      { id: 2, name: 'console_logs.txt', size: '12 KB', type: 'text', uploadedBy: 'Gunay H.', date: '2023-11-21' },
      { id: 3, name: 'network_trace.har', size: '1.2 MB', type: 'file', uploadedBy: 'Ali V.', date: '2023-11-22' },
    ]
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getInitials = (name) => {
    if (!name || name === 'Unassigned') return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getStatusColor = (status) => {
    const colors = {
      'NEW': 'bg-blue-100 text-blue-700',
      'IN_PROGRESS': 'bg-amber-100 text-amber-700',
      'RESOLVED': 'bg-green-100 text-green-700',
      'CLOSED': 'bg-slate-100 text-slate-700',
      'BLOCKED': 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getFileIcon = (type) => {
    if (type === 'image') {
      return (
        <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      );
    }
    if (type === 'text') {
      return (
        <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    );
  };

  const renderContent = () => {
    if (activeTab === 'history') {
      return (
        <div className={`${isSmall ? 'p-4' : 'p-6'} space-y-4`}>
          <h3 className="text-gray-900 text-lg font-bold mb-4">Activity History</h3>
          <div className="space-y-4">
            {mockData.history.map((item, index) => (
              <div key={item.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">
                    {getInitials(item.user)}
                  </div>
                  {index < mockData.history.length - 1 && (
                    <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-900">{item.user}</span>
                    <span className="text-xs text-gray-400">{item.date}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {item.action === 'Status changed' && (
                      <span>Changed status from <span className="font-medium text-gray-800">{item.from}</span> to <span className="font-medium text-gray-800">{item.to}</span></span>
                    )}
                    {item.action === 'Assigned to' && (
                      <span>Assigned bug to <span className="font-medium text-gray-800">{item.value}</span></span>
                    )}
                    {item.action === 'Priority changed' && (
                      <span>Changed priority from <span className="font-medium text-gray-800">{item.from}</span> to <span className="font-medium text-gray-800">{item.to}</span></span>
                    )}
                    {item.action === 'Comment added' && (
                      <div className="bg-gray-50 p-3 rounded-lg mt-1 text-gray-700">{item.value}</div>
                    )}
                    {item.action === 'Bug created' && (
                      <span>Created this bug</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeTab === 'attachments') {
      return (
        <div className={`${isSmall ? 'p-4' : 'p-6'} space-y-4`}>
          <h3 className="text-gray-900 text-lg font-bold mb-4">Attachments ({mockData.attachments.length})</h3>
          <div className="space-y-3">
            {mockData.attachments.map((file) => (
              <div key={file.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">{file.size} • Uploaded by {file.uploadedBy} on {file.date}</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Details tab (default)
    return (
      <div className="flex-1 overflow-y-auto flex">
        {/* Left Column */}
        <div className={`w-full ${isSmall ? 'lg:w-full' : 'lg:w-[70%]'} ${isSmall ? 'p-4' : 'p-6'} ${isSmall ? 'space-y-4' : 'space-y-8'} ${isSmall ? '' : 'border-r border-gray-100'}`}>
          {/* Description */}
          <section>
            <h3 className="text-gray-900 text-lg font-bold mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
              {mockData.description}
            </p>
          </section>

          {/* Steps to Reproduce */}
          <section>
            <h3 className="text-gray-900 text-lg font-bold mb-3">Steps to Reproduce</h3>
            <div className="space-y-3">
              {mockData.stepsToReproduce.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <span className="flex-none w-6 h-6 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <p className="text-sm text-gray-600 pt-0.5">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Expected & Actual Result */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h3 className="text-gray-900 text-sm font-bold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Expected Result
              </h3>
              <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
                <p className="text-sm text-gray-700 leading-normal">{mockData.expectedResult}</p>
              </div>
            </section>
            <section>
              <h3 className="text-gray-900 text-sm font-bold mb-2 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Actual Result
              </h3>
              <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <p className="text-sm text-gray-700 leading-normal">{mockData.actualResult}</p>
              </div>
            </section>
          </div>
        </div>

        {/* Right Column */}
        {!isSmall && (
        <div className="hidden lg:block w-[30%] bg-gray-50 p-6 space-y-6">
          <div>
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Personnel</h4>
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Assignee</label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {getInitials(bug.assignee)}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{bug.assignee || 'Unassigned'}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Reporter</label>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs font-bold">
                    {getInitials(bug.reporter)}
                  </div>
                  <span className="text-sm font-medium text-gray-800">{bug.reporter}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Configuration</h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Environment</label>
                <span className="text-sm font-semibold text-gray-800">{mockData.environment}</span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Platform</label>
                <span className="text-sm font-semibold text-gray-800">{mockData.platform}</span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Created</label>
                <span className="text-sm text-gray-600">{formatDateTime(bug.createdAt)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-gray-500">Last Updated</label>
                <span className="text-sm text-gray-600">{formatDateTime(bug.updatedAt)}</span>
              </div>
            </div>
          </div>

          {/* Technical Context */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
            <p className="text-xs text-blue-600 font-bold uppercase mb-2">Technical Context</p>
            <p className="text-xs text-gray-600 leading-tight">
              This bug is potentially linked to the recent <span className="font-mono bg-blue-100 px-1 rounded">v2.4</span> deployment.
            </p>
          </div>
        </div>
        )}
      </div>
    );
  };

  const isSmall = size === 'small';
  const modalWidthClass = isSmall ? 'max-w-3xl' : 'max-w-5xl';
  const modalHeightClass = isSmall ? 'max-h-[75vh]' : 'max-h-[90vh]';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(16, 22, 34, 0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div 
        className={`bg-white w-full ${modalWidthClass} ${modalHeightClass} flex flex-col rounded-xl shadow-2xl overflow-hidden border border-gray-200`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className={`border-b border-gray-100 ${isSmall ? 'p-4' : 'p-6'}`}>
          <div className="flex justify-between items-start gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded">
                  {bug.id}
                </span>
                <h1 className={`${isSmall ? 'text-xl' : 'text-2xl'} font-bold text-gray-900 leading-tight`}>{bug.title}</h1>
              </div>
              {/* Chips */}
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(bug.status)}`}>
                  {bug.status?.replace(/_/g, ' ')}
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-red-100 text-red-700">
                  {mockData.priority} Priority
                </span>
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-orange-100 text-orange-700">
                  {mockData.severity} Severity
                </span>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className={isSmall ? 'mt-4 -mb-4' : 'mt-6 -mb-6'}>
            <div className={`flex border-b border-gray-100 ${isSmall ? 'gap-4' : 'gap-8'}`}>
              <button 
                onClick={() => setActiveTab('details')}
                className={`border-b-[3px] pb-3 text-sm font-bold cursor-pointer ${activeTab === 'details' ? 'border-b-blue-600 text-blue-600' : 'border-b-transparent text-gray-400 hover:text-gray-600'}`}
              >
                Details
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={`border-b-[3px] pb-3 text-sm font-bold cursor-pointer ${activeTab === 'history' ? 'border-b-blue-600 text-blue-600' : 'border-b-transparent text-gray-400 hover:text-gray-600'}`}
              >
                History
              </button>
              <button 
                onClick={() => setActiveTab('attachments')}
                className={`border-b-[3px] pb-3 text-sm font-bold cursor-pointer ${activeTab === 'attachments' ? 'border-b-blue-600 text-blue-600' : 'border-b-transparent text-gray-400 hover:text-gray-600'}`}
              >
                Attachments ({mockData.attachments.length})
              </button>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto">
          {renderContent()}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-100 p-4 bg-white flex justify-between items-center">
          <div className="flex items-center gap-2 text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-xs">4 people watching this bug</span>
          </div>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 text-sm font-bold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default BugDetailsModal;
