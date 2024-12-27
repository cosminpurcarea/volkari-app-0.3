import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import type { Database } from '../../lib/database.types';

type Noun = Database['public']['Tables']['nouns']['Row'];

interface SessionSummaryProps {
  answers: Array<{
    noun: Noun;
    selectedArticle: 'der' | 'die' | 'das';
    isCorrect: boolean;
  }>;
  totalQuestions: number;
  correctAnswers: number;
  onClose: () => void;
}

export const SessionSummary: React.FC<SessionSummaryProps> = ({
  answers,
  totalQuestions,
  correctAnswers,
  onClose,
}) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Session Summary</h2>
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-4xl font-bold text-center text-blue-600 mb-2">
          {percentage}%
        </div>
        <div className="text-center text-gray-600">
          {correctAnswers} correct out of {totalQuestions} questions
        </div>
      </div>

      <div className="space-y-4">
        {answers.map((answer, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg flex items-center justify-between ${
              answer.isCorrect ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div>
                {answer.isCorrect ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-500" />
                )}
              </div>
              <div>
                <div className="font-medium">{answer.noun.word}</div>
                <div className="text-sm text-gray-600">
                  {answer.noun.translation}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className={answer.isCorrect ? 'text-green-600' : 'text-red-600'}>
                {answer.selectedArticle}
              </div>
              {!answer.isCorrect && (
                <div className="text-gray-600">
                  (correct: {answer.noun.article})
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
      >
        Back to Training
      </button>
    </div>
  );
};