import styled from '@emotion/styled';
import { listClasses } from '@mui/material';

function findMinOfArray(arr, index) {
  let min = arr[0][index];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i][index] < min) {
      min = arr[i][index];
    }
  }

  return min;
}

function findMaxOfArray(arr, index) {
  let max = arr[0][index];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][index] > max) {
      max = arr[i][index];
    }
  }
  return max;
}

function convertDecimalToSlash(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i][2] = arr[i][2].toString().replace('.', '/'); // convert number to string
  }
  return arr;
}

const SCALE = 50;

// returns a path showing a + b/c at x, y
function returnAdadMakhlut(a, b, c, x, y, fontSize) {
  const res = [];

  res.push(
    <text
      x={x - SCALE / 2}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={fontSize / 1.2}
      fontWeight="bold"
    >
      {a}
    </text>
  );

  res.push(
    <text
      x={x}
      y={y - SCALE / 3}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={fontSize / 1.2}
      fontWeight="bold"
    >
      {b}
    </text>
  );

  res.push(
    <path
      d={`
            M ${x - SCALE / 4} ${y}
            l ${(2 * SCALE) / 4} ${0}
        `}
      stroke="black"
      strokeWidth={SCALE / 20}
    />
  );

  res.push(
    <text
      x={x}
      y={y + SCALE / 3}
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={fontSize / 1.2}
      fontWeight="bold"
    >
      {c}
    </text>
  );

  return res;
}

export default function PerimeterShape(props) {
  const { showingAttrs } = props;
  const { adadMakhluts = [], angles = [] } = showingAttrs;
  let { coordinate } = showingAttrs;
  const li = [];
  const path_svg = [];
  let path_str = `M ${SCALE * coordinate[0][0]} ${SCALE * coordinate[0][1]}`;

  coordinate = convertDecimalToSlash(coordinate);
  console.log({ coordinate });
  let minx = findMinOfArray(coordinate, 0);
  let miny = findMinOfArray(coordinate, 1);
  let maxx = findMaxOfArray(coordinate, 0);
  let maxy = findMaxOfArray(coordinate, 1);
  let fontSize = ((maxx - minx + (maxy - miny)) / 2) * 0.15 * SCALE;

  console.log(maxx - minx);
  console.log(maxy - miny);

  for (let i = 0; i < coordinate.length - 1; i++) {
    path_str += `L ${SCALE * coordinate[i][0]} ${SCALE * coordinate[i][1]}`;
    if (adadMakhluts.length > 0) {
      li.push(
        returnAdadMakhlut(
          ...adadMakhluts[i],
          ((coordinate[i][0] + coordinate[i + 1][0]) / 2) * SCALE,
          ((coordinate[i][1] + coordinate[i + 1][1]) / 2) * SCALE,
          fontSize
        )
      );
    } else {
      li.push(
        <text
          x={((coordinate[i][0] + coordinate[i + 1][0]) / 2) * SCALE}
          y={((coordinate[i][1] + coordinate[i + 1][1]) / 2) * SCALE + 0.1 * SCALE}
          textAnchor="middle"
          fontSize={fontSize}
          fontWeight={'bold'}
        >
          {coordinate[i][2]}
        </text>
      );
    }
  }

  path_str += `L ${SCALE * coordinate[0][0]} ${SCALE * coordinate[0][1]}`;
  path_svg.push(<path d={path_str} fill="none" stroke="rgb(255, 71, 233)" strokeWidth="5" />);

  const anglesLayer = [];
  if (angles.length > 0) {
    const ANGLE_RADIUS = Math.min(maxx - minx, maxy - miny) * 0.1;
    let tempCoordinate = [
      coordinate[coordinate.length - 2],
      ...coordinate.slice(0, coordinate.length - 1),
      coordinate[0],
    ];
    console.log(tempCoordinate);
    let lastAngle, nextAngle, middleAngle;

    for (let i = 1; i < tempCoordinate.length - 1; i++) {
      lastAngle = Math.atan2(
        tempCoordinate[i - 1][1] - tempCoordinate[i][1],
        tempCoordinate[i - 1][0] - tempCoordinate[i][0]
      );
      nextAngle = Math.atan2(
        tempCoordinate[i + 1][1] - tempCoordinate[i][1],
        tempCoordinate[i + 1][0] - tempCoordinate[i][0]
      );
      middleAngle = (lastAngle + nextAngle) / 2;
      if (Math.abs(nextAngle - lastAngle) > Math.PI) {
        middleAngle += Math.PI;
      }
      anglesLayer.push(
        <path
          d={`
                        M ${SCALE * (tempCoordinate[i][0] + ANGLE_RADIUS * Math.cos(lastAngle))} ${
            SCALE * (tempCoordinate[i][1] + ANGLE_RADIUS * Math.sin(lastAngle))
          }
                        A ${SCALE * ANGLE_RADIUS} ${SCALE * ANGLE_RADIUS} 0 0 0 ${
            SCALE * (tempCoordinate[i][0] + ANGLE_RADIUS * Math.cos(nextAngle))
          } ${SCALE * (tempCoordinate[i][1] + ANGLE_RADIUS * Math.sin(nextAngle))}
                    `}
          stroke="rgb(54,225,221)"
          strokeWidth="5"
          fill="none"
        />,
        <text
          x={SCALE * (tempCoordinate[i][0] + 1.5 * ANGLE_RADIUS * Math.cos(middleAngle))}
          y={SCALE * (tempCoordinate[i][1] + 1.5 * ANGLE_RADIUS * Math.sin(middleAngle))}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={(fontSize * 3) / 4}
          fontWeight="bold"
        >
          {angles[i - 1]}
        </text>
      );
    }
  }

  return (
    <svg
      width="300px"
      viewBox={`${SCALE * (minx - 1)} ${SCALE * (miny - 1)} ${SCALE * (maxx - minx + 2)} ${SCALE * (maxy - miny + 2)}`}
      style={{ display: 'block', margin: 'auto', fontFamily: 'NAZANINF' }}
    >
      {path_svg}
      {li}
      {anglesLayer}
    </svg>
  );
}

// \perimeter_shape[coordinate=[[7 4 12] [2 7 13] [0 5 14] [3 2 15] [8 1 16] [7 4 17]], angles=[یک]]
// \perimeter_shape[coordinate=[[7 4 12] [2 7 13] [0 5 14] [3 2 15] [8 1 16] [7 4 17]], adadMakhluts=[[1 2 3] [1 2 3] [1 2 3] [1 2 3] [1 2 3]]]
