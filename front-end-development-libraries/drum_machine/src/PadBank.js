import DrumPad from './DrumPad';
import './App.css';

function PadBank(props) {
    let bank;
    if (props.powerState === 'right') {
        bank = props.currentBank.map((bankObj, i, bankArr) => {
            return (
                <DrumPad
                    clip={bankArr[i].url}
                    clipId={bankArr[i].id}
                    keyCode={bankArr[i].keyCode}
                    keyTrigger={bankArr[i].keyTrigger}
                    power={props.powerState}
                    updateDisplay={props.updateDisplay}
                    key={i}
                />
            )
        })
    } else {
        bank = props.currentBank.map((bankObj, i, bankArr) => {
            return (
                <DrumPad
                    clip='#'
                    clipId={bankArr[i].id}
                    keyCode={bankArr[i].keyCode}
                    keyTrigger={bankArr[i].keyTrigger}
                    power={props.powerState}
                    updateDisplay={props.updateDisplay}
                    key={i}
                />
            )
        })
    }
    return (
        <div className='pad-bank'>{bank}</div>
    )
}

export default PadBank;