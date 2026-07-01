import { House, Layout, Crown, Stethoscope, ShoppingCart, Heart, Book, Bell, Cog } from '@strapi/icons';
import { hubs } from './data/hubs';

/**
 * Thêm 9 menu link top-level theo nhóm nghiệp vụ (xem
 * plan/strapi-admin-navbar-ux-design-2026-06-29.md) thay vì để editor
 * non-tech phải tự mò trong Content Manager theo technical model name.
 *
 * Mỗi link mở 1 hub page launcher, deep-link tới đúng screen gốc của
 * Content Manager — không rewrite CRUD engine ở phase 1.
 */
const MENU_LINKS = [
  { hub: hubs.overview, icon: House, Component: () => import('./pages/OverviewPage') },
  { hub: hubs.site, icon: Layout, Component: () => import('./pages/SitePage') },
  { hub: hubs.brand, icon: Crown, Component: () => import('./pages/BrandPage') },
  { hub: hubs.services, icon: Stethoscope, Component: () => import('./pages/ServicesPage') },
  { hub: hubs.shop, icon: ShoppingCart, Component: () => import('./pages/ShopPage') },
  { hub: hubs.proof, icon: Heart, Component: () => import('./pages/ProofPage') },
  { hub: hubs.blog, icon: Book, Component: () => import('./pages/BlogPage') },
  { hub: hubs.ops, icon: Bell, Component: () => import('./pages/OpsPage') },
  { hub: hubs.system, icon: Cog, Component: () => import('./pages/SystemPage') },
];

const config = {
  locales: ['vi'],
  translations: {
    vi: {
      'Auth.form.welcome.title': 'Chào mừng đến Lennie SkinLab CMS',
    },
  },
};

const bootstrap = (app) => {
  MENU_LINKS.forEach(({ hub, icon, Component }) => {
    app.addMenuLink({
      to: hub.path,
      icon,
      intlLabel: {
        id: `lennie-workspace.${hub.id}`,
        defaultMessage: hub.label,
      },
      Component,
      position: 0,
    });
  });
};

export default {
  config,
  bootstrap,
};
