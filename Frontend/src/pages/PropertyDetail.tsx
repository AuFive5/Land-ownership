import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import MapComponent from '@/components/common/MapComponent';
import { useLandRegistry } from '@/contexts/LandRegistryContext';
import { Land } from '@/types';
import { useWeb3 } from '@/contexts/Web3Context';
import { MapPin, Calendar, FileText, ArrowLeft, ArrowRight, Landmark, Clock, History, CheckCircle2, AlertCircle, Ban } from 'lucide-react';
import { format } from 'date-fns';
import LoadingSpinner from '@/components/layout/LoadingSpinner';

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchLandDetails, isLoading } = useLandRegistry();
  const { walletInfo } = useWeb3();
  const [land, setLand] = useState<Land | null>(null);
  const [tab, setTab] = useState('details');

  useEffect(() => {
    const loadLandDetails = async () => {
      if (id) {
        const landData = await fetchLandDetails(id);
        setLand(landData);
      }
    };
    
    loadLandDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!land) {
    return (
      <div className="container py-8">
        <div className="flex items-center gap-2 mb-8">
          <Button variant="outline" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Property Not Found</h1>
        </div>
        
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">Property Not Found</h2>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              The property you're looking for doesn't exist or you don't have permission to view it.
            </p>
            <Button asChild>
              <Link to="/dashboard">Return to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isOwner = walletInfo?.address && land.owner.toLowerCase() === walletInfo.address.toLowerCase();
  
  const statusColors = {
    verified: 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
  };

  const statusIcons = {
    verified: <CheckCircle2 className="h-8 w-8 text-green-600" />,
    pending: <Clock className="h-8 w-8 text-yellow-600" />,
    rejected: <Ban className="h-8 w-8 text-red-600" />
  };

  const propertyTypeLabels = {
    residential: 'Residential',
    commercial: 'Commercial',
    agricultural: 'Agricultural'
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  return (
    <div className="container py-8">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">
                Property Details
              </h1>
              <Badge 
                variant="secondary" 
                className={statusColors[land.status]}
              >
                {land.status.charAt(0).toUpperCase() + land.status.slice(1)}
              </Badge>
            </div>
            <p className="text-muted-foreground flex items-center mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {land.location.address}
            </p>
          </div>
        </div>
        
        {isOwner && (
          <Button className="gap-2" asChild>
            <Link to={`/transfer?landId=${land.id}`}>
              Transfer Ownership
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>Property Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Property Type</h3>
                      <p className="font-medium">{propertyTypeLabels[land.propertyType]}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Area</h3>
                      <p className="font-medium">{land.area} sq. ft.</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Price</h3>
                      <p className="font-medium">${land.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Owner</h3>
                      <p className="font-mono text-sm">
                        {land.owner.substring(0, 10)}...{land.owner.substring(land.owner.length - 8)}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Registration Date</h3>
                      <p className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(land.createdAt)}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                      <p className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(land.updatedAt)}
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-4">Property Location</h3>
                    <MapComponent 
                      lands={[land]} 
                      center={[land.location.lat, land.location.lng]}
                      zoom={14}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle>Property Documents</CardTitle>
                  <CardDescription>
                    All documents associated with this property
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {land.documents.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No documents found for this property</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {land.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{doc.name}</p>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="outline" className="capitalize">
                                  {doc.type}
                                </Badge>
                                <span>•</span>
                                <span>{format(new Date(doc.uploadedAt), 'MMM d, yyyy')}</span>
                              </div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Property History</CardTitle>
                  <CardDescription>
                    Timeline of events for this property
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute left-3.5 top-0 h-full w-px bg-border" />
                    
                    <div className="space-y-6">
                      <div className="relative pl-10">
                        <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border bg-muted">
                          <Landmark className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Property Registered</h4>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(land.createdAt)}
                          </p>
                          <p className="text-sm mt-1">
                            Property was registered by <span className="font-mono">{land.owner.substring(0, 6)}...{land.owner.substring(land.owner.length - 4)}</span>
                          </p>
                        </div>
                      </div>
                      
                      {land.status !== 'pending' && (
                        <div className="relative pl-10">
                          <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border bg-muted">
                            {land.status === 'verified' ? (
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            ) : (
                              <Ban className="h-3.5 w-3.5" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">
                              Property {land.status === 'verified' ? 'Verified' : 'Rejected'}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(land.updatedAt)}
                            </p>
                            <p className="text-sm mt-1">
                              {land.status === 'verified' 
                                ? 'Property was verified and approved by the registry authority' 
                                : 'Property registration was rejected by the registry authority'
                              }
                            </p>
                          </div>
                        </div>
                      )}
                      
                      {land.status === 'pending' && (
                        <div className="relative pl-10">
                          <div className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border bg-muted">
                            <Clock className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <h4 className="font-medium">Pending Verification</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatDate(new Date())}
                            </p>
                            <p className="text-sm mt-1">
                              Property is awaiting verification from the registry authority
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Status</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                {statusIcons[land.status]}
              </div>
              <h3 className="text-xl font-bold mb-1">
                {land.status === 'verified' ? 'Verified' : 
                 land.status === 'pending' ? 'Verification Pending' : 'Registration Rejected'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {land.status === 'verified' ? 
                  'This property has been verified and is securely registered on the blockchain.' :
                 land.status === 'pending' ? 
                  'This property is awaiting verification from registry officials.' :
                  'This property registration was rejected. Please contact support for more information.'}
              </p>
              
              {land.status === 'verified' && (
                <div className="w-full p-3 bg-green-50 dark:bg-green-900/20 rounded-md text-sm text-green-700 dark:text-green-400">
                  Registered on blockchain with cryptographic proof of ownership
                </div>
              )}
              
              {land.status === 'pending' && (
                <div className="w-full p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md text-sm text-yellow-700 dark:text-yellow-400">
                  Estimated verification time: 1-2 business days
                </div>
              )}
              
              {land.status === 'rejected' && (
                <div className="w-full p-3 bg-red-50 dark:bg-red-900/20 rounded-md text-sm text-red-700 dark:text-red-400">
                  Please contact support for rejection details
                </div>
              )}
            </CardContent>
          </Card>
          
          {isOwner && (
            <Card>
              <CardHeader>
                <CardTitle>Owner Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" asChild disabled={land.status !== 'verified'}>
                  <Link to={`/transfer?landId=${land.id}`}>
                    Transfer Ownership
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  Update Information
                </Button>
                <Button variant="outline" className="w-full">
                  Add Documents
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;