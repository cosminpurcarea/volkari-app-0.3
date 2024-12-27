import React from 'react';
import { Play, History, BookOpen } from 'lucide-react';
import { useTrainingStats } from '../lib/hooks/useTrainingStats';
import { useTrainingSessions } from '../hooks/useTrainingSessions';
import { DashboardChart } from '../components/dashboard/DashboardChart';
import { TrainingHeatmap } from '../components/dashboard/TrainingHeatmap';
import { DashboardCard } from '../components/dashboard/DashboardCard';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

const Dashboard: React.FC = () => {
  const { sessions, loading } = useTrainingSessions();
  const stats = useTrainingStats(sessions);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Start Training"
          description="Practice German articles with timed exercises. Choose between der, die, and das for each noun."
          icon={<Play className="h-6 w-6 text-primary" />}
          to="/training"
          buttonText="Begin Session"
        />
        <DashboardCard
          title="View Progress"
          description="Track your learning journey with detailed statistics and performance insights for you to understand where you need to improve."
          icon={<History className="h-6 w-6 text-primary" />}
          to="/progress"
          buttonText="See Statistics"
        />
        <DashboardCard
          title="Manage Nouns"
          description="Browse and manage your collection of German nouns with their articles and translations based on your own targets."
          icon={<BookOpen className="h-6 w-6 text-primary" />}
          to="/nouns"
          buttonText="Open Repository"
        />
      </div>

      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardChart sessions={sessions} />
          <TrainingHeatmap sessions={sessions} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;