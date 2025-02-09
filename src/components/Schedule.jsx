import 'bootstrap/dist/css/bootstrap.min.css'
import { motion } from 'framer-motion'

const ShiftSchedule = () => {
  const dates = [
    '5th of Feb',
    '6th of Feb',
    '7th of Feb',
    '8th of Feb',
    '9th of Feb',
    '10th of Feb',
    '11th of Feb',
    '12th of Feb',
    '13th of Feb',
    '14th of Feb',
    '15th of Feb',
    '16th of Feb',
    '17th of Feb'
  ]

  const shifts = [
    'Early Morning (8 AM - 4 PM)',
    'Morning (10 AM - 6 PM)',
    'Afternoon (12 PM - 8 PM)',
    'Evening (2 PM - 10 PM)',
    'Late Night (4 PM - 12 AM)'
  ]

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Schedule Management System</h1>
      <div className="table-responsive rounded p-4">
        <motion.div
          style={{
            overflowX: 'auto',
            maxWidth: '100%',
            position: 'relative'
          }}
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        >
          <table
            className="table table-bordered border-dark text-center"
            style={{
              tableLayout: 'fixed',
              minWidth: '1000px'
            }}
          >
            <thead className="table-light border-dark">
              <tr>
                <th
                  className="border-dark"
                  style={{
                    position: 'sticky',
                    left: 0,
                    backgroundColor: 'white',
                    zIndex: 1
                  }}
                >
                  Call Center
                </th>
                {dates.map((date, index) => (
                  <th key={index} className="border-dark">
                    {date}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {shifts.map((shift, index) => (
                <tr key={index}>
                  <td
                    className="fw-bold bg-light border-dark"
                    style={{
                      position: 'sticky',
                      left: 0,
                      backgroundColor: 'white',
                      zIndex: 1
                    }}
                  >
                    {shift}
                  </td>
                  {dates.map((_, idx) => (
                    <td
                      key={idx}
                      className="border-dark"
                      style={{
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden'
                      }}
                    >
                      -
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  )
}

export default ShiftSchedule
