import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Charts({ data }) {
  if (!data || data.length === 0) return <p>No data available</p>

  return (
    <div className="charts-container">
      <div className="chart">
        <h2>Weight Progression</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Weight" stroke="#2f4a3c" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {data.some(row => row['Body Fat %']) && (
        <div className="chart">
          <h2>Body Fat %</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Body Fat %" stroke="#8ba888" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="chart">
        <h2>Macros Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Protein" fill="#2f4a3c" />
            <Bar dataKey="Carbs" fill="#8ba888" />
            <Bar dataKey="Fat" fill="#f7f4ee" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
