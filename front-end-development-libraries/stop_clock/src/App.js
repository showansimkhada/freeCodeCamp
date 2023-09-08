import { useState } from 'react';
import './App.css';

function App() {
  const [bV, setBv] = useState(5);
  const [sV, setSv] = useState(25);
  var [timerState, setTimerState] = useState("stopped");
  var [timerType, setTimerType] = useState("Session");
  var [timer, setTimer] = useState(sV*60);
  var [intervalID, setIntervalID] = useState("");
  var [alarmColor, setAlarmCol] = useState({
    color: 'white'
  })
  const [audio, setAudio] = useState(null);

  const secInt = (fn, time) => {
    var cancel, nextAt, timeout, wrapper;
    nextAt = new Date().getTime() + time;
    timeout = null;
    wrapper = function () {
      nextAt += time;
      timeout = setTimeout(wrapper, nextAt - new Date().getTime());
      return fn();
    };
    cancel = function () {
      return clearTimeout(timeout);
    };
    timeout = setTimeout(wrapper, nextAt - new Date().getTime());
    return {
      cancel: cancel
    };
  }

  function setBrkLen(e) {
    lengthControl(e.currentTarget.value, bV, "Session");
  }

  function setSesLen(e) {
    lengthControl(e.currentTarget.value, sV, "Break");
  }

  function lengthControl(val, leng, str) {
    if (timerState !== 'running') {
      if (timerType === str) {
        if (val === '-' && leng !== 1) {
          setBv(leng-1)
        } else if (val === '+' && leng !== 60) {
          setBv(leng+1)
        }
      } else if (val === '-' && leng !==1) {
        setSv(leng-1);
        setTimer((leng * 60 - 60));
      } else if (val === '+' && leng !== 60) {
        setSv(leng+1);
        setTimer((leng * 60 + 60))
      }
    } else {
      return;
    }
  }

  function timerControl() {
    if (timerState === 'stopped') {
      setTimerState("running");
      timerState = "running";
      setTimerState(timerState);
      beginCountdown();
    } else {
      timerState = "stopped";
      setTimerState(timerState);
      if (intervalID) {
        intervalID.cancel();
      }
    }
  }

  function beginCountdown() {
    intervalID = secInt(() => {
      decrementTimer();
      phaseControl();
    }, 1000);
    setIntervalID(intervalID);
  }

  function decrementTimer() {
    timer = timer - 1
    setTimer(timer);
  }  

  function phaseControl() {
    let e = timer;
    warning(e);
    buzzer(e);
    if (e < 0) {
      if (intervalID) {
        intervalID.cancel();
      }
      if (timerType === "Session") {
        beginCountdown();
        switchTimer(60 * bV , "Break");
      } else {
        beginCountdown();
        switchTimer(60 * sV, "Session");
      }
    }
  }

  function warning(e) {
    if (e < 61) {
      setAlarmCol({
        color: '#a50d0d'
      })
    } else {
      setAlarmCol({
        color: 'white'
      })
    }
  }

  function buzzer(e) {
    if ( e === 0) {
      audio.play();
    }
  }

  function switchTimer(t, str) {
    timer = t;
    setTimer(timer);
    timerType = str;
    setTimerType(timerType);
    setAlarmCol({
      color: 'white'
    })
  }

  function clockify() {
    var e = Math.floor(timer / 60),
        t = timer - 60 * e;
    return (e = e < 10 ? "0" + e : e) + ":" + (t = t < 10 ? "0" + t : t)
  }

  function resetTime() {
    setBv(5);
    setSv(25);
    setTimerState('stopped');
    setTimerType('Session');
    setTimer(sV*60);
    setIntervalID('');
    setAlarmCol({
      color: 'white'
    });
    if (intervalID) {
      intervalID.cancel();
    }
    audio.pause();
    audio.currentTime= 0;
  }

  return (
    <div className="App">
      <div id='container'>
        <div>
          <div className='main-title'>25 + 5 Clock</div>
          <div className='length-control'>
            <div id='break-label'>Break Length</div>
            <button id='break-decrement' className='btn-label' value={'-'} onClick={(e) => setBrkLen(e)}>
              <i className='fa fa-arrow-down fa-2x'></i>
            </button>
            <div id='break-length' className='btn-label'>{bV}</div>
            <button id='break-increament' className='btn-label' value={'+'} onClick={(e) => setBrkLen(e)}>
              <i className='fa fa-arrow-up fa-2x'></i>
            </button>
          </div>
          <div className='length-control'>
            <div id='session-label'>Session Length</div>
            <button id='session-decrement' className='btn-label'  value={"-"} onClick={(e) => setSesLen(e)}>
              <i className='fa fa-arrow-down fa-2x'></i>
            </button>
            <div id='session-length' className='btn-label'>{sV}</div>
            <button id='session-increment' className='btn-label' value={'+'} onClick={(e) => setSesLen(e)}>
              <i className='fa fa-arrow-up fa-2x'></i>
            </button>
          </div>
          <div className='timer' style={alarmColor}>
            <div className='timer-wrapper'>
              <div id='timer-label'>{timerType}</div>
              <div id='time-left'>{clockify()}</div>
            </div>
          </div>
          <div className='timer-control'>
            <button id='start_stop' onClick={() => {
              timerControl()
            }}>
              <i className='fa fa-play fa-2x'></i>
              <i className='fa fa-pause fa-2x'></i>
            </button>
            <button id='reset' onClick={resetTime}>
              <i className='fa fa-refresh fa-2x'></i>
            </button>
          </div>
          <div className='author'>
            "Designed and Coded by "
            <br/>
            <a href='https://www.freecodecamp.org/showansimkhada' target='_blank' rel="noopener noreferrer">Showan Simkhada</a>
          </div>
          <audio preload='auto' id='beep' 
            ref={(audio) => {
              setAudio(audio)
            }}
            src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav'>
            </audio>
        </div>
      </div>
    </div>
  );
}

export default App;