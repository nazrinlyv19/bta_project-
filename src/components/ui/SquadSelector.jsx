import { useState, useRef, useEffect, useMemo } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function SquadSelector({ 
  squads, 
  selectedSquads, 
  onSquadChange, 
  disabled = false 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);

  // Filter squads based on search query
  const filteredSquads = useMemo(() => {
    if (!searchQuery) return squads;
    return squads.filter(squad => 
      squad.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [squads, searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleSquad = (squad) => {
    if (selectedSquads.includes(squad)) {
      onSquadChange(selectedSquads.filter(s => s !== squad));
    } else {
      onSquadChange([...selectedSquads, squad]);
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={`flex items-center justify-between w-full rounded-lg border border-gray-200 bg-white py-3 px-4 text-sm cursor-pointer transition-colors ${
            disabled 
              ? 'opacity-50 pointer-events-none bg-gray-50' 
              : 'hover:bg-gray-50'
          }`}
        >
          <span className="truncate text-gray-600">
            {selectedSquads.length === 0 
              ? 'Select squads...' 
              : `${selectedSquads.length} squad${selectedSquads.length > 1 ? 's' : ''} selected`}
          </span>
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {isOpen && !disabled && (
          <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-lg z-50 min-h-[400px] max-h-[700px] overflow-hidden flex flex-col">
            {/* Search Input */}
            <div className="p-2 border-b border-gray-200 flex-shrink-0">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search squads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-[#E31E24]"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            
            {/* Squad List */}
            <div className="overflow-y-auto min-h-[350px] max-h-[620px] flex-1">
              {filteredSquads.length === 0 ? (
                <div className="p-4 text-sm text-gray-500 text-center">
                  No squads found
                </div>
              ) : (
                <div className="p-2 space-y-0.5">
                  {filteredSquads.map((squad) => (
                    <label
                      key={squad}
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-lg cursor-pointer group transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedSquads.includes(squad)}
                        onChange={() => toggleSquad(squad)}
                        className="rounded border-gray-300 text-[#E31E24] focus:ring-[#E31E24] h-4 w-4 flex-shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                        {squad}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {disabled && (
        <p className="text-[11px] text-gray-600 italic">
          Please select a Tribe first to enable squad selection.
        </p>
      )}
    </div>
  );
}

export default SquadSelector;
