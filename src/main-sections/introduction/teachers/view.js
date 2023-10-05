import { useScroll } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
// components
import ScrollProgress from 'src/components/scroll-progress';
//
import Hero from '../../components/hero';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <Hero title="دانیو" subtitle={['برای', 'معلمان', 'و', 'مشاوران']} />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <Container>
          <Typography
            variant="h4"
            sx={{
              my: 10,
            }}
          >
            Teachers
          </Typography>
        </Container>
      </Box>
    </>
  );
}
