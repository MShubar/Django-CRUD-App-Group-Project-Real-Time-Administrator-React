import { useState, useEffect } from 'react'
import '../styles/components/Dark-Light-Button.css'

function LightDark() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.body.classList.add('dark-mode')
      document.body.classList.remove('light-mode')
      createStars(200) // Create stars when dark mode is active
    } else {
      setIsDarkMode(false)
      document.body.classList.add('light-mode')
      document.body.classList.remove('dark-mode')
    }
  }, [])

  const toggleMode = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme)
    setIsDarkMode(!isDarkMode)

    if (newTheme === 'dark') {
      document.body.classList.add('dark-mode')
      document.body.classList.remove('light-mode')
      createStars(200) // Create stars when switching to dark mode
    } else {
      document.body.classList.add('light-mode')
      document.body.classList.remove('dark-mode')
    }
  }

  // Function to create the stars
  const createStars = (i) => {
    for (let j = 0; j < i; j++) {
      drawStars()
    }
  }

  const drawStars = () => {
    const tmpStar = document.createElement('figure')
    tmpStar.className = 'star'
    tmpStar.style.top = 100 * Math.random() + '%'
    tmpStar.style.left = 100 * Math.random() + '%'
    document.getElementById('stars').appendChild(tmpStar)
  }

  // Select stars and animate them
  const selectStars = () => {
    const stars = document.querySelectorAll('.star')
    animateStars(stars)
  }

  const animateStars = (stars) => {
    Array.prototype.forEach.call(stars, function (el, i) {
      const delay = Math.random() * 0.5 + 0.5
      TweenMax.to(el, delay, {
        opacity: Math.random(),
        onComplete: () => animateStars(stars)
      })
    })
  }

  return (
    <div>
      <button
        className={
          isDarkMode ? 'Dark-Light-Mode-Button' : 'Light-Dark-Mode-Button'
        }
        onClick={toggleMode}
      >
        <span
          className={
            isDarkMode ? 'Dark-Light-Mode-text' : 'Light-Dark-Mode-text'
          }
        >
          Change
        </span>
      </button>
      <div id="stars"></div>
      <div className={isDarkMode ? 'container12' : 'container'}>
        <div className={isDarkMode ? 'cloud12' : 'cloud1'}>
          <div className={isDarkMode ? 'base12' : 'base1'}>
            <div className={isDarkMode ? 'shape one2' : 'shape one'}></div>
            <div className={isDarkMode ? 'shape two2' : 'shape two'}></div>
          </div>
        </div>

        <div className={isDarkMode ? 'cloud22' : 'cloud2'}>
          <div className={isDarkMode ? 'base22' : 'base2'}>
            <div className={isDarkMode ? 'base2half2' : 'base2half'}></div>
            <div className={isDarkMode ? 'shape three2' : 'shape three'}></div>
            <div className={isDarkMode ? 'shape four2' : 'shape four'}></div>
            <div className={isDarkMode ? 'shape five2' : 'shape five'}></div>
            <div className={isDarkMode ? 'shape six2' : 'shape six'}></div>
            <div className={isDarkMode ? 'shape seven2' : 'shape seven'}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LightDark
