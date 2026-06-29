import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Typography, Button } from '@strapi/design-system';
import { ArrowRight } from '@strapi/icons';
import { collectionTypeListPath } from '../utils/routes';

/**
 * Danh sách "Xử lý hôm nay" trên hub Tổng quan: mỗi item là 1 shortcut
 * tới list view (đã filter ở phase 2) của 1 content type vận hành.
 */
const QueueList = ({ items }) => {
  const navigate = useNavigate();

  return (
    <Flex direction="column" alignItems="stretch" gap={2}>
      {items.map((item) => (
        <Box
          key={item.key}
          padding={4}
          background="neutral0"
          hasRadius
          borderColor="neutral150"
          style={{ border: '1px solid' }}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Typography fontWeight="bold">{item.label}</Typography>
              <Typography variant="pi" textColor="neutral600">
                {item.hint}
              </Typography>
            </Box>
            <Button
              size="S"
              variant="tertiary"
              endIcon={<ArrowRight />}
              onClick={() => navigate(collectionTypeListPath(item.uid))}
            >
              Xem
            </Button>
          </Flex>
        </Box>
      ))}
    </Flex>
  );
};

export default QueueList;
