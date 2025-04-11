import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Activity, 
  Heart, 
  LucideIcon,
  Brain, 
  User,
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import { POLLUTANTS, getAQICategory, generateStations } from '@/utils/air-quality-utils';

// Create a custom Lungs icon component since it's not available in lucide-react
const Lungs = (props: React.ComponentProps<LucideIcon>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6.081 20c0-2.164-.673-4.142-1.811-5.804A6.81 6.81 0 0 1 3 9.353c0-3.675 2.883-6.68 6.436-6.68.732 0 1.443.117 2.103.335C11.615 2.819 11.476 2 11.476 2s.514 1.79.51 2.772c.095-.106.194-.208.296-.316C13.135 3.662 14.044 3 15.02 3c1.124 0 2.094.672 2.52 1.64 1.482.125 2.93.53 4.306 1.164M18.56 15A13.02 13.02 0 0 0 22 15V8.458c-1.4-.89-2.976-1.419-4.667-1.419-1.64 0-2.393 1.38-2.393 1.38h-.004v.003c0-.076-.036-1.766-.9-3.556-.3-.618-.93-1.035-1.659-1.035-.872 0-1.63.736-1.63 1.631 0 3.862-3.956 6.615-3.956 10.515V20H9.45c0-3.944 2.323-6.85 2.323-10.146 0-.1.16-.207.047-.313"/>
    </svg>
  );
};

