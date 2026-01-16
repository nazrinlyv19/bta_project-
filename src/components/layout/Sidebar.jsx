import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const navItems = [
    { icon: 'dashboard', label: 'Dashboard', active: true },
    { icon: 'format_list_bulleted', label: 'Bug List', active: false },
    { icon: 'bar_chart', label: 'Statistics', active: false },
    { icon: 'notifications', label: 'Notifications', active: false, hasNotification: true },
    { icon: 'settings', label: 'Settings', active: false }
  ];

  return (
    <aside className="w-56 bg-sidebar-bg flex flex-col justify-between flex-shrink-0 border-r border-border">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-5 flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[18px] font-bold">bug_report</span>
          </div>
          <div>
            <h1 className="text-text-main text-sm font-bold">QA Portal</h1>
            <p className="text-text-secondary text-[11px]">Internal Tools</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 flex flex-col gap-0.5 mt-2">
          {navItems.map((item, index) => (
            <a
              key={index}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                item.active
                  ? 'bg-sidebar-active text-primary'
                  : 'text-text-secondary hover:bg-gray-100 hover:text-text-main'
              }`}
              href="#"
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.label}</span>
              {item.hasNotification && (
                <span className="ml-auto size-1.5 bg-red-500 rounded-full"></span>
              )}
            </a>
          ))}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-border mt-auto">
          <div className="flex items-center gap-2.5">
            <div
              className="size-8 rounded-full bg-cover bg-center"
              style={{
                backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCzowdqvKmCu7Hx_HcXmH3ZAdksfjhmTLrJDLPfAJQkf978K70omEU5QRKa97fj6ZwkUv4L8FJy4qK25NYzmrup8Y-72fpfGcWH1K5S1LEkt3EbAiYH681fr1XvOf9y7ey9f16NMMqBAG6aK54lusKrXHored--dYSRaGZQUiOBTvzv69kl5UuNBX5iaBhaMwAvaWcPjbs9TrbVo7BTIJHth7hKnq2DnqE4Lhr-uCfyw7qDUFzrBe9cyroLZ7GwINfe060p5dULewY")`
              }}
            ></div>
            <div className="flex flex-col flex-1">
              <span className="text-xs font-semibold text-text-main">Alex Morgan</span>
              <span className="text-[11px] text-text-secondary">Chapter Lead</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-text-muted hover:text-text-main transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
