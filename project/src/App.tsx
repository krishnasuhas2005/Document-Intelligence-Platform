import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentLibraryPage from './pages/DocumentLibraryPage';
import UploadPage from './pages/UploadPage';
import QAPage from './pages/QAPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DocumentLibraryPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/qa" element={<QAPage />} />
      </Routes>
    </Router>
  );
}

export default App;