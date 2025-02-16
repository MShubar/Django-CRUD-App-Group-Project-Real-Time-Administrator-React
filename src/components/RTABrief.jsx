import { motion } from 'framer-motion'
import '../styles/components/RTABrief.css'

function RTABrief() {
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  const borderVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  }

  const borderVariants2 = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
  }

  return (
    <section className="rta-brief">
      <section className="borders">
        <motion.div
          className="border-text"
          variants={borderVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="brief">
            Platform that allows administrators to manage and oversee employee
            schedules in real-time. It provides up-to-the-minute updates, giving
            administrators full visibility and control over the scheduling
            process.
          </div>
        </motion.div>

        <motion.div
          className="border-text2"
          variants={borderVariants2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="brief2">
            ✅ Live Updates <br />✅ Centralized Dashboard <br />✅ Flexibility
            & Adjustments <br />✅ Employee Access <br />✅ Employee Information
            Input
          </div>
        </motion.div>
      </section>
    </section>
  )
}

export default RTABrief
