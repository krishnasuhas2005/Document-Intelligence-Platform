import axios from 'axios';
import type { Document, QueryRequest, QueryResponse } from '../types';

// In a real implementation, this would be replaced with an actual API URL
// For the mock version, we'll use a base URL that we'll intercept
const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const documentService = {
  getAllDocuments: async (): Promise<Document[]> => {
    const response = await api.get('/documents');
    return response.data;
  },

  getDocumentById: async (id: string): Promise<Document> => {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  },

  uploadDocument: async (file: File): Promise<Document> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  deleteDocument: async (id: string): Promise<void> => {
    await api.delete(`/documents/${id}`);
  },
};

export const queryService = {
  askQuestion: async (queryRequest: QueryRequest): Promise<QueryResponse> => {
    const response = await api.post('/query', queryRequest);
    return response.data;
  },
};