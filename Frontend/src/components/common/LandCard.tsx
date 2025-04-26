import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, CalendarIcon, FileText, ArrowRight } from 'lucide-react';
import { Land } from '@/types';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

interface LandCardProps {
  land: Land;
  showActions?: boolean;
}

const LandCard = ({ land, showActions = true }: LandCardProps) => {
  const statusColors = {
    verified: 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
  };

  const propertyTypeLabels = {
    residential: 'Residential',
    commercial: 'Commercial',
    agricultural: 'Agricultural'
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">
              {propertyTypeLabels[land.propertyType]}
            </Badge>
            <CardTitle className="text-lg font-semibold">
              {land.location.address.split(',')[0]}
            </CardTitle>
            <CardDescription className="flex items-center text-sm mt-1">
              <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground/70" />
              {land.location.address.split(',').slice(1).join(',')}
            </CardDescription>
          </div>
          <Badge 
            variant="secondary" 
            className={statusColors[land.status]}
          >
            {land.status.charAt(0).toUpperCase() + land.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mb-4">
          <div>
            <p className="text-muted-foreground">Area</p>
            <p className="font-medium">{land.area} sq. ft.</p>
          </div>
          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="font-medium">${land.price.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Documents</p>
            <p className="font-medium">{land.documents.length}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Created</p>
            <p className="font-medium flex items-center">
              <CalendarIcon className="h-3 w-3 mr-1" /> 
              {formatDate(land.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {land.documents.slice(0, 2).map(doc => (
            <Badge key={doc.id} variant="outline" className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              {doc.name}
            </Badge>
          ))}
          {land.documents.length > 2 && (
            <Badge variant="outline">+{land.documents.length - 2} more</Badge>
          )}
        </div>
      </CardContent>
      {showActions && (
        <CardFooter className="pt-2">
          <div className="w-full flex justify-between">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/property/${land.id}`}>
                View Details
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to={`/transfer?landId=${land.id}`}>
                Transfer <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default LandCard;