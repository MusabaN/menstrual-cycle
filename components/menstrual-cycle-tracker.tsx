'use client'

import { useState, useEffect } from 'react'
import { Button } from './ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card'
import { Input } from './ui/DateInput'
import { Progress } from './ui/Progress'

export default function MenstrualCycleTracker() {
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
    <div className="container mx-auto p-4 max-w-2xl">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Menstrual Cycle Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 items-center">
            <Input
              type="date"
              value={startDate}
              onChange={handleDateChange}
              placeholder="Enter start date"
            />
            <Button onClick={handleSave} className="h-10">Save</Button>
          </div>
          {currentDay > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-lg">Current day of cycle: <span className="font-bold">{currentDay}</span></p>
              <Progress value={(currentDay / 30) * 100} className="h-2 bg-muted" />
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        {tips.map((tip, index) => (
          <Card 
            key={index} 
            className={currentDay >= tip.range[0] && currentDay <= tip.range[1] ? "border-primary" : ""}
          >
            <CardHeader>
              <CardTitle>Day {tip.range[0]}-{tip.range[1]}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{tip.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}