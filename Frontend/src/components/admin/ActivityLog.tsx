import { Activity, User, Box, Calendar, ArrowRightLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Land, Transaction, User as UserType } from '@/types';
import { format } from 'date-fns';

interface ActivityItem {
  id: string;
  type: 'registration' | 'verification' | 'transfer' | 'login';
  message: string;
  timestamp: string;
  user?: string;
}

interface ActivityLogProps {
  lands: Land[];
  transactions: Transaction[];
  users: UserType[];
}

const ActivityLog = ({ lands, transactions, users }: ActivityLogProps) => {
  // Generate activity log from data
  const activities: ActivityItem[] = [
    // Registration activities
    ...lands.map(land => ({
      id: `reg_${land.id}`,
      type: 'registration' as const,
      message: `New ${land.propertyType} property registered at ${land.location.address.split(',')[0]}`,
      timestamp: land.createdAt,
      user: land.owner
    })),
    
    // Verification activities
    ...lands
      .filter(land => land.status !== 'pending' && land.updatedAt !== land.createdAt)
      .map(land => ({
        id: `ver_${land.id}`,
        type: 'verification' as const,
        message: `Property ${land.id.substring(0, 8)} ${land.status === 'verified' ? 'verified' : 'rejected'}`,
        timestamp: land.updatedAt,
        user: users[Math.floor(Math.random() * users.length)]?.walletAddress
      })),
    
    // Transfer activities
    ...transactions.map(tx => ({
      id: `tx_${tx.id}`,
      type: 'transfer' as const,
      message: `Property ${tx.landId.substring(0, 8)} transferred for $${tx.amount.toLocaleString()}`,
      timestamp: tx.timestamp,
      user: tx.fromAddress
    })),
    
    // Login activities (mock data)
    ...users.map((user, index) => ({
      id: `login_${user.id}`,
      type: 'login' as const,
      message: `User logged in from ${['Chrome/Windows', 'Safari/MacOS', 'Firefox/Linux'][index % 3]}`,
      timestamp: new Date(new Date(user.createdAt).getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      user: user.walletAddress
    }))
  ];
  
  // Sort by timestamp, newest first
  activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'registration':
        return <Box className="h-4 w-4" />;
      case 'verification':
        return <User className="h-4 w-4" />;
      case 'transfer':
        return <ArrowRightLeft className="h-4 w-4" />;
      case 'login':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };
  
  const formatAddress = (address?: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, h:mm a');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Activity Log
        </CardTitle>
        <CardDescription>
          Recent activity on the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            {activities.map((activity, i) => (
              <div key={activity.id} className="flex gap-4">
                <div className="relative mt-0.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-muted">
                    {getActivityIcon(activity.type)}
                  </div>
                  {i < activities.length - 1 && (
                    <div className="absolute left-3.5 top-8 h-full w-px bg-border" />
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-medium leading-none">
                    {activity.message}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <span>{formatDate(activity.timestamp)}</span>
                    {activity.user && (
                      <>
                        <span>•</span>
                        <span className="font-mono">{formatAddress(activity.user)}</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ActivityLog;