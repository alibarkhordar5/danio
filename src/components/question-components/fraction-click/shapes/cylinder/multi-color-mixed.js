import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ColorWrapper from 'src/components/question-modules/color-wrapper';

const MultiColorMixedCylinder = ({
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
    clickable = true
}) => {
    const initialColor = initialState?.slice();
    const numberOfCylinders = Math.ceil(max_numerator / denominator);
    const RX = 30;
    const RY = 10;
    const HEIGHT = 20;
    const DIST = 10;
    const HASHIYE = 20;
    const SVG_START_X = -HASHIYE;
    const SVG_START_Y = -HASHIYE;
    const SVG_WIDTH = HASHIYE * 2 + numberOfCylinders * (RX * 2 + DIST);
    const SVG_HEIGHT = HASHIYE * 2 + HEIGHT * denominator;
    const svgTags = [];

    const [state, setState] = useState({
        colors: new Array(numberOfCylinders).fill(0).map(() => new Array(denominator).fill('rgba(0, 0, 0, 0)')),
        crosses: new Array(numberOfCylinders).fill(0).map(() => new Array(denominator).fill(false)),
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

    for (let i = 0; i < numberOfCylinders; i++) {
        for (let j = 0; j < denominator; j++) {
            if (j === 0) {
                svgTags.push(
                    <path
                        d={`
                                M ${i * (RX * 2 + DIST)} 0
                                A ${RX} ${RY} 0 0 1 ${i * (RX * 2 + DIST) + RX * 2} 0
                                M ${i * (RX * 2 + DIST)} 0
                                A ${RX} ${RY} 0 0 0 ${i * (RX * 2 + DIST) + RX * 2} 0
                                M ${i * (RX * 2 + DIST)} 0
                                L ${i * (RX * 2 + DIST)} ${HEIGHT}
                                A ${RX} ${RY} 0 0 0 ${i * (RX * 2 + DIST) + RX * 2} ${HEIGHT}
                                L ${i * (RX * 2 + DIST) + RX * 2} 0
                            `}
                        stroke="black"
                        fill={initialColor ? initialColor[i * denominator + j] : state.colors[i][j]}
                    />,
                    <text
                        x={`${i * (RX * 2 + DIST) + RX}`}
                        y={`${HEIGHT}`}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={
                            initialCross
                                ? initialCross[i * denominator + j]
                                    ? 'black'
                                    : 'none'
                                : state.crosses[i][j]
                                ? 'black'
                                : 'none'
                        }
                    >
                        X
                    </text>,
                    <path
                        d={`
                                M ${i * (RX * 2 + DIST)} 0
                                A ${RX} ${RY} 0 0 1 ${i * (RX * 2 + DIST) + RX * 2} 0
                                M ${i * (RX * 2 + DIST)} 0
                                A ${RX} ${RY} 0 0 0 ${i * (RX * 2 + DIST) + RX * 2} 0
                                M ${i * (RX * 2 + DIST)} 0
                                L ${i * (RX * 2 + DIST)} ${HEIGHT}
                                A ${RX} ${RY} 0 0 0 ${i * (RX * 2 + DIST) + RX * 2} ${HEIGHT}
                                L ${i * (RX * 2 + DIST) + RX * 2} 0
                            `}
                        stroke="black"
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
                                        const copy = new Array(numberOfCylinders)
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
                                                  return { ...prev, colors: copy };
                                              })
                                            : setState((prev) => {
                                                  const copy = prev.colors.slice();
                                                  copy[i] = [
                                                      ...prev.colors[i].slice(0, j),
                                                      colors[selectedColor],
                                                      ...prev.colors[i].slice(j + 1),
                                                  ];
                                                  return { ...prev, colors: copy };
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
            } else {
                svgTags.push(
                    <path
                        d={`
                                M ${i * (RX * 2 + DIST)} ${HEIGHT * j}
                                L ${i * (RX * 2 + DIST)} ${HEIGHT * (j + 1)}
                                A ${RX} ${RY} 0 0 0 ${i * (RX * 2 + DIST) + RX * 2} ${HEIGHT * (j + 1)}
                                L ${i * (RX * 2 + DIST) + RX * 2} ${HEIGHT * j}
                                A ${RX} ${RY} 0 0 1 ${i * (RX * 2 + DIST)} ${HEIGHT * j}
                            `}
                        stroke="black"
                        stroke-width="1"
                        fill={initialColor ? initialColor[i * denominator + j] : state.colors[i][j]}
                    />,
                    <text
                        x={`${i * (RX * 2 + DIST) + RX}`}
                        y={`${HEIGHT * (j + 1)}`}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={
                            initialCross
                                ? initialCross[i * denominator + j]
                                    ? 'black'
                                    : 'none'
                                : state.crosses[i][j]
                                ? 'black'
                                : 'none'
                        }
                    >
                        X
                    </text>,
                    <path
                        d={`
                                M ${i * (RX * 2 + DIST)} ${HEIGHT * j}
                                L ${i * (RX * 2 + DIST)} ${HEIGHT * (j + 1)}
                                A ${RX} ${RY} 0 0 0 ${i * (RX * 2 + DIST) + RX * 2} ${HEIGHT * (j + 1)}
                                L ${i * (RX * 2 + DIST) + RX * 2} ${HEIGHT * j}
                                A ${RX} ${RY} 0 0 1 ${i * (RX * 2 + DIST)} ${HEIGHT * j}
                            `}
                        stroke="black"
                        stroke-width="1"
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
                                            const copy = new Array(numberOfCylinders)
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
                                                      return { ...prev, colors: copy };
                                                  })
                                                : setState((prev) => {
                                                      const copy = prev.colors.slice();
                                                      copy[i] = [
                                                          ...prev.colors[i].slice(0, j),
                                                          colors[selectedColor],
                                                          ...prev.colors[i].slice(j + 1),
                                                      ];
                                                      return { ...prev, colors: copy };
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
    }

    return (
            <svg
                width={initialColor ? (numberOfCylinders === 1 ? '70%' : '100%') : '100%'}
                viewBox={`${SVG_START_X} ${SVG_START_Y} ${SVG_WIDTH} ${SVG_HEIGHT}`}
            >
                {svgTags}
            </svg>
    );
};

const Index = (props) => {
    const { colors, hasCross, initialState } = props;

    return (
        <>
            {initialState ? (
                <Box sx={{ m: 'auto', width: { xs: '100%', md: '60%' } }}>
                    <MultiColorMixedCylinder {...props} />
                </Box>
            ) : (
                <ColorWrapper cross={hasCross ? true : false} color={colors}>
                    <MultiColorMixedCylinder {...props} />
                </ColorWrapper>
            )}
        </>
    );
};

export default Index;
