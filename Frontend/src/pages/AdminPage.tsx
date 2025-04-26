import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataTable from '@/components/admin/DataTable';
import ActivityLog from '@/components/admin/ActivityLog';
import { useLandRegistry } from '@/contexts/LandRegistryContext';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { AlertTriangle } from 'lucide-react';
import { mockUsers } from '@/data/mockData';

const AdminPage = () => {
  const { lands, transactions } = useLandRegistry();
  const { isAdmin, isVerifier, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('properties');

  useEffect(() => {
    if (!loading && !isAdmin && !isVerifier) {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access the admin area.',
        variant: 'destructive',
      });
      navigate('/dashboard');
    }
  }, [isAdmin, isVerifier, loading, navigate]);

  const handleVerifyProperty = (landId: string) => {
    // In a real app, this would call a blockchain transaction
    toast({
      title: 'Property Verified',
      description: `Property ${landId.substring(0, 8)} has been verified successfully.`,
    });
  };

  const handleRejectProperty = (landId: string) => {
    // In a real app, this would call a blockchain transaction
    toast({
      title: 'Property Rejected',
      description: `Property ${landId.substring(0, 8)} has been rejected.`,
      variant: 'destructive',
    });
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  if (!isAdmin && !isVerifier) {
    return (
      <div className="container py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
            <h2 className="text-xl font-bold mb-2">Access Denied</h2>
            <p className="text-muted-foreground text-center max-w-md">
              You do not have permission to access the admin area. Please contact an administrator if you believe this is an error.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage and verify land registry entries
          </p>
        </div>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>
        
        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>Property Registry</CardTitle>
              <CardDescription>
                Manage and verify property registrations. You can filter and search through all properties.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable 
                data={lands} 
                onVerify={handleVerifyProperty}
                onReject={handleRejectProperty}
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activity">
          <ActivityLog 
            lands={lands}
            transactions={transactions}
            users={mockUsers}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;