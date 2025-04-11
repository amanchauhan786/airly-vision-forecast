
// Air Quality Index categories
export const AQI_CATEGORIES = {
  GOOD: { range: [0, 50], label: 'Good', color: 'aqi-good', description: 'Air quality is satisfactory, and air pollution poses little or no risk.' },
  MODERATE: { range: [51, 100], label: 'Moderate', color: 'aqi-moderate', description: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.' },
  UNHEALTHY_SENSITIVE: { range: [101, 150], label: 'Unhealthy for Sensitive Groups', color: 'aqi-unhealthy', description: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.' },
  UNHEALTHY: { range: [151, 200], label: 'Unhealthy', color: 'aqi-unhealthy', description: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.' },
  VERY_UNHEALTHY: { range: [201, 300], label: 'Very Unhealthy', color: 'aqi-very-unhealthy', description: 'Health alert: The risk of health effects is increased for everyone.' },
  HAZARDOUS: { range: [301, 500], label: 'Hazardous', color: 'aqi-hazardous', description: 'Health warning of emergency conditions: everyone is more likely to be affected.' }
};

// Function to determine AQI category based on value
export const getAQICategory = (value: number) => {
  if (value <= 50) return AQI_CATEGORIES.GOOD;
  if (value <= 100) return AQI_CATEGORIES.MODERATE;
  if (value <= 150) return AQI_CATEGORIES.UNHEALTHY_SENSITIVE;
  if (value <= 200) return AQI_CATEGORIES.UNHEALTHY;
  if (value <= 300) return AQI_CATEGORIES.VERY_UNHEALTHY;
  return AQI_CATEGORIES.HAZARDOUS;
};

// Pollutant information
export const POLLUTANTS = {
  PM25: { name: 'PM2.5', unit: 'μg/m³', description: 'Fine particulate matter with diameter < 2.5μm' },
  PM10: { name: 'PM10', unit: 'μg/m³', description: 'Particulate matter with diameter < 10μm' },
  O3: { name: 'O₃', unit: 'ppb', description: 'Ozone' },
  NO2: { name: 'NO₂', unit: 'ppb', description: 'Nitrogen dioxide' },
  SO2: { name: 'SO₂', unit: 'ppb', description: 'Sulfur dioxide' },
  CO: { name: 'CO', unit: 'ppm', description: 'Carbon monoxide' }
};

// Health impact of different pollutants
export const HEALTH_IMPACTS = {
  PM25: [
    { level: 'Low', range: [0, 12], impact: 'Generally safe for most people.' },
    { level: 'Moderate', range: [12.1, 35.4], impact: 'Unusually sensitive individuals may experience respiratory symptoms.' },
    { level: 'High', range: [35.5, 55.4], impact: 'People with respiratory or heart disease, the elderly and children should limit prolonged exertion.' },
    { level: 'Very High', range: [55.5, 150.4], impact: 'Everyone may begin to experience health effects; sensitive groups may experience more serious effects.' },
    { level: 'Extremely High', range: [150.5, 500], impact: 'Health warnings of emergency conditions. Everyone is likely to be affected.' }
  ],
  PM10: [
    { level: 'Low', range: [0, 54], impact: 'Generally safe for most people.' },
    { level: 'Moderate', range: [55, 154], impact: 'Unusually sensitive individuals may experience respiratory symptoms.' },
    { level: 'High', range: [155, 254], impact: 'People with respiratory disease should limit outdoor exertion.' },
    { level: 'Very High', range: [255, 354], impact: 'Everyone should limit outdoor exertion.' },
    { level: 'Extremely High', range: [355, 500], impact: 'Everyone should avoid outdoor activities.' }
  ],
  O3: [
    { level: 'Low', range: [0, 54], impact: 'Generally safe for most people.' },
    { level: 'Moderate', range: [55, 70], impact: 'Unusually sensitive individuals may experience respiratory symptoms.' },
    { level: 'High', range: [71, 85], impact: 'People with respiratory disease should limit outdoor exertion.' },
    { level: 'Very High', range: [86, 105], impact: 'Children, active adults, and people with respiratory disease should limit prolonged outdoor exertion.' },
    { level: 'Extremely High', range: [106, 200], impact: 'Everyone should avoid outdoor exertion.' }
  ],
  NO2: [
    { level: 'Low', range: [0, 53], impact: 'Generally safe for most people.' },
    { level: 'Moderate', range: [54, 100], impact: 'Unusually sensitive individuals may experience respiratory symptoms.' },
    { level: 'High', range: [101, 360], impact: 'Children and people with respiratory disease should limit outdoor exertion.' },
    { level: 'Very High', range: [361, 649], impact: 'Children and people with respiratory disease should avoid outdoor exertion.' },
    { level: 'Extremely High', range: [650, 1000], impact: 'Everyone should avoid outdoor exertion.' }
  ],
  SO2: [
    { level: 'Low', range: [0, 35], impact: 'Generally safe for most people.' },
    { level: 'Moderate', range: [36, 75], impact: 'Unusually sensitive individuals may experience respiratory symptoms.' },
    { level: 'High', range: [76, 185], impact: 'People with respiratory disease should limit outdoor exertion.' },
    { level: 'Very High', range: [186, 304], impact: 'Children, asthmatics, and people with heart or lung disease should limit outdoor exertion.' },
    { level: 'Extremely High', range: [305, 500], impact: 'Everyone should avoid outdoor exertion.' }
  ],
  CO: [
    { level: 'Low', range: [0, 4.4], impact: 'Generally safe for most people.' },
    { level: 'Moderate', range: [4.5, 9.4], impact: 'Unusually sensitive individuals may experience cardiovascular effects.' },
    { level: 'High', range: [9.5, 12.4], impact: 'People with cardiovascular disease should limit heavy exertion and avoid sources of CO.' },
    { level: 'Very High', range: [12.5, 15.4], impact: 'Everyone should limit heavy exertion; people with cardiovascular disease should stay indoors.' },
    { level: 'Extremely High', range: [15.5, 50], impact: 'Health warnings of emergency conditions. Everyone is likely to be affected.' }
  ]
};

// Function to get impact level based on pollutant and value
export const getImpactLevel = (pollutant: keyof typeof POLLUTANTS, value: number) => {
  const impacts = HEALTH_IMPACTS[pollutant];
  for (const impact of impacts) {
    if (value >= impact.range[0] && value <= impact.range[1]) {
      return impact;
    }
  }
  return impacts[impacts.length - 1]; // Return highest impact if out of range
};

// Get random value between min and max
export const getRandomValue = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Get random trend data for the last 24 hours
export const generateHourlyData = (baseMean: number, variance: number, hoursBack = 24) => {
  const data = [];
  const now = new Date();
  
  for (let i = hoursBack; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    // Add daily pattern: higher in morning and evening, lower in afternoon
    const hourFactor = Math.sin((time.getHours() + 6) * (Math.PI / 12)) * 0.5 + 0.5;
    const value = baseMean + (variance * hourFactor) + getRandomValue(-variance/4, variance/4);
    
    data.push({
      time: time.toISOString(),
      value: Math.max(0, value.toFixed(1))
    });
  }
  
  return data;
};

// Generate daily data for past month
export const generateDailyData = (baseMean: number, variance: number, daysBack = 30) => {
  const data = [];
  const now = new Date();
  
  for (let i = daysBack; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    // Add weekly pattern
    const dayFactor = Math.sin((time.getDay() + 3) * (Math.PI / 3.5)) * 0.3 + 0.7;
    const value = baseMean + (variance * dayFactor) + getRandomValue(-variance/3, variance/3);
    
    data.push({
      time: time.toISOString(),
      value: Math.max(0, value.toFixed(1))
    });
  }
  
  return data;
};

// Generate forecast data for next 5 days
export const generateForecastData = (currentValue: number, variance: number, daysAhead = 5) => {
  const data = [];
  const now = new Date();
  
  // Add slightly increasing trend for forecast with daily patterns
  for (let i = 0; i <= daysAhead * 24; i += 3) { // 3-hour intervals
    const time = new Date(now.getTime() + i * 60 * 60 * 1000);
    const dayTrend = (i / 24) * (variance / 4); // Slight upward trend
    const hourFactor = Math.sin((time.getHours() + 6) * (Math.PI / 12)) * 0.6 + 0.4;
    
    const value = parseFloat(currentValue) + dayTrend + (variance * hourFactor) + getRandomValue(-variance/3, variance/3);
    
    data.push({
      time: time.toISOString(),
      value: Math.max(0, value.toFixed(1))
    });
  }
  
  return data;
};

// Generate mock station data
export const generateStations = () => {
  const stationLocations = [
    { id: 1, name: 'Downtown', lat: 34.052235, lng: -118.243683 },
    { id: 2, name: 'East Side', lat: 34.061899, lng: -118.210014 },
    { id: 3, name: 'North Hills', lat: 34.098009, lng: -118.268550 },
    { id: 4, name: 'West Valley', lat: 34.072201, lng: -118.330195 },
    { id: 5, name: 'South Bay', lat: 34.021633, lng: -118.289871 },
    { id: 6, name: 'Industrial Zone', lat: 34.036620, lng: -118.193245 },
    { id: 7, name: 'Coastal Area', lat: 34.042235, lng: -118.343683 },
    { id: 8, name: 'Airport Region', lat: 34.011899, lng: -118.272014 },
  ];

  return stationLocations.map(station => {
    // Generate random values for each pollutant
    return {
      ...station,
      readings: {
        PM25: getRandomValue(5, 70),
        PM10: getRandomValue(10, 150),
        O3: getRandomValue(20, 90),
        NO2: getRandomValue(10, 80),
        SO2: getRandomValue(2, 40),
        CO: getRandomValue(1, 12) / 10, // Lower values for CO in ppm
      },
      weather: {
        temp: getRandomValue(15, 35),
        humidity: getRandomValue(30, 90),
        windSpeed: getRandomValue(0, 30),
        windDirection: getRandomValue(0, 359),
      },
      aqi: getRandomValue(30, 180),
      timestamp: new Date().toISOString()
    };
  });
};
