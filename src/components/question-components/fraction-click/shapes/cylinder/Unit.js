import { useState, useEffect } from 'react';
import ColorWrapper from 'src/components/question-modules/color-wrapper';

const UnitCylinder = ({
    id,
    denominator,
    answerToPut,
    setUser_answer,
    colors,
    selectedColor,
    max_numerator,
}) => {
    const numberOfCylinders = Math.ceil(max_numerator / denominator) + 1;
    const RX = 30;
    const RY = 10;
    const HEIGHT = 20;
    const DIST = 30;
    const HASHIYE = 20;
    const SVG_START_X = -HASHIYE;
    const SVG_START_Y = -HASHIYE;
    const SVG_WIDTH = HASHIYE * 2 + numberOfCylinders * (RX * 2 + DIST);
    const SVG_HEIGHT = HASHIYE * 2 + HEIGHT * denominator;
    const svgTags = [];

    const [state, setState] = useState(
        new Array(numberOfCylinders).fill(0).map(() => new Array(denominator).fill('rgba(0, 0, 0, 0)'))
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


    for (let i = 0; i < numberOfCylinders; i++) {
        for (let j = 0; j < denominator; j++) {
            svgTags.push(
                i === 0 ?
                j === 0 ? (
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
                        
                    />
                ) : (
                    <path
                        d={`
                            M ${i * (RX * 2 + DIST)} ${HEIGHT * j}
                            L ${i * (RX * 2 + DIST)} ${HEIGHT * (j + 1)}
                            A ${RX} ${RY} 0 0 0 ${i * (RX * 2 + DIST) + RX * 2} ${HEIGHT * (j + 1)}
                            L ${i * (RX * 2 + DIST) + RX * 2} ${HEIGHT * j}
                            A ${RX} ${RY} 0 0 1 ${i * (RX * 2 + DIST)} ${HEIGHT * j}
                        `}
                        stroke="black"
                        fill="rgba(0,0,0,0)"
                        
                    />
                )
                :
                j === 0 ? (
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
                                      copy[i] = [
                                          ...prev[i].slice(0, j),
                                          colors[selectedColor],
                                          ...prev[i].slice(j + 1),
                                      ];
                                      return copy;
                                  });
                        }}
                    />
                ) : (
                    <path
                        d={`
                            M ${i * (RX * 2 + DIST)} ${HEIGHT * j}
                            L ${i * (RX * 2 + DIST)} ${HEIGHT * (j + 1)}
                            A ${RX} ${RY} 0 0 0 ${i * (RX * 2 + DIST) + RX * 2} ${HEIGHT * (j + 1)}
                            L ${i * (RX * 2 + DIST) + RX * 2} ${HEIGHT * j}
                            A ${RX} ${RY} 0 0 1 ${i * (RX * 2 + DIST)} ${HEIGHT * j}
                        `}
                        stroke="black"
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
                                      copy[i] = [
                                          ...prev[i].slice(0, j),
                                          colors[selectedColor],
                                          ...prev[i].slice(j + 1),
                                      ];
                                      return copy;
                                  });
                        }}
                    />
                )
            );
        }
    }

    svgTags.push(
        <line
            x1={`${(RX * 2 + DIST/2)}`}
            y1={`${-HASHIYE}`}
            x2={`${(RX * 2 + DIST/2)}`}
            y2={`${SVG_HEIGHT}`}
            stroke="red"
            stroke-width="2"
            stroke-dasharray="4"
        />
    );

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
            <UnitCylinder {...props} />
        </ColorWrapper>
    );
};

export default Index;
