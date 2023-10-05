import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

const Index = ({ children, color, cross }) => {
    const theme = useTheme();
    const [colors, setColors] = useState(color ? color : ['orange', 'red', 'purple', 'hotpink']);
    const [activeColor, setActiveColor] = useState('');
    const [crossActive, setCrossActive] = useState('');

    useEffect(() => {
        if (color && color.length > 0) {
            setColors(color);
            setActiveColor(0);
            setCrossActive(false);
        }
    }, [color]);

    // Clone the children and pass the 'color' prop to each of them
    const coloredChildren = React.Children.map(children, (child) => {
        return React.cloneElement(child, { colors: [...colors], selectedColor: activeColor, cross: crossActive });
    });

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: {
                        xs: '100%',
                        md: '80%',
                    },
                    margin: '0 auto',
                    flexDirection: {
                        xs: 'column',
                        md: 'row',
                    },
                }}
            >
                {(cross && colors.length === 0) || (!cross && colors.length === 1) ? null : (
                    <>
                        <Typography
                            sx={{
                                display: {
                                    xs: 'block',
                                    md: 'none',
                                },
                            }}
                            variant="h3"
                        >
                            انتخاب رنگ
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: { xs: 'row', md: 'column' },
                                alignItems: 'center',
                                justifyContent: {
                                    xs: 'space-evenly',
                                    md: 'center',
                                },
                                width: {
                                    xs: '100%',
                                    md: 'auto',
                                },
                                marginBottom: {
                                    xs: '30px',
                                    md: '0px',
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    display: {
                                        xs: 'none',
                                        md: 'block',
                                    },
                                }}
                                variant="h5"
                            >
                                انتخاب رنگ
                            </Typography>
                            {cross ? (
                                <Box
                                    onClick={() => {
                                        setCrossActive(true);
                                        setActiveColor('');
                                    }}
                                    sx={{
                                        width: '50px',
                                        height: '50px',
                                        marginTop: '20px',
                                        borderRadius: '12px',
                                        transition: '0.2s all',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        fontSize: '28px',
                                        border: crossActive ? '5px solid black' : '3px solid black',
                                        cursor: 'pointer',
                                    }}
                                >
                                    X
                                </Box>
                            ) : null}

                            {colors.map((color, index) => {
                                return (
                                    <>
                                        <Box
                                            onClick={() => {
                                                setActiveColor(index);
                                                setCrossActive(false);
                                            }}
                                            sx={{
                                                width: '50px',
                                                height: '50px',
                                                backgroundColor: color,
                                                marginTop: '20px',
                                                borderRadius: '12px',
                                                transition: '0.2s all',
                                                border:
                                                    colors[activeColor] === color
                                                        ? `5px solid ${alpha(theme.palette.primary.light, 1)}`
                                                        : `5px solid transparent`,
                                                '&:hover': {
                                                    border:
                                                        colors[activeColor] === color
                                                            ? `5px solid ${alpha(theme.palette.primary.light, 1)}`
                                                            : `5px solid ${alpha(theme.palette.primary.lighter, 1)}`,
                                                },
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </>
                                );
                            })}
                        </Box>
                    </>
                )}
                <Box>{coloredChildren}</Box>
            </Box>
        </>
    );
};

export default Index;

Index.prototype = {
    children: PropTypes.node.isRequired,
    color: PropTypes.array,
    activeIndex: PropTypes.number,
};
