import { useState, useEffect } from 'react';
import ColorWrapper from 'src/components/question-modules/color-wrapper';

const UnEqualCircle = ({ id, denominator, answerToPut, setUser_answer, colors, selectedColor, max_numerator }) => {
    // ---------------- constants -------------
    const numberOfCircles = Math.ceil(max_numerator / denominator);
    const HASHIYE = 5; //works as padding
    const CIRCLE_RADIUS = 60;
    const DIST = 15;
    const SVG_START_X = -HASHIYE;
    const SVG_START_Y = -HASHIYE;
    const SVG_WIDTH = HASHIYE + numberOfCircles * (2 * CIRCLE_RADIUS + DIST) + HASHIYE;
    const SVG_HEIGHT = HASHIYE + 2 * CIRCLE_RADIUS + HASHIYE;

    const [state, setState] = useState(
        new Array(numberOfCircles).fill(0).map(() => new Array(denominator).fill('rgba(0, 0, 0, 0)'))
    );

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

    for (let i = 0; i < numberOfCircles; i++) {
        for (let j = 0; j < denominator; j++) {
            svgTags.push(
                j === 0 ?
                <path
                    d={`
                M ${CIRCLE_RADIUS + (2 * CIRCLE_RADIUS + DIST) * i} ${CIRCLE_RADIUS}
                L ${
                    CIRCLE_RADIUS +
                    (2 * CIRCLE_RADIUS + DIST) * i +
                    CIRCLE_RADIUS * Math.cos((j * 2 * Math.PI) / denominator)
                } ${CIRCLE_RADIUS + CIRCLE_RADIUS * Math.sin((j * 2 * Math.PI) / denominator)}
                A ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 0 1 ${
                        CIRCLE_RADIUS +
                        (2 * CIRCLE_RADIUS + DIST) * i +
                        CIRCLE_RADIUS * Math.cos((((j + 1) * 2 * Math.PI) * 2) / denominator)
                    } ${CIRCLE_RADIUS + CIRCLE_RADIUS * Math.sin((((j + 1) * 2 * Math.PI) * 2) / denominator)}
                L ${CIRCLE_RADIUS + (2 * CIRCLE_RADIUS + DIST) * i} ${CIRCLE_RADIUS}
                `}
                    stroke="black"
                    stroke-width="3"
                    fill={state[i][j]}
                    onClick={() => {
                        colors[selectedColor] === state[i][j]
                            ? setState((prev) => {
                                  const copy = prev.slice();
                                  copy[i] = [...prev[i].slice(0, j), 'rgba(0,0,0,0)', ...prev[i].slice(j + 1)];
                                  return copy;
                              })
                            : setState((prev) => {
                                  const copy = prev.slice();
                                  copy[i] = [...prev[i].slice(0, j), colors[selectedColor], ...prev[i].slice(j + 1)];
                                  return copy;
                              });
                    }}
                />
                :
                j > 1 ?
                <path
                    d={`
                M ${CIRCLE_RADIUS + (2 * CIRCLE_RADIUS + DIST) * i} ${CIRCLE_RADIUS}
                L ${
                    CIRCLE_RADIUS +
                    (2 * CIRCLE_RADIUS + DIST) * i +
                    CIRCLE_RADIUS * Math.cos((j * 2 * Math.PI) / denominator)
                } ${CIRCLE_RADIUS + CIRCLE_RADIUS * Math.sin((j * 2 * Math.PI) / denominator)}
                A ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 0 1 ${
                        CIRCLE_RADIUS +
                        (2 * CIRCLE_RADIUS + DIST) * i +
                        CIRCLE_RADIUS * Math.cos(((j + 1) * 2 * Math.PI) / denominator)
                    } ${CIRCLE_RADIUS + CIRCLE_RADIUS * Math.sin(((j + 1) * 2 * Math.PI) / denominator)}
                L ${CIRCLE_RADIUS + (2 * CIRCLE_RADIUS + DIST) * i} ${CIRCLE_RADIUS}
                `}
                    stroke="black"
                    stroke-width="3"
                    fill={state[i][j]}
                    onClick={() => {
                        colors[selectedColor] === state[i][j]
                            ? setState((prev) => {
                                  const copy = prev.slice();
                                  copy[i] = [...prev[i].slice(0, j), 'rgba(0,0,0,0)', ...prev[i].slice(j + 1)];
                                  return copy;
                              })
                            : setState((prev) => {
                                  const copy = prev.slice();
                                  copy[i] = [...prev[i].slice(0, j), colors[selectedColor], ...prev[i].slice(j + 1)];
                                  return copy;
                              });
                    }}
                /> : null
            );
        }
    }

    return (
        <>
            <svg width="100%" viewBox={`${SVG_START_X} ${SVG_START_Y} ${SVG_WIDTH} ${SVG_HEIGHT}`}>
                {svgTags}
            </svg>
        </>
    );
};

const Index = (props) => {
    const { colors } = props;

    return (
        <ColorWrapper color={colors}>
            <UnEqualCircle {...props} />
        </ColorWrapper>
    );
};

export default Index;
