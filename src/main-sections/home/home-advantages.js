import { m } from 'framer-motion';
// @mui
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import { useTheme, alpha } from '@mui/material/styles';
import { CardHeader, Typography, Stack, CardContent, ListItem } from '@mui/material';
// components
import { MotionContainer, varSlide } from 'src/components/animate';
// data
import { danioAdavantages } from 'src/assets/data/home-advantages';
//
import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function HomeAdavantages() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" textAlign="center">
        چرا دانیو؟
      </Typography>
      <MotionContainer>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
          sx={{ alignItems: 'stretch', my: { xs: 4, md: 10 } }}
        >
          {danioAdavantages.map((adv, index) => (
            <Box component={m.div} variants={varSlide().inUp} key={index}>
              <HomeAdavantageCard data={adv} />
            </Box>
          ))}
        </Box>
      </MotionContainer>
    </Container>
  );
}

// ----------------------------------------------------------------------

function HomeAdavantageCard({ data }) {
  const theme = useTheme();

  return (
    <Stack key={data?.id} sx={{ height: 1 }}>
      <Box
        component={m.img}
        src={data?.imgUrl}
        sx={{
          zIndex: 1,
          width: '56%',
          position: 'relative',
          mx: 'auto',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))',
        }}
      />
      <Card
        sx={{
          pt: 16,
          mt: -16,
          // background: alpha(theme.palette.primary.main, 0.08),

          background: `linear-gradient(135deg,
            ${alpha(theme.palette.background.default, 0.9)},
            ${alpha(theme.palette.primary.lighter, 0.2)},
            ${alpha(theme.palette.primary.main, 0.08)},
            ${alpha(theme.palette.primary.light, 0.12)})`,

          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          height: '100%',
        }}
      >
        <CardHeader title={data?.title} />
        <CardContent>
          {data?.description &&
            data.description.map((d, index) => (
              <ListItem key={index} sx={{ display: 'list-item' }}>
                {d}
              </ListItem>
            ))}
        </CardContent>
      </Card>
    </Stack>
  );
}
