/*

value returns a string in hh:mm:ss format.

*/

// general imports
import { useEffect, useState } from 'react';
import useInnerWidth from 'src/hooks/use-inner-width';

// @mui
import { Box } from '@mui/material';
import useSvgDrag from 'src/hooks/use-svg-drag';

function coordinate2Theta({ x, y }) {
  return Math.atan2(y, x);
}

function theta2ValidTheta(type, theta) {
  return type === 'hour'
    ? Math.round(theta / (Math.PI / 6)) * (Math.PI / 6)
    : Math.round(theta / (Math.PI / 30)) * (Math.PI / 30);
}

function theta2Clock(type, validTheta) {
  let hourRes = validTheta / (Math.PI / 6) + 15;
  if (hourRes > 12) {
    hourRes %= 12;
  }

  let otherRes = validTheta / (Math.PI / 30) + 75;
  if (otherRes >= 60) {
    otherRes %= 60;
  }

  return type === 'hour' ? hourRes : otherRes;
}

function state2Value(hourTheta, minTheta, secTheta) {
  return theta2Clock('hour', hourTheta) + ':' + theta2Clock('min', minTheta) + ':' + theta2Clock('sec', secTheta);
}

function theta2X({ r, theta }) {
  return r * Math.cos(theta);
}

function theta2Y({ r, theta }) {
  return r * Math.sin(theta);
}

const SVG_ID = 'HOLYMOTHEROFGOD';

