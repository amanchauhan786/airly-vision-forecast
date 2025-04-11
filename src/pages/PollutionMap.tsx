
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { generateStations, POLLUTANTS, getAQICategory } from '@/utils/air-quality-utils';
import { MapPin, Wind, Thermometer, Droplets } from 'lucide-react';

// Simulated map stations
const stations = generateStations();

const PollutionMap = () => {
  const [selectedPollutant, setSelectedPollutant] = useState<string>('AQI');
  const [selectedStation, setSelectedStation] = useState<number | null>(null);

  // Get color based on value and pollutant
  const getPinColor = (station: any, pollutant: string) => {
    if (pollutant === 'AQI') {
      const aqi = station.aqi;
      if (aqi <= 50) return 'bg-aqi-good';
      if (aqi <= 100) return 'bg-aqi-moderate';
      if (aqi <= 150) return 'bg-aqi-unhealthy';
      if (aqi <= 300) return 'bg-aqi-very-unhealthy';
      return 'bg-aqi-hazardous';
    } else {
      const value = station.readings[pollutant];
      // Simplified color logic for pollutants
      if (pollutant === 'PM25') {
        if (value <= 12) return 'bg-aqi-good';
        if (value <= 35) return 'bg-aqi-moderate';
        if (value <= 55) return 'bg-aqi-unhealthy';
        if (value <= 150) return 'bg-aqi-very-unhealthy';
        return 'bg-aqi-hazardous';
      } else if (pollutant === 'PM10') {
        if (value <= 54) return 'bg-aqi-good';
        if (value <= 154) return 'bg-aqi-moderate';
        if (value <= 254) return 'bg-aqi-unhealthy';
        if (value <= 354) return 'bg-aqi-very-unhealthy';
        return 'bg-aqi-hazardous';
      } else if (pollutant === 'O3') {
        if (value <= 54) return 'bg-aqi-good';
        if (value <= 70) return 'bg-aqi-moderate';
        if (value <= 85) return 'bg-aqi-unhealthy';
        if (value <= 105) return 'bg-aqi-very-unhealthy';
        return 'bg-aqi-hazardous';
      }
      // Default for other pollutants
      return 'bg-aqi-moderate';
    }
  };

  // Get the value to display based on selected pollutant
  const getDisplayValue = (station: any, pollutant: string) => {
    if (pollutant === 'AQI') {
      return station.aqi;
    } else {
      return station.readings[pollutant];
    }
  };

  // Get a station by its id
  const getStationById = (id: number) => {
    return stations.find(station => station.id === id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pollution Map</h1>
        <p className="text-muted-foreground">
          Visualize pollution hotspots and meteorological overlays
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle>Pollution Hotspots</CardTitle>
                <Select 
                  defaultValue="AQI" 
                  onValueChange={setSelectedPollutant}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select Pollutant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AQI">Air Quality Index</SelectItem>
                    {Object.entries(POLLUTANTS).map(([key, pollutant]) => (
                      <SelectItem key={key} value={key}>
                        {pollutant.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-[400px] bg-secondary/30 rounded-lg mt-4 overflow-hidden">
                {/* Simple map placeholder with markers */}
                <div className="absolute inset-0 bg-gray-200 rounded-lg">
                  {/* This would be replaced with a real map component */}
                  <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] bg-repeat">
                    {/* Placement of station pins on the map */}
                    {stations.map((station) => (
                      <div 
                        key={station.id}
                        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                        style={{ 
                          left: `${(station.lng + 118.35) * 600}px`, 
                          top: `${(34.15 - station.lat) * 600}px`
                        }}
                        onClick={() => setSelectedStation(station.id)}
                      >
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold ${getPinColor(station, selectedPollutant)}`}>
                            {getDisplayValue(station, selectedPollutant)}
                          </div>
                          <div className="text-xs font-medium mt-1">{station.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map legend */}
                <div className="absolute bottom-4 right-4 bg-white p-3 rounded-md shadow-md">
                  <h4 className="text-sm font-semibold mb-1">Legend</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-aqi-good"></div>
                      <span className="text-xs">Good</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-aqi-moderate"></div>
                      <span className="text-xs">Moderate</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-aqi-unhealthy"></div>
                      <span className="text-xs">Unhealthy</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-aqi-very-unhealthy"></div>
                      <span className="text-xs">Very Unhealthy</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-aqi-hazardous"></div>
                      <span className="text-xs">Hazardous</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Station Details</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedStation ? (
                <>
                  {(() => {
                    const station = getStationById(selectedStation);
                    if (!station) return <p>Station not found</p>;
                    
                    const aqiCategory = getAQICategory(station.aqi);
                    return (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          <h3 className="text-lg font-semibold">{station.name}</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-secondary/50 p-2 rounded-lg">
                            <div className="text-xs text-muted-foreground">AQI</div>
                            <div className="text-lg font-semibold">{station.aqi}</div>
                            <Badge className={`mt-1 ${getPinColor(station, 'AQI')}`}>
                              {aqiCategory.label}
                            </Badge>
                          </div>
                          
                          <div className="bg-secondary/50 p-2 rounded-lg">
                            <div className="text-xs text-muted-foreground">PM2.5</div>
                            <div className="text-lg font-semibold">{station.readings.PM25} µg/m³</div>
                          </div>
                          
                          <div className="bg-secondary/50 p-2 rounded-lg">
                            <div className="text-xs text-muted-foreground">PM10</div>
                            <div className="text-lg font-semibold">{station.readings.PM10} µg/m³</div>
                          </div>
                          
                          <div className="bg-secondary/50 p-2 rounded-lg">
                            <div className="text-xs text-muted-foreground">O₃</div>
                            <div className="text-lg font-semibold">{station.readings.O3} ppb</div>
                          </div>
                        </div>
                        
                        <div className="pt-3 border-t">
                          <h4 className="text-sm font-semibold mb-2">Weather Conditions</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="flex items-center gap-2">
                              <Thermometer className="h-4 w-4 text-red-400" />
                              <div>
                                <div className="text-xs text-muted-foreground">Temperature</div>
                                <div className="font-medium">{station.weather.temp}°C</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Droplets className="h-4 w-4 text-blue-400" />
                              <div>
                                <div className="text-xs text-muted-foreground">Humidity</div>
                                <div className="font-medium">{station.weather.humidity}%</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Wind className="h-4 w-4 text-gray-400" />
                              <div>
                                <div className="text-xs text-muted-foreground">Wind</div>
                                <div className="font-medium">{station.weather.windSpeed} km/h</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-[300px]">
                  <MapPin className="h-10 w-10 text-muted mb-2" />
                  <p className="text-lg font-medium">Select a station</p>
                  <p className="text-sm text-muted-foreground">Click on a pin on the map to view detailed information</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PollutionMap;
