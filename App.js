import React, { useState, useEffect } from 'react'
import { bankOne } from './constants.js';
import './App.scss'

function App() {
  const [volume, setVolume] = useState(1)
  const [recording, setRecording] = useState("")

  // Logic for playng the recording, giving each note an interval.
  const playRecording = () => {
    let index = 0;
    let recordArray = recording.split(" ")
    const interval = setInterval(() => {

      // Create index out of the recorded notes
      const bankOne = document.getElementById(recordArray[index])
      bankOne.volume = volume;
      bankOne.currentTime = 0;
      bankOne.play();
      index++;
    }, 300);

    // Wait to clear and unmount interval function to free memory
    setTimeout(() =>
      clearInterval(interval), 300 * recordArray.length - 1);
  };

  return (
    <div className='inner-container'>
      <h2>drum machine</h2>

      {/* Map the sounds in the imported dictionary to the buttons that we will render*/}
      {bankOne.map((clip) => (<Pad key={clip.id} clip={clip} volume={volume} setRecording={setRecording} />))}
      <br />
      <h4>Volume</h4>
      <input type='range' onChange={(e) => setVolume(e.target.value)} step='0.01' value={volume} max='1' min='0' className='webkit-slider-runnable-track' />
      <h3>
        {recording}
      </h3>
      {recording && (
        <>
          <button onClick={playRecording} className='recBtn1'>play</button>
          <button onClick={() => setRecording('')} className='recBtn1 recBtn2' >clear</button>
        </>
      )}
    </div>
  );
}

const Pad = ({ clip, volume, setRecording }) => {

  // Active state for button animation
  const [active, setActive] = useState(false)

  // UseEffect to handle key presses
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    }
  }, )

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

    // Set audioTag equal to our volume that we just passed in as prop in function
    bankOne.volume = volume;
    bankOne.currentTime = 0;
    bankOne.play();

    // Record which keys are pressed so we can render them together
    setRecording((prev) => prev + clip.keyTrigger + ' ')
  };

  return (
    <div className='pad-bank' >
      <div onClick={playSound} className={` drum-pad  ${active && 'inner-select'}`}>
        <audio className='clip' id={clip.keyTrigger} src={clip.url} />
        {clip.keyTrigger}
      </div>
    </div>
  )
}

export default App
