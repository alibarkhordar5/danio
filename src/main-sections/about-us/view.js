import { useScroll } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
// components
import ScrollProgress from 'src/components/scroll-progress';
import Hero from '../components/hero';
import AboutUsIntro from './about-us-intro';
import AboutUsTeam from './about-us-team';

// ----------------------------------------------------------------------

export default function HomeView() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <Hero title="دانیو" subtitle={['گامی', 'به‌سوی', 'عدالت آموزشی']} />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <Container sx={{ py: { xs: 10, md: 15 } }}>
          <AboutUsIntro />
          <AboutUsTeam />
        </Container>
      </Box>
    </>
  );
}
