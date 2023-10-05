const MixedNumberRect = ({ showingAttrs }) => {
    const { width, height } = showingAttrs
    const HASHIYEH = 10;
    const ONE_UNIT_LINE = 10;
    const SVG_START_X = -HASHIYEH;
    const SVG_START_Y = -HASHIYEH;
    const SVG_WIDTH = HASHIYEH * 2 + (width[0] + 1) * ONE_UNIT_LINE;
    const SVG_HEIGHT = HASHIYEH * 2 + (height[0] + 1) * ONE_UNIT_LINE;

    const svgTags = [];

    for (let i = 0; i < height[0]; i++) {
        svgTags.push(
            <path
                d={`
                M 0 ${i * ONE_UNIT_LINE} 
                L 0 ${(i + 1) * ONE_UNIT_LINE}
                L ${(width[0] + width[1] / width[2]) * ONE_UNIT_LINE} ${(i + 1) * ONE_UNIT_LINE}
                `}
                stroke-width=".3"
                stroke="black"
                fill="rgba(0,0,0,0)"
            />,
            <path
                stroke-width=".3"
                stroke="black"
                fill="rgba(0,0,0,0)"
                d={`
                M 0 ${height[0] * ONE_UNIT_LINE}
                L 0 ${(height[1] / height[2] + height[0]) * ONE_UNIT_LINE}
                L ${(width[1] / width[2] + width[0]) * ONE_UNIT_LINE} ${
                    (height[1] / height[2] + height[0]) * ONE_UNIT_LINE
                }
                `}
            />
        );
    }

    for (let i = 0; i < width[0]; i++) {
        svgTags.push(
            <path
                stroke-width=".3"
                stroke="black"
                fill="rgba(0,0,0,0)"
                d={`
                M ${i * ONE_UNIT_LINE} 0
                L ${(i + 1) * ONE_UNIT_LINE} 0
                L ${(i + 1) * ONE_UNIT_LINE} ${(height[1] / height[2] + height[0]) * ONE_UNIT_LINE}
                `}
            />,
            <path
                stroke-width=".3"
                stroke="black"
                fill="rgba(0,0,0,0)"
                d={`
                M ${width[0] * ONE_UNIT_LINE} 0
                L ${(width[0] + width[1] / width[2]) * ONE_UNIT_LINE} 0
                L ${(width[0] + width[1] / width[2]) * ONE_UNIT_LINE} ${
                    (height[0] + height[1] / height[2]) * ONE_UNIT_LINE
                }
                `}
            />
        );
    }

    for (let i = 0; i < height[0]; i++) {
        svgTags.push(
            <text
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize=".15rem"
                x={`${-(HASHIYEH / 2)}`}
                y={`${(i + 0.5) * ONE_UNIT_LINE}`}
            >
                1
            </text>,
            <text
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize=".15rem"
                x={`${-(HASHIYEH / 2)}`}
                y={`${(height[0] + height[1] / height[2] / 2) * ONE_UNIT_LINE - .5}`}
            >
                {height[1]}
            </text>,
            <path
                stroke-width=".2"
                stroke="black"
                fill="rgba(0,0,0,0)"
                d={`
                M ${-(HASHIYEH / 2) - 1} ${(height[0] + height[1] / height[2] / 2) * ONE_UNIT_LINE + .5}
                L ${-(HASHIYEH / 2) + 1} ${(height[0] + height[1] / height[2] / 2) * ONE_UNIT_LINE + .5}
                `}
            />,
            <text
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize=".15rem"
                x={`${-(HASHIYEH / 2)}`}
                y={`${(height[0] + height[1] / height[2] / 2) * ONE_UNIT_LINE + 2.5}`}
            >
                {height[2]}
            </text>
        );
    }

    for (let i = 0; i < width[0]; i++) {
        svgTags.push(
            <text
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize=".15rem"
                x={`${(i + 0.5) * ONE_UNIT_LINE}`}
                y={`${-(HASHIYEH / 2)}`}
            >
                1
            </text>,
            <text
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize=".15rem"
                y={`${-(HASHIYEH / 2) - .5}`}
                x={`${(width[0] + width[1] / width[2] / 2) * ONE_UNIT_LINE}`}
            >
                {width[1]}
            </text>,
            <path
                stroke-width=".2"
                stroke="black"
                fill="rgba(0,0,0,0)"
                d={`
                M ${((width[0] + width[1] / width[2] / 2) * ONE_UNIT_LINE) - 1} ${-(HASHIYEH / 2) + .8}
                L ${((width[0] + width[1] / width[2] / 2) * ONE_UNIT_LINE) + 1} ${-(HASHIYEH / 2) + .8}
                `}
            />,
            <text
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize=".15rem"
                y={`${-(HASHIYEH / 2) + 2.5}`}
                x={`${(width[0] + width[1] / width[2] / 2) * ONE_UNIT_LINE}`}
            >
                {width[2]}
            </text>
        );
    }

    return (
        <svg
            style={{ fontFamily: 'PersianNumber' }}
            width="50%"
            viewBox={`${SVG_START_X} ${SVG_START_Y} ${SVG_WIDTH} ${SVG_HEIGHT}`}
        >
            {svgTags}
        </svg>
    );
};

export default MixedNumberRect;
