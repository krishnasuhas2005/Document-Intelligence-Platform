import React from 'react';
import { File, FileText, FileImage, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import type { Document } from '../../types';

interface DocumentCardProps {
  document: Document;
  onDelete: (id: string) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onDelete }) => {
  const getFileIcon = () => {
    switch (document.fileType) {
      case 'pdf':
        return <File className="w-8 h-8 text-error-500" />;
      case 'docx':
      case 'doc':
        return <FileText className="w-8 h-8 text-primary-500" />;
      case 'txt':
        return <FileText className="w-8 h-8 text-gray-500" />;
      case 'jpg':
      case 'png':
      case 'jpeg':
        return <FileImage className="w-8 h-8 text-secondary-500" />;
      default:
        return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  const getStatusBadge = () => {
    switch (document.processingStatus) {
      case 'complete':
        return <Badge variant="success" className="flex items-center"><CheckCircle className="w-3 h-3 mr-1" /> Processed</Badge>;
      case 'processing':
        return <Badge variant="warning" className="flex items-center"><Clock className="w-3 h-3 mr-1 animate-pulse-slow" /> Processing</Badge>;
      case 'pending':
        return <Badge variant="default" className="flex items-center"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
      case 'error':
        return <Badge variant="error" className="flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> Error</Badge>;
      default:
        return null;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <Card className="overflow-hidden animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            {getFileIcon()}
            <div>
              <CardTitle className="text-base mb-1">{document.title}</CardTitle>
              <p className="text-xs text-gray-500">{document.fileName}</p>
            </div>
          </div>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Size</p>
            <p className="font-medium">{formatFileSize(document.fileSize)}</p>
          </div>
          <div>
            <p className="text-gray-500">Pages</p>
            <p className="font-medium">{document.pages}</p>
          </div>
          <div>
            <p className="text-gray-500">Type</p>
            <p className="font-medium uppercase">{document.fileType}</p>
          </div>
          <div>
            <p className="text-gray-500">Added</p>
            <p className="font-medium">{formatDate(document.createdAt)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t border-gray-100">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onDelete(document.id)}
          className="text-gray-500 hover:text-error-600"
        >
          Delete
        </Button>
        <Link to={`/qa?documentId=${document.id}`}>
          <Button 
            variant="primary" 
            size="sm"
            disabled={document.processingStatus !== 'complete'}
          >
            Ask Questions
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DocumentCard;