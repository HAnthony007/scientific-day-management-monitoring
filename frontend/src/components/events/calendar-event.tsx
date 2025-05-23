import { CalendarEvent as CalendarEventType } from './calendar-types'
import { format, isSameDay, isSameMonth } from 'date-fns'
import { cn } from '@/lib/utils'
import { motion, MotionConfig, AnimatePresence } from 'framer-motion'
import { useCalendarContext } from './calendar-context'
import { toast } from 'sonner'

interface EventPosition {
  left: string
  width: string
  top: string
  height: string
}

function getOverlappingEvents(
  currentEvent: CalendarEventType,
  events: CalendarEventType[]
): CalendarEventType[] {
  return events.filter((event) => {
    if (event.id === currentEvent.id) return false
    return (
      currentEvent.date_deb < event.date_fin &&
      currentEvent.date_fin > event.date_deb &&
      isSameDay(currentEvent.date_deb, event.date_deb)
    )
  })
}

function calculateEventPosition(
  event: CalendarEventType,
  allEvents: CalendarEventType[]
): EventPosition {
  const overlappingEvents = getOverlappingEvents(event, allEvents)
  const group = [event, ...overlappingEvents].sort(
    (a, b) => a.date_deb.getTime() - b.date_deb.getTime()
  )
  const position = group.indexOf(event)
  const width = `${100 / (overlappingEvents.length + 1)}%`
  const left = `${(position * 100) / (overlappingEvents.length + 1)}%`

  const startHour = event.date_deb.getHours()
  const startMinutes = event.date_deb.getMinutes()

  let endHour = event.date_fin.getHours()
  let endMinutes = event.date_fin.getMinutes()

  if (!isSameDay(event.date_deb, event.date_fin)) {
    endHour = 23
    endMinutes = 59
  }

  const topPosition = startHour * 128 + (startMinutes / 60) * 128
  const duration = endHour * 60 + endMinutes - (startHour * 60 + startMinutes)
  const height = (duration / 60) * 128

  return {
    left,
    width,
    top: `${topPosition}px`,
    height: `${height}px`,
  }
}

export default function CalendarEvent({
  event,
  month = false,
  className,
}: {
  event: CalendarEventType
  month?: boolean
  className?: string
}) {
  const { events, setSelectedEvent, date, descriptionEventDialogOpen, setDescriptionEventDialogOpen } =
    useCalendarContext()
  const style = month ? {} : calculateEventPosition(event, events)

  // Generate a unique key that includes the current month to prevent animation conflicts
  const isEventInCurrentMonth = isSameMonth(event.date_deb, date)
  const animationKey = `${event.id}-${
    isEventInCurrentMonth ? 'current' : 'adjacent'
  }`

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        <motion.div
          className={cn(
            `px-3 py-1.5 rounded-md truncate cursor-pointer transition-all duration-300 bg-${event.color}-500/10 hover:bg-${event.color}-500/20 border border-${event.color}-500`,
            !month && 'absolute',
            className
          )}
          style={style}
          onClick={(e) => {
            e.stopPropagation()
            setSelectedEvent(event)
            console.log("Status"+ descriptionEventDialogOpen)
            setDescriptionEventDialogOpen(true)
            toast.success("Event selected")
            console.log("Event selected: ", event)
            console.log("Status"+ descriptionEventDialogOpen)
          }}
          initial={{
            opacity: 0,
            y: -3,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            scale: 0.98,
            transition: {
              duration: 0.15,
              ease: 'easeOut',
            },
          }}
          transition={{
            duration: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
            opacity: {
              duration: 0.2,
              ease: 'linear',
            },
            layout: {
              duration: 0.2,
              ease: 'easeOut',
            },
          }}
          layoutId={`event-${animationKey}-${month ? 'month' : 'day'}`}
        >
          <motion.div
            className={cn(
              `flex flex-col w-full text-${event.color}-500`,
              month && 'flex-row items-center justify-between'
            )}
            layout="position"
          >
            <p className={cn('font-bold truncate', month && 'text-xs')}>
              {event.title}
            </p>
            <p className={cn('text-sm', month && 'text-xs')}>
              <span>{format(event.date_deb, 'h:mm a')}</span>
              <span className={cn('mx-1', month && 'hidden')}>-</span>
              <span className={cn(month && 'hidden')}>
                {format(event.date_fin, 'h:mm a')}
              </span>
            </p>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}
