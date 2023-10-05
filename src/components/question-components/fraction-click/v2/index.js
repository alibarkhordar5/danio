/* eslint-disable no-fallthrough */
import { useState } from 'react';
import {
    OldCircle,
    OldInputCircle,
    NewCircle,
    NewInputCircle,
    MultiColorCircle,
    MultiColorMixedCircle,
    TorPaperCircle,
    UnitCircle,
    UnEqualCircle,
} from '../shapes/circle';
import {
    MultiColorRectangle,
    NewInputRect,
    NewRect,
    OldInputRect,
    OldRect,
    MultiColorMixedRect,
    TorPaperRect,
    UnitRect,
} from '../shapes/rectangle';
import { MultiColorTriangle, NewInputPolygon, NewPolygon } from '../shapes/polygon';
import { MultiColorMixedCylinder, TorPaperCylinder, UnitCylinder } from '../shapes/cylinder';

const Index = (props) => {
    const { showingAttrs, setUser_answer, answerToPut } = props;
    const {
        id,
        denominator,
        input,
        numerator,
        shape,
        max_denominator,
        mode,
        color,
        numerators,
        colors,
        max_numerator,
        hasPalette,
        torPaper,
        hasUnit,
        hasCross,
        equal = true,
        initialState,
        initialCross,
        click,
        size,
    } = showingAttrs;

    const [state, setState] = useState(0);

    let myShape = shape;
    if (shape === 'rect' || shape === 'vertical_rect') {
        myShape = 'rectangle';
    }

    switch (myShape) {
        case 'circle':
            if (mode === 'old' && input) {
                return <OldInputCircle denominator={denominator} color={color} setState={setState} state={state} />;
            } else if (mode === 'old' && !input) {
                return <OldCircle numerator={numerator} denominator={denominator} color={color} />;
            } else if (mode === 'new' && input) {
                return (
                    <NewInputCircle
                        numerators={numerators}
                        max_numerator={max_numerator}
                        denominator={denominator}
                        colors={colors}
                        setState={setState}
                        state={state}
                    />
                );
            } else if (mode === 'new' && !input) {
                return (
                    <NewCircle
                        numerators={numerators}
                        max_numerator={max_numerator}
                        denominator={denominator}
                        colors={colors}
                    />
                );
            } else if (hasPalette) {
                return (
                    <MultiColorCircle
                        id={id}
                        denominator={denominator}
                        answerToPut={answerToPut}
                        setUser_answer={setUser_answer}
                        colors={colors}
                    />
                );
            } else if (torPaper) {
                return <TorPaperCircle denominator={denominator} />;
            }
        case 'circleMixed':
            if (equal) {
                if (!hasUnit) {
                    return (
                        <MultiColorMixedCircle
                            id={id}
                            denominator={denominator}
                            answerToPut={answerToPut}
                            setUser_answer={setUser_answer}
                            colors={colors}
                            max_numerator={max_numerator}
                            initialState={initialState}
                            initialCross={initialCross}
                            hasCross={hasCross}
                            click={click}
                            size={size}
                        />
                    );
                } else if (hasUnit) {
                    return (
                        <UnitCircle
                            id={id}
                            denominator={denominator}
                            answerToPut={answerToPut}
                            setUser_answer={setUser_answer}
                            colors={colors}
                            max_numerator={max_numerator}
                        />
                    );
                }
            } else {
                return (
                    <UnEqualCircle
                        id={id}
                        denominator={denominator}
                        answerToPut={answerToPut}
                        setUser_answer={setUser_answer}
                        colors={colors}
                        max_numerator={max_numerator}
                    />
                );
            }
        case 'rectMixed':
            if (!hasUnit) {
                return (
                    <MultiColorMixedRect
                        id={id}
                        denominator={denominator}
                        answerToPut={answerToPut}
                        setUser_answer={setUser_answer}
                        colors={colors}
                        max_numerator={max_numerator}
                        hasCross={hasCross}
                        initialState={initialState}
                        initialCross={initialCross}
                        size={size}
                    />
                );
            } else if (hasUnit) {
                return (
                    <UnitRect
                        id={id}
                        denominator={denominator}
                        answerToPut={answerToPut}
                        setUser_answer={setUser_answer}
                        colors={colors}
                        max_numerator={max_numerator}
                        hasCross={hasCross}
                    />
                );
            }
        case 'cylinderMixed':
            if (!hasUnit) {
                return (
                    <MultiColorMixedCylinder
                        id={id}
                        denominator={denominator}
                        answerToPut={answerToPut}
                        setUser_answer={setUser_answer}
                        colors={colors}
                        max_numerator={max_numerator}
                        hasCross={hasCross}
                        initialState={initialState}
                        initialCross={initialCross}
                        click={click}
                    />
                );
            } else if (hasUnit) {
                return (
                    <UnitCylinder
                        id={id}
                        denominator={denominator}
                        answerToPut={answerToPut}
                        setUser_answer={setUser_answer}
                        colors={colors}
                        max_numerator={max_numerator}
                        hasCross={hasCross}
                    />
                );
            }
        case 'cylinder':
            if (torPaper) {
                return <TorPaperCylinder denominator={denominator} />;
            }
        case 'rectangle':
            if (mode === 'old' && input) {
                return (
                    <OldInputRect
                        denominator={denominator}
                        max_denominator={max_denominator}
                        color={color}
                        setState={setState}
                        state={state}
                        max_numerator={max_numerator}
                    />
                );
            } else if (mode === 'old' && !input) {
                return (
                    <OldRect
                        numerator={numerator}
                        denominator={denominator}
                        color={color}
                        max_denominator={max_denominator}
                    />
                );
            } else if (mode === 'new' && input) {
                return (
                    <NewInputRect
                        numerators={numerators}
                        max_numerator={max_numerator}
                        denominator={denominator}
                        colors={colors}
                        setState={setState}
                        state={state}
                    />
                );
            } else if (mode === 'new' && !input) {
                return (
                    <NewRect
                        numerators={numerators}
                        max_numerator={max_numerator}
                        denominator={denominator}
                        colors={colors}
                    />
                );
            } else if (hasPalette) {
                return (
                    <MultiColorRectangle
                        id={id}
                        denominator={denominator}
                        answerToPut={answerToPut}
                        setUser_answer={setUser_answer}
                        colors={colors}
                    />
                );
            } else if (torPaper) {
                return <TorPaperRect denominator={denominator} />;
            }

        case 'polygon':
            if (mode === 'new' && input) {
                return (
                    <NewInputPolygon
                        numerators={numerators}
                        max_numerator={max_numerator}
                        denominator={denominator}
                        colors={colors}
                        setState={setState}
                        state={state}
                    />
                );
            } else if (mode === 'new' && !input) {
                return (
                    <NewPolygon
                        numerators={numerators}
                        max_numerator={max_numerator}
                        denominator={denominator}
                        colors={colors}
                    />
                );
            } else {
                return (
                    <MultiColorTriangle
                        id={id}
                        denominator={denominator}
                        answerToPut={answerToPut}
                        setUser_answer={setUser_answer}
                        colors={colors}
                        size={size}
                        initialState={initialState}
                        click={click}
                    />
                );
            }

        default:
            return <p>invalid shape!</p>;
    }
};

export default Index;
