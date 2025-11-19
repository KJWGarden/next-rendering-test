"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const baseMetrics = [
  { method: "CSR", TTFB: 20, FCP: 0.2, LCP: 1.8, TBT: 110 },
  { method: "SSR", TTFB: 20, FCP: 0.3, LCP: 1.3, TBT: 0 },
  { method: "SSG", TTFB: 20, FCP: 0.3, LCP: 1.5, TBT: 0 },
  { method: "ISR", TTFB: 20, FCP: 0.3, LCP: 1.4, TBT: 0 },
];

const increasedDataMetrics = [
  { method: "CSR", TTFB: 20, FCP: 0.2, LCP: 1.6, TBT: 180 },
  { method: "SSR", TTFB: 20, FCP: 0.3, LCP: 1.0, TBT: 0 },
  { method: "ISR", TTFB: 20, FCP: 0.3, LCP: 1.0, TBT: 10 },
];

const network3G = [
  { method: "CSR", LCP: 13.88 },
  { method: "SSR", LCP: 4.66 },
  { method: "SSG", LCP: 4.27 },
  { method: "ISR", LCP: 4.29 },
];

export default function RenderingChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 0);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full space-y-12">
        <h2 className="text-xl font-bold">렌더링 방식별 성능 비교</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white rounded-2xl shadow p-6">
            <div className="h-[300px] flex items-center justify-center text-gray-400">
              차트 로딩 중...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-12">
      <h2 className="text-xl font-bold">렌더링 방식별 성능 비교</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <MetricCard title="LCP (Largest Contentful Paint)">
          <Chart data={baseMetrics} metricKey="LCP" />
        </MetricCard>

        <MetricCard title="FCP (First Contentful Paint)">
          <Chart data={baseMetrics} metricKey="FCP" />
        </MetricCard>

        <MetricCard title="TBT (Total Blocking Time)">
          <Chart data={baseMetrics} metricKey="TBT" />
        </MetricCard>

        <MetricCard title="TTFB (Time To First Byte)">
          <Chart data={baseMetrics} metricKey="TTFB" />
        </MetricCard>
      </div>

      <h2 className="text-xl font-bold pt-8">데이터 증가 후 (1000 → 1500개)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <MetricCard title="LCP 증가 비교">
          <Chart data={increasedDataMetrics} metricKey="LCP" />
        </MetricCard>

        <MetricCard title="TBT 증가 비교">
          <Chart data={increasedDataMetrics} metricKey="TBT" />
        </MetricCard>
      </div>

      <h2 className="text-xl font-bold pt-8">Network: Slow 3G (LCP)</h2>
      <MetricCard title="3G 환경 LCP 비교">
        <Chart data={network3G} metricKey="LCP" />
      </MetricCard>
    </div>
  );
}

interface MetricCardProps {
  title: string;
  children: React.ReactNode;
}

function MetricCard({ title, children }: MetricCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h3 className="font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

interface ChartData {
  method: string;
  FCP?: number;
  LCP?: number;
  TBT?: number;
  TTFB?: number;
  [key: string]: string | number | undefined;
}

interface ChartProps {
  data: ChartData[];
  metricKey: keyof ChartData;
}

// 각 메트릭의 단위 매핑
const metricUnits: Record<string, string> = {
  LCP: "s",
  FCP: "s",
  TBT: "ms",
  TTFB: "ms",
};

function Chart({ data, metricKey }: ChartProps) {
  const unit = metricUnits[metricKey as string] || "";
  const metricName = metricKey as string;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="method" />
        <YAxis
          label={{
            value: `${metricName} (${unit})`,
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip
          formatter={(value: number) => [`${value} ${unit}`, metricName]}
        />
        <Legend formatter={() => `${metricName} (${unit})`} />
        <Bar dataKey={metricKey} fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
}
