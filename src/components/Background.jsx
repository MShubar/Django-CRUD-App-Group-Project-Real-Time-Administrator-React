import '../styles/components/Background.css'

function Background({ isDarkMode }) {
  return (
    <span
      className={`Sun-Moon ${isDarkMode ? 'move-right' : 'move-left'}`}
    ></span>
  )
}

export default Background
