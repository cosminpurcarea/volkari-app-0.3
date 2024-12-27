import React from 'react';
import { Mail, Loader2, AlertCircle } from 'lucide-react';
import { useProfileEmail } from '../../lib/hooks/useProfileEmail';

interface EmailReportButtonProps {
  data: {
    stats: {
      totalSessions: number;
      recentAverage: number;
      trend: string;
    };
    encouragement: string;
  };
}

export const EmailReportButton: React.FC<EmailReportButtonProps> = ({ data }) => {
  const { sendEmail, loading, error } = useProfileEmail();

  const handleSendReport = async () => {
    try {
      await sendEmail('progress', data);
      alert('Progress report sent to your email!');
    } catch (err) {
      // Error handling is done by the hook
    }
  };

  return (
    <div>
      {error && (
        <div className="text-red-500 text-sm flex items-center mb-2">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
      <button
        onClick={handleSendReport}
        disabled={loading}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
        ) : (
          <Mail className="h-4 w-4 mr-2" />
        )}
        {loading ? 'Sending...' : 'Email Progress Report'}
      </button>
    </div>
  );
};