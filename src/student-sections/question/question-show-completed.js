//@mui
import { alpha, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// custom components
import { useSettingsContext } from 'src/components/settings';
import Iconify from 'src/components/iconify';
import { useRouter } from 'src/routes/hook';

// ----------------------------------------------------------------------

const ShowCompleted = ({
    getNewQuestion,
    questionsAnswered,
    correctAnswer,
    IsHomeWork,
    getNextHomework,
    solutionData,
}) => {
    const settings = useSettingsContext();
    const theme = useTheme();
    const router = useRouter();

    return (
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
            <Box
                sx={{
                    height: '70vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: {
                            xs: '80%',
                            lg: '40%',
                        },
                        padding: '30px',
                        background: `${alpha(theme.palette.primary.light, 0.2)}`,
                        borderRadius: ' 16px',
                        boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`,
                        backdropFilter: `blur(5px)`,
                        WebkitBackdropFilter: `blur(5px)`,
                        border: `1px solid ${alpha(theme.palette.primary.light, 0.1)}`,
                    }}
                >
                    <img src="/assets/icons/question/awardMedal.svg" style={{ width: '30%' }} alt="award" />
                    <Typography sx={{ margin: '20px 0px' }} variant="h3" textAlign="center">
                        آفرین مهارت کامل شد
                    </Typography>
                    <Typography sx={{ margin: '20px 0px' }} variant="h5" textAlign="center">
                        تعداد سوال های پاسخ داده شده:{' '}
                        <span style={{ fontFamily: 'PersianNumber' }}>{questionsAnswered}</span>
                    </Typography>
                    <Typography sx={{ margin: '20px 0px' }} variant="h5" textAlign="center">
                        تعداد پاسخ های درست: <span style={{ fontFamily: 'PersianNumber' }}>{correctAnswer}</span>
                    </Typography>
                    {IsHomeWork ? (
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                gap: '10px',
                                flexDirection: { xs: 'column', md: 'row' },
                            }}
                        >
                            <Button
                                size="medium"
                                color="primary"
                                variant="contained"
                                startIcon={<Iconify icon="ic:round-skip-next" />}
                                onClick={() => getNextHomework(solutionData.next_skill)}
                            >
                                رفتن به مهارت بعدی
                            </Button>
                            <Button
                                size="medium"
                                color="primary"
                                variant="contained"
                                startIcon={<Iconify icon="ic:round-exit-to-app" />}
                                onClick={() => router.push('/student')}
                            >
                                خروج از مهارت
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            size="medium"
                            color="primary"
                            variant="contained"
                            startIcon={<Iconify icon="uim:telegram-alt" />}
                            onClick={getNewQuestion}
                        >
                            گرفتم
                        </Button>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default ShowCompleted;
