/**
 * Cấu hình tập trung cho 9 hub trên sidebar admin.
 * Tách data khỏi component để dễ chỉnh IA sau này mà không phải sửa JSX.
 *
 * Mỗi launcher trỏ tới 1 content type bằng `uid` + `type` ('single' | 'collection'),
 * route thật được resolve trong components/LauncherCard.jsx qua utils/routes.js.
 */

export const hubs = {
  overview: {
    id: 'overview',
    label: 'Tổng quan',
    path: '/lennie-overview',
    description: 'Điểm vào đầu tiên: shortcut chỉnh sửa nhanh và việc cần xử lý hôm nay.',
  },
  site: {
    id: 'site',
    label: 'Trang chủ & Site',
    path: '/lennie-site',
    description: 'Các cấu hình tác động toàn website và trang chủ.',
    sections: [
      {
        title: 'Nội dung chính',
        launchers: [
          {
            key: 'homepage',
            title: 'Trang chủ',
            description: 'Hero, stats, services slider, mantra',
            uid: 'api::homepage.homepage',
            type: 'single',
          },
          {
            key: 'general-setting',
            title: 'CTA & Hotline',
            description: 'Hotline, Messenger, Zalo, CTA chính/phụ',
            uid: 'api::general-setting.general-setting',
            type: 'single',
          },
          {
            key: 'contact-info',
            title: 'Liên hệ',
            description: 'Địa chỉ, giờ mở cửa, social links',
            uid: 'api::contact-info.contact-info',
            type: 'single',
          },
          {
            key: 'branch',
            title: 'Cơ sở / chi nhánh',
            description: 'Địa chỉ và thông tin từng cơ sở',
            uid: 'api::branch.branch',
            type: 'collection',
            secondaryAction: 'create',
          },
        ],
      },
    ],
  },
  brand: {
    id: 'brand',
    label: 'Giới thiệu & Thương hiệu',
    path: '/lennie-brand',
    description: 'Nội dung giúp tăng tin tưởng: founder, đội ngũ, brand đối tác.',
    sections: [
      {
        title: 'Nội dung chính',
        launchers: [
          {
            key: 'founder',
            title: 'Founder',
            description: 'Chân dung, bio, trust points, CTA',
            uid: 'api::founder.founder',
            type: 'single',
          },
          {
            key: 'team-member',
            title: 'Đội ngũ',
            description: 'Tên, vai trò, ảnh, thứ tự hiển thị',
            uid: 'api::team-member.team-member',
            type: 'collection',
            secondaryAction: 'create',
          },
          {
            key: 'partner-brand',
            title: 'Brand đối tác',
            description: 'Logo, tên, thứ tự',
            uid: 'api::partner-brand.partner-brand',
            type: 'collection',
            secondaryAction: 'create',
          },
        ],
      },
    ],
  },
  services: {
    id: 'services',
    label: 'Dịch vụ',
    path: '/lennie-services',
    description: 'Toàn bộ nội dung về dịch vụ: danh sách, nhóm, vấn đề da, FAQ liên quan.',
    sections: [
      {
        title: 'Nội dung chính',
        launchers: [
          {
            key: 'service',
            title: 'Danh sách dịch vụ',
            description: 'Quản lý toàn bộ dịch vụ, nội dung chi tiết và CTA',
            uid: 'api::service.service',
            type: 'collection',
            secondaryAction: 'create',
            secondaryLabel: 'Tạo dịch vụ mới',
          },
          {
            key: 'faq-service',
            title: 'FAQ dịch vụ',
            description: 'Câu hỏi hỗ trợ trang dịch vụ',
            uid: 'api::faq.faq',
            type: 'collection',
          },
        ],
      },
      {
        title: 'Thiết lập nâng cao',
        launchers: [
          {
            key: 'service-category',
            title: 'Nhóm dịch vụ',
            description: 'Danh mục để phân loại dịch vụ',
            uid: 'api::service-category.service-category',
            type: 'collection',
          },
          {
            key: 'skin-concern',
            title: 'Vấn đề da',
            description: 'Các vấn đề da liên quan tới dịch vụ',
            uid: 'api::skin-concern.skin-concern',
            type: 'collection',
          },
        ],
      },
    ],
  },
  shop: {
    id: 'shop',
    label: 'Sản phẩm & Shop',
    path: '/lennie-shop',
    description: 'Catalog sản phẩm và tag.',
    sections: [
      {
        title: 'Nội dung chính',
        launchers: [
          {
            key: 'product',
            title: 'Danh sách sản phẩm',
            description: 'Quản lý catalog sản phẩm',
            uid: 'api::product.product',
            type: 'collection',
            secondaryAction: 'create',
            secondaryLabel: 'Tạo sản phẩm mới',
          },
        ],
      },
      {
        title: 'Thiết lập nâng cao',
        launchers: [
          {
            key: 'product-tag',
            title: 'Tag sản phẩm',
            description: 'Danh mục tag để phân loại sản phẩm',
            uid: 'api::product-tag.product-tag',
            type: 'collection',
          },
        ],
      },
    ],
  },
  proof: {
    id: 'proof',
    label: 'Đánh giá & Kết quả',
    path: '/lennie-proof',
    description: 'Social proof, trust proof, transformation proof.',
    sections: [
      {
        title: 'Nội dung chính',
        launchers: [
          {
            key: 'testimonial',
            title: 'Khách hàng đánh giá',
            description: 'Quản lý testimonial khách hàng',
            uid: 'api::testimonial.testimonial',
            type: 'collection',
          },
          {
            key: 'skin-result',
            title: 'Kết quả trước / sau',
            description: 'Ảnh và mô tả kết quả before/after',
            uid: 'api::skin-result.skin-result',
            type: 'collection',
          },
        ],
      },
      {
        title: 'Thiết lập nâng cao',
        launchers: [
          {
            key: 'testimonial-topic',
            title: 'Chủ đề đánh giá',
            description: 'Danh mục chủ đề testimonial',
            uid: 'api::testimonial-topic.testimonial-topic',
            type: 'collection',
          },
          {
            key: 'result-type',
            title: 'Loại kết quả',
            description: 'Danh mục loại kết quả before/after',
            uid: 'api::result-type.result-type',
            type: 'collection',
          },
        ],
      },
    ],
  },
  blog: {
    id: 'blog',
    label: 'Blog & FAQ',
    path: '/lennie-blog',
    description: 'Bài viết và kiến thức hỗ trợ.',
    sections: [
      {
        title: 'Nội dung chính',
        launchers: [
          {
            key: 'blog-post',
            title: 'Bài viết blog',
            description: 'Quản lý bài viết blog',
            uid: 'api::blog-post.blog-post',
            type: 'collection',
            secondaryAction: 'create',
            secondaryLabel: 'Tạo bài mới',
          },
          {
            key: 'faq-general',
            title: 'FAQ tổng hợp',
            description: 'Toàn bộ câu hỏi thường gặp',
            uid: 'api::faq.faq',
            type: 'collection',
          },
        ],
      },
      {
        title: 'Thiết lập nâng cao',
        launchers: [
          {
            key: 'faq-category',
            title: 'Nhóm FAQ',
            description: 'Danh mục để phân loại FAQ',
            uid: 'api::faq-category.faq-category',
            type: 'collection',
          },
        ],
      },
    ],
  },
  ops: {
    id: 'ops',
    label: 'Khách hàng & Đơn',
    path: '/lennie-ops',
    description: 'Lead, booking, order, newsletter — công việc vận hành hàng ngày.',
    sections: [
      {
        title: 'Nội dung chính',
        launchers: [
          {
            key: 'contact-lead',
            title: 'Leads tư vấn',
            description: 'Khách hàng để lại thông tin liên hệ',
            uid: 'api::contact-lead.contact-lead',
            type: 'collection',
          },
          {
            key: 'booking',
            title: 'Lịch hẹn',
            description: 'Booking khách hàng đặt lịch',
            uid: 'api::booking.booking',
            type: 'collection',
          },
          {
            key: 'order',
            title: 'Đơn hàng',
            description: 'Đơn hàng khách đặt mua',
            uid: 'api::order.order',
            type: 'collection',
          },
          {
            key: 'newsletter-subscriber',
            title: 'Đăng ký newsletter',
            description: 'Danh sách email đăng ký nhận tin',
            uid: 'api::newsletter-subscriber.newsletter-subscriber',
            type: 'collection',
          },
        ],
      },
    ],
  },
  system: {
    id: 'system',
    label: 'Hệ thống',
    path: '/lennie-system',
    description: 'Cấu hình nội bộ, không dành cho editor thường xuyên.',
    sections: [
      {
        title: 'Nội dung chính',
        launchers: [
          {
            key: 'notification-setting',
            title: 'Thông báo nội bộ',
            description: 'Token Zalo OA, Messenger, bật/tắt notify',
            uid: 'api::notification-setting.notification-setting',
            type: 'single',
          },
          {
            key: 'media-library',
            title: 'Media Library',
            description: 'Quản lý ảnh, file upload',
            externalPath: '/plugins/upload',
          },
          {
            key: 'users-permissions',
            title: 'Users & Permissions',
            description: 'Quản lý người dùng và phân quyền',
            externalPath: '/settings/users-permissions/roles',
          },
        ],
      },
    ],
  },
};

export default hubs;
