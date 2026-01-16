function StatCard({ title, value, icon, iconBgColor, iconColor, trend, trendValue, trendLabel }) {
  const getTrendIcon = () => {
    if (trend === 'up') return 'arrow_upward';
    if (trend === 'down') return 'arrow_downward';
    return 'arrow_upward';
  };

  const getTrendColor = () => {
    if (trend === 'down' && trendValue.includes('-')) return 'text-green-600';
    if (trend === 'up' && trendValue.includes('+')) return 'text-green-600';
    return 'text-green-600';
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-card transition-shadow border border-border">
      <div className="flex items-start justify-between mb-4">
        <p className="text-text-secondary text-xs font-medium">{title}</p>
        <div className={`${iconBgColor} p-1.5 rounded-lg`}>
          <span className={`material-symbols-outlined ${iconColor} text-[18px]`}>{icon}</span>
        </div>
      </div>
      <div>
        <p className="text-2xl font-bold text-text-main mb-1.5">{value}</p>
        <div className="flex items-center gap-1 text-xs">
          <span className={`${getTrendColor()} font-medium flex items-center gap-0.5`}>
            <span className="material-symbols-outlined text-[14px]">{getTrendIcon()}</span>
            {trendValue}
          </span>
          <span className="text-text-muted">{trendLabel}</span>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
