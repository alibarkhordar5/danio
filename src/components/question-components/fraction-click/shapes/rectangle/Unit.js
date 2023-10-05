import { useState, useEffect } from 'react';
import ColorWrapper from 'src/components/question-modules/color-wrapper';

const UnitRect = ({ id, denominator, answerToPut, setUser_answer, colors, selectedColor, max_numerator }) => {
    // ---------------- constants -------------
    const numberOfRects = Math.ceil(max_numerator / (denominator[0] * denominator[1])) + 1;
    const HASHIYE = 5; //works as padding
    const ZEL = 50;
    const DIST = 10;
    const SVG_START_X = -HASHIYE;
    const SVG_START_Y = -HASHIYE;
    const SVG_WIDTH = HASHIYE * 2 + numberOfRects * (ZEL + DIST);
    const SVG_HEIGHT = HASHIYE * 2 + ZEL;

    const [state, setState] = useState(
        new Array(numberOfRects)
            .fill(0)
            .map(() => new Array(denominator[1]).fill(0).map(() => new Array(denominator[0]).fill('rgba(0,0,0,0)')))
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

    for (let i = 0; i < numberOfRects; i++) {
        for (let j = 0; j < denominator[1]; j++) {
            for (let k = 0; k < denominator[0]; k++) {
                svgTags.push(
                    i === 0 ?
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
                    />
                    :
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
                        fill={state[i][j][k]}
                        onClick={() => {
                            colors[selectedColor] === state[i][j][k]
                                ? setState((prev) => {
                                      const copy = prev.slice();
                                      copy[i][j] = [
                                          ...prev[i][j].slice(0, k),
                                          'rgba(0,0,0,0)',
                                          ...prev[i][j].slice(k + 1),
                                      ];
                                      return copy;
                                  })
                                : setState((prev) => {
                                      const copy = prev.slice();
                                      copy[i][j] = [
                                          ...prev[i][j].slice(0, k),
                                          colors[selectedColor],
                                          ...prev[i][j].slice(k + 1),
                                      ];
                                      return copy;
                                  });
                        }}
                    />
                );
            }
        }
    }

    svgTags.push(
        <line
            x1={`${(ZEL + DIST/2)}`}
            y1={`${-HASHIYE}`}
            x2={`${(ZEL + DIST/2)}`}
            y2={`${denominator[0] * ZEL}`}
            stroke="red"
            stroke-width="1"
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
            <UnitRect {...props} />
        </ColorWrapper>
    );
};

export default Index;
