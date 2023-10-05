import { useScroll } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import { useTheme, alpha } from '@mui/material/styles';

// components
import ScrollProgress from 'src/components/scroll-progress';

//
import { bgGradient } from 'src/theme/css';

import HomeHero from './home-hero';
import HomeHero2 from './home-hero2';
import HomeHero3 from './home-hero3';

import HomeAdavantages from './home-advantages';
import HomeAdavantages2 from './home-advantages2';

import HomeStatistics from './home-statistics';
import HomeStatistics2 from './home-statistics2';

import HomeTrustedCompany from './home-trusted-company';

import HomeStudentReview from './home-students-review';
import HomeTeacherReview from './home-teachers-review';

import HomeQuestion from './home-question';
import HomeIntroductionVideo from './home-intro-video';

// ----------------------------------------------------------------------

export default function HomeView() {
    const { scrollYProgress } = useScroll();

  const theme = useTheme();

  return (
    <>
      <ScrollProgress scrollYProgress={scrollYProgress} />

            <HomeHero />

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <Box
          sx={{
            ...bgGradient({
              startColor: alpha(theme.palette.background.default, 0.5),
              endColor: alpha(theme.palette.background.default, 0.5),
              imgUrl: '/assets/background/home-pattern.png',
            }),
          }}
        >
          <HomeAdavantages2 />

          <HomeQuestion />
        </Box>

        <HomeIntroductionVideo />

        <Box
          sx={{
            ...bgGradient({
              startColor: alpha(theme.palette.background.default, 0.5),
              endColor: alpha(theme.palette.background.default, 0.5),
              imgUrl: '/assets/background/home-pattern.png',
            }),
          }}
        >
          <HomeStudentReview />

          <HomeTeacherReview />
        </Box>

        <HomeTrustedCompany />
      </Box>
    </>
  );
}
