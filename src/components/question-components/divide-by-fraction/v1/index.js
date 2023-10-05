// @mui
import { useTheme, alpha } from '@mui/material';
import { Box } from '@mui/material';

const WIDTH = 100,
    HEIGHT = 10,
    HASHIYE = 5,
    SVG_START_X = -HASHIYE,
    SVG_START_Y = -HASHIYE,
    SVG_WIDTH = 2 * HASHIYE + WIDTH,
    SVG_HEIHGT = 2 * HASHIYE + HEIGHT;

export default function DivideByFraction(props) {
    const theme = useTheme();

    const { showingAttrs } = props;
    const { number, fraction } = showingAttrs;

    const svgTags = [];

    // pieces of the ruler
    const pieceWidth = WIDTH / number;
    for (let i = 0; i < number; i++) {
        svgTags.push(
            <path
                d={`
									M ${i * pieceWidth} 0
									L ${(i + 1) * pieceWidth} 0
									L ${(i + 1) * pieceWidth} ${HEIGHT}
									L ${i * pieceWidth} ${HEIGHT}
									L ${i * pieceWidth} 0
									L ${(i + 1) * pieceWidth} 0
							`}
                stroke={theme.palette.primary.light}
                fill={alpha(theme.palette.primary.light, 0.5)}
            />,
            <text
                x={(i + 1) * pieceWidth}
                y={HEIGHT + HASHIYE / 2}
                fontSize=".2rem"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {i + 1}
            </text>
        );
    }

    // khat-chins
    const khatChinWidth = pieceWidth / fraction[1];
    for (let i = 0; i < fraction[1] - 1; i++) {
        svgTags.push(
            <line
                x1={(i + 1) * khatChinWidth}
                y1={-HASHIYE / 2}
                x2={(i + 1) * khatChinWidth}
                y2={HEIGHT + HASHIYE / 2}
                stroke={theme.palette.primary.dark}
                strokeDasharray="2 1"
                strokeWidth=".5"
            />
        );
    }

    // fraction text
    svgTags.push(
        <text
            x={khatChinWidth / 2}
            y={-(3 * HASHIYE) / 4}
            fontSize=".15rem"
            textAnchor="middle"
            dominantBaseline="middle"
        >
            {fraction[0]}
        </text>,
        <line
            x1={khatChinWidth / 4}
            y1={-HASHIYE / 2}
            x2={(3 * khatChinWidth) / 4}
            y2={-HASHIYE / 2}
            stroke="black"
            strokeWidth=".1"
        />,
        <text x={khatChinWidth / 2} y={-HASHIYE / 4} fontSize=".15rem" textAnchor="middle" dominantBaseline="middle">
            {fraction[1]}
        </text>
    );

    return (
        <Box display="flex" justifyContent="center">
            <svg
                width="60%"
                fontFamily="PersianNumber"
                viewBox={`${SVG_START_X} ${SVG_START_Y} ${SVG_WIDTH} ${SVG_HEIHGT}`}
            >
                {svgTags}
            </svg>
        </Box>
    );
}
