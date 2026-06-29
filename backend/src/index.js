'use strict';

const { seed, seedSkinResults } = require('./seed');
const { seedAdminLayouts } = require('./admin-layouts');

const COLLECTION_PERMISSIONS = [
  'service',
  'product',
  'testimonial',
  'skin-result',
  'faq',
  'blog-post',
  'team-member',
  'partner-brand',
  'service-category',
  'skin-concern',
  'result-type',
  'testimonial-topic',
  'faq-category',
  'product-tag',
  'branch',
];

const SINGLE_TYPE_PERMISSIONS = ['general-setting', 'contact-info', 'homepage', 'founder'];

async function setPublicPermissions(strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });

  if (!publicRole) return;

  const existing = await strapi
    .query('plugin::users-permissions.permission')
    .findMany({ where: { role: publicRole.id } });
  const existingActions = new Set(existing.map((p) => p.action));

  const toCreate = [];

  for (const name of COLLECTION_PERMISSIONS) {
    for (const action of ['find', 'findOne']) {
      const actionName = `api::${name}.${name}.${action}`;
      if (!existingActions.has(actionName)) {
        toCreate.push({ action: actionName, role: publicRole.id });
      }
    }
  }

  for (const name of SINGLE_TYPE_PERMISSIONS) {
    const actionName = `api::${name}.${name}.find`;
    if (!existingActions.has(actionName)) {
      toCreate.push({ action: actionName, role: publicRole.id });
    }
  }

  await Promise.all(
    toCreate.map((data) => strapi.query('plugin::users-permissions.permission').create({ data }))
  );

  if (toCreate.length) {
    strapi.log.info(`[bootstrap] granted ${toCreate.length} public permission(s)`);
  }
}

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    await setPublicPermissions(strapi);

    try {
      await seed(strapi);
    } catch (err) {
      strapi.log.error(`[seed] failed: ${err.message}`);
      strapi.log.error(err.stack);
    }

    try {
      await seedSkinResults(strapi);
    } catch (err) {
      strapi.log.error(`[seed] skin-results failed: ${err.message}`);
      strapi.log.error(err.stack);
    }

    try {
      await seedAdminLayouts(strapi);
    } catch (err) {
      strapi.log.error(`[admin-layouts] failed: ${err.message}`);
    }
  },
};
