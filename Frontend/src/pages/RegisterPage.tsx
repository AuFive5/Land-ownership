import RegistrationForm from '@/components/forms/registration/RegistrationForm';
import { useEffect } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const RegisterPage = () => {
  const { isConnected } = useWeb3();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to register land.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [isConnected, navigate]);

  return (
    <div className="container py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Register Your Property</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Complete the form below to register your property on the blockchain. All information will be verified by authorized registry officials.
        </p>
      </div>
      
      <RegistrationForm />
    </div>
  );
};

export default RegisterPage;