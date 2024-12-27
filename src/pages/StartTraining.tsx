import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import type { TrainingSession as TrainingSessionType } from '../types';
import { TrainingSession } from '../components/training/TrainingSession';
import { useNouns } from '../hooks/useNouns';
import { useUserSettings } from '../hooks/useUserSettings';

const StartTraining: React.FC = () => {
  const { settings } = useUserSettings();
  const [session, setSession] = useState<TrainingSessionType>({
    numberOfQuestions: 10,
    secondsPerQuestion: 5,
  });
  const [isTraining, setIsTraining] = useState(false);
  const { nouns, loading } = useNouns();

  useEffect(() => {
    if (settings) {
      setSession({
        numberOfQuestions: settings.default_questions_per_session,
        secondsPerQuestion: settings.default_seconds_per_question,
      });
    }
  }, [settings]);

  const handleStartTraining = () => {
    if (nouns.length === 0) {
      alert('Please add some nouns first in the Nouns Register!');
      return;
    }
    
    if (nouns.length < session.numberOfQuestions) {
      alert(`Only ${nouns.length} nouns available. Please add more nouns or reduce the number of questions.`);
      return;
    }
    
    setIsTraining(true);
  };

  const handleTrainingComplete = () => {
    setIsTraining(false);
  };

  if (isTraining) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <TrainingSession
          numberOfQuestions={session.numberOfQuestions}
          secondsPerQuestion={session.secondsPerQuestion}
          onComplete={handleTrainingComplete}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <Settings className="h-5 w-5 text-[#19233b]" />
          <h2 className="text-xl font-semibold">Session Configuration</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of Questions (max 100)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={session.numberOfQuestions}
              onChange={(e) => setSession({
                ...session,
                numberOfQuestions: Math.min(100, Math.max(1, parseInt(e.target.value) || 1))
              })}
              className="mt-1 block w-full h-12 text-lg px-4 rounded-md border-gray-300 shadow-sm focus:border-[#2e436a] focus:ring-[#2e436a]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Seconds per Question
            </label>
            <input
              type="number"
              min="1"
              value={session.secondsPerQuestion}
              onChange={(e) => setSession({
                ...session,
                secondsPerQuestion: Math.max(1, parseInt(e.target.value) || 1)
              })}
              className="mt-1 block w-full h-12 text-lg px-4 rounded-md border-gray-300 shadow-sm focus:border-[#2e436a] focus:ring-[#2e436a]"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleStartTraining}
        className="w-full h-12 text-lg flex justify-center items-center px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-[#19233b] hover:bg-[#2e436a] transition-colors"
      >
        Start Session
      </button>
    </div>
  );
};

export default StartTraining;