import React from 'react';
import { Box, Grid, Typography } from '@strapi/design-system';
import LauncherCard from './LauncherCard';

/**
 * Render 1 section trong hub page ("Nội dung chính" hoặc "Thiết lập nâng cao")
 * với grid card launcher bên trong.
 */
const SectionBlock = ({ title, launchers }) => (
  <Box paddingBottom={6}>
    <Box paddingBottom={3}>
      <Typography variant="sigma" textColor="neutral600">
        {title.toUpperCase()}
      </Typography>
    </Box>
    <Grid.Root gap={4}>
      {launchers.map((launcher) => (
        <Grid.Item key={launcher.key} col={4} s={6} xs={12}>
          <LauncherCard launcher={launcher} />
        </Grid.Item>
      ))}
    </Grid.Root>
  </Box>
);

export default SectionBlock;
