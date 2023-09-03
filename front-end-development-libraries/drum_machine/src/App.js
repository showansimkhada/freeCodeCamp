import React, { useState } from 'react';
import './App.css';
import PadBank from './PadBank';

function App() {
  const [power, setPower] = useState('right');
  const [align, setAlign] = useState('left');
  const [vol, setVol] = useState('0.3');
  const [dis, setDisplay] = useState(String.fromCharCode(160));

  const drum = [{
      keyCode: 81,
      keyTrigger: "Q",
      id: "Heater-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
    }, {
        keyCode: 87,
        keyTrigger: "W",
        id: "Heater-2",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
    }, {
        keyCode: 69,
        keyTrigger: "E",
        id: "Heater-3",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
    }, {
        keyCode: 65,
        keyTrigger: "A",
        id: "Heater-4",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
    }, {
        keyCode: 83,
        keyTrigger: "S",
        id: "Clap",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
    }, {
        keyCode: 68,
        keyTrigger: "D",
        id: "Open-HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
    }, {
        keyCode: 90,
        keyTrigger: "Z",
        id: "Kick-n'-Hat",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
    }, {
        keyCode: 88,
        keyTrigger: "X",
        id: "Kick",
        url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
    }, {
        keyCode: 67,
        keyTrigger: "C",
        id: "Closed-HH",
        url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }]
  const paino = [{
      keyCode: 81,
      keyTrigger: "Q",
      id: "Chord-1",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  }, {
      keyCode: 87,
      keyTrigger: "W",
      id: "Chord-2",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  }, {
      keyCode: 69,
      keyTrigger: "E",
      id: "Chord-3",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  }, {
      keyCode: 65,
      keyTrigger: "A",
      id: "Shaker",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  }, {
      keyCode: 83,
      keyTrigger: "S",
      id: "Open-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  }, {
      keyCode: 68,
      keyTrigger: "D",
      id: "Closed-HH",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  }, {
      keyCode: 90,
      keyTrigger: "Z",
      id: "Punchy-Kick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  }, {
      keyCode: 88,
      keyTrigger: "X",
      id: "Side-Stick",
      url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  }, {
      keyCode: 67,
      keyTrigger: "C",
      id: "Snare",
      url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }]

  const [bank, setBank] = useState(drum);

  function selectBank() {
    if (power === 'right') {
      if (align === 'left') {
        setBank(paino);
        setDisplay('Smooth Paino Kit');
        setAlign('right');
      } else {
        setBank(drum);
        setDisplay('Heater Kit');
        setAlign('left')
      }
    }
  }

  function displayClip(str) {
    if (power === 'right') {
      setDisplay(str)
    }
  }

  function changeVolume(e) {
    if (power === 'right') {
      setVol(e.target.value);
      setDisplay('Volume: ' + Math.round(vol*100));
      setTimeout(() => {
        clearDisplay()
      }, 1000)
    }
  }
  
  function clearDisplay() {
    setDisplay(String.fromCharCode(160));
  }


  const clips = [].slice.call(document.getElementsByClassName('clip'));
  clips.forEach(sound => {
    sound.volume = vol;
  });

  return (
    <div className="App">
      <div className='inner-container' id='drum-machine'>
        <PadBank 
          clipVolume={vol}
          currentBank={bank}
          powerState={power}
          updateDisplay={displayClip}
          />
        <div className='logo'>
          <div className='inner-logo'>FCC{String.fromCharCode(160)}</div>
          <i className='inner-logo fa fa-free-code-camp'></i>
        </div>
        <div className='controls-container'>
          <div className='control'>
            <p>Power</p>
            <div className='select' onClick={e => {
              if (power === 'right') {
                setPower('left');
                clearDisplay();
              } else {
                setPower('right');
              }
            }}>
              <div className='inner' style={{float: power}}></div>
            </div>
          </div>
          <p id='display'>{dis}</p>
          <div className='volume-slider' onChange={changeVolume}>
            <input min='0' max='1' step='0.01' type='range' defaultValue={vol}></input>
          </div>
          <div className='control'>
            <p>Bank</p>
            <div className='select' onClick={selectBank}>
              <div className='inner' style={{
                float: align
              }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;