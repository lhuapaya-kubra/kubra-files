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
import { DownstreamImpactMetrics } from '../types';

interface DownstreamImpactProps {
  data: DownstreamImpactMetrics;
}

export function DownstreamImpact({ data }: DownstreamImpactProps) {
  return (
    <div className="dashboard-content">
      {/* Delivery Volume & Error Rate Trend */}
      <ChartCard 
        title="Delivery Volume & Error Rate Over Time" 
        subtitle="Deliveries to downstream consumers with error rate trend"
        legend={[
          { label: 'Deliveries', color: '#00d4aa' },
          { label: 'Error Rate %', color: '#ef4444' }
        ]}
        fullWidth
      >
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data.deliveryTrend}>
            <defs>
              <linearGradient id="colorDelivDI3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00d4aa" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00d4aa" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="date" stroke="#64748b" fontSize={11} tickLine={false} />
            <YAxis yAxisId="left" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} domain={[0, 5]} />
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
              dataKey="deliveries" 
              stroke="#00d4aa" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorDelivDI3)"
              name="Deliveries"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="errorRate" 
              stroke="#ef4444" 
              strokeWidth={2}
              dot={false}
              name="Error Rate %"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* By Consumer: Success & Error Rate */}
      <div className="chart-grid">
        <ChartCard 
          title="Delivery Success Rate by Consumer" 
          subtitle="Per downstream consumer"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.consumers} layout="vertical">
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
              <Bar dataKey="deliverySuccessRate" fill="#00d4aa" radius={[0, 4, 4, 0]} name="Success Rate" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Delivery Error Rate by Consumer" 
          subtitle="Per downstream consumer"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.consumers} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} domain={[0, 5]} />
              <YAxis dataKey="name" type="category" stroke="#64748b" fontSize={10} tickLine={false} width={100} />
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
                formatter={(value: number) => [`${value.toFixed(2)}%`, 'Error Rate']}
              />
              <Bar dataKey="deliveryErrorRate" fill="#ef4444" radius={[0, 4, 4, 0]} name="Error Rate" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* By Feed Type: Success & Error Rate */}
      <div className="chart-grid">
        <ChartCard 
          title="Delivery Success Rate by Feed Type" 
          subtitle="Per feed type"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.byFeedType} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} domain={[95, 100]} />
              <YAxis dataKey="feedType" type="category" stroke="#64748b" fontSize={10} tickLine={false} width={110} />
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
                formatter={(value: number) => [`${value.toFixed(2)}%`, 'Success Rate']}
              />
              <Bar dataKey="deliverySuccessRate" fill="#7c3aed" radius={[0, 4, 4, 0]} name="Success Rate" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Delivery Error Rate by Feed Type" 
          subtitle="Per feed type"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.byFeedType} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} domain={[0, 5]} />
              <YAxis dataKey="feedType" type="category" stroke="#64748b" fontSize={10} tickLine={false} width={110} />
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
                formatter={(value: number) => [`${value.toFixed(2)}%`, 'Error Rate']}
              />
              <Bar dataKey="deliveryErrorRate" fill="#fbbf24" radius={[0, 4, 4, 0]} name="Error Rate" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Consumer Acknowledgment Latency */}
      <ChartCard 
        title="Consumer Acknowledgment Latency" 
        subtitle="P50 and P95 latency per consumer (ms)"
        legend={[
          { label: 'P50', color: '#38bdf8' },
          { label: 'P95', color: '#f472b6' }
        ]}
        fullWidth
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.consumers}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
            <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ 
                background: '#1a2332', 
                border: '1px solid rgba(255,255,255,0.1)', 
                borderRadius: 8,
                fontSize: 12
              }}
              formatter={(value: number) => [`${value}ms`, '']}
            />
            <Bar dataKey="ackLatencyMedian" fill="#38bdf8" radius={[4, 4, 0, 0]} name="P50" />
            <Bar dataKey="ackLatencyP95" fill="#f472b6" radius={[4, 4, 0, 0]} name="P95" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Cross-Product Metrics */}
      <div className="chart-grid">
        <ChartCard 
          title="Incidents by Product" 
          subtitle="Downstream incidents traced to Datafeed"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.incidentsByProduct} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis dataKey="product" type="category" stroke="#64748b" fontSize={10} tickLine={false} width={140} />
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
              />
              <Bar dataKey="incidents" fill="#ef4444" radius={[0, 4, 4, 0]} name="Incidents" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard 
          title="Reprocessing Requests by Reason" 
          subtitle="Initiated by downstream systems"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.reprocessingByReason} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis dataKey="reason" type="category" stroke="#64748b" fontSize={9} tickLine={false} width={150} />
              <Tooltip 
                contentStyle={{ 
                  background: '#1a2332', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  borderRadius: 8,
                  fontSize: 12
                }}
              />
              <Bar dataKey="count" fill="#fbbf24" radius={[0, 4, 4, 0]} name="Requests" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Consumer Details Table */}
      <ChartCard title="Consumer Delivery Details" subtitle="All metrics per downstream consumer" fullWidth>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Consumer</th>
                <th>Product</th>
                <th>Files Delivered</th>
                <th>Success Rate</th>
                <th>Error Rate</th>
                <th>Ack P50</th>
                <th>Ack P95</th>
                <th>Errors Reported</th>
              </tr>
            </thead>
            <tbody>
              {data.consumers.map((consumer) => (
                <tr key={consumer.name}>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{consumer.name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{consumer.product}</td>
                  <td className="mono">{consumer.filesDelivered.toLocaleString()}</td>
                  <td className="mono" style={{ color: '#00d4aa' }}>{consumer.deliverySuccessRate.toFixed(2)}%</td>
                  <td className="mono" style={{ color: consumer.deliveryErrorRate > 1 ? '#ef4444' : '#fbbf24' }}>
                    {consumer.deliveryErrorRate.toFixed(2)}%
                  </td>
                  <td className="mono">{consumer.ackLatencyMedian}ms</td>
                  <td className="mono">{consumer.ackLatencyP95}ms</td>
                  <td className="mono" style={{ color: consumer.errorsReported > 30 ? '#ef4444' : 'inherit' }}>
                    {consumer.errorsReported}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* Feed Type Delivery Table */}
      <ChartCard title="Delivery by Feed Type" subtitle="Success and error rates per feed type" fullWidth>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Feed Type</th>
                <th>Files Delivered</th>
                <th>Success Rate</th>
                <th>Error Rate</th>
                <th>Total Errors</th>
              </tr>
            </thead>
            <tbody>
              {data.byFeedType.map((feed) => (
                <tr key={feed.feedType}>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{feed.feedType}</td>
                  <td className="mono">{feed.filesDelivered.toLocaleString()}</td>
                  <td className="mono" style={{ color: '#00d4aa' }}>{feed.deliverySuccessRate.toFixed(2)}%</td>
                  <td className="mono" style={{ color: feed.deliveryErrorRate > 1 ? '#ef4444' : '#fbbf24' }}>
                    {feed.deliveryErrorRate.toFixed(2)}%
                  </td>
                  <td className="mono">{feed.errors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* Cross-Product Summary */}
      <ChartCard title="Cross-Product Impact Summary" fullWidth>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
          {[
            { label: 'Total Deliveries', value: data.totalDeliveries.toLocaleString(), color: 'var(--text-primary)' },
            { label: 'Overall Success Rate', value: `${data.overallSuccessRate}%`, color: '#00d4aa' },
            { label: 'Overall Error Rate', value: `${data.overallErrorRate}%`, color: '#ef4444' },
            { label: 'Incidents Linked', value: data.incidentsLinkedToDatafeed, color: '#ef4444' },
            { label: 'Reprocessing Requests', value: data.reprocessingRequests, color: '#fbbf24' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center', padding: 16, background: 'var(--bg-tertiary)', borderRadius: 8 }}>
              <div style={{ fontSize: 24, fontWeight: 600, fontFamily: 'var(--font-mono)', color: stat.color }}>
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
