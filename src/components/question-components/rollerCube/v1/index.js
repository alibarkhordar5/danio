import { useState, useEffect } from 'react';

export default function RollerCube(props) {
  // do not change this line at all !!!

  const { showingAttrs, setUser_answer, answerToPut, children } = props;

  const { width1 = 0, width2 = 0, overlap = 0 } = showingAttrs;

  const li = [];
  let margin = 0,
    start = 0;

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

  if (overlap == 0) {
    margin = 20;
  }

  for (let i = 0; i < width1; i++) {
    if (i >= width1 - overlap && overlap != 0) {
      li.push(
        <rect
          x={i * 100}
          y="3"
          width="100"
          height="70"
          stroke="blue"
          stroke-width="3"
          style={{ fill: 'url(#diagonalHatch)' }}
        />
      );
    } else {
      li.push(<rect x={i * 100} y="3" width="100" height="70" stroke="blue" stroke-width="3" fill={'none'} />);
    }
  }

  for (let i = 0; i < width2; i++) {
    if (i < overlap && overlap != 0) {
      li.push(
        <rect
          x={(width1 - overlap + i) * 100}
          y={`${76.7 + margin}`}
          width="100"
          height="70"
          stroke="red"
          stroke-width="3"
          style={{ fill: 'url(#diagonalHatch)' }}
        />
      );
    } else {
      li.push(
        <rect
          x={(width1 - overlap + i) * 100}
          y={`${76.7 + margin}`}
          width="100"
          height="70"
          stroke="red"
          stroke-width="3"
          fill="none"
        />
      );
    }
  }

  return (
    <div style={{ margin: 'auto' }}>
      <svg
        width={windowSize[0] > 500 ? '100%' : '50%'}
        viewBox={`-10 -10 ${(width1 + width2 + overlap) * 100 + 10} 220`}
      >
        <defs>
          <pattern
            id="diagonalHatch"
            width="10"
            height="10"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line x1="0" y1="0" x2="0" y2="10" style={{ stroke: 'black', strokeWidth: '1' }} />
          </pattern>
        </defs>
        {li}
      </svg>
    </div>
  );
}

// \roller_cube[width1=4,width2=4,overlap=0]
