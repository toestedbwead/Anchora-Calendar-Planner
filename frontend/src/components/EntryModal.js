import React, { useState } from 'react'

function EntryModal({ selectedDay, currentMonth, onClose, onSave }) {
  const [description, setDescription] = useState('')
  const [reflections, setReflections] = useState('')
  const [mood, setMood] = useState(3)
  const [category, setCategory] = useState('coding')

  const handleSave = () => {
    const entryData = {
      date: `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`,
      description,
      reflections,
      mood: parseInt(mood),
      category
    }
    onSave(entryData)
    onClose()
  }

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '400px',
        maxHeight: '80vh',
        overflowY: 'auto'
      }}>
        <h2>Entry for {selectedDay}</h2>

        <label>Description:</label>
        <input 
          type="text" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
        />

        <label>Reflections:</label>
        <textarea 
          value={reflections}
          onChange={(e) => setReflections(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '5px', minHeight: '80px' }}
        />

        <label>Mood:</label>
        <input 
          type="range" 
          min="1" 
          max="5" 
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <p>Mood: {mood} (1=Awful, 5=Great)</p>

        <label>Category:</label>
        <select 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
        >
          <option value="coding">Coding</option>
          <option value="household_chores">Household Chores</option>
          <option value="outside_errands">Outside Errands</option>
          <option value="hangouts">Hangouts</option>
          <option value="gaming">Gaming</option>
        </select>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default EntryModal