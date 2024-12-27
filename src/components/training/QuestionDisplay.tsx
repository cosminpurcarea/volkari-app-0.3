import React from 'react';
import type { Database } from '../../lib/database.types';

type Noun = Database['public']['Tables']['nouns']['Row'];

interface QuestionDisplayProps {
  currentQuestion: number;
  totalQuestions: number;
  noun: Noun;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  currentQuestion,
  totalQuestions,
  noun,
}) => (
  <div className="mb-8">
    <p className="text-sm text-gray-500 mb-2">
      Question {currentQuestion} of {totalQuestions}
    </p>
    <h2 className="text-4xl font-bold mb-4">{noun.word}</h2>
    <p className="text-gray-500">({noun.translation})</p>
  </div>
);