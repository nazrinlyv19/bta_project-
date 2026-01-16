import { useState, useEffect, useMemo } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Toggle from '../../components/ui/Toggle';
import SquadSelector from '../../components/ui/SquadSelector';

// Mock data for tribes and their associated squads
const TRIBES = [
  { value: 'payments', label: 'Payments & Cards' },
  { value: 'digital', label: 'Digital Banking' },
  { value: 'core', label: 'Core Banking' },
  { value: 'retail', label: 'Retail Lending' },
  { value: 'wealth', label: 'Wealth Management' },
  { value: 'insurance', label: 'Insurance Services' },
  { value: 'mortgage', label: 'Mortgage & Loans' },
  { value: 'investment', label: 'Investment Banking' },
  { value: 'trading', label: 'Trading Platform' },
  { value: 'compliance', label: 'Compliance & Risk' },
  { value: 'security', label: 'Security & Fraud' },
  { value: 'analytics', label: 'Data Analytics' },
  { value: 'customer', label: 'Customer Experience' },
  { value: 'operations', label: 'Operations & Support' },
  { value: 'infrastructure', label: 'Infrastructure' },
  { value: 'mobile', label: 'Mobile Banking' },
  { value: 'api', label: 'API Services' },
  { value: 'integration', label: 'Integration Services' },
  { value: 'reporting', label: 'Reporting & BI' },
  { value: 'testing', label: 'QA & Testing' },
];

// Helper function to get squads for a tribe
function getSquadsForTribe(tribeValue) {
  const tribeSquadMap = {
    'payments': [
      'Payments Squad',
      'Card Management',
      'Transaction Processing',
      'Fraud Detection',
      'Payment Gateway',
      'Settlement Team',
      'Payment Operations',
      'Card Issuance',
      'Payment Reconciliation',
      'Merchant Services',
      'Payment Analytics',
      'Payment Security',
    ],
    'digital': [
      'Auth Squad',
      'Mobile Development',
      'Reporting Team',
      'User Management',
      'Frontend Team',
      'UX/UI Team',
      'Web Development',
      'Mobile Apps',
      'Digital Channels',
      'Customer Portal',
      'Online Banking',
      'Digital Onboarding',
    ],
    'core': [
      'Core Banking',
      'API Gateway',
      'Data Processing',
      'Backend Services',
      'Integration Team',
      'DevOps',
      'Core Systems',
      'Account Management',
      'Transaction Engine',
      'Core Platform',
      'System Integration',
      'Core Infrastructure',
    ],
    'retail': [
      'Reporting Team',
      'Risk Management',
      'Compliance',
      'Analytics',
      'Lending Operations',
      'Credit Analysis',
      'Loan Processing',
      'Credit Underwriting',
      'Collections',
      'Retail Products',
      'Customer Service',
      'Branch Operations',
    ],
    'wealth': [
      'Wealth Management',
      'Portfolio Management',
      'Investment Advisory',
      'Private Banking',
      'Wealth Planning',
      'Asset Management',
      'Wealth Analytics',
      'Client Services',
    ],
    'insurance': [
      'Insurance Products',
      'Claims Processing',
      'Policy Management',
      'Underwriting',
      'Insurance Analytics',
      'Customer Service',
      'Risk Assessment',
      'Insurance Operations',
    ],
    'mortgage': [
      'Mortgage Processing',
      'Loan Origination',
      'Mortgage Underwriting',
      'Mortgage Servicing',
      'Mortgage Analytics',
      'Document Management',
      'Compliance Team',
      'Mortgage Operations',
    ],
    'investment': [
      'Investment Products',
      'Trading Desk',
      'Research Team',
      'Portfolio Management',
      'Investment Analytics',
      'Client Relations',
      'Market Analysis',
      'Investment Operations',
    ],
    'trading': [
      'Trading Platform',
      'Order Management',
      'Market Data',
      'Execution Services',
      'Risk Control',
      'Trading Analytics',
      'Algorithm Trading',
      'Trading Operations',
    ],
    'compliance': [
      'Compliance Monitoring',
      'Regulatory Reporting',
      'AML Team',
      'KYC Operations',
      'Compliance Analytics',
      'Audit Team',
      'Risk Assessment',
      'Policy Management',
    ],
    'security': [
      'Security Operations',
      'Fraud Prevention',
      'Threat Detection',
      'Security Analytics',
      'Incident Response',
      'Security Engineering',
      'Identity Management',
      'Access Control',
    ],
    'analytics': [
      'Data Analytics',
      'Business Intelligence',
      'Data Science',
      'Reporting Team',
      'Data Engineering',
      'Analytics Platform',
      'Data Visualization',
      'Predictive Analytics',
    ],
    'customer': [
      'Customer Experience',
      'Customer Support',
      'Customer Onboarding',
      'Customer Analytics',
      'Service Quality',
      'Customer Relations',
      'Help Desk',
      'Customer Success',
    ],
    'operations': [
      'Operations Support',
      'Process Management',
      'Operations Analytics',
      'Service Delivery',
      'Operations Excellence',
      'Service Management',
      'Operations Planning',
      'Service Operations',
    ],
    'infrastructure': [
      'Infrastructure Team',
      'Cloud Services',
      'Network Operations',
      'System Administration',
      'Infrastructure Engineering',
      'Platform Services',
      'Infrastructure Monitoring',
      'Infrastructure Security',
    ],
    'mobile': [
      'Mobile Banking',
      'Mobile Apps iOS',
      'Mobile Apps Android',
      'Mobile Platform',
      'Mobile Security',
      'Mobile Analytics',
      'Mobile Operations',
      'Mobile Development',
    ],
    'api': [
      'API Development',
      'API Gateway',
      'API Management',
      'API Security',
      'API Analytics',
      'API Integration',
      'API Operations',
      'API Platform',
    ],
    'integration': [
      'Integration Services',
      'System Integration',
      'Data Integration',
      'API Integration',
      'Integration Platform',
      'Integration Testing',
      'Integration Operations',
      'Integration Support',
    ],
    'reporting': [
      'Reporting & BI',
      'Business Reporting',
      'Financial Reporting',
      'Regulatory Reporting',
      'Report Development',
      'Report Analytics',
      'Report Operations',
      'Report Platform',
    ],
    'testing': [
      'QA & Testing',
      'Test Automation',
      'Manual Testing',
      'Performance Testing',
      'Security Testing',
      'Test Engineering',
      'QA Operations',
      'Test Management',
    ],
  };
  return tribeSquadMap[tribeValue] || [];
}

