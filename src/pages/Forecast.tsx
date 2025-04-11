
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { generateForecastData, POLLUTANTS, getAQICategory } from '@/utils/air-quality-utils';
import { AlertCircle, Cloud, Droplets, Thermometer, Wind } from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

const Forecast = () => {
  const [pollutant, setPollutant] = useState('PM25');
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [confidenceLevel, setConfidenceLevel] = useState(85);
  
  // Generate forecast data
  useEffect(() => {
    const generateData = () => {
      const currentValue = Math.floor(Math.random() * 30) + 15; // Random starting value
      const data = generateForecastData(currentValue, currentValue * 0.5);
      
      // Process data for chart display
      const processed = data.map(item => {
        const date = new Date(item.time);
        const value = parseFloat(item.value);
        
        // Add confidence intervals (simulated)
        const lowerBound = Math.max(0, value - (value * (100 - confidenceLevel) / 200));
        const upperBound = value + (value * (100 - confidenceLevel) / 200);
        
        return {
          time: date.getHours() + ':00',
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          fullDate: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
          value: parseFloat(value.toFixed(1)),
          lowerBound: parseFloat(lowerBound.toFixed(1)),
          upperBound: parseFloat(upperBound.toFixed(1)),
          timestamp: item.time
        };
      });
      
      setForecastData(processed);
    };
    
    generateData();
  }, [pollutant, confidenceLevel]);

  // Get color for pollutant
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

  // Get threshold line value based on pollutant
  const getThresholdValue = (pollutant: string) => {
    const thresholds: Record<string, number> = {
      PM25: 35, // Moderate to Unhealthy for Sensitive Groups
      PM10: 150, // Moderate to Unhealthy for Sensitive Groups
      O3: 70, // Moderate to Unhealthy for Sensitive Groups
      NO2: 100, // Moderate to Unhealthy for Sensitive Groups
      SO2: 75, // Moderate to Unhealthy for Sensitive Groups
      CO: 9.4 // Moderate to Unhealthy for Sensitive Groups
    };
    return thresholds[pollutant] || 50;
  };

  // Group data by day for the chart
  const groupedByDay = forecastData.reduce((groups, item) => {
    if (!groups[item.day]) {
      groups[item.day] = [];
    }
    groups[item.day].push(item);
    return groups;
  }, {});

  // Calculate average values for each day (for the summary)
  const dailyAverages = Object.entries(groupedByDay).map(([day, items]: [string, any[]]) => {
    const values = items.map(item => item.value);
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const max = Math.max(...values);
    
    return {
      day,
      average: parseFloat(avg.toFixed(1)),
      max: parseFloat(max.toFixed(1))
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Air Pollution Forecaster</h1>
        <p className="text-muted-foreground">
          Forecast air quality using machine learning predictions
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Pollution Forecast</CardTitle>
                  <CardDescription>5-day forecast with confidence intervals</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select 
                    defaultValue="PM25" 
                    onValueChange={setPollutant}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Select Pollutant" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(POLLUTANTS).map(([key, pollutant]) => (
                        <SelectItem key={key} value={key}>
                          {pollutant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] mt-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={forecastData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="time" 
                      ticks={[0, 6, 12, 18, 0, 6, 12, 18]} 
                      tickFormatter={(value, index) => {
                        const hour = parseInt(value.split(':')[0]);
                        // Display day name at midnight
                        if (hour === 0 && index > 0) {
                          const dayIndex = Math.floor(index / 8);
                          return dailyAverages[dayIndex]?.day || '';
                        }
                        return hour + 'h';
                      }}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(label, items) => {
                        const item = items[0]?.payload;
                        if (item) {
                          return `${item.fullDate} ${label}`;
                        }
                        return label;
                      }}
                      formatter={(value, name) => {
                        if (name === 'Confidence Interval') return ['', ''];
                        const unit = POLLUTANTS[pollutant]?.unit || '';
                        return [`${value} ${unit}`, name];
                      }}
                    />
                    <Legend />
                    
                    {/* Threshold line */}
                    <ReferenceLine 
                      y={getThresholdValue(pollutant)} 
                      label="Threshold" 
                      stroke="red" 
                      strokeDasharray="3 3" 
                    />
                    
                    {/* Confidence interval area */}
                    <Line
                      name="Confidence Interval"
                      dataKey="upperBound"
                      stroke="transparent"
                      fill="transparent"
                    />
                    <Line
                      name="Confidence Interval"
                      dataKey="lowerBound"
                      stroke="transparent"
                      fill={`${getPollutantColor(pollutant)}20`} // Light fill
                      fillOpacity={0.3}
                    />
                    
                    {/* Main line */}
                    <Line
                      name={POLLUTANTS[pollutant as keyof typeof POLLUTANTS]?.name || pollutant}
                      type="monotone"
                      dataKey="value"
                      stroke={getPollutantColor(pollutant)}
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm">Model Confidence:</span>
                <Progress value={confidenceLevel} className="h-2 flex-1" />
                <span className="text-sm font-medium">{confidenceLevel}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Forecast Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-secondary/50 p-3 rounded-lg">
                  <h3 className="text-sm font-semibold mb-2 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    <span>Alert Prediction</span>
                  </h3>
                  
                  {dailyAverages.some(day => day.max > getThresholdValue(pollutant)) ? (
                    <p className="text-sm">
                      Based on our forecast model, there is a high probability of exceeding recommended thresholds for {POLLUTANTS[pollutant as keyof typeof POLLUTANTS]?.name} in the next 5 days.
                    </p>
                  ) : (
                    <p className="text-sm">
                      No threshold violations expected for {POLLUTANTS[pollutant as keyof typeof POLLUTANTS]?.name} in the upcoming 5-day forecast period.
                    </p>
                  )}
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-2">5-Day Forecast Summary</h3>
                  <div className="space-y-2">
                    {dailyAverages.map((day, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-secondary/30 rounded-md">
                        <div className="font-medium">{day.day}</div>
                        <div className="text-sm">
                          <span className="mr-1">Avg:</span>
                          <span className="font-semibold">{day.average}</span>
                          <span className="mx-1">|</span>
                          <span className="mr-1">Max:</span>
                          <span className={`font-semibold ${day.max > getThresholdValue(pollutant) ? 'text-red-500' : ''}`}>
                            {day.max}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <h3 className="text-sm font-semibold mb-2">Meteorological Forecast</h3>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center bg-secondary/30 p-2 rounded-md">
                      <Thermometer className="h-5 w-5 text-red-400 mb-1" />
                      <div className="text-xs text-muted-foreground">Temperature</div>
                      <div className="font-medium text-sm">23°C</div>
                    </div>
                    
                    <div className="flex flex-col items-center bg-secondary/30 p-2 rounded-md">
                      <Droplets className="h-5 w-5 text-blue-400 mb-1" />
                      <div className="text-xs text-muted-foreground">Humidity</div>
                      <div className="font-medium text-sm">65%</div>
                    </div>
                    
                    <div className="flex flex-col items-center bg-secondary/30 p-2 rounded-md">
                      <Wind className="h-5 w-5 text-gray-400 mb-1" />
                      <div className="text-xs text-muted-foreground">Wind</div>
                      <div className="font-medium text-sm">12 km/h</div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <h3 className="text-sm font-semibold mb-2">Model Information</h3>
                  <p className="text-xs text-muted-foreground">
                    Predictions based on Random Forest and Neural Network models trained on historical pollutant and meteorological data. Confidence intervals represent the model's uncertainty range.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Forecast;
