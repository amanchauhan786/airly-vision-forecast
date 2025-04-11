
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from "@/hooks/use-toast";
import { 
  AlertCircle, 
  Bell, 
  BellRing, 
  Mail, 
  MessageSquare,
  CheckCircle2,
  MapPin,
  AlertTriangle
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { POLLUTANTS, generateStations } from '@/utils/air-quality-utils';

const Alerts = () => {
  const [stations] = useState(generateStations());
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [threshold, setThreshold] = useState(100);
  const [selectedPollutants, setSelectedPollutants] = useState(['PM25', 'O3']);
  const [selectedLocation, setSelectedLocation] = useState('all');
  
  // Simulated alert history
  const alertHistory = [
    { 
      id: 1, 
      timestamp: '2023-04-11T08:15:00', 
      pollutant: 'PM25', 
      value: 78, 
      location: 'Downtown', 
      status: 'active' 
    },
    { 
      id: 2, 
      timestamp: '2023-04-10T16:30:00', 
      pollutant: 'O3', 
      value: 89, 
      location: 'East Side', 
      status: 'resolved' 
    },
    { 
      id: 3, 
      timestamp: '2023-04-09T12:45:00', 
      pollutant: 'NO2', 
      value: 110, 
      location: 'Industrial Zone', 
      status: 'resolved' 
    },
    { 
      id: 4, 
      timestamp: '2023-04-07T07:20:00', 
      pollutant: 'PM10', 
      value: 155, 
      location: 'North Hills', 
      status: 'resolved' 
    },
    { 
      id: 5, 
      timestamp: '2023-04-05T14:10:00', 
      pollutant: 'SO2', 
      value: 42, 
      location: 'South Bay', 
      status: 'resolved' 
    },
  ];

  const handleSaveAlerts = () => {
    toast.success('Alert preferences saved successfully', {
      description: 'You will now receive notifications based on your preferences.',
      icon: <CheckCircle2 className="h-4 w-4" />,
    });
  };

  const handleTestAlert = () => {
    toast('⚠️ Air Quality Alert Test', {
      description: `This is a test notification for ${selectedPollutants.join(', ')} levels exceeding threshold.`,
      icon: <AlertTriangle className="h-4 w-4" />,
      duration: 5000,
    });
  };

  const formatAlertTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Alerts & Notifications</h1>
        <p className="text-muted-foreground">
          Set up and manage air quality alerts
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BellRing className="h-5 w-5 text-primary" />
                Alert Configuration
              </CardTitle>
              <CardDescription>
                Set your preferences for air quality notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="location">Monitoring Locations</Label>
                    <Select defaultValue="all" onValueChange={setSelectedLocation}>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select locations" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Stations</SelectItem>
                        {stations.map(station => (
                          <SelectItem key={station.id} value={station.name}>
                            {station.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Pollutants to Monitor</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {Object.entries(POLLUTANTS).map(([key, pollutant]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Switch 
                            id={`pollutant-${key}`} 
                            checked={selectedPollutants.includes(key)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedPollutants(prev => [...prev, key]);
                              } else {
                                setSelectedPollutants(prev => prev.filter(p => p !== key));
                              }
                            }}
                          />
                          <Label htmlFor={`pollutant-${key}`}>{pollutant.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="threshold">
                      Alert Threshold (AQI): {threshold}
                    </Label>
                    <Slider 
                      id="threshold" 
                      min={50} 
                      max={200}
                      step={5}
                      value={[threshold]}
                      onValueChange={(value) => setThreshold(value[0])}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Good</span>
                      <span>Moderate</span>
                      <span>Unhealthy</span>
                      <span>Very Unhealthy</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label>Notification Methods</Label>
                    <div className="space-y-3 mt-2">
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="push" 
                          checked={pushNotifications}
                          onCheckedChange={setPushNotifications}
                        />
                        <Label htmlFor="push" className="flex items-center gap-2">
                          <Bell className="h-4 w-4" />
                          Push Notifications
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="email" 
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email Notifications
                        </Label>
                      </div>
                      
                      {emailNotifications && (
                        <div className="pl-6">
                          <Input 
                            id="email-input" 
                            type="email" 
                            placeholder="Enter your email address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        <Switch 
                          id="sms" 
                          checked={smsNotifications}
                          onCheckedChange={setSmsNotifications}
                        />
                        <Label htmlFor="sms" className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4" />
                          SMS Notifications
                        </Label>
                      </div>
                      
                      {smsNotifications && (
                        <div className="pl-6">
                          <Input 
                            id="phone-input" 
                            type="tel" 
                            placeholder="Enter your phone number" 
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2 mt-6">
                    <Button onClick={handleSaveAlerts}>
                      Save Alert Preferences
                    </Button>
                    <Button variant="outline" onClick={handleTestAlert}>
                      Send Test Notification
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
              <CardDescription>
                Recent air quality alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Pollutant</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {alertHistory.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell>{formatAlertTime(alert.timestamp)}</TableCell>
                      <TableCell>{POLLUTANTS[alert.pollutant as keyof typeof POLLUTANTS]?.name || alert.pollutant}</TableCell>
                      <TableCell>{alert.value}</TableCell>
                      <TableCell className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {alert.location}
                      </TableCell>
                      <TableCell>
                        <Badge variant={alert.status === 'active' ? "destructive" : "default"}>
                          {alert.status === 'active' ? 'Active' : 'Resolved'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertHistory
                  .filter(alert => alert.status === 'active')
                  .map(alert => (
                    <div key={alert.id} className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-red-700">
                          {POLLUTANTS[alert.pollutant as keyof typeof POLLUTANTS]?.name || alert.pollutant} Alert
                        </h3>
                        <Badge variant="destructive">Active</Badge>
                      </div>
                      <p className="text-sm mt-1">
                        {POLLUTANTS[alert.pollutant as keyof typeof POLLUTANTS]?.name || alert.pollutant} level of {alert.value} detected at {alert.location}.
                      </p>
                      <div className="flex justify-between text-xs text-red-600 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {alert.location}
                        </span>
                        <span>{formatAlertTime(alert.timestamp)}</span>
                      </div>
                    </div>
                  ))}
                
                {alertHistory.filter(alert => alert.status === 'active').length === 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-700">No Active Alerts</h3>
                    <p className="text-sm text-green-600 mt-1">
                      Air quality is currently within acceptable limits in all monitored locations.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>About Air Quality Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <p>
                  Air quality alerts are issued when pollutant levels exceed thresholds that may affect human health or the environment.
                </p>
                
                <div>
                  <h3 className="font-semibold mb-1">Alert Types</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li><span className="font-medium">Health Advisory:</span> For sensitive groups</li>
                    <li><span className="font-medium">Health Alert:</span> For general population</li>
                    <li><span className="font-medium">Emergency Alert:</span> Severe conditions</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-1">Recommended Actions</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Limit outdoor activities during alerts</li>
                    <li>Keep windows closed if air quality is poor</li>
                    <li>Use air purifiers if available</li>
                    <li>Follow specific instructions from local authorities</li>
                  </ul>
                </div>
                
                <p className="italic text-xs text-muted-foreground">
                  Note: This alert system is a simulation for demonstration purposes. In a real application, it would connect to official air quality monitoring networks and alert systems.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
