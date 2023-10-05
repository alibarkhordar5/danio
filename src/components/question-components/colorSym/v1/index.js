import { useEffect, useState } from 'react';
import ColorWrapper from 'src/components/question-modules/color-wrapper';

const ColorSym = (props) => {
  const { showingAttrs, setUser_answer, answerToPut, colors, selectedColor } = props;

  const { id, height = 5, pattern, verticalLine = false } = showingAttrs;

  const [state, setState] = useState(new Array(height).fill('').map((m) => new Array(2 * height).fill('white')));

  useEffect(() => {
    if (answerToPut && answerToPut[id]) {
      setState(answerToPut[id].slice());
    }
  }, [answerToPut]);

  useEffect(() => {
    if (!(answerToPut && answerToPut[id]) && setUser_answer) {
      setUser_answer(id, state);
    }
  }, [state]);

  const tags = [];
  const table = [];

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < 2 * height; j++) {
      table.push(
        <path
          d={`
                    M ${(j * 100) / height / 2} ${(i * 100) / height / 2}
                    l ${100 / height / 2} 0
                    l 0 ${100 / height / 2}
                    l ${-100 / height / 2} 0
                    l 0 ${-100 / height / 2}
                `}
          stroke="gray"
          fill={pattern[i][j]}
          strokeWidth={0.5}
        />
      );
    }
  }

  function toggleColor(i, j) {
    const copy = state.slice();
    copy[i][j] = copy[i][j] === colors[selectedColor] ? 'white' : colors[selectedColor];
    setState(copy);
  }


  for (let i = 0; i < height; i++) {
    for (let j = 0; j < 2 * height; j++) {
      table.push(
        <path
          d={`
                    M ${(j * 100) / height / 2} ${50 + (i * 100) / height / 2}
                    l ${100 / height / 2} 0
                    l 0 ${100 / height / 2}
                    l ${-100 / height / 2} 0
                    l 0 ${-100 / height / 2}
                `}
          stroke="gray"
          fill={state[i][j]}
          strokeWidth={0.5}
          onClick={() => toggleColor(i, j)}
        />
      );
    }
  }

  table.push(<line x1={0} y1={50} x2={100} y2={50} stroke="black" strokeDasharray="2 2" />);

  if (verticalLine) {
    tags.push(<g transform="rotate(-90 50 50)">{table}</g>);
  } else {
    tags.push(table);
  }

  const [buttonStyle, setButtonStyle] = useState({
    WebkitFilter: 'drop-shadow(.5px .5px .5px rgba(0, 0, 0, .75))',
    filter: 'drop-shadow(.5px .5px .5px rgba(0, 0, 0, .75))',
    fill: 'rgb(248, 199, 93)',
  });
  tags.push(
    <g
      onClick={() => {
        setState(new Array(height).fill('white').map(() => new Array(2 * height).fill('white')));
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
      <rect x={40} y={105} width={20} height={10} style={buttonStyle} rx={0.75} ry={0.75} />
      <text x={50} y={110} textAnchor="middle" fontSize=".15rem" fontWeight="bold" alignmentBaseline="middle">
        پاک کردن همه
      </text>
    </g>
  );

  return (
    <svg width="100%" viewBox="0 0 120 120">
      {tags}
    </svg>
  );
};

const Index = (props) => {
  const { showingAttrs } = props
  const { colors } = showingAttrs
  return (
    <>
      <ColorWrapper color={colors && colors.length > 0 && colors}>
        <ColorSym {...props} />
      </ColorWrapper>
    </>
  );
};

export default Index;

// \color_sym[id=akbar, colors=["red" "blue" "yellow"], pattern=[["green" "red" "green" "red" "green" "red" "green" "red" "green" "red"] ["white" "white" "white" "white" "white" "blue" "white" "white" "white" "white"] ["white" "white" "white" "white" "blue" "red" "blue" "white" "white" "white"] ["white" "white" "white" "blue" "green" "red" "green" "blue" "white" "white"] ["white" "white" "blue" "green" "green" "red" "green" "green" "blue" "white"]]]
// ,defaultAnswer=[["green" "red" "green" "red" "green" "red" "green" "red" "green" "red"] ["white" "white" "white" "white" "white" "blue" "white" "white" "white" "white"] ["white" "white" "white" "white" "blue" "red" "blue" "white" "white" "white"] ["white" "white" "white" "blue" "green" "red" "green" "blue" "white" "white"] ["white" "white" "blue" "green" "green" "red" "green" "green" "blue" "white"]]
