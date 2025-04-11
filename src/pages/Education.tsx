
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { POLLUTANTS } from '@/utils/air-quality-utils';
import { Info, AlertCircle, BookOpen, Shield } from 'lucide-react';

const Education = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Education Center</h1>
        <p className="text-muted-foreground">
          Learn about air pollution sources, impacts, and mitigation strategies
        </p>
      </div>

      <Tabs defaultValue="pollutants">
        <TabsList className="grid grid-cols-4 w-full max-w-3xl">
          <TabsTrigger value="pollutants">Pollutants</TabsTrigger>
          <TabsTrigger value="health">Health Effects</TabsTrigger>
          <TabsTrigger value="sources">Sources</TabsTrigger>
          <TabsTrigger value="mitigation">Mitigation</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pollutants" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(POLLUTANTS).map(([key, pollutant]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle>{pollutant.name}</CardTitle>
                  <CardDescription>Typical unit: {pollutant.unit}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold mb-1">Description</h3>
                      <p className="text-sm">{pollutant.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold mb-1">Sources</h3>
                      <ul className="list-disc pl-5 text-sm">
                        {key === 'PM25' && (
                          <>
                            <li>Vehicle emissions</li>
                            <li>Industrial processes</li>
                            <li>Cooking and heating</li>
                            <li>Wildfires</li>
                            <li>Agricultural activities</li>
                          </>
                        )}
                        {key === 'PM10' && (
                          <>
                            <li>Construction sites</li>
                            <li>Road dust</li>
                            <li>Industrial emissions</li>
                            <li>Agricultural operations</li>
                            <li>Mining activities</li>
                          </>
                        )}
                        {key === 'O3' && (
                          <>
                            <li>Not directly emitted</li>
                            <li>Formed by reaction of NOx and VOCs</li>
                            <li>Enhanced by sunlight and heat</li>
                            <li>Vehicle emissions (precursors)</li>
                            <li>Industrial processes (precursors)</li>
                          </>
                        )}
                        {key === 'NO2' && (
                          <>
                            <li>Vehicle emissions</li>
                            <li>Power plants</li>
                            <li>Industrial processes</li>
                            <li>Kerosene heaters</li>
                            <li>Gas stoves</li>
                          </>
                        )}
                        {key === 'SO2' && (
                          <>
                            <li>Fossil fuel combustion</li>
                            <li>Power plants</li>
                            <li>Industrial facilities</li>
                            <li>Volcanoes</li>
                            <li>Ships and vehicles</li>
                          </>
                        )}
                        {key === 'CO' && (
                          <>
                            <li>Vehicle emissions</li>
                            <li>Incomplete combustion</li>
                            <li>Indoor heating sources</li>
                            <li>Wildfires</li>
                            <li>Industrial processes</li>
                          </>
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold mb-1">Health Impacts</h3>
                      <ul className="list-disc pl-5 text-sm">
                        {key === 'PM25' && (
                          <>
                            <li>Deep penetration into lungs</li>
                            <li>Cardiovascular problems</li>
                            <li>Respiratory issues</li>
                            <li>Can enter bloodstream</li>
                            <li>Associated with premature death</li>
                          </>
                        )}
                        {key === 'PM10' && (
                          <>
                            <li>Respiratory irritation</li>
                            <li>Aggravated asthma</li>
                            <li>Decreased lung function</li>
                            <li>Coughing and difficulty breathing</li>
                          </>
                        )}
                        {key === 'O3' && (
                          <>
                            <li>Airway irritation</li>
                            <li>Reduced lung function</li>
                            <li>Aggravated asthma</li>
                            <li>Inflammation of lung tissue</li>
                            <li>Increased susceptibility to infections</li>
                          </>
                        )}
                        {key === 'NO2' && (
                          <>
                            <li>Airway inflammation</li>
                            <li>Reduced lung function</li>
                            <li>Increased respiratory infections</li>
                            <li>Aggravated asthma symptoms</li>
                          </>
                        )}
                        {key === 'SO2' && (
                          <>
                            <li>Respiratory irritation</li>
                            <li>Bronchoconstriction</li>
                            <li>Aggravated asthma</li>
                            <li>Contributes to particle formation</li>
                          </>
                        )}
                        {key === 'CO' && (
                          <>
                            <li>Reduces oxygen delivery to organs</li>
                            <li>Cardiovascular effects</li>
                            <li>Headaches and dizziness</li>
                            <li>Fatal at high concentrations</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="health" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  Short-term Health Effects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Respiratory System</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Irritation of airways</li>
                      <li>Coughing and wheezing</li>
                      <li>Shortness of breath</li>
                      <li>Exacerbation of asthma and COPD</li>
                      <li>Increased susceptibility to respiratory infections</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Cardiovascular System</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Increased blood pressure</li>
                      <li>Irregular heartbeat</li>
                      <li>Heart attacks in vulnerable individuals</li>
                      <li>Reduced blood oxygen levels (CO exposure)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Other Effects</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Eye, nose, and throat irritation</li>
                      <li>Headaches and dizziness</li>
                      <li>Fatigue and reduced cognitive function</li>
                      <li>Allergic reactions</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-800" />
                  Long-term Health Effects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Respiratory System</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Reduced lung function</li>
                      <li>Development of asthma and COPD</li>
                      <li>Lung inflammation and tissue damage</li>
                      <li>Pulmonary fibrosis</li>
                      <li>Lung cancer</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Cardiovascular System</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Coronary artery disease</li>
                      <li>Atherosclerosis (hardening of arteries)</li>
                      <li>Heart failure</li>
                      <li>Stroke</li>
                      <li>Increased cardiovascular mortality</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Other Systems</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Neurological: cognitive decline, dementia risk</li>
                      <li>Reproductive: reduced fertility, pregnancy complications</li>
                      <li>Developmental: low birth weight, preterm birth</li>
                      <li>Metabolic: diabetes and obesity links</li>
                      <li>Immunological: impaired immune function</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  Vulnerable Populations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">Children</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Developing lungs and immune systems</li>
                      <li>Higher breathing rates relative to body size</li>
                      <li>More time spent outdoors</li>
                      <li>Risk of developmental impacts</li>
                      <li>Potential lifelong health consequences</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">Elderly</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Declining immune function</li>
                      <li>Pre-existing health conditions</li>
                      <li>Decreased respiratory reserve</li>
                      <li>Reduced body's ability to compensate</li>
                      <li>Higher risk of hospitalization and mortality</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">Pre-existing Conditions</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Asthma and COPD</li>
                      <li>Heart disease</li>
                      <li>Diabetes</li>
                      <li>Obesity</li>
                      <li>Compromised immune systems</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sources" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-500" />
                  Urban Pollution Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Transportation</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Vehicle exhaust (cars, trucks, buses)</li>
                      <li>Non-exhaust emissions (brake and tire wear)</li>
                      <li>Road dust resuspension</li>
                      <li>Aviation and shipping</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Residential & Commercial</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Heating systems</li>
                      <li>Cooking (especially with solid fuels)</li>
                      <li>Construction and demolition</li>
                      <li>Consumer products (paints, cleaners)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Industrial Activities</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Power generation</li>
                      <li>Manufacturing facilities</li>
                      <li>Waste treatment and incineration</li>
                      <li>Mining and quarrying</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-green-500" />
                  Natural Pollution Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Geological</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Volcanic eruptions (SO2, ash, gases)</li>
                      <li>Dust storms</li>
                      <li>Erosion</li>
                      <li>Radon emissions</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Biological</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Pollen and spores</li>
                      <li>Microbial components</li>
                      <li>Volatile organic compounds from plants</li>
                      <li>Methane from wetlands</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Wildfire & Burning</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Forest and grassland fires</li>
                      <li>Agricultural burning</li>
                      <li>Biogenic soil emissions</li>
                      <li>Sea spray (marine aerosols)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-500" />
                  Air Pollution Formation & Transport
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">Primary vs. Secondary Pollutants</h3>
                    <p className="text-sm">
                      <span className="font-medium">Primary pollutants</span> are emitted directly from sources (e.g., PM, SO2, NO, CO), while 
                      <span className="font-medium"> secondary pollutants</span> form through atmospheric reactions (e.g., O3, secondary PM, NO2).
                    </p>
                    
                    <h3 className="text-sm font-semibold mt-4">Photochemical Reactions</h3>
                    <p className="text-sm">
                      Sunlight drives chemical reactions between NOx and VOCs to create ground-level ozone and other photochemical oxidants. These reactions are enhanced on hot, sunny days with little wind.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold">Meteorological Influences</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li><span className="font-medium">Temperature inversions:</span> Trap pollutants near the ground</li>
                      <li><span className="font-medium">Wind:</span> Affects dispersion and transport</li>
                      <li><span className="font-medium">Precipitation:</span> Removes particulates through washout</li>
                      <li><span className="font-medium">Humidity:</span> Affects formation of secondary particles</li>
                      <li><span className="font-medium">Urban heat islands:</span> Enhance ozone formation</li>
                    </ul>
                    
                    <h3 className="text-sm font-semibold mt-4">Transport Mechanisms</h3>
                    <p className="text-sm">
                      Air pollutants can travel hundreds of miles from their source, creating regional and even international air quality issues. This is why air pollution requires coordinated management across jurisdictions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="mitigation" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-500" />
                  Individual Protection Strategies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Air Quality Awareness</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Monitor local air quality index (AQI)</li>
                      <li>Subscribe to air quality alerts</li>
                      <li>Be aware of pollution patterns (time of day, season)</li>
                      <li>Learn about local pollution sources</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Activity Modifications</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Reduce outdoor activities during high pollution events</li>
                      <li>Exercise early morning or evening when ozone is lower</li>
                      <li>Choose less polluted routes and locations</li>
                      <li>Limit strenuous outdoor activity on poor air quality days</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Indoor Air Quality</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Use HEPA air purifiers</li>
                      <li>Keep windows closed during high pollution events</li>
                      <li>Maintain HVAC systems with proper filtration</li>
                      <li>Reduce indoor pollution sources (smoking, burning)</li>
                      <li>Use ventilation when cooking</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Personal Protection</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Wear appropriate masks (N95/KN95) during high pollution events</li>
                      <li>Stay hydrated</li>
                      <li>Consider air pollution when planning outdoor activities</li>
                      <li>Consult healthcare providers about personal strategies</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  Societal Mitigation Approaches
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Transportation Policies</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Promote electric vehicles and public transit</li>
                      <li>Implement low emission zones</li>
                      <li>Encourage active transportation (walking, cycling)</li>
                      <li>Enforce emission standards for vehicles</li>
                      <li>Develop car-sharing and ride-sharing programs</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Industrial Controls</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Implement best available technologies</li>
                      <li>Establish and enforce emission limits</li>
                      <li>Encourage cleaner production processes</li>
                      <li>Cap-and-trade or carbon tax programs</li>
                      <li>Regular monitoring and compliance checking</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Energy Policies</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Transition to renewable energy sources</li>
                      <li>Improve energy efficiency standards</li>
                      <li>Phase out high-polluting fuels</li>
                      <li>Support clean heating and cooling solutions</li>
                      <li>Implement smart grid technologies</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-semibold mb-1">Urban Planning</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Increase urban green spaces</li>
                      <li>Design for reduced traffic and emissions</li>
                      <li>Implement green infrastructure</li>
                      <li>Separate sensitive locations from pollution sources</li>
                      <li>Encourage compact, mixed-use development</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-500" />
                  Emerging Approaches & Technologies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">Monitoring Innovations</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Low-cost sensor networks</li>
                      <li>Satellite and remote sensing</li>
                      <li>Mobile monitoring platforms</li>
                      <li>Citizen science initiatives</li>
                      <li>Real-time exposure monitoring</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">Pollution Capture & Treatment</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Urban air purification towers</li>
                      <li>Photocatalytic surfaces</li>
                      <li>Air filtering vegetation</li>
                      <li>Carbon capture technologies</li>
                      <li>Atmospheric water harvesters</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold">Policy Innovations</h3>
                    <ul className="list-disc pl-5 text-sm">
                      <li>Health-based air quality standards</li>
                      <li>Environmental justice approaches</li>
                      <li>Integrated multi-pollutant strategies</li>
                      <li>International cooperation frameworks</li>
                      <li>Adaptive management approaches</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Education;
