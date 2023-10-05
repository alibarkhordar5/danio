import { useState, useEffect } from 'react';
import useInnerWidth from 'src/hooks/use-inner-width';
import { Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';


const HASHIYE = 5;
const SQUARE_LENGTH = 100;

const Index = (props) => {
    const { showingAttrs, setUser_answer, answerToPut } = props;
    const { id, initialState } = showingAttrs;
    const innerWidth = useInnerWidth();

    const svgTags = [];
    const theme = useTheme();

    const [state, setState] = useState(initialState || new Array(7).fill(false));

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

    svgTags.push(
        <path
            d={`
              M 0 0
              L ${SQUARE_LENGTH / 2} 0
              L ${(3 / 4) * SQUARE_LENGTH} ${SQUARE_LENGTH / 4}
              L ${SQUARE_LENGTH / 4} ${SQUARE_LENGTH / 4}
              L 0 0
            `}
            fill={state[0] ? `${alpha(theme.palette.primary.light, 1)}` : 'rgba(0,0,0,0)'}
            stroke="black"
            strokeWidth={0.5}
            onClick={id ? () => {
                setState((prev) => [!prev[0], ...prev.slice(1)]);
            }: () => {}}
        />,
        <path
            d={`
              M ${SQUARE_LENGTH / 2} 0
              L ${SQUARE_LENGTH} 0
              L ${SQUARE_LENGTH} ${SQUARE_LENGTH / 2}
              L ${SQUARE_LENGTH / 2} 0
            `}
            fill={state[1] ? `${alpha(theme.palette.primary.light, 1)}` : 'rgba(0,0,0,0)'}
            stroke="black"
            strokeWidth={0.5}
            onClick={id ? () => {
                setState((prev) => [prev[0], !prev[1], ...prev.slice(2)]);
            } : () => {}}
        />,
        <path
            d={`
              M 0 0
              L ${SQUARE_LENGTH / 2} ${SQUARE_LENGTH / 2}
              L 0 ${SQUARE_LENGTH}
              L 0 0
            `}
            fill={state[2] ? `${alpha(theme.palette.primary.light, 1)}` : 'rgba(0,0,0,0)'}
            stroke="black"
            strokeWidth={0.5}
            onClick={id ? () => {
                setState((prev) => [...prev.slice(0, 2), !prev[2], ...prev.slice(3)]);
            } : () => {}}
        />,
        <path
            d={`
              M ${SQUARE_LENGTH / 2} ${SQUARE_LENGTH / 2}
              L ${(3 / 4) * SQUARE_LENGTH} ${(1 / 4) * SQUARE_LENGTH}
              L ${(1 / 4) * SQUARE_LENGTH} ${(1 / 4) * SQUARE_LENGTH}
              L ${SQUARE_LENGTH / 2} ${SQUARE_LENGTH / 2}
            `}
            fill={state[3] ? `${alpha(theme.palette.primary.light, 1)}` : 'rgba(0,0,0,0)'}
            stroke="black"
            strokeWidth={0.5}
            onClick={id ? () => {
                setState((prev) => [...prev.slice(0, 3), !prev[3], ...prev.slice(4)]);
            } : () => {}}
        />,
        <path
            d={`
                M ${(3 / 4) * SQUARE_LENGTH} ${(1 / 4) * SQUARE_LENGTH}
                L ${SQUARE_LENGTH} ${SQUARE_LENGTH / 2}
                L ${(3 / 4) * SQUARE_LENGTH} ${(3 / 4) * SQUARE_LENGTH}
                L ${SQUARE_LENGTH / 2} ${SQUARE_LENGTH / 2}
                L ${(3 / 4) * SQUARE_LENGTH} ${(1 / 4) * SQUARE_LENGTH}
            `}
            fill={state[4] ? `${alpha(theme.palette.primary.light, 1)}` : 'rgba(0,0,0,0)'}
            stroke="black"
            strokeWidth={0.5}
            onClick={id ? () => {
                setState((prev) => [...prev.slice(0, 4), !prev[4], ...prev.slice(5)]);
            } : () => {}}
        />,
        <path
            d={`
                M ${SQUARE_LENGTH} ${SQUARE_LENGTH / 2}
                L ${SQUARE_LENGTH} ${SQUARE_LENGTH} 
                L ${(3 / 4) * SQUARE_LENGTH} ${(3 / 4) * SQUARE_LENGTH}
                L ${SQUARE_LENGTH} ${SQUARE_LENGTH / 2}
            `}
            fill={state[5] ? `${alpha(theme.palette.primary.light, 1)}` : 'rgba(0,0,0,0)'}
            stroke="black"
            strokeWidth={0.5}
            onClick={id ? () => {
                setState((prev) => [...prev.slice(0, 5), !prev[5], prev[6]]);
            } : () => {}}
        />,
        <path
            d={`
              M 0 ${SQUARE_LENGTH}
              L ${SQUARE_LENGTH / 2} ${SQUARE_LENGTH / 2}
              L ${SQUARE_LENGTH} ${SQUARE_LENGTH}
              L 0 ${SQUARE_LENGTH}
            `}
            fill={state[6] ? `${alpha(theme.palette.primary.light, 1)}` : 'rgba(0,0,0,0)'}
            stroke="black"
            strokeWidth={0.5}
            onClick={id ? () => {
                setState((prev) => [...prev.slice(0, 6), !prev[6]]);
            } : () => {}}
        />
    );

    console.log('theme', alpha(theme.palette.primary.light, 1));
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <svg
                width={innerWidth < 768 ? '100%' : '50%'}
                viewBox={`${-HASHIYE} ${-HASHIYE} ${SQUARE_LENGTH + 2 * HASHIYE} ${SQUARE_LENGTH + 2 * HASHIYE}`}
            >
                {svgTags}
            </svg>
        </Box>
    );
};

export default Index;
