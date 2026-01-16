import { useState, useRef, useEffect } from 'react';
import { Bars3Icon, MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

function Header({ 
  sidebarOpen, 
  onSidebarToggle, 
  searchQuery = '', 
  onSearchChange = () => {},
  selectedTribe = 'All Tribes',
  onTribeChange = () => {},
  showSearchAndTribe = true 
}) {
  const [showTribeDropdown, setShowTribeDropdown] = useState(false);
  const tribeDropdownRef = useRef(null);
  const tribes = ['All Tribes', 'Payments', 'Digital Banking', 'Core Banking', 'Retail Lending'];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tribeDropdownRef.current && !tribeDropdownRef.current.contains(event.target)) {
        setShowTribeDropdown(false);
      }
    };

    if (showTribeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showTribeDropdown]);

  return (
    <header className={`h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shrink-0 fixed top-0 right-0 z-30 transition-all duration-300 ${sidebarOpen ? 'left-64' : 'left-0'}`}>
      <div className="flex items-center gap-4">
        <button 
          onClick={onSidebarToggle}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
        >
          <Bars3Icon className="w-6 h-6 text-gray-600" />
        </button>
        <h2 className="text-gray-900 text-lg font-bold tracking-tight">Bug Tracking Assistant</h2>
      </div>
      {showSearchAndTribe && (
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative min-w-[300px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search bugs, IDs, or tags..."
              className="w-full h-10 pl-10 pr-4 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:border-[#E31E24] focus:ring-1 focus:ring-[#E31E24] focus:outline-none transition-colors placeholder:text-gray-400"
            />
          </div>
          <div className="relative" ref={tribeDropdownRef}>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowTribeDropdown(!showTribeDropdown);
              }}
              className="flex items-center gap-2 h-9 px-4 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <span className="font-normal">Tribe: <span className="font-semibold">{selectedTribe}</span></span>
              <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${showTribeDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showTribeDropdown && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                {tribes.map((tribe) => (
                  <button
                    key={tribe}
                    onClick={() => {
                      onTribeChange(tribe);
                      setShowTribeDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      selectedTribe === tribe ? 'bg-[#E31E24]/10 text-[#E31E24] font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {tribe}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
