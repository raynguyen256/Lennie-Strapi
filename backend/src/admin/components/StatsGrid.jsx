import React from 'react';
import { Box, Grid } from '@strapi/design-system';
import StatCard from './StatCard';

/**
 * Grid 4 stat card đầu mỗi hub page, bám sát .stats trong
 * plan/strapi-admin-navbar-ux-preview.html.
 */
const StatsGrid = ({ stats }) => (
  <Box marginBottom={4}>
    <Grid.Root gap={4}>
      {stats.map((stat) => (
        <Grid.Item key={stat.label} col={3} s={6} xs={12}>
          <StatCard label={stat.label} value={stat.value} />
        </Grid.Item>
      ))}
    </Grid.Root>
  </Box>
);

export default StatsGrid;
