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
  ComposedChart,
  Line
} from 'recharts';
import { ChartCard } from '../components/ChartCard';
import { DashboardData } from '../types';

interface OverviewProps {
  data: DashboardData;
}

const CATEGORY_COLORS: Record<string, string> = {
  validation: '#fbbf24',
  file_transport: '#f97316',
  processing: '#ef4444',
  downstream_delivery: '#f472b6',
};

export function Overview({ data }: OverviewProps) {
  const { clientInsights, downstreamImpact, exceptions } = data;

  // Combine trends for overview
  const combinedTrend = clientInsights.volumeTrend.map((v, i) => ({
    date: v.date,
    files: v.files,
    deliveries: downstreamImpact.deliveryTrend[i]?.deliveries || 0,
    errors: downstreamImpact.deliveryTrend[i]?.errors || 0,
    exceptions: exceptions.exceptionTrend[i]?.total || 0,
  }));

  return (
    <div className="dashboard-content">
      {/* Three Pillars Summary */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: 16, 
        marginBottom: 20 
      }}>
        {/* Client Insights Summary */}
        <div style={{ 
          padding: 20, 
          background: 'var(--bg-card)', 
          borderRadius: 8, 
          border: '1px solid var(--border-subtle)',
          borderTop: '3px solid #00d4aa'
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Client Insights
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {clientInsights.totalFilesToday.toLocaleString()}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Files Today</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {clientInsights.totalActiveClients}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Active Clients</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {clientInsights.totalActiveDatafeeds}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Datafeeds</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {`${(clientInsights.totalRecords / 1000000).toFixed(1)}M`}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Records</div>
            </div>
          </div>
        </div>

        {/* Downstream Impact Summary */}
        <div style={{ 
          padding: 20, 
          background: 'var(--bg-card)', 
          borderRadius: 8, 
          border: '1px solid var(--border-subtle)',
          borderTop: '3px solid #7c3aed'
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Downstream Impact
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-mono)', color: '#00d4aa' }}>
                {downstreamImpact.overallSuccessRate}%
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Success Rate</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-mono)', color: '#ef4444' }}>
                {downstreamImpact.overallErrorRate}%
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Error Rate</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {downstreamImpact.incidentsLinkedToDatafeed}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Incidents</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {downstreamImpact.reprocessingRequests}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Reprocessing</div>
            </div>
          </div>
        </div>

        {/* Exceptions Summary */}
        <div style={{ 
          padding: 20, 
          background: 'var(--bg-card)', 
          borderRadius: 8, 
          border: '1px solid var(--border-subtle)',
          borderTop: '3px solid #fbbf24'
        }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Exceptions & Errors
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {exceptions.totalExceptions.toLocaleString()}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Total</div>
            </div>
            <div>
              <div style={{ 
                fontSize: 22, 
                fontWeight: 600, 
                fontFamily: 'var(--font-mono)', 
                color: exceptions.percentChange < 0 ? '#00d4aa' : '#ef4444' 
              }}>
                {exceptions.percentChange > 0 ? '+' : ''}{exceptions.percentChange}%
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>vs Prev Period</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-mono)', color: '#fbbf24' }}>
                {exceptions.repeatExceptionRate}%
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Repeat Rate</div>
            </div>
            <div>
              <div style={{ fontSize: 22, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {exceptions.exceptionsByClient.length}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Clients Affected</div>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Pipeline Trend */}
      <ChartCard 
        title="Pipeline Overview" 
        subtitle="Files ingested, deliveries, and exceptions over time"
        legend={[
          { label: 'Files Ingested', color: '#00d4aa' },
          { label: 'Deliveries', color: '#7c3aed' },
          { label: 'Exceptions', color: '#ef4444' }
        ]}
        fullWidth
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={combinedTrend}>
            <defs>
              <linearGradient id="colorFilesOv2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                background: '#1a2332', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: 8,
                fontSize: 12
              }}
            />
            <Area 
              yAxisId="left"
              type="monotone" 
              dataKey="files" 
              stroke="#00d4aa" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorFilesOv2)"
              name="Files"
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="deliveries" 
              stroke="#7c3aed" 
              strokeWidth={2}
              dot={false}
              name="Deliveries"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="exceptions" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={false}
              name="Exceptions"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="chart-grid">
        {/* Top Clients by Volume */}
        <ChartCard 
          title="Top Clients by Volume" 
          subtitle="Files processed today"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={[...clientInsights.clients]
                .sort((a, b) => b.filesProcessedToday - a.filesProcessedToday)
                .slice(0, 8)
                .map(c => ({ 
                  name: c.name.length > 18 ? c.name.substring(0, 18) + '...' : c.name, 
                  files: c.filesProcessedToday 
                }))} 
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} tickLine={false} width={110} />
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
              />
              <Bar dataKey="files" fill="#00d4aa" radius={[0, 4, 4, 0]} name="Files" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Consumer Delivery Success */}
        <ChartCard 
          title="Consumer Delivery Rates" 
          subtitle="Success rate by consumer"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={downstreamImpact.consumers} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} domain={[95, 100]} />
              <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} tickLine={false} width={100} />
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
                formatter={(value: number) => [`${value.toFixed(2)}%`, 'Success Rate']}
              />
              <Bar dataKey="deliverySuccessRate" fill="#7c3aed" radius={[0, 4, 4, 0]} name="Success %" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="chart-grid">
        {/* Exception Trend */}
        <ChartCard 
          title="Exception Trend by Category" 
          subtitle="Stacked view over time"
          legend={[
            { label: 'Validation', color: '#fbbf24' },
            { label: 'File Transport', color: '#f97316' },
            { label: 'Processing', color: '#ef4444' },
            { label: 'Downstream', color: '#f472b6' }
          ]}
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={exceptions.exceptionTrend}>
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

        {/* Top Exceptions */}
        <ChartCard 
          title="Top Exceptions by Type" 
          subtitle="Most frequent errors"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={exceptions.topExceptionsByType.slice(0, 6).map(e => ({
                name: e.errorType.length > 25 ? e.errorType.substring(0, 25) + '...' : e.errorType,
                count: e.count,
                category: e.category,
              }))} 
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={9} tickLine={false} width={150} />
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
              />
              <Bar dataKey="count" fill="#fbbf24" radius={[0, 4, 4, 0]} name="Count" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Top Exceptions Table */}
      <ChartCard title="Top 10 Exceptions" subtitle="Most frequent errors - prioritize documentation and fixes" fullWidth>
        <div style={{ maxHeight: 280, overflowY: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Error Type</th>
                <th>Category</th>
                <th>Count</th>
                <th>% of Total</th>
                <th>Clients</th>
                <th>Trend</th>
              </tr>
            </thead>
            <tbody>
              {exceptions.topExceptionsByType.slice(0, 10).map((error, i) => (
                <tr key={i}>
                  <td style={{ maxWidth: 300, fontSize: 11 }}>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {error.errorType}
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      padding: '2px 6px', 
                      borderRadius: 4, 
                      fontSize: 9, 
                      fontWeight: 600,
                      background: `${CATEGORY_COLORS[error.category]}20`,
                      color: CATEGORY_COLORS[error.category]
                    }}>
                      {error.category.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="mono" style={{ fontWeight: 600 }}>{error.count}</td>
                  <td className="mono">{error.percentOfTotal}%</td>
                  <td className="mono">{error.affectedClients}</td>
                  <td style={{ 
                    fontSize: 11, 
                    color: error.trend === 'up' ? '#ef4444' : error.trend === 'down' ? '#00d4aa' : '#64748b' 
                  }}>
                    {error.trend === 'up' ? '↑' : error.trend === 'down' ? '↓' : '→'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
