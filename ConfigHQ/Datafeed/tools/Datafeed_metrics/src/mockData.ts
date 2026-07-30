import { 
  ClientInsightsMetrics,
  DownstreamImpactMetrics,
  ExceptionMetrics,
  DashboardData,
  TimeRange,
  Client
} from './types';
import { format, subDays, subHours } from 'date-fns';

// Helper to generate date ranges
const generateDates = (range: TimeRange): string[] => {
  const days = range === '24h' ? 24 : range === '7d' ? 7 : range === '30d' ? 30 : 90;
  const dates: string[] = [];
  
  if (range === '24h') {
    for (let i = days - 1; i >= 0; i--) {
      dates.push(format(subHours(new Date(), i), 'HH:mm'));
    }
  } else {
    for (let i = days - 1; i >= 0; i--) {
      dates.push(format(subDays(new Date(), i), 'MMM dd'));
    }
  }
  
  return dates;
};

// Random with seed for consistency
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

const randomInRange = (min: number, max: number, seed: number) => 
  Math.floor(seededRandom(seed) * (max - min + 1)) + min;

const randomFloat = (min: number, max: number, seed: number, decimals = 2) => 
  Number((seededRandom(seed) * (max - min) + min).toFixed(decimals));

// Client data
const clientNames = [
  { name: 'Acme Energy Corp', krn: 'krn:kubra:client:acme-energy' },
  { name: 'Pacific Gas & Electric', krn: 'krn:kubra:client:pge' },
  { name: 'Duke Energy', krn: 'krn:kubra:client:duke-energy' },
  { name: 'Florida Power & Light', krn: 'krn:kubra:client:fpl' },
  { name: 'Consolidated Edison', krn: 'krn:kubra:client:coned' },
  { name: 'Dominion Energy', krn: 'krn:kubra:client:dominion' },
  { name: 'Southern California Edison', krn: 'krn:kubra:client:sce' },
  { name: 'Xcel Energy', krn: 'krn:kubra:client:xcel' },
  { name: 'American Electric Power', krn: 'krn:kubra:client:aep' },
  { name: 'Entergy Corporation', krn: 'krn:kubra:client:entergy' },
  { name: 'PPL Corporation', krn: 'krn:kubra:client:ppl' },
  { name: 'Eversource Energy', krn: 'krn:kubra:client:eversource' },
];

const feedTypes = [
  'customer-accounts',
  'billing-data',
  'usage-metrics',
  'payment-records',
  'outage-notifications',
  'service-requests',
  'meter-readings',
  'account-updates'
];

const consumers = [
  { name: 'Notifi', product: 'Customer Communications' },
  { name: 'Billing Engine', product: 'Billing & Payments' },
  { name: 'IQ Platform', product: 'Analytics' },
  { name: 'Customer Portal', product: 'Self-Service' },
  { name: 'Alert Manager', product: 'Notifications' },
  { name: 'Storm Center', product: 'Outage Management' },
];

const errorTypes = {
  validation: [
    'Schema validation failed: missing required field',
    'Invalid date format in field: billing_date',
    'Field type mismatch: expected number, got string',
    'Invalid enum value in field: account_status',
    'Missing required header row',
    'Duplicate primary key detected',
    'Invalid email format in field: contact_email',
    'Field exceeds maximum length: address_line_1',
  ],
  file_transport: [
    'File encoding not UTF-8',
    'Corrupted file: checksum mismatch',
    'Incomplete file transfer detected',
    'Invalid file format: expected CSV',
    'File size exceeds maximum limit',
    'Empty file received',
    'Malformed ZIP archive',
  ],
  processing: [
    'Processing timeout exceeded',
    'Transformation rule failure',
    'Memory limit exceeded during processing',
    'Invalid character encoding in record',
    'Record count mismatch with header',
    'Circular reference detected',
  ],
  downstream_delivery: [
    'Consumer service unavailable',
    'Consumer rejected payload: schema mismatch',
    'Delivery timeout to consumer',
    'Consumer rate limit exceeded',
    'Consumer authentication failed',
    'Partial delivery failure',
  ],
};

const uploadFrequencies: Array<'hourly' | 'daily' | 'weekly' | 'irregular'> = ['hourly', 'daily', 'weekly', 'irregular'];

const generateClients = (seed: number): Client[] => {
  const environments: Array<'prod' | 'staging' | 'dev'> = ['prod', 'staging', 'dev'];
  
  return clientNames.map((client, i) => ({
    clientId: `client-${String(i + 1).padStart(4, '0')}`,
    clientKrn: client.krn,
    name: client.name,
    environment: environments[i % 3] as 'prod' | 'staging' | 'dev',
    filesProcessedToday: randomInRange(50, 500, seed + i),
    filesProcessedWeek: randomInRange(350, 3500, seed + i + 100),
    filesProcessedMonth: randomInRange(1500, 15000, seed + i + 200),
    totalRecords: randomInRange(100000, 2000000, seed + i + 300),
    activeDatafeeds: randomInRange(3, 12, seed + i + 400),
    activeConsumers: randomInRange(2, 6, seed + i + 500),
    avgFileSizeKb: randomInRange(50, 5000, seed + i + 600),
    lastUpload: format(subHours(new Date(), randomInRange(0, 24, seed + i + 700)), 'yyyy-MM-dd HH:mm'),
    uploadFrequency: uploadFrequencies[i % 4],
  }));
};

export const generateMockData = (range: TimeRange): DashboardData => {
  const seed = range === '24h' ? 1 : range === '7d' ? 2 : range === '30d' ? 3 : 4;
  const dates = generateDates(range);
  const clients = generateClients(seed);

  // 1. Client Insights
  const clientInsights: ClientInsightsMetrics = {
    clients,
    totalFilesToday: clients.reduce((a, c) => a + c.filesProcessedToday, 0),
    totalFilesWeek: clients.reduce((a, c) => a + c.filesProcessedWeek, 0),
    totalFilesMonth: clients.reduce((a, c) => a + c.filesProcessedMonth, 0),
    totalRecords: clients.reduce((a, c) => a + c.totalRecords, 0),
    totalActiveClients: clients.length,
    totalActiveDatafeeds: clients.reduce((a, c) => a + c.activeDatafeeds, 0),
    totalActiveConsumers: consumers.length,
    volumeTrend: dates.map((date, i) => ({
      date,
      files: randomInRange(800, 2000, seed + i + 1000),
      records: randomInRange(50000, 150000, seed + i + 1100)
    })),
    // Upload patterns by hour (when do clients typically upload?)
    uploadsByHour: Array.from({ length: 24 }, (_, i) => ({
      hour: `${String(i).padStart(2, '0')}:00`,
      count: randomInRange(i >= 6 && i <= 18 ? 100 : 20, i >= 6 && i <= 18 ? 300 : 80, seed + i + 1200)
    })),
    // Upload patterns by day of week
    uploadsByDayOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => ({
      day,
      count: randomInRange(i < 5 ? 400 : 100, i < 5 ? 800 : 250, seed + i + 1300)
    })),
    byFeedType: feedTypes.map((feedType, i) => ({
      feedType,
      files: randomInRange(200, 2000, seed + i + 1400),
      records: randomInRange(50000, 500000, seed + i + 1500)
    })),
    byEnvironment: [
      { env: 'Production', files: randomInRange(5000, 12000, seed + 1600), clients: 8 },
      { env: 'Staging', files: randomInRange(500, 2000, seed + 1601), clients: 3 },
      { env: 'Development', files: randomInRange(100, 500, seed + 1602), clients: 1 },
    ],
    byConsumer: consumers.map((c, i) => ({
      consumer: c.name,
      files: randomInRange(1000, 8000, seed + i + 1700)
    })),
    fileSizeDistribution: [
      { range: '< 100KB', count: randomInRange(500, 1500, seed + 1800) },
      { range: '100KB - 1MB', count: randomInRange(1000, 3000, seed + 1801) },
      { range: '1MB - 10MB', count: randomInRange(800, 2000, seed + 1802) },
      { range: '10MB - 100MB', count: randomInRange(200, 800, seed + 1803) },
      { range: '> 100MB', count: randomInRange(50, 200, seed + 1804) },
    ],
    uploadFrequencyDistribution: [
      { frequency: 'Hourly', clients: clients.filter(c => c.uploadFrequency === 'hourly').length },
      { frequency: 'Daily', clients: clients.filter(c => c.uploadFrequency === 'daily').length },
      { frequency: 'Weekly', clients: clients.filter(c => c.uploadFrequency === 'weekly').length },
      { frequency: 'Irregular', clients: clients.filter(c => c.uploadFrequency === 'irregular').length },
    ],
  };

  // 2. Downstream Impact
  const consumerMetrics = consumers.map((c, i) => {
    const successRate = randomFloat(97.5, 99.9, seed + i + 2000);
    return {
      name: c.name,
      product: c.product,
      deliverySuccessRate: successRate,
      deliveryErrorRate: Number((100 - successRate).toFixed(2)),
      ackLatencyMedian: randomInRange(50, 200, seed + i + 2100),
      ackLatencyP95: randomInRange(200, 800, seed + i + 2200),
      errorsReported: randomInRange(5, 50, seed + i + 2300),
      filesDelivered: randomInRange(2000, 15000, seed + i + 2400),
    };
  });

  const overallSuccess = randomFloat(98.5, 99.8, seed + 2500);

  const downstreamImpact: DownstreamImpactMetrics = {
    consumers: consumerMetrics,
    byFeedType: feedTypes.map((feedType, i) => {
      const successRate = randomFloat(97, 99.9, seed + i + 2600);
      return {
        feedType,
        deliverySuccessRate: successRate,
        deliveryErrorRate: Number((100 - successRate).toFixed(2)),
        filesDelivered: randomInRange(500, 3000, seed + i + 2700),
        errors: randomInRange(5, 80, seed + i + 2800),
      };
    }),
    totalDeliveries: randomInRange(30000, 60000, seed + 2900),
    overallSuccessRate: overallSuccess,
    overallErrorRate: Number((100 - overallSuccess).toFixed(2)),
    incidentsLinkedToDatafeed: randomInRange(2, 12, seed + 3000),
    reprocessingRequests: randomInRange(15, 60, seed + 3001),
    consumerReportedErrors: consumerMetrics.reduce((a, c) => a + c.errorsReported, 0),
    deliveryTrend: dates.map((date, i) => {
      const deliveries = randomInRange(2000, 5000, seed + i + 3100);
      const errors = randomInRange(5, 50, seed + i + 3101);
      return {
        date,
        deliveries,
        successes: deliveries - errors,
        errors,
        errorRate: Number(((errors / deliveries) * 100).toFixed(2)),
      };
    }),
    incidentsByProduct: consumers.slice(0, 4).map((c, i) => ({
      product: c.product,
      incidents: randomInRange(0, 5, seed + i + 3200),
    })),
    reprocessingByReason: [
      { reason: 'Data correction requested', count: randomInRange(10, 30, seed + 3300) },
      { reason: 'Downstream processing error', count: randomInRange(5, 20, seed + 3301) },
      { reason: 'Late file delivery', count: randomInRange(3, 15, seed + 3302) },
      { reason: 'Consumer schema update', count: randomInRange(2, 10, seed + 3303) },
      { reason: 'System recovery', count: randomInRange(1, 8, seed + 3304) },
    ],
  };

  // 3. Exceptions & Errors
  const allErrors = [
    ...errorTypes.validation.map(e => ({ type: e, category: 'validation' as const })),
    ...errorTypes.file_transport.map(e => ({ type: e, category: 'file_transport' as const })),
    ...errorTypes.processing.map(e => ({ type: e, category: 'processing' as const })),
    ...errorTypes.downstream_delivery.map(e => ({ type: e, category: 'downstream_delivery' as const })),
  ];

  const validationCount = randomInRange(500, 1500, seed + 4000);
  const fileTransportCount = randomInRange(100, 400, seed + 4001);
  const processingCount = randomInRange(50, 200, seed + 4002);
  const downstreamCount = randomInRange(30, 150, seed + 4003);
  const totalExceptions = validationCount + fileTransportCount + processingCount + downstreamCount;
  const previousPeriodExceptions = randomInRange(Math.round(totalExceptions * 0.9), Math.round(totalExceptions * 1.2), seed + 4004);
  const percentChange = Number((((totalExceptions - previousPeriodExceptions) / previousPeriodExceptions) * 100).toFixed(1));

  const topExceptions = allErrors.slice(0, 15).map((e, i) => {
    const count = randomInRange(20, 500, seed + i + 4100);
    return {
      errorType: e.type,
      category: e.category,
      count,
      trend: (['up', 'down', 'stable'] as const)[i % 3],
      affectedClients: randomInRange(1, 8, seed + i + 4200),
      percentOfTotal: Number(((count / totalExceptions) * 100).toFixed(1)),
    };
  }).sort((a, b) => b.count - a.count);

  const exceptions: ExceptionMetrics = {
    topExceptionsByType: topExceptions,
    exceptionsByClient: clients.slice(0, 8).map((c, i) => ({
      clientId: c.clientId,
      clientName: c.name,
      totalExceptions: randomInRange(10, 200, seed + i + 4300),
      repeatRate: randomFloat(5, 45, seed + i + 4400),
      topError: errorTypes.validation[i % errorTypes.validation.length],
      trend: (['up', 'down', 'stable'] as const)[i % 3],
    })).sort((a, b) => b.totalExceptions - a.totalExceptions),
    exceptionsByFeedType: feedTypes.slice(0, 6).map((feedType, i) => {
      const count = randomInRange(30, 300, seed + i + 4500);
      return {
        feedType,
        schema: `v${randomInRange(1, 5, seed + i + 4600)}.${randomInRange(0, 9, seed + i + 4601)}`,
        count,
        topError: allErrors[i % allErrors.length].type,
        percentOfTotal: Number(((count / totalExceptions) * 100).toFixed(1)),
      };
    }).sort((a, b) => b.count - a.count),
    exceptionsByConsumer: consumers.map((c, i) => {
      const count = randomInRange(10, 100, seed + i + 4700);
      return {
        consumer: c.name,
        count,
        topError: errorTypes.downstream_delivery[i % errorTypes.downstream_delivery.length],
        percentOfTotal: Number(((count / totalExceptions) * 100).toFixed(1)),
      };
    }).sort((a, b) => b.count - a.count),
    exceptionTrend: dates.map((date, i) => {
      const validation = randomInRange(20, 80, seed + i + 4800);
      const fileTransport = randomInRange(5, 25, seed + i + 4801);
      const processing = randomInRange(2, 15, seed + i + 4802);
      const downstream = randomInRange(2, 12, seed + i + 4803);
      return {
        date,
        validation,
        fileTransport,
        processing,
        downstream,
        total: validation + fileTransport + processing + downstream,
      };
    }),
    repeatExceptionRate: randomFloat(15, 35, seed + 4900),
    totalExceptions,
    exceptionsThisPeriod: totalExceptions,
    exceptionsPreviousPeriod: previousPeriodExceptions,
    percentChange,
    exceptionsByCategory: [
      { category: 'validation' as const, label: 'Validation Errors', count: validationCount, percentage: (validationCount / totalExceptions) * 100 },
      { category: 'file_transport' as const, label: 'File Transport Errors', count: fileTransportCount, percentage: (fileTransportCount / totalExceptions) * 100 },
      { category: 'processing' as const, label: 'Processing Errors', count: processingCount, percentage: (processingCount / totalExceptions) * 100 },
      { category: 'downstream_delivery' as const, label: 'Downstream Delivery Errors', count: downstreamCount, percentage: (downstreamCount / totalExceptions) * 100 },
    ],
  };

  return {
    clientInsights,
    downstreamImpact,
    exceptions,
  };
};
