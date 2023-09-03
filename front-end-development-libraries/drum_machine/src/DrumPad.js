import { useEffect, useState } from 'react';
import  React from 'react';

function DrumPad(props) {
    const activeStyle = {
        backgroundColor: 'orange',
        boxShadow: '0 3px orange',
        height: 77,
        marginTop: 13
    }

    const inactiveStyle = {
        backgroundColor: 'grey',
        marginTop: 10,
        boxShadow: '3px 3px 5px black'
    }

    const [padStyle, setStyle] = useState(inactiveStyle);

    useEffect(() => {
        window.addEventListener('keydown', keyPress);
        return() => {
            window.removeEventListener('keydown', keyPress);
        }
    })

    function keyPress(e){
        if (e.keyCode === props.keyCode) {
            playSound();
        }
    }

    function playSound() {
        if (props.power === 'left') {
            setTimeout(() => {
                setStyle(inactiveStyle)
            }, 100);
            setStyle({
                height: 77,
                marginTop: 13,
                backgroundColor: 'grey',
                boxShadow: '0 3px grey'
            })
            
        } else {
            const sound = document.getElementById(props.keyTrigger);
            sound.currentTime = 0;
            sound.play();
            setTimeout(() => {
                setStyle(inactiveStyle);
            }, 100);
            setStyle(activeStyle)
            props.updateDisplay(props.clipId)
        }
    }

    return (
        <div 
            className="drum-pad"
            id={props.clipId}
            onClick={playSound}
            style={padStyle}
            >
                <audio 
                    className="clip"
                    id={props.keyTrigger}
                    src={props.clip}
                    />
                    {props.keyTrigger}
        </div>
    )
}

export default DrumPad;