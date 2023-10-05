// general imports
import React, { useEffect } from 'react';
import { useContext } from 'react';

// @mui
import { Box, Button } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

// custom imports
import { SelectContext } from '../../select/v1';
import styles from './index.module.css';

const Index = (props) => {
    // do not change this line at all !!!
    const { showingAttrs, answerToPut, children } = props;
    const { selected, setSelected, multi, id, fullWidth } = useContext(SelectContext);
    const { value } = showingAttrs;
    const theme = useTheme();

    useEffect(() => {
        const thisOption = document.getElementById(value);
        if (thisOption) {
          setTimeout(() => {
            const moneyDiv = thisOption.querySelectorAll('.money');
            if (moneyDiv.length > 0) {
                thisOption.style.width = '45%';
            }
        }, 1500);
        }
    }, []);

    if (answerToPut) {
        return (
            <Box
                sx={{
                    width: { xs: fullWidth ? '100%' : '45%', md: '45%', display: 'flex', justifyContent: 'center' },
                }}
            >
                <Box
                    className={styles.Button_container}
                    sx={{
                        margin: '30px 0px',
                        background:
                            multi
                                ? answerToPut[id].includes(value)
                                    ? alpha(theme.palette.primary.light, 1)
                                    : alpha(theme.palette.primary.lighter, 1)
                                : answerToPut[id] === value
                                ? alpha(theme.palette.primary.light, 1)
                                : alpha(theme.palette.primary.lighter, 1),
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        padding: '10px',
                        borderRadius: '10px',
                        // flexWrap: 'wrap'
                        // flexWrap: 'wrap',
                    }}
                >
                    {children}
                </Box>
            </Box>
        );
    }

    if (multi) {
        return (
            <Box
                sx={{
                    width: { xs: '45%', md: '23%', display: 'flex', justifyContent: 'center' },
                }}
            >
                <Box
                    onClick={() => {
                        if (selected.includes(value)) {
                            setSelected((prev) => {
                                const array = [...prev];
                                return array.filter((f) => f !== value);
                            });
                        } else {
                            setSelected([...selected, value]);
                        }
                    }}
                    variant="contained"
                    size="large"
                    className={styles.Button_container}
                    sx={{
                        margin: '30px 0px',
                        background: selected.includes(value)
                            ? alpha(theme.palette.primary.light, 1)
                            : alpha(theme.palette.primary.lighter, 1),
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        padding: '10px',
                        borderRadius: '10px',
                        // flexWrap: 'wrap',
                    }}
                >
                    {children}
                </Box>
            </Box>
        );
    }

    return (
        <Box
            id={value}
            sx={{
                width: { xs: '45%', md: '45%', display: 'flex', justifyContent: 'center' },
            }}
        >
            <Box
                onClick={() => {
                    setSelected(value);
                }}
                variant="contained"
                size="large"
                className={styles.Button_container}
                sx={{
                    margin: '30px 0px',
                    background:
                        value === selected
                            ? alpha(theme.palette.primary.light, 1)
                            : alpha(theme.palette.primary.lighter, 1),
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    flexWrap: 'wrap',
                    padding: '10px',
                    borderRadius: '10px',
                    '&:hover': {
                        background: alpha(theme.palette.primary.light, 1),
                    },
                    // flexWrap: 'wrap',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Index;
