// general imports
import { useState, useEffect, useRef, createContext } from 'react';

// custom components
import { useSnackbar } from 'src/components/snackbar';
import Realistic from 'src/components/confetti/realistic';
import { LoadingScreen } from 'src/components/loading-screen';
import axios, { endpoints } from 'src/utils/axios';
import { useParams } from 'src/routes/hook';
import ShowQuestion from './question-show-question';
import ShowAnswer from './question-show-answer';
import ShowCompleted from './question-show-completed';
import ShowDone from './question-show-done';
import './style.css';

import Box from '@mui/material/Box';

import EmptyAnswerDialog from './question-empty-answer-dialog';

// ----------------------------------------------------------------------

// constants
const LOADING = 'loading';
const SHOW_QUESTION = 'show_question';
const SHOW_CONGRATS = 'show_congrats';
const SHOW_ANSWER = 'show_answer';
const SHOW_COMPLETED = 'show_completed';
export const SHOW_DONE = 'show_done';
// ----------------------------------------------------------------------

//--------------question context (this is needed for custom keyboard)---------------
export const QuestionContext = createContext({});

export const QuestionProvider = ({ children }) => {
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [dataQuestion, setDataQuestion] = useState({});

    return (
        <QuestionContext.Provider value={{ showKeyboard, setShowKeyboard, dataQuestion, setDataQuestion }}>
            <Box sx={{ pb: showKeyboard ? '200px' : 0 }}>{children}</Box>
        </QuestionContext.Provider>
    );
};
//--------------question context (this is needed for custom keyboard)---------------

