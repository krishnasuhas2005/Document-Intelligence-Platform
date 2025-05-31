# Document Intelligence Platform

A full-stack application that allows users to upload documents (PDFs, Word docs, text files) and ask natural language questions about their content using RAG (Retrieval Augmented Generation).

## Features

- Upload and manage documents (TXT, PDF, DOCX)
- Process documents with smart chunking and embedding generation
- Ask natural language questions about document content
- Receive accurate, contextual answers with source citations
- Responsive UI across all devices

## Technology Stack

### Backend
- Django REST Framework
- Python for document processing and RAG pipeline
- ChromaDB for vector storage
- OpenAI API / LM Studio for answer generation

### Frontend
- React with Next.js
- Tailwind CSS for styling
- React Query for data fetching

## Setup Instructions

### Backend Setup

1. Navigate to the `backend` directory:
```
cd backend
```

2. Create a virtual environment:
```
python -m venv venv
```

3. Activate the virtual environment:
- On Windows: `venv\Scripts\activate`
- On macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
```
pip install -r requirements.txt
```

5. Run migrations:
```
python manage.py migrate
```

6. Start the development server:
```
python manage.py runserver
```

### Frontend Setup

1. Navigate to the `frontend` directory:
```
cd frontend
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm run dev
```

## API Documentation

### Document Endpoints

- `GET /api/documents/` - Retrieve all uploaded documents
- `POST /api/documents/` - Upload a new document
- `GET /api/documents/{id}/` - Retrieve a specific document
- `DELETE /api/documents/{id}/` - Delete a document

### RAG Query Endpoint

- `POST /api/query/` - Ask a question about document content
  - Parameters:
    - `document_id`: ID of the document to query
    - `question`: Natural language question
    - `chunk_count`: Number of relevant chunks to retrieve (default: 5)

## Sample Questions & Answers

Here are some example questions you might ask the platform about your uploaded documents, along with the kind of answers you can expect:

### Example 1

**Question:**  
*What is the main purpose of the document?*

**Answer:**  
The document explains the steps to set up a backend server using Django REST Framework, including environment setup, migrations, and running the development server.

---

### Example 2

**Question:**  
*List the supported document formats.*

**Answer:**  
The platform supports uploading and processing documents in TXT, PDF, and DOCX formats.

---

### Example 3

**Question:**  
*How do I start the frontend development server?*

**Answer:**  
To start the frontend server, navigate to the `frontend` directory, install dependencies with `npm install`, then run `npm run dev` to launch the development server.

---

### Example 4

**Question:**  
*What database is used for storing vector embeddings?*

**Answer:**  
Vector embeddings are stored in ChromaDB, which allows fast similarity searches on document chunks.

---

### Example 5

**Question:**  
*Can I delete a document after uploading?*

**Answer:**  
Yes, you can delete a document using the `DELETE /api/documents/{id}/` API endpoint by providing the document’s ID.

---

### Example 6

**Question:**  
*How many chunks of the document does the system use to answer a query?*

**Answer:**  
By default, the system retrieves 5 of the most relevant chunks from the document to generate an accurate answer.



## Screenshots

### Upload Page  
![Screenshot 2025-05-31 213542](https://github.com/user-attachments/assets/b2359ce6-3715-4590-bd95-262e0c3bdadb)


### Dashboard / Library  
![Screenshot 2025-05-31 213529](https://github.com/user-attachments/assets/cc34c20c-1bc0-4b95-8aab-9a0e18f2adce)

### Q&A Interface  
![Screenshot 2025-05-31 213859](https://github.com/user-attachments/assets/dd245544-33cc-4479-9c7f-b245bdd94037)



