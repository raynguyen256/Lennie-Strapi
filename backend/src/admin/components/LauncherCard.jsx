import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Typography, Button } from '@strapi/design-system';
import { ArrowRight, Plus } from '@strapi/icons';
import {
  collectionTypeListPath,
  collectionTypeCreatePath,
  singleTypeEditPath,
} from '../utils/routes';

/**
 * Card launcher dùng cho mọi hub page: deep-link tới đúng screen gốc
 * của Strapi (Content Manager) thay vì viết CRUD riêng ở phase 1.
 *
 * Copy/tag/2-button layout bám sát plan/strapi-admin-navbar-ux-preview.html.
 * Khi `secondaryAction` là 'same-as-primary' (preview chỉ minh hoạ ý định,
 * vd "Lọc mới", "Xem maps", chưa có filter/screen riêng ở phase 1), nút phụ
 * vẫn trỏ đúng tới primary path để không bao giờ là dead-link.
 */
const LauncherCard = ({ launcher }) => {
  const navigate = useNavigate();

  const primaryPath = launcher.externalPath
    ? launcher.externalPath
    : launcher.type === 'single'
      ? singleTypeEditPath(launcher.uid)
      : collectionTypeListPath(launcher.uid);

  const primaryLabel = launcher.primaryLabel || (launcher.type === 'single' ? 'Chỉnh sửa' : 'Mở danh sách');

  const secondaryPath =
    launcher.secondaryAction === 'create' && launcher.uid
      ? collectionTypeCreatePath(launcher.uid)
      : primaryPath;

  return (
    <Box
      padding={5}
      background="neutral0"
      hasRadius
      shadow="tableShadow"
      borderColor="neutral150"
      style={{ border: '1px solid' }}
    >
      <Flex direction="column" alignItems="stretch" gap={3}>
        <Flex justifyContent="space-between" alignItems="flex-start" gap={3}>
          <Box
            width="2.8rem"
            height="2.8rem"
            background="primary100"
            hasRadius
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}
          >
            {launcher.icon}
          </Box>
          {launcher.tag && (
            <Box
              paddingLeft={2}
              paddingRight={2}
              paddingTop={1}
              paddingBottom={1}
              hasRadius
              background="neutral100"
              borderColor="neutral150"
              style={{ border: '1px solid' }}
            >
              <Typography variant="sigma" textColor="primary600">
                {launcher.tag}
              </Typography>
            </Box>
          )}
        </Flex>
        <Box>
          <Typography variant="delta" fontWeight="bold">
            {launcher.title}
          </Typography>
          <Box paddingTop={1}>
            <Typography variant="pi" textColor="neutral600">
              {launcher.description}
            </Typography>
          </Box>
        </Box>
        <Flex gap={2} wrap="wrap">
          <Button size="S" endIcon={<ArrowRight />} onClick={() => navigate(primaryPath)}>
            {primaryLabel}
          </Button>
          {launcher.secondaryAction && (
            <Button
              size="S"
              variant="tertiary"
              startIcon={launcher.secondaryAction === 'create' ? <Plus /> : undefined}
              onClick={() => navigate(secondaryPath)}
            >
              {launcher.secondaryLabel || 'Tạo mới'}
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default LauncherCard;
