/**
 * Deep-link helpers vào các screen gốc của Strapi Content Manager.
 * Tập trung route mapping ở đây để dễ sửa khi Strapi đổi path,
 * tránh hardcode URL rải rác trong từng hub page/component.
 */

export const collectionTypeListPath = (uid) => `/content-manager/collection-types/${uid}`;

export const collectionTypeCreatePath = (uid) => `/content-manager/collection-types/${uid}/create`;

export const singleTypeEditPath = (uid) => `/content-manager/single-types/${uid}`;

/**
 * Link tới list view của collection type, optionally kèm filter query
 * (vd: lọc theo status cho booking/order/contact-lead ở phase 2).
 */
export const collectionTypeFilteredPath = (uid, query) => {
  const base = collectionTypeListPath(uid);
  if (!query) return base;
  const params = new URLSearchParams(query).toString();
  return `${base}?${params}`;
};