export default function Index(props) {
  // do not change this line at all !!!
  const { showingAttrs, answerToPut, setUser_answer } = props;
  const { id, hasInput } = showingAttrs;

  const doAfterMove = (point, draggedElem) => {
    if (hasInput) {
      state[draggedElem].theta = coordinate2Theta(point);
      setValue(state2Value(state.hour.theta, state.min.theta, state.sec.theta));
    }
  }

  const doAfterUp = (_, draggedElem) => {
    if (hasInput) {
      state[draggedElem].theta = theta2ValidTheta(draggedElem, state[draggedElem].theta);
      setValue(state2Value(state.hour.theta, state.min.theta, state.sec.theta));
    }
  }

  const { startMouseDrag, startTouchDrag } = useSvgDrag(SVG_ID, doAfterMove, doAfterUp);


  const [value, setValue] = useState('10:10:30');

  console.log('value', value);

  useEffect(() => {
    if (answerToPut && answerToPut[id]) {
      setValue(answerToPut[id]);
    }
  }, [answerToPut]);

  useEffect(() => {
    if (!(answerToPut && answerToPut[id])) {
      setUser_answer(id, value);
    }
  }, [value]);

  let state = {
    hour: { r: 50, theta: ((Number(value.split(':')[0]) - 3) * Math.PI) / 6 },
    min: { r: 70, theta: ((Number(value.split(':')[1]) - 15) * Math.PI) / 30 },
    sec: { r: 90, theta: ((Number(value.split(':')[2]) - 15) * Math.PI) / 30 },
  };
  const tags = [];

  tags.push(<circle cx={0} cy={0} r={118} fill="none" stroke="lightgrey" strokeWidth={2} />);

  tags.push(
    <g transform={`rotate(${(state.hour.theta / Math.PI) * 180})`}>
      <path
        d={`
          M 0 0
          L ${118} 0
        `}
        stroke="lightgray"
        stroke-width="6"
        strokeDasharray="3 3"
      />
      <path
        d={`
          M 0 0
          L ${state.hour.r} 0
        `}
        stroke="black"
        stroke-width="6"
      />
      <g onMouseDown={(e) => startMouseDrag(e, 'hour')} onTouchStart={(e) => startTouchDrag(e, 'hour')}>
        <rect x={105} y={-12.5} width={25} height={25} fill="lightblue" rx={2} ry={2} />
        <circle cx={118} cy={0} r={3} fill="white" />
        <path
          d={`
                M 115 6
                l 6 0
                l -3 3
                l -3 -3
            `}
          stroke="white"
          strokeWidth={0.5}
          fill="white"
        />
        <path
          d={`
                M 115 -6
                l 6 0
                l -3 -3
                l -3 3
            `}
          stroke="white"
          strokeWidth={0.5}
          fill="white"
        />
      </g>
    </g>
  );

  tags.push(
    <g transform={`rotate(${(state.min.theta / Math.PI) * 180})`}>
      <path
        d={`
          M 0 0
          L ${118} 0
        `}
        stroke="lightgray"
        stroke-width="3"
        strokeDasharray="1.5 1.5"
      />
      <path
        d={`
          M 0 0
          L ${state.min.r} 0
        `}
        stroke="black"
        stroke-width="3"
      />
      <g onMouseDown={(e) => startMouseDrag(e, 'min')} onTouchStart={(e) => startTouchDrag(e, 'min')}>
        <rect x={105} y={-12.5} width={25} height={25} fill="lightblue" rx={2} ry={2} />
        <circle cx={118} cy={0} r={3} fill="white" />
        <path
          d={`
                M 115 6
                l 6 0
                l -3 3
                l -3 -3
            `}
          stroke="white"
          strokeWidth={0.5}
          fill="white"
        />
        <path
          d={`
                M 115 -6
                l 6 0
                l -3 -3
                l -3 3
            `}
          stroke="white"
          strokeWidth={0.5}
          fill="white"
        />
      </g>
    </g>
  );

  // <Image/>

  tags.push(
    <g transform={`rotate(${(state.sec.theta / Math.PI) * 180})`}>
      <path
        d={`
          M 0 0
          L ${118} 0
        `}
        stroke="lightgray"
        stroke-width="1.5"
        strokeDasharray=".75 .75"
      />
      <path
        d={`
          M 0 0
          L ${state.sec.r} 0
        `}
        stroke="red"
        stroke-width="1.5"
      />
      <g onMouseDown={(e) => startMouseDrag(e, 'sec')} onTouchStart={(e) => startTouchDrag(e, 'sec')}>
        <rect x={105} y={-12.5} width={25} height={25} fill="lightblue" rx={2} ry={2} />
        <circle cx={118} cy={0} r={3} fill="white" />
        <path
          d={`
                M 115 6
                l 6 0
                l -3 3
                l -3 -3
            `}
          stroke="white"
          strokeWidth={0.5}
          fill="white"
        />
        <path
          d={`
                M 115 -6
                l 6 0
                l -3 -3
                l -3 3
            `}
          stroke="white"
          strokeWidth={0.5}
          fill="white"
        />
      </g>
    </g>
  );

  for (let i = 0; i < 60; i++) {
    tags.push(
      <circle
        cx={theta2X({ r: 95, theta: (i * Math.PI) / 30 })}
        cy={theta2Y({ r: 95, theta: (i * Math.PI) / 30 })}
        r={i % 5 === 0 ? 4 : 2}
      />
    );
  }

  for (let i = 0; i < 12; i++) {
    tags.push(
      <text
        textAnchor="middle"
        x={theta2X({ r: 85, theta: (i * Math.PI) / 6 })}
        y={theta2Y({ r: 85, theta: (i * Math.PI) / 6 }) + 3}
        fontSize="10px"
      >
        {i === 9 ? 12 : (i + 3) % 12}
      </text>
    );
  }

  tags.push(<circle cx={0} cy={0} r="4" />);

  const innerWidth = useInnerWidth();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <svg id={SVG_ID} width={innerWidth < 768 ? '100%' : '40%'} viewBox="-130 -130 260 260">
        {tags}
      </svg>
    </Box>
  );
}

// \analog_clock[id=akbar]
// \analog_clock[id=amir, hasInput=\true]
// \analog_clock[id=neda, hasInput=\false] DO NOT DO THIS GIVES ERROR
// \analog_clock[id=jesus, hasInput=\false, clock="1:2:3"]
// \analog_clock[id=jesus, hasInput=\true, clock="1:2:3"]
