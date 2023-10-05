import Clock from 'src/components/question-components/clock/v1';

const Index = (props) => {
  const { showingAttrs } = props;
  const { style, hr, min, sec, arrowStart, arrowEnd } = showingAttrs;

  const ARROW_RADIUS = 55;

  let path = '',
    arrowPath = '';
  if (arrowStart < arrowEnd) {
    path = `
            M ${ARROW_RADIUS * Math.sin(((arrowStart * 30) / 180) * Math.PI)} ${
      -ARROW_RADIUS * Math.cos(((arrowStart * 30) / 180) * Math.PI)
    }
        `;
    arrowPath = `
            M ${1} ${-ARROW_RADIUS}
            l -8 -4
            l 0 8
            L ${1} ${-ARROW_RADIUS}
            l -8 -4
        `;
    for (let i = 0; i <= arrowEnd - arrowStart; i++) {
      path += `
                A ${ARROW_RADIUS} ${ARROW_RADIUS}
                0 0 1
                ${ARROW_RADIUS * Math.sin((((arrowStart + i) * 30) / 180) * Math.PI)}
                ${-ARROW_RADIUS * Math.cos((((arrowStart + i) * 30) / 180) * Math.PI)}
            `;
    }
  } else if (arrowStart > arrowEnd) {
    path = `
            M ${ARROW_RADIUS * Math.sin(((arrowEnd * 30) / 180) * Math.PI)} ${
      -ARROW_RADIUS * Math.cos(((arrowEnd * 30) / 180) * Math.PI)
    }
        `;
    arrowPath = `
            M ${-1} ${-ARROW_RADIUS}
            l 8 -4
            l 0 8
            L ${-1} ${-ARROW_RADIUS}
            l 8 -4
        `;
    for (let i = 0; i <= arrowStart - arrowEnd; i++) {
      path += `
                A ${ARROW_RADIUS} ${ARROW_RADIUS}
                0 0 1
                ${ARROW_RADIUS * Math.sin((((arrowEnd + i) * 30) / 180) * Math.PI)}
                ${-ARROW_RADIUS * Math.cos((((arrowEnd + i) * 30) / 180) * Math.PI)}
            `;
    }
  }

  return (
    <div
      style={{
        width: '200px',
        minHeight: '200px',
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <div style={{ position: 'absolute', zIndex: '-1' }}>
        <Clock style={style} hr={hr} min={min} sec={sec} input={false} />
      </div>

      <svg width="200px" height="200px" viewBox="-100 -100 200 200">
        <path d={path} fill="none" stroke="red" />

        <g transform={`rotate(${arrowEnd * 30})`}>
          <path d={arrowPath} fill="red" />
        </g>
      </svg>
    </div>
  );
};

// \kaman_clock[style=1, hr=1, min=1, sec=1, arrowStart=1, arrowEnd=3]

export default Index;
