import PropTypes from 'prop-types';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
// utils
import { fGrade } from 'src/utils/format-number';
// _mock
import { _socials } from 'src/_mock';
// assets
import { AvatarShape } from 'src/assets/illustrations';
// components
import Image from 'src/components/image';
import { toFarsiNumber } from 'src/utils/format-number-persian';

// ----------------------------------------------------------------------

export default function StudentProfileCard({ student }) {
    const theme = useTheme();

    // const {
    //   first_name,
    //   last_name,
    //   avatar_url,
    //   cover_url,
    //   grade,
    //   school_name,
    //   class_name,
    //   rank,
    //   total_score,
    //   total_answered_question,
    //   total_correct_answer,
    // } = student;

    return (
        <Card sx={{ textAlign: 'center' }}>
            <Box sx={{ position: 'relative' }}>
                <AvatarShape
                    sx={{
                        left: 0,
                        right: 0,
                        zIndex: 10,
                        mx: 'auto',
                        bottom: -26,
                        position: 'absolute',
                    }}
                />

                <Avatar
                    alt={student?.first_name}
                    src={student?.profile_url || '/assets/images/avatar/avatar_5.jpg'}
                    sx={{
                        width: 64,
                        height: 64,
                        zIndex: 11,
                        left: 0,
                        right: 0,
                        bottom: -32,
                        mx: 'auto',
                        position: 'absolute',
                    }}
                />

                <Image
                    src={'/assets/background/overlay_3.jpg'}
                    alt={'/assets/background/overlay_3.jpg'}
                    ratio="16/9"
                    overlay={alpha(theme.palette.grey[900], 0.48)}
                />
            </Box>

            <Typography variant="subtitle1" sx={{ mt: 6, mb: 2 }}>
                {student?.first_name} {student?.last_name}
            </Typography>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 3, typography: 'subtitle1' }}>
                <div>
                    <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                        مدرسه
                    </Typography>
                    {student?.class.name}
                </div>

                <div>
                    <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                        کلاس
                    </Typography>

                    {student?.user?.school_name}
                </div>

                <div>
                    <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                        پایه
                    </Typography>
                    {fGrade(student?.class?.grade)}
                </div>
            </Box>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" sx={{ py: 3, typography: 'subtitle1' }}>
                <div>
                    <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                        مجموع امتیاز
                    </Typography>
                    {toFarsiNumber(student?.number_of_homeworks || 0)}
                </div>

                <div>
                    <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                        سؤالات حل شده
                    </Typography>

                    {toFarsiNumber(student?.number_of_homeworks_done || 0)}
                </div>

                <div>
                    <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                        سؤالات درست
                    </Typography>
                    {toFarsiNumber(student?.correct_answers || 0)}
                </div>
            </Box>
        </Card>
    );
}

StudentProfileCard.propTypes = {
    student: PropTypes.object,
};
