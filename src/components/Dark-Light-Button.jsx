import { useState, useEffect } from 'react'
import '../styles/components/Dark-Light-Button.css'
function LightDark() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      setIsDarkMode(true)
      document.body.style.backgroundColor = '#010825' // Dark mode background
    } else {
      setIsDarkMode(false)
      document.body.style.backgroundColor = '#0099ff' // Light mode background
    }
  }, [])

  const toggleMode = () => {
    setIsDarkMode((prevMode) => !prevMode)
    const newTheme = !isDarkMode ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme)

    if (newTheme === 'dark') {
      document.body.style.backgroundColor = '#010825' // Dark mode background
    } else {
      document.body.style.backgroundColor = '#0099ff'
    }
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
        <span
          className={
            isDarkMode ? 'Dark-Light-Mode-cloud' : 'Light-Dark-Mode-cloud'
          }
        ></span>
        <span
          className={
            isDarkMode ? 'Dark-Light-Mode-cloud' : 'Light-Dark-Mode-cloud'
          }
        ></span>
        <span
          className={
            isDarkMode ? 'Dark-Light-Mode-cloud' : 'Light-Dark-Mode-cloud'
          }
        ></span>
        <span
          className={
            isDarkMode ? 'Dark-Light-Mode-cloud' : 'Light-Dark-Mode-cloud'
          }
        ></span>
        <span
          className={
            isDarkMode ? 'Dark-Light-Mode-cloud' : 'Light-Dark-Mode-cloud'
          }
        ></span>
      </button>
    </div>
  )
}

export default LightDark
