import React from 'react';
// @mui
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
// route
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { toFarsiNumber } from 'src/utils/format-number-persian';
// theme
import { bgGradient } from 'src/theme/css';
import { useNavigate } from 'react-router';

// ----------------------------------------------------------------------

function getRandomArbitrary(index) {
    return index % 3;
}

const COLORS = ['warning', 'success', 'secondary'];
const LEVELS = ['مبتدی', 'متوسط', 'پیشرفته'];

// ----------------------------------------------------------------------

function RenderSectionCard({ section }) {
    const router = useRouter();
    return (
        <Card>
            <CardHeader title={section.name} />
            <Divider sx={{ m: 3, borderStyle: 'dashed' }} />
            <CardContent sx={{ pt: 0 }}>
                {section.children.map((skill, index) => (
                    <Stack
                        onClick={() => skill.is_active && router.push(paths.student.question(skill.key))}
                        sx={{
                            cursor: skill.is_active ? 'pointer' : 'not-allowed',
                            opacity: skill.is_active ? '1' : '0.4',
                        }}
                        direction="row"
                        alignItems="center"
                        key={index}
                        my={2}
                    >
                        <ListItemText
                            primary={`${toFarsiNumber(index + 1)}. ${skill.name}`}
                            primaryTypographyProps={{
                                noWrap: true,
                                typography: 'subtitle2',
                            }}
                        />
                        <Stack direction="row" alignItems="center" sx={{ mx: 2 }} key={index} spacing={0.5}>
                            <Typography variant="subtitle2">{toFarsiNumber(skill.score || 0)}</Typography>
                            <Iconify icon="eva:star-fill" sx={{ color: 'warning.main' }} />
                        </Stack>
                        <Label color={COLORS[index % 3]} sx={{ width: 64 }}>
                            {LEVELS[index % 3]}
                        </Label>
                    </Stack>
                ))}
            </CardContent>
        </Card>
    );
}

export default function CourseSection({ course }) {
    const theme = useTheme();
    const smDown = useResponsive('down', 'sm');
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    return (
        <Card>
            <CardHeader title={'section.name'} />
            <Divider sx={{ m: 3, borderStyle: 'dashed' }} />
            <CardContent sx={{ pt: 0 }}>
                {/* {section.children.map((skill, index) => (
                <Stack
                    onClick={() => skill.is_active && router.push(paths.student.question(skill.key))}
                    sx={{
                        cursor: skill.is_active ? 'pointer' : 'not-allowed',
                        opacity: skill.is_active ? '1' : '0.4',
                    }}
                    direction="row"
                    alignItems="center"
                    key={index}
                    my={2}
                >
                    <ListItemText
                        primary={`${toFarsiNumber(index + 1)}. ${skill.name}`}
                        primaryTypographyProps={{
                            noWrap: true,
                            typography: 'subtitle2',
                        }}
                    />
                    <Stack direction="row" alignItems="center" sx={{ mx: 2 }} key={index} spacing={0.5}>
                        <Typography variant="subtitle2">{toFarsiNumber(skill.score || 0)}</Typography>
                        <Iconify icon="eva:star-fill" sx={{ color: 'warning.main' }} />
                    </Stack>
                    <Label color={COLORS[index % 3]} sx={{ width: 64 }}>
                        {LEVELS[index % 3]}
                    </Label>
                </Stack>
            ))} */}
            </CardContent>
        </Card>
    );
}
