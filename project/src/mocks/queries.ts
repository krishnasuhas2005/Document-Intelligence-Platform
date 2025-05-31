import type { QueryResponse, Question } from '../types';

export const mockQueryResponse: QueryResponse = {
  answer: "Based on the document, the Smart City Initiative proposes the implementation of IoT sensors throughout the city infrastructure to collect real-time data on traffic flow, air quality, energy usage, and waste management. The project timeline is expected to span 24 months, with the first phase focusing on downtown infrastructure implementation within the first 8 months. The estimated budget for the project is $12.5 million, with projected annual savings of $3.2 million once fully operational through improved energy efficiency and optimized resource allocation.",
  sourceCitations: [
    {
      documentId: '2',
      chunkIndex: 3,
      pageNumbers: [4, 5],
      content: "The Smart City Initiative will implement IoT sensors throughout the city infrastructure to collect real-time data on traffic flow, air quality, energy usage, and waste management. This data will be analyzed using our proprietary algorithms to optimize city operations.",
      relevanceScore: 0.92,
    },
    {
      documentId: '2',
      chunkIndex: 5,
      pageNumbers: [8],
      content: "Project timeline is expected to span 24 months, with the first phase focusing on downtown infrastructure implementation within the first 8 months.",
      relevanceScore: 0.87,
    },
    {
      documentId: '2',
      chunkIndex: 7,
      pageNumbers: [10],
      content: "The estimated budget for the project is $12.5 million, with projected annual savings of $3.2 million once fully operational through improved energy efficiency and optimized resource allocation.",
      relevanceScore: 0.85,
    },
  ],
};

export const mockQuestions: Question[] = [
  {
    id: '1',
    documentId: '2',
    question: "What are the key features and timeline of the Smart City Initiative?",
    answer: mockQueryResponse.answer,
    sourceCitations: mockQueryResponse.sourceCitations,
    createdAt: '2024-10-11T14:25:00.000Z',
  },
  {
    id: '2',
    documentId: '1',
    question: "What were the company's financial highlights for Q3 2024?",
    answer: "According to the 2024 Annual Report, the company's Q3 financial highlights include revenue growth of 18% year-over-year, reaching $89.5 million. The gross margin improved to 62%, up from 58% in the same period last year. Operating expenses were reduced by 5% through operational efficiencies while still increasing R&D investment by 12%. The report notes that the cloud services division saw the highest growth at 27%, while the hardware division grew by a modest 8%. The company's cash position strengthened to $142 million, an increase of $28 million from the previous quarter.",
    sourceCitations: [
      {
        documentId: '1',
        chunkIndex: 12,
        pageNumbers: [15],
        content: "Q3 2024 saw revenue growth of 18% year-over-year, reaching $89.5 million. Gross margin improved to 62%, up from 58% in the same period last year.",
        relevanceScore: 0.94,
      },
      {
        documentId: '1',
        chunkIndex: 13,
        pageNumbers: [16],
        content: "Operating expenses were reduced by 5% through operational efficiencies while still increasing R&D investment by 12%.",
        relevanceScore: 0.89,
      },
      {
        documentId: '1',
        chunkIndex: 14,
        pageNumbers: [16],
        content: "The cloud services division saw the highest growth at 27%, while the hardware division grew by a modest 8%. The company's cash position strengthened to $142 million, an increase of $28 million from the previous quarter.",
        relevanceScore: 0.85,
      },
    ],
    createdAt: '2024-10-10T16:30:00.000Z',
  },
];