/*

if sides is defined

sides = [a, b, c]
a = bottom side
b = right side
c = left side

otherwise

angles = [A, B, C]
A = top angle
B = right angle
C = left angle

(angles must add up to 180)

+

angleTexts

*/

import { useState, useEffect } from 'react';
import useInnerWidth from 'src/hooks/use-inner-width';

export default function Triangle(props) {
  const { showingAttrs } = props;
  const { sides, angles, angleTexts, scale = 10, caption } = showingAttrs;
  let mySides;

  if (typeof sides === 'undefined') {
    mySides = [
      10 * Math.sin((angles[0] / 180) * Math.PI),
      10 * Math.sin((angles[1] / 180) * Math.PI),
      10 * Math.sin((angles[2] / 180) * Math.PI),
    ];
  } else {
    mySides = [...sides];
  }

  const x = (mySides[0] ** 2 + mySides[2] ** 2 - mySides[1] ** 2) / (2 * mySides[0]);
  const p = (mySides[0] + mySides[1] + mySides[2]) / 2;
  const s = (p * (p - mySides[0]) * (p - mySides[1]) * (p - mySides[2])) ** 0.5;
  const h = (2 * s) / mySides[0];

  const tags = [];

  tags.push(
    <path
      d={`
                M ${(x + 1) * scale} 0
                L ${scale} ${h * scale}
                L ${(mySides[0] + 1) * scale} ${h * scale}
                L ${(x + 1) * scale} 0
                L ${scale} ${h * scale}
            `}
      stroke="rgb(150,150,150)"
      fill="none"
      strokeWidth={2}
    />
  );

  if (typeof sides === 'undefined') {
    const textFromAngle = 1;
    tags.push(
      <text
        x={(x + 1 - textFromAngle * Math.cos(((angles[1] + angles[0] / 2) / 180) * Math.PI)) * scale}
        y={textFromAngle * Math.sin(((angles[1] + angles[0] / 2) / 180) * Math.PI) * scale}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="blue"
        fontWeight="bold"
      >
        {angleTexts[0]}
      </text>
    );
    tags.push(
      <text
        x={(1 + textFromAngle * Math.cos((angles[1] / 2 / 180) * Math.PI)) * scale}
        y={(h - textFromAngle * Math.sin((angles[1] / 2 / 180) * Math.PI)) * scale}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="blue"
        fontWeight="bold"
      >
        {angleTexts[1]}
      </text>
    );
    tags.push(
      <text
        x={(1 + mySides[0] - textFromAngle * Math.cos((angles[2] / 2 / 180) * Math.PI)) * scale}
        y={(h - textFromAngle * Math.sin((angles[2] / 2 / 180) * Math.PI)) * scale}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="blue"
        fontWeight="bold"
      >
        {angleTexts[2]}
      </text>
    );
  } else {
    tags.push(<circle cx={(mySides[0] / 2 + 1) * scale} cy={h * scale} r=".4rem" fill="white" />);
    tags.push(
      <text
        fill="blue"
        fontWeight="bold"
        x={(mySides[0] / 2 + 1) * scale}
        y={h * scale}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {mySides[0]}
      </text>
    );
    tags.push(<circle cx={(x / 2 + mySides[0] / 2 + 1) * scale} cy={(h / 2) * scale} r=".4rem" fill="white" />);
    tags.push(
      <text
        fill="blue"
        fontWeight="bold"
        x={(x / 2 + mySides[0] / 2 + 1) * scale}
        y={(h / 2) * scale}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {mySides[1]}
      </text>
    );
    tags.push(<circle cx={(x / 2 + 1) * scale} cy={(h / 2) * scale} r=".4rem" fill="white" />);
    tags.push(
      <text
        fill="blue"
        fontWeight="bold"
        x={(x / 2 + 1) * scale}
        y={(h / 2) * scale}
        textAnchor="middle"
        alignmentBaseline="middle"
      >
        {mySides[2]}
      </text>
    );
  }

  tags.push(
    <text
      x={((Math.max(mySides[0], x, mySides[0] - x) + 2) * scale) / 2 + Math.min(0, x * scale)}
      y={(h + 0.75) * scale}
      textAnchor="middle"
    >
      {caption}
    </text>
  );

  const innerWidth = useInnerWidth();

  return (
    <div style={{ fontFamily: 'NazaninF' }}>
      {innerWidth > 500 ? (
        <svg
          style={{ display: 'block', margin: 'auto' }}
          fontSize="1.5rem"
          width="400px"
          viewBox={`${Math.min(0, x * scale)} -1 ${(Math.max(mySides[0], x, mySides[0] - x) + 2) * scale} ${
            (h + 1) * scale + 10
          }`}
        >
          {tags}
        </svg>
      ) : (
        <svg
          style={{ display: 'block', margin: 'auto' }}
          fontSize="2rem"
          width="200px"
          viewBox={`${Math.min(0, x * scale)} -1 ${(Math.max(mySides[0], x, mySides[0] - x) + 2) * scale} ${
            (h + 1) * scale + 10
          }`}
        >
          {tags}
        </svg>
      )}
    </div>
  );
}

// \triangle[sides=[8 7 6], scale=20]
// \triangle[angles=[90 45 45], angleTexts=["90" "?" "?"], scale=20]
