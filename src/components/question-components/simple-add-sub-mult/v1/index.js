import useInnerWidth from 'src/hooks/use-inner-width';
import Box from '@mui/material/Box';

/*
  number1: for inputs use -
  number2: for inputs use -
  mode: for getting the answer use get-answwer
  sign: use X or + or -
 */

const Index = ({ showingAttrs, children }) => {
    const { number1, number2, mode, sign = 'X' } = showingAttrs;
    let { number1pattern, number2pattern } = showingAttrs;
    let number3;
    if (mode !== 'get-answer') {
        switch (sign) {
            case '+':
                number3 = number1 + number2;
                break;
            case '-':
                number3 = number1 - number2;
                break;
            default:
                number3 = number1 * number2;
                break;
        }
    }
    if (!number1pattern) {
        number1pattern = '*'.repeat(String(number1).length);
    }
    if (!number2pattern) {
        number2pattern = '*'.repeat(String(number1).length);
    }

    const containingNumbers = [number1, number2, number3].filter((f) => f);
    const numberOfColumns = Math.max(...containingNumbers.map((m) => String(m).length)) + 1;
    const columnWidth = 100 / numberOfColumns + '%';

    const innerWidth = useInnerWidth();

    const childrenList = Array.isArray(children) ? children : [children];
    let childrenIndex = 0;

    const row1 = [],
        row2 = [],
        row3 = [];

    row1.push(
        new Array(numberOfColumns - String(number1).length)
            .fill(<></>)
            .map((tag) => <Box sx={{ width: columnWidth, textAlign: 'center' }}></Box>)
    );
    row1.push(
        String(number1)
            .split('')
            .map((char, index) => (
                <Box sx={{ width: columnWidth, px: 1, textAlign: 'center' }}>
                    {number1pattern[index] === '-' ? childrenList[childrenIndex++] : char}
                </Box>
            ))
    );

    row2.push(<Box sx={{ width: columnWidth, textAlign: 'center' }}>{sign}</Box>);
    row2.push(
        new Array(numberOfColumns - String(number2).length - 1)
            .fill(<></>)
            .map((tag) => <Box sx={{ width: columnWidth, textAlign: 'center' }}></Box>)
    );
    row2.push(
        String(number2)
            .split('')
            .map((char, index) => (
                <Box sx={{ width: columnWidth, px: 1, textAlign: 'center' }}>
                    {number2pattern[index] === '-' ? childrenList[childrenIndex++] : char}
                </Box>
            ))
    );

    if (mode && mode === 'get-answer') {
        row3.push(<Box sx={{ width: columnWidth, textAlign: 'center' }}></Box>);
        row3.push(<Box sx={{ width: '100%', textAlign: 'center' }}>{childrenList[childrenIndex]}</Box>);
    } else {
        row3.push(
            new Array(numberOfColumns - String(number3).length)
                .fill(<></>)
                .map((tag) => <Box sx={{ width: columnWidth, textAlign: 'center' }}></Box>)
        );
        row3.push(
            String(number3)
                .split('')
                .map((char) => <Box sx={{ width: columnWidth, textAlign: 'center' }}>{char}</Box>)
        );
    }

    return (
        <Box
            sx={{
                width: innerWidth < 768 ? '60%' : mode && mode === 'get-answer' ? '40%' : '20%',
                mx: 'auto',
                direction: 'rtl',
                fontFamily: 'PersianNumber',
            }}
        >
            <Box sx={{ display: 'flex', pt: 2, pb: 0.5 }}>{row1}</Box>

            <Box sx={{ display: 'flex', pt: 0.5, pb: 2, mb: 2, borderBottom: 'solid 1px black' }}>{row2}</Box>

            <Box sx={{ display: 'flex' }}>{row3}</Box>
        </Box>
    );
};

export default Index;
