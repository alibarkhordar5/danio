import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, styled } from '@mui/material';
import { MathJaxBaseContext, MathJax } from 'better-react-mathjax';
import styles from './index.module.css';
import useDisabledKeyboard from 'src/components/question-modules/keyboard/use-disabled-keyboard';
//hooks
import useInnerWidth from 'src/hooks/use-inner-width';
import { QuestionContext } from 'src/student-sections/question/view';

const MathBox = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'inline' && prop !== 'visible',
})(({ visible, inline, theme }) => ({
    visibility: visible ? 'visible' : 'hidden',
    ...(inline === false && {
        textAlign: 'center',
        autoComplete: 'off',
        // changes the font-size in xs media size (extra small).
        transition: 'font-size .2s ease',
        fontSize: '200%',
        [theme.breakpoints.only('xs')]: {
            fontSize: '150%',
        },
    }),
    ...((inline === undefined || inline === true) && {
        display: 'inline-block',
        verticalAlign: 'middle',
        margin: theme.spacing(0, 0.75),
        maxWidth: '100%',
    }),
}));

const InlineBox = styled(Box)(({ theme }) => ({
    '& mjx-assistive-mml': {
        width: '0 !important',
        height: '0 !important',
    },
}));

const MathComponent = (props) => {
    const screenWidth = useInnerWidth();
    // do not change this line at all !!!

    const { showingAttrs, answerToPut, is_created, setUser_answer, componentIds = { current: [] }, children } = props;
    const { inline } = showingAttrs;
    const [isVisible, setIsVisible] = useState(false);
    const mathBlock = useRef();
    const mjContext = useContext(MathJaxBaseContext);
    const { handleFocus, setValue, value, idSetter, id, handleBoxClick, setId, showKeyboard } = useDisabledKeyboard({
        type: 'mathInput',
    });
    const { setDataQuestion, dataQuestion, setShowKeyboard } = useContext(QuestionContext);

    // rast chin kardan dar soorate dashtane matn
    // let mathJaxes;
    // mathJaxes = document.querySelectorAll('mjx-container > .MJX-TEX > mjx-mtext > .TEX-AC-R');
    // for (let mathJax of mathJaxes) {
    //     mathJax.parentNode.parentNode.style.direction = 'rtl';
    // }

    useEffect(() => {
        setDataQuestion({ ...dataQuestion, handleBoxClick, setValue, type: 'math', id, setId, value });
        setShowKeyboard(showKeyboard);
    }, [id, showKeyboard, value]);

    useEffect(() => {
        if (!(answerToPut && answerToPut[id]) && setUser_answer) {
            setUser_answer(id, parseInt(value[id]));
        }
    }, [value]);

    console.log(children);

    useEffect(() => {
        const addedEvents = new Map();

        if (mathBlock.current) {
            mjContext.promise.then((mathJax) => {
                mathJax.startup.promise.then(() => {
                    setIsVisible(false);
                    mathJax.typesetClear([mathBlock.current]);
                    mathJax.typesetPromise([mathBlock.current]).then(() => {
                        // get input descendants
                        const descendants = mathBlock.current.querySelectorAll(
                            ':not(mjx-assistive-mml) > mjx-container > mjx-math input'
                        );

                        descendants.forEach((descendant) => {
                            // add event listener to all inputs.
                            const { id } = descendant;

                            if (id && !componentIds.current.includes(id)) {
                                componentIds.current.push(id);
                            }

                            // define onChangeHandler
                            const onChangeHandler = (ev) => {
                                setValue({ ...value, [id]: ev.target.value });
                                setUser_answer(id, parseInt(ev.target.value));
                            };
                            descendant.onfocus = (event) => {
                                handleFocus(event);
                                idSetter(id);
                            };
                            descendant.readOnly = screenWidth < 768 ? true : false;
                            descendant.onchnage = onChangeHandler;
                            descendant.style.direction = 'ltr';

                            if (id) {
                                descendant.value = value[id] || '';
                                if (!is_created) {
                                    if (answerToPut[id] || answerToPut[id] === 0) {
                                        descendant.value = answerToPut[id];
                                    } else {
                                        descendant.value = ' ';
                                    }
                                }

                                addedEvents.set(descendant, onChangeHandler);

                                // add event listener to the input
                                descendant.addEventListener('input', addedEvents.get(descendant), true);
                            }
                        });
                        setIsVisible(true);
                    });
                });
            });
        }
        return () => {
            addedEvents.forEach((eventListener, element) => {
                element.removeEventListener('input', eventListener, true);
            });
        };
    }, [props, mathBlock, JSON.stringify(value), screenWidth]);

    return (
        <Box className={styles.math_container}>
            <MathBox inline={inline} visible={isVisible} dir={'ltr'}>
                <MathJax style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <InlineBox ref={mathBlock}>{'\\(' + props.children + '\\)'}</InlineBox>
                </MathJax>
            </MathBox>
        </Box>
    );
};

export default MathComponent;

// \text(1.1)[dir=rtl]{جای خالی را پر کنید.}
// \math(1.1)[inline=\false]{% \frac{ 9 }{ \input[id=first_denominator, type=int] }- \frac{ 5 }{ 3 }= \frac{ \input[id=answer_numerator, type=int] }{ 3 } %}
