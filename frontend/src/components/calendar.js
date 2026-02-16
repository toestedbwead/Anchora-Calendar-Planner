import React, { useState } from 'react'
import { getDaysInMonth, getDay, format} from 'date-fns'
import EntryModal from './EntryModal'
import { saveEntry } from '../api'

function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 1))

    const [selectedDay, setSelectedDay] = useState(null)

    const daysInMonth = getDaysInMonth(currentMonth)

    const firstDayOfMonth = getDay(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1))

    const days = Array.from({ length:daysInMonth }, (_, i) => i + 1)

    const emptySlots = Array.from({ length: firstDayOfMonth }, () => null)

    const calendarDays = [...emptySlots, ...days]

  return (
    <div>
      <h1>{format(currentMonth, 'MMMM yyyy')}</h1>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}>
          ← Previous
        </button>
        <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}>
          Next →
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
        {calendarDays.map((day, index) => (
          <div 
            key={index} 
            onClick={() => day && setSelectedDay(day)}
            style={{ 
              border: '1px solid #ccc', 
              padding: '10px', 
              minHeight: '100px',
              cursor: day ? 'pointer' : 'default',
              backgroundColor: selectedDay === day ? '#e0e0e0' : 'white'
            }}
          >
            {day && <p>{day}</p>}
          </div>
        ))}
      </div>

      {selectedDay && (
              <EntryModal 
                selectedDay={selectedDay}
                currentMonth={currentMonth}
                onClose={() => setSelectedDay(null)}
                onSave={async (entryData) => {
                  try {
                    await saveEntry(entryData)
                    alert('Entry saved!')
                  } catch (error) {
                    alert('Failed to save entry')
                  }
                }}
              />
      )}
    </div>
  )
}

export default Calendar