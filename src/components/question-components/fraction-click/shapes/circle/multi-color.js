import { useState, useEffect } from 'react';
import ColorWrapper from 'src/components/question-modules/color-wrapper';

const MultiColorCircle = ({ id, denominator, answerToPut, setUser_answer, colors, selectedColor }) => {
    // ---------------- constants -------------
    const HASHIYE = 5; //works as padding
    const CIRCLE_RADIUS = 60;
    const DIST = 10;
    const SVG_START_X = -HASHIYE;
    const SVG_START_Y = -HASHIYE;
    const SVG_WIDTH = HASHIYE + denominator * 2 * CIRCLE_RADIUS + denominator * DIST + HASHIYE;
    const SVG_HEIGHT = HASHIYE + 2 * CIRCLE_RADIUS + HASHIYE;
    // ---------------- constants -------------

    const [state, setState] = useState(new Array(denominator).fill('rgba(0, 0, 0, 0)'));

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

    const svgTags = [];

    for (let i = 0; i < denominator; i++) {
        svgTags.push(
            <circle
                cx={(2 * i + 1) * CIRCLE_RADIUS + i * DIST}
                cy={CIRCLE_RADIUS}
                r={CIRCLE_RADIUS}
                stroke="black"
                stroke-width="3"
                fill={state[i]}
                onClick={() => {
                    colors[selectedColor] === state[i]
                        ? setState((prev) => [...prev.slice(0, i), 'rgba(0,0,0,0)', ...prev.slice(i + 1)])
                        : setState((prev) => [...prev.slice(0, i), colors[selectedColor], ...prev.slice(i + 1)]);
                }}
            />
        );
    }

    return (
        <svg width="100%" viewBox={`${SVG_START_X} ${SVG_START_Y} ${SVG_WIDTH} ${SVG_HEIGHT}`}>
            {svgTags}
        </svg>
    );
};

const Index = (props) => {
    const { colors } = props;

    return (
        <ColorWrapper color={colors}>
            <MultiColorCircle {...props} />
        </ColorWrapper>
    );
};

export default Index;
