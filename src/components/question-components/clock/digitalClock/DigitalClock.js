
import { useState } from 'react';
import classes from './DigitalClock.module.css';
import Clock from './components/Clock';
import { Countdown } from './components/Countdown';

function DigitalClock(props) {

  return (
    <div className={classes.body}>
      <Clock hr={props.hr} min={props.min} sec={props.sec}/>
    </div>
  );
}

export default DigitalClock;
