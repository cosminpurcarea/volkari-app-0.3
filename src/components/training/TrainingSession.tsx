import React, { useState, useEffect } from 'react';
import { useNouns } from '../../hooks/useNouns';
import { ArticleButton } from './ArticleButton';
import { QuestionDisplay } from './QuestionDisplay';
import { SessionSummary } from './SessionSummary';
import { Timer } from './Timer';
import { Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import type { Database } from '../../lib/database.types';

type Noun = Database['public']['Tables']['nouns']['Row'];

interface TrainingSessionProps {
  numberOfQuestions: number;
  secondsPerQuestion: number;
  onComplete: () => void;
}

export const TrainingSession: React.FC<TrainingSessionProps> = ({
  numberOfQuestions,
  secondsPerQuestion,
  onComplete,
}) => {
  const { nouns, loading } = useNouns();
  const [sessionNouns, setSessionNouns] = useState<Noun[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answers, setAnswers] = useState<Array<{
    noun: Noun;
    selectedArticle: 'der' | 'die' | 'das' | null;
    isCorrect: boolean;
  }>>([]);
  const [showSummary, setShowSummary] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (nouns.length > 0) {
      const shuffled = [...nouns].sort(() => Math.random() - 0.5);
      setSessionNouns(shuffled.slice(0, numberOfQuestions));
    }
  }, [nouns, numberOfQuestions]);

  const handleTimeout = () => {
    handleAnswer(null);
  };

  const handleAnswer = async (selectedArticle: 'der' | 'die' | 'das' | null) => {
    const currentNoun = sessionNouns[currentIndex];
    const isCorrect = selectedArticle === currentNoun.article;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }

    const newAnswer = {
      noun: currentNoun,
      selectedArticle,
      isCorrect: selectedArticle === null ? false : isCorrect,
    };

    setAnswers(prev => [...prev, newAnswer]);

    if (currentIndex + 1 >= sessionNouns.length) {
      const finalCorrectAnswers = correctAnswers + (isCorrect ? 1 : 0);
      
      if (user) {
        try {
          const { data: sessionData, error: sessionError } = await supabase
            .from('training_sessions')
            .insert({
              user_id: user.id,
              correct_answers: finalCorrectAnswers,
              total_questions: sessionNouns.length,
              seconds_per_question: secondsPerQuestion,
            })
            .select()
            .single();

          if (sessionError) throw sessionError;

          const { error: answersError } = await supabase
            .from('session_answers')
            .insert(
              [...answers, newAnswer].map(answer => ({
                session_id: sessionData.id,
                noun_id: answer.noun.id,
                selected_article: answer.selectedArticle || 'none',
                is_correct: answer.isCorrect,
              }))
            );

          if (answersError) throw answersError;
        } catch (error) {
          console.error('Error saving training session:', error);
        }
      }

      setShowSummary(true);
    } else {
      setCurrentIndex(prev => prev + 1);
    }
  };

  if (loading || sessionNouns.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (showSummary) {
    return (
      <SessionSummary
        answers={answers}
        totalQuestions={sessionNouns.length}
        correctAnswers={correctAnswers}
        onClose={onComplete}
      />
    );
  }

  const currentNoun = sessionNouns[currentIndex];

  return (
    <div className="max-w-lg mx-auto text-center">
      <Timer
        key={currentIndex} // Force timer remount for each new noun
        seconds={secondsPerQuestion}
        onTimeout={handleTimeout}
        isActive={true}
      />

      <QuestionDisplay
        currentQuestion={currentIndex + 1}
        totalQuestions={sessionNouns.length}
        noun={currentNoun}
      />

      <div className="grid grid-cols-3 gap-4">
        {(['der', 'die', 'das'] as const).map((article) => (
          <ArticleButton
            key={article}
            article={article}
            onClick={handleAnswer}
          />
        ))}
      </div>
    </div>
  );
};