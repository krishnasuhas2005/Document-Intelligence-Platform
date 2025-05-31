import React from 'react';
import DocumentCard from './DocumentCard';
import type { Document } from '../../types';

interface DocumentGridProps {
  documents: Document[];
  onDelete: (id: string) => void;
}

const DocumentGrid: React.FC<DocumentGridProps> = ({ documents, onDelete }) => {
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
        <p className="text-gray-500 mb-4">Upload a document to get started with document intelligence.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((document) => (
        <DocumentCard 
          key={document.id} 
          document={document} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default DocumentGrid;