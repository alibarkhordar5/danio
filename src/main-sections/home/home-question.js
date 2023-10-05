import { m } from 'framer-motion';
// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { MotionViewport, varFade } from 'src/components/animate';
// import Question from 'src/student-sections/question/question-main';

// ----------------------------------------------------------------------

export default function HomeQuestion() {
  return (
    <Container component={MotionViewport} sx={{ pb: 8 }}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h3" textAlign="center" sx={{ mb: 4 }}>
          حل سؤال
        </Typography>
        {/* <Question /> */}
      </m.div>
    </Container>
  );
}
