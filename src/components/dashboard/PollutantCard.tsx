
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { POLLUTANTS, getImpactLevel } from '@/utils/air-quality-utils';
import { BarChart2 } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip 
} from 'recharts';

interface PollutantCardProps {
  pollutantKey: keyof typeof POLLUTANTS;
  value: number;
  data: Array<{time: string, value: number | string}>;
}

const PollutantCard: React.FC<PollutantCardProps> = ({ pollutantKey, value, data }) => {
  const pollutant = POLLUTANTS[pollutantKey];
  const impact = getImpactLevel(pollutantKey, value);

  // Calculate percent for progress bar
  const calculateProgressPercent = () => {
    const maxValue = impact.range[1] * 1.5; // Use 1.5x the max range value as reference
    return Math.min((value / maxValue) * 100, 100);
  };

  // Determine color based on impact level
  const getColorClass = () => {
    switch(impact.level) {
      case 'Low': return 'bg-aqi-good';
      case 'Moderate': return 'bg-aqi-moderate';
      case 'High': return 'bg-aqi-unhealthy';
      case 'Very High': return 'bg-aqi-very-unhealthy';
      case 'Extremely High': return 'bg-aqi-hazardous';
      default: return 'bg-gray-500';
    }
  };

  // Format chart data
  const chartData = data.map(item => ({
    time: new Date(item.time).getHours() + ':00',
    value: typeof item.value === 'string' ? parseFloat(item.value) : item.value
  }));

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base flex justify-between items-center">
          <span>{pollutant.name}</span>
          <span className="font-bold">{value} {pollutant.unit}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-2 mb-4">
          <div className="flex justify-between text-xs mb-1">
            <span>{impact.level}</span>
            <span>{impact.range[0]} - {impact.range[1]} {pollutant.unit}</span>
          </div>
          <Progress value={calculateProgressPercent()} className={cn("h-2", getColorClass())} />
        </div>
        
        <div className="h-32 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id={`gradient-${pollutantKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getColorClass().replace('bg-', 'var(--)')} stopOpacity={0.8}/>
                  <stop offset="95%" stopColor={getColorClass().replace('bg-', 'var(--)')} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" tick={{fontSize: 10}} interval={4} />
              <YAxis hide domain={['dataMin', 'auto']} />
              <Tooltip contentStyle={{ fontSize: '12px' }} />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke={getColorClass().replace('bg-', 'var(--)')} 
                fillOpacity={1} 
                fill={`url(#gradient-${pollutantKey})`} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PollutantCard;
