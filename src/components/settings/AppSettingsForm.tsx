import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import { useUserSettings } from '../../hooks/useUserSettings';

export const AppSettingsForm: React.FC = () => {
  const { settings, loading, error, updateSettings } = useUserSettings();
  const [formData, setFormData] = useState({
    default_questions_per_session: settings?.default_questions_per_session || 10,
    default_seconds_per_question: settings?.default_seconds_per_question || 5
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSettings(formData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="flex items-center text-lg font-medium mb-4">
          <Settings className="h-5 w-5 mr-2" />
          Default Training Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Default Questions per Session (max 100)
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={formData.default_questions_per_session}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                default_questions_per_session: Math.min(100, Math.max(1, parseInt(e.target.value) || 1))
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Default Seconds per Question
            </label>
            <input
              type="number"
              min="1"
              value={formData.default_seconds_per_question}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                default_seconds_per_question: Math.max(1, parseInt(e.target.value) || 1)
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        Save Default Settings
      </button>
    </form>
  );
};