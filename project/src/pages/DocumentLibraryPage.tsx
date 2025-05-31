import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import DocumentGrid from '../components/documents/DocumentGrid';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import type { Document } from '../types';
import { mockDocumentService } from '../services/mockService';

const DocumentLibraryPage: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setIsLoading(true);
        const docs = await mockDocumentService.getAllDocuments();
        setDocuments(docs);
      } catch (error) {
        console.error('Error loading documents:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDocuments();
  }, []);
  
  const handleDeleteDocument = async (id: string) => {
    try {
      await mockDocumentService.deleteDocument(id);
      setDocuments(prev => prev.filter(doc => doc.id !== id));
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };
  
  return (
    <PageLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Document Library</h1>
          <p className="text-gray-600">Manage your documents and ask questions about their content</p>
        </div>
        <Link to="/upload" className="mt-4 md:mt-0">
          <Button variant="primary" className="w-full md:w-auto">
            Upload New Document
          </Button>
        </Link>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 text-primary-500 animate-spin" />
        </div>
      ) : (
        <DocumentGrid documents={documents} onDelete={handleDeleteDocument} />
      )}
    </PageLayout>
  );
};

export default DocumentLibraryPage;