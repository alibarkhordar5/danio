import PropTypes from 'prop-types';
// @mui
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
// components
import Chart, { useChart } from 'src/components/chart';
// util
import { toFarsiNumber } from 'src/utils/format-number-persian';

// ----------------------------------------------------------------------

export default function HomeworkPerformance({ title, chart, ...other }) {
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    colors,
    fill: {
      type: series.map((i) => i.fill),
    },
    labels,
    yaxis: {
      labels: {
        formatter: (value) => toFarsiNumber(value),
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value, series) => {
          const postFix = series['seriesIndex'] == 1 ? 'دقیقه' : 'امتیاز';
          if (typeof value !== 'undefined') {
            return `${postFix} ${toFarsiNumber(value)}`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <>
      <Card {...other}>
        <CardHeader title={title} />

        <Box sx={{ p: 3, pb: 1 }}>
          <Chart dir="ltr" type="line" series={series} options={chartOptions} height={364} />
        </Box>
      </Card>
    </>
  );
}

HomeworkPerformance.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
};
