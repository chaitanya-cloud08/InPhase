// src/components/charts/MoodChart.jsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOOD_OPTIONS } from '../../constants/appData';

const MoodChart = ({ data }) => {
  const formattedData = data.map(entry => ({
    ...entry,
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    mood: Number(entry.mood),
  })).sort((a,b) => new Date(a.date) - new Date(b.date));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="date" />
        <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} tickFormatter={(value) => MOOD_OPTIONS.find(m => m.value === value)?.icon || ''} />
        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd' }} />
        <Legend />
        <Line type="monotone" dataKey="mood" stroke="#F0A6CA" strokeWidth={2} activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MoodChart;