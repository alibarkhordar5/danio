//@mui
import { alpha, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// custom components
import QuestionEngine from 'src/components/question-engine';
import { useSettingsContext } from 'src/components/settings';
import Iconify from 'src/components/iconify';
import { SHOW_DONE } from './view';

// ----------------------------------------------------------------------

const ShowAnswer = ({ questionData, solutionData, userAnswer, getNewQuestion, IsHomeWork, setQuestionState }) => {
    const settings = useSettingsContext();
    const theme = useTheme();

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            
            <Box>
                <Card
                    component="div"
                    sx={{
                        bgcolor: alpha(theme.palette.background.default, 0.64),
                        backdropFilter: `blur(2px)`,
                        padding: '15px 20px',
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            background: theme.palette.error.main,
                            borderRadius: '16px 0px 16px 0px',
                            textAlign: 'center',
                            width: {
                                xs: '50%',
                                md: '25%',
                            },
                            color: 'white',
                            padding: '5px 10px',
                        }}
                    >
                        جواب شما
                    </Typography>
                    <Typography
                        sx={{ width: '100%', borderBottom: `3px solid ${theme.palette.error.main}`, mb: '20px' }}
                    ></Typography>
                    <FormControl disabled sx={{ pointerEvents: 'none', width: '100%', padding: '0px 20px' }}>
                        <QuestionEngine content={questionData.question_description} answerToPut={userAnswer.current} />
                    </FormControl>

                    <Typography
                        variant="h4"
                        sx={{
                            background: theme.palette.success.main,
                            borderRadius: '16px 0px 16px 0px',
                            textAlign: 'center',
                            width: {
                                xs: '50%',
                                md: '25%',
                            },
                            color: 'white',
                            padding: '5px 10px',
                            mt: '20px',
                        }}
                    >
                        جواب درست
                    </Typography>
                    <Typography
                        sx={{ width: '100%', borderBottom: `3px solid ${theme.palette.success.main}`, mb: '20px' }}
                    ></Typography>
                    <FormControl disabled sx={{ pointerEvents: 'none', width: '100%', padding: '0px 20px' }}>
                        <QuestionEngine content={questionData.question_description} answerToPut={solutionData.answer} />
                    </FormControl>

                    <Typography
                        variant="h4"
                        sx={{
                            background: theme.palette.info.main,
                            borderRadius: '16px 0px 16px 0px',
                            textAlign: 'center',
                            width: {
                                xs: '50%',
                                md: '25%',
                            },
                            color: 'white',
                            padding: '5px 10px',
                            mt: '20px',
                        }}
                    >
                        راه حل
                    </Typography>
                    <Typography
                        sx={{ width: '100%', borderBottom: `3px solid ${theme.palette.info.main}`, mb: '20px' }}
                    ></Typography>
                    <FormControl disabled sx={{ pointerEvents: 'none', width: '100%', padding: '0px 20px' }}>
                        <QuestionEngine content={solutionData.judge_result} />
                    </FormControl>

                    <Box
                        component="div"
                        mt={2}
                        sx={{
                            display: 'flex',
                            justifyContent: { xs: 'center', md: 'end' },
                        }}
                    >
                        <Button
                            size="medium"
                            color="primary"
                            variant="contained"
                            startIcon={<Iconify icon="mdi:thumb-up" />}
                            onClick={() => {
                                if (IsHomeWork && solutionData.state === 'DONE') {
                                    setQuestionState(SHOW_DONE);
                                } else {
                                    getNewQuestion();
                                }
                            }}
                        >
                            گرفتم
                        </Button>
                    </Box>
                </Card>
            </Box>
        </Container>
    );
};

export default ShowAnswer;
