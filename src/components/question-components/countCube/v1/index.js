import { useState, useEffect } from 'react';
function getSvgCoordinate(x, y, z, xzAngle = 135) {
  return {
    x: x + z * Math.cos((xzAngle / 180) * Math.PI) * Math.abs(Math.cos((xzAngle / 180) * Math.PI)),
    y: -y + z * Math.sin((xzAngle / 180) * Math.PI) * Math.abs(Math.sin((xzAngle / 180) * Math.PI)),
  };
}

function makeSingleCube(x, y, z, w, h, d, myStroke = 'none', color = { r: 252, g: 186, b: 3 }) {
  const rightRatio = 2 / 4,
    topRatio = 3 / 4;
  const rightColor = { r: rightRatio * color.r, g: rightRatio * color.g, b: rightRatio * color.b },
    topColor = { r: topRatio * color.r, g: topRatio * color.g, b: topRatio * color.b };

  return [
    <path
      d={`
                M ${getSvgCoordinate(x, y, z + d).x}         ${getSvgCoordinate(x, y, z + d).y}
                L ${getSvgCoordinate(x + w, y, z + d).x}     ${getSvgCoordinate(x + w, y, z + d).y}
                L ${getSvgCoordinate(x + w, y + h, z + d).x} ${getSvgCoordinate(x + w, y + h, z + d).y}
                L ${getSvgCoordinate(x, y + h, z + d).x}     ${getSvgCoordinate(x, y + h, z + d).y}
                L ${getSvgCoordinate(x, y, z + d).x}         ${getSvgCoordinate(x, y, z + d).y}
            `}
      stroke={myStroke}
      strokeWidth={0.1}
      fill={`rgb(${color.r}, ${color.g}, ${color.b})`}
    />,
    <path
      d={`
                M ${getSvgCoordinate(x + w, y, z).x}         ${getSvgCoordinate(x + w, y, z).y}
                L ${getSvgCoordinate(x + w, y, z + d).x}     ${getSvgCoordinate(x + w, y, z + d).y}
                L ${getSvgCoordinate(x + w, y + h, z + d).x} ${getSvgCoordinate(x + w, y + h, z + d).y}
                L ${getSvgCoordinate(x + w, y + h, z).x}     ${getSvgCoordinate(x + w, y + h, z).y}
                L ${getSvgCoordinate(x + w, y, z).x}         ${getSvgCoordinate(x + w, y, z).y}
            `}
      stroke={myStroke}
      strokeWidth={0.1}
      fill={`rgb(${rightColor.r}, ${rightColor.g}, ${rightColor.b})`}
    />,
    <path
      d={`
                M ${getSvgCoordinate(x, y + h, z).x}         ${getSvgCoordinate(x, y + h, z).y}
                L ${getSvgCoordinate(x + w, y + h, z).x}     ${getSvgCoordinate(x + w, y + h, z).y}
                L ${getSvgCoordinate(x + w, y + h, z + d).x} ${getSvgCoordinate(x + w, y + h, z + d).y}
                L ${getSvgCoordinate(x, y + h, z + d).x}     ${getSvgCoordinate(x, y + h, z + d).y}
                L ${getSvgCoordinate(x, y + h, z).x}         ${getSvgCoordinate(x, y + h, z).y}
            `}
      stroke={myStroke}
      strokeWidth={0.1}
      fill={`rgb(${topColor.r}, ${topColor.g}, ${topColor.b})`}
    />,
  ];
}

