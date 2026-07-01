import React from 'react';
import { Box, Flex, Grid, Typography } from '@strapi/design-system';
import LauncherCard from './LauncherCard';

/**
 * Render 1 section trong hub page (vd "Nội dung chính" / "Thiết lập nâng cao")
 * với header + hint badge + grid card launcher, bám sát .section trong
 * plan/strapi-admin-navbar-ux-preview.html.
 */
const SectionBlock = ({ title, description, hint, launchers }) => (
  <Box
    padding={6}
    marginBottom={4}
    background="neutral0"
    hasRadius
    shadow="tableShadow"
    borderColor="neutral150"
    style={{ border: '1px solid' }}
  >
    <Flex justifyContent="space-between" alignItems="flex-end" gap={4} paddingBottom={5} wrap="wrap">
      <Box>
        <Typography variant="beta">{title}</Typography>
        {description && (
          <Box paddingTop={1}>
            <Typography variant="omega" textColor="neutral600">
              {description}
            </Typography>
          </Box>
        )}
      </Box>
      {hint && (
        <Box
          paddingLeft={3}
          paddingRight={3}
          paddingTop={2}
          paddingBottom={2}
          hasRadius
          background="neutral100"
          borderColor="neutral150"
          style={{ border: '1px solid', flexShrink: 0 }}
        >
          <Typography variant="pi" textColor="primary600">
            {hint}
          </Typography>
        </Box>
      )}
    </Flex>
    <Grid.Root gap={4}>
      {launchers.map((launcher) => (
        <Grid.Item key={launcher.key} col={6} s={12} xs={12}>
          <LauncherCard launcher={launcher} />
        </Grid.Item>
      ))}
    </Grid.Root>
  </Box>
);

export default SectionBlock;
