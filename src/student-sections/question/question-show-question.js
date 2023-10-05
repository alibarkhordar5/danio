// general imports
import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { isMobile } from 'react-device-detect';

// @mui
import { alpha } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

// custom components
import QuestionAnalytics from './question-analytic';
import QuestionEngine from 'src/components/question-engine';
import { useSettingsContext } from 'src/components/settings';
import Iconify from 'src/components/iconify';
import Keyboard from 'src/components/question-modules/keyboard/component';
import { QuestionContext } from './view';
import useDisabledKeyboard from 'src/components/question-modules/keyboard/use-disabled-keyboard';
import axios, { endpoints } from 'src/utils/axios';
// ----------------------------------------------------------------------

const ShowQuestion = ({ questionData, setUserAnswerByKeyAndValue, checkEmptyAnswer, changeLevel, componentIds }) => {
    // detect back button
    // const handleBackButton = () => {
    //     console.log('back button clicked!');
    // };
    // useEffect(() => {
    //     window.history.pushState({}, null, null);
    //     window.addEventListener('popstate', handleBackButton);
    // }, []);

    const navigate = useNavigate();
    const settings = useSettingsContext();
    const [navDisplay, setNavDisplay] = useState('none');
    const { showKeyboard, dataQuestion, setShowKeyboard } = useContext(QuestionContext);
    const { handleBoxClick, setValue, id, value, type } = dataQuestion;

    // focus on the first input
    useEffect(() => {
        const questionContainer = document.getElementById('question-container');
        if (questionContainer) {
            setTimeout(() => {
                const firstInput = questionContainer.querySelectorAll('input')[0];
                if (firstInput) {
                    firstInput.focus();
                }
            }, 1500);
        }
    }, []);

    // send answer when enter is pressed
    const KeyHandler = (e) => {
        if (e.keyCode === 13) {
            checkEmptyAnswer();
        }
    };

    useEffect(() => {
        window.addEventListener('keyup', KeyHandler);
        return () => window.removeEventListener('keyup', KeyHandler);
    }, []);

    // disable navbar in question page
    let navbar;
    if (isMobile) {
        navbar = document.getElementById('mobile-nav');
    } else {
        navbar = document.getElementById('vertical-nav');
        if (!navbar) {
            navbar = document.getElementById('mini-nav');
        }
    }
    if (navbar) {
        navbar.style.display = navDisplay;
    }

    

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'} id="question-container">
            <Button
                size="large"
                onClick={() => {
                    setNavDisplay('block');
                    isMobile
                        ? (document.getElementById('mobile-nav').style.display = navDisplay)
                        : ((
                              document.getElementById('vertical-nav') || document.getElementById('mini-nav')
                          ).style.display = navDisplay);
                    navigate(-1);
                }}
                color="primary"
                startIcon={<Iconify icon="solar:exit-bold" />}
            >
                خروج
            </Button>
            {questionData && (
                <QuestionAnalytics
                    questionTime={questionData.time_elapsed || 0}
                    level={questionData.level || 0}
                    levels={questionData.number_of_levels || 0}
                    score={questionData.smart_score || 0}
                />
            )}

            <h1>{'لول: ' + questionData.level}</h1>

            <Card
                component="div"
                sx={{
                    bgcolor: (theme) => alpha(theme.palette.background.default, 0.64),
                    backdropFilter: `blur(2px)`,
                    padding: '15px 20px',
                }}
            >
                {questionData && (
                    <QuestionEngine
                        componentIds={componentIds}
                        is_created={true}
                        content={questionData.question_description}
                        setUser_answer={setUserAnswerByKeyAndValue}
                    />
                )}

                <Box
                    component="div"
                    mt={2}
                    sx={{
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'end' },
                    }}
                >
                    <Button
                        sx={{ mx: 2 }}
                        size="medium"
                        color="info"
                        variant="contained"
                        startIcon={<Iconify icon="solar:ruler-pen-bold-duotone" />}
                        onClick={() => {
                            changeLevel(false);
                        }}
                    >
                        سطح قبل
                    </Button>

                    <Button
                        size="medium"
                        color="primary"
                        variant="contained"
                        startIcon={<Iconify icon="uim:telegram-alt" />}
                        onClick={checkEmptyAnswer}
                    >
                        ارسال پاسخ
                    </Button>

                    <Button
                        sx={{ mx: 2 }}
                        size="medium"
                        color="info"
                        variant="contained"
                        startIcon={<Iconify icon="solar:ruler-pen-bold-duotone" />}
                        onClick={() => {
                            changeLevel(true);
                        }}
                    >
                        سطح بعد
                    </Button>
                </Box>
            </Card>
            <Keyboard
                handleSubmit={checkEmptyAnswer}
                setShowKeyboard={setShowKeyboard}
                setValue={setValue}
                handleBoxClick={handleBoxClick}
                id={id}
                value={value}
                showKeyboard={showKeyboard}
                type={type}
            />
        </Container>
    );
};

export default ShowQuestion;
