import { Box } from '@mui/material';

const Index = ({ numerators, max_numerator, denominator, colors }) => {
  // ---------------- constants -------------
  const HASHIYE = 5; //works as padding
  const CIRCLE_RADIUS = 60;
  const DIST = 5;
  const SVG_START_X = -HASHIYE;
  const SVG_START_Y = -HASHIYE;
  const SVG_WIDTH = HASHIYE + (2 * CIRCLE_RADIUS + DIST) * Math.ceil(max_numerator / denominator) + HASHIYE;
  const SVG_HEIGHT = HASHIYE + 2 * CIRCLE_RADIUS + HASHIYE;
  // ---------------- constants -------------

  const svgTags = [];

  let index = 0,
    counter = 0;
  for (let i = 0; i < Math.ceil(max_numerator / denominator); i++) {
    for (let j = 0; j < denominator && i * denominator + j < max_numerator; j++) {
      svgTags.push(
        <path
          d={`
            M ${CIRCLE_RADIUS + (2 * CIRCLE_RADIUS + DIST) * i} ${CIRCLE_RADIUS}
            l ${CIRCLE_RADIUS * Math.cos((j * 2 * Math.PI) / denominator)} ${
            CIRCLE_RADIUS * Math.sin((j * 2 * Math.PI) / denominator)
          }
            a ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 0 1 ${
            CIRCLE_RADIUS *
            (Math.cos(((j + 1) * 2 * Math.PI) / denominator) - Math.cos((j * 2 * Math.PI) / denominator))
          } ${
            CIRCLE_RADIUS *
            (Math.sin(((j + 1) * 2 * Math.PI) / denominator) - Math.sin((j * 2 * Math.PI) / denominator))
          }
            l ${-CIRCLE_RADIUS * Math.cos(((j + 1) * 2 * Math.PI) / denominator)} ${
            -CIRCLE_RADIUS * Math.sin(((j + 1) * 2 * Math.PI) / denominator)
          }
            l ${CIRCLE_RADIUS * Math.cos((j * 2 * Math.PI) / denominator)} ${
            CIRCLE_RADIUS * Math.sin((j * 2 * Math.PI) / denominator)
          }
          `}
          stroke-width="0.5"
          stroke="black"
          fill={index < numerators.length ? (counter < numerators[index] ? colors[index] : 'white') : 'white'}
        />
      );
      counter += 1;
      if (index < numerators.length && counter >= numerators[index]) {
        index += 1;
        counter = 0;
      }
    }
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
