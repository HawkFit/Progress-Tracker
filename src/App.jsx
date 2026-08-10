import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import Charts from './Charts'
import SheetConfig from './SheetConfig'
import PhotoGallery from './PhotoGallery'
import './App.css'

export default function App() {
  const [data, setData] = useState([])
  const [sheetUrl, setSheetUrl] = useState(localStorage.getItem('sheetUrl') || '')
  const [activeTab, setActiveTab] = useState('charts')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const loadSheet = (url) => {
    setLoading(true)
    setError('')
    
    Papa.parse(url, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const filtered = results.data
          .filter(row => row.Date)
          .map(row => ({
            Date: row.Date,
            Weight: row.Weight,
            'Body Fat %': row['Body Fat %'],
            Protein: row.Protein,
            Carbs: row.Carbs,
            Fat: row.Fat
          }))
        
        setData(filtered)
        setSheetUrl(url)
        localStorage.setItem('sheetUrl', url)
        setLoading(false)
      },
      error: (err) => {
        setError('Failed to load sheet: ' + err.message)
        setLoading(false)
      }
    })
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
          className={activeTab === 'photos' ? 'active' : ''}
          onClick={() => setActiveTab('photos')}
        >
          Photos
        </button>
        <button 
          className={activeTab === 'settings' ? 'active' : ''}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </nav>

      <main className="content">
        {activeTab === 'charts' && (
          data.length > 0 ? <Charts data={data} /> : <p>No data loaded. Go to Settings.</p>
        )}
        {activeTab === 'photos' && <PhotoGallery />}
        {activeTab === 'settings' && (
          <SheetConfig onLoad={loadSheet} loading={loading} error={error} />
        )}
      </main>
    </div>
  )
}
