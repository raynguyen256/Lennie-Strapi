import React from 'react';
import { Box, Typography } from '@strapi/design-system';

/**
 * Stat card đơn giản cho hub "Tổng quan". Phase 1 dùng mock số liệu
 * (xem pages/OverviewPage.jsx); phase 2 sẽ nối API thật.
 */
const StatCard = ({ label, value }) => (
  <Box padding={5} background="neutral0" hasRadius shadow="tableShadow" borderColor="neutral150" style={{ border: '1px solid' }}>
    <Typography variant="sigma" textColor="neutral600">
      {label.toUpperCase()}
    </Typography>
    <Box paddingTop={2}>
      <Typography variant="alpha" fontWeight="bold">
        {value}
      </Typography>
    </Box>
  </Box>
);

export default StatCard;
