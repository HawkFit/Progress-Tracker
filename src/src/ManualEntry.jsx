import { useState } from 'react'

export default function ManualEntry({ onAdd, entries, onDelete }) {
  const [date, setDate] = useState('')
  const [weight, setWeight] = useState('')
  const [bodyFat, setBodyFat] = useState('')
  const [protein, setProtein] = useState('')
  const [carbs, setCarbs] = useState('')
  const [fat, setFat] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (date && weight) {
      onAdd({
        Date: date,
        Weight: parseFloat(weight),
        'Body Fat %': bodyFat ? parseFloat(bodyFat) : 0,
        Protein: protein ? parseFloat(protein) : 0,
        Carbs: carbs ? parseFloat(carbs) : 0,
        Fat: fat ? parseFloat(fat) : 0
      })
      setDate('')
      setWeight('')
      setBodyFat('')
      setProtein('')
      setCarbs('')
      setFat('')
    }
  }

  return (
    <div className="manual-entry">
      <h2>Add Fitness Entry</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          placeholder="Date"
        />
        <input
          type="number"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          placeholder="Weight"
        />
        <input
          type="number"
          step="0.1"
          value={bodyFat}
          onChange={(e) => setBodyFat(e.target.value)}
          placeholder="Body Fat %"
        />
        <input
          type="number"
          value={protein}
          onChange={(e) => setProtein(e.target.value)}
          placeholder="Protein (g)"
        />
        <input
          type="number"
          value={carbs}
          onChange={(e) => setCarbs(e.target.value)}
          placeholder="Carbs (g)"
        />
        <input
          type="number"
          value={fat}
          onChange={(e) => setFat(e.target.value)}
          placeholder="Fat (g)"
        />
        <button type="submit" className="btn-primary">Add Entry</button>
      </form>

      <h3>Your Entries ({entries.length})</h3>
      <div className="entries-list">
        {entries.map((entry, idx) => (
          <div key={idx} className="entry-item">
            <span>{entry.Date} - {entry.Weight}lbs, BF: {entry['Body Fat %']}%</span>
            <button onClick={() => onDelete(idx)} className="btn-delete">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
