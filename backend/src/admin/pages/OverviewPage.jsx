import React from 'react';
import { Layouts } from '@strapi/strapi/admin';
import { Box, Grid, Typography } from '@strapi/design-system';
import StatCard from '../components/StatCard';
import QueueList from '../components/QueueList';
import SectionBlock from '../components/SectionBlock';
import { hubs } from '../data/hubs';

/**
 * Hub "Tổng quan": điểm vào đầu tiên cho admin non-tech.
 * Phase 1 dùng mock data để chốt UX; phase 2 sẽ nối API tổng hợp thật
 * (xem ghi chú trong plan/strapi-admin-navbar-ux-design-2026-06-29.md).
 */
const MOCK_STATS = [
  { label: 'Lead mới', value: '—' },
  { label: 'Booking mới', value: '—' },
  { label: 'Order mới', value: '—' },
  { label: 'Newsletter mới', value: '—' },
];

const QUICK_QUEUE = [
  { key: 'contact-lead', label: 'Lead mới', hint: 'Khách hàng vừa để lại thông tin liên hệ', uid: 'api::contact-lead.contact-lead' },
  { key: 'booking', label: 'Booking mới', hint: 'Khách hàng vừa đặt lịch hẹn', uid: 'api::booking.booking' },
  { key: 'order', label: 'Order mới', hint: 'Đơn hàng vừa được tạo', uid: 'api::order.order' },
];

const QUICK_EDIT_SECTION = {
  title: 'Chỉnh sửa nhanh',
  launchers: [
    { key: 'homepage', title: 'Trang chủ', description: 'Hero, stats, mantra', uid: 'api::homepage.homepage', type: 'single' },
    { key: 'contact-info', title: 'Thông tin liên hệ', description: 'Địa chỉ, giờ mở cửa, social', uid: 'api::contact-info.contact-info', type: 'single' },
    { key: 'general-setting', title: 'CTA / hotline', description: 'Hotline, Messenger, Zalo', uid: 'api::general-setting.general-setting', type: 'single' },
    { key: 'founder', title: 'Founder', description: 'Chân dung, bio, trust points', uid: 'api::founder.founder', type: 'single' },
  ],
};

const CONTENT_LIBRARY_SECTION = {
  title: 'Kho nội dung',
  launchers: [
    { key: 'service', title: 'Dịch vụ', description: 'Danh sách dịch vụ', uid: 'api::service.service', type: 'collection' },
    { key: 'product', title: 'Sản phẩm', description: 'Catalog sản phẩm', uid: 'api::product.product', type: 'collection' },
    { key: 'blog-post', title: 'Blog', description: 'Bài viết blog', uid: 'api::blog-post.blog-post', type: 'collection' },
    { key: 'testimonial', title: 'Đánh giá', description: 'Testimonial khách hàng', uid: 'api::testimonial.testimonial', type: 'collection' },
  ],
};

const OverviewPage = () => (
  <Layouts.Root>
    <Layouts.Header
      title={hubs.overview.label}
      subtitle="Shortcut theo tác vụ thường dùng — không cần nghĩ mình nên vào đâu."
    />
    <Layouts.Content>
      <Box paddingLeft={8} paddingRight={8} paddingTop={4}>
        <Box paddingBottom={3}>
          <Typography variant="sigma" textColor="neutral600">
            XỬ LÝ HÔM NAY
          </Typography>
        </Box>
        <Grid.Root gap={4} paddingBottom={6}>
          {MOCK_STATS.map((stat) => (
            <Grid.Item key={stat.label} col={3} s={6} xs={12}>
              <StatCard label={stat.label} value={stat.value} />
            </Grid.Item>
          ))}
        </Grid.Root>

        <Box paddingBottom={6}>
          <QueueList items={QUICK_QUEUE} />
        </Box>

        <SectionBlock title={QUICK_EDIT_SECTION.title} launchers={QUICK_EDIT_SECTION.launchers} />
        <SectionBlock title={CONTENT_LIBRARY_SECTION.title} launchers={CONTENT_LIBRARY_SECTION.launchers} />
      </Box>
    </Layouts.Content>
  </Layouts.Root>
);

export default OverviewPage;
