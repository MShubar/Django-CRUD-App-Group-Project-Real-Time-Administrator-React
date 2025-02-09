import { useState, useEffect } from 'react'
import '../styles/components/Background.css'

function Background() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="background"
      style={{
        backgroundPosition: `center ${scrollY * 0.5}px`, // Parallax Effect
        filter: `blur(${scrollY / 100}px)`, // Blur Effect
        opacity: `${1 - scrollY / 1000}` // Fade Out Effect
      }}
    >
      <div className="overlay"></div>
      <h1 className="title">Real-Time Administrator</h1>
    </div>
  )
}

export default Background
