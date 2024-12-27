import { useState, useEffect, useCallback } from 'react';
import { useNouns } from './useNouns';
import type { Database } from '../lib/database.types';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

type Noun = Database['public']['Tables']['nouns']['Row'];

export function useTrainingSession(numberOfQuestions: number, secondsPerQuestion: number) {
  const { nouns, loading: nounsLoading } = useNouns();
  const [currentNounIndex, setCurrentNounIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [sessionNouns, setSessionNouns] = useState<Noun[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (nouns.length > 0) {
      // Shuffle and slice the nouns array to get random nouns for the session
      const shuffled = [...nouns].sort(() => Math.random() - 0.5);
      setSessionNouns(shuffled.slice(0, Math.min(numberOfQuestions, nouns.length)));
    }
  }, [nouns, numberOfQuestions]);

  const currentNoun = sessionNouns[currentNounIndex];
  const isSessionComplete = currentNounIndex >= sessionNouns.length;

  const handleAnswer = useCallback(async (selectedArticle: 'der' | 'die' | 'das') => {
    const isCorrect = selectedArticle === currentNoun?.article;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
    }

    const isLastQuestion = currentNounIndex + 1 >= sessionNouns.length;
    if (isLastQuestion && user) {
      try {
        await supabase.from('training_sessions').insert({
          user_id: user.id,
          correct_answers: correctAnswers + (isCorrect ? 1 : 0),
          total_questions: sessionNouns.length,
          seconds_per_question: secondsPerQuestion,
        });
      } catch (error) {
        console.error('Error saving training session:', error);
      }
    }

    setCurrentNounIndex(prev => prev + 1);
  }, [currentNoun, currentNounIndex, sessionNouns.length, correctAnswers, user, secondsPerQuestion]);

  return {
    currentNoun,
    isSessionComplete,
    correctAnswers,
    currentNounIndex,
    totalQuestions: sessionNouns.length,
    loading: nounsLoading,
    handleAnswer,
  };
}