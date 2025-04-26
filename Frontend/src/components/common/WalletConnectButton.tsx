import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useWeb3 } from '@/contexts/Web3Context';
import { Wallet, ChevronDown } from 'lucide-react';
import LoadingSpinner from '@/components/layout/LoadingSpinner';

interface WalletConnectButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

const WalletConnectButton = ({ 
  variant = 'default',
  size = 'default',
  className = ''
}: WalletConnectButtonProps) => {
  const { connectWallet, connecting, isConnected, walletInfo } = useWeb3();

  if (isConnected) {
    const shortAddress = `${walletInfo?.address.substring(0, 6)}...${walletInfo?.address.substring(walletInfo?.address.length - 4)}`;
    
    return (
      <div className={className}>
        <Button variant={variant} size={size} disabled>
          <Wallet className="mr-2 h-4 w-4" />
          {shortAddress}
        </Button>
      </div>
    );
  }

  if (connecting) {
    return (
      <Button variant={variant} size={size} disabled className={className}>
        <LoadingSpinner size="small" className="mr-2" />
        Connecting...
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => connectWallet('nami')}>
          Nami
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => connectWallet('eternl')}>
          Eternl
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletConnectButton;