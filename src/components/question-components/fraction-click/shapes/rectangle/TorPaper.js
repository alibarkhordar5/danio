import { Box } from '@mui/system';

const TorPaper = ({ denominator }) => {
    // ---------------- constants -------------
    const HASHIYE = 15; //works as padding
    const RECTANGLE_WIDTH = 100;
    const RECTANGLE_HEIGHT = 100;
    const DIST = 20;
    const SVG_START_X = -HASHIYE * 4;
    const SVG_START_Y = -HASHIYE * 4;
    const SVG_WIDTH = HASHIYE * 8 + denominator * RECTANGLE_WIDTH + denominator * DIST;
    const SVG_HEIGHT = HASHIYE * 8 + RECTANGLE_HEIGHT;
    const PATH_HEIGHT = RECTANGLE_HEIGHT + HASHIYE * 2;
    const PATH_WIDTH = denominator * RECTANGLE_WIDTH + denominator * DIST + HASHIYE * 2;
    const TORS = 8
    const TORS_HEIGHT = (PATH_HEIGHT + HASHIYE * 2) / TORS;
    // ---------------- constants -------------

    const svgTags = [];

    svgTags.push(
        <path
            d={`
            M ${PATH_WIDTH} ${-HASHIYE * 2}
            L ${-HASHIYE * 2} ${-HASHIYE * 2}
            L ${-HASHIYE * 2} ${PATH_HEIGHT}
            L ${PATH_WIDTH} ${PATH_HEIGHT}
            `}
            fill="rgba(0,0,0,0)"
            stroke-width="2"
            stroke="green"
        />
    );

    for (let i = 0; i < denominator; i++) {
        svgTags.push(
            <rect
                x={i * RECTANGLE_WIDTH + i * DIST}
                y="0"
                width={RECTANGLE_WIDTH}
                height={RECTANGLE_HEIGHT}
                stroke="red"
                stroke-width="1"
                fill="red"
            />
        );
    }

    for (let i = 0; i < TORS; i++) {
        svgTags.push(
            <path
                d={`
                    M ${PATH_WIDTH} ${-HASHIYE * 2 + i * TORS_HEIGHT}
                    L ${PATH_WIDTH - 20} ${-HASHIYE * 2 + (i + 1) * TORS_HEIGHT - TORS_HEIGHT / 2}
                    L ${PATH_WIDTH} ${-HASHIYE * 2 + (i + 1) * TORS_HEIGHT}
                    `}
                stroke="green"
                stroke-width="2"
                fill="rgba(0,0,0,0)"
            />
        );
    }

    return (
        <Box sx={{m: "auto", width: {xs: "100%", md: "70%"} }}>
            <svg width="80%" viewBox={`${SVG_START_X} ${SVG_START_Y} ${SVG_WIDTH} ${SVG_HEIGHT}`}>
                {svgTags}
            </svg>
        </Box>
    );
};

export default TorPaper;
