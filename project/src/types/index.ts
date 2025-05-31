export interface Document {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  pages: number;
  processingStatus: 'pending' | 'processing' | 'complete' | 'error';
  createdAt: string;
  updatedAt: string;
}

export interface DocumentChunk {
  id: string;
  documentId: string;
  chunkIndex: number;
  pageNumbers: number[];
  content: string;
}

export interface Question {
  id: string;
  documentId: string;
  question: string;
  answer: string;
  sourceCitations: SourceCitation[];
  createdAt: string;
}

export interface SourceCitation {
  documentId: string;
  chunkIndex: number;
  pageNumbers: number[];
  content: string;
  relevanceScore: number;
}

export interface QueryRequest {
  documentId: string;
  question: string;
  numChunks?: number;
}

export interface QueryResponse {
  answer: string;
  sourceCitations: SourceCitation[];
}