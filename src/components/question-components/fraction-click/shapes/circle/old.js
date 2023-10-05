import { Box } from '@mui/material';

const Index = ({ numerator, denominator, color }) => {
    // ---------------- constants -------------
    const HASHIYE = 5; //works as padding
    const CIRCLE_RADIUS = 60;
    const DIST = 5;
    const SVG_START_X = -HASHIYE;
    const SVG_START_Y = -HASHIYE;
    const SVG_WIDTH = HASHIYE + denominator * 2 * CIRCLE_RADIUS + denominator * DIST + HASHIYE;
    const SVG_HEIGHT = HASHIYE + 2 * CIRCLE_RADIUS + HASHIYE;
    // ---------------- constants -------------

    const svgTags = [];

    for (let i = 0; i < denominator; i++) {
        svgTags.push(
            <circle
                cx={(2 * i + 1) * CIRCLE_RADIUS + i * HASHIYE}
                cy={CIRCLE_RADIUS}
                r={CIRCLE_RADIUS}
                stroke="black"
                stroke-width="3"
                fill={i < numerator ? color : 'white'}
            />
        );
    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50%"
                    viewBox={`${SVG_START_X} ${SVG_START_Y} ${SVG_WIDTH} ${SVG_HEIGHT}`}
                >
                    {svgTags}
                </svg>
            </Box>
        </>
    );
};

export default Index;
