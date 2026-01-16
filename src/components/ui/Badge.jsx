function Badge({ children, variant = 'default', removable = false, onRemove }) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'squad':
        return 'bg-gray-100 text-gray-700';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700';
      case 'open':
        return 'bg-amber-100 text-amber-700';
      case 'review':
        return 'bg-purple-100 text-purple-700';
      case 'closed':
        return 'bg-green-100 text-green-700';
      case 'quality-high':
        return 'bg-green-100 text-green-700';
      case 'quality-med':
        return 'bg-amber-100 text-amber-700';
      case 'quality-low':
        return 'bg-red-100 text-red-700';
      case 'filter':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${getVariantClasses()}`}
    >
      {children}
      {removable && (
        <button onClick={onRemove} className="hover:opacity-70 ml-0.5">
          <span className="material-symbols-outlined text-[14px]">close</span>
        </button>
      )}
    </span>
  );
}

export default Badge;
