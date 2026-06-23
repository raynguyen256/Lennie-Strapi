'use strict';

const { notifyStaff } = require('../../../../utils/notify');

module.exports = {
  async afterCreate(event) {
    try {
      await notifyStaff({
        title: '🛒 Đơn hàng mới',
        lines: [
          `Mã: ${event.result.code}`,
          `Khách: ${event.result.customerName} - ${event.result.customerPhone}`,
          `Số lượng: ${event.result.itemCount}`,
          `Tổng: ${event.result.subtotal}đ`,
          `Thanh toán: ${event.result.paymentMethod}`,
        ],
      });
    } catch (err) {
      strapi.log.error(`[notify] order afterCreate failed: ${err.message}`);
    }
  },
};
