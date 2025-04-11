
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { generateHourlyData, generateDailyData, POLLUTANTS } from '@/utils/air-quality-utils';

const TimeSeries = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [selectedPollutants, setSelectedPollutants] = useState<string[]>(['PM25', 'O3']);
  const [data, setData] = useState<any[]>([]);

  // Generate time series data based on selected range
  useEffect(() => {
    let generatedData: any[] = [];
    const pollutants = Object.keys(POLLUTANTS);
    
    // Base values for each pollutant
    const baseValues: Record<string, number> = {
      PM25: 25,
      PM10: 40,
      O3: 35,
      NO2: 25,
      SO2: 10,
      CO: 0.8
    };
    
    if (timeRange === '24h') {
      // Generate hourly data for the last 24 hours
      const hours = 24;
      const timestamps = Array.from({ length: hours + 1 }, (_, i) => {
        const time = new Date();
        time.setHours(time.getHours() - (hours - i));
        return time.toISOString();
      });
      
      timestamps.forEach((timestamp, index) => {
        const hour = new Date(timestamp).getHours();
        const dataPoint: any = {
          time: hour + ':00',
          timestamp: timestamp
        };
        
        pollutants.forEach(pollutant => {
          const baseValue = baseValues[pollutant];
          // Apply diurnal pattern with random variation
          const hourFactor = Math.sin((hour + 6) * (Math.PI / 12)) * 0.5 + 0.5;
          const value = baseValue + (baseValue * 0.4 * hourFactor) + (Math.random() * baseValue * 0.2 - baseValue * 0.1);
          dataPoint[pollutant] = parseFloat(value.toFixed(1));
        });
        
        generatedData.push(dataPoint);
      });
    } else if (timeRange === '7d') {
      // Generate daily data for the last 7 days
      const days = 7;
      const timestamps = Array.from({ length: days + 1 }, (_, i) => {
        const time = new Date();
        time.setDate(time.getDate() - (days - i));
        return time.toISOString();
      });
      
      timestamps.forEach((timestamp) => {
        const date = new Date(timestamp);
        const day = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dataPoint: any = {
          time: day,
          timestamp: timestamp
        };
        
        pollutants.forEach(pollutant => {
          const baseValue = baseValues[pollutant];
          // Apply weekly pattern with random variation
          const dayFactor = Math.sin((date.getDay() + 3) * (Math.PI / 3.5)) * 0.3 + 0.7;
          const value = baseValue + (baseValue * 0.3 * dayFactor) + (Math.random() * baseValue * 0.3 - baseValue * 0.15);
          dataPoint[pollutant] = parseFloat(value.toFixed(1));
        });
        
        generatedData.push(dataPoint);
      });
    } else if (timeRange === '30d') {
      // Generate daily data for the last 30 days
      const days = 30;
      const timestamps = Array.from({ length: days + 1 }, (_, i) => {
        const time = new Date();
        time.setDate(time.getDate() - (days - i));
        return time.toISOString();
      });
      
      timestamps.forEach((timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const dataPoint: any = {
          time: `${day} ${month}`,
          timestamp: timestamp
        };
        
        pollutants.forEach(pollutant => {
          const baseValue = baseValues[pollutant];
          // Apply monthly pattern with random variation
          const monthFactor = Math.sin((day / 30) * Math.PI) * 0.3 + 0.7;
          const value = baseValue + (baseValue * 0.5 * monthFactor) + (Math.random() * baseValue * 0.4 - baseValue * 0.2);
          dataPoint[pollutant] = parseFloat(value.toFixed(1));
        });
        
        generatedData.push(dataPoint);
      });
    }
    
    setData(generatedData);
  }, [timeRange]);

  // Handle pollutant selection change
  const handlePollutantChange = (pollutant: string) => {
    setSelectedPollutants(prev => {
      if (prev.includes(pollutant)) {
        return prev.filter(p => p !== pollutant);
      } else {
        return [...prev, pollutant];
      }
    });
  };

  // Get color for each pollutant
  const getPollutantColor = (pollutant: string) => {
    const colors: Record<string, string> = {
      PM25: '#FF5722',
      PM10: '#FF9800',
      O3: '#4CAF50',
      NO2: '#2196F3',
      SO2: '#9C27B0',
      CO: '#795548'
    };
    return colors[pollutant] || '#000000';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Time Series Analysis</h1>
        <p className="text-muted-foreground">
          Analyze pollutant trends over time
        </p>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle>Pollutant Trends</CardTitle>
            <div className="flex flex-col sm:flex-row gap-2">
              <Tabs 
                defaultValue="24h" 
                value={timeRange}
                onValueChange={setTimeRange}
                className="w-full sm:w-auto"
              >
                <TabsList className="grid grid-cols-3 w-full sm:w-[300px]">
                  <TabsTrigger value="24h">24 Hours</TabsTrigger>
                  <TabsTrigger value="7d">7 Days</TabsTrigger>
                  <TabsTrigger value="30d">30 Days</TabsTrigger>
                </TabsList>
              </Tabs>

              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Pollutants" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(POLLUTANTS).map(([key, pollutant]) => (
                    <SelectItem 
                      key={key} 
                      value={key}
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: getPollutantColor(key) }}
                        ></div>
                        <span>{pollutant.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[450px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Object.keys(POLLUTANTS).map(pollutant => (
                  <Line
                    key={pollutant}
                    type="monotone"
                    dataKey={pollutant}
                    name={POLLUTANTS[pollutant as keyof typeof POLLUTANTS].name}
                    stroke={getPollutantColor(pollutant)}
                    dot={false}
                    strokeWidth={2}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Patterns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-secondary/50 rounded-lg">
              <h3 className="font-semibold mb-2">Key Observations</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Particulate matter (PM10 and PM2.5) peaks during early mornings due to temperature inversions</li>
                <li>Ozone levels rise in the afternoon with increased sunlight and temperature</li>
                <li>Nitrogen dioxide (NO₂) shows peaks during morning and evening rush hours</li>
                <li>Sulfur dioxide (SO₂) levels correlate with industrial activity periods</li>
                <li>Carbon monoxide (CO) follows traffic patterns with morning and evening peaks</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Meteorological Influences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-secondary/50 rounded-lg">
              <h3 className="font-semibold mb-2">Identified Influences</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Temperature inversions trap pollutants near the ground, especially in early morning</li>
                <li>Wind speed demonstrates strong negative correlation with pollutant concentration</li>
                <li>Humidity affects particulate matter levels through hygroscopic growth</li>
                <li>Solar radiation drives photochemical reactions, influencing ozone formation</li>
                <li>Precipitation events provide temporary reductions in particulate concentrations</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TimeSeries;
