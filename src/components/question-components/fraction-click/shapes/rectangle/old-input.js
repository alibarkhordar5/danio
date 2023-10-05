import { Box } from '@mui/material';

const Index = ({ numerator, denominator, color, max_denominator,state,setState }) => {
  // ---------------- constants -------------
  const HASHIYE = 5; //works as padding
  const RECTANGLE_WIDTH = 100;
  const RECTANGLE_HEIGHT = 80;
  const SVG_START_X = -HASHIYE;
  const SVG_START_Y = -HASHIYE;
  const SVG_WIDTH = HASHIYE + (denominator + max_denominator) * RECTANGLE_WIDTH + HASHIYE;
  const SVG_HEIGHT = HASHIYE + RECTANGLE_HEIGHT + HASHIYE;
  // ---------------- constants -------------

  const svgTags = [];

  for (let i = 0; i < denominator; i++) {
    svgTags.push(
      <rect
        x={i * RECTANGLE_WIDTH}
        y="0"
        width={RECTANGLE_WIDTH}
        height={RECTANGLE_HEIGHT}
        stroke="black"
        stroke-width="3"
        fill={i < state ? color : 'white'}
        onClick={()=>setState(i+1)}
      />
    );
  }

  for (let i = 0; i < max_denominator; i++) {
    svgTags.push(
      <rect
        x={(i + denominator) * RECTANGLE_WIDTH}
        y="0"
        width={RECTANGLE_WIDTH}
        height={RECTANGLE_HEIGHT}
        stroke="none"
        stroke-width="3"
        opacity={0}
        fill={'white'}
      />
    );
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50%"
          // `-4 0 ${(denominator + max_denominator) * 105} 80`
          viewBox={`${SVG_START_X} ${SVG_START_Y} ${SVG_WIDTH} ${SVG_HEIGHT}`}
        >
          {svgTags}
        </svg>
      </Box>
    </>
  );
};

export default Index;
