import TransferForm from '@/components/forms/TransferForm';
import { useEffect } from 'react';
import { useWeb3 } from '@/contexts/Web3Context';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const TransferPage = () => {
  const { isConnected } = useWeb3();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to transfer land ownership.',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [isConnected, navigate]);

  return (
    <div className="container py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Transfer Property Ownership</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Securely transfer your property ownership to another wallet address using blockchain technology.
        </p>
      </div>

      <TransferForm />
    </div>
  );
};

export default TransferPage;