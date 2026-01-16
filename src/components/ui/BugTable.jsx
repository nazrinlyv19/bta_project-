import BugRow from './BugRow';

function BugTable({ bugs, rowsPerPage, onRowsPerPageChange, sidebarOpen = true, onBugClick, sortOrder, onSortOrderChange }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      {/* Sort by and Rows per page selector */}
      <div className="px-6 py-3 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 font-medium whitespace-nowrap">Sort by:</label>
          <select
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value)}
            className="h-8 py-0 pl-2 pr-8 text-xs rounded border-gray-200 bg-gray-50 focus:border-[#E31E24] focus:ring-0 text-gray-700"
          >
            <option value="newest-first">Newest First</option>
            <option value="oldest-first">Oldest First</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 font-medium whitespace-nowrap">Rows per page:</label>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="h-8 py-0 pl-2 pr-8 text-xs rounded border-gray-200 bg-gray-50 focus:border-[#E31E24] focus:ring-0 text-gray-700"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-24 px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Bug ID</th>
              <th className="min-w-[400px] px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Bug Title</th>
              <th className="w-36 px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
              <th className="w-36 px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Squad</th>
              <th className="w-36 px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Quality Score</th>
              <th className="w-36 px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Reporter</th>
              <th className="w-36 px-4 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Assignee</th>
              <th className="w-28 px-3 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Created</th>
              <th className="w-28 px-3 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {bugs.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                  No bugs found matching your filters.
                </td>
              </tr>
            ) : (
              bugs.map((bug) => (
                <BugRow key={bug.id} bug={bug} sidebarOpen={sidebarOpen} onBugClick={onBugClick} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BugTable;
