
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { getAQICategory } from '@/utils/air-quality-utils';

interface AQISummaryCardProps {
  aqi: number;
  location: string;
  lastUpdated: string;
}

const AQISummaryCard: React.FC<AQISummaryCardProps> = ({ aqi, location, lastUpdated }) => {
  const aqiCategory = getAQICategory(aqi);
  const formattedTime = new Date(lastUpdated).toLocaleTimeString();
  
  // Determine progress color based on AQI
  const getProgressColor = () => {
    if (aqi <= 50) return 'bg-aqi-good';
    if (aqi <= 100) return 'bg-aqi-moderate';
    if (aqi <= 200) return 'bg-aqi-unhealthy';
    if (aqi <= 300) return 'bg-aqi-very-unhealthy';
    return 'bg-aqi-hazardous';
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className={cn("pb-2", aqi > 150 && "animate-pulse-slow")}>
        <CardTitle className="flex justify-between items-center">
          <span>Air Quality Index</span>
          <span className={cn(
            "text-xl font-bold py-1 px-3 rounded-full",
            aqi <= 50 && "bg-aqi-good/20 text-aqi-good",
            aqi > 50 && aqi <= 100 && "bg-aqi-moderate/20 text-aqi-moderate",
            aqi > 100 && aqi <= 200 && "bg-aqi-unhealthy/20 text-aqi-unhealthy",
            aqi > 200 && aqi <= 300 && "bg-aqi-very-unhealthy/20 text-aqi-very-unhealthy",
            aqi > 300 && "bg-aqi-hazardous/20 text-aqi-hazardous",
          )}>
            {aqi}
          </span>
        </CardTitle>
        <CardDescription>
          {location} • Updated at {formattedTime}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-2 mb-4">
          <Progress value={Math.min((aqi / 5), 100)} className={cn("h-2", getProgressColor())} />
        </div>
        <div className="bg-secondary p-3 rounded-md">
          <div className="text-lg font-semibold mb-1">{aqiCategory.label}</div>
          <p className="text-sm text-muted-foreground">{aqiCategory.description}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AQISummaryCard;
