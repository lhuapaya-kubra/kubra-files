import { 
  LayoutDashboard, 
  Users, 
  ArrowDownToLine,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { MetricSection } from '../types';

interface SidebarProps {
  activeSection: MetricSection;
  onSectionChange: (section: MetricSection) => void;
}

const navItems = [
  { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard, description: 'Health & summary' },
  { id: 'client-insights' as const, label: 'Client Insights', icon: Users, description: 'Usage by client' },
  { id: 'downstream-impact' as const, label: 'Downstream Impact', icon: ArrowDownToLine, description: 'Consumer metrics' },
  { id: 'exceptions' as const, label: 'Exceptions & Errors', icon: AlertTriangle, description: 'Learning loop' },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">
            <Activity size={22} color="#0a0e17" strokeWidth={2.5} />
          </div>
          <div>
            <div className="logo-text">Datafeed</div>
            <div className="logo-subtitle">Analytics</div>
          </div>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title">Dashboard</div>
          {navItems.slice(0, 1).map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon className="nav-icon" size={18} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        
        <div className="nav-section">
          <div className="nav-section-title">Metrics</div>
          {navItems.slice(1).map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => onSectionChange(item.id)}
            >
              <item.icon className="nav-icon" size={18} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>{item.label}</span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>{item.description}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Philosophy Quote */}
        <div style={{ 
          margin: '24px 12px', 
          padding: 16, 
          background: 'rgba(0, 212, 170, 0.05)', 
          borderRadius: 8,
          borderLeft: '2px solid var(--accent-primary)'
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.5 }}>
            "Datafeed should remain operationally simple, but analytically rich."
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 8 }}>
            — PM Philosophy
          </div>
        </div>
      </nav>
    </aside>
  );
}
