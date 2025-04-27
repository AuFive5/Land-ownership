import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLandRegistry } from '@/contexts/LandRegistryContext';
import { useWeb3 } from '@/contexts/Web3Context';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const locationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  address: z.string().min(5, { message: 'Address is required' }),
});

const formSchema = z.object({
  // Step 1: Property Details
  propertyType: z.enum(['residential', 'commercial', 'agricultural']),
  area: z.number().positive({ message: 'Area must be positive' }),
  price: z.number().positive({ message: 'Price must be positive' }),

  // Step 2: Location
  location: locationSchema,

  // Step 3: Documents
  documents: z.array(
    z.object({
      name: z.string().min(1, { message: 'Document name is required' }),
      type: z.enum(['deed', 'survey', 'tax', 'identity', 'other']),
      url: z.string().min(1, { message: 'Document URL is required' }),
    })
  ).min(1, { message: 'At least one document is required' }),
});

export type RegistrationFormValues = z.infer<typeof formSchema>;

const RegistrationForm = () => {
  const [step, setStep] = useState('step1');
  const [isComplete, setIsComplete] = useState(false);
  const { registerLand, isLoading } = useLandRegistry();
  const { walletInfo } = useWeb3();
  const navigate = useNavigate();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyType: 'residential',
      area: 0,
      price: 0,
      location: {
        lat: 37.7749,
        lng: -122.4194,
        address: '',
      },
      documents: [],
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    if (!walletInfo?.address) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to register land.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const success = await registerLand({
        ...data,
        owner: walletInfo.address,
        documents: data.documents.map((doc, index) => ({
          ...doc,
          id: `doc-${index}`, // Generate a unique ID for each document
          uploadedAt: new Date().toISOString(), // Add the current timestamp
        })),
      });

      if (success) {
        setIsComplete(true);
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration Failed',
        description: 'An error occurred during registration. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const goToNext = async () => {
    if (step === 'step1') {
      const isValid = await form.trigger(['propertyType', 'area', 'price']);
      if (isValid) setStep('step2');
    } else if (step === 'step2') {
      const isValid = await form.trigger(['location']);
      if (isValid) setStep('step3');
    }
  };

  const goToPrevious = () => {
    if (step === 'step2') setStep('step1');
    if (step === 'step3') setStep('step2');
  };

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Registration Complete!</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Your land registration request has been submitted successfully. It will now be reviewed for verification.
        </p>
        <p className="text-sm">Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <div className="w-full max-w-3xl mx-auto">
        <Tabs value={step} onValueChange={setStep} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="step1">Property Details</TabsTrigger>
            <TabsTrigger value="step2">Location</TabsTrigger>
            <TabsTrigger value="step3">Documents</TabsTrigger>
          </TabsList>

          <form onSubmit={form.handleSubmit(onSubmit)}>
            <TabsContent value="step1">
              <StepOne form={form} />
              <div className="flex justify-end mt-6">
                <Button type="button" onClick={goToNext}>
                  Next Step
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="step2">
              <StepTwo form={form} />
              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={goToPrevious}>
                  Previous
                </Button>
                <Button type="button" onClick={goToNext}>
                  Next Step
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="step3">
              <StepThree form={form} />
              <div className="flex justify-between mt-6">
                <Button type="button" variant="outline" onClick={goToPrevious}>
                  Previous
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Register Property'}
                </Button>
              </div>
            </TabsContent>
          </form>
        </Tabs>
      </div>
    </FormProvider>
  );
};

export default RegistrationForm;