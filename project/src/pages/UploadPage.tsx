import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import DocumentUploader from '../components/documents/DocumentUploader';
import type { Document } from '../types';
import { mockDocumentService } from '../services/mockService';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const UploadPage: React.FC = () => {
  const handleUpload = async (file: File): Promise<Document> => {
    return await mockDocumentService.uploadDocument(file);
  };
  
  return (
    <PageLayout>
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Document Library</span>
        </Link>
      </div>
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Upload Document</CardTitle>
        </CardHeader>
        <CardContent>
          <DocumentUploader onUpload={handleUpload} />
          
          <div className="mt-8 border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Supported Document Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium text-gray-800">PDF Documents</p>
                <p className="text-sm text-gray-600 mt-1">Upload PDF files with text content for best results.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium text-gray-800">Word Documents</p>
                <p className="text-sm text-gray-600 mt-1">Upload .docx or .doc files with formatted text.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium text-gray-800">Text Files</p>
                <p className="text-sm text-gray-600 mt-1">Upload plain .txt files for simple text processing.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default UploadPage;