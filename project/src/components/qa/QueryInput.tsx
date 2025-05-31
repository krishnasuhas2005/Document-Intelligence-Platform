import React, { useState } from 'react';
import { Search, Loader } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import type { QueryRequest } from '../../types';

interface QueryInputProps {
  documentId: string;
  isLoading: boolean;
  onSubmit: (queryRequest: QueryRequest) => void;
}

const QueryInput: React.FC<QueryInputProps> = ({ documentId, isLoading, onSubmit }) => {
  const [question, setQuestion] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    onSubmit({
      documentId,
      question: question.trim(),
      numChunks: 3,
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <Input
          type="text"
          placeholder="Ask a question about this document..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="pr-24 h-12"
          disabled={isLoading}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
          <Button
            type="submit"
            disabled={!question.trim() || isLoading}
            className="h-9"
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Thinking
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Ask
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default QueryInput;