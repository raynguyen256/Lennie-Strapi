import React from 'react';
import { Layouts } from '@strapi/strapi/admin';
import { Box } from '@strapi/design-system';
import HeroSection from './HeroSection';
import StatsGrid from './StatsGrid';
import DashboardPanels from './DashboardPanels';
import SectionBlock from './SectionBlock';

/**
 * Pattern UI chung cho mọi hub page: hero + stats + dashboard (nếu có) +
 * các section launcher. Bám sát layout của
 * plan/strapi-admin-navbar-ux-preview.html, render bằng @strapi/design-system
 * để giữ nguyên UI/design system gốc của Strapi.
 */
const HubPage = ({ hub }) => (
  <Layouts.Root>
    <Layouts.Header title={hub.label} subtitle={hub.description} />
    <Layouts.Content>
      <Box paddingLeft={8} paddingRight={8} paddingTop={4} paddingBottom={8}>
        <HeroSection heroLabel={hub.heroLabel} title={hub.title} description={hub.description} meta={hub.meta} />
        {hub.stats && <StatsGrid stats={hub.stats} />}
        {hub.dashboard && <DashboardPanels dashboard={hub.dashboard} />}
        {(hub.sections || []).map((section) => (
          <SectionBlock
            key={section.title}
            title={section.title}
            description={section.description}
            hint={section.hint}
            launchers={section.launchers}
          />
        ))}
      </Box>
    </Layouts.Content>
  </Layouts.Root>
);

export default HubPage;
