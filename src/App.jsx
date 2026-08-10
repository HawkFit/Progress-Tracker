import { useState, useEffect } from 'react'
import Charts from './Charts'
import ManualEntry from './ManualEntry'
import './App.css'

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('fitnessData')
    return saved ? JSON.parse(saved) : []
  })
  const [activeTab, setActiveTab] = useState('charts')

  useEffect(() => {
    localStorage.setItem('fitnessData', JSON.stringify(data))
  }, [data])

  const addEntry = (entry) => {
    setData([...data, entry])
  }

  const deleteEntry = (index) => {
    setData(data.filter((_, i) => i !== index))
  }

  return (
    <div className="app">
      <header className="header">
        <h1>HawkFit Progress Tracker</h1>
        <p>Track your fitness journey</p>
      </header>

      <nav className="tabs">
        <button 
          className={activeTab === 'charts' ? 'active' : ''}
          onClick={() => setActiveTab('charts')}
        >
          Charts
        </button>
        <button 
          className={activeTab === 'entry' ? 'active' : ''}
          onClick={() => setActiveTab('entry')}
        >
          Add Entry
        </button>
      </nav>

      <main className="content">
        {activeTab === 'charts' && (
          data.length > 0 ? <Charts data={data} /> : <p>No data yet. Go to "Add Entry" to get started!</p>
        )}
        {activeTab === 'entry' && (
          <ManualEntry onAdd={addEntry} entries={data} onDelete={deleteEntry} />
        )}
      </main>
    </div>
  )
}
