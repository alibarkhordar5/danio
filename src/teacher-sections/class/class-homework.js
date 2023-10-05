import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
// components
import Iconify from 'src/components/iconify';
import { HomeworkItem } from '../components/homework';
import { LoadingScreen } from 'src/components/loading-screen';
// routes
import { useParams } from 'src/routes/hook';
import { alpha } from '@mui/material/styles';
// custom components
import { useSnackbar } from 'src/components/snackbar';
import ModifyHomework from './class-new-homework/view';

//axios
import axios, { endpoints } from 'src/utils/axios';
import { getGradeNumber } from '../homework/view';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

export default function ClassHomework({ cache, classId, grade }) {
    const [open, setOpen] = useState(false);
    const params = useParams();

    const { id } = params;

    const { enqueueSnackbar } = useSnackbar();
    const [homeWorks, setHomeWorks] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!cache['homeworks']) {
            Promise.all([axios.get(endpoints.teacher.get_homeworks_by_class(id))])
                .then((response) => {
                    const homeworks = response[0];
                    setHomeWorks({
                        current: homeworks.data.current_homeworks,
                        privous: homeworks.data.previous_homeworks,
                        future: homeworks.data.future_homeworks,
                    });
                    cache.homeworks = {
                        current: homeworks.data.current_homeworks,
                        privous: homeworks.data.other_homeworks,
                        future: homeworks.data.future_homeworks,
                    };
                })
                .then(() => {
                    setLoading(false);
                })
                .catch((error) => {
                    enqueueSnackbar(error.detail || error.message || 'خطا در دریافت اطلاعات', {
                        variant: 'error',
                    });
                    setLoading(false);
                });
        } else {
            setHomeWorks(cache.homeworks);
            setLoading(false);
        }
    }, []);

    return (
        <Box>
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh',
                    }}
                >
                    <LoadingScreen />
                </Box>
            ) : (
                <>
                    {' '}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            my: 3,
                            borderBottom: '1px solid black',
                            pb: 1,
                        }}
                    >
                        <Typography variant="h6">تکالیف جاری</Typography>
                        <Button
                            size="medium"
                            color="primary"
                            variant="contained"
                            startIcon={<Iconify icon="ic:baseline-add" />}
                            onClick={() => setOpen(true)}
                        >
                            تکلیف جدید
                        </Button>
                    </Box>
                    <ModifyHomework
                        classId={classId}
                        open={open}
                        setOpen={setOpen}
                        setHomeWorks={setHomeWorks}
                        homeworkId={id}
                        grade={getGradeNumber(grade)}
                    />
                    {homeWorks && (
                        <>
                            {homeWorks.current.length > 0 ? (
                                <>
                                    <Box
                                        gap={3}
                                        display="grid"
                                        gridTemplateColumns={{
                                            xs: 'repeat(1, 1fr)',
                                            sm: 'repeat(2, 1fr)',
                                            md: 'repeat(3, 1fr)',
                                        }}
                                    >
                                        {homeWorks.current.map((homework, index) => (
                                            <HomeworkFolder
                                                key={index}
                                                homework={homework}
                                                classId={classId}
                                                grade={grade}
                                            />
                                        ))}
                                    </Box>
                                </>
                            ) : (
                                <Card
                                    component="div"
                                    sx={{
                                        bgcolor: (theme) => alpha(theme.palette.background.default, 0.64),
                                        backdropFilter: `blur(2px)`,
                                        padding: '15px 20px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography>تکلیف جاری وجود ندارد</Typography>
                                </Card>
                            )}
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    my: 3,
                                    borderBottom: '1px solid black',
                                    pb: 1,
                                }}
                            >
                                <Typography variant="h6">تکالیف آینده</Typography>
                            </Box>
                            {homeWorks.other?.length > 0 ? (
                                <>
                                    {' '}
                                    <Box
                                        gap={3}
                                        display="grid"
                                        gridTemplateColumns={{
                                            xs: 'repeat(1, 1fr)',
                                            sm: 'repeat(2, 1fr)',
                                            md: 'repeat(3, 1fr)',
                                        }}
                                    >
                                        {homeWorks.future.map((homework, index) => (
                                            <>
                                                <HomeworkFolder key={index} homework={homework} />
                                            </>
                                        ))}
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Card
                                        component="div"
                                        sx={{
                                            bgcolor: (theme) => alpha(theme.palette.background.default, 0.64),
                                            backdropFilter: `blur(2px)`,
                                            padding: '15px 20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography>تکلیفی وجود ندارد</Typography>
                                    </Card>
                                </>
                            )}

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    my: 3,
                                    borderBottom: '1px solid black',
                                    pb: 1,
                                }}
                            >
                                <Typography variant="h6">تکالیف گذشته</Typography>
                            </Box>
                            {homeWorks?.privous?.length > 0 ? (
                                <>
                                    {' '}
                                    <Box
                                        gap={3}
                                        display="grid"
                                        gridTemplateColumns={{
                                            xs: 'repeat(1, 1fr)',
                                            sm: 'repeat(2, 1fr)',
                                            md: 'repeat(3, 1fr)',
                                        }}
                                    >
                                        {homeWorks.privous.map((homework, index) => (
                                            <>
                                                <HomeworkFolder key={index} homework={homework} />
                                            </>
                                        ))}
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Card
                                        component="div"
                                        sx={{
                                            bgcolor: (theme) => alpha(theme.palette.background.default, 0.64),
                                            backdropFilter: `blur(2px)`,
                                            padding: '15px 20px',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Typography>تکلیفی وجود ندارد</Typography>
                                    </Card>
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </Box>
    );
}

// ----------------------------------------------------------------------

function HomeworkFolder({ homework, classId, grade }) {
    return <HomeworkItem homework_item={homework} classId={classId} grade={grade} />;
}

HomeworkFolder.propTypes = {
    homework: PropTypes.object,
};
