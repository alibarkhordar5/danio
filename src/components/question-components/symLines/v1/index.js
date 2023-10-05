import { useEffect, useRef, useState } from 'react';

function getRandomColor() {
  // return `rgb(${50 + Math.random() * 156}, ${50 + Math.random() * 156}, ${50 + Math.random() * 156})`;
  return 'red';
}

/*
    محور تقارن شکل اصلی
    [5, 0, 5, 10]
    است.
    محور بعدی رو به همین فرم بدید.
    ترتیب دو نقطه هم مهمه.
    اگر جای دوتا رو عوض کنید شکل 180 درجه بیشتر میچرخه.
*/

function line2Theta(line) {
  if (line[0] === 5) {
    return 0;
  }
  return (Math.atan2(line[0] - 5, 5 - line[1]) / Math.PI) * 180;
}

export default function SymLines(props) {
  const { showingAttrs, setUser_answer, answerToPut, children } = props;

  const {
    id,
    height = 10,
    defaultAnswer,
    imageUrl = '/assets/question-images/component-images/symmetric/drawing.svg',
    mainSymLine = [5, 0, 5, 10],
  } = showingAttrs;

  console.log('showingAttrs', showingAttrs);

  const [state, setState] = useState();
  useEffect(() => {
    if (answerToPut && answerToPut[id]) {
      setState(answerToPut[id]);
    }
  }, [answerToPut]);

  useEffect(() => {
    if (!(answerToPut && answerToPut[id]) && setUser_answer) {
      setUser_answer(id, state);
    }
  }, [state]);
  const tags = [];

  const [opacities, setOpacities] = useState(
    new Array(height + 1).fill(0.3).map(() => new Array(height + 1).fill(0.3))
  );
  const currentColor = useRef(getRandomColor());
  const [colors, setColors] = useState(new Array(height + 1).fill(0).map(() => new Array(height + 1).fill('gray')));
  const [currentPoint, setCurrentPoint] = useState();
  const [lines, setLines] = useState([]);
  function setColorsWrapper(i, j, color) {
    const copy = colors.slice();
    copy[i][j] = { current: color };
    setColors(copy);
  }
  function setOpacitiesWrapper(i, j, opacity, finalizeColor = false) {
    const copy = opacities.slice();
    copy[i][j] = opacity;
    setOpacities(copy);
    if (finalizeColor) {
      setColorsWrapper(currentPoint[1], currentPoint[0], currentColor.current);
      setColorsWrapper(i, j, currentColor.current);
    }
  }
  for (let i = 0; i < height + 1; i++) {
    for (let j = 0; j < height + 1; j++) {
      if (0 < i && i < height && 0 < j && j < height) {
        continue;
      }
      tags.push(
        <circle
          cx={(j * 100) / height}
          cy={(i * 100) / height}
          r={2}
          fill={colors[i][j].current}
          opacity={opacities[i][j]}
          onClick={() => {
            if (
              currentPoint &&
              !(
                (currentPoint[1] === i && (i === 0 || i === height)) ||
                (currentPoint[0] === j && (j === 0 || j === height))
              )
            ) {
              setOpacitiesWrapper(i, j, 1, true);
              setLines(
                lines.concat(
                  <line
                    key={lines.length}
                    x1={(currentPoint[0] * 100) / height}
                    y1={(currentPoint[1] * 100) / height}
                    x2={(j * 100) / height}
                    y2={(i * 100) / height}
                    stroke={currentColor.current}
                    strokeWidth={0.5}
                    strokeDasharray="2 2"
                  />
                )
              );
              setState([...state, [...currentPoint, j, i]]);
              currentColor.current = getRandomColor();
              setCurrentPoint(null);
            } else if (!currentPoint) {
              let copy = colors.slice();
              copy[i][j] = currentColor;
              setColors(copy);
              setOpacitiesWrapper(i, j, 1);
              setCurrentPoint([j, i]);
            }
          }}
        />
      );
    }
  }

  const [buttonStyle, setButtonStyle] = useState({
    WebkitFilter: 'drop-shadow(.5px .5px .5px rgba(0, 0, 0, .75))',
    filter: 'drop-shadow(.5px .5px .5px rgba(0, 0, 0, .75))',
    fill: 'rgb(248, 199, 93)',
  });

  useEffect(() => {
    if (defaultAnswer) {
      setState(defaultAnswer.slice());
      setLines(
        defaultAnswer.map((line) => {
          currentColor.current = getRandomColor();
          return (
            <>
              <line
                x1={(line[0] * 100) / height}
                y1={(line[1] * 100) / height}
                x2={(line[2] * 100) / height}
                y2={(line[3] * 100) / height}
                stroke={currentColor.current}
                strokeWidth={0.5}
                strokeDasharray="2 2"
              />
              <circle cx={(line[0] * 100) / height} cy={(line[1] * 100) / height} r={2} fill={currentColor.current} />
              <circle cx={(line[2] * 100) / height} cy={(line[3] * 100) / height} r={2} fill={currentColor.current} />
            </>
          );
        })
      );
    }
  }, [JSON.stringify(defaultAnswer)]);

  useEffect(() => {
    if (state) {
      setLines(
        state.map((line) => {
          currentColor.current = getRandomColor();
          return (
            <>
              <line
                x1={(line[0] * 100) / height}
                y1={(line[1] * 100) / height}
                x2={(line[2] * 100) / height}
                y2={(line[3] * 100) / height}
                stroke={currentColor.current}
                strokeWidth={0.5}
                strokeDasharray="2 2"
              />
              <circle cx={(line[0] * 100) / height} cy={(line[1] * 100) / height} r={2} fill={currentColor.current} />
              <circle cx={(line[2] * 100) / height} cy={(line[3] * 100) / height} r={2} fill={currentColor.current} />
            </>
          );
        })
      );
    }
  }, [state]);

  return (
    <svg width="50%" viewBox={`-5 -5 110 ${defaultAnswer ? 110 : 130}`}>
      <foreignObject x={0} y={0} width={100} height={100} transform={`rotate(${line2Theta(mainSymLine)} 50 50)`}>
        <div style={{ minHeight: '100%', display: 'flex', justifyContent: 'center' }}>
          <img
            src={
              imageUrl
                ? `/assets/question-images/component-images${imageUrl.replace('/images', '')}`
                : '/assets/question-images/component-images/symmetric/drawing.svg'
            }
            width="70%"
            alt="test"
          />
        </div>
      </foreignObject>
      <path
        d={`
                    M 0 0
                    l 100 0
                    l 0 100
                    l -100 0
                    l 0 -100
                `}
        fill="none"
        stroke="gray"
        strokeWidth={0.5}
      />
      {lines}
      {tags}
      {defaultAnswer ? null : (
        <g
          onClick={() => {
            if (state.length > 0) {
              const points = state[state.length - 1];
              setOpacitiesWrapper(points[1], points[0], 0.3);
              setOpacitiesWrapper(points[3], points[2], 0.3);
              let copy = colors.slice();
              copy[points[1]][points[0]] = 'grey';
              copy[points[3]][points[2]] = 'grey';
              setColors(copy);
              setState(state.slice(0, state.length - 1));
              setLines(lines.slice(0, lines.length - 1));
            }
          }}
          cursor="pointer"
          onMouseEnter={() =>
            setButtonStyle({
              WebkitFilter: 'drop-shadow(.5px .5px 1px rgba(0, 0, 0, .75))',
              filter: 'drop-shadow(.5px .5px 1px rgba(0, 0, 0, .75))',
              fill: 'rgb(173, 139, 65)',
            })
          }
          onMouseLeave={() =>
            setButtonStyle({
              WebkitFilter: 'drop-shadow(.5px .5px .5px rgba(0, 0, 0, .75))',
              filter: 'drop-shadow(.5px .5px .5px rgba(0, 0, 0, .75))',
              fill: 'rgb(248, 199, 93)',
            })
          }
        >
          <rect x={45} y={110} width={20} height={10} style={buttonStyle} rx={0.75} ry={0.75} />
          <text x={55} y={115.5} textAnchor="middle" fontSize="2.5" fontWeight="bold">
            حذف آخرین خط
          </text>
        </g>
      )}
      {defaultAnswer ? <rect x="-5" y="-5" width="115" height="135" opacity="0" /> : null}
    </svg>
  );
}

// \sym_lines[id=akbar]
// \sym_lines[id=akbar, mainSymLine=[10 7 0 3]]
// \sym_lines[id=akbar, mainSymLine=[10 7 0 3], defaultAnswer=[[10 7 0 3]]]
