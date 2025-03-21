'use client'

import { useState } from 'react'
import Calendar from './calendar1/calendar'
import { CalendarEvent, Mode } from './calendar1/calendar-types'
import { generateMockEvents } from './mock-calendar-events'

export default function CalendarDemo() {
  const [events, setEvents] = useState<CalendarEvent[]>(generateMockEvents())
  const [mode, setMode] = useState<Mode>('month')
  const [date, setDate] = useState<Date>(new Date())

  return (
    <Calendar
      events={events}
      setEvents={setEvents}
      mode={mode}
      setMode={setMode}
      date={date}
      setDate={setDate}
    />
  )
}
