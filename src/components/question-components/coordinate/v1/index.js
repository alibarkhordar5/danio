import { useEffect, useState } from 'react';

export default function Coordinate(props) {
  const { showingAttrs, setUser_answer, answerToPut, children } = props;

  const {
    id,
    pieces = 10,
    grid_show = false,
    dash_show = false,
    number_show = false,
    shapes,
    input_type = 'none',
    line = 'none',
    dash_to = ['none'],
    displayNames,
  } = showingAttrs;

  const [state, setState] = useState([]);

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

  let li = [];
  let liText = [];
  const liList = [];
  const liCircle = [];
  const liShapes = [];
  const [uppertext, setUppertext] = useState([]);

  if (grid_show) {
    for (let i = 0; i < pieces + 1; i++) {
      li.push(
        <line
          x1={0}
          y1={(i * 100) / pieces}
          x2={100}
          y2={(i * 100) / pieces}
          stroke="black"
          strokeWidth={0.5}
          opacity={0.1}
        />
      );
      li.push(
        <line
          x1={(i * 100) / pieces}
          y1={0}
          x2={(i * 100) / pieces}
          y2={100}
          stroke="black"
          strokeWidth={0.5}
          opacity={0.1}
        />
      );
    }
  }

  li.push(
    <path
      d="
                M 0 0 L 100 0 M 97 1.5 L 100 0 L 97 -1.5 L 97 1.5 L 100 0
                M 0 0 L 0 100 M 1.5 97 L 0 100 L -1.5 97 L 1.5 97 L 0 100
            "
      fill="rgb(0,0,127)"
      stroke="rgb(0,0,127)"
      strokeLinecap="round"
      strokeWidth=".5"
    />
  );

  if (number_show) {
    for (let i = 1; i < pieces; i++) {
      li.push(<line x1={-1} y1={(i * 100) / pieces} x2={0} y2={(i * 100) / pieces} stroke="skyblue" />);
      liList.push(
        <text
          x={-3.5}
          y={(i * 100) / pieces + 100 / pieces / 2.5}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize=".2rem"
        >
          {pieces - i}
        </text>
      );
      li.push(<line x1={(i * 100) / pieces} y1={-1} x2={(i * 100) / pieces} y2={0} stroke="skyblue" />);
      liList.push(
        <text x={(i * 100) / pieces} y={107.5} textAnchor="middle" alignmentBaseline="middle" fontSize=".2rem">
          {i}
        </text>
      );
    }
  }

  if (dash_show) {
    for (let i = 0; i < shapes.length; i++) {
      for (let j = 2; j < shapes[i].length; j++) {
        li.push(
          <line
            x1={(shapes[i][j][0] * 100) / pieces}
            y1={(shapes[i][j][1] * 100) / pieces}
            x2={0}
            y2={(shapes[i][j][1] * 100) / pieces}
            stroke="red"
            strokeDasharray={`${100 / pieces / 4} ${100 / pieces / 4}`}
          />
        );
        li.push(
          <line
            x1={(shapes[i][j][0] * 100) / pieces}
            y1={(shapes[i][j][1] * 100) / pieces}
            x2={(shapes[i][j][0] * 100) / pieces}
            y2={0}
            stroke="red"
            strokeDasharray={`${100 / pieces / 4} ${100 / pieces / 4}`}
          />
        );
      }
    }
  }

  const [points, setPoints] = useState([]);
  const [index, setIndex] = useState(0);
  let addedItems = [];
  if (input_type !== 'none') {
    for (let i = 0; i < pieces + 1; i++) {
      for (let j = 0; j < pieces + 1; j++) {
        liCircle.push(
          <circle
            cx={(100 / pieces) * i}
            cy={(100 / pieces) * j}
            r={2.5}
            opacity={0.08}
            onClick={() => {
              if (state[state.length - 1]?.[0] != i || state[state.length - 1]?.[1] != j) {
                setState([...state, [i, j]]);
                addedItems = [];
                if (state.length === 0 || input_type === 'point') {
                  addedItems.push(<circle cx={(100 / pieces) * i} cy={(100 / pieces) * j} r={2.5} stroke="orange" />);
                  if (index < displayNames.length) {
                    setUppertext([
                      ...uppertext,
                      <text
                        x={(100 / pieces) * i}
                        y={103 - (100 / pieces) * j}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fontSize=".2rem"
                        fill="white"
                        fontWeight="bold"
                      >
                        {displayNames[index]}
                      </text>,
                    ]);
                  }
                  setIndex(index + 1);
                } else if (input_type === 'ngon' && state.length > 0) {
                  addedItems.push(
                    <line
                      x1={(state[state.length - 1]?.[0] * 100) / pieces}
                      y1={(state[state.length - 1]?.[1] * 100) / pieces}
                      x2={(100 / pieces) * i}
                      y2={(100 / pieces) * j}
                      stroke="orange"
                    />,
                    <circle cx={(100 / pieces) * i} cy={(100 / pieces) * j} r={2.5} stroke="orange" />
                  );
                  if (index < displayNames.length) {
                    setUppertext([
                      ...uppertext,
                      <text
                        x={(100 / pieces) * i}
                        y={103 - (100 / pieces) * j}
                        textAnchor="middle"
                        alignmentBaseline="middle"
                        fontSize=".2rem"
                        fill="white"
                        fontWeight="bold"
                      >
                        {displayNames[index]}
                      </text>,
                    ]);
                  }
                  setIndex(index + 1);
                }
                setPoints([...points, ...addedItems]);
              }
            }}
          />
        );
      }
    }
  }

  for (let i = 0; i < shapes.length; i++) {
    for (let j = 2; j < shapes[i].length; j++) {
      liText.push(
        <text
          x={(shapes[i][j][0] * 100) / pieces}
          y={103 - (shapes[i][j][1] * 100) / pieces}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize=".2rem"
          fill="white"
        >
          {shapes[i][j][2]}
        </text>
      );
      li.push(<circle cx={(shapes[i][j][0] * 100) / pieces} cy={(shapes[i][j][1] * 100) / pieces} r={2.5} />);
    }
    if (shapes[i][0] === 'point') {
      for (let j = 2; j < shapes[i].length; j++) {
        liShapes.push(
          <circle
            cx={(shapes[i][j][0] * 100) / pieces}
            cy={(shapes[i][j][1] * 100) / pieces}
            r={2.5}
            fill="rgb(17, 189, 212)"
          />
        );
      }
    } else if (shapes[i][0] === 'ngon') {
      let pathString = `M ${(shapes[i][2][0] * 100) / pieces} ${(shapes[i][2][1] * 100) / pieces} `;
      for (let j = 3; j < shapes[i].length; j++) {
        pathString += `L ${(shapes[i][j][0] * 100) / pieces} ${(shapes[i][j][1] * 100) / pieces}`;
      }
      liShapes.push(<path d={pathString} stroke="black" fill={shapes[i][1]} />);
      for (let j = 2; j < shapes[i].length; j++) {
        liShapes.push(<circle cx={(shapes[i][j][0] * 100) / pieces} cy={(shapes[i][j][1] * 100) / pieces} r={2.5} />);
      }
    }
  }

  const [buttonStyle, setButtonStyle] = useState({
    WebkitFilter: 'drop-shadow(.5px .5px .5px rgba(0, 0, 0, .75))',
    filter: 'drop-shadow(.5px .5px .5px rgba(0, 0, 0, .75))',
    fill: 'rgb(248, 199, 93)',
  });

  if (input_type != 'none') {
    liList.push(
      <g
        onClick={() => {
          if (state.length > 0) {
            setState(state.slice(0, state.length - 1));
            setPoints(points.slice(0, points.length - 2));
            console.log(points);
            if (index - 1 < displayNames.length) {
              setUppertext(uppertext.slice(0, uppertext.length - 1));
            }
            setIndex(index - 1);
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
        <rect x={40} y={115} width={20} height={10} style={buttonStyle} rx={0.75} ry={0.75} />
        <text x={50} y={120} textAnchor="middle" fontSize="2.5" fontWeight="bold" fontFamily="Vazirmatn">
          حذف آخرین نقطه
        </text>
      </g>
    );
  }
  if (line != 'none') {
    if (line.startsWith('x')) {
      li.push(
        <line
          x1={(Number(line.split('=')[1]) * 100) / pieces}
          y1={1}
          x2={(Number(line.split('=')[1]) * 100) / pieces}
          y2={99}
          stroke="red"
        />
      );
    } else {
      li.push(
        <line
          x1={0.5}
          y1={(Number(line.split('=')[1]) * 100) / pieces}
          x2={99.5}
          y2={(Number(line.split('=')[1]) * 100) / pieces}
          stroke="red"
        />
      );
    }
  }

  if (dash_to[0] != 'none') {
    for (let i = 0; i < shapes.length; i++) {
      for (let j = 2; j < shapes[i].length; j++) {
        li.push(
          <line
            x1={(shapes[i][j][0] * 100) / pieces}
            y1={(shapes[i][j][1] * 100) / pieces}
            x2={(dash_to[0] * 100) / pieces}
            y2={(dash_to[1] * 100) / pieces}
            stroke="red"
            strokeDasharray={`${100 / pieces / 4} ${100 / pieces / 4}`}
            strokeWidth="0.5"
          />
        );
      }
    }
  }

  useEffect(() => {
    if (state?.length > 0) {
      const newPoints = [
        <circle cx={(100 / pieces) * state[0][0]} cy={(100 / pieces) * state[0][1]} r={2.5} stroke="orange" />,
      ];
      for (let i = 1; i < state.length; i++) {
        if (i - 1 < displayNames.length) {
          newPoints.push(
            <text
              x={(100 / pieces) * state[i - 1][0]}
              y={(100 / pieces) * state[i - 1][1]}
              textAnchor="middle"
              alignmentBaseline="middle"
              fontSize=".2rem"
            >
              {displayNames[i - 1]}
            </text>
          );
        }
        if (input_type == 'ngon') {
          newPoints.push(
            <line
              x1={(state[i - 1][0] * 100) / pieces}
              y1={(state[i - 1][1] * 100) / pieces}
              x2={(100 / pieces) * state[i][0]}
              y2={(100 / pieces) * state[i][1]}
              stroke="orange"
            />,
            <circle cx={(100 / pieces) * state[i][0]} cy={(100 / pieces) * state[i][1]} r={2.5} stroke="orange" />
          );
        } else if (input_type == 'point') {
          newPoints.push(
            <circle cx={(100 / pieces) * state[i][0]} cy={(100 / pieces) * state[i][1]} r={2.5} stroke="orange" />
          );
        }
      }
      if (state.length - 1 < displayNames.length) {
        newPoints.push(
          <text
            x={(100 / pieces) * state[state.length - 1][0]}
            y={(100 / pieces) * state[state.length - 1][1]}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize=".2rem"
          >
            {displayNames[state.length - 1]}
          </text>
        );
      }
      setPoints(newPoints.slice());
    }
  }, [state]);

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
    <>
      {windowSize[0] > 500 ? (
        <svg width="60%" viewBox="-7 -7 117 137" fontFamily="NazaninF">
          <g transform="translate(0,103) scale(1,-1)">
            {li}
            {liShapes}
            {points}
            {liCircle}
          </g>
          <g>
            {liList}
            {liText}
            {uppertext}
          </g>
        </svg>
      ) : (
        <svg width="100%" viewBox="-7 -7 117 137" fontFamily="NazaninF">
          <g transform="translate(0,103) scale(1,-1)">
            {li}
            {liShapes}
            {points}
            {liCircle}
          </g>
          <g>
            {liList}
            {liText}
            {uppertext}
          </g>
        </svg>
      )}
    </>
  );
}

// \coordinate[id=akbar, grid_show=\true, number_show=\true, shapes=[["ngon" "red" [2 3 "الف"] [2 2 "ب"]  [3 2 "ج"] [4 4 "د"] [3 4 "ه"] [2 3 "الف"]]], dash_show=\true, input_type="ngon", line="x=2",dash_to=[2 2]]
