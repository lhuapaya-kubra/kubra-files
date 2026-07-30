import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
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
import { ClientInsightsMetrics, Environment } from '../types';

interface ClientInsightsProps {
  data: ClientInsightsMetrics;
}

export function ClientInsights({ data }: ClientInsightsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [envFilter, setEnvFilter] = useState<Environment>('all');

  const filteredClients = data.clients.filter(client => {
    const matchesSearch = searchTerm === '' || 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.clientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.clientKrn.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEnv = envFilter === 'all' || client.environment === envFilter;
    return matchesSearch && matchesEnv;
  }).sort((a, b) => b.filesProcessedToday - a.filesProcessedToday);

  return (
    <div className="dashboard-content">
      {/* File & Record Volume Over Time */}
      <ChartCard 
        title="File & Record Volume Over Time" 
        subtitle="Files processed per day / week / month trend"
        legend={[
          { label: 'Files', color: '#00d4aa' },
          { label: 'Records (÷1000)', color: '#7c3aed' }
        ]}
        fullWidth
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data.volumeTrend}>
            <defs>
              <linearGradient id="colorFilesCI3" x1="0" y1="0" x2="0" y2="1">
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
              fill="url(#colorFilesCI3)"
              name="Files"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="records" 
              stroke="#7c3aed" 
              strokeWidth={2}
              dot={false}
              name="Records"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Upload Patterns - When do clients upload? */}
      <div className="chart-grid">
        <ChartCard 
          title="Upload Pattern by Hour" 
          subtitle="When clients upload files (time of day)"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.uploadsByHour}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="hour" stroke="#64748b" fontSize={9} tickLine={false} interval={2} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
              />
              <Bar dataKey="count" fill="#00d4aa" radius={[2, 2, 0, 0]} name="Uploads" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Upload Pattern by Day of Week" 
          subtitle="Upload frequency distribution"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.uploadsByDayOfWeek}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
              />
              <Bar dataKey="count" fill="#7c3aed" radius={[4, 4, 0, 0]} name="Uploads" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Segmentation Charts */}
      <div className="chart-grid">
        <ChartCard 
          title="Volume by Feed Type" 
          subtitle="Active datafeeds - unique feed definitions used"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.byFeedType} layout="vertical">
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
              <Bar dataKey="files" fill="#00d4aa" radius={[0, 4, 4, 0]} name="Files" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Volume by Downstream Consumer" 
          subtitle="Products/services receiving data"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.byConsumer} layout="vertical">
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
              <Bar dataKey="files" fill="#7c3aed" radius={[0, 4, 4, 0]} name="Files" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="chart-grid">
        <ChartCard 
          title="Volume by Environment" 
          subtitle="Production vs non-production"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.byEnvironment}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="env" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
              />
              <Bar dataKey="files" fill="#38bdf8" radius={[4, 4, 0, 0]} name="Files" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="File Size Distribution" 
          subtitle="Upload sizes across clients"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.fileSizeDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="range" stroke="#64748b" fontSize={10} tickLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
              />
              <Bar dataKey="count" fill="#f472b6" radius={[4, 4, 0, 0]} name="Files" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Client Table - Core Metrics by client_ID or client_krn */}
      <ChartCard title="Client Details by client_id / client_krn" subtitle="Core metrics per client - filter and search" fullWidth>
        {/* Search and Filter Bar */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 8, 
            background: 'var(--bg-tertiary)', 
            borderRadius: 8, 
            padding: '8px 12px',
            border: '1px solid var(--border-subtle)'
          }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search by client_id, client_krn, or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontSize: 13,
                fontFamily: 'var(--font-display)'
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Filter size={16} color="var(--text-muted)" />
            <select
              value={envFilter}
              onChange={(e) => setEnvFilter(e.target.value as Environment)}
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 8,
                padding: '8px 12px',
                color: 'var(--text-primary)',
                fontSize: 13,
                fontFamily: 'var(--font-display)',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Environments</option>
              <option value="prod">Production</option>
              <option value="staging">Staging</option>
              <option value="dev">Development</option>
            </select>
          </div>
        </div>

        <div style={{ maxHeight: 500, overflowY: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Client ID</th>
                <th>KRN</th>
                <th>Env</th>
                <th>Files/Day</th>
                <th>Files/Week</th>
                <th>Files/Month</th>
                <th>Records</th>
                <th>Datafeeds</th>
                <th>Consumers</th>
                <th>Avg Size</th>
                <th>Frequency</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.clientId}>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{client.name}</td>
                  <td className="mono" style={{ fontSize: 11 }}>{client.clientId}</td>
                  <td className="mono" style={{ fontSize: 9, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {client.clientKrn}
                  </td>
                  <td>
                    <span className={`status-pill ${client.environment === 'prod' ? 'success' : client.environment === 'staging' ? 'warning' : ''}`}
                      style={client.environment === 'dev' ? { background: 'rgba(100,116,139,0.2)', color: 'var(--text-muted)' } : {}}
                    >
                      {client.environment}
                    </span>
                  </td>
                  <td className="mono">{client.filesProcessedToday.toLocaleString()}</td>
                  <td className="mono">{client.filesProcessedWeek.toLocaleString()}</td>
                  <td className="mono">{client.filesProcessedMonth.toLocaleString()}</td>
                  <td className="mono">{(client.totalRecords / 1000).toFixed(0)}K</td>
                  <td className="mono">{client.activeDatafeeds}</td>
                  <td className="mono">{client.activeConsumers}</td>
                  <td className="mono">{client.avgFileSizeKb > 1000 ? `${(client.avgFileSizeKb / 1000).toFixed(1)}MB` : `${client.avgFileSizeKb}KB`}</td>
                  <td>
                    <span style={{ 
                      fontSize: 10, 
                      padding: '2px 6px', 
                      borderRadius: 4, 
                      background: client.uploadFrequency === 'hourly' ? 'rgba(0,212,170,0.2)' : 
                                  client.uploadFrequency === 'daily' ? 'rgba(124,58,237,0.2)' :
                                  client.uploadFrequency === 'weekly' ? 'rgba(56,189,248,0.2)' : 'rgba(100,116,139,0.2)',
                      color: client.uploadFrequency === 'hourly' ? '#00d4aa' : 
                             client.uploadFrequency === 'daily' ? '#7c3aed' :
                             client.uploadFrequency === 'weekly' ? '#38bdf8' : '#64748b'
                    }}>
                      {client.uploadFrequency}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* Summary Stats */}
      <ChartCard title="Summary Totals" fullWidth>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 12 }}>
          {[
            { label: 'Files Today', value: data.totalFilesToday.toLocaleString() },
            { label: 'Files This Week', value: data.totalFilesWeek.toLocaleString() },
            { label: 'Files This Month', value: data.totalFilesMonth.toLocaleString() },
            { label: 'Total Records', value: `${(data.totalRecords / 1000000).toFixed(1)}M` },
            { label: 'Active Clients', value: data.totalActiveClients },
            { label: 'Active Datafeeds', value: data.totalActiveDatafeeds },
            { label: 'Active Consumers', value: data.totalActiveConsumers },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center', padding: 12, background: 'var(--bg-tertiary)', borderRadius: 8 }}>
              <div style={{ fontSize: 20, fontWeight: 600, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