function QuestionView({ IsHomeWork }) {
    const { enqueueSnackbar } = useSnackbar();

    // state of question: loading, show_question, show_congrats, show_answer, show_completed
    const [questionState, setQuestionState] = useState(LOADING);

    // answer received from user
    const userAnswer = useRef({});

    // stores ids of components with ids
    const componentIds = useRef([]);

    // content of the question: question_description, question_time, level, ...
    const [questionData, setQuestionData] = useState();

    // content of the solution: judge_result, ...
    const [solutionData, setSolutionData] = useState();

    // key of the question for getting new question from back.
    let { homeworkId, questionKey } = useParams();

    // getNewQuestion on first render.
    useEffect(() => {
        getNewQuestion();
    }, []);

    // mock data used for checking question-components. change QuestionEngine content to questionContent.
    const questionContent = {
        question_description: `
        \\fraction_click(3)[id=akbar, shapes=[[circle 4 9] [rect [1 5] 6] [cylinder 2 3] [circle 2 5]], denominator=5, max_numerator=15, color=["hotpink"], selectedShape=[rect [1 5] 6], initialState=["red" "white" "red" "white" "red" "white" "red" "white" "red" "white"]]
        `,
    };

    // setter passed to question-components. allows them to set value of a certain key only.
    const setUserAnswerByKeyAndValue = (key, value) => {
        userAnswer.current[key] = value;
    };

    const emptyAnswerDialogRef = useRef({});

    const hasEmptyAnswer = () => {
        let hasEmptyAnswer = false;
        for (let id of componentIds.current) {
            if (
                !id in userAnswer.current ||
                (!userAnswer.current[id] && userAnswer.current[id] !== undefined && userAnswer.current[id] !== 0)
            ) {
                hasEmptyAnswer = true;
            }
        }
        return hasEmptyAnswer;
    };

    const checkEmptyAnswer = () => {
        if (hasEmptyAnswer()) {
            if (emptyAnswerDialogRef.current.parentSetOpen) {
                emptyAnswerDialogRef.current.parentSetOpen(true);
            }
        } else {
            handleSubmit();
        }
    };

    // send userAnswer to back-end and get result. if false, use: setSolutionData
    const handleSubmit = () => {
        const modifiedUserAnswer = {};
        for (let key in userAnswer.current) {
            if (key) {
                modifiedUserAnswer[key] = userAnswer.current[key];
            }
        }
        userAnswer.current = { ...modifiedUserAnswer };

        axios
            .put(endpoints.question.answer(hasEmptyAnswer(), questionData.id), { user_submission: userAnswer.current })
            .then((response) => {
                if (response.data.is_correct) {
                    setSolutionData(response.data);
                    // check whether the skill is completed or not
                    if (response.data.practice_completed) {
                        setQuestionState(SHOW_COMPLETED);
                    } else {
                        setQuestionState(SHOW_CONGRATS);
                    }
                } else {
                    setSolutionData(response.data);
                    setQuestionState(SHOW_ANSWER);
                }
            })
            .catch((err) => {
                enqueueSnackbar(err.detail || err.message || 'خطا در ارسال پاسخ', { variant: 'error' });
            });
    };

    // fetch request to back-end and get the next question. use: setQuestionData, setQuestionState(SHOW_QUESTION)
    const getNewQuestion = () => {
        userAnswer.current = {};
        componentIds.current = [];
        let url = endpoints.question.get(questionKey);
        if (IsHomeWork) {
            url = endpoints.student.get_homework_question(questionKey, homeworkId);
        }
        axios
            .get(url)
            .then((response) => {
                setQuestionData(response.data);
            })
            .catch((err) => {
                enqueueSnackbar(err.detail || err.message || 'خطا در دریافت سوال', { variant: 'error' });
            })
            .finally(() => {
                setQuestionState(SHOW_QUESTION);
            });
    };

    //  when homework done, get to the next homework
    const getNextHomework = (key) => {
        userAnswer.current = {};
        let url = endpoints.question.get(key);
        axios
            .get(url)
            .then((response) => {
                setQuestionData(response.data);
            })
            .catch((err) => {
                enqueueSnackbar(err.detail || err.message || 'خطا در دریافت سوال', { variant: 'error' });
            })
            .finally(() => {
                setQuestionState(SHOW_QUESTION);
            });
    };

    const changeLevel = (isNext) => {
        userAnswer.current = {};
        componentIds.current = [];
        axios
            .get(endpoints.teacher.get_next_level(isNext, questionData.id))
            .then((response) => {
                setQuestionData(response.data);
            })
            .catch((err) => {
                enqueueSnackbar(err.detail || err.message || 'خطا در دریافت سوال', { variant: 'error' });
            });
    };

    const RenderQuestion = () => {
        // which component should be rendered based on questionState?
        switch (questionState) {
            case SHOW_QUESTION:
                return (
                    <>
                        <ShowQuestion
                            questionData={questionData}
                            componentIds={componentIds}
                            changeLevel={changeLevel}
                            setUserAnswerByKeyAndValue={setUserAnswerByKeyAndValue}
                            checkEmptyAnswer={checkEmptyAnswer}
                            questionState={questionState}
                        />

                        <EmptyAnswerDialog handleSubmit={handleSubmit} openRef={emptyAnswerDialogRef} />
                    </>
                );

            case SHOW_CONGRATS:
                if (IsHomeWork && solutionData.state === 'DONE') {
                    setTimeout(() => setQuestionState(SHOW_DONE));
                } else {
                    setTimeout(() => getNewQuestion(), 2000);
                }
                return (
                    <div style={{ width: '100%', height: '100vh' }} onClick={() => getNewQuestion()}>
                        <Realistic isOnFire={true} />
                    </div>
                );
            case SHOW_ANSWER:
                return (
                    <ShowAnswer
                        IsHomeWork={IsHomeWork}
                        questionData={questionData}
                        solutionData={solutionData}
                        userAnswer={userAnswer}
                        getNewQuestion={getNewQuestion}
                        setQuestionState={setQuestionState}
                    />
                );
            case SHOW_COMPLETED:
                return (
                    <ShowCompleted
                        IsHomeWork={IsHomeWork}
                        getNewQuestion={getNewQuestion}
                        getNextHomework={getNextHomework}
                        solutionData={solutionData}
                        correctAnswer={solutionData.correct_answers}
                        questionsAnswered={solutionData.questions_answered}
                    />
                );
            case LOADING:
                return <LoadingScreen />;

            case SHOW_DONE:
                return (
                    <ShowDone
                        getNewQuestion={getNewQuestion}
                        getNextHomework={getNextHomework}
                        solutionData={solutionData}
                        correctAnswer={solutionData.correct_answers}
                        questionsAnswered={solutionData.questions_answered}
                    />
                );

            default:
                return <LoadingScreen />;
        }
    };

    return (
        <QuestionProvider>
            <RenderQuestion />
        </QuestionProvider>
    );
}

export default QuestionView;
