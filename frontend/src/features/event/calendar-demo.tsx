'use client'

import { useState } from 'react'
import { CalendarEvent, Mode } from '@/components/events/calendar-types'
import { generateMockEvents } from './mock-calendar-events'
import Calendar from '@/components/events/calendar'

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
