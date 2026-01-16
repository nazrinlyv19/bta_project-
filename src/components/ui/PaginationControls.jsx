import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function PaginationControls({ 
  currentPage, 
  totalPages, 
  startIndex, 
  endIndex, 
  totalItems,
  onPageChange
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 bg-white border-t border-gray-200">
      <div className="flex items-center gap-6">
        <p className="text-xs font-medium text-gray-500 whitespace-nowrap">
          Showing <span className="text-gray-900 font-bold">{startIndex + 1} - {endIndex}</span> of {totalItems} bugs
        </p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center h-8 w-8 rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </button>
        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
          const page = i + 1;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`flex items-center justify-center h-8 w-8 rounded border text-xs font-bold ${
                currentPage === page
                  ? 'border-[#E31E24] bg-[#E31E24] text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          );
        })}
        {totalPages > 5 && <span className="px-2 text-xs text-gray-500">...</span>}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center h-8 w-8 rounded border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default PaginationControls;
