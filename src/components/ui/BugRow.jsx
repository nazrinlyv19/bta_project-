
// Status color mappings
const STATUS_COLORS = {
  'NEW': 'bg-blue-50 text-blue-700 border-blue-200',
  'IN_PROGRESS': 'bg-amber-50 text-amber-700 border-amber-200',
  'RESOLVED': 'bg-green-50 text-green-700 border-green-200',
  'CLOSED': 'bg-slate-100 text-slate-700 border-slate-200',
  'BACKLOG': 'bg-gray-100 text-gray-700 border-gray-200',
  'ANALYSIS': 'bg-blue-50 text-blue-600 border-blue-100',
  'TO_DO': 'bg-gray-100 text-gray-600 border-gray-200',
  'BLOCKED': 'bg-red-100 text-red-700 border-red-200',
  'IN_REVIEW': 'bg-purple-100 text-purple-700 border-purple-200',
  'TESTING': 'bg-blue-100 text-blue-700 border-blue-200',
  'REJECTED': 'bg-red-100 text-red-700 border-red-200',
  'RELEASED': 'bg-green-100 text-green-700 border-green-200',
  'READY_FOR_TESTING': 'bg-blue-50 text-blue-700 border-blue-100',
  'PASSED_TO_QA': 'bg-blue-50 text-blue-600 border-blue-100',
  'TESTING_OK': 'bg-green-100 text-green-700 border-green-200',
  'READY_FOR_RELEASE': 'bg-gray-100 text-gray-600 border-gray-200',
  'RELEASE_IN_PROGRESS': 'bg-blue-100 text-blue-700 border-blue-200',
  'DONE': 'bg-green-100 text-green-700 border-green-200',
};

// Status display names
const STATUS_DISPLAY = {
  'NEW': 'New',
  'IN_PROGRESS': 'In Progress',
  'RESOLVED': 'Resolved',
  'CLOSED': 'Closed',
  'BACKLOG': 'Backlog',
  'ANALYSIS': 'Analysis',
  'TO_DO': 'To Do',
  'BLOCKED': 'Blocked',
  'IN_REVIEW': 'In Review',
  'TESTING': 'Testing',
  'REJECTED': 'Rejected',
  'RELEASED': 'Released',
  'READY_FOR_TESTING': 'Ready for Testing',
  'PASSED_TO_QA': 'Passed to QA',
  'TESTING_OK': 'Testing OK',
  'READY_FOR_RELEASE': 'Ready for Release',
  'RELEASE_IN_PROGRESS': 'Release in Progress',
  'DONE': 'Done',
};

function BugRow({ bug, sidebarOpen = true, onBugClick }) {
  const statusColor = STATUS_COLORS[bug.status] || 'bg-gray-100 text-gray-700 border-gray-200';
  const statusDisplay = STATUS_DISPLAY[bug.status] || bug.status;
  
  // Quality score color and label
  const getQualityInfo = (score) => {
    if (score >= 81) return { color: 'bg-green-500', label: 'High', textColor: 'text-green-600' };
    if (score >= 51) return { color: 'bg-amber-400', label: 'Medium', textColor: 'text-amber-600' };
    if (score >= 41) return { color: 'bg-orange-500', label: 'Low', textColor: 'text-orange-600' };
    return { color: 'bg-red-500', label: 'Lowest', textColor: 'text-red-500' };
  };

  const qualityInfo = getQualityInfo(bug.qualityScore);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <tr className="hover:bg-gray-50/50 transition-colors cursor-pointer" onClick={() => onBugClick && onBugClick(bug)}>
      <td className="px-4 py-4">
        <span className="text-blue-600 font-medium text-sm">{bug.id}</span>
      </td>
      <td className="px-6 py-4">
        <div className="max-w-[500px]">
          <p className="text-sm font-normal text-gray-900 leading-snug" title={bug.title}>
            {bug.title}
          </p>
          {bug.tribe && (
            <p className="text-xs text-[#E31E24] font-semibold mt-1">{bug.tribe}</p>
          )}
        </div>
      </td>
      <td className="px-4 py-4 text-center">
        <span className={`inline-flex items-center px-2 py-1 rounded text-[10px] font-bold border uppercase leading-none ${statusColor}`}>
          {statusDisplay}
        </span>
      </td>
      <td className="px-4 py-4 text-center">
        <span className="text-sm text-gray-600 font-medium">{bug.squad}</span>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-1.5">
          <div className="flex-1 bg-gray-100 rounded-full h-1.5 min-w-[30px] max-w-[60px]">
            <div className={`${qualityInfo.color} h-1.5 rounded-full`} style={{ width: `${bug.qualityScore}%` }}></div>
          </div>
          <span className={`text-xs font-bold whitespace-nowrap ${qualityInfo.textColor}`}>
            {bug.qualityScore}%
          </span>
        </div>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm font-medium text-gray-700">{bug.reporter}</span>
      </td>
      <td className="px-4 py-4">
        <span className="text-sm font-medium text-gray-700">
          {bug.assignee === 'Unassigned' ? (
            <span className="text-gray-400">Unassigned</span>
          ) : (
            bug.assignee
          )}
        </span>
      </td>
      <td className="px-3 py-4">
        <span className="text-xs text-gray-700 font-medium whitespace-nowrap">{formatDate(bug.createdAt)}</span>
      </td>
      <td className="px-3 py-4">
        <span className="text-xs text-gray-700 font-medium whitespace-nowrap">{formatDate(bug.updatedAt)}</span>
      </td>
    </tr>
  );
}

export default BugRow;
