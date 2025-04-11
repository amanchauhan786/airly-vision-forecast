
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, Thermometer, Droplets, Wind } from 'lucide-react';

interface WeatherCardProps {
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  location: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  temperature,
  humidity,
  windSpeed,
  windDirection,
  location
}) => {
  // Convert wind direction in degrees to cardinal direction
  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center">
          <span>Weather Conditions</span>
          <Cloud className="h-5 w-5 text-blue-400" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Thermometer className="h-5 w-5 text-red-400" />
            <div>
              <p className="text-sm font-medium">Temperature</p>
              <p className="text-lg font-semibold">{temperature}°C</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Droplets className="h-5 w-5 text-blue-400" />
            <div>
              <p className="text-sm font-medium">Humidity</p>
              <p className="text-lg font-semibold">{humidity}%</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Wind className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium">Wind</p>
              <p className="text-lg font-semibold">{windSpeed} km/h</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="h-5 w-5 flex items-center justify-center">
              <div 
                className="h-4 w-4 border border-gray-400 rounded-full flex items-center justify-center"
                style={{ transform: `rotate(${windDirection}deg)` }}
              >
                <div className="h-2 w-0.5 bg-gray-400 transform -translate-y-0.5"></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium">Direction</p>
              <p className="text-lg font-semibold">{getWindDirection(windDirection)}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
