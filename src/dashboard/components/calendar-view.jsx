import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'

export function CalendarView() {
  const [date, setDate] = useState(new Date())

  return (
    <div className='flex justify-center p-6'>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border text-base scale-125"
      />
    </div>
  )
}

export default CalendarView
