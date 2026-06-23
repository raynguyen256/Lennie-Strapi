'use strict';

const { notifyStaff } = require('../../../../utils/notify');

module.exports = {
  async beforeCreate(event) {
    const { data } = event.params;

    try {
      if (data.serviceSlug) {
        const service = await strapi
          .query('api::service.service')
          .findOne({ where: { slug: data.serviceSlug } });
        if (service) data.service = service.id;
      }
      if (data.branchName) {
        const branch = await strapi
          .query('api::branch.branch')
          .findOne({ where: { name: data.branchName } });
        if (branch) data.branch = branch.id;
      }
    } catch (err) {
      strapi.log.warn(`[booking] could not resolve service/branch relation: ${err.message}`);
    }
  },

  async afterCreate(event) {
    try {
      await notifyStaff({
        title: '📅 Lịch hẹn mới',
        lines: [
          `Dịch vụ: ${event.result.serviceName || event.result.serviceSlug}`,
          `Cơ sở: ${event.result.branchName}`,
          `Ngày: ${event.result.date} - ${event.result.time}`,
          `Khách: ${event.result.customerName} - ${event.result.customerPhone}`,
        ],
      });
    } catch (err) {
      strapi.log.error(`[notify] booking afterCreate failed: ${err.message}`);
    }
  },
};
