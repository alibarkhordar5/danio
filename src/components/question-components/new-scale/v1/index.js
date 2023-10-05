/*

angle is measured clockwise

value returns final value of inputAngle

*/

import { useState, useEffect } from 'react';
import useSvgDrag from 'src/hooks/use-svg-drag';

function coordinate2Theta({ x, y }) {
  return (Math.atan2(y, x) / Math.PI) * 180 + 180;
}

function theta2ValidTheta(theta) {
  return Math.round(theta / 5) * 5;
}

const SVG_ID = "HOLYMOTHEROFGOD"

const Index = (props) => {
  const { showingAttrs, answerToPut, setUser_answer } = props;
  const { id, hasInput, inputAngle, initialAngle, backgroundColor } = showingAttrs;

  const [value, setValue] = useState();

  const doAfterMove = (point) => {
    if (hasInput) {
      let newValue = coordinate2Theta(point);

      if (newValue <= 180) {
        state.angle = newValue;
        setValue(newValue);
      }
    }
  }

  const doAfterUp = () => {
    if (hasInput) {
      let newValue = theta2ValidTheta(state.angle);
      state.angle = newValue;
      setValue(newValue);
    }
  }

  const { startMouseDrag, startTouchDrag } = useSvgDrag(SVG_ID, doAfterMove, doAfterUp);

  let state = { angle: value };

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

  useEffect(() => {
    if (inputAngle) {
      setValue(inputAngle);
      state = { angle: inputAngle };
    }
  }, [inputAngle]);

  const tags = [];

  tags.push(
    <path
      d={`
            M -5 0
            a 5 5 0 0 1 10 0
            l 95 0
            a 100 100 0 0 0 -200 0
            l 95 0
        `}
      fill={backgroundColor}
      opacity={0.1}
    />
  );

  tags.push(
    <g transform={`rotate(${initialAngle})`}>
      <path
        d={`
                M 0 0
                l -105 0
                l 0 -1
                l -2.5 1
                l 2.5 1
                l 0 -1
            `}
        stroke="red"
        fill="red"
      />
    </g>
  );

  if (hasInput) {
    tags.push(
      <path
        d={`
                M -115 0
                a 115 115 0 0 1 230 0
            `}
        stroke="black"
        fill="none"
        opacity={0.05}
      />
    );

    tags.push(
      <g transform={`rotate(${state.angle})`}>
        <path
          d={`
                    M 0 0
                    l -105 0
                    l 0 -1
                    l -2.5 1
                    l 2.5 1
                    l 0 -1
                `}
          stroke="red"
          fill="red"
        />
        <g onMouseDown={startMouseDrag} onTouchStart={startTouchDrag}>
          <rect x={-120} y={-7.5} width={10} height={15} fill="lightBlue" rx={2} ry={2} />
          <circle cx={-115} cy={0} r={1} fill="white" />
          <path
            d={`
                        M -118 2
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
                        M -118 -2
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
  } else {
    tags.push(
      <g transform={`rotate(${state.angle})`}>
        <path
          d={`
                    M 0 0
                    l -105 0
                    l 0 -1
                    l -2.5 1
                    l 2.5 1
                    l 0 -1
                `}
          stroke="red"
          fill="red"
        />
      </g>
    );
  }

  tags.push(
    <path
      d={`
            M -85 0
            a 85 85 0 0 1 170 0
        `}
      stroke="black"
      strokeWidth={0.5}
      fill="none"
      opacity={0.7}
    />
  );

  tags.push(
    <path
      d={`
            M -5 0
            a 5 5 0 0 1 10 0
        `}
      stroke="black"
      strokeWidth={0.5}
      fill="none"
      opacity={0.7}
    />
  );

  for (let i = 0; i < 181; i++) {
    if (i % 10 == 0) {
      tags.push(
        <g transform={`rotate(${i})`} opacity={0.7}>
          <path
            d={`
                        M -5 0
                        l -70 0
                        m -5 0
                        l -10 0
                        m -5 0
                        l -5 0
                    `}
            stroke="black"
            strokeWidth={0.5}
            fill="none"
          />
          <text x="-75" y="1" fontSize="0.2rem" transform="rotate(-90, -78, 1) rotate(-2)">
            {i}
          </text>
          <text x="-92" y="1" fontSize="0.2rem" transform="rotate(-90, -95, 1) rotate(-2)">
            {180 - i}
          </text>
        </g>
      );
    } else if (i % 5 == 0) {
      tags.push(
        <g transform={`rotate(${i})`} opacity={0.7}>
          <path
            d={`
                        M -40 0
                        l -35 0
                        m -5 0
                        l -10 0
                        m -5 0
                        l -5 0
                    `}
            stroke="black"
            strokeWidth={0.5}
            fill="none"
          />
        </g>
      );
    } else {
      tags.push(
        <g transform={`rotate(${i})`} opacity={0.7}>
          <path
            d={`
                        M -97.5 0
                        l -2.5 0
                    `}
            stroke="black"
            strokeWidth={0.5}
            fill="none"
          />
        </g>
      );
    }
  }

  tags.push(<circle cx="0" cy="0" r="1" />);

  return (
    <svg viewBox="-120 -120 240 130" id={SVG_ID}>
      {tags}
    </svg>
  );
};

// \new_scale[id=akbar, hasInput=\true, inputAngle=45]

export default Index;
