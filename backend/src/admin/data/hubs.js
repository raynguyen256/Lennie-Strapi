/**
 * Cấu hình tập trung cho 9 hub trên sidebar admin.
 * Nội dung (hero, stats, dashboard, sections, card copy) bám sát
 * plan/strapi-admin-navbar-ux-preview.html để giữ đúng UX đã chốt,
 * chỉ khác là render bằng @strapi/design-system thay vì CSS riêng.
 *
 * Mỗi launcher trỏ tới 1 content type bằng `uid` + `type` ('single' | 'collection'),
 * route thật được resolve trong components/LauncherCard.jsx qua utils/routes.js.
 *
 * `secondaryAction`:
 * - 'create'        -> nút phụ mở create view (chỉ áp dụng collection có CTA tạo mới rõ ràng trong preview)
 * - 'same-as-primary' -> preview chỉ minh hoạ ý định (ví dụ "Lọc mới", "Xem maps") nhưng chưa có
 *   screen/filter riêng ở phase 1; nút phụ vẫn điều hướng đúng tới list/edit view để không bao giờ là dead-link.
 */

export const hubs = {
  overview: {
    id: 'overview',
    label: 'Tổng quan',
    path: '/lennie-overview',
    icon: '🏠',
    heroLabel: 'Dashboard điều hành',
    title: 'Tổng quan và lối đi nhanh cho admin non-tech',
    description:
      'Đây là điểm vào đầu tiên để admin biết ngay mình cần vào đâu. Mục tiêu là giảm việc nhớ technical model và thay bằng ngôn ngữ công việc hằng ngày.',
    meta: ['Chỉnh sửa nhanh', 'Hôm nay', 'Kho nội dung', 'Launcher mode'],
    stats: [
      { value: '12', label: 'Đơn và lịch cần xử lý' },
      { value: '78,4 triệu', label: 'Doanh thu tháng này' },
      { value: '6', label: 'Bài viết mới trong tháng' },
      { value: '9', label: 'Hub điều hướng chính' },
    ],
    dashboard: {
      operations: {
        title: 'Việc cần xử lý ngay',
        description: 'Danh sách ngắn các đầu việc nóng để admin không bỏ sót order và booking mới.',
        note: 'Gợi ý dev: panel này có thể map từ query tổng hợp order, booking, contact-lead với preset lọc trạng thái cần xử lý.',
        items: [
          { title: 'Đơn #LSL-240629-018', meta: 'Khách: Trâm Anh · 3 sản phẩm · COD', status: 'Chờ xác nhận' },
          { title: 'Đơn #LSL-240629-014', meta: 'Khách: Bảo Ngọc · Đã chuyển khoản', status: 'Đóng gói hôm nay' },
          { title: 'Booking 10:30 - Cơ sở Quận 3', meta: 'Dịch vụ: Routine cá nhân hóa · Khách: Hồng Vân', status: 'Cần gọi xác nhận' },
          { title: 'Booking 14:00 - Online', meta: 'Dịch vụ: Tư vấn da từ xa · Khách: Minh Thư', status: 'Chờ gửi form trước hẹn' },
        ],
      },
      revenue: {
        title: 'Doanh thu & vận hành tháng này',
        description: 'Khối tổng hợp để quản lý nhìn nhanh nhịp bán hàng và lượng yêu cầu mới.',
        metrics: [
          { label: 'Doanh thu shop', value: '78,4 triệu', note: 'Tăng 12% so với tháng trước' },
          { label: 'Đơn hàng hoàn tất', value: '42 đơn', note: '9 đơn đang chờ xử lý' },
          { label: 'Lead tư vấn mới', value: '31 lead', note: 'Tỷ lệ phản hồi trong 24h: 84%' },
          { label: 'Lịch hẹn đã chốt', value: '19 booking', note: '5 booking cần gọi lại' },
        ],
      },
      editorial: {
        title: 'Nội dung tháng này',
        description: 'Theo dõi nhịp xuất bản và hiệu suất kho nội dung để giữ website luôn mới.',
        metrics: [
          { label: 'Bài viết mới', value: '6', note: '2 bài đã lên lịch tuần này' },
          { label: 'Bài viết nổi bật', value: '3', note: '1 bài cần bổ sung ảnh cover' },
          { label: 'FAQ mới', value: '9', note: '4 câu hỏi liên quan dịch vụ trị nám' },
          { label: 'Testimonials mới', value: '5', note: '2 case cần duyệt ảnh trước/sau' },
        ],
        note: 'Có thể mở rộng thêm top bài viết theo lượt xem khi frontend hoặc analytics đã kết nối đủ dữ liệu.',
      },
    },
    sections: [
      {
        title: 'Chỉnh sửa nhanh',
        description: 'Các điểm chạm hay sửa nhất và cần đưa ra ngoài cùng.',
        hint: 'Ưu tiên cho training',
        launchers: [
          { key: 'homepage', icon: '✨', title: 'Trang chủ', tag: 'Single type', description: 'Hero, stats, services slider, mantra.', uid: 'api::homepage.homepage', type: 'single', primaryLabel: 'Chỉnh sửa' },
          { key: 'general-setting', icon: '☎', title: 'CTA & Hotline', tag: 'Single type', description: 'Hotline, Messenger, Zalo, CTA chính và phụ.', uid: 'api::general-setting.general-setting', type: 'single', primaryLabel: 'Chỉnh sửa' },
          { key: 'contact-info', icon: '✉', title: 'Liên hệ', tag: 'Single type', description: 'Địa chỉ, giờ mở cửa, email, social links.', uid: 'api::contact-info.contact-info', type: 'single', primaryLabel: 'Chỉnh sửa' },
          { key: 'founder', icon: '👑', title: 'Founder', tag: 'Single type', description: 'Chân dung, summary, trust points, founder CTA.', uid: 'api::founder.founder', type: 'single', primaryLabel: 'Chỉnh sửa' },
        ],
      },
      {
        title: 'Xử lý hôm nay',
        description: 'Nhóm công việc vận hành cần thấy ngay khi đăng nhập.',
        hint: 'Có thể thêm badge sau',
        launchers: [
          { key: 'contact-lead', icon: '🔔', title: 'Leads tư vấn', tag: 'List view', description: 'Danh sách khách cần gọi lại hoặc follow-up.', uid: 'api::contact-lead.contact-lead', type: 'collection', primaryLabel: 'Mở danh sách', secondaryAction: 'same-as-primary', secondaryLabel: 'Lọc mới' },
          { key: 'booking', icon: '📅', title: 'Lịch hẹn', tag: 'List view', description: 'Booking tại cơ sở và tình trạng xử lý.', uid: 'api::booking.booking', type: 'collection', primaryLabel: 'Mở lịch hẹn', secondaryAction: 'same-as-primary', secondaryLabel: 'Lọc chờ xử lý' },
          { key: 'order', icon: '🧾', title: 'Đơn hàng', tag: 'List view', description: 'Theo dõi order mới, thanh toán và giao nhận.', uid: 'api::order.order', type: 'collection', primaryLabel: 'Mở đơn hàng', secondaryAction: 'same-as-primary', secondaryLabel: 'Lọc mới' },
          { key: 'newsletter-subscriber', icon: '💌', title: 'Newsletter', tag: 'List view', description: 'Người đăng ký nhận thông tin từ footer.', uid: 'api::newsletter-subscriber.newsletter-subscriber', type: 'collection', primaryLabel: 'Mở danh sách', secondaryAction: 'same-as-primary', secondaryLabel: 'Xuất email' },
        ],
      },
    ],
  },

  site: {
    id: 'site',
    label: 'Trang chủ & Site',
    path: '/lennie-site',
    icon: '🧭',
    heroLabel: 'Nội dung site-wide',
    title: 'Tất cả cấu hình tác động đến trang chủ và nhiều trang cùng lúc',
    description:
      'Hub này gom các singleton và dữ liệu site-wide để admin không phải vào Content Manager tìm từng model. Đây là khu vực quan trọng nhất sau Tổng quan.',
    meta: ['Homepage', 'CTA', 'Liên hệ', 'Chi nhánh'],
    stats: [
      { value: '4', label: 'Core launchers' },
      { value: '1', label: 'Trang chủ singleton' },
      { value: '2', label: 'Site-wide singleton' },
      { value: '1', label: 'Branch directory' },
    ],
    sections: [
      {
        title: 'Chỉnh sửa chính',
        description: 'Những module ảnh hưởng trực tiếp landing page và thông tin toàn site.',
        hint: 'Hub ưu tiên số 1',
        launchers: [
          { key: 'homepage', icon: '🏡', title: 'Trang chủ', tag: 'Single type', description: 'Hero, stats, mantra cards và services slider.', uid: 'api::homepage.homepage', type: 'single', primaryLabel: 'Chỉnh sửa' },
          { key: 'general-setting', icon: '📣', title: 'CTA & Hotline', tag: 'Single type', description: 'Hotline, Zalo, WhatsApp, primary/secondary CTA.', uid: 'api::general-setting.general-setting', type: 'single', primaryLabel: 'Chỉnh sửa' },
          { key: 'contact-info', icon: '📍', title: 'Liên hệ', tag: 'Single type', description: 'Địa chỉ, email, Facebook, Instagram, TikTok, maps.', uid: 'api::contact-info.contact-info', type: 'single', primaryLabel: 'Chỉnh sửa' },
          { key: 'branch', icon: '🏢', title: 'Cơ sở / chi nhánh', tag: 'Collection', description: 'Địa chỉ, note, tag, phone và giờ hoạt động từng cơ sở.', uid: 'api::branch.branch', type: 'collection', primaryLabel: 'Mở danh sách', secondaryAction: 'create', secondaryLabel: 'Thêm chi nhánh' },
        ],
      },
      {
        title: 'Thiết lập nâng cao',
        description: 'Chi tiết bổ sung cho trang chủ và thông tin liên hệ.',
        hint: 'Optional widgets',
        launchers: [
          { key: 'opening-hours', icon: '⏰', title: 'Giờ mở cửa', tag: 'Embedded config', description: 'Hiển thị như một launcher nhỏ trỏ vào contact-info.', uid: 'api::contact-info.contact-info', type: 'single', primaryLabel: 'Mở block', secondaryAction: 'same-as-primary', secondaryLabel: 'Xem theo ngày' },
          { key: 'hero-slides', icon: '🖼', title: 'Hero Slides', tag: 'Component group', description: 'Các hero slide trong trang chủ.', uid: 'api::homepage.homepage', type: 'single', primaryLabel: 'Mở trang chủ', secondaryAction: 'same-as-primary', secondaryLabel: 'Xem cấu trúc' },
        ],
      },
    ],
  },

  brand: {
    id: 'brand',
    label: 'Giới thiệu & Thương hiệu',
    path: '/lennie-brand',
    icon: '👑',
    heroLabel: 'Khối xây dựng niềm tin',
    title: 'Nội dung giúp tăng uy tín và bộ mặt thương hiệu',
    description:
      'Hub này gom các thành phần về founder, đội ngũ và brand đối tác. Editor sẽ hiểu đây là khu vực xây dựng niềm tin thay vì một danh sách model rời rạc.',
    meta: ['Founder', 'Đội ngũ', 'Brand đối tác'],
    stats: [
      { value: '1', label: 'Hồ sơ founder' },
      { value: '2', label: 'Danh sách trust' },
      { value: '3', label: 'Module tăng uy tín' },
      { value: '1', label: 'Cụm training' },
    ],
    sections: [
      {
        title: 'Nội dung chính',
        description: 'Các khu vực nói về con người và năng lực thương hiệu.',
        hint: 'Trust proof',
        launchers: [
          { key: 'founder', icon: '👩', title: 'Founder', tag: 'Single type', description: 'Tên, portrait, summary, credentials, trust points, CTA.', uid: 'api::founder.founder', type: 'single', primaryLabel: 'Chỉnh sửa', secondaryAction: 'same-as-primary', secondaryLabel: 'Preview giới thiệu' },
          { key: 'team-member', icon: '🧑‍🤝‍🧑', title: 'Đội ngũ', tag: 'Collection', description: 'Tên, role, photo và thứ tự hiển thị.', uid: 'api::team-member.team-member', type: 'collection', primaryLabel: 'Mở danh sách', secondaryAction: 'create', secondaryLabel: 'Thêm thành viên' },
          { key: 'partner-brand', icon: '🧴', title: 'Brand đối tác', tag: 'Collection', description: 'Logo, tên và thứ tự hiển thị trên website.', uid: 'api::partner-brand.partner-brand', type: 'collection', primaryLabel: 'Mở danh sách', secondaryAction: 'create', secondaryLabel: 'Thêm brand' },
        ],
      },
    ],
  },

  services: {
    id: 'services',
    label: 'Dịch vụ',
    path: '/lennie-services',
    icon: '🩺',
    heroLabel: 'Trung tâm nội dung dịch vụ',
    title: 'Trung tâm nội dung cho các dịch vụ và vấn đề da',
    description:
      'Hub dịch vụ cần là một workspace riêng vì đây là khu vực có nhiều trường nội dung và relation nhất. Taxonomy được đẩy xuống phần nâng cao để non-tech editor không bị ngợp.',
    meta: ['Danh sách dịch vụ', 'FAQ dịch vụ', 'Nhóm', 'Vấn đề da'],
    stats: [
      { value: '1', label: 'Collection dịch vụ chính' },
      { value: '2', label: 'Taxonomy hỗ trợ' },
      { value: '1', label: 'Khu FAQ' },
      { value: '26+', label: 'Field trong model dịch vụ' },
    ],
    sections: [
      {
        title: 'Nội dung chính',
        description: 'Những nơi editor sẽ vào thường xuyên để tạo và cập nhật dịch vụ.',
        hint: 'Phức tạp nhất',
        launchers: [
          { key: 'service', icon: '💆', title: 'Danh sách dịch vụ', tag: 'Collection', description: 'Title, slug, hero image, intro, price, steps, CTAs, related content.', uid: 'api::service.service', type: 'collection', primaryLabel: 'Mở danh sách', secondaryAction: 'create', secondaryLabel: 'Tạo dịch vụ mới' },
          { key: 'faq-service', icon: '❓', title: 'FAQ dịch vụ', tag: 'Collection', description: 'Question, answer, related services và featured FAQ.', uid: 'api::faq.faq', type: 'collection', primaryLabel: 'Mở FAQ', secondaryAction: 'create', secondaryLabel: 'Thêm câu hỏi' },
        ],
      },
      {
        title: 'Thiết lập nâng cao',
        description: 'Taxonomy phục vụ relation cho service và skin result.',
        hint: 'Advanced only',
        launchers: [
          { key: 'service-category', icon: '🗂', title: 'Nhóm dịch vụ', tag: 'Collection', description: 'Danh mục để phân nhóm service và điều hướng archive.', uid: 'api::service-category.service-category', type: 'collection', primaryLabel: 'Mở nhóm', secondaryAction: 'create', secondaryLabel: 'Thêm nhóm' },
          { key: 'skin-concern', icon: '🧬', title: 'Vấn đề da', tag: 'Collection', description: 'Concern được dùng lại cho service và kết quả điều trị.', uid: 'api::skin-concern.skin-concern', type: 'collection', primaryLabel: 'Mở concern', secondaryAction: 'create', secondaryLabel: 'Thêm concern' },
        ],
      },
    ],
  },

  shop: {
    id: 'shop',
    label: 'Sản phẩm & Shop',
    path: '/lennie-shop',
    icon: '🛒',
    heroLabel: 'Trung tâm shop',
    title: 'Khu vực quản lý catalog sản phẩm và liên kết shop',
    description:
      'Hub này giúp editor tập trung vào sản phẩm và tag thay vì bị phân tâm bởi order hoặc content khác. Nó rất hợp cho luồng việc catalog-first của Lennie.',
    meta: ['Danh sách sản phẩm', 'Tags', 'Catalog focus'],
    stats: [
      { value: '1', label: 'Collection sản phẩm' },
      { value: '1', label: 'Tag helper' },
      { value: '10+', label: 'Field hướng catalog' },
      { value: '2', label: 'Card launcher chính' },
    ],
    sections: [
      {
        title: 'Nội dung chính',
        description: 'Danh sách sản phẩm và thao tác tạo/cập nhật catalog.',
        hint: 'Catalog workspace',
        launchers: [
          { key: 'product', icon: '🧴', title: 'Danh sách sản phẩm', tag: 'Collection', description: 'Name, image, description, badge, status, prices, tags, testimonials.', uid: 'api::product.product', type: 'collection', primaryLabel: 'Mở danh sách', secondaryAction: 'create', secondaryLabel: 'Tạo sản phẩm mới' },
        ],
      },
      {
        title: 'Thiết lập nâng cao',
        description: 'Danh mục và filter giúp editor làm sạch catalog.',
        hint: 'Taxonomy',
        launchers: [
          { key: 'product-tag', icon: '#', title: 'Tag sản phẩm', tag: 'Collection', description: 'Tag dùng để gom nhóm sản phẩm và bộ lọc shop.', uid: 'api::product-tag.product-tag', type: 'collection', primaryLabel: 'Mở tags', secondaryAction: 'create', secondaryLabel: 'Thêm tag' },
        ],
      },
    ],
  },

  proof: {
    id: 'proof',
    label: 'Đánh giá & Kết quả',
    path: '/lennie-proof',
    icon: '💙',
    heroLabel: 'Trung tâm social proof',
    title: 'Nội dung tăng tin tưởng bằng đánh giá và kết quả thực tế',
    description:
      'Testimonials và skin results nên nằm chung vì editor cảm nhận đây đều là bằng chứng kết quả. Topic và result type vẫn được đưa ra ngoài nhưng đặt trong lớp nâng cao.',
    meta: ['Testimonials', 'Skin results', 'Topics', 'Result types'],
    stats: [
      { value: '2', label: 'Collection chính' },
      { value: '2', label: 'Phân loại nâng cao' },
      { value: '1', label: 'Hub tăng niềm tin' },
      { value: '16+', label: 'Field trong testimonial' },
    ],
    sections: [
      {
        title: 'Nội dung chính',
        description: 'Nội dung editor sẽ cập nhật để tăng social proof.',
        hint: 'Trust proof',
        launchers: [
          { key: 'testimonial', icon: '⭐', title: 'Khách hàng đánh giá', tag: 'Collection', description: 'Quote, stars, case type, source, related services và products.', uid: 'api::testimonial.testimonial', type: 'collection', primaryLabel: 'Mở danh sách', secondaryAction: 'create', secondaryLabel: 'Thêm đánh giá' },
          { key: 'skin-result', icon: '📸', title: 'Kết quả trước / sau', tag: 'Collection', description: 'Before/after image, case summary, timeframe, treatment steps.', uid: 'api::skin-result.skin-result', type: 'collection', primaryLabel: 'Mở danh sách', secondaryAction: 'create', secondaryLabel: 'Thêm kết quả' },
        ],
      },
      {
        title: 'Thiết lập nâng cao',
        description: 'Taxonomy giúp gom nhóm và điều hướng các proof blocks.',
        hint: 'Advanced only',
        launchers: [
          { key: 'testimonial-topic', icon: '🏷', title: 'Chủ đề đánh giá', tag: 'Collection', description: 'Topic cho testimonial để bộ lọc và context hóa.', uid: 'api::testimonial-topic.testimonial-topic', type: 'collection', primaryLabel: 'Mở chủ đề', secondaryAction: 'create', secondaryLabel: 'Thêm chủ đề' },
          { key: 'result-type', icon: '🧪', title: 'Loại kết quả', tag: 'Collection', description: 'Phân loại các case result trong before-after.', uid: 'api::result-type.result-type', type: 'collection', primaryLabel: 'Mở loại', secondaryAction: 'create', secondaryLabel: 'Thêm loại' },
        ],
      },
    ],
  },

  blog: {
    id: 'blog',
    label: 'Blog & FAQ',
    path: '/lennie-blog',
    icon: '📚',
    heroLabel: 'Trung tâm nội dung kiến thức',
    title: 'Nội dung kiến thức, bài viết và kho câu hỏi hỗ trợ',
    description:
      'Blog và FAQ nên có một hub riêng để editor nghĩ theo dòng nội dung giáo dục. FAQ vẫn có thể được truy cập từ hub Dịch vụ, nhưng ở đây sẽ được hiểu là kho kiến thức tổng hợp.',
    meta: ['Blog posts', 'FAQ tổng hợp', 'FAQ categories'],
    stats: [
      { value: '1', label: 'Blog collection' },
      { value: '1', label: 'FAQ collection' },
      { value: '1', label: 'FAQ taxonomy' },
      { value: '2', label: 'Launcher chính' },
    ],
    sections: [
      {
        title: 'Nội dung chính',
        description: 'Bài viết và câu hỏi trả lời cho khách hàng.',
        hint: 'SEO + education',
        launchers: [
          { key: 'blog-post', icon: '📝', title: 'Bài viết blog', tag: 'Collection', description: 'Title, slug, excerpt, cover image, body, category và featured.', uid: 'api::blog-post.blog-post', type: 'collection', primaryLabel: 'Mở danh sách', secondaryAction: 'create', secondaryLabel: 'Tạo bài viết mới' },
          { key: 'faq-general', icon: '💬', title: 'FAQ tổng hợp', tag: 'Collection', description: 'Kho FAQ đã dùng cho nhiều page và contexts.', uid: 'api::faq.faq', type: 'collection', primaryLabel: 'Mở FAQ', secondaryAction: 'create', secondaryLabel: 'Thêm câu hỏi' },
        ],
      },
      {
        title: 'Thiết lập nâng cao',
        description: 'Taxonomy cho FAQ nếu cần điều hướng rõ hơn.',
        hint: 'Phase 2 filters',
        launchers: [
          { key: 'faq-category', icon: '🗃', title: 'Nhóm FAQ', tag: 'Collection', description: 'Nhóm theo page hoặc chủ đề để dễ lọc trong list view.', uid: 'api::faq-category.faq-category', type: 'collection', primaryLabel: 'Mở nhóm', secondaryAction: 'create', secondaryLabel: 'Thêm nhóm' },
        ],
      },
    ],
  },

  ops: {
    id: 'ops',
    label: 'Khách hàng & Đơn',
    path: '/lennie-ops',
    icon: '🔔',
    heroLabel: 'Trung tâm vận hành',
    title: 'Khu vực vận hành hằng ngày cho lead, lịch hẹn và đơn hàng',
    description:
      'Đây là hub quan trọng nhất cho công việc xử lý sau khi website đi vào hoạt động. Nó giúp nhìn thao tác theo nhiệm vụ thay vì theo tên database.',
    meta: ['Leads', 'Bookings', 'Orders', 'Newsletter'],
    stats: [
      { value: '4', label: 'Danh sách vận hành chính' },
      { value: '3', label: 'Flow theo trạng thái' },
      { value: '1', label: 'Kho newsletter' },
      { value: '1', label: 'Hub ưu tiên cao' },
    ],
    sections: [
      {
        title: 'Công việc chính',
        description: 'Những danh sách cần được check mỗi ngày.',
        hint: 'Cần thêm badge sau',
        launchers: [
          { key: 'contact-lead', icon: '📞', title: 'Leads tư vấn', tag: 'Collection', description: 'Tên, phone, skin condition, service interest, source, status.', uid: 'api::contact-lead.contact-lead', type: 'collection', primaryLabel: 'Mở danh sách', secondaryAction: 'same-as-primary', secondaryLabel: 'Lọc mới' },
          { key: 'booking', icon: '🗓', title: 'Lịch hẹn', tag: 'Collection', description: 'Khách đặt lịch, chi nhánh, service, ngày giờ và tình trạng.', uid: 'api::booking.booking', type: 'collection', primaryLabel: 'Mở lịch hẹn', secondaryAction: 'same-as-primary', secondaryLabel: 'Lọc chờ xử lý' },
          { key: 'order', icon: '🧾', title: 'Đơn hàng', tag: 'Collection', description: 'Mã đơn, thông tin khách, địa chỉ, item count, subtotal, status.', uid: 'api::order.order', type: 'collection', primaryLabel: 'Mở đơn hàng', secondaryAction: 'same-as-primary', secondaryLabel: 'Lọc mới' },
          { key: 'newsletter-subscriber', icon: '💌', title: 'Đăng ký newsletter', tag: 'Collection', description: 'Danh sách email từ footer và các điểm đăng ký.', uid: 'api::newsletter-subscriber.newsletter-subscriber', type: 'collection', primaryLabel: 'Mở danh sách', secondaryAction: 'same-as-primary', secondaryLabel: 'Xem email' },
        ],
      },
    ],
  },

  system: {
    id: 'system',
    label: 'Hệ thống',
    path: '/lennie-system',
    icon: '⚙',
    heroLabel: 'Thiết lập hệ thống',
    title: 'Cấu hình nội bộ và các công cụ quản trị cấp cuối',
    description:
      'Hub này được đặt cuối để tránh làm non-tech editor rối. Chỉ những gì liên quan đến notify, media và system-level actions mới nên nằm ở đây.',
    meta: ['Notification setting', 'Media', 'Permissions'],
    stats: [
      { value: '1', label: 'Singleton notify nội bộ' },
      { value: '2', label: 'System shortcuts' },
      { value: '1', label: 'Khu admin-only' },
      { value: '0', label: 'Ưu tiên biên tập' },
    ],
    sections: [
      {
        title: 'Công cụ hệ thống',
        description: 'Những khu vực không cần mở hằng ngày, nhưng cần rõ ràng khi cần.',
        hint: 'Admin role only',
        launchers: [
          { key: 'notification-setting', icon: '📡', title: 'Thông báo nội bộ', tag: 'Single type', description: 'Bật/tắt Zalo OA và Messenger, quản lý token notify.', uid: 'api::notification-setting.notification-setting', type: 'single', primaryLabel: 'Chỉnh sửa', secondaryAction: 'same-as-primary', secondaryLabel: 'Kiểm tra token' },
          { key: 'media-library', icon: '🖼', title: 'Media Library', tag: 'Native plugin', description: 'Truy cập kho media để upload và chọn ảnh.', externalPath: '/plugins/upload', primaryLabel: 'Mở media', secondaryAction: 'same-as-primary', secondaryLabel: 'Upload mới' },
          { key: 'users-permissions', icon: '🔐', title: 'Users & Permissions', tag: 'Native plugin', description: 'Quản lý role, user và quyền truy cập admin/API.', externalPath: '/settings/users-permissions/roles', primaryLabel: 'Mở quyền', secondaryAction: 'same-as-primary', secondaryLabel: 'Xem roles' },
        ],
      },
    ],
  },
};

export default hubs;
