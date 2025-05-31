import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';
import type { QueryResponse as QueryResponseType } from '../../types';

interface QueryResponseProps {
  response: QueryResponseType;
  questionText: string;
}

const QueryResponse: React.FC<QueryResponseProps> = ({ response, questionText }) => {
  const [expandedCitations, setExpandedCitations] = useState<number[]>([]);

  const toggleCitation = (index: number) => {
    setExpandedCitations(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  if (!response || !response.answer) {
    return null;
  }

  return (
    <Card className="mt-6 overflow-hidden animate-fade-in">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-base text-gray-800">
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <FileText className="h-5 w-5 text-primary-500" />
            </div>
            <div className="ml-2">
              {questionText}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="prose max-w-none">
          <p className="text-gray-800 whitespace-pre-line">{response.answer}</p>
        </div>

        {response.sourceCitations && response.sourceCitations.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3">Sources</h4>
            <div className="space-y-3">
              {response.sourceCitations.map((citation, index) => (
                <div 
                  key={`${citation.documentId}-${citation.chunkIndex}`}
                  className="border border-gray-200 rounded-md overflow-hidden"
                >
                  <button
                    onClick={() => toggleCitation(index)}
                    className="w-full flex items-center justify-between p-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <FileText className="h-4 w-4 text-gray-500" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">
                          Page {citation.pageNumbers.join(', ')}
                        </div>
                        <div className="flex items-center mt-1">
                          <div className="h-1.5 bg-gray-200 rounded-full w-24">
                            <div 
                              className={`h-1.5 rounded-full ${getRelevanceColorClass(citation.relevanceScore)}`}
                              style={{ width: `${citation.relevanceScore * 100}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">
                            {Math.round(citation.relevanceScore * 100)}% relevant
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-500">
                      {expandedCitations.includes(index) ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedCitations.includes(index) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="p-3 bg-white border-t border-gray-200">
                          <div className="text-sm text-gray-700 whitespace-pre-line">
                            {citation.content}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

function getRelevanceColorClass(score: number): string {
  if (score >= 0.9) return 'bg-success-500';
  if (score >= 0.7) return 'bg-primary-500';
  if (score >= 0.5) return 'bg-secondary-500';
  if (score >= 0.3) return 'bg-warning-500';
  return 'bg-error-500';
}

export default QueryResponse;