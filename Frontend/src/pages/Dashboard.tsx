import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import LandCard from '@/components/common/LandCard';
import MapComponent from '@/components/common/MapComponent';
import { useLandRegistry } from '@/contexts/LandRegistryContext';
import { useWeb3 } from '@/contexts/Web3Context';
import { Land } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Wallet, GaugeCircle, BadgeDollarSign, AreaChart, Database, Plus } from 'lucide-react';
import { format } from 'date-fns';

const Dashboard = () => {
  const { lands, userLands, transactions } = useLandRegistry();
  const { walletInfo } = useWeb3();
  const { user, isAdmin } = useAuth();
  const [selectedLand, setSelectedLand] = useState<Land | null>(null);

  // Statistics
  const totalValue = userLands.reduce((sum, land) => sum + land.price, 0);
  const verifiedCount = userLands.filter(land => land.status === 'verified').length;
  const pendingCount = userLands.filter(land => land.status === 'pending').length;
  const transactionCount = transactions.filter(tx => 
    tx.fromAddress === walletInfo?.address || tx.toAddress === walletInfo?.address
  ).length;

  const handleMarkerClick = (land: Land) => {
    setSelectedLand(land);
  };

  if(isAdmin){
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-6">
          Welcome back, {user?.name || 'Admin'}! You have access to all properties and transactions.
        </p>
        <Card>
          <CardHeader>
            <CardTitle>All Properties</CardTitle>
            <CardDescription>Manage all registered properties.</CardDescription>
          </CardHeader>
          <CardContent>
            {lands.length === 0 ? (
              <p>No properties registered yet.</p>
            ) : (
              lands.map((land) => (
                <LandCard key={land.id} land={land} />
              ))
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || 'User'}
          </p>
        </div>
        <Button className="gap-2" asChild>
          <Link to="/register">
            <Plus className="h-4 w-4" />
            Register New Property
          </Link>
        </Button>
      </div>

      {userLands.length === 0 ? (
        <Card className="mb-8">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <Database className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">No properties found</h3>
            <p className="text-muted-foreground text-center max-w-sm mb-6">
              You don't have any registered properties yet. Start by registering your first property on the blockchain.
            </p>
            <Button asChild>
              <Link to="/register">Register Property</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <GaugeCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Properties</p>
                    <h3 className="text-2xl font-bold">{userLands.length}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <BadgeDollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                    <h3 className="text-2xl font-bold">${totalValue.toLocaleString()}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <AreaChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Status</p>
                    <h3 className="text-2xl font-bold">{verifiedCount}/{userLands.length} <span className="text-sm font-normal text-muted-foreground">Verified</span></h3>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-full bg-primary/10">
                    <Wallet className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Transactions</p>
                    <h3 className="text-2xl font-bold">{transactionCount}</h3>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="grid" className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">My Properties</h2>
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="map">Map</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userLands.map((land) => (
                  <LandCard key={land.id} land={land} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="map">
              <Card>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                      <MapComponent 
                        lands={userLands} 
                        height="500px"
                        onMarkerClick={handleMarkerClick}
                      />
                    </div>
                    <div className="p-4 border-t lg:border-t-0 lg:border-l">
                      {selectedLand ? (
                        <div>
                          <h3 className="font-semibold mb-2">{selectedLand.location.address.split(',')[0]}</h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {selectedLand.location.address.split(',').slice(1).join(',').trim()}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                            <div className="font-medium">Status:</div>
                            <div className="capitalize">{selectedLand.status}</div>
                            
                            <div className="font-medium">Type:</div>
                            <div className="capitalize">{selectedLand.propertyType}</div>
                            
                            <div className="font-medium">Area:</div>
                            <div>{selectedLand.area} sq. ft.</div>
                            
                            <div className="font-medium">Price:</div>
                            <div>${selectedLand.price.toLocaleString()}</div>
                            
                            <div className="font-medium">Registered:</div>
                            <div>{format(new Date(selectedLand.createdAt), 'MMM d, yyyy')}</div>
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline" asChild>
                              <Link to={`/property/${selectedLand.id}`}>
                                View Details
                              </Link>
                            </Button>
                            <Button size="sm" asChild>
                              <Link to={`/transfer?landId=${selectedLand.id}`}>
                                Transfer
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-4">
                          <p className="text-muted-foreground mb-2">
                            Select a property on the map to view details
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}

      <h2 className="text-xl font-bold mt-12 mb-4">Recent Transactions</h2>
      <Card>
        <CardContent className="p-6">
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No transaction history found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="flex justify-between items-center">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {tx.status === 'completed' ? '✓' : '✗'}
                    </div>
                    <div>
                      <p className="font-medium">
                        Property ID: {tx.landId.substring(0, 8)}...
                      </p>
                      <div className="flex flex-wrap gap-x-2 text-sm text-muted-foreground">
                        <span className="font-mono">{tx.fromAddress.substring(0, 6)}...{tx.fromAddress.substring(tx.fromAddress.length - 4)}</span>
                        <span>→</span>
                        <span className="font-mono">{tx.toAddress.substring(0, 6)}...{tx.toAddress.substring(tx.toAddress.length - 4)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${tx.amount.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(tx.timestamp), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;