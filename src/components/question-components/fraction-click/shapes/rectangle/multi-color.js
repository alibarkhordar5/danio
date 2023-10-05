import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ColorWrapper from 'src/components/question-modules/color-wrapper';

const MultiColorRectangle = ({ id, denominator, max_denominator, answerToPut, setUser_answer, colors, selectedColor }) => {
    // ---------------- constants -------------
    const HASHIYE = 5; //works as padding
    const RECTANGLE_WIDTH = 300;
    const DIST = 40;
    const RECTANGLE_HEIGHT = 300;
    const SVG_START_X = -HASHIYE;
    const SVG_START_Y = -HASHIYE;
    const SVG_WIDTH = HASHIYE * 2 + denominator  * RECTANGLE_WIDTH + denominator * DIST;
    const SVG_HEIGHT = HASHIYE * 2 + RECTANGLE_HEIGHT;
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
            <rect
                x={(i * RECTANGLE_WIDTH) + (i * DIST)}
                y="0"
                width={RECTANGLE_WIDTH}
                height={RECTANGLE_HEIGHT}
                stroke="black"
                stroke-width="5"
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
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    // `-4 0 ${(denominator + max_denominator) * 105} 80`
                    viewBox={`${SVG_START_X} ${SVG_START_Y} ${SVG_WIDTH} ${SVG_HEIGHT}`}
                >
                    {svgTags}
                </svg>
            </Box>
        </>
    );
};

const Index = (props) => {
    const { colors } = props;

    return (
        <ColorWrapper color={colors}>
            <MultiColorRectangle {...props} />
        </ColorWrapper>
    );
};

export default Index;
