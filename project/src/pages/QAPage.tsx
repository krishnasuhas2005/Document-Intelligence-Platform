import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import QueryInput from '../components/qa/QueryInput';
import QueryResponse from '../components/qa/QueryResponse';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import type { Document, QueryRequest, QueryResponse as QueryResponseType, Question } from '../types';
import { mockDocumentService, mockQueryService } from '../services/mockService';
import { mockQuestions } from '../mocks/queries';

const QAPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const documentId = searchParams.get('documentId');
  
  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [currentResponse, setCurrentResponse] = useState<QueryResponseType | null>(null);
  const [recentQuestions, setRecentQuestions] = useState<Question[]>([]);
  const [isDocumentLoading, setIsDocumentLoading] = useState(true);
  
  useEffect(() => {
    const loadDocument = async () => {
      if (!documentId) return;
      
      try {
        setIsDocumentLoading(true);
        const doc = await mockDocumentService.getDocumentById(documentId);
        setDocument(doc);
        
        // Load recent questions for this document from the mock data
        const questions = mockQuestions.filter(q => q.documentId === documentId);
        setRecentQuestions(questions);
      } catch (error) {
        console.error('Error loading document:', error);
      } finally {
        setIsDocumentLoading(false);
      }
    };
    
    loadDocument();
  }, [documentId]);
  
  const handleQuerySubmit = async (queryRequest: QueryRequest) => {
    try {
      setIsLoading(true);
      setCurrentQuestion(queryRequest.question);
      
      const response = await mockQueryService.askQuestion(queryRequest);
      setCurrentResponse(response);
      
      // Add to recent questions (in a real app, this would be saved to the backend)
      const newQuestion: Question = {
        id: Math.random().toString(36).substring(2, 9),
        documentId: queryRequest.documentId,
        question: queryRequest.question,
        answer: response.answer,
        sourceCitations: response.sourceCitations,
        createdAt: new Date().toISOString(),
      };
      
      setRecentQuestions(prev => [newQuestion, ...prev]);
    } catch (error) {
      console.error('Error submitting query:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isDocumentLoading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 text-primary-500 animate-spin" />
        </div>
      </PageLayout>
    );
  }
  
  if (!document && documentId) {
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Document Not Found</h1>
          <p className="text-gray-600 mb-6">The document you're looking for doesn't exist or has been removed.</p>
          <Link to="/">
            <Button variant="primary">Return to Document Library</Button>
          </Link>
        </div>
      </PageLayout>
    );
  }
  
  return (
    <PageLayout>
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-primary-600 hover:text-primary-700">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Document Library</span>
        </Link>
      </div>
      
      {document ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-xl">Ask Questions</CardTitle>
                <div className="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded">
                  {document.fileType.toUpperCase()}
                </div>
              </CardHeader>
              <CardContent>
                <h2 className="text-lg font-medium text-gray-900 mb-4">{document.title}</h2>
                <QueryInput 
                  documentId={document.id} 
                  isLoading={isLoading}
                  onSubmit={handleQuerySubmit}
                />
              </CardContent>
            </Card>
            
            {currentResponse && (
              <QueryResponse 
                response={currentResponse} 
                questionText={currentQuestion} 
              />
            )}
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Questions</CardTitle>
              </CardHeader>
              <CardContent>
                {recentQuestions.length > 0 ? (
                  <div className="space-y-3">
                    {recentQuestions.map(question => (
                      <div 
                        key={question.id}
                        className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => {
                          setCurrentQuestion(question.question);
                          setCurrentResponse({
                            answer: question.answer,
                            sourceCitations: question.sourceCitations,
                          });
                        }}
                      >
                        <p className="text-sm font-medium text-gray-800">{question.question}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(question.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500 text-sm">No questions asked yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Select a Document</h1>
          <p className="text-gray-600 mb-6">Please select a document from the Document Library to ask questions.</p>
          <Link to="/">
            <Button variant="primary">Go to Document Library</Button>
          </Link>
        </div>
      )}
    </PageLayout>
  );
};

export default QAPage;