'use strict';

async function getSettings(strapi) {
  const settings = await strapi
    .query('api::notification-setting.notification-setting')
    .findOne({});
  return settings || {};
}

async function sendZalo(settings, message) {
  if (!settings.enableZalo || !settings.zaloAccessToken || !settings.zaloOaUserId) return;

  const res = await fetch('https://openapi.zalo.me/v3.0/oa/message/cs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      access_token: settings.zaloAccessToken,
    },
    body: JSON.stringify({
      recipient: { user_id: settings.zaloOaUserId },
      message: { text: message },
    }),
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) {
    throw new Error(`Zalo API responded ${res.status}`);
  }
}

async function sendMessenger(settings, message) {
  if (!settings.enableMessenger || !settings.messengerPageToken || !settings.messengerRecipientId) return;

  const url = `https://graph.facebook.com/v19.0/me/messages?access_token=${encodeURIComponent(
    settings.messengerPageToken
  )}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipient: { id: settings.messengerRecipientId },
      message: { text: message },
    }),
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) {
    throw new Error(`Messenger API responded ${res.status}`);
  }
}

async function notifyStaff({ title, lines }) {
  const message = [title, ...(lines || [])].join('\n');

  let settings;
  try {
    settings = await getSettings(strapi);
  } catch (err) {
    strapi.log.warn(`[notify] could not load notification-setting: ${err.message}`);
    return;
  }

  const results = await Promise.allSettled([
    sendZalo(settings, message),
    sendMessenger(settings, message),
  ]);

  results.forEach((result, idx) => {
    if (result.status === 'rejected') {
      const channel = idx === 0 ? 'zalo' : 'messenger';
      strapi.log.warn(`[notify] ${channel} send failed: ${result.reason?.message || result.reason}`);
    }
  });
}

module.exports = { notifyStaff };
