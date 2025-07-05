// src/components/Dashboard.jsx
import Card from './ui/Card';
import MoodChart from './charts/MoodChart';
import SleepChart from './charts/SleepChart';

const Dashboard = ({ entries }) => {
  if (entries.length < 2) {
    return <Card><p className="text-center text-text-secondary">Log at least two days of data to see your charts.</p></Card>
  }

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="text-2xl font-bold text-brand-primary mb-4">Mood Over Time</h2>
        <MoodChart data={entries} />
      </Card>
      <Card>
        <h2 className="text-2xl font-bold text-brand-secondary mb-4">Sleep Patterns</h2>
        <SleepChart data={entries} />
      </Card>
      {/* Add more charts here (e.g., Stress, Energy) following the same pattern */}
    </div>
  );
};

export default Dashboard;