import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import interactionPlugin from '@fullcalendar/interaction'
import '../styles/components/Schedule.css'
import { motion } from 'framer-motion'
const ShiftSchedule = () => {
  const [events, setEvents] = useState([
    {
      id: '1',
      resourceId: 'a',
      title: 'Day off',
      start: '2025-02-12T00:00:00',
      end: '2025-02-13T00:00:00'
    },
    {
      id: '2',
      resourceId: 'b',
      title: 'Midday Shift',
      start: '2025-02-12T16:00:00',
      end: '2025-02-13T00:00:00'
    },
    {
      id: '3',
      resourceId: 'c',
      title: 'Early Morning Shift',
      start: '2025-02-12T08:00:00',
      end: '2025-02-12T16:00:00'
    },
    {
      id: '4',
      resourceId: 'd',
      title: 'Day off',
      start: '2025-02-12T00:00:00',
      end: '2025-02-13T00:00:00'
    },
    {
      id: '5',
      resourceId: 'e',
      title: 'Midday Shift',
      start: '2025-02-12T16:00:00',
      end: '2025-02-13T00:00:00'
    },
    {
      id: '6',
      resourceId: 'f',
      title: 'Early Morning Shift',
      start: '2025-02-12T08:00:00',
      end: '2025-02-12T16:00:00'
    },
    {
      id: '7',
      resourceId: 'g',
      title: 'Early Morning Shift',
      start: '2025-02-12T08:00:00',
      end: '2025-02-12T16:00:00'
    },
    {
      id: '8',
      resourceId: 'h',
      title: 'Double Shift',
      start: '2025-02-12T08:00:00',
      end: '2025-02-13T00:00:00'
    },
    {
      id: '9',
      resourceId: 'i',
      title: 'Late night Shift',
      start: '2025-02-12T00:00:00',
      end: '2025-02-12T08:00:00'
    }
  ])

  const resources = [
    { id: 'a', title: 'Salma' },
    { id: 'b', title: 'Loay' },
    { id: 'c', title: 'Maryam' },
    { id: 'd', title: 'Mohammed' },
    { id: 'e', title: 'Hassan' },
    { id: 'f', title: 'Maitham' },
    { id: 'g', title: 'Salman' },
    { id: 'h', title: 'Redha' },
    { id: 'i', title: 'Ali' }
  ]

  resources.sort((a, b) => a.title.localeCompare(b.title))

  const matchedEvents = events.map((event) => {
    const matchedResource = resources.find(
      (resource) => resource.id === event.resourceId
    )
    return { ...event, resource: matchedResource }
  })

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0 }} // Initial state for animation
      animate={{ opacity: 1 }} // Animate to full opacity
      transition={{ duration: 0.5 }} // Duration of the animation
    >
      <h2 className="text-xl font-bold mb-4 TextChange">Schedule Dashboard</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        <FullCalendar
          plugins={[resourceTimelinePlugin, interactionPlugin]}
          initialView="resourceTimelineDay"
          headerToolbar={{
            left: '',
            center: '',
            right: ''
          }}
          slotMinTime="00:00:00"
          slotMaxTime="24:00:00"
          slotDuration="01:00:00"
          resources={resources}
          events={events}
          editable={true}
          selectable={true}
          height="auto"
          aspectRatio={1.5}
          validRange={{
            start: '2025-02-12',
            end: '2025-02-12'
          }}
          schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
          resourceLabelDidMount={(info) => {
            info.el.classList.add('TextChange')
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default ShiftSchedule
