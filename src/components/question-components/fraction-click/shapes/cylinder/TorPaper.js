import { Box } from '@mui/system';

const TorPaper = ({ denominator }) => {
    // ---------------- constants -------------
    const RX = 30;
    const RY = 10;
    const HASHIYE = 15;
    const HEIGHT = 20;
    const DIST = 20;
    const SVG_START_X = -HASHIYE * 4;
    const SVG_START_Y = -HASHIYE * 4;
    const SVG_WIDTH = HASHIYE * 8 + denominator * (RX * 2 + DIST);
    const SVG_HEIGHT = HASHIYE * 8 + HEIGHT ;
    const PATH_HEIGHT = HEIGHT  + HASHIYE * 2;
    const PATH_WIDTH = denominator * (RX * 2 + DIST) + HASHIYE * 2;
    const TORS = 5;
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
