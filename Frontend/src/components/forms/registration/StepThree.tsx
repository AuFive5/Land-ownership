import { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { RegistrationFormValues } from './RegistrationForm';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, FileUp, FileCheck } from 'lucide-react';

interface StepThreeProps {
  form: UseFormReturn<RegistrationFormValues>;
}

const StepThree = ({ form }: StepThreeProps) => {
  const [documentName, setDocumentName] = useState('');
  const [documentType, setDocumentType] = useState<'deed' | 'survey' | 'tax' | 'identity' | 'other'>('deed');
  const [fileSelected, setFileSelected] = useState(false);
  
  const documents = form.watch('documents');

  const handleAddDocument = () => {
    if (!documentName) return;
    
    const newDocument = {
      name: documentName,
      type: documentType,
      url: `/documents/${documentName.toLowerCase().replace(/\s+/g, '-')}.pdf` // Mock URL
    };
    
    form.setValue('documents', [...documents, newDocument]);
    
    // Reset form
    setDocumentName('');
    setDocumentType('deed');
    setFileSelected(false);
  };

  const handleRemoveDocument = (index: number) => {
    const updatedDocuments = [...documents];
    updatedDocuments.splice(index, 1);
    form.setValue('documents', updatedDocuments);
  };

  const handleFileChange = () => {
    // In a real app, this would handle file upload
    // For this demo, we'll just set a flag
    setFileSelected(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Required Documents</CardTitle>
          <CardDescription>
            Upload all necessary documents for verification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormItem>
              <FormLabel>Document Name</FormLabel>
              <FormControl>
                <Input
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  placeholder="Property Deed"
                />
              </FormControl>
            </FormItem>

            <FormItem>
              <FormLabel>Document Type</FormLabel>
              <Select 
                value={documentType} 
                onValueChange={(value) => setDocumentType(value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deed">Property Deed</SelectItem>
                  <SelectItem value="survey">Survey Map</SelectItem>
                  <SelectItem value="tax">Tax Records</SelectItem>
                  <SelectItem value="identity">Identity Verification</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-2">
              <FormItem>
                <FormLabel>File Upload</FormLabel>
                <div className="border rounded-md p-2 flex items-center">
                  <Input
                    type="file"
                    className="hidden"
                    id="document-upload"
                    onChange={handleFileChange}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="mr-2"
                    onClick={() => document.getElementById('document-upload')?.click()}
                  >
                    <FileUp className="h-4 w-4 mr-2" />
                    Browse
                  </Button>
                  <span className="text-sm text-muted-foreground truncate">
                    {fileSelected ? 'File selected' : 'No file selected'}
                  </span>
                </div>
              </FormItem>
            </div>

            <div className="flex items-end">
              <Button 
                type="button" 
                className="w-full" 
                disabled={!documentName || !fileSelected}
                onClick={handleAddDocument}
              >
                Add Document
              </Button>
            </div>
          </div>

          <FormField
            control={form.control}
            name="documents"
            render={() => (
              <FormItem>
                <FormLabel>Added Documents</FormLabel>
                <div className="border rounded-md p-2">
                  {documents.length === 0 ? (
                    <p className="text-sm text-muted-foreground p-2">
                      No documents added. Please add at least one document.
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {documents.map((doc, index) => (
                        <li 
                          key={index}
                          className="flex justify-between items-center p-2 bg-muted/40 rounded"
                        >
                          <div className="flex items-center">
                            <FileCheck className="h-4 w-4 mr-2 text-green-600" />
                            <span className="text-sm font-medium">{doc.name}</span>
                            <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded ml-2">
                              {doc.type}
                            </span>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemoveDocument(index)}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default StepThree;