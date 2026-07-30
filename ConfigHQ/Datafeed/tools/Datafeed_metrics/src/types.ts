export type TimeRange = '24h' | '7d' | '30d' | '90d';

export type MetricSection = 
  | 'overview'
  | 'client-insights'
  | 'downstream-impact'
  | 'exceptions';

export type Environment = 'prod' | 'staging' | 'dev' | 'all';

export interface Client {
  clientId: string;
  clientKrn: string;
  name: string;
  environment: 'prod' | 'staging' | 'dev';
  filesProcessedToday: number;
  filesProcessedWeek: number;
  filesProcessedMonth: number;
  totalRecords: number;
  activeDatafeeds: number;
  activeConsumers: number;
  avgFileSizeKb: number;
  lastUpload: string;
  uploadFrequency: 'hourly' | 'daily' | 'weekly' | 'irregular';
}

export interface Datafeed {
  id: string;
  name: string;
  clientId: string;
  feedType: string;
  schema: string;
}

export interface Consumer {
  id: string;
  name: string;
  product: string;
}

// 1. Client Insights - "How much is Datafeed being used and by whom?"
export interface ClientInsightsMetrics {
  clients: Client[];
  // Core totals
  totalFilesToday: number;
  totalFilesWeek: number;
  totalFilesMonth: number;
  totalRecords: number;
  totalActiveClients: number;
  totalActiveDatafeeds: number;
  totalActiveConsumers: number;
  // Time series
  volumeTrend: { date: string; files: number; records: number }[];
  // Upload patterns - when clients upload
  uploadsByHour: { hour: string; count: number }[];
  uploadsByDayOfWeek: { day: string; count: number }[];
  // Segmentation
  byFeedType: { feedType: string; files: number; records: number }[];
  byEnvironment: { env: string; files: number; clients: number }[];
  byConsumer: { consumer: string; files: number }[];
  fileSizeDistribution: { range: string; count: number }[];
  // Upload frequency distribution
  uploadFrequencyDistribution: { frequency: string; clients: number }[];
}

// 2. Downstream Impact - "What is the effect of Datafeed on KUBRA products?"
export interface DownstreamImpactMetrics {
  // Per consumer metrics
  consumers: {
    name: string;
    product: string;
    deliverySuccessRate: number;
    deliveryErrorRate: number;
    ackLatencyMedian: number;
    ackLatencyP95: number;
    errorsReported: number;
    filesDelivered: number;
  }[];
  // Per feed type delivery metrics
  byFeedType: {
    feedType: string;
    deliverySuccessRate: number;
    deliveryErrorRate: number;
    filesDelivered: number;
    errors: number;
  }[];
  // Overall metrics
  totalDeliveries: number;
  overallSuccessRate: number;
  overallErrorRate: number;
  // Cross-product metrics
  incidentsLinkedToDatafeed: number;
  reprocessingRequests: number;
  consumerReportedErrors: number;
  // Time series
  deliveryTrend: { date: string; deliveries: number; successes: number; errors: number; errorRate: number }[];
  incidentsByProduct: { product: string; incidents: number }[];
  reprocessingByReason: { reason: string; count: number }[];
}

// 3. Exceptions & Errors (Learning Loop) - "What goes wrong most often?"
export interface ExceptionCategory {
  category: 'validation' | 'file_transport' | 'processing' | 'downstream_delivery';
  label: string;
}

export interface ExceptionMetrics {
  // Top exceptions by type
  topExceptionsByType: {
    errorType: string;
    category: ExceptionCategory['category'];
    count: number;
    trend: 'up' | 'down' | 'stable';
    affectedClients: number;
    percentOfTotal: number;
  }[];
  // By client
  exceptionsByClient: {
    clientId: string;
    clientName: string;
    totalExceptions: number;
    repeatRate: number;
    topError: string;
    trend: 'up' | 'down' | 'stable';
  }[];
  // By feed type / schema
  exceptionsByFeedType: {
    feedType: string;
    schema: string;
    count: number;
    topError: string;
    percentOfTotal: number;
  }[];
  // By downstream consumer
  exceptionsByConsumer: {
    consumer: string;
    count: number;
    topError: string;
    percentOfTotal: number;
  }[];
  // Time series
  exceptionTrend: { 
    date: string; 
    validation: number; 
    fileTransport: number; 
    processing: number; 
    downstream: number;
    total: number;
  }[];
  // Summary stats
  repeatExceptionRate: number;
  totalExceptions: number;
  exceptionsThisPeriod: number;
  exceptionsPreviousPeriod: number;
  percentChange: number;
  // By category
  exceptionsByCategory: {
    category: ExceptionCategory['category'];
    label: string;
    count: number;
    percentage: number;
  }[];
}

export interface DashboardData {
  clientInsights: ClientInsightsMetrics;
  downstreamImpact: DownstreamImpactMetrics;
  exceptions: ExceptionMetrics;
}
