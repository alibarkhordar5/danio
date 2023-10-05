import { useEffect, useState, useRef } from 'react';
import { useScroll, useSpring } from 'framer-motion';
// mui
import { useTheme, alpha } from '@mui/material/styles';
import { Paper, Stack, Divider, Typography, Container } from '@mui/material';
// utils
import { toFarsiNumber } from 'src/utils/format-number-persian';
//
import { useResponsive } from 'src/hooks/use-responsive';
import { useOnScreen } from 'src/hooks/use-on-screen';

// ----------------------------------------------------------------------

const STATISTICS = [
  {
    id: 1,
    title: 'مدت زمان تمرین',
    number: 80_000,
  },
  {
    id: 2,
    title: 'سؤالات حل شده',
    number: 150_000,
  },
];

// ----------------------------------------------------------------------

export default function HomeStatistics() {
  const theme = useTheme();
  const smDown = useResponsive('down', 'sm');

  const ref = useRef(null);
  const isVisible = useOnScreen(ref);
  console.log('isVisible', isVisible);

  return (
    <Paper
      ref={ref}
      sx={{
        background: alpha(theme.palette.primary.lighter, 0.4),
        overflow: 'unset',
        width: '100%',
        maxWidth: 560,
        backdropFilter: 'blur(4px)',
        mx: 'auto',
      }}
    >
      <Container>
        <Stack
          direction={smDown ? 'column' : 'row'}
          justifyContent="space-around"
          divider={<Divider orientation={smDown ? 'horizontal' : 'vertical'} flexItem sx={{ borderStyle: 'dashed' }} />}
          sx={{ py: 3 }}
        >
          {STATISTICS.map((s, index) => (
            <StatisticItem data={s} isVisible={isVisible} key={index} />
          ))}
        </Stack>
      </Container>
    </Paper>
  );
}

// ----------------------------------------------------------------------

export function StatisticItem({ data, isVisible }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  const startCounter = () => {
    if (ref.current) clearInterval(ref.current);

    const id = setInterval(() => {
      setCount((prev) => (prev < data.number ? prev + 1000 : prev));
    }, 10);
    ref.current = id;
  };

  useEffect(() => {
    if (!ref.current && count < data.number && isVisible) startCounter();
  }, [isVisible]);

  useEffect(() => {
    if (ref.current && count >= data.number) clearInterval(ref.current);
  }, [count]);

  return (
    <Stack direction="column" sx={{ p: 2, display: 'flex', alignItems: 'center' }} key={data?.id}>
      <Typography variant="h4">{toFarsiNumber(count)}+</Typography>
      <Typography variant="subtitle2">{data?.title}</Typography>
    </Stack>
  );
}
