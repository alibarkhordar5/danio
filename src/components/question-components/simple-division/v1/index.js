// @mui
import Box from '@mui/material/Box';
import useInnerWidth from 'src/hooks/use-inner-width';

// command
// \\simple_division[number1=13, number2=4]
// \\simple_division[number1=13, number2=4, mode="get-answer"]{\\input[id=amir]}{\\input[id=ali]}
// \simple_division[number1=13, number2=4, mode="get-answer"]{\input[id=amir]}{\input[id=ali]}

const Index = (props) => {
    const { showingAttrs, children } = props;
    const { number1, number2, mode } = showingAttrs;

    const childrenList = Array.isArray(children) ? children : [children];

    const innerWidth = useInnerWidth();

    return (
        <Box
            sx={{
                width: innerWidth < 768 ? '60%' : '40%',
                mx: 'auto',
                direction: 'rtl',
                fontFamily: 'PersianNumber',
            }}
        >
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ width: '5%' }}></Box>

                <Box sx={{ width: '45%', textAlign: 'center' }}>{number1}</Box>

                <Box
                    sx={{
                        width: '50%',
                        borderRight: 'solid 1px black',
                        borderBottom: 'solid 1px black',
                        textAlign: 'center',
                    }}
                >
                    {number2}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ width: '5%', textAlign: 'center' }}>{mode && mode === 'get-answer' ? '' : '-'}</Box>

                <Box sx={{ width: '45%', textAlign: 'center' }}>
                    {mode && mode === 'get-answer' ? '' : number1 - (number1 % number2)}
                </Box>

                <Box sx={{ width: '50%', textAlign: 'center', padding: mode && mode === 'get-answer' ? 2 : 0 }}>
                    {mode && mode === 'get-answer' ? childrenList[0] : Math.floor(number1 / number2)}
                </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ width: '5%' }}></Box>

                <Box
                    sx={{
                        width: '45%',
                        textAlign: 'center',
                        borderTop: 'solid 1px black',
                        padding: mode && mode === 'get-answer' ? 2 : 0,
                    }}
                >
                    {mode && mode === 'get-answer' ? childrenList[1] : number1 % number2}
                </Box>

                <Box sx={{ width: '50%' }}></Box>
            </Box>
        </Box>
    );
};

export default Index;
