import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, FileWarning, Check } from 'lucide-react';
import Button from '../ui/Button';
import type { Document } from '../../types';

interface DocumentUploaderProps {
  onUpload: (file: File) => Promise<Document>;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedDocument, setUploadedDocument] = useState<Document | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      
      const file = acceptedFiles[0];
      setIsUploading(true);
      setError(null);
      
      try {
        const document = await onUpload(file);
        setUploadedDocument(document);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to upload document');
      } finally {
        setIsUploading(false);
      }
    },
    [onUpload]
  );
  
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
  });
  
  const renderUploadStatus = () => {
    if (isUploading) {
      return (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 animate-pulse-slow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <File className="h-8 w-8 text-gray-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">
                Uploading {acceptedFiles[0]?.name}...
              </h3>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary-600 h-2.5 rounded-full w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="mt-4 p-4 bg-error-50 rounded-lg border border-error-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileWarning className="h-8 w-8 text-error-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-error-800">Upload failed</h3>
              <p className="mt-1 text-sm text-error-700">{error}</p>
            </div>
          </div>
        </div>
      );
    }
    
    if (uploadedDocument) {
      return (
        <div className="mt-4 p-4 bg-success-50 rounded-lg border border-success-200 animate-fade-in">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Check className="h-8 w-8 text-success-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-success-800">Upload successful!</h3>
              <p className="mt-1 text-sm text-success-700">
                {uploadedDocument.title} has been uploaded and is being processed.
              </p>
            </div>
          </div>
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragActive
            ? 'border-primary-400 bg-primary-50'
            : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <Upload className={`h-12 w-12 mb-4 ${isDragActive ? 'text-primary-500' : 'text-gray-400'}`} />
          <p className="text-lg font-medium text-gray-900 mb-1">
            {isDragActive ? 'Drop the file here' : 'Drag and drop your document'}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            or click to browse (PDF, DOCX, TXT)
          </p>
          <Button type="button">Select Document</Button>
        </div>
      </div>
      
      {renderUploadStatus()}
    </div>
  );
};

export default DocumentUploader;