import { useEffect, useState } from 'react';
import ColorWrapper from 'src/components/question-modules/color-wrapper';

const ColorPointSym = (props) => {
    const { showingAttrs, answerToPut, setUser_answer, colors, selectedColor } = props;
    const { id, height, pattern } = showingAttrs;

    const [value, setValue] = useState(
        new Array(2 * height).fill('white').map(() => new Array(2 * height).fill('white'))
    );

    useEffect(() => {
        if (answerToPut && answerToPut[id]) {
            setValue(answerToPut[id]);
        }
    }, [answerToPut]);

    useEffect(() => {
        if (!(answerToPut && answerToPut[id]) && setUser_answer) {
            setUser_answer(id, value);
        }
    }, [value]);

    const tags = [];
    const table = [];

    function toggleColor(i, j) {
        const copy = value.slice();
        copy[i][j] = copy[i][j] === colors[selectedColor] ? 'white' : colors[selectedColor];
        setValue(copy);
    }
    for (let i = 0; i < 2 * height; i++) {
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
                    fill={pattern[i][j] === 'white' ? value[i][j] : pattern[i][j]}
                    strokeWidth={0.5}
                    onClick={pattern[i][j] === 'white' ? () => toggleColor(i, j) : () => {}}
                />
            );
        }
    }

    table.push(<circle cx={50} cy={50} r={3} fill="gold" />);

    tags.push(table);

    const [buttonStyle, setButtonStyle] = useState({
        WebkitFilter: 'drop-shadow(.5px .5px .5px rgba(0, 0, 0, .75))',
        filter: 'drop-shadow(.5px .5px .5px rgba(0, 0, 0, .75))',
        fill: 'rgb(248, 199, 93)',
    });
    tags.push(
        <g
            onClick={() => {
                setValue(new Array(2 * height).fill('white').map(() => new Array(2 * height).fill('white')));
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
    const { showingAttrs } = props;
    const { colors } = showingAttrs;
    return (
        <>
            <ColorWrapper color={colors && colors.length > 0 && colors}>
                <ColorPointSym {...props} />
            </ColorWrapper>
        </>
    );
};

// \color_point_sym[id=akbar, colors=["red" "blue" "green"], pattern=[["red" "green" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"]]]
// ,defaultAnswer=[["red" "green" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "white" "white"] ["white" "white" "white" "white" "white" "white" "white" "white" "green" "red"]]

export default Index;
