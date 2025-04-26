import { useEffect, useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { RegistrationFormValues } from './RegistrationForm';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import MapComponent from '@/components/common/MapComponent';

interface StepTwoProps {
  form: UseFormReturn<RegistrationFormValues>;
}

const StepTwo = ({ form }: StepTwoProps) => {
  const [searchAddress, setSearchAddress] = useState('');
  
  // Create a dummy land object for the map based on current form values
  const locationValue = form.watch('location');
  const dummyLand = {
    id: 'new',
    owner: '',
    location: locationValue,
    area: form.watch('area'),
    propertyType: form.watch('propertyType'),
    price: form.watch('price'),
    documents: [],
    status: 'pending' as const,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const handleSearch = () => {
    // In a real app, this would call a geocoding API
    // For this demo, we'll simulate with random coordinates
    const randomLat = 37.7749 + (Math.random() - 0.5) * 0.1;
    const randomLng = -122.4194 + (Math.random() - 0.5) * 0.1;
    
    form.setValue('location', {
      lat: randomLat,
      lng: randomLng,
      address: searchAddress
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Location Details</CardTitle>
          <CardDescription>
            Specify the location of your property
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-grow">
              <Input
                placeholder="Search address..."
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="button" onClick={handleSearch}>
              Search
            </Button>
          </div>

          <MapComponent 
            lands={[dummyLand]} 
            center={[locationValue.lat, locationValue.lng]}
            zoom={13}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <FormField
              control={form.control}
              name="location.lat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.000001"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.lng"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Longitude</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.000001"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location.address"
              render={({ field }) => (
                <FormItem className="sm:col-span-3">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Full address" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Need to add the Button component
import { Button } from '@/components/ui/button';

export default StepTwo;