import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
// @mui
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';
import CardHeader from '@mui/material/CardHeader';
import Card from '@mui/material/Card';
// components
import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// util
import { toFarsiNumber } from 'src/utils/format-number-persian';

// ----------------------------------------------------------------------

export default function ClassTimeStatistics({ title, chart, ...other }) {
  const { labels, colors, fills, series, options } = chart;

  const popover = usePopover();

  const [seriesData, setSeriesData] = useState('ماهانه');

  const chartOptions = useChart({
    colors,
    stroke: {
      show: true,
      width: 2,
      colors: fills.map((fill, index) => (fill !== 'gradient' ? 'transparent' : colors[index])),
    },
    fill: {
      type: fills.map((i) => i),
    },
    xaxis: {
      categories: (seriesData === 'هفتگی' && labels.week) || (seriesData === 'ماهانه' && labels.month),
    },
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
          const postFix = series['seriesIndex'] == 3 ? 'دقیقه' : 'امتیاز';
          if (typeof value !== 'undefined') {
            return `${postFix} ${toFarsiNumber(value)}`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  const handleChangeSeries = useCallback(
    (newValue) => {
      popover.onClose();
      setSeriesData(newValue);
    },
    [popover]
  );

  return (
    <>
      <Card {...other}>
        <CardHeader
          title={title}
          action={
            <ButtonBase
              onClick={popover.onOpen}
              sx={{
                pl: 1,
                py: 0.5,
                pr: 0.5,
                borderRadius: 1,
                typography: 'subtitle2',
                bgcolor: 'background.neutral',
              }}
            >
              {seriesData}

              <Iconify
                width={16}
                icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
                sx={{ ml: 0.5 }}
              />
            </ButtonBase>
          }
        />

        {series.map((item) => (
          <Box key={item.type} sx={{ mt: 3, mx: 3 }}>
            {item.type === seriesData && (
              <Chart dir="ltr" type="bar" series={item.data} options={chartOptions} height={364} />
            )}
          </Box>
        ))}
      </Card>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
        {series.map((option) => (
          <MenuItem
            key={option.type}
            selected={option.type === seriesData}
            onClick={() => handleChangeSeries(option.type)}
          >
            {option.type}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}

ClassTimeStatistics.propTypes = {
  chart: PropTypes.object,
  title: PropTypes.string,
};
