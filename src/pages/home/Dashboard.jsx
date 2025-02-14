import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import interactionPlugin from '@fullcalendar/interaction'
import { BASE_URL } from '../../servers/config'
import '../../styles/home/Dashboard.css'

const Dashboard = () => {
  const [events, setEvents] = useState([])
  const [resources, setResources] = useState([])
  const [shifts, setShifts] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState('')

  const [selectedShift, setSelectedShift] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')

        // Fetch Employees
        const employeeResponse = await fetch(`${BASE_URL}/employees`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        if (!employeeResponse.ok) throw new Error('Failed to fetch employees')
        const employees = await employeeResponse.json()
        const formattedResources = employees.map((employee) => ({
          id: employee._id,
          title: employee.name
        }))
        setResources(formattedResources)

        // Fetch Shifts
        const shiftResponse = await fetch(`${BASE_URL}/shift`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        if (!shiftResponse.ok) throw new Error('Failed to fetch shifts')
        const availableShifts = await shiftResponse.json()
        setShifts(availableShifts)

        // Fetch Employee Shifts
        const shiftDataResponse = await fetch(`${BASE_URL}/employeeshifts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        })

        if (!shiftDataResponse.ok)
          throw new Error('Failed to fetch employee shifts')
        const shiftsData = await shiftDataResponse.json()

        const formattedEvents = shiftsData.map((shift) => {
          const employee = resources.find((res) => res.id === shift.employeeId)

          return {
            id: shift._id,
            resourceId: shift.employeeId,
            title: shift.shiftId.name,
            start: new Date(shift.startDate).toISOString(),
            end: new Date(shift.endDate).toISOString(),
            backgroundColor: '#28a745',
            borderColor: '#28a745',
            extendedProps: { ...shift }
          }
        })

        setEvents(formattedEvents)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, []) // Re-fetch data when resources change

  const handleSubmitShift = async () => {
    const token = localStorage.getItem('token')
    const newShift = {
      employeeId: selectedEmployee,
      shiftId: selectedShift,
      startDate: startDate,
      endDate: endDate
    }

    try {
      const response = await fetch(`${BASE_URL}/employeeshifts/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newShift)
      })

      if (!response.ok) throw new Error('Failed to create shift')

      setIsFormOpen(false)
      const newEvent = {
        id: response.id, // You'll likely get the new event's ID from the response
        resourceId: selectedEmployee,
        title: selectedShift,
        start: new Date(startDate).toISOString(),
        end: new Date(endDate).toISOString(),
        backgroundColor: '#28a745',
        borderColor: '#28a745',
        extendedProps: { ...newShift }
      }

      setEvents((prevEvents) => [...prevEvents, newEvent])
      fetchData() // Re-fetch data to update the calendar after adding shift
    } catch (error) {
      console.error('Error creating shift:', error)
    }
  }

  const handleEventDrop = async (info) => {
    const token = localStorage.getItem('token')
    const updatedShift = {
      ...info.event.extendedProps,
      startDate: info.event.start.toISOString(),
      endDate: info.event.end.toISOString()
    }

    try {
      const response = await fetch(
        `${BASE_URL}/employeeshifts/${info.event.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updatedShift)
        }
      )

      if (!response.ok) throw new Error('Failed to update shift')

      const updatedEvent = await response.json() // Capture the updated event

      // Update the event list
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === updatedEvent._id
            ? {
                ...event,
                start: updatedEvent.startDate,
                end: updatedEvent.endDate
              }
            : event
        )
      )
    } catch (error) {
      console.error('Error updating shift:', error)
    }
  }

  return (
    <div className="dashboard-container">
      <h2 className="text-xl font-bold mb-4 TextChange">Schedule Dashboard</h2>
      <FullCalendar
        plugins={[resourceTimelinePlugin, interactionPlugin]}
        initialView="resourceTimelineMonth"
        initialDate={new Date()}
        views={{
          resourceTimelineMonth: {
            type: 'resourceTimeline',
            slotDuration: { days: 1 },
            slotLabelInterval: { days: 1 },
            slotLabelFormat: [
              { weekday: 'short', day: 'numeric', month: 'short' }
            ]
          },
          resourceTimelineYear: {
            type: 'resourceTimeline',
            slotDuration: { days: 1 },
            slotLabelInterval: { days: 1 },
            slotLabelFormat: [
              { weekday: 'short', day: 'numeric', month: 'short' }
            ]
          }
        }}
        headerToolbar={{
          left: 'prev,next',
          center: '',
          right: 'resourceTimelineMonth,resourceTimelineYear'
        }}
        slotMinTime="00:00:00"
        slotMaxTime="24:00:00"
        resources={resources}
        events={events}
        eventContent={(arg) => {
          return { html: `<b>${arg.event.title}</b>` }
        }}
        editable={true}
        height="auto"
        selectable={true}
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        eventDrop={handleEventDrop}
        resourceLabelDidMount={(info) => {
          info.el.classList.add('TextChange')
        }}
      />
      <div className="header">
        <button
          className="toggle-form-btn"
          onClick={() => setIsFormOpen(!isFormOpen)}
        >
          {isFormOpen ? 'Close Form' : 'Add Employee Shift'}
        </button>
      </div>

      {isFormOpen && (
        <div className="form-container">
          <form>
            <div className="form-group">
              <label>Employee</label>
              <select
                onChange={(e) => setSelectedEmployee(e.target.value)}
                value={selectedEmployee}
              >
                <option value="">Select Employee</option>
                {resources.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Shift</label>
              <select
                onChange={(e) => setSelectedShift(e.target.value)}
                value={selectedShift}
              >
                <option value="">Select Shift</option>
                {shifts.map((shift) => (
                  <option key={shift._id} value={shift._id}>
                    {shift.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                onChange={(e) => setStartDate(e.target.value)}
                value={startDate}
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
                value={endDate}
              />
            </div>

            <button
              type="button"
              onClick={handleSubmitShift}
              className="submit-btn"
            >
              Submit Shift
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default Dashboard
