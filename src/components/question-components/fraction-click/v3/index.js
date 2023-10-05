import { useState } from 'react';
import { Box, useTheme } from '@mui/system';
import { MultiColorMixedCircle } from '../shapes/circle';
import { MultiColorMixedCylinder } from '../shapes/cylinder';
import { MultiColorMixedRect } from '../shapes/rectangle';
import { Typography } from '@mui/material';

// command
// \\fraction_click(3)[id=akbar, shapes=[[circle 4 5] [rect [5 1] 6] [cylinder 2 3]], denominator=5, max_numerator=15, color=["hotpink"]]

const Index = (props) => {
    const { showingAttrs, setUser_answer, answerToPut } = props;
    const {
        id,
        denominator,
        shapes,
        max_numerator,
        color,
        selectedShape: givenSelectedShape,
        initialState: givenInitialState,
    } = showingAttrs;
    const theme = useTheme();

    const [selectedShape, setSelectedShape] = useState(givenSelectedShape || []);
    const [clicked, setClicked] = useState(new Array(shapes.length).fill(false));

    // modify setUser_answer such that it also sends the selected shape
    const mySetUser_answer = (key, value) => {
        setUser_answer(key, { ...value, selectedShape });
    };

    const checkEquality = (a, b) => a[0] === b[0] && (Array.isArray(a) ? a[1][0] === b[1][0] && a[1][1] === b[1][1] : a[1] === b[1]) && a[2] === b[2];

    const samplesSvg = (shapes) => {
        const generateSvg = (shape, index) => {
            switch (shape[0]) {
                case 'circle':
                    return (
                        <Box
                            onClick={() => {
                                setClicked((prev) => {
                                    return [
                                        ...prev.slice(0, index).fill(false),
                                        true,
                                        ...prev.slice(index + 1).fill(false),
                                    ];
                                });
                                setSelectedShape(shape);
                            }}
                        >
                            <MultiColorMixedCircle
                                denominator={shape[1]}
                                colors={color}
                                max_numerator={shape[1]}
                                clickable={false}
                                initialState={
                                    clicked[index] || checkEquality(givenSelectedShape, shape)
                                        ? new Array(shape[1]).fill(theme.palette.primary.light)
                                        : new Array(shape[1]).fill('rgba(0,0,0,0)')
                                }
                            />
                        </Box>
                    );
                case 'rect':
                    return (
                        <Box
                            onClick={() => {
                                setClicked((prev) => {
                                    return [
                                        ...prev.slice(0, index).fill(false),
                                        true,
                                        ...prev.slice(index + 1).fill(false),
                                    ];
                                });
                                setSelectedShape(shape);
                            }}
                        >
                            <MultiColorMixedRect
                                denominator={shape[1]}
                                colors={color}
                                max_numerator={shape[1][0]}
                                clickable={false}
                                initialState={
                                    clicked[index] || checkEquality(givenSelectedShape, shape)
                                        ? new Array(shape[1][0] * shape[1][1]).fill(theme.palette.primary.light)
                                        : new Array(shape[1][0] * shape[1][1]).fill('rgba(0,0,0,0)')
                                }
                            />
                        </Box>
                    );
                case 'cylinder':
                    return (
                        <Box
                            onClick={() => {
                                setClicked((prev) => {
                                    return [
                                        ...prev.slice(0, index).fill(false),
                                        true,
                                        ...prev.slice(index + 1).fill(false),
                                    ];
                                });
                                setSelectedShape(shape);
                            }}
                        >
                            <MultiColorMixedCylinder
                                denominator={shape[1]}
                                colors={color}
                                max_numerator={shape[1]}
                                clickable={false}
                                initialState={
                                    clicked[index] || checkEquality(givenSelectedShape, shape)
                                        ? new Array(shape[1]).fill(theme.palette.primary.light)
                                        : new Array(shape[1]).fill('rgba(0,0,0,0)')
                                }
                            />
                        </Box>
                    );
                default:
                    return null;
            }
        };
        return (
            <>
                <Box
                    sx={{
                        mx: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        width: { xs: 300, sm: 400, md: 600 },
                    }}
                >
                    {shapes.map((shape, index) => generateSvg(shape, index))}
                </Box>
            </>
        );
    };

    const getDenominatorByShape = (shape) => {
        for (let sth of shapes) {
            if (checkEquality(sth, shape)) {
                return [sth[1] || denominator, sth[2] || max_numerator];
            }
        }
        return [denominator, max_numerator];
    };

    const renderQuestion = (shape) => {
        const shapeDenominator = getDenominatorByShape(shape);
        switch (shape[0]) {
            case 'rect':
                return (
                    <>
                        {samplesSvg(shapes)}
                        <Box sx={{ width: { xs: 300, sm: 400, md: 800 }, mx: 'auto', textAlign: 'center' }}>
                            <MultiColorMixedRect
                                id={id}
                                denominator={shapeDenominator[0]}
                                max_numerator={shapeDenominator[1]}
                                answerToPut={answerToPut}
                                setUser_answer={mySetUser_answer}
                                colors={color}
                                size="lg"
                                {...{ initialState: givenInitialState }}
                                // click="partClick"
                            />
                        </Box>
                    </>
                );
            case 'circle':
                return (
                    <>
                        {samplesSvg(shapes)}
                        <Box sx={{ width: { xs: 300, sm: 400, md: 800 }, mx: 'auto', textAlign: 'center' }}>
                            <MultiColorMixedCircle
                                id={id}
                                denominator={shapeDenominator[0]}
                                max_numerator={shapeDenominator[1]}
                                answerToPut={answerToPut}
                                setUser_answer={mySetUser_answer}
                                colors={color}
                                size="lg"
                                {...{ initialState: givenInitialState }}
                                // click="partClick"
                            />
                        </Box>
                    </>
                );
            case 'cylinder':
                return (
                    <>
                        {samplesSvg(shapes)}
                        <Box sx={{ width: { xs: 300, sm: 400, md: 800 }, mx: 'auto', textAlign: 'center' }}>
                            <MultiColorMixedCylinder
                                id={id}
                                denominator={shapeDenominator[0]}
                                max_numerator={shapeDenominator[1]}
                                answerToPut={answerToPut}
                                setUser_answer={mySetUser_answer}
                                colors={color}
                                size="lg"
                                {...{ initialState: givenInitialState }}
                                // click="partClick"
                            />
                        </Box>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {selectedShape && selectedShape.length > 0 ? (
                renderQuestion(selectedShape)
            ) : givenSelectedShape && givenSelectedShape.length > 0 ? (
                renderQuestion(givenSelectedShape)
            ) : (
                <>
                    {samplesSvg(shapes)}
                    <Typography textAlign="center" variant="h6">
                        یک شکل را انتخاب کنید!
                    </Typography>
                </>
            )}
        </>
    );
};

export default Index;
