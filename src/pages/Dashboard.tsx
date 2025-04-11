import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AQISummaryCard from '@/components/dashboard/AQISummaryCard';
import PollutantCard from '@/components/dashboard/PollutantCard';
import WeatherCard from '@/components/dashboard/WeatherCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, MapPin, Bell, Clock } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { 
  generateHourlyData, 
  generateStations,
  POLLUTANTS
} from '@/utils/air-quality-utils';

const Dashboard = () => {
  const [selectedStation, setSelectedStation] = useState(0);
  const [stations, setStations] = useState(generateStations());
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString());
  const [pollutantData, setPollutantData] = useState<Record<string, any>>({});

  useEffect(() => {
    const pollutants = Object.keys(POLLUTANTS);
    const data: Record<string, any> = {};
    
    pollutants.forEach(pollutant => {
      const key = pollutant as keyof typeof POLLUTANTS;
      const baseValue = stations[selectedStation].readings[key];
      data[key] = generateHourlyData(baseValue, baseValue * 0.4);
    });
    
    setPollutantData(data);
  }, [selectedStation, stations]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedStations = generateStations();
      setStations(updatedStations);
      setLastUpdated(new Date().toISOString());
      
      if (Math.random() > 0.7) {
        const randomStation = Math.floor(Math.random() * updatedStations.length);
        const pollutantKeys = Object.keys(POLLUTANTS);
        const randomPollutant = pollutantKeys[Math.floor(Math.random() * pollutantKeys.length)];
        const pollutantName = POLLUTANTS[randomPollutant as keyof typeof POLLUTANTS].name;
        
        if (updatedStations[randomStation].readings[randomPollutant as keyof typeof POLLUTANTS] > 100) {
          toast({
            title: `High ${pollutantName} levels detected at ${updatedStations[randomStation].name}`,
            description: "Consider reducing outdoor activities in this area.",
            icon: <Bell className="h-4 w-4" />,
          });
        }
      }
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const currentStation = stations[selectedStation];
  
  const calculateChange = (base: number) => {
    const changePercent = Math.random() > 0.5 ? Math.random() * 15 : -Math.random() * 15;
    return {
      value: changePercent.toFixed(1),
      isPositive: changePercent > 0
    };
  };

  const pm25Change = calculateChange(currentStation.readings.PM25);
  const ozoneChange = calculateChange(currentStation.readings.O3);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Air Quality Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor real-time air quality data and trends
          </p>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="text-muted-foreground h-4 w-4" />
          <Tabs defaultValue={selectedStation.toString()} className="w-[260px]">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="0" onClick={() => setSelectedStation(0)}>Station 1</TabsTrigger>
              <TabsTrigger value="1" onClick={() => setSelectedStation(1)}>Station 2</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AQISummaryCard 
          aqi={currentStation.aqi} 
          location={currentStation.name} 
          lastUpdated={lastUpdated}
        />
        
        <WeatherCard
          temperature={currentStation.weather.temp}
          humidity={currentStation.weather.humidity}
          windSpeed={currentStation.weather.windSpeed}
          windDirection={currentStation.weather.windDirection}
          location={currentStation.name}
        />
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Key Indicators</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">PM2.5 24h Trend</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{currentStation.readings.PM25}</span>
                  <Badge variant={pm25Change.isPositive ? "destructive" : "default"} className="h-5">
                    <span className="flex items-center text-xs">
                      {pm25Change.isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {pm25Change.value}%
                    </span>
                  </Badge>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Ozone 24h Trend</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold">{currentStation.readings.O3}</span>
                  <Badge variant={ozoneChange.isPositive ? "destructive" : "default"} className="h-5">
                    <span className="flex items-center text-xs">
                      {ozoneChange.isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {ozoneChange.value}%
                    </span>
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="bg-muted p-3 rounded-md flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <p className="text-xs text-muted-foreground">
                Last reading at {new Date(lastUpdated).toLocaleTimeString()}. Data updates every 30 seconds.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-semibold mt-6">Pollutant Levels</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.keys(currentStation.readings).map((key) => (
          <PollutantCard 
            key={key}
            pollutantKey={key as keyof typeof POLLUTANTS}
            value={currentStation.readings[key as keyof typeof currentStation.readings]}
            data={pollutantData[key] || []}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
