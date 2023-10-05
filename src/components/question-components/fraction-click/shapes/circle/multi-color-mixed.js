import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ColorWrapper from 'src/components/question-modules/color-wrapper';

// command
// \\fraction_click[id=ans, denominator=7, shape=circleMixed, max_numerator=24, colors=[green], initialState=[green green green green green green green green green green green green green green green green green green green green green green green green]]

const MultiColorCircle = ({
    id,
    denominator,
    answerToPut,
    setUser_answer,
    colors,
    selectedColor,
    max_numerator,
    cross,
    initialState,
    initialCross,
    click = 'normal',
    size = 'md',
    clickable = true
}) => {
    const initialColor = initialState?.slice();
    // ---------------- constants -------------
    const numberOfCircles = Math.ceil(max_numerator / denominator);
    const HASHIYE = 5; //works as padding
    const CIRCLE_RADIUS = 60;
    const DIST = 15;
    const SVG_START_X = -HASHIYE;
    const SVG_START_Y = -HASHIYE;
    const SVG_WIDTH = HASHIYE + numberOfCircles * (2 * CIRCLE_RADIUS + DIST) + HASHIYE;
    const SVG_HEIGHT = HASHIYE + 2 * CIRCLE_RADIUS + HASHIYE;

    const [state, setState] = useState({
        colors: new Array(numberOfCircles).fill(0).map(() => new Array(denominator).fill('rgba(0,0,0,0)')),
        crosses: new Array(numberOfCircles).fill(0).map(() => new Array(denominator).fill(false)),
    });

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
                    stroke-width={denominator >= 10 ? '1' : '3'}
                    fill={initialColor ? initialColor[i * denominator + j] : state.colors[i][j]}
                />,
                <text
                    x={
                        (CIRCLE_RADIUS +
                            (2 * CIRCLE_RADIUS + DIST) * i +
                            CIRCLE_RADIUS * Math.cos((j * 2 * Math.PI) / denominator)) /
                            2 +
                        (CIRCLE_RADIUS +
                            (2 * CIRCLE_RADIUS + DIST) * i +
                            CIRCLE_RADIUS * Math.cos(((j + 1) * 2 * Math.PI) / denominator)) /
                            2
                    }
                    y={
                        (CIRCLE_RADIUS + CIRCLE_RADIUS * Math.sin((j * 2 * Math.PI) / denominator)) / 2 +
                        (CIRCLE_RADIUS + CIRCLE_RADIUS * Math.sin(((j + 1) * 2 * Math.PI) / denominator)) / 2
                    }
                    fill={
                        initialCross
                            ? initialCross[i * denominator + j]
                                ? 'black'
                                : 'none'
                            : state.crosses[i][j]
                            ? 'black'
                            : 'none'
                    }
                    textAnchor="middle"
                    dominantBaseline="middle"
                >
                    X
                </text>,
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
                    stroke-width={denominator >= 10 ? '1' : '3'}
                    fill="rgba(0,0,0,0)"
                    onClick={() => {
                        if (clickable) {
                        if (initialColor) {
                            return;
                        } else {
                            if (click === 'partClick') {
                                const handlePartClick = (index) => {
                                    if (index < i) {
                                        return new Array(denominator).fill(colors[selectedColor]);
                                    } else if (index === i) {
                                        return [
                                            ...new Array(j + 1).fill(colors[selectedColor]),
                                            ...new Array(denominator - (j + 1)).fill('rgba(0,0,0,0)'),
                                        ];
                                    } else if (index > i) {
                                        return new Array(denominator).fill('rgba(0,0,0,0)');
                                    }
                                };

                                setState((prev) => {
                                    const copy = new Array(numberOfCircles)
                                        .fill(0)
                                        .map((eachShape, index) => handlePartClick(index));

                                    return { crosses: prev.crosses, colors: copy };
                                });
                            } else {
                                if (cross) {
                                    setState((prev) => {
                                        const copy = prev.crosses.slice();
                                        copy[i] = [
                                            ...prev.crosses[i].slice(0, j),
                                            !prev.crosses[i][j],
                                            ...prev.crosses[i].slice(j + 1),
                                        ];
                                        return { ...prev, crosses: copy };
                                    });
                                } else {
                                    colors[selectedColor] === state.colors[i][j]
                                        ? setState((prev) => {
                                              const copy = prev.colors.slice();
                                              copy[i] = [
                                                  ...prev.colors[i].slice(0, j),
                                                  'rgba(0,0,0,0)',
                                                  ...prev.colors[i].slice(j + 1),
                                              ];
                                              return { crosses: prev.crosses, colors: copy };
                                          })
                                        : setState((prev) => {
                                              const copy = prev.colors.slice();
                                              copy[i] = [
                                                  ...prev.colors[i].slice(0, j),
                                                  colors[selectedColor],
                                                  ...prev.colors[i].slice(j + 1),
                                              ];
                                              return { crosses: prev.crosses, colors: copy };
                                          });
                                }
                            }
                        }
                    }
                    else {
                        return
                    }
                    }}
                />
            );
        }
    }

    const handleSize = (size) => {
        switch (size) {
            case 'sm':
                return '40%';
            case 'md':
                return '70%';
            case 'lg':
                return '100%';
            default:
                return '100%';
        }
    };

    return (
        <>
            <svg width={handleSize(size)} viewBox={`${SVG_START_X} ${SVG_START_Y} ${SVG_WIDTH} ${SVG_HEIGHT}`}>
                {svgTags}
            </svg>
        </>
    );
};

const Index = (props) => {
    const { colors, hasCross, initialState } = props;

    return (
        <>
            {initialState ? (
                <Box sx={{ m: 'auto', width: { xs: '100%', md: '60%' } }}>
                    <MultiColorCircle {...props} />
                </Box>
            ) : (
                <ColorWrapper cross={hasCross ? true : false} color={colors}>
                    <MultiColorCircle {...props} />
                </ColorWrapper>
            )}
        </>
    );
};

export default Index;
