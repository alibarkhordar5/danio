import PropTypes from 'prop-types';
// @mui
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import Timeline from '@mui/lab/Timeline';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import ListItemText from '@mui/material/ListItemText';
// utils
import { fPersianDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

export default function ClassTimeline({ title, subheader, list, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Timeline
        sx={{
          m: 0,
          p: 3,
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }}
      >
        {list &&
          list.map((item, index) => (
            <ClassTimelineItem key={item.id} item={item} lastTimeline={index === list.length - 1} />
          ))}
      </Timeline>
    </Card>
  );
}

ClassTimeline.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function ClassTimelineItem({ item, lastTimeline }) {
  const { type, title, description, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === 'homework' && 'info') ||
            (type === 'quiz' && 'warning') ||
            (type === 'exam' && 'error') ||
            'primary'
          }
        />
        {lastTimeline ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <ListItemText
          primary={title}
          secondary={description}
          primaryTypographyProps={{ typography: 'subtitle2' }}
          secondaryTypographyProps={{
            typography: 'caption',
          }}
        />
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {fPersianDate(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

ClassTimeline.propTypes = {
  item: PropTypes.object,
  lastTimeline: PropTypes.bool,
};
