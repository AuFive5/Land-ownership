import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Land } from '@/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Eye, Check, X } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DataTableProps {
  data: Land[];
  onVerify: (id: string) => void;
  onReject: (id: string) => void;
}

const DataTable = ({ data, onVerify, onReject }: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'residential' | 'commercial' | 'agricultural'>('all');
  const [selectedLand, setSelectedLand] = useState<Land | null>(null);
  
  // Apply filters
  const filteredData = data.filter(land => {
    // Search term filter
    const matchesSearch = land.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          land.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          land.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || land.status === statusFilter;
    
    // Type filter
    const matchesType = typeFilter === 'all' || land.propertyType === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };

  const handleViewDetails = (land: Land) => {
    setSelectedLand(land);
  };

  const statusColors = {
    verified: 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-800/20 dark:text-red-400'
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by address, owner, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={(value) => setTypeFilter(value as any)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="residential">Residential</SelectItem>
              <SelectItem value="commercial">Commercial</SelectItem>
              <SelectItem value="agricultural">Agricultural</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((land) => (
                <TableRow key={land.id}>
                  <TableCell className="font-mono text-xs">
                    {land.id.substring(0, 8)}...
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {land.location.address}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {land.owner.substring(0, 6)}...{land.owner.substring(land.owner.length - 4)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {land.propertyType}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(land.createdAt)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={statusColors[land.status]}
                    >
                      {land.status.charAt(0).toUpperCase() + land.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleViewDetails(land)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {land.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => onVerify(land.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => onReject(land.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Detail Dialog */}
      <Dialog open={!!selectedLand} onOpenChange={() => setSelectedLand(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Property Details</DialogTitle>
          </DialogHeader>
          
          {selectedLand && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Property Information</h3>
                <div className="grid grid-cols-2 gap-y-3 text-sm">
                  <div className="font-medium">ID:</div>
                  <div className="font-mono">{selectedLand.id}</div>
                  
                  <div className="font-medium">Owner:</div>
                  <div className="font-mono">{selectedLand.owner}</div>
                  
                  <div className="font-medium">Property Type:</div>
                  <div className="capitalize">{selectedLand.propertyType}</div>
                  
                  <div className="font-medium">Area:</div>
                  <div>{selectedLand.area} sq. ft.</div>
                  
                  <div className="font-medium">Price:</div>
                  <div>${selectedLand.price.toLocaleString()}</div>
                  
                  <div className="font-medium">Status:</div>
                  <div>
                    <Badge 
                      variant="secondary" 
                      className={statusColors[selectedLand.status]}
                    >
                      {selectedLand.status.charAt(0).toUpperCase() + selectedLand.status.slice(1)}
                    </Badge>
                  </div>
                  
                  <div className="font-medium">Created:</div>
                  <div>{formatDate(selectedLand.createdAt)}</div>
                  
                  <div className="font-medium">Updated:</div>
                  <div>{formatDate(selectedLand.updatedAt)}</div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-sm mb-4">{selectedLand.location.address}</p>
                
                <h3 className="font-semibold mb-2 mt-4">Documents</h3>
                <ul className="space-y-2">
                  {selectedLand.documents.map(doc => (
                    <li key={doc.id} className="text-sm flex justify-between items-center p-2 bg-muted/40 rounded">
                      <span>{doc.name}</span>
                      <Badge variant="outline">{doc.type}</Badge>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="md:col-span-2">
                {selectedLand.status === 'pending' && (
                  <div className="flex justify-end gap-2 mt-4">
                    <Button 
                      variant="outline" 
                      className="gap-2"
                      onClick={() => onReject(selectedLand.id)}
                    >
                      <X className="h-4 w-4" />
                      Reject
                    </Button>
                    <Button 
                      className="gap-2"
                      onClick={() => onVerify(selectedLand.id)}
                    >
                      <Check className="h-4 w-4" />
                      Verify
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataTable;