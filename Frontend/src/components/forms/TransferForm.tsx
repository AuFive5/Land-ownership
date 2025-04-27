import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useLandRegistry } from '@/contexts/LandRegistryContext';
import { useWeb3 } from '@/contexts/Web3Context';
import { AlertCircle, CheckCircle2, ArrowDownToLine, ArrowRightLeft } from 'lucide-react';
import { Land } from '@/types';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const formSchema = z.object({
  landId: z.string().min(1, { message: 'Property is required' }),
  toAddress: z.string().min(42, { message: 'Valid wallet address is required' }).max(42),
  amount: z.number().positive({ message: 'Amount must be positive' }),
});

type TransferFormValues = z.infer<typeof formSchema>;

const TransferForm = () => {
  const [isComplete, setIsComplete] = useState(false);
  const { lands, userLands, transferLand, isLoading } = useLandRegistry();
  const { walletInfo } = useWeb3();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const landIdFromUrl = searchParams.get('landId');
  
  const [selectedLand, setSelectedLand] = useState<Land | null>(null);

  const form = useForm<TransferFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      landId: landIdFromUrl || '',
      toAddress: '',
      amount: 0,
    },
  });

  // Update selected land when landId changes
  useEffect(() => {
    const landId = form.watch('landId');
    if (landId) {
      const land = lands.find(l => l.id === landId);
      setSelectedLand(land || null);
      if (land) {
        form.setValue('amount', land.price);
      }
    } else {
      setSelectedLand(null);
    }
  }, [form.watch('landId'), lands]);

  // Set landId from URL if available
  useEffect(() => {
    if (landIdFromUrl) {
      form.setValue('landId', landIdFromUrl);
    }
  }, [landIdFromUrl]);

  const onSubmit = async (data: TransferFormValues) => {
    if (!walletInfo?.address) {
      return;
    }

    try {
      const success = await transferLand(data.landId, data.toAddress, data.amount);
      
      if (success) {
        setIsComplete(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
    } catch (error) {
      console.error('Transfer error:', error);
    }
  };

  if (isComplete) {
    return (
      <Card className="w-full max-w-xl mx-auto">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Transfer Complete!</h2>
            <p className="text-muted-foreground mb-6">
              The property has been successfully transferred to the new owner. The blockchain transaction has been recorded.
            </p>
            <p className="text-sm">Redirecting to your dashboard...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (userLands.length === 0) {
    return (
      <Card className="w-full max-w-xl mx-auto">
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No Properties Available</AlertTitle>
            <AlertDescription>
              You don't have any registered properties to transfer. Please register a property first.
            </AlertDescription>
          </Alert>
          <div className="flex justify-center mt-6">
            <Button onClick={() => navigate('/register')}>
              Register Property
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle>Transfer Property Ownership</CardTitle>
        <CardDescription>
          Transfer your registered property to another wallet address
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="landId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Property</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a property to transfer" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {userLands.map((land) => (
                        <SelectItem key={land.id} value={land.id}>
                          {land.location.address.split(',')[0]} ({land.propertyType})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedLand && (
              <div className="rounded-md border p-4 bg-muted/30">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium truncate">{selectedLand.location.address}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Area</p>
                    <p className="font-medium">{selectedLand.area} sq. ft.</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Property Type</p>
                    <p className="font-medium capitalize">{selectedLand.propertyType}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <p className="font-medium capitalize">{selectedLand.status}</p>
                  </div>
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="toAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Wallet Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0x..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the wallet address of the new owner
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Amount (USD)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter the sale price for the property
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-md border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <ArrowRightLeft className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Transaction Fee</p>
                  <p className="text-xs text-muted-foreground">Estimated blockchain fee</p>
                </div>
              </div>
              <div className="text-sm font-medium">0.001 ADA</div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Transfer Ownership'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TransferForm;