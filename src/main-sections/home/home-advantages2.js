import { m } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
// @mui
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useTheme, alpha } from '@mui/material/styles';
import { CardHeader, Typography, Stack, CardContent, ListItem, Button, Box } from '@mui/material';
// components
import Chart, { useChart } from 'src/components/chart';
import { MotionViewport, varSlide } from 'src/components/animate';
// hooks
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

// ----------------------------------------------------------------------

const danioAdavantages = [
  {
    id: 0,
    title: 'برای اولیا',
    description: [
      'تجربه ی یادگیری لذت‌بخش برای فرزندان شما',
      'رقم زدن رشد پایدار تحصیلی',
      'اطلاع لحظه‌ای از وضعیت فرزندتان',
    ],
    imgUrl: '/assets/images/home/advantages/4.png',
    color: 'warning',
  },
  {
    id: 1,
    title: 'برای مدارس',
    description: [
      'جایگزینی با کیفیت برای کاربرگ ها و کتاب های کمک درسی',
      'گزارش دهی از ریز عملکرد درسی دانش آموزان',
      'ارائه ی تحلیل جامع از وضعیت درسی مدرس',
    ],
    imgUrl: '/assets/images/home/advantages/3.png',
    color: 'error',
  },
  {
    id: 2,
    title: 'برای معلمان',
    description: ['محتوای مطابق با کتاب درسی', 'ارزیابی و تصحیح خودکار تکالیف', 'گزارش لحظه‌ای از عملکرد دانش‌آموزان'],
    imgUrl: '/assets/images/home/advantages/2.png',
    color: 'info',
  },
  {
    id: 3,
    title: 'برای دانش‌آموزان',
    description: [
      'سوالات جذاب و تعاملی',
      'تمرین‌های گام به گام با راه‌حل تشریحی',
      'برنامه ی درسی اختصاصی',
      'توجه به تفاوت های فردی',
    ],
    imgUrl: '/assets/images/home/advantages/1.png',
    color: 'primary',
  },
];

// ----------------------------------------------------------------------

export default function HomeAdavantages2() {
  const theme = useTheme();

  const [selectedId, setSelectedId] = useState(3);

  // const [labels, setLabels] = useState(['دانش‌آموزان', 'معلمان', 'مدارس', 'اولیا']);
  const [labels, setLabels] = useState(['اولیا', 'مدارس', 'معلمان', 'دانش‌آموزان']);

  const [colors, setColors] = useState(['warning', 'error', 'info', 'primary']);

  const smDown = useResponsive('down', 'sm');

  const [height, setHeight] = useState(0);

  const ref = useRef(null);

  const offsetTop = useOffSetTop(height - 56);

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  });

  const [y, setY] = useState(window.scrollY);

  const rotateArray = (arr, k) => arr.slice(k).concat(arr.slice(0, k));

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      const gap = smDown ? 16 : 8;
      if (offsetTop) {
        if (window.scrollY > y + gap) {
          if (selectedId > 0) {
            setSelectedId((selectedId - 1) % 4);
            setLabels(rotateArray(labels, -1));
            setColors(rotateArray(colors, -1));
          }
          setY(window.scrollY);
        }
        if (y > window.scrollY + gap) {
          if (selectedId < 3) {
            setSelectedId((selectedId + 1) % 4);
            setLabels(rotateArray(labels, 1));
            setColors(rotateArray(colors, 1));
          }
          setY(window.scrollY);
        }
      }
    },
    [y, selectedId, offsetTop]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener('scroll', handleNavigation);

    return () => {
      window.removeEventListener('scroll', handleNavigation);
    };
  }, [handleNavigation]);

  const chartOptions = useChart({
    labels: labels,
    colors: colors.map((c, index) => {
      if (index !== 3) return alpha(theme.palette[c].main, 0.76);
      return theme.palette[c].main;
    }),
    chart: {
      events: {
        dataPointSelection: function (event, chartContext, config) {
          setSelectedId(config.dataPointIndex);
        },
        // mounted: function (chartContext) {
        //   chartContext.toggleDataPointSelection(3);
        // },
      },
      // animations: {
      //   enabled: false,
      // },
      selection: {
        enabled: true,
        stroke: {
          color: '#FFF',
        },
      },
    },
    stroke: {
      show: true,
      curve: 'smooth',
      width: 8,
      color: '#FFF',
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: true,
      formatter: (val, opt) => opt.w.globals.labels[opt.seriesIndex],
      dropShadow: {
        enabled: false,
      },
      style: {
        fontSize: '16px',
        fontWeight: 'bold',
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: '5%',
          labels: {
            show: false,
          },
        },
        // expandOnClick: true,
      },
    },
  });

  return (
    <Container
      ref={ref}
      sx={{
        py: 4,
      }}
    >
      <Box component={MotionViewport}>
        <Typography
          variant="h3"
          textAlign="center"
          sx={{ mb: { xs: 0, md: 4 } }}
          component={m.div}
          variants={varSlide().inDown}
        >
          چرا دانیو؟
        </Typography>
        <Grid container spacing={4} py={{ xs: 0, md: 4 }}>
          <Grid item xs={12} md={1.5}></Grid>
          <Grid
            component={m.div}
            variants={varSlide().inRight}
            item
            xs={12}
            md={5}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <Chart type="donut" series={[16.66, 16.66, 16.66, 50]} width={480} options={chartOptions} />
          </Grid>
          <Grid component={m.div} variants={varSlide().inLeft} item xs={12} md={4}>
            <HomeAdavantageCard data={danioAdavantages[selectedId]} color={colors[selectedId]} />
          </Grid>
          <Grid item xs={12} md={1.5}></Grid>
        </Grid>
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------

function HomeAdavantageCard({ data, color }) {
  const theme = useTheme();

  return (
    <Stack key={data?.id} sx={{ height: 1 }}>
      <Card
        sx={{
          background: alpha(theme.palette[data.color].main, 0.12),
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          height: '520px',
          backdropFilter: 'blur(4px)',
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

          <Box
            component={'img'}
            src={data?.imgUrl}
            sx={{
              zIndex: 1,
              width: 128,
              position: 'relative',
              display: 'flex',
              mx: 'auto',
              my: 2,
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))',
            }}
          />
        </CardContent>
        <Button variant="contained" color={data.color} sx={{ display: 'flex', mx: 'auto', mb: 4 }}>
          اطلاعات بیشتر
        </Button>
      </Card>
    </Stack>
  );
}
