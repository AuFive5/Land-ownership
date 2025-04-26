import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';
import { RegistrationFormValues } from './RegistrationForm';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Home, Building2, Wheat } from 'lucide-react';

interface StepOneProps {
  form: UseFormReturn<RegistrationFormValues>;
}

const StepOne = ({ form }: StepOneProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Property Details</CardTitle>
          <CardDescription>
            Enter the basic information about your property
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Property Type</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-3 gap-4"
                  >
                    <FormItem>
                      <FormLabel className="cursor-pointer [&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:bg-primary/5">
                        <FormControl>
                          <RadioGroupItem
                            value="residential"
                            className="sr-only"
                          />
                        </FormControl>
                        <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary">
                          <Home className="mb-3 h-6 w-6" />
                          <span className="text-sm font-medium">Residential</span>
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="cursor-pointer [&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:bg-primary/5">
                        <FormControl>
                          <RadioGroupItem
                            value="commercial"
                            className="sr-only"
                          />
                        </FormControl>
                        <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary">
                          <Building2 className="mb-3 h-6 w-6" />
                          <span className="text-sm font-medium">Commercial</span>
                        </div>
                      </FormLabel>
                    </FormItem>
                    <FormItem>
                      <FormLabel className="cursor-pointer [&:has([data-state=checked])>div]:border-primary [&:has([data-state=checked])>div]:bg-primary/5">
                        <FormControl>
                          <RadioGroupItem
                            value="agricultural"
                            className="sr-only"
                          />
                        </FormControl>
                        <div className="flex flex-col items-center justify-between rounded-md border-2 border-muted p-4 hover:border-primary">
                          <Wheat className="mb-3 h-6 w-6" />
                          <span className="text-sm font-medium">Agricultural</span>
                        </div>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="area"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area (sq. ft.)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="1000"
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (USD)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      placeholder="100000"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
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

export default StepOne;