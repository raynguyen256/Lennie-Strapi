'use strict';

const { notifyStaff } = require('../../../../utils/notify');

module.exports = {
  async afterCreate(event) {
    try {
      await notifyStaff({
        title: '📧 Đăng ký nhận tin mới',
        lines: [`Email: ${event.result.email}`],
      });
    } catch (err) {
      strapi.log.error(`[notify] newsletter-subscriber afterCreate failed: ${err.message}`);
    }
  },
};
