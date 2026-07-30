import { RefreshCw } from 'lucide-react';
import { TimeRange, MetricSection } from '../types';

interface HeaderProps {
  activeSection: MetricSection;
  timeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
  onRefresh: () => void;
}

const sectionTitles: Record<MetricSection, { title: string; subtitle: string }> = {
  overview: { 
    title: 'Overview', 
    subtitle: 'Datafeed health and key metrics at a glance' 
  },
  'client-insights': { 
    title: 'Client Insights', 
    subtitle: 'How much is Datafeed being used and by whom?' 
  },
  'downstream-impact': { 
    title: 'Downstream Impact', 
    subtitle: 'What is the effect of Datafeed on KUBRA products?' 
  },
  exceptions: { 
    title: 'Exceptions & Errors', 
    subtitle: 'What goes wrong most often, and where should we focus?' 
  },
};

const timeRanges: TimeRange[] = ['24h', '7d', '30d', '90d'];

export function Header({ activeSection, timeRange, onTimeRangeChange, onRefresh }: HeaderProps) {
  const { title, subtitle } = sectionTitles[activeSection];
  
  return (
    <header className="header">
      <div>
        <h1 className="header-title">{title}</h1>
        <p className="header-subtitle">{subtitle}</p>
      </div>
      
      <div className="header-actions">
        <div className="time-range-selector">
          {timeRanges.map((range) => (
            <button
              key={range}
              className={`time-range-btn ${timeRange === range ? 'active' : ''}`}
              onClick={() => onTimeRangeChange(range)}
            >
              {range}
            </button>
          ))}
        </div>
        
        <button className="refresh-btn" onClick={onRefresh}>
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>
    </header>
  );
}
