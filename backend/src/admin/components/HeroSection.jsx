import React from 'react';
import { Box, Flex, Typography } from '@strapi/design-system';

/**
 * Hero block đầu mỗi hub page: badge + title + description + meta pills.
 * Bám sát .hero trong plan/strapi-admin-navbar-ux-preview.html.
 */
const HeroSection = ({ heroLabel, title, description, meta }) => (
  <Box
    padding={7}
    marginBottom={4}
    background="neutral0"
    hasRadius
    shadow="tableShadow"
    borderColor="neutral150"
    style={{ border: '1px solid' }}
  >
    {heroLabel && (
      <Box
        paddingLeft={3}
        paddingRight={3}
        paddingTop={2}
        paddingBottom={2}
        hasRadius
        background="primary100"
        style={{ display: 'inline-block' }}
      >
        <Typography variant="sigma" textColor="primary600">
          {heroLabel.toUpperCase()}
        </Typography>
      </Box>
    )}
    <Box paddingTop={3}>
      <Typography variant="alpha" fontWeight="bold" as="h2">
        {title}
      </Typography>
    </Box>
    {description && (
      <Box paddingTop={2} maxWidth="56rem">
        <Typography variant="omega" textColor="neutral600">
          {description}
        </Typography>
      </Box>
    )}
    {meta && meta.length > 0 && (
      <Flex gap={2} paddingTop={4} wrap="wrap">
        {meta.map((item) => (
          <Box
            key={item}
            paddingLeft={3}
            paddingRight={3}
            paddingTop={2}
            paddingBottom={2}
            hasRadius
            background="neutral100"
            borderColor="neutral150"
            style={{ border: '1px solid' }}
          >
            <Typography variant="pi">{item}</Typography>
          </Box>
        ))}
      </Flex>
    )}
  </Box>
);

export default HeroSection;
