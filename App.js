import React, { useState } from 'react'
import { bankOne } from './constants.js';
import './App.scss'

function App() {
  return (
    <div className='inner-container'>
      <h2>drum machine</h2>

      {/* Map the sounds in the imported dictionary to the buttons that we will render*/}
      {bankOne.map((clip) => (<Pad key={clip.id} clip={clip} />))}
    </div>
  );
}

const Pad = ({ clip }) => {

  // Active state for button animation
  const [active, setActive] = React.useState(false)

  // UseEffect to handle key presses
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, [])

  // If keyCode matches the keyCode mapped to clip, play the clip
  const handleKeyPress = (e) => {
    if (e.keyCode === clip.keyCode) {
      playSound();
    }
  }

  const playSound = () => {
    const bankOne = document.getElementById(clip.keyTrigger)
    setActive(true);
    setTimeout(() => setActive(false), 200)

    // Set the audio to start from the beginning
    bankOne.currentTime = 0
    bankOne.play()
  };

  return (
    <div className='pad-bank'>
      <div onClick={playSound} className={` drum-pad  ${active && 'inner-select'}`}>
        <audio className='clip' id={clip.keyTrigger} src={clip.url} />
        {clip.keyTrigger}
      </div>
    </div>
  )
}

export default App