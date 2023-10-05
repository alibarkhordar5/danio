import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import ColorWrapper from 'src/components/question-modules/color-wrapper';

// command
// \\fraction_click[id=ans, denominator=[3 2], shape=rectMixed, max_numerator=6, colors=[green blue], hasPalette=\\true]
// \\fraction_click[id=ans, denominator=[3 2], shape=rectMixed, max_numerator=6, initialState=[blue red pink green yellow yellowgreen]]

const MultiColorMixed = ({
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
    size = 'md',
    click = 'normal',
    clickable = true,
}) => {
    // ---------------- constants -------------
    const numberOfRects = Math.ceil(max_numerator / (denominator[0] * denominator[1]));
    const HASHIYE = 5; //works as padding
    const ZEL = 50;
    const DIST = 10;
    const SVG_START_X = -HASHIYE;
    const SVG_START_Y = -HASHIYE;
    const SVG_WIDTH = HASHIYE * 2 + numberOfRects * (ZEL + DIST);
    const SVG_HEIGHT = HASHIYE * 2 + ZEL;

    const [state, setState] = useState({
        colors: new Array(numberOfRects)
            .fill(0)
            .map(() => new Array(denominator[1]).fill(0).map(() => new Array(denominator[0]).fill('rgba(0,0,0,0)'))),
        crosses: new Array(numberOfRects)
            .fill(false)
            .map(() => new Array(denominator[1]).fill(false).map(() => new Array(denominator[0]).fill(false))),
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

    for (let i = 0; i < numberOfRects; i++) {
        for (let j = 0; j < denominator[1]; j++) {
            for (let k = 0; k < denominator[0]; k++) {
                svgTags.push(
                    <path
                        d={`
                    M ${i * (ZEL + DIST) + (k / denominator[0]) * ZEL} ${(j / denominator[1]) * ZEL}
                    L ${i * (ZEL + DIST) + ((k + 1) / denominator[0]) * ZEL} ${(j / denominator[1]) * ZEL}
                    L ${i * (ZEL + DIST) + ((k + 1) / denominator[0]) * ZEL} ${((j + 1) / denominator[1]) * ZEL}
                    L ${i * (ZEL + DIST) + (k / denominator[0]) * ZEL} ${((j + 1) / denominator[1]) * ZEL}
                    L ${i * (ZEL + DIST) + (k / denominator[0]) * ZEL} ${(j / denominator[1]) * ZEL}
                    `}
                        stroke="black"
                        stroke-width="1"
                        fill={
                            initialState
                                ? initialState[i * denominator[0] * denominator[1] + j * denominator[0] + k]
                                : state.colors[i][j][k]
                        }
                    />,
                    <text
                        x={`${i * (ZEL + DIST) + ((k + 0.5) / denominator[0]) * ZEL}`}
                        y={`${((j + 0.5) / denominator[1]) * ZEL}`}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill={
                            initialCross
                                ? initialCross[i * (denominator[0] + denominator[1]) + j * denominator[1] + k]
                                    ? 'black'
                                    : 'none'
                                : state.crosses[i][j][k]
                                ? 'black'
                                : 'none'
                        }
                    >
                        X
                    </text>,
                    <path
                        d={`
                M ${i * (ZEL + DIST) + (k / denominator[0]) * ZEL} ${(j / denominator[1]) * ZEL}
                L ${i * (ZEL + DIST) + ((k + 1) / denominator[0]) * ZEL} ${(j / denominator[1]) * ZEL}
                L ${i * (ZEL + DIST) + ((k + 1) / denominator[0]) * ZEL} ${((j + 1) / denominator[1]) * ZEL}
                L ${i * (ZEL + DIST) + (k / denominator[0]) * ZEL} ${((j + 1) / denominator[1]) * ZEL}
                L ${i * (ZEL + DIST) + (k / denominator[0]) * ZEL} ${(j / denominator[1]) * ZEL}
                `}
                        stroke="black"
                        stroke-width="1"
                        fill="rgba(0,0,0,0)"
                        onClick={() => {
                            if (clickable) {
                                if (initialState) {
                                    return;
                                } else {
                                    if (cross) {
                                        setState((prev) => {
                                            const copy = prev.crosses.slice();
                                            copy[i][j] = [
                                                ...prev.crosses[i][j].slice(0, k),
                                                !prev.crosses[i][j][k],
                                                ...prev.crosses[i][j].slice(k + 1),
                                            ];
                                            return { ...prev, crosses: copy };
                                        });
                                    } else {
                                        click === 'partClick'
                                            ? setState((prev) => {
                                                  let copy = [],
                                                      rect = [],
                                                      row = [],
                                                      clickedIndex =
                                                          i * denominator[1] * denominator[0] + j * denominator[1] + k,
                                                      index = 0;
                                                  for (let i1 = 0; i1 < numberOfRects; i1++) {
                                                      rect = [];
                                                      for (let j1 = 0; j1 < denominator[1]; j1++) {
                                                          row = [];
                                                          for (let k1 = 0; k1 < denominator[0]; k1++) {
                                                              index =
                                                                  i1 * denominator[1] * denominator[0] +
                                                                  j1 * denominator[1] +
                                                                  k1;
                                                              row.push(
                                                                  index <= clickedIndex
                                                                      ? colors[selectedColor]
                                                                      : 'rgba(0,0,0,0)'
                                                              );
                                                          }
                                                          rect.push(row.slice());
                                                      }
                                                      copy.push(rect.slice());
                                                  }
                                                  return { ...prev, colors: copy };
                                              })
                                            : colors[selectedColor] === state.colors[i][j][k]
                                            ? setState((prev) => {
                                                  const copy = prev.colors.slice();
                                                  copy[i][j] = [
                                                      ...prev.colors[i][j].slice(0, k),
                                                      'rgba(0,0,0,0)',
                                                      ...prev.colors[i][j].slice(k + 1),
                                                  ];
                                                  return { ...prev, colors: copy };
                                              })
                                            : setState((prev) => {
                                                  const copy = prev.colors.slice();
                                                  copy[i][j] = [
                                                      ...prev.colors[i][j].slice(0, k),
                                                      colors[selectedColor],
                                                      ...prev.colors[i][j].slice(k + 1),
                                                  ];
                                                  return { ...prev, colors: copy };
                                              });
                                    }
                                }
                            } else {
                                return;
                            }
                        }}
                    />
                );
            }
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
                    <MultiColorMixed {...props} />
                </Box>
            ) : (
                <ColorWrapper cross={hasCross ? true : false} color={colors}>
                    <MultiColorMixed {...props} />
                </ColorWrapper>
            )}
        </>
    );
};

export default Index;
