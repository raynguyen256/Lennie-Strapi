import React from 'react';
import { Box, Flex, Grid, Typography } from '@strapi/design-system';

/**
 * 3 dashboard card cho hub "Tổng quan" (việc cần xử lý, doanh thu, nội dung
 * tháng này), bám sát .dashboard trong plan/strapi-admin-navbar-ux-preview.html.
 * Phase 1 dùng mock data trong data/hubs.js; phase 2 sẽ nối API tổng hợp thật.
 */
const QueuePanel = ({ data }) => (
  <Box padding={5} background="neutral0" hasRadius shadow="tableShadow" borderColor="neutral150" style={{ border: '1px solid' }}>
    <Typography variant="delta" fontWeight="bold">
      {data.title}
    </Typography>
    <Box paddingTop={1} paddingBottom={4}>
      <Typography variant="pi" textColor="neutral600">
        {data.description}
      </Typography>
    </Box>
    <Flex direction="column" alignItems="stretch" gap={2}>
      {data.items.map((item, index) => (
        <Box key={item.title} padding={3} hasRadius background="neutral100" borderColor="neutral150" style={{ border: '1px solid' }}>
          <Flex justifyContent="space-between" alignItems="center" gap={2}>
            <Typography variant="omega" fontWeight="bold">
              {item.title}
            </Typography>
            <Box
              paddingLeft={2}
              paddingRight={2}
              paddingTop={1}
              paddingBottom={1}
              hasRadius
              background={index % 2 === 0 ? 'warning100' : 'primary100'}
              style={{ flexShrink: 0 }}
            >
              <Typography variant="pi" fontWeight="bold" textColor={index % 2 === 0 ? 'warning600' : 'primary600'}>
                {item.status}
              </Typography>
            </Box>
          </Flex>
          <Box paddingTop={1}>
            <Typography variant="pi" textColor="neutral600">
              {item.meta}
            </Typography>
          </Box>
        </Box>
      ))}
    </Flex>
    {data.note && (
      <Box paddingTop={3}>
        <Typography variant="pi" textColor="neutral500">
          {data.note}
        </Typography>
      </Box>
    )}
  </Box>
);

const MetricPanel = ({ data }) => (
  <Box padding={5} background="neutral0" hasRadius shadow="tableShadow" borderColor="neutral150" style={{ border: '1px solid' }}>
    <Typography variant="delta" fontWeight="bold">
      {data.title}
    </Typography>
    <Box paddingTop={1} paddingBottom={4}>
      <Typography variant="pi" textColor="neutral600">
        {data.description}
      </Typography>
    </Box>
    <Flex direction="column" alignItems="stretch" gap={2}>
      {data.metrics.map((metric) => (
        <Flex
          key={metric.label}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
          padding={3}
          hasRadius
          background="neutral100"
          borderColor="neutral150"
          style={{ border: '1px solid' }}
        >
          <Box>
            <Typography variant="omega" fontWeight="bold">
              {metric.label}
            </Typography>
            <Box paddingTop={1}>
              <Typography variant="pi" textColor="neutral600">
                {metric.note}
              </Typography>
            </Box>
          </Box>
          <Typography variant="beta" fontWeight="bold" textColor="primary600">
            {metric.value}
          </Typography>
        </Flex>
      ))}
    </Flex>
    {data.note && (
      <Box paddingTop={3}>
        <Typography variant="pi" textColor="neutral500">
          {data.note}
        </Typography>
      </Box>
    )}
  </Box>
);

const DashboardPanels = ({ dashboard }) => {
  if (!dashboard) return null;

  return (
    <Box marginBottom={4}>
      <Grid.Root gap={4}>
        <Grid.Item col={5} s={12} xs={12}>
          <QueuePanel data={dashboard.operations} />
        </Grid.Item>
        <Grid.Item col={4} s={12} xs={12}>
          <MetricPanel data={dashboard.revenue} />
        </Grid.Item>
        <Grid.Item col={3} s={12} xs={12}>
          <MetricPanel data={dashboard.editorial} />
        </Grid.Item>
      </Grid.Root>
    </Box>
  );
};

export default DashboardPanels;
