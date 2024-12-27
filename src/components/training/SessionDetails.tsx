import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import type { Database } from '../../lib/database.types';

type SessionAnswer = Database['public']['Tables']['session_answers']['Row'] & {
  noun: Database['public']['Tables']['nouns']['Row'];
};

interface SessionDetailsProps {
  session: Database['public']['Tables']['training_sessions']['Row'];
  answers: SessionAnswer[];
  onClose: () => void;
}

export const SessionDetails: React.FC<SessionDetailsProps> = ({
  session,
  answers,
  onClose,
}) => {
  const percentage = Math.round((session.correct_answers / session.total_questions) * 100);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Session Details</h2>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800"
        >
          Close
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-4xl font-bold text-center text-blue-600 mb-2">
            {percentage}%
          </div>
          <div className="text-center text-gray-600">
            Success Rate
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="text-center space-y-2">
            <div className="text-gray-600">
              <span className="font-medium">{session.correct_answers}</span> correct out of{' '}
              <span className="font-medium">{session.total_questions}</span>
            </div>
            <div className="text-gray-600">
              <span className="font-medium">{session.seconds_per_question}</span> seconds per question
            </div>
            <div className="text-gray-600">
              Completed on{' '}
              <span className="font-medium">
                {new Date(session.completed_at).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {answers.map((answer) => (
          <div
            key={answer.id}
            className={`p-4 rounded-lg flex items-center justify-between ${
              answer.is_correct ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div>
                {answer.is_correct ? (
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
              <div className={answer.is_correct ? 'text-green-600' : 'text-red-600'}>
                {answer.selected_article}
              </div>
              {!answer.is_correct && (
                <div className="text-gray-600">
                  (correct: {answer.noun.article})
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};