export interface WebVitalMetric {
  id: string;
  name: 'LCP' | 'FID' | 'CLS' | 'INP' | 'FCP' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  navigationType?: string;
}

export const VITALS_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000, unit: 'ms' },
  FID: { good: 100, poor: 300, unit: 'ms' },
  INP: { good: 200, poor: 500, unit: 'ms' },
  CLS: { good: 0.1, poor: 0.25, unit: '' },
  FCP: { good: 1800, poor: 3000, unit: 'ms' },
  TTFB: { good: 800, poor: 1800, unit: 'ms' },
} as const;

export function evaluateVitalRating(name: keyof typeof VITALS_THRESHOLDS, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = VITALS_THRESHOLDS[name];
  if (!threshold) return 'good';
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

export function reportMetric(metric: WebVitalMetric) {
  if (typeof window === 'undefined') return;

  // Development logger with formatted console badge
  if (process.env.NODE_ENV === 'development' || window.location.search.includes('vitals=1')) {
    const badgeColor = 
      metric.rating === 'good' ? '#16A34A' : 
      metric.rating === 'needs-improvement' ? '#D97706' : '#DC2626';

    const formattedValue = metric.name === 'CLS' 
      ? metric.value.toFixed(3) 
      : `${Math.round(metric.value)}ms`;

    console.log(
      `%c WebVital %c ${metric.name} %c ${formattedValue} (${metric.rating}) `,
      'background: #18181B; color: #fff; border-radius: 3px 0 0 3px; font-weight: bold; padding: 2px 4px;',
      `background: ${badgeColor}; color: #fff; font-weight: bold; padding: 2px 4px;`,
      'background: #F4F4F5; color: #18181B; border-radius: 0 3px 3px 0; padding: 2px 4px;'
    );
  }

  // Dispatches beacon to analytics endpoint if configured
  if (navigator.sendBeacon) {
    const body = JSON.stringify({
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
      page: window.location.pathname,
      timestamp: Date.now(),
    });
    // In production, can beacon to /api/analytics/vitals
  }
}

