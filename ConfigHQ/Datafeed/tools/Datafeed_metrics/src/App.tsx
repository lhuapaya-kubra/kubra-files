import { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Overview } from './sections/Overview';
import { ClientInsights } from './sections/ClientInsights';
import { DownstreamImpact } from './sections/DownstreamImpact';
import { Exceptions } from './sections/Exceptions';
import { generateMockData } from './mockData';
import { TimeRange, MetricSection } from './types';

function App() {
  const [activeSection, setActiveSection] = useState<MetricSection>('overview');
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [refreshKey, setRefreshKey] = useState(0);

  const data = useMemo(() => {
    // Include refreshKey in dependency to regenerate data on refresh
    void refreshKey;
    return generateMockData(timeRange);
  }, [timeRange, refreshKey]);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview data={data} />;
      case 'client-insights':
        return <ClientInsights data={data.clientInsights} />;
      case 'downstream-impact':
        return <DownstreamImpact data={data.downstreamImpact} />;
      case 'exceptions':
        return <Exceptions data={data.exceptions} />;
      default:
        return <Overview data={data} />;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main className="main-content">
        <Header 
          activeSection={activeSection}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          onRefresh={handleRefresh}
        />
        {renderSection()}
      </main>
    </div>
  );
}

export default App;
