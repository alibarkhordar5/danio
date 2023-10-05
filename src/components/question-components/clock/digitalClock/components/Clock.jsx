import React, { useEffect, useState } from 'react'
import { Number } from './Number'
import { Word } from './Word';
import classes from "../DigitalClock.module.css"

export default function Clock(props) {

    return (
        <div className={classes.clock}>
            <div className={classes.row}>
                <div className={classes.hour}>
                    <Number value={props.hr}/>
                    <Word value={':'} />
                    <Number value={props.min}/>
                    <Word value={':'} />
                    <Number value={props.sec}/>
                </div>
            </div>
        </div>
    )
    
}
