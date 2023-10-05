import { Box } from '@mui/material';

const Index = ({ numerators, denominator, colors, max_numerator, state, setState }) => {
    // ---------------- constants -------------
    const HASHIYE = 5; //works as padding
    const CIRCLE_RADIUS = 100;
    const DIST = 5;
    const SVG_START_X = -HASHIYE;
    const SVG_START_Y = -HASHIYE;
    const SVG_WIDTH = HASHIYE + Math.ceil(max_numerator / denominator) * (CIRCLE_RADIUS + DIST) + HASHIYE;
    const SVG_HEIGHT = HASHIYE + CIRCLE_RADIUS + HASHIYE;
    // ---------------- constants -------------

    const svgTags = [];

    let index = 0,
        counter = 0,
        sum = numerators.reduce((a, b) => a + b, 0);
    for (let i = 0; i < Math.ceil(max_numerator / denominator); i++) {
        for (let j = 0; j < denominator && i * denominator + j < max_numerator; j++) {
            if (i * denominator + j < sum) {
                svgTags.push(
                    <path
                        d={`
                                    M ${CIRCLE_RADIUS / 2 + (CIRCLE_RADIUS + DIST) * i} ${CIRCLE_RADIUS / 2}
                                    l ${(CIRCLE_RADIUS / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                            (CIRCLE_RADIUS / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                        }
                                    l ${
                                        (CIRCLE_RADIUS / 2) *
                                        (Math.cos(((j + 1) * 2 * Math.PI) / denominator) -
                                            Math.cos((j * 2 * Math.PI) / denominator))
                                    } ${
                            (CIRCLE_RADIUS / 2) *
                            (Math.sin(((j + 1) * 2 * Math.PI) / denominator) -
                                Math.sin((j * 2 * Math.PI) / denominator))
                        }
                                    l ${(-CIRCLE_RADIUS / 2) * Math.cos(((j + 1) * 2 * Math.PI) / denominator)} ${
                            (-CIRCLE_RADIUS / 2) * Math.sin(((j + 1) * 2 * Math.PI) / denominator)
                        }
                                    l ${(CIRCLE_RADIUS / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                            (CIRCLE_RADIUS / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                        }
                                `}
                        stroke-width="0.5"
                        stroke="black"
                        fill={
                            index < numerators.length
                                ? counter < numerators[index]
                                    ? colors[index]
                                    : 'white'
                                : 'white'
                        }
                    />
                );
            } else {
                svgTags.push(
                    <path
                        d={`
                                    M ${CIRCLE_RADIUS / 2 + (CIRCLE_RADIUS + DIST) * i} ${CIRCLE_RADIUS / 2}
                                    l ${(CIRCLE_RADIUS / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                            (CIRCLE_RADIUS / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                        }
                                    l ${
                                        (CIRCLE_RADIUS / 2) *
                                        (Math.cos(((j + 1) * 2 * Math.PI) / denominator) -
                                            Math.cos((j * 2 * Math.PI) / denominator))
                                    } ${
                            (CIRCLE_RADIUS / 2) *
                            (Math.sin(((j + 1) * 2 * Math.PI) / denominator) -
                                Math.sin((j * 2 * Math.PI) / denominator))
                        }
                                    l ${(-CIRCLE_RADIUS / 2) * Math.cos(((j + 1) * 2 * Math.PI) / denominator)} ${
                            (-CIRCLE_RADIUS / 2) * Math.sin(((j + 1) * 2 * Math.PI) / denominator)
                        }
                                    l ${(CIRCLE_RADIUS / 2) * Math.cos((j * 2 * Math.PI) / denominator)} ${
                            (CIRCLE_RADIUS / 2) * Math.sin((j * 2 * Math.PI) / denominator)
                        }
                                `}
                        stroke="black"
                        stroke-width="0.5"
                        fill={i * denominator + j < state ? colors[0] : 'white'}
                        onClick={() => {
                            setState(i * denominator + j + 1);
                        }}
                    />
                );
            }
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
