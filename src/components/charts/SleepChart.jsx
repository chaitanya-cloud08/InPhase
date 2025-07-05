// src/components/charts/SleepChart.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SleepChart = ({ data }) => {
    const formattedData = data.map(entry => ({
    ...entry,
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    sleepHours: Number(entry.sleepHours),
  })).sort((a,b) => new Date(a.date) - new Date(b.date));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #ddd' }} />
        <Legend />
        <Bar dataKey="sleepHours" fill="#A6C8F0" name="Sleep (hours)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SleepChart;