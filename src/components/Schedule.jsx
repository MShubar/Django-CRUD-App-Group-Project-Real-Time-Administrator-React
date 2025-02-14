import { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import interactionPlugin from '@fullcalendar/interaction'
import '../styles/components/Schedule.css'
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
      title: 'Early Morning Shift',
      start: '2025-02-12T08:00:00',
      end: '2025-02-12T16:00:00'
    },
    {
      id: '3',
      resourceId: 'c',
      title: 'Midday Shift',
      start: '2025-02-12T16:00:00',
      end: '2025-02-13T00:00:00'
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
      title: 'Early Morning Shift',
      start: '2025-02-12T08:00:00',
      end: '2025-02-12T16:00:00'
    },
    {
      id: '6',
      resourceId: 'f',
      title: 'Midday Shift',
      start: '2025-02-12T16:00:00',
      end: '2025-02-13T00:00:00'
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
      title: 'Midday Shift',
      start: '2025-02-12T16:00:00',
      end: '2025-02-13T00:00:00'
    },
    {
      id: '9',
      resourceId: 'i',
      title: 'Early Morning Shift',
      start: '2025-02-12T08:00:00',
      end: '2025-02-12T16:00:00'
    },
    {
      id: '10',
      resourceId: 'j',
      title: 'Triple Shift',
      start: '2025-02-12T00:00:00',
      end: '2025-02-13T00:00:00'
    },
    {
      id: '11',
      resourceId: 'k',
      title: 'Midday Shift',
      start: '2025-02-12T16:00:00',
      end: '2025-02-13T00:00:00'
    },
    {
      id: '12',
      resourceId: 'l',
      title: 'Early Morning Shift',
      start: '2025-02-12T08:00:00',
      end: '2025-02-12T16:00:00'
    },
    {
      id: '13',
      resourceId: 'm',
      title: 'Early Morning Shift',
      start: '2025-02-12T08:00:00',
      end: '2025-02-12T16:00:00'
    },
    {
      id: '14',
      resourceId: 'n',
      title: 'Early Morning Shift',
      start: '2025-02-12T08:00:00',
      end: '2025-02-12T16:00:00'
    },
    {
      id: '15',
      resourceId: 'o',
      title: 'Early Morning Shift',
      start: '2025-02-12T08:00:00',
      end: '2025-02-12T16:00:00'
    },
    {
      id: '16',
      resourceId: 'p',
      title: 'Early Morning Shift',
      start: '2025-02-12T08:00:00',
      end: '2025-02-12T16:00:00'
    },
    {
      id: '17',
      resourceId: 'q',
      title: 'Early Morning Shift',
      start: '2025-02-12T08:00:00',
      end: '2025-02-12T16:00:00'
    },
    {
      id: '18',
      resourceId: 'r',
      title: 'Early Morning Shift',
      start: '2025-02-12T08:00:00',
      end: '2025-02-12T16:00:00'
    },
    {
      id: '19',
      resourceId: 's',
      title: 'Late Night Shift',
      start: '2025-02-12T00:00:00',
      end: '2025-02-12T08:00:00'
    }
  ])

  const resources = [
    { id: 'a', title: 'Mohsen' },
    { id: 'b', title: 'Salma' },
    { id: 'c', title: 'Maryam' },
    { id: 'd', title: 'Mohammed' },
    { id: 'e', title: 'Hassan' },
    { id: 'f', title: 'Loay' },
    { id: 'g', title: 'Maitham' },
    { id: 'h', title: 'Muhannad' },
    { id: 'i', title: 'Ahlam' },
    { id: 'j', title: 'Redha' },
    { id: 'k', title: 'Jassim' },
    { id: 'l', title: 'Narjas' },
    { id: 'm', title: 'Fatima' },
    { id: 'n', title: 'May' },
    { id: 'o', title: 'Nowra' },
    { id: 'p', title: 'Salman' },
    { id: 'q', title: 'Mahmood' },
    { id: 'r', title: 'Nayef' },
    { id: 's', title: 'Ali' }
  ]

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 TextChange">Schedule Dashboard</h2>
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
    </div>
  )
}

export default ShiftSchedule
