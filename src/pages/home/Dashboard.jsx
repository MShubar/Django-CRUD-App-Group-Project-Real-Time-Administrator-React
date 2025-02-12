import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import interactionPlugin from '@fullcalendar/interaction'
import { BASE_URL } from '../../servers/config'

const Dashboard = () => {
  const [events, setEvents] = useState([])
  const [resources, setResources] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')

        const eventResponse = await fetch(`${BASE_URL}/employeeshifts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        if (!eventResponse.ok) {
          throw new Error('Failed to fetch events')
        }
        const eventData = await eventResponse.json()
        const formattedEventData = eventData.map((shift) => ({
          id: shift._id,
          resourceId: shift.employeeId._id,
          title: shift.shiftId.name,
          start: shift.startDate,
          end: shift.endDate
        }))
        setEvents(formattedEventData)

        const resourceResponse = await fetch(`${BASE_URL}/employees`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (!resourceResponse.ok) {
          throw new Error('Failed to fetch resources')
        }
        const resourceData = await resourceResponse.json()
        const formattedResourceData = resourceData.map((employee) => ({
          id: employee._id,
          title: employee.name
        }))
        setResources(formattedResourceData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="p-4">
      <FullCalendar
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        initialView="resourceTimelineDay"
        headerToolbar={{
          left: 'prev,next today',
          center: '',
          right: 'resourceTimelineDay,resourceTimelineWeek'
        }}
        slotMinTime="00:00:00"
        slotMaxTime="24:00:00"
        slotDuration="01:00:00"
        resources={resources}
        events={events}
        editable={true}
        selectable={true}
        height="auto"
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        resourceLabelDidMount={(info) => {
          info.el.classList.add('TextChange')
        }}
      />
    </div>
  )
}

export default Dashboard
