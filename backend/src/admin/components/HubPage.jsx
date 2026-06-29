import React from 'react';
import { Layouts } from '@strapi/strapi/admin';
import { Box } from '@strapi/design-system';
import SectionBlock from './SectionBlock';

/**
 * Pattern UI chung cho mọi hub page: header + các section launcher.
 * Dùng `Layouts` của Strapi admin để giữ đúng spacing/typography gốc.
 */
const HubPage = ({ hub }) => (
  <Layouts.Root>
    <Layouts.Header title={hub.label} subtitle={hub.description} />
    <Layouts.Content>
      <Box paddingLeft={8} paddingRight={8} paddingTop={4}>
        {(hub.sections || []).map((section) => (
          <SectionBlock key={section.title} title={section.title} launchers={section.launchers} />
        ))}
      </Box>
    </Layouts.Content>
  </Layouts.Root>
);

export default HubPage;
