function Button({ children, icon, variant = 'default', onClick, className = '' }) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-white hover:bg-primary-hover';
      case 'default':
        return 'bg-white border border-border text-text-main hover:bg-gray-50';
      default:
        return 'bg-white border border-border text-text-main hover:bg-gray-50';
    }
  };

  return (
    <button
      onClick={onClick}
      className={`h-9 px-4 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-colors ${getVariantClasses()} ${className}`}
    >
      {icon && <span className="material-symbols-outlined text-[18px]">{icon}</span>}
      {children}
    </button>
  );
}

export default Button;
