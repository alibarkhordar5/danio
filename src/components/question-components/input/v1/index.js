import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { useRef, useEffect, useContext } from 'react';
import useDisabledKeyboard from 'src/components/question-modules/keyboard/use-disabled-keyboard';
import Keyboard from 'src/components/question-modules/keyboard/component';
import { QuestionContext } from 'src/student-sections/question/view';
const Index = (props) => {
    // do not change this line at all !!!
    const { showingAttrs, answerToPut, setUser_answer } = props;
    const { id, type, w = 40, h = 10 } = showingAttrs;
    const textFieldRef = useRef(null);
    const { handleBoxClick, handleFocus, setValue, showKeyboard, value } = useDisabledKeyboard({
        textFieldRef,
    });
    const { setDataQuestion, dataQuestion, setShowKeyboard } = useContext(QuestionContext);

    useEffect(() => {
        setDataQuestion({ ...dataQuestion, handleBoxClick, setValue, type: 'normal', id, value });
        setShowKeyboard(showKeyboard);
    }, [id, showKeyboard, value]);
    const theme = useTheme();

    useEffect(() => {
        if (answerToPut && (answerToPut[id] || answerToPut[id] === 0)) {
            setValue(answerToPut[id]);
        }
    }, [answerToPut]);

    useEffect(() => {
        if (!(answerToPut && answerToPut[id]) && setUser_answer) {
            setUser_answer(id, type === 'int' ? parseInt(value) : value);
        }
    }, [value]);

    return (
        <Box sx={{ display: 'inline-flex' }}>
            <TextField
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: `2px solid ${theme.palette.primary.dark}`,
                        },
                        '&:hover fieldset': {
                            border: `2px solid ${theme.palette.primary.light}`,
                        },
                        '&.Mui-focused fieldset': {
                            border: `2px solid ${theme.palette.primary.light}`,
                        },
                    },
                }}
                inputProps={{
                    style: {
                        textAlign: 'center',
                        direction: 'ltr',
                        fontFamily: 'PersianNumber',
                        borderRadius: '12px',
                        width: `${w}px`,
                        height: `${h}px`,
                    },
                }}
                onFocus={handleFocus}
                readOnly
                ref={textFieldRef}
                autoComplete="off"
            />
        </Box>
    );
};

export default Index;
