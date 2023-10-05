// @mui
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

// custom imports
import useInnerWidth from 'src/hooks/use-inner-width';

import { alpha, useTheme } from '@mui/material/styles';

const Index = (props) => {
    // do not change this line at all !!!
    const { showingAttrs, answerToPut, is_created, setUser_answer, children, type } = props;

    const theme = useTheme();
    const screenWidth = useInnerWidth();

    const color = '#29b6f6';

    return (
        <>
            <Box
                sx={{
                    position: 'relative',
                    margin: { xs: '0px 5px', md: '0px 15px' },
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <svg
                    width={screenWidth < 768 ? '60' : '100'}
                    height={screenWidth < 768 ? '75' : '150'}
                    viewBox="0 0 300 300"
                >
                    <rect x="1" y="50" rx="20" ry="20" width="200" height="200" style={{ fill: color, opacity: '1' }} />
                    <polygon
                        points="150,20 150,280 285,150"
                        style={{ fill: color, stroke: color, strokeWidth: '20' }}
                        strokeLinejoin="round"
                    />
                </svg>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '60%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <Typography variant='h3' sx={{ fontFamily: 'Nazanin', direction: 'rtl' }}>{children}</Typography>
                </Box>
            </Box>
        </>
    );
};

export default Index;
