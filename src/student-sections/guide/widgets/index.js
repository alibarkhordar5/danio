import React from 'react';
// @mui
import Grid from '@mui/material/Unstable_Grid2';
// components
import AnalyticsWidgetSummary from './analytics-widget-summary';

export default function OverviewWidgets() {
  return (
    <Grid container spacing={2}>
      <Grid xs={6} md={3}>
        <AnalyticsWidgetSummary
          title="سازمان‌ها"
          total={714000}
          icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
        />
      </Grid>

      <Grid xs={6} md={3}>
        <AnalyticsWidgetSummary
          title="مدارس"
          total={1352831}
          color="info"
          icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
        />
      </Grid>

      <Grid xs md={3}>
        <AnalyticsWidgetSummary
          title="معلمان"
          total={1723315}
          color="warning"
          icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
        />
      </Grid>

      <Grid xs={6} md={3}>
        <AnalyticsWidgetSummary
          title="دانش‌آموزان"
          total={234}
          color="error"
          icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
        />
      </Grid>
    </Grid>
  );
}
