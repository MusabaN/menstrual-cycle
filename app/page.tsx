'use client'

import { useState, useEffect } from 'react'

export default function Page() {
  const [startDate, setStartDate] = useState('')
  const [currentDay, setCurrentDay] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const savedDate = localStorage.getItem('menstrualCycleStartDate')
    if (savedDate) {
      setStartDate(savedDate)
      calculateCurrentDay(savedDate)
    }
  }, [])

  const calculateCurrentDay = (date: string) => {
    const start = new Date(date)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setCurrentDay(((diffDays - 1) % 30) + 1)
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value)
  }

  const handleSave = () => {
    localStorage.setItem('menstrualCycleStartDate', startDate)
    calculateCurrentDay(startDate)
  }

  const tips = [
    { range: [1, 10], text: "Outgoing, energetic, more myself, better cognitive abilities" },
    { range: [11, 17], text: "Ovulation (horny, body trying to make baby), skin glowing, most beautiful, heightened desire to seek love interests" },
    { range: [18, 23], text: "Mood getting lower, getting more introverted, prone to depression, need to stay away from overstimulation" },
    { range: [24, 30], text: "Extra care needed, low self esteem, sensitive, desire to spend time around comfort people (potential to form the closest emotional bonds)" },
  ]

  if (!isClient) {
    return null // or a loading indicator
  }

  return (
    <div className="container">
      <div className="card mb-6">
        <div className="card-header">
          <h2 className="card-title">Menstrual Cycle Tracker</h2>
        </div>
        <div className="card-content">
          <div className="input-group">
            <input
              type="date"
              value={startDate}
              onChange={handleDateChange}
              placeholder="Enter start date"
              className="input"
            />
            <button onClick={handleSave} className="button">Save</button>
          </div>
          {currentDay > 0 && (
            <div className="mt-4">
              <p className="text-lg">Current day of cycle: <span className="font-bold">{currentDay}</span></p>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${(currentDay / 30) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="tips-container">
        {tips.map((tip, index) => (
          <div 
            key={index} 
            className={`card ${currentDay >= tip.range[0] && currentDay <= tip.range[1] ? "card-highlight" : ""}`}
          >
            <div className="card-header">
              <h3 className="card-title">Day {tip.range[0]}-{tip.range[1]}</h3>
            </div>
            <div className="card-content">
              <p>{tip.text}</p>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .container {
          max-width: 42rem;
          margin: 0 auto;
          padding: 1rem;
        }
        .card {
          background: white;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          margin-bottom: 1rem;
        }
        .card-header {
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }
        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
        }
        .card-content {
          padding: 1rem;
        }
        .input-group {
          display: flex;
          gap: 0.5rem;
        }
        .input {
          flex-grow: 1;
          padding: 0.5rem;
          border: 1px solid #e2e8f0;
          border-radius: 0.25rem;
        }
        .button {
          padding: 0.5rem 1rem;
          background-color: #4299e1;
          color: white;
          border: none;
          border-radius: 0.25rem;
          cursor: pointer;
        }
        .button:hover {
          background-color: #3182ce;
        }
        .mt-4 {
          margin-top: 1rem;
        }
        .text-lg {
          font-size: 1.125rem;
        }
        .font-bold {
          font-weight: 700;
        }
        .progress-bar {
          height: 0.5rem;
          background-color: #e2e8f0;
          border-radius: 0.25rem;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background-color: #ed64a6;
        }
        .tips-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .card-highlight {
          border: 2px solid #4299e1;
        }
      `}</style>
    </div>
  )
}