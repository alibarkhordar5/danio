//mui
import { Box } from '@mui/material';
import { isMobile } from 'react-device-detect';
import { alpha, useTheme } from '@mui/material/styles';

//data
import KeysData from './keys.json';

const Index = ({ showKeyboard, handleBoxClick, setValue, id, value, type, handleSubmit }) => {
    const theme = useTheme();

    const { keys } = KeysData;

    if (isMobile) {
        return (
            <>
                <Box
                    sx={{
                        position: 'fixed',
                        width: '100%',
                        height: showKeyboard ? '200px' : '0px',
                        backgroundColor: alpha(theme.palette.primary.lighter, 1),
                        zIndex: 99999,
                        bottom: 0,
                        margin: '100px auto',
                        right: 0,
                        transition: 'all 0.5s',
                        marginBottom: '0px',
                        marginTop: '100px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'row-reverse',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        overflow: 'hidden',
                        paddingTop: '5px',
                    }}
                    onClick={handleBoxClick}
                >
                    {keys.map((key) => {
                        return (
                            <Box
                                key={key.value}
                                sx={{
                                    padding: '5px 10px',
                                    margin: '2px',
                                    background: 'white',
                                    borderRadius: '10px',
                                    boxShadow: '0px 0px 10px lightGray',
                                    fontFamily: 'PersianNumber',
                                    textAlign: 'center',
                                    width: `15%`,
                                    border: `2px solid ${alpha(theme.palette.primary.light, 1)}`,
                                    '&:hover': {
                                        backgroundColor: `${alpha(theme.palette.primary.dark, 1)}`,
                                        color: 'white',
                                    },
                                }}
                                onClick={() => {
                                    if (type === 'math') {
                                        if (value[id]) {
                                            setValue({ ...value, [id]: value[id] + key.value });
                                        } else {
                                            setValue({ ...value, [id]: key.value });
                                        }
                                    } else {
                                        setValue((prev) => prev + key.value);
                                    }
                                }}
                            >
                                {key.lable}
                            </Box>
                        );
                    })}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Box
                            onClick={() => {
                                handleSubmit();
                            }}
                            sx={{
                                backgroundColor: 'white',
                                padding: '5px 10px',
                                margin: '5px',
                                borderRadius: '12px',
                                boxShadow: '0px 0px 10px lightGray',
                                width: '50%',
                                textAlign: 'center',
                                border: `2px solid ${alpha(theme.palette.primary.light, 1)}`,
                                '&:hover': {
                                    backgroundColor: `${alpha(theme.palette.primary.dark, 1)}`,
                                    color: 'white',
                                },
                            }}
                        >
                            ارسال پاسخ
                        </Box>
                        <Box sx={{ display: 'flex', width: '50%' }}>
                            <Box
                                onClick={() => {
                                    if (type === 'math') {
                                        setValue({ ...value, [id]: value[id].slice(0, -1) });
                                    } else {
                                        setValue((prev) => prev.slice(0, -1));
                                    }
                                }}
                                sx={{
                                    backgroundColor: 'white',
                                    padding: '5px 10px',
                                    margin: '5px',
                                    borderRadius: '12px',
                                    boxShadow: '0px 0px 10px lightGray',
                                    width: '100%',
                                    textAlign: 'center',
                                    border: `2px solid ${alpha(theme.palette.primary.light, 1)}`,
                                    '&:hover': {
                                        backgroundColor: `${alpha(theme.palette.primary.dark, 1)}`,
                                        color: 'white',
                                    },
                                }}
                            >
                                پاک کردن
                            </Box>
                            <Box
                                id={'closeKeyboard'}
                                // onClick={() => {
                                //     setShowKeyboard(false);
                                // }}
                                sx={{
                                    backgroundColor: 'white',
                                    padding: '5px 10px',
                                    margin: '5px',
                                    borderRadius: '12px',
                                    boxShadow: '0px 0px 10px lightGray',
                                    width: '100%',
                                    textAlign: 'center',
                                    border: `2px solid ${alpha(theme.palette.primary.light, 1)}`,
                                    '&:hover': {
                                        backgroundColor: `${alpha(theme.palette.primary.dark, 1)}`,
                                        color: 'white',
                                    },
                                }}
                            >
                                بستن
                            </Box>
                            
                        </Box>
                    </Box>
                </Box>
            </>
        );
    }
};

export default Index;
