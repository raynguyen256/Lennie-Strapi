'use strict';

const NOTIFICATION_SETTING_UID = 'api::notification-setting.notification-setting';

const notificationSettingConfig = {
  settings: {
    bulkable: true,
    filterable: true,
    searchable: true,
    pageSize: 10,
    relationOpenMode: 'modal',
    mainField: 'id',
    defaultSortBy: 'id',
    defaultSortOrder: 'ASC',
  },
  metadatas: {
    id: { edit: {}, list: { label: 'id', searchable: true, sortable: true } },
    enableZalo: {
      edit: { label: 'Bật Zalo OA', description: 'Bật để gửi thông báo qua Zalo OA', placeholder: '', visible: true, editable: true },
      list: { label: 'enableZalo', searchable: true, sortable: true },
    },
    zaloAccessToken: {
      edit: { label: 'Zalo Access Token', description: 'Access token của Zalo OA', placeholder: '', visible: true, editable: true },
      list: { label: 'zaloAccessToken', searchable: true, sortable: true },
    },
    zaloOaUserId: {
      edit: { label: 'Zalo OA User ID', description: 'user_id nhân viên nhận thông báo trên Zalo OA', placeholder: '', visible: true, editable: true },
      list: { label: 'zaloOaUserId', searchable: true, sortable: true },
    },
    enableMessenger: {
      edit: { label: 'Bật Messenger', description: 'Bật để gửi thông báo qua Messenger', placeholder: '', visible: true, editable: true },
      list: { label: 'enableMessenger', searchable: true, sortable: true },
    },
    messengerPageToken: {
      edit: { label: 'Messenger Page Token', description: 'Access token của Facebook Page', placeholder: '', visible: true, editable: true },
      list: { label: 'messengerPageToken', searchable: true, sortable: true },
    },
    messengerRecipientId: {
      edit: { label: 'Messenger Recipient ID', description: 'PSID nhân viên nhận thông báo qua Messenger', placeholder: '', visible: true, editable: true },
      list: { label: 'messengerRecipientId', searchable: true, sortable: true },
    },
    createdAt: { edit: { label: 'createdAt', description: '', placeholder: '', visible: false, editable: true }, list: { label: 'createdAt', searchable: true, sortable: true } },
    updatedAt: { edit: { label: 'updatedAt', description: '', placeholder: '', visible: false, editable: true }, list: { label: 'updatedAt', searchable: true, sortable: true } },
    createdBy: { edit: { label: 'createdBy', description: '', placeholder: '', visible: false, editable: true, mainField: 'firstname' }, list: { label: 'createdBy', searchable: true, sortable: true } },
    updatedBy: { edit: { label: 'updatedBy', description: '', placeholder: '', visible: false, editable: true, mainField: 'firstname' }, list: { label: 'updatedBy', searchable: true, sortable: true } },
    documentId: { edit: {}, list: { label: 'documentId', searchable: true, sortable: true } },
  },
  layouts: {
    list: ['id', 'enableZalo', 'enableMessenger'],
    // Mỗi nhóm Zalo/Messenger kết thúc bằng 1 field full-width (size 12) để tự
    // động xuống dòng, tách 2 section rõ ràng trong "Configure the view".
    edit: [
      [{ name: 'enableZalo', size: 4 }, { name: 'zaloAccessToken', size: 8 }],
      [{ name: 'zaloOaUserId', size: 12 }],
      [{ name: 'enableMessenger', size: 4 }, { name: 'messengerPageToken', size: 8 }],
      [{ name: 'messengerRecipientId', size: 12 }],
    ],
  },
};

async function seedAdminLayouts(strapi) {
  const contentTypesService = strapi.plugin('content-manager').service('content-types');
  await contentTypesService.setConfiguration(NOTIFICATION_SETTING_UID, notificationSettingConfig);
}

module.exports = { seedAdminLayouts };