export default function CountCube(props) {
  // do not change this line at all !!!

  const { showingAttrs, setUser_answer, answerToPut, children } = props;

  const {
    baseArray = [
      [3, 3, 3],
      [3, 2, 1],
      [3, 1, 0],
    ],
    halves = ['right', 'bottom'],
    unit = 'سانتی‌متر مکعب',
    color = [252, 186, 3],
  } = showingAttrs;

  const tags = [],
    length = 20;

  // const   origin = getSvgCoordinate(0, 0, 0),
  //         xAxis = getSvgCoordinate(100, 0, 0),
  //         yAxis = getSvgCoordinate(0, 100, 0),
  //         zAxis = getSvgCoordinate(0, 0, 100);
  // tags.push(<line x1={origin.x} y1={origin.y} x2={xAxis.x} y2={xAxis.y} stroke='red' strokeWidth={.5} />)
  // tags.push(<line x1={origin.x} y1={origin.y} x2={yAxis.x} y2={yAxis.y} stroke='red' strokeWidth={.5} />)
  // tags.push(<line x1={origin.x} y1={origin.y} x2={zAxis.x} y2={zAxis.y} stroke='red' strokeWidth={.5} />)

  const leftDist = halves.includes('left') ? 1 / 2 : 0,
    rightDist = halves.includes('right') ? 1 / 2 : 0,
    bottomDist = halves.includes('bottom') ? 1 / 2 : 0;
  let flag;
  for (let i = 0; i < baseArray.length; i++) {
    for (let j = 0; j < baseArray[0].length; j++) {
      for (let k = 0; k < baseArray[i][j]; k++) {
        flag = true;
        if (j == 0 && halves.includes('right') && i == 0 && halves.includes('left')) {
          tags.push(
            makeSingleCube(i * length, (k + bottomDist) * length, j * length, length / 2, length, length / 2, 'black', {
              r: color[0],
              g: color[1],
              b: color[2],
            })
          );
          flag = false;
        } else if (i == 0 && halves.includes('left') && k == 0 && halves.includes('bottom')) {
          tags.push(
            makeSingleCube(i * length, k * length, (j + rightDist) * length, length / 2, length / 2, length, 'black', {
              r: color[0],
              g: color[1],
              b: color[2],
            })
          );
          flag = false;
        } else if (k == 0 && halves.includes('bottom') && j == 0 && halves.includes('right')) {
          tags.push(
            makeSingleCube((i + leftDist) * length, k * length, j * length, length, length / 2, length / 2, 'black', {
              r: color[0],
              g: color[1],
              b: color[2],
            })
          );
          flag = false;
        } else if (k == 0 && halves.includes('bottom')) {
          tags.push(
            makeSingleCube(
              (i - leftDist) * length,
              k * length,
              (j - rightDist) * length,
              length,
              length / 2,
              length,
              'black',
              { r: color[0], g: color[1], b: color[2] }
            )
          );
          flag = false;
        } else if (j == 0 && halves.includes('right')) {
          tags.push(
            makeSingleCube(
              (i - leftDist) * length,
              (k - bottomDist) * length,
              j * length,
              length,
              length,
              length / 2,
              'black',
              { r: color[0], g: color[1], b: color[2] }
            )
          );
          flag = false;
        } else if (i == 0 && halves.includes('left')) {
          tags.push(
            makeSingleCube(
              i * length,
              (k - bottomDist) * length,
              (j - rightDist) * length,
              length / 2,
              length,
              length,
              'black',
              { r: color[0], g: color[1], b: color[2] }
            )
          );
          flag = false;
        }
        if (flag) {
          tags.push(
            makeSingleCube(
              (i - leftDist) * length,
              (k - bottomDist) * length,
              (j - rightDist) * length,
              length,
              length,
              length,
              'black',
              { r: color[0], g: color[1], b: color[2] }
            )
          );
        }
      }
    }
  }

  tags.push(
    <text
      x={3 * length}
      y={4 * length}
      textAnchor="middle"
      alignmentBaseline="middle"
      fontSize=".8rem"
      fontWeight="bold"
    >
      {'حجم'}
    </text>
  );
  tags.push(
    makeSingleCube(1 * length, -4 * length, 0, length, length, length, 'black', {
      r: color[0],
      g: color[1],
      b: color[2],
    })
  );
  tags.push(
    <text
      x={-2 * length}
      y={4 * length}
      textAnchor="middle"
      alignmentBaseline="middle"
      fontSize=".8rem"
      fontWeight="bold"
    >
      {'= 1 ' + unit}
    </text>
  );

  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <svg width={windowSize[0] > 500 ? '50%' : '100%'} viewBox="-100 -100 200 200" fontFamily="NazaninF">
      {tags}
    </svg>
  );
}

// \count_cube[]
