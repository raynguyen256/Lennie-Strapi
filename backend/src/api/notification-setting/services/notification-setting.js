'use strict';

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::notification-setting.notification-setting');
