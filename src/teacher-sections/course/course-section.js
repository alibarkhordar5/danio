import React from 'react';
// @mui
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';
// components
import Iconify from 'src/components/iconify';
import Label from 'src/components/label';
import { toFarsiNumber } from 'src/utils/format-number-persian';
// theme
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

function getRandomArbitrary(index) {
  return index % 3;
}

const COLORS = ['warning', 'success', 'secondary'];
const LEVELS = ['مبتدی', 'متوسط', 'پیشرفته'];

// ----------------------------------------------------------------------

function RenderSkill({ skill, number }) {
  const [lock, setLock] = React.useState(false);

  return (
    <Stack direction="row" alignItems="center" my={2}>
      <ListItemText
        primary={`${toFarsiNumber(number)}. ${skill}`}
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle2',
        }}
      />
      <IconButton color={lock ? 'secondary.main' : 'primary.main'} onClick={() => setLock((prev) => !prev)}>
        <Iconify icon={lock ? 'solar:lock-keyhole-linear' : 'solar:lock-keyhole-minimalistic-unlocked-linear'} />
      </IconButton>
    </Stack>
  );
}

function RenderSectionCard({ section }) {
  return (
    <Card>
      <CardHeader title={section.title} />
      <Divider sx={{ m: 3, borderStyle: 'dashed' }} />
      <CardContent sx={{ pt: 0 }}>
        {section.skills.map((skill, index) => (
          <RenderSkill key={index} skill={skill} number={index + 1} />
        ))}
      </CardContent>
    </Card>
  );
}

export default function CourseSection({ course }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Paper
        sx={{
          borderRadius: 2,
          cursor: 'pointer',
          position: 'relative',
          p: { xs: 2.5, sm: 2 },
          mb: 2,
          '&:hover': {
            boxShadow: (theme) => theme.customShadows.z20,
          },
          boxShadow: (theme) => theme.customShadows.z8,
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          ...bgGradient({
            direction: '135deg',
            startColor: alpha(theme.palette.primary.light, 0.16),
            endColor: alpha(theme.palette.primary.lighter, 0.2),
          }),
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" px={{ xs: 0, md: 2 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Iconify icon={course.icon} width={36} height={36} sx={{ mr: 1.5, color: 'text.secondary' }} />
            <Typography variant="h6">{course.title}</Typography>
          </Stack>

          <IconButton color="inherit" onClick={() => setOpen((prev) => !prev)}>
            <Iconify icon={open ? 'eva:arrow-ios-upward-outline' : 'eva:arrow-ios-downward-outline'} />
          </IconButton>
        </Stack>
      </Paper>

      <Collapse in={open} unmountOnExit>
        <Grid container spacing={2}>
          {course.sections?.map((section, index) => (
            <Grid item xs={12} md={6} key={index}>
              <RenderSectionCard section={section} />
            </Grid>
          ))}
        </Grid>
      </Collapse>
    </div>
  );
}
