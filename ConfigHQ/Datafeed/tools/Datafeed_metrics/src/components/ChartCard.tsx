import { ReactNode } from 'react';

interface LegendItem {
  label: string;
  color: string;
}

interface ChartCardProps {
  title: string;
  subtitle?: string;
  legend?: LegendItem[];
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
}

export function ChartCard({ title, subtitle, legend, children, fullWidth, className = '' }: ChartCardProps) {
  return (
    <div className={`chart-card ${fullWidth ? 'full-width' : ''} ${className}`}>
      <div className="chart-header">
        <div>
          <h3 className="chart-title">{title}</h3>
          {subtitle && <p className="chart-subtitle">{subtitle}</p>}
        </div>
        
        {legend && legend.length > 0 && (
          <div className="chart-legend">
            {legend.map((item, index) => (
              <div key={index} className="legend-item">
                <div className="legend-dot" style={{ background: item.color }} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="chart-body">
        {children}
      </div>
    </div>
  );
}

