import { mockDocuments } from '../mocks/documents';
import { mockQueryResponse, mockQuestions } from '../mocks/queries';
import type { Document, QueryRequest, QueryResponse } from '../types';

// Mock delay to simulate network requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockDocumentService = {
  getAllDocuments: async (): Promise<Document[]> => {
    await delay(800);
    return [...mockDocuments];
  },

  getDocumentById: async (id: string): Promise<Document> => {
    await delay(500);
    const document = mockDocuments.find(doc => doc.id === id);
    if (!document) {
      throw new Error('Document not found');
    }
    return { ...document };
  },

  uploadDocument: async (file: File): Promise<Document> => {
    await delay(1500);
    
    // Simulate document processing
    const newDocument: Document = {
      id: Math.random().toString(36).substring(2, 9),
      title: file.name.split('.')[0].replace(/_/g, ' ').replace(/-/g, ' '),
      fileName: file.name,
      fileType: file.name.split('.').pop() || 'unknown',
      fileSize: file.size,
      pages: Math.floor(Math.random() * 20) + 1,
      processingStatus: 'processing',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Simulate processing completion after a delay
    setTimeout(() => {
      const index = mockDocuments.findIndex(doc => doc.id === newDocument.id);
      if (index !== -1) {
        mockDocuments[index].processingStatus = 'complete';
        mockDocuments[index].updatedAt = new Date().toISOString();
      }
    }, 5000);
    
    mockDocuments.unshift(newDocument);
    return newDocument;
  },

  deleteDocument: async (id: string): Promise<void> => {
    await delay(600);
    const index = mockDocuments.findIndex(doc => doc.id === id);
    if (index !== -1) {
      mockDocuments.splice(index, 1);
    }
  },
};

export const mockQueryService = {
  askQuestion: async (queryRequest: QueryRequest): Promise<QueryResponse> => {
    await delay(2000);
    
    // Return the mock response for any question, but in a real implementation
    // this would use the queryRequest parameters to generate a relevant response
    return { ...mockQueryResponse };
  },
};