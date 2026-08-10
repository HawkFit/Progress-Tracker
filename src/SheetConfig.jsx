import { useState } from 'react'

export default function SheetConfig({ onLoad, loading, error }) {
  const [url, setUrl] = useState('')

  const handleLoad = () => {
    if (url.trim()) {
      onLoad(url)
    }
  }

  return (
    <div className="sheet-config">
      <h2>Load Your Google Sheet</h2>
      <p>Publish your Google Sheet as CSV and paste the link below:</p>
      
      <input
        type="text"
        placeholder="Paste CSV export URL from Google Sheets"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="input-field"
      />
      
      <button onClick={handleLoad} disabled={loading} className="btn-primary">
        {loading ? 'Loading...' : 'Load Sheet'}
      </button>

      {error && <p className="error">{error}</p>}

      <div className="instructions">
        <h3>How to export your Google Sheet:</h3>
        <ol>
          <li>Open your Google Sheet</li>
          <li>Click File → Publish to the web</li>
          <li>Select your sheet and choose "CSV"</li>
          <li>Copy the link and paste it above</li>
        </ol>
      </div>
    </div>
  )
}
