import { motion } from 'framer-motion' // Import Framer Motion
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import '../styles/components/Slider.css'

const ServicesSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }

  const services = [
    {
      title: 'Add Employees',
      description:
        'Ensure employees have easy access to their shift through a user-friendly interface, such as a mobile app or web portal.'
    },
    {
      title: 'Shift Management',
      description:
        'Assigning shifts based on employee availability, preferences, and the company’s needs.'
    },
    {
      title: 'Request Change',
      description:
        'The employee typically submits a request to a manager or supervisor detailing the desired changes.'
    },
    {
      title: 'Performance Reviews',
      description:
        'Conduct regular performance evaluations to provide feedback and set goals.'
    },
    {
      title: 'Payroll Management',
      description:
        'Efficiently manage employee payroll, ensuring accurate and timely payments.'
    },
    {
      title: 'Benefits Administration',
      description:
        'Administer employee benefits programs, including health insurance and retirement plans.'
    },
    {
      title: 'Employee Engagement',
      description:
        'Implement initiatives to boost employee morale and engagement within the company.'
    }
  ]

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  const sliderVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, delay: 0.5 } }
  }

  return (
    <div className="slider-container">
      <motion.h2
        className="services-heading"
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        Services of the portal
      </motion.h2>

      <motion.div
        variants={sliderVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <Slider {...settings}>
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </Slider>
      </motion.div>
    </div>
  )
}

export default ServicesSlider
