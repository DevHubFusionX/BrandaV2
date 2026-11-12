'use client';

import React, { useState, useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';
import { Activity, ChevronUp, ChevronDown, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { reportMetric, WebVitalMetric, evaluateVitalRating } from '@/lib/analytics/web-vitals';

export function WebVitals() {
  const [metrics, setMetrics] = useState<Record<string, WebVitalMetric>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show in dev mode or if URL parameter `?vitals=1` is provided
    if (process.env.NODE_ENV === 'development' || window.location.search.includes('vitals=1')) {
      setIsVisible(true);
    }
  }, []);

  useReportWebVitals((metric) => {
    const vitalMetric: WebVitalMetric = {
      id: metric.id,
      name: metric.name as any,
      value: metric.value,
      rating: metric.rating || evaluateVitalRating(metric.name as any, metric.value),
      delta: metric.delta,
      navigationType: (metric as any).navigationType,
    };

    reportMetric(vitalMetric);

    setMetrics((prev) => ({
      ...prev,
      [metric.name]: vitalMetric,
    }));
  });

  if (!isVisible) return null;

  const getStatusIcon = (rating?: string) => {
    if (rating === 'good') return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
    if (rating === 'needs-improvement') return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
    if (rating === 'poor') return <AlertCircle className="w-3.5 h-3.5 text-rose-500" />;
    return <div className="w-2 h-2 rounded-full bg-neutral-300" />;
  };

  const getBadgeClass = (rating?: string) => {
    if (rating === 'good') return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (rating === 'needs-improvement') return 'bg-amber-50 text-amber-700 border-amber-200';
    if (rating === 'poor') return 'bg-rose-50 text-rose-700 border-rose-200';
    return 'bg-neutral-50 text-neutral-600 border-neutral-200';
  };

  const vitalKeys = ['LCP', 'CLS', 'INP', 'FCP', 'TTFB'];

  return (
    <div className="fixed bottom-4 left-4 z-50 font-sans text-xs">
      {isOpen ? (
        <div className="bg-white/95 backdrop-blur-md border border-neutral-200 rounded-xl shadow-xl w-72 p-3.5 space-y-3 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
            <div className="flex items-center gap-1.5 font-bold text-neutral-900">
              <Activity className="w-4 h-4 text-[#0066FF]" />
              <span>Core Web Vitals HUD</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-neutral-400 hover:text-black p-0.5"
              aria-label="Collapse HUD"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5">
            {vitalKeys.map((key) => {
              const m = metrics[key];
              const valueDisplay = m
                ? key === 'CLS'
                  ? m.value.toFixed(3)
                  : `${Math.round(m.value)} ms`
                : 'Measuring...';

              return (
                <div
                  key={key}
                  className="flex items-center justify-between py-1 px-2 rounded-md hover:bg-neutral-50"
                >
                  <div className="flex items-center gap-2">
                    {getStatusIcon(m?.rating)}
                    <span className="font-semibold text-neutral-800">{key}</span>
                  </div>
                  <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded border ${getBadgeClass(m?.rating)}`}>
                    {valueDisplay}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="pt-1 text-[10px] text-neutral-400 border-t border-neutral-100 flex items-center justify-between">
            <span>Next.js App Router</span>
            <span className="text-[#0066FF] font-medium">Branda V2</span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-neutral-900/90 backdrop-blur-xs text-white px-3 py-1.5 rounded-full border border-neutral-800 shadow-md flex items-center gap-2 hover:bg-black transition-colors"
          title="Inspect Core Web Vitals"
        >
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-bold tracking-tight">Vitals</span>
          <ChevronUp className="w-3 h-3 text-neutral-400" />
        </button>
      )}
    </div>
  );
}

