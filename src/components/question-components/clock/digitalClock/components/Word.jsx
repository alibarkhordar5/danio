/**
 *  2022 Sergi S. - https://github.com/sergiss
 */

import React from 'react'
import classes from '../DigitalClock.module.css'
export const Word = ({ value, hidden = false }) => {
  const getStyle = ()=> {
    return {
      visibility:  hidden ? 'hidden' : 'visible'
    }
  }
  return (
    <div className={classes.digital}>
      <p>{value}</p>
      <p style={getStyle()}>{value}</p>
    </div>
  )
}