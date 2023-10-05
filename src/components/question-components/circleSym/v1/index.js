import { useState, useEffect } from 'react';
import ColorWrapper from 'src/components/question-modules/color-wrapper';

const CircleSym = (props) => {
    // do not change this line at all !!!
    const { showingAttrs, setUser_answer, answerToPut, colors, selectedColor } = props;

    const { id, pieces = 5, pattern = ['white'], line = 0, isPoint = true } = showingAttrs;

    const [state, setState] = useState(new Array(pieces).fill('white'));
    //   const [state, setState] = useState(new Array(pieces).fill('').map((m) => new Array(2 * pieces).fill('white')));

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

    function toggleColor(i) {
        const copy = state.slice();
        copy[i] = copy[i] === colors[selectedColor] ? 'white' : colors[selectedColor];
        setState(copy);
    }
    for (let i = 0; i < pieces; i++) {
        tags.push(
            <g transform={`rotate(${(-i * 360) / pieces})`}>
                <path
                    d={`
                    M 0 0
                    L 100 0
                    a 100 100 0 0 0 ${-100 + Math.cos((2 * Math.PI) / pieces) * 100} ${
                        -Math.sin((2 * Math.PI) / pieces) * 100
                    }
                    L 0 0
                `}
                    stroke="gray"
                    fill={pattern[i] === 'white' ? state[i] : pattern[i]}
                    onClick={pattern[i] === 'white' ? () => toggleColor(i) : () => {}}
                />
            </g>
        );
    }

    const [buttonStyle, setButtonStyle] = useState({
        WebkitFilter: 'drop-shadow(.5px .5px .5px rgba(0, 0, 0, .75))',
        filter: 'drop-shadow(.5px .5px .5px rgba(0, 0, 0, .75))',
        fill: 'rgb(248, 199, 93)',
    });
    tags.push(
        <g
            onClick={() => {
                setState(new Array(pieces).fill('white'));
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
            <rect x={-20} y={110} width={40} height={20} style={buttonStyle} rx={0.75} ry={0.75} />
            <text x={0} y={120} textAnchor="middle" fontSize=".3rem" fontWeight="bold" alignmentBaseline="middle">
                پاک کردن همه
            </text>
        </g>
    );

    if (isPoint) {
        tags.push(<circle cx={0} cy={0} r={6} fill="gold" />);
    } else {
        tags.push(
            <g transform={`rotate(${(-line * 360) / pieces})`}>
                <line x1={100} y1={0} x2={-100} y2={0} stroke="black" strokeWidth={4} strokeDasharray="8 8" />
            </g>
        );
    }

    return (
        <svg width="100%" viewBox="-100 -100 240 240">
            {tags}
        </svg>
    );
};

const Index = (props) => {
    const { showingAttrs } = props;
    const { colors } = showingAttrs;
    return (
        <>
            <ColorWrapper color={colors && colors.length > 0 && colors}>
                <CircleSym {...props} />
            </ColorWrapper>
        </>
    );
};

export default Index;

// \circle_sym[id=akbar, colors=["red" "blue" "green"], pattern=["red" "blue" "white" "white" "white"], defaultAnswer=["white" "white" "white" "yellow" "yellow"]]
