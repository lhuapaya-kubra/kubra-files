import { useState } from 'react';
import { 
  TrendingUp,
  TrendingDown,
  Minus,
  FileWarning,
  Server,
  Layers,
  Users
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { ExceptionMetrics } from '../types';

interface ExceptionsProps {
  data: ExceptionMetrics;
}

const CATEGORY_COLORS: Record<string, string> = {
  validation: '#fbbf24',
  file_transport: '#f97316',
  processing: '#ef4444',
  downstream_delivery: '#f472b6',
};

const CATEGORY_LABELS: Record<string, string> = {
  validation: 'Validation',
  file_transport: 'File Transport',
  processing: 'Processing',
  downstream_delivery: 'Downstream',
};

type TabType = 'by-type' | 'by-client' | 'by-feed' | 'by-consumer';

export function Exceptions({ data }: ExceptionsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('by-type');

  return (
    <div className="dashboard-content">
      {/* Summary: Total exceptions this period vs previous */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: 12, 
        marginBottom: 20,
        padding: 16,
        background: 'var(--bg-card)',
        borderRadius: 8,
        border: '1px solid var(--border-subtle)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            {data.totalExceptions.toLocaleString()}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>Total Exceptions</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: 24, 
            fontWeight: 600, 
            fontFamily: 'var(--font-mono)', 
            color: data.percentChange < 0 ? '#00d4aa' : '#ef4444' 
          }}>
            {data.percentChange > 0 ? '+' : ''}{data.percentChange}%
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>vs Previous Period</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: 24, 
            fontWeight: 600, 
            fontFamily: 'var(--font-mono)', 
            color: data.repeatExceptionRate > 25 ? '#ef4444' : '#fbbf24' 
          }}>
            {data.repeatExceptionRate}%
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>Repeat Rate</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            {data.exceptionsByClient.length}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>Clients Affected</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
            {data.topExceptionsByType.length}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>Error Types</div>
        </div>
      </div>

      {/* Exception Trend Over Time */}
      <ChartCard 
        title="Exception Trend Over Time" 
        subtitle="Total and by category - track improvement after fixes"
        legend={[
          { label: 'Validation', color: '#fbbf24' },
          { label: 'File Transport', color: '#f97316' },
          { label: 'Processing', color: '#ef4444' },
          { label: 'Downstream', color: '#f472b6' }
        ]}
        fullWidth
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data.exceptionTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                background: '#1a2332', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: 8,
                fontSize: 12
              }}
            />
            <Area type="monotone" dataKey="validation" stackId="1" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.7} name="Validation" />
            <Area type="monotone" dataKey="fileTransport" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.7} name="File Transport" />
            <Area type="monotone" dataKey="processing" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.7} name="Processing" />
            <Area type="monotone" dataKey="downstream" stackId="1" stroke="#f472b6" fill="#f472b6" fillOpacity={0.7} name="Downstream" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Exception Distribution & By Client */}
      <div className="chart-grid">
        <ChartCard 
          title="Exceptions by Category" 
          subtitle="Classification breakdown"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.exceptionsByCategory}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="count"
                nameKey="label"
              >
                {data.exceptionsByCategory.map((entry) => (
                  <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
                formatter={(value: number, name: string) => [value.toLocaleString(), name]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 10, marginTop: -20 }}>
            {data.exceptionsByCategory.map((cat) => (
              <div key={cat.category} className="legend-item" style={{ fontSize: 10 }}>
                <div className="legend-dot" style={{ background: CATEGORY_COLORS[cat.category] }} />
                {CATEGORY_LABELS[cat.category]} ({cat.percentage.toFixed(0)}%)
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard 
          title="Exception Count by Client" 
          subtitle="Top clients with errors"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.exceptionsByClient.slice(0, 8)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis 
                dataKey="clientName" 
                type="category" 
                stroke="#64748b" 
                fontSize={9} 
                tickLine={false} 
                width={100}
                tickFormatter={(value) => value.length > 15 ? value.substring(0, 15) + '...' : value}
              />
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
              />
              <Bar dataKey="totalExceptions" fill="#fbbf24" radius={[0, 4, 4, 0]} name="Exceptions" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* By Feed Type & By Consumer */}
      <div className="chart-grid">
        <ChartCard 
          title="Exception Count by Feed Type / Schema" 
          subtitle="Which feed types have issues"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.exceptionsByFeedType} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis dataKey="feedType" type="category" stroke="#64748b" fontSize={10} tickLine={false} width={110} />
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
              />
              <Bar dataKey="count" fill="#7c3aed" radius={[0, 4, 4, 0]} name="Exceptions" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Exception Count by Downstream Consumer" 
          subtitle="Delivery errors per consumer"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.exceptionsByConsumer} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis dataKey="consumer" type="category" stroke="#64748b" fontSize={10} tickLine={false} width={100} />
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
              />
              <Bar dataKey="count" fill="#f472b6" radius={[0, 4, 4, 0]} name="Exceptions" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Detailed Tables with Tabs */}
      <ChartCard 
        title="Exception Details (Top N)" 
        subtitle="Drill down by dimension"
        fullWidth
      >
        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 20, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 12 }}>
          {[
            { id: 'by-type' as const, label: 'By Error Type', icon: FileWarning },
            { id: 'by-client' as const, label: 'By Client', icon: Users },
            { id: 'by-feed' as const, label: 'By Feed Type', icon: Layers },
            { id: 'by-consumer' as const, label: 'By Consumer', icon: Server },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                background: activeTab === tab.id ? 'var(--accent-primary)' : 'transparent',
                border: 'none',
                borderRadius: 6,
                color: activeTab === tab.id ? 'var(--bg-primary)' : 'var(--text-secondary)',
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* By Error Type */}
        {activeTab === 'by-type' && (
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Error Type</th>
                  <th>Category</th>
                  <th>Count</th>
                  <th>% of Total</th>
                  <th>Affected Clients</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {data.topExceptionsByType.map((error, i) => (
                  <tr key={i}>
                    <td style={{ maxWidth: 300 }}>
                      <div style={{ fontSize: 11, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {error.errorType}
                      </div>
                    </td>
                    <td>
                      <span style={{ 
                        padding: '3px 8px', 
                        borderRadius: 4, 
                        fontSize: 10, 
                        fontWeight: 600,
                        background: `${CATEGORY_COLORS[error.category]}20`,
                        color: CATEGORY_COLORS[error.category]
                      }}>
                        {CATEGORY_LABELS[error.category]}
                      </span>
                    </td>
                    <td className="mono" style={{ fontWeight: 600 }}>{error.count}</td>
                    <td className="mono">{error.percentOfTotal}%</td>
                    <td className="mono">{error.affectedClients}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {error.trend === 'up' && <TrendingUp size={14} color="#ef4444" />}
                        {error.trend === 'down' && <TrendingDown size={14} color="#00d4aa" />}
                        {error.trend === 'stable' && <Minus size={14} color="#64748b" />}
                        <span style={{ fontSize: 10, color: error.trend === 'up' ? '#ef4444' : error.trend === 'down' ? '#00d4aa' : '#64748b' }}>
                          {error.trend}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* By Client */}
        {activeTab === 'by-client' && (
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Client ID</th>
                  <th>Exceptions</th>
                  <th>Repeat Rate</th>
                  <th>Top Error</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {data.exceptionsByClient.map((client) => (
                  <tr key={client.clientId}>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{client.clientName}</td>
                    <td className="mono" style={{ fontSize: 10 }}>{client.clientId}</td>
                    <td className="mono" style={{ fontWeight: 600 }}>{client.totalExceptions}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar" style={{ width: 50 }}>
                          <div 
                            className={`progress-fill ${client.repeatRate > 30 ? 'danger' : client.repeatRate > 15 ? 'warning' : 'success'}`}
                            style={{ width: `${Math.min(client.repeatRate, 100)}%` }} 
                          />
                        </div>
                        <span className="mono" style={{ fontSize: 10 }}>{client.repeatRate.toFixed(0)}%</span>
                      </div>
                    </td>
                    <td style={{ maxWidth: 180, fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {client.topError}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        {client.trend === 'up' && <TrendingUp size={12} color="#ef4444" />}
                        {client.trend === 'down' && <TrendingDown size={12} color="#00d4aa" />}
                        {client.trend === 'stable' && <Minus size={12} color="#64748b" />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* By Feed Type */}
        {activeTab === 'by-feed' && (
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Feed Type</th>
                  <th>Schema</th>
                  <th>Exceptions</th>
                  <th>% of Total</th>
                  <th>Top Error</th>
                </tr>
              </thead>
              <tbody>
                {data.exceptionsByFeedType.map((feed) => (
                  <tr key={feed.feedType}>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{feed.feedType}</td>
                    <td className="mono">{feed.schema}</td>
                    <td className="mono" style={{ fontWeight: 600 }}>{feed.count}</td>
                    <td className="mono">{feed.percentOfTotal}%</td>
                    <td style={{ maxWidth: 250, fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {feed.topError}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* By Consumer */}
        {activeTab === 'by-consumer' && (
          <div style={{ maxHeight: 400, overflowY: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Consumer</th>
                  <th>Exceptions</th>
                  <th>% of Total</th>
                  <th>Top Error</th>
                </tr>
              </thead>
              <tbody>
                {data.exceptionsByConsumer.map((consumer) => (
                  <tr key={consumer.consumer}>
                    <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Server size={14} color="var(--text-muted)" />
                        {consumer.consumer}
                      </div>
                    </td>
                    <td className="mono" style={{ fontWeight: 600 }}>{consumer.count}</td>
                    <td className="mono">{consumer.percentOfTotal}%</td>
                    <td style={{ maxWidth: 300, fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {consumer.topError}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </ChartCard>

      {/* PM Rationale - Learning Loop */}
      <ChartCard title="Learning Loop: PM Rationale" subtitle="How exception data drives product improvement" fullWidth>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          <div style={{ padding: 16, background: 'var(--bg-tertiary)', borderRadius: 8, borderLeft: '3px solid #fbbf24' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
              Improve Documentation
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              High-frequency errors indicate where docs are unclear. Use top errors to update FAQs and validation guidance.
            </div>
          </div>
          <div style={{ padding: 16, background: 'var(--bg-tertiary)', borderRadius: 8, borderLeft: '3px solid #7c3aed' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
              Prioritize Problems
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Focus on issues affecting the most clients. Avoid over-investing in rare edge cases.
            </div>
          </div>
          <div style={{ padding: 16, background: 'var(--bg-tertiary)', borderRadius: 8, borderLeft: '3px solid #00d4aa' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
              Identify Friction
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Repeated exceptions from same clients = onboarding/tooling gaps. Widespread errors = product mismatch.
            </div>
          </div>
          <div style={{ padding: 16, background: 'var(--bg-tertiary)', borderRadius: 8, borderLeft: '3px solid #38bdf8' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 8 }}>
              Measure Fix Impact
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Exception count should trend down after docs/validation/tooling improvements. Track period-over-period.
            </div>
          </div>
        </div>
      </ChartCard>
    </div>
  );
}