const Health = () => {
  const [age, setAge] = useState(35);
  const [exposureHours, setExposureHours] = useState(2);
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [existingCondition, setExistingCondition] = useState('none');
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [stations] = useState(generateStations());
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  // Calculate risk score based on inputs
  const calculateRisk = () => {
    if (!selectedLocation) return;
    
    const station = stations.find(s => s.name === selectedLocation);
    if (!station) return;
    
    // Base risk calculation using AQI
    let risk = station.aqi / 500 * 50; // Scale AQI to 0-50
    
    // Age factor (higher risk for young children and elderly)
    if (age < 10) {
      risk += 15;
    } else if (age > 65) {
      risk += 20;
    }
    
    // Exposure duration
    risk += (exposureHours / 8) * 10;
    
    // Activity level (higher breathing rate = more exposure)
    if (activityLevel === 'light') {
      risk += 5;
    } else if (activityLevel === 'moderate') {
      risk += 10;
    } else if (activityLevel === 'heavy') {
      risk += 20;
    }
    
    // Pre-existing conditions
    if (existingCondition === 'respiratory') {
      risk += 25;
    } else if (existingCondition === 'cardiovascular') {
      risk += 20;
    } else if (existingCondition === 'other') {
      risk += 10;
    }
    
    // Cap at 100
    risk = Math.min(Math.round(risk), 100);
    setRiskScore(risk);
    
    // Generate recommendations
    generateRecommendations(risk, station.aqi);
  };

  // Generate health recommendations based on risk score
  const generateRecommendations = (risk: number, aqi: number) => {
    const recommendations = [];
    
    if (risk > 70) {
      recommendations.push("Avoid outdoor activities completely in this area.");
      recommendations.push("Use air purifiers indoors when in this region.");
      recommendations.push("Consider wearing an N95 respirator if outdoor exposure is unavoidable.");
      recommendations.push("Consult with healthcare provider about preventive medications.");
    } else if (risk > 50) {
      recommendations.push("Limit outdoor exposure to essential activities only.");
      recommendations.push("Reduce physical exertion when outdoors.");
      recommendations.push("Keep windows closed and use air conditioning if available.");
      if (existingCondition !== 'none') {
        recommendations.push("Have rescue medications readily available if you have pre-existing conditions.");
      }
    } else if (risk > 30) {
      recommendations.push("Consider reducing prolonged or heavy outdoor exertion.");
      recommendations.push("Take more breaks during outdoor activities.");
      recommendations.push("Monitor symptoms if you have pre-existing conditions.");
    } else {
      recommendations.push("Air quality presents minimal risk, but remain aware of changing conditions.");
      if (aqi > 50) {
        recommendations.push("Unusually sensitive individuals should consider reducing prolonged outdoor exertion.");
      }
    }
    
    setRecommendations(recommendations);
  };

  // Get risk level text
  const getRiskLevelText = (score: number) => {
    if (score > 70) return "High Risk";
    if (score > 50) return "Moderate Risk";
    if (score > 30) return "Low Risk";
    return "Minimal Risk";
  };
  
  // Get risk level color
  const getRiskLevelColor = (score: number) => {
    if (score > 70) return "text-red-500 bg-red-100";
    if (score > 50) return "text-orange-500 bg-orange-100";
    if (score > 30) return "text-yellow-500 bg-yellow-100";
    return "text-green-500 bg-green-100";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Health Risk Calculator</h1>
        <p className="text-muted-foreground">
          Assess the potential health impacts of air pollution exposure
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>
                Enter your personal details and exposure information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Select onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {stations.map(station => (
                          <SelectItem key={station.id} value={station.name}>
                            {station.name} (AQI: {station.aqi})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="age">Age: {age}</Label>
                    <Slider 
                      id="age" 
                      min={0} 
                      max={100}
                      step={1}
                      value={[age]}
                      onValueChange={(value) => setAge(value[0])}
                      className="mt-2"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="exposure">Exposure Duration: {exposureHours} hours</Label>
                    <Slider 
                      id="exposure" 
                      min={0} 
                      max={24}
                      step={0.5}
                      value={[exposureHours]}
                      onValueChange={(value) => setExposureHours(value[0])}
                      className="mt-2"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="activity">Activity Level</Label>
                    <Select defaultValue="moderate" onValueChange={setActivityLevel}>
                      <SelectTrigger id="activity">
                        <SelectValue placeholder="Activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rest">Resting/Sedentary</SelectItem>
                        <SelectItem value="light">Light (walking)</SelectItem>
                        <SelectItem value="moderate">Moderate (cycling)</SelectItem>
                        <SelectItem value="heavy">Heavy (running, sports)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="condition">Pre-existing Conditions</Label>
                    <Select defaultValue="none" onValueChange={setExistingCondition}>
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="Pre-existing conditions" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        <SelectItem value="respiratory">Respiratory (Asthma, COPD)</SelectItem>
                        <SelectItem value="cardiovascular">Cardiovascular</SelectItem>
                        <SelectItem value="other">Other Chronic Conditions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button onClick={calculateRisk} className="w-full mt-6">
                    Calculate Risk
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {riskScore !== null && (
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle>Health Impact Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center justify-center p-6 bg-secondary/30 rounded-lg">
                    <div className="text-lg font-semibold mb-1">Risk Score</div>
                    <div className="text-4xl font-bold">{riskScore}</div>
                    <Badge className={`mt-2 ${getRiskLevelColor(riskScore)}`}>
                      {getRiskLevelText(riskScore)}
                    </Badge>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        Recommendations
                      </h3>
                      <ul className="space-y-2">
                        {recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-5 w-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs text-primary font-medium">{index + 1}</span>
                            </div>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                  <div className="flex items-center gap-2 text-yellow-700 font-medium mb-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Important Note</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    This risk assessment is for educational purposes only and should not be used as medical advice. 
                    Consult with healthcare professionals for personalized advice regarding air pollution exposure.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Health Impact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="respiratory">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Lungs className="h-4 w-4" />
                      <span>Respiratory Effects</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm">
                      <li><span className="font-medium">Short-term:</span> Irritation, coughing, wheezing, shortness of breath</li>
                      <li><span className="font-medium">Long-term:</span> Decreased lung function, development of asthma, COPD exacerbation, increased susceptibility to respiratory infections</li>
                      <li><span className="font-medium">Primary pollutants:</span> PM2.5, PM10, Ozone, Nitrogen Dioxide</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="cardiovascular">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4" />
                      <span>Cardiovascular Effects</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm">
                      <li><span className="font-medium">Short-term:</span> Increased blood pressure, irregular heartbeat, non-fatal heart attacks</li>
                      <li><span className="font-medium">Long-term:</span> Coronary artery disease, heart failure, stroke, increased mortality</li>
                      <li><span className="font-medium">Primary pollutants:</span> PM2.5, Carbon Monoxide, Nitrogen Dioxide</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="neurological">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4" />
                      <span>Neurological Effects</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm">
                      <li><span className="font-medium">Short-term:</span> Headaches, anxiety, reduced cognitive function</li>
                      <li><span className="font-medium">Long-term:</span> Accelerated cognitive decline, increased risk of dementia, developmental impacts in children</li>
                      <li><span className="font-medium">Primary pollutants:</span> PM2.5, Ultrafine particles, Lead, Mercury</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="vulnerable">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>Vulnerable Populations</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2 text-sm">
                      <li><span className="font-medium">Children:</span> Developing lungs and brains, higher breathing rates, more outdoor time</li>
                      <li><span className="font-medium">Elderly:</span> Weakened immune systems, pre-existing conditions</li>
                      <li><span className="font-medium">Pregnant women:</span> Risk of preterm birth, low birth weight, developmental issues</li>
                      <li><span className="font-medium">Pre-existing conditions:</span> Asthma, COPD, heart disease, diabetes</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="activity">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      <span>Activity Level Impact</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm mb-2">
                      Exercise increases breathing rate and depth, which can increase pollutant inhalation:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li><span className="font-medium">Rest:</span> 6-10 liters of air per minute</li>
                      <li><span className="font-medium">Light activity:</span> 20-30 liters per minute</li>
                      <li><span className="font-medium">Moderate activity:</span> 40-60 liters per minute</li>
                      <li><span className="font-medium">Heavy exercise:</span> 100-150+ liters per minute</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="time">
                  <AccordionTrigger>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>Exposure Duration</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm">
                      Both acute (short-term) and chronic (long-term) exposure to air pollution can affect health:
                    </p>
                    <ul className="space-y-2 text-sm mt-2">
                      <li><span className="font-medium">Hours:</span> Symptoms in sensitive individuals, temporary decreased lung function</li>
                      <li><span className="font-medium">Days:</span> Inflammation, exacerbation of existing conditions</li>
                      <li><span className="font-medium">Months-Years:</span> Permanent decreases in lung function, development of chronic diseases, increased mortality</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Health;
