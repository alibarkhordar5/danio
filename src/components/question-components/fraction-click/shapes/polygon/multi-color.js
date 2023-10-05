import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ColorWrapper from 'src/components/question-modules/color-wrapper';

// command
// \\fraction_click[id=ans, denominator=10, shape=polygon, colors=[green blue], hasPalette=\\true]

const MultiColorCircle = ({
    id,
    denominator,
    answerToPut,
    setUser_answer,
    colors,
    selectedColor,
    size = 'md',
    initialState,
    click = "normal",
}) => {
    // ---------------- constants -------------
    const initialColor = initialState?.slice();
    const SPACE = 90;
    const FIRST_POINT1 = 60;
    const FIRST_POINT2 = 0;
    const FIRST_POINT3 = 120;
    const SVG_WIDTH = (denominator / 2) * 400;

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
            i % 2 === 0 ? (
                <polygon
                    points={`
                ${i * SPACE + FIRST_POINT1},10
                ${i * SPACE + FIRST_POINT2},110
                ${i * SPACE + FIRST_POINT3},110`}
                    stroke="black"
                    stroke-width="2"
                    fill={initialColor ? initialColor[i] : state[i]}
                    onClick={() => {
                        if (initialColor) {
                            return;
                        } else {
                            if (click === 'partClick') {
                                const handlePartClick = (index) => {
                                    if (index <= i) {
                                        return colors[selectedColor]
                                    }
                                    else if (index > i) {
                                        return 'rgba(0,0,0,0)'
                                    }
                                }
                                setState((prev) => [...new Array(denominator).fill(0).map((eachShape, index) => (
                                    handlePartClick(index)
                                ))])
                            }
                            else {
                                colors[selectedColor] === state[i]
                                ? setState((prev) => [...prev.slice(0, i), 'rgba(0,0,0,0)', ...prev.slice(i + 1)])
                                : setState((prev) => [
                                      ...prev.slice(0, i),
                                      colors[selectedColor],
                                      ...prev.slice(i + 1),
                                  ]);
                            }
                        }
                    }}
                />
            ) : (
                <polygon
                    points={`
                ${i * SPACE + FIRST_POINT1},110 
                ${i * SPACE + FIRST_POINT2},10 
                ${i * SPACE + FIRST_POINT3},10`}
                    stroke="black"
                    stroke-width="2"
                    fill={initialColor ? initialColor[i] : state[i]}
                    onClick={() => {
                        if (initialColor) {
                            return;
                        } else {
                            if (click === 'partClick') {
                                const handlePartClick = (index) => {
                                    if (index <= i) {
                                        return colors[selectedColor]
                                    }
                                    else if (index > i) {
                                        return 'rgba(0,0,0,0)'
                                    }
                                }
                                setState((prev) => [...new Array(denominator).fill(0).map((eachShape, index) => (
                                    handlePartClick(index)
                                ))])
                            }
                            else {
                                colors[selectedColor] === state[i]
                                ? setState((prev) => [...prev.slice(0, i), 'rgba(0,0,0,0)', ...prev.slice(i + 1)])
                                : setState((prev) => [
                                      ...prev.slice(0, i),
                                      colors[selectedColor],
                                      ...prev.slice(i + 1),
                                  ]);
                            }
                        }
                    }}
                />
            )
        );
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
            <Box sx={{ textAlign: 'center', mt: 3 }}>
                <svg width={handleSize(size)} viewBox={`0 0 ${SVG_WIDTH / 2} 130`} xmlns="http://www.w3.org/2000/svg">
                    {svgTags}
                </svg>
            </Box>
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