function Settings() {
  // Tribe & Squad Selection - Multiple tribes can be selected
  const [selectedTribe, setSelectedTribe] = useState([]);
  const [selectedSquads, setSelectedSquads] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [tribeSearchQuery, setTribeSearchQuery] = useState('');

  // Reporting Preferences
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [monthlyReport, setMonthlyReport] = useState(false);

  // Filter tribes based on search query
  const filteredTribes = useMemo(() => {
    if (!tribeSearchQuery) return TRIBES;
    return TRIBES.filter(tribe =>
      tribe.label.toLowerCase().includes(tribeSearchQuery.toLowerCase())
    );
  }, [tribeSearchQuery]);

  // Load saved settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        setSelectedTribe(Array.isArray(settings.selectedTribe) ? settings.selectedTribe : (settings.selectedTribe ? [settings.selectedTribe] : []));
        setSelectedSquads(settings.selectedSquads || []);
        setWeeklyReport(settings.weeklyReport !== undefined ? settings.weeklyReport : true);
        setMonthlyReport(settings.monthlyReport || false);
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const handleSaveChanges = () => {
    const settings = {
      selectedTribe,
      selectedSquads,
      weeklyReport,
      monthlyReport,
    };
    localStorage.setItem('userSettings', JSON.stringify(settings));
    setIsEditing(false);
    alert('Settings saved successfully!');
  };

  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to reset all settings to default values?')) {
      setSelectedTribe([]);
      setSelectedSquads([]);
      setWeeklyReport(true);
      setMonthlyReport(false);
      localStorage.removeItem('userSettings');
    }
  };

  const handleApplyAllSettings = () => {
    handleSaveChanges();
  };


  return (
    <div className="p-6 md:p-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Title Section */}
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Settings</h2>
          <p className="text-sm text-gray-500">Configure your organizational view and reporting preferences.</p>
        </div>

        <div className="space-y-6">

          {/* Tribe & Squad Selection */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Tribe & Squad Selection</h2>
              <p className="text-sm text-gray-600 mt-1">
                Configure your default organizational view for reporting and metrics.
              </p>
            </div>
            <div className="p-5 space-y-5 min-h-[800px]">
              {/* Tribe Selection - Multiple Selection */}
              <div className="space-y-2">
                {/* Search Bar for Tribes */}
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tribes..."
                    value={tribeSearchQuery}
                    onChange={(e) => setTribeSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-[#E31E24] transition-colors"
                  />
                </div>

                {/* Filtered Tribes List with Scroll */}
                <div className="border border-gray-200 rounded-lg bg-gray-50 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 p-3">
                    {filteredTribes.length === 0 ? (
                      <div className="col-span-2 p-4 text-sm text-gray-500 text-center">
                        No tribes found
                      </div>
                    ) : (
                      filteredTribes.map((tribe) => (
                        <label
                          key={tribe.value}
                          className="flex items-center gap-2.5 p-2.5 bg-white border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-[#E31E24]/30 transition-colors group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedTribe.includes(tribe.value)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedTribe([...selectedTribe, tribe.value]);
                              } else {
                                setSelectedTribe(selectedTribe.filter(t => t !== tribe.value));
                                // Remove squads for this tribe when deselected
                                setSelectedSquads(prev => prev.filter(s => !getSquadsForTribe(tribe.value).includes(s)));
                              }
                            }}
                            className="rounded border-gray-300 text-[#E31E24] focus:ring-[#E31E24] h-4 w-4"
                          />
                          <span className="text-sm font-medium text-gray-900 group-hover:text-[#E31E24] transition-colors">
                            {tribe.label}
                          </span>
                        </label>
                      ))
                    )}
                  </div>
                </div>
              </div>

              {/* Squad Selection for Each Selected Tribe */}
              {selectedTribe.length > 0 && (
                <div className="space-y-3 pt-1">
                  <div className="space-y-3 min-h-[400px] max-h-[1800px] overflow-y-auto pr-2">
                    {selectedTribe.map((tribeValue) => {
                      const tribe = TRIBES.find(t => t.value === tribeValue);
                      const tribeSquads = getSquadsForTribe(tribeValue);
                      const tribeSelectedSquads = selectedSquads.filter(s => tribeSquads.includes(s));
                      
                      return (
                        <div key={tribeValue} className="border border-gray-200 rounded-lg p-3 bg-white">
                          <h3 className="text-sm font-semibold text-gray-900 mb-2">{tribe?.label} Squads</h3>
                          <SquadSelector
                            squads={tribeSquads}
                            selectedSquads={tribeSelectedSquads}
                            onSquadChange={(newSquads) => {
                              // Remove old squads for this tribe and add new ones
                              const otherSquads = selectedSquads.filter(s => !tribeSquads.includes(s));
                              setSelectedSquads([...otherSquads, ...newSquads]);
                            }}
                            disabled={false}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {selectedTribe.length === 0 && (
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-500 text-center">Please select at least one tribe to configure squads.</p>
                </div>
              )}

              <div className="pt-3 flex items-center gap-3 border-t border-gray-200">
                <button
                  onClick={handleSaveChanges}
                  className="bg-[#E31E24] hover:bg-[#C6191F] text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-sm shadow-[#E31E24]/10"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </section>

          {/* Reporting Preferences */}
          <section className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Reporting Preferences</h2>
              <p className="text-sm text-gray-600 mt-1">
                Manage automated email reporting for your tribe and squads.
              </p>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-900">Enable Weekly Report</label>
                  <p className="text-xs text-gray-600">
                    Receive a summary of all bug activity and quality scores every Monday morning.
                  </p>
                </div>
                <Toggle
                  checked={weeklyReport}
                  onChange={setWeeklyReport}
                  ariaLabel="Enable Weekly Report"
                />
              </div>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <label className="text-sm font-semibold text-gray-900">Enable Monthly Report</label>
                  <p className="text-xs text-gray-600">
                    Receive a comprehensive deep-dive into trends and long-term quality metrics.
                  </p>
                </div>
                <Toggle
                  checked={monthlyReport}
                  onChange={setMonthlyReport}
                  ariaLabel="Enable Monthly Report"
                />
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex justify-end pt-4 pb-6 gap-4">
            <button
              onClick={handleResetAll}
              className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-100 transition-colors"
            >
              Reset All
            </button>
            <button
              onClick={handleApplyAllSettings}
              className="px-8 py-2.5 rounded-lg text-sm font-bold text-white bg-[#E31E24] hover:bg-[#C6191F] shadow-lg shadow-[#E31E24]/20 transition-all"
            >
              Apply All Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
