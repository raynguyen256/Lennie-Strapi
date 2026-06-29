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
 */
const LauncherCard = ({ launcher }) => {
  const navigate = useNavigate();

  const primaryPath = launcher.externalPath
    ? launcher.externalPath
    : launcher.type === 'single'
      ? singleTypeEditPath(launcher.uid)
      : collectionTypeListPath(launcher.uid);

  const primaryLabel = launcher.type === 'single' ? 'Chỉnh sửa' : 'Mở danh sách';

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
        <Flex gap={2}>
          <Button
            size="S"
            endIcon={<ArrowRight />}
            onClick={() => navigate(primaryPath)}
          >
            {primaryLabel}
          </Button>
          {launcher.secondaryAction === 'create' && launcher.uid && (
            <Button
              size="S"
              variant="tertiary"
              startIcon={<Plus />}
              onClick={() => navigate(collectionTypeCreatePath(launcher.uid))}
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
