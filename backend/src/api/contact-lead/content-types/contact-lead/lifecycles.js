'use strict';

const { notifyStaff } = require('../../../../utils/notify');

module.exports = {
  async afterCreate(event) {
    try {
      await notifyStaff({
        title: '💬 Lead tư vấn mới',
        lines: [
          `Khách: ${event.result.name} - ${event.result.phone}`,
          `Quan tâm: ${event.result.serviceInterest || 'Chưa rõ'}`,
          `Tình trạng da: ${event.result.skinCondition}`,
          `Nguồn: ${event.result.source}`,
        ],
      });
    } catch (err) {
      strapi.log.error(`[notify] contact-lead afterCreate failed: ${err.message}`);
    }
  },
};
