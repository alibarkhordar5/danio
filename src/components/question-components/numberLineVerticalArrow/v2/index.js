import { useEffect, useState } from 'react';
import useSvgDrag from 'src/hooks/use-svg-drag';
import { isMobile } from 'react-device-detect';

const SVG_ID = 'some_random_id';
const MEHVAR_LENGTH = 1000;
const VERTICAL_SECTION = isMobile ? 200 : 100;
const HASHIYE = 100;
const [ARROW_LENGTH, ARROW_SIDE] = [40, 20];
const RECT_WIDTH = 200;

//command
// \\number_line_vertical_arrow(2.1)[id=ans, tags=["0" [1 1 2] [2 2 5]], arrowPosition=0, getArrow=\\true]

const Index = (props) => {
    const { showingAttrs, answerToPut, setUser_answer, children } = props;
    const { id, tags, arrowPosition = 0.7, getArrow, roundTo = 0 } = showingAttrs;

    const [state, setState] = useState(arrowPosition);

    // in case getArrow is true, state should be set
    useEffect(() => {
        if (answerToPut && answerToPut[id]) {
            setState(answerToPut[id]);
        } else if (arrowPosition) {
            setState(arrowPosition);
        }
    }, [answerToPut, arrowPosition]);

    useEffect(() => {
        if (!(answerToPut && answerToPut[id]) && setUser_answer) {
            setUser_answer(id, state);
        }
    }, [state]);

    const svgTags = [];

    // mehvar
    svgTags.push(
        <path
            d={`
        M 0 ${(3 * VERTICAL_SECTION) / 2}
        l ${MEHVAR_LENGTH + HASHIYE} 0
        m ${-ARROW_LENGTH} ${-ARROW_SIDE}
        l ${ARROW_LENGTH} ${ARROW_SIDE}
        l ${-ARROW_LENGTH} ${ARROW_SIDE}
      `}
            fill="none"
            stroke="black"
        />
    );

    // degrees, texts and inputs
    const betweenDegrees = (0.95 * MEHVAR_LENGTH) / (tags.length - 1);
    let childIndex = 0;
    svgTags.push(
        new Array(tags.length)
            .fill(0)
            .map(() => new Array(2).fill(0))
            .map((m, index) => (
                <>
                    <line
                        x1={index * betweenDegrees}
                        y1={1.5 * VERTICAL_SECTION}
                        x2={index * betweenDegrees}
                        y2={1.7 * VERTICAL_SECTION}
                        stroke="black"
                    />
                    {tags[index] === '?' ? (
                        <foreignObject
                            x={index * betweenDegrees - RECT_WIDTH / 2}
                            y={2 * VERTICAL_SECTION}
                            width={RECT_WIDTH}
                            height={VERTICAL_SECTION}
                        >
                            {children[childIndex++]}
                        </foreignObject>
                    ) : (
                        <>
                            {Array.isArray(tags[index]) ? (
                                tags[index] === '' ? null : tags[index].length === 3 ? (
                                    <>
                                        <text
                                            x={index * betweenDegrees - 30}
                                            y={2 * VERTICAL_SECTION + 20}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fontSize="1.5rem"
                                            fontFamily="PersianNumber"
                                        >
                                            {tags[index][0]}
                                        </text>
                                        <text
                                            x={index * betweenDegrees}
                                            y={2 * VERTICAL_SECTION}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fontSize="1.5rem"
                                            fontFamily="PersianNumber"
                                        >
                                            {tags[index][1]}
                                        </text>
                                        <line
                                            x1={index * betweenDegrees - 15}
                                            y1={2.2 * VERTICAL_SECTION}
                                            x2={index * betweenDegrees + 15}
                                            y2={2.2 * VERTICAL_SECTION}
                                            stroke="black"
                                        />
                                        <text
                                            x={index * betweenDegrees}
                                            y={2.4 * VERTICAL_SECTION}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fontSize="1.5rem"
                                            fontFamily="PersianNumber"
                                        >
                                            {tags[index][2]}
                                        </text>
                                    </>
                                ) : (
                                    <>
                                        <text
                                            x={index * betweenDegrees}
                                            y={2 * VERTICAL_SECTION}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fontSize="1.5rem"
                                            fontFamily="PersianNumber"
                                        >
                                            {tags[index][0]}
                                        </text>
                                        <line
                                            x1={index * betweenDegrees - 15}
                                            y1={2.2 * VERTICAL_SECTION}
                                            x2={index * betweenDegrees + 15}
                                            y2={2.2 * VERTICAL_SECTION}
                                            stroke="black"
                                        />
                                        <text
                                            x={index * betweenDegrees}
                                            y={2.4 * VERTICAL_SECTION}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fontSize="1.5rem"
                                            fontFamily="PersianNumber"
                                        >
                                            {tags[index][1]}
                                        </text>
                                    </>
                                )
                            ) : (
                                <text
                                    x={index * betweenDegrees}
                                    y={2 * VERTICAL_SECTION}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fontSize="1.5rem"
                                    fontFamily="PersianNumber"
                                >
                                    {tags[index]}
                                </text>
                            )}
                        </>
                    )}
                </>
            ))
    );

    // arrow and its drag & drop functionality
    const doAfterMove = (point) => {
        const { x } = point;

        if (0 <= x && x <= 0.95 * MEHVAR_LENGTH) {
            setState((x / betweenDegrees).toFixed(2));
        }
    };
    const doAfterUp = (point) => {
        const { x } = point;

        if (0 <= x && x <= 0.95 * MEHVAR_LENGTH) {
            setState((x / betweenDegrees).toFixed((!roundTo && roundTo === 0) || roundTo ? parseInt(roundTo) : 2));
        }
    };
    const { startMouseDrag, startTouchDrag } = useSvgDrag(SVG_ID, doAfterMove, doAfterUp);
    svgTags.push(
        <g>
            {getArrow && (
                <g
                    onMouseDown={getArrow ? startMouseDrag : () => {}}
                    onTouchStart={getArrow ? startTouchDrag : () => {}}
                >
                    <rect
                        y={isMobile ? -90 : -40}
                        x={isMobile ? state * betweenDegrees - 35 : state * betweenDegrees - 15}
                        width={isMobile ? 70 : 30}
                        height={isMobile ? 70 : 30}
                        fill="lightblue"
                    />
                    <circle cx={state * betweenDegrees} cy={isMobile ? -55 : -25} r={isMobile ? 10 : 3} fill="white" />
                </g>
            )}
            <path
                d={`
          M ${state * betweenDegrees} ${0}
          l ${0} ${VERTICAL_SECTION}
          m ${-ARROW_SIDE} ${-ARROW_LENGTH}
          l ${ARROW_SIDE} ${ARROW_LENGTH}
          l ${ARROW_SIDE} ${-ARROW_LENGTH}
        `}
                fill="none"
                stroke="red"
                stroke-width={isMobile ? '5' : '1'}
            />
        </g>
    );

    return (
        <svg
            style={{ paddingLeft: isMobile ? '10px' : 0 }}
            id={SVG_ID}
            width={isMobile ? '110%' : '100%'}
            viewBox={`
        ${-HASHIYE}
        ${isMobile ? -HASHIYE * 2 : -HASHIYE * 2}
        ${HASHIYE + MEHVAR_LENGTH + 2 * HASHIYE}
        ${HASHIYE + 3 * VERTICAL_SECTION + HASHIYE}
      `}
        >
            {svgTags}
        </svg>
    );
};

export default Index;
