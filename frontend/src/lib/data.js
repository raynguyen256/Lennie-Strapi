/* ============================================================
   Lennie SkinLab — shared data (home page)
   ============================================================ */

const IMG = "/assets/remix/";

export const productData = [
  {
    id: "p1",
    slug: "restorative-ha-serum",
    brand: "Hydrinity · USA",
    name: "Restorative HA Serum",
    tag: "Phục hồi · Cấp nước",
    price: "2.890.000₫",
    img: "/assets/product-hydrinity.png",
    badge: "Bán chạy",
    cats: ["#XEMTẤTCẢ", "#BÁNCHẠY", "#PHỤCHỒIDA", "#CẤPẨMSÂU"],
  },
  {
    id: "p2",
    slug: "rescue-epidermal-repair",
    brand: "Osmosis MD · USA",
    name: "Rescue Epidermal Repair",
    tag: "Phục hồi tổn thương",
    price: "3.250.000₫",
    img: "/assets/product-osmosis.png",
    badge: "Mới",
    cats: ["#XEMTẤTCẢ", "#PHỤCHỒIDA"],
  },
  {
    id: "p3",
    slug: "dark-spot-lifting-serum",
    brand: "Vi Derm · USA",
    name: "Dark Spot Lifting Serum",
    tag: "Nám · Sắc tố",
    price: "2.490.000₫",
    img: "/assets/product-viderm.png",
    badge: null,
    cats: ["#XEMTẤTCẢ", "#BÁNCHẠY"],
  },
  {
    id: "p4",
    slug: "cell-soft-toning-lotion",
    brand: "Nescens · Switzerland",
    name: "Cell-Soft Toning Lotion",
    tag: "Toner · Cấp ẩm",
    price: "1.890.000₫",
    img: "/assets/product-nescens.jpg",
    badge: "−15%",
    cats: ["#XEMTẤTCẢ", "#CẤPẨMSÂU"],
  },
];

export const servicesSlides = [
  {
    tag: "ROUTINE LÂM SÀNG CÁ NHÂN HÓA",
    title: "Thiết kế chu trình chuyên biệt",
    desc: "ThS. DS. Hoàng Hồng Thắm trực tiếp thăm khám lâm sàng, bóc tách chỉ số sinh học làn da nhằm thiết kế routine mượt mà, hạn chế tối đa nguy cơ kích ứng cho riêng bạn.",
    img: IMG + "clinic-treatment.png",
  },
  {
    tag: "DƯỢC CHẤT THẢO DƯỢC QUÝ HIẾM",
    title: "Hoạt chất bóc tách phân tử tinh khiết",
    desc: "Sự giao thoa hoàn hảo giữa các thảo dược chứa adaptogen thích ứng quý hiếm kết hợp hoạt chất sinh học tiên tiến bóc tách phân tử tối ưu giúp hồi sinh nhanh chóng tế bào hư tổn.",
    img: IMG + "herb-mix.png",
  },
  {
    tag: "KỶ LỤC LÂM SÀNG TẠI CLINIC",
    title: "Phác đồ hồi phục thực tế trên 98%",
    desc: "Lennie Clinic từ chối những thuật ngữ sáo rỗng. Mọi phác đồ trị liệu đều bám sát chặt chẽ sự phát triển tế bào của khách để khôi phục lớp màng sinh học nguyên bản, đạt kết quả mướt mịn thực tế.",
    img: IMG + "model-glow.png",
  },
  {
    tag: "CỐ VẤN KHOA HỌC ĐỒNG HÀNH",
    title: "Chăm da sát sườn 24/7 từ tâm",
    desc: "Không chỉ kê đơn sản phẩm, Lennie SkinLab là cố vấn thẩm mỹ đồng hành lâu dài, liên tục bám sát sự phục hồi và kiểm soát sinh lý biểu bì định kỳ hàng tuần cho bạn.",
    img: IMG + "wellness-spa.png",
  },
];

export const partnerBrands = [
  "Biologique Recherche",
  "Obagi Medical",
  "La Roche-Posay",
  "Skinceuticals",
  "Medik8",
  "Isdin",
  "Hydrinity",
  "Osmosis MD",
];

export const mantraCards = [
  {
    title: "Khơi Nguồn Sinh Lực Da",
    desc: "Cung cấp vitamin và hoạt chất vi lượng giúp khôi phục hệ miễn dịch tự nhiên của làn da.",
    icon: "Activity",
  },
  {
    title: "Bảo Vệ Đa Tầng Tế Bào",
    desc: "Củng cố hàng rào giữ ẩm, chống mất nước xuyên biểu bì và làm chậm lão hóa sớm.",
    icon: "Heart",
  },
  {
    title: "Cân Bằng Sinh Học",
    desc: "Thiết kế độ pH dịu mượt và thúc đẩy chu trình tái sinh tế bào không bong tróc.",
    icon: "Globe",
  },
  {
    title: "Minh Bạch Y Khoa",
    desc: "100% dòng sản phẩm tuyển chọn sở hữu chứng nhận lâm sàng quốc tế khắt khe nhất.",
    icon: "Sparkles",
  },
];

export const teamData = [
  { name: "DS. Phạm Thành Nam", role: "Dược sĩ tư vấn chuyên môn", img: IMG + "team-1.png" },
  { name: "KTV. Nguyễn Thùy Trang", role: "Trưởng nhóm Kỹ thuật viên", img: IMG + "team-2.png" },
  { name: "DS. Mai Phương Anh", role: "Chuyên viên nghiên cứu hoạt chất", img: IMG + "team-3.png" },
  { name: "ThS. BS. Lê Hoài Nam", role: "Thạc sĩ · Bác sĩ Da liễu Lâm sàng", img: IMG + "team-4.png" },
  { name: "BS. Trịnh Quốc Khánh", role: "Chuyên gia Trị liệu Công nghệ cao", img: IMG + "team-5.png" },
  { name: "ThS. DS. Đỗ Hải Yến", role: "Nhà nghiên cứu Công thức Mỹ phẩm", img: IMG + "team-6.png" },
];

export const reviewsData = [
  {
    name: "Phạm Minh Trí",
    caseType: "Phục hồi mụn mủ",
    stars: 5,
    text: '"Tôi cực kỳ ấn tượng với phác đồ dược mỹ phẩm sắc sảo của ThS. Hoàng Hồng Thắm. Da tôi từ sưng viêm kích ứng đau rát nặng nề giờ đã khôi phục khỏe mạnh, mướt mát hẳn lên chỉ sau một tháng rưỡi."',
    img: IMG + "team-1.png",
    improvement: "Khắc phục sưng viêm & Thâm sâu",
    beforeState: "Mụn viêm sưng tấy",
    afterState: "Da phẳng, sạch nhân mụn",
    duration: "6 tuần",
    expertNote: "Giảm viêm tầng sâu, kiểm soát dầu thừa",
  },
  {
    name: "Nguyễn Thanh Hằng",
    caseType: "Điều trị sắc tố",
    stars: 5,
    text: '"Tôi đã dùng nhiều dòng treatment đắt đỏ nhưng không thấy da sáng mịn khỏe khoắn như khi chuyển hẳn sang phác đồ thích ứng sinh học của Lennie SkinLab. Da hồng hào, căng mượt rạng rỡ hẳn lên."',
    img: IMG + "model-glow.png",
    improvement: "Tái tạo sắc tố & Sáng mịn",
    beforeState: "Sạm xỉn & Đốm nâu sẫm",
    afterState: "Sáng hồng, căng bóng",
    duration: "8 tuần",
    expertNote: "Ức chế melanin, thúc đẩy sinh trưởng",
  },
  {
    name: "Trần Thế Vũ",
    caseType: "Tái tạo thâm sẹo",
    stars: 5,
    text: '"Lennie SkinLab đặt chuẩn rất cao cho việc chăm sóc khách hàng. Không gian vô cùng tinh tế, lịch hẹn chuẩn xác và Dược sĩ Thắm bám sát da tôi hàng tuần, dặn dò vô cùng chu đáo tỉ mỉ."',
    img: IMG + "team-3.png",
    improvement: "Khôi phục hàng rào bảo vệ",
    beforeState: "Da yếu lộ mao mạch đỏ",
    afterState: "Nền da khỏe, dày dặn",
    duration: "4 tuần",
    expertNote: "Củng cố màng vi sinh và độ ẩm nội bào",
  },
  {
    name: "Nguyễn Thị Cẩm Tú",
    caseType: "Trẻ hóa chuyên sâu",
    stars: 5,
    text: '"Dịch vụ chăm sóc tại đây thực sự chu đáo vượt ngoài mong đợi. Da tuổi 35 của tôi vốn dĩ sạm héo khô ráp, giờ lúc nào cũng được cấp nước căng mọng mướt mát hệt như được phục sinh."',
    img: IMG + "team-2.png",
    improvement: "Lấp đầy nếp nhăn & Căng đầy",
    beforeState: "Nếp nhăn khô ráp, sạm sâu",
    afterState: "Đàn hồi săn chắc, mướt mát",
    duration: "5 tuần",
    expertNote: "Kích hoạt nguyên bào collagen tự nhiên",
  },
];

export const faqs = [
  {
    q: "Lennie SkinLab có gì khác biệt so với spa thông thường?",
    a: "Mỗi khách hàng được ThS. DS. Hoàng Hồng Thắm trực tiếp đọc vị làn da và thiết kế phác đồ cá nhân hóa — không áp dụng một routine chung. Chúng tôi đề cao chuyên môn hoạt chất, sự minh bạch và đồng hành lâu dài.",
  },
  {
    q: "Tôi ở nước ngoài có được tư vấn không?",
    a: "Có. Lennie phục vụ khách kiều bào tại Mỹ, Hàn, Nhật, châu Âu, Singapore qua hình thức tư vấn và theo dõi từ xa bằng Zalo / Messenger.",
  },
  {
    q: "Chi phí thăm khám và theo dõi tính thế nào?",
    a: "Lennie minh bạch chi phí, không phát sinh phí thăm khám hay theo dõi riêng. Với dịch vụ thiết kế routine, bạn được tư vấn miễn phí khi đồng hành cùng sản phẩm điều trị.",
  },
  {
    q: "Đặt lịch tại cơ sở như thế nào?",
    a: "Bạn có thể đặt lịch trực tiếp trên website, hoặc liên hệ qua Messenger / Zalo / SĐT. Đội ngũ sẽ xác nhận lại khung giờ với bạn.",
  },
  {
    q: "Lennie cam kết kết quả ra sao?",
    a: "Chúng tôi không hứa hẹn kết quả tuyệt đối. Chăm da là một hành trình — Lennie cam kết đồng hành đúng cách, minh bạch về khả năng cải thiện và điều chỉnh phác đồ theo tiến triển thực tế của bạn.",
  },
];

export function toBlocks(paragraphs) {
  return paragraphs.map((text) => ({ type: "paragraph", children: [{ type: "text", text }] }));
}

export const quizQuestions = [
  {
    id: 1,
    key: "skinType",
    type: "select",
    question: "Da bạn thuộc nhóm nào khi để mặt mộc sau 1 giờ rửa mặt?",
    options: [
      "Khô ráp, căng tức khắp mặt",
      "Đổ dầu nhiều toàn bộ khuôn mặt",
      "Chỉ bóng dầu vùng chữ T, hai bên má khô",
      "Bình thường, mịn màng, cân bằng",
      "Đỏ ráp, dễ ngứa châm chích khi đổi thời tiết",
    ],
  },
  {
    id: 2,
    key: "primaryConcern",
    type: "select",
    question: "Mối quan tâm lớn nhất bạn muốn khắc phục hiện tại là gì?",
    options: [
      "Mụn trứng cá, mụn ẩn, sưng viêm, bít tắc",
      "Vết thâm, sạm màu, tàn nhang, nám mảng / nám sâu",
      "Da xỉn màu, thiếu sức sống, lỗ chân lông to",
      "Nếp nhăn li ti, da chùng nhão, giảm đàn hồi",
      "Mất nước, mẩn đỏ, yếu do dùng treatment quá liều",
    ],
  },
  {
    id: 3,
    key: "sunExposure",
    type: "select",
    question: "Một ngày bạn tiếp xúc với ánh nắng mặt trời khoảng bao lâu?",
    options: [
      "Dưới 1 giờ (chủ yếu trong nhà)",
      "Từ 1 đến 3 giờ (di chuyển ngoài đường)",
      "Trên 3 giờ (làm việc ngoài trời)",
    ],
  },
  {
    id: 4,
    key: "userName",
    type: "input",
    placeholder: "Ví dụ: Nguyễn Khánh Linh",
    question: "Nhập tên của bạn để nhận phác đồ cá nhân từ Dược sĩ Thắm:",
  },
];

export function generateRoutine(answers) {
  const { skinType, primaryConcern, userName } = answers;
  const name = userName || "Khách hàng thân yêu";
  let skinAnalysis = "",
    am = [],
    pm = [],
    advice = "";
  if (skinType && skinType.includes("Khô ráp")) {
    skinAnalysis =
      "Nền da của bạn đang thiếu hụt màng lipid tự nhiên, dẫn đến mất nước xuyên biểu bì (TEWL). Cần ưu tiên cấp ẩm sâu đa tầng và thiết lập lại hàng rào bảo vệ.";
    am = [
      "Sữa rửa mặt dịu nhẹ pH 5.5",
      "Toner Nescens phục hồi màng ẩm",
      "Serum Hyaluronic Acid (Hydrinity) cấp nước",
      "Kem dưỡng phục hồi màng lipid",
      "Kem chống nắng phổ rộng (Isdin)",
    ];
    pm = [
      "Nước tẩy trang dịu làm sạch",
      "Sữa rửa mặt cấp ẩm",
      "Toner cân bằng pH",
      "Serum B5 / HA cấp nước sâu",
      "Kem dưỡng phục hồi ban đêm",
    ];
  } else if (skinType && skinType.includes("Đổ dầu")) {
    skinAnalysis =
      "Tuyến bã nhờn hoạt động quá mức, có thể do thiếu ẩm giả tạo hoặc cổ nang lông to. Ưu tiên làm sạch sâu và hoạt chất kiềm dầu kháng viêm nhẹ.";
    am = [
      "Gel rửa mặt La Roche-Posay Effaclar",
      "Toner Neoderma kiểm soát dầu",
      "Serum Niacinamide 10% (Medik8)",
      "Gel dưỡng ẩm mỏng nhẹ, không dầu",
      "Kem chống nắng kiềm dầu, không gây mụn",
    ];
    pm = [
      "Nước tẩy trang micellar làm sạch sâu",
      "Gel rửa mặt tạo bọt kiểm soát dầu",
      "Toner thông thoáng cổ nang lông",
      "Serum BHA 2% (3 tối/tuần)",
      "Gel dưỡng ẩm phục hồi màng nước",
    ];
  } else if (skinType && skinType.includes("châm chích")) {
    skinAnalysis =
      "Làn da đang ở trạng thái cực kỳ nhạy cảm, hàng rào bảo vệ đã tổn thương nghiêm trọng. Nghiêm cấm mọi hoạt chất lột tẩy mạnh trong giai đoạn này.";
    am = [
      "Rửa mặt siêu dịu nhẹ với nước ấm",
      "Toner Centella làm dịu mẩn đỏ",
      "Serum Osmosis Rescue MD tái tạo",
      "Kem dưỡng phục hồi Hydrinity",
      "Kem chống nắng vật lý an toàn, không cồn",
    ];
    pm = [
      "Nước tẩy trang dịu cho da tổn thương",
      "Sữa rửa mặt phục hồi",
      "Xịt khoáng làm dịu tức thì",
      "Serum Osmosis Rescue MD phục hồi",
      "Kem dưỡng khóa ẩm sâu",
    ];
  } else {
    skinAnalysis =
      "Nền da hỗn hợp thiên dầu hoặc bình thường. Cần duy trì cân bằng dầu - nước, tăng cường dưỡng sáng và duy trì sự tươi trẻ bền vững.";
    am = [
      "Sữa rửa mặt cân bằng pH",
      "Toner cấp ẩm nhẹ",
      "Serum Vitamin C (Skinceuticals)",
      "Kem dưỡng ẩm mỏng nhẹ",
      "Kem chống nắng phổ rộng",
    ];
    pm = [
      "Tẩy trang làm sạch bụi mịn",
      "Sữa rửa mặt tạo bọt dịu nhẹ",
      "Toner cân bằng biểu bì",
      "Serum Niacinamide / Retinol 0.3%",
      "Kem dưỡng phục hồi ban đêm",
    ];
  }
  if (primaryConcern && primaryConcern.includes("Mụn"))
    advice =
      "Lời khuyên từ Dược sĩ Thắm: Tập trung làm sạch thông thoáng cổ nang lông bằng BHA 2% và kháng viêm bằng Niacinamide / Azelaic Acid. Tuyệt đối không tự nặn mụn bọc viêm tại nhà để tránh sẹo lõm.";
  else if (primaryConcern && primaryConcern.includes("thâm"))
    advice =
      "Lời khuyên từ Dược sĩ Thắm: Da bạn cần hoạt chất ức chế melanin như Tranexamic Acid phối hợp Vitamin C buổi sáng. Luôn chống nắng đủ lượng (2 đốt ngón tay) mỗi ngày.";
  else if (primaryConcern && primaryConcern.includes("nhăn"))
    advice =
      "Lời khuyên từ Dược sĩ Thắm: Làm quen với Retinol bọc phân tử để thúc đẩy collagen, kết hợp điện di peptide trẻ hóa nâng đỡ cơ mặt chùng nhão.";
  else
    advice =
      "Lời khuyên từ Dược sĩ Thắm: Ưu tiên phục hồi tối đa, củng cố hàng rào lipid cho đến khi da hết đỏ rát châm chích trước khi điều trị làm sáng hay chống lão hóa mạnh.";
  return {
    customerName: name,
    skinAnalysis,
    morningSteps: am,
    eveningSteps: pm,
    expertAdvice: advice,
  };
}

/* ============================================================
   Phase 3 redo — additional static data ported from
   `Web Lennie Design/js/data-services.jsx` & `data-pages.jsx`
   ============================================================ */

/** Nội dung mặc định theo nhóm dịch vụ (forWhom/problems/steps/includes/results/icon/img),
 *  dùng làm fallback khi 1 service trong Strapi chưa điền các field này. */
export const serviceCategoryDefaults = {
  "Tư vấn & Phác đồ": {
    icon: "Clipboard",
    img: IMG + "clinic-treatment.png",
    forWhom: [
      "Người mới bắt đầu chưa biết chọn sản phẩm phù hợp",
      "Da gặp nhiều vấn đề chồng chéo, dùng nhiều sản phẩm không hiệu quả",
      "Khách kiều bào muốn được theo dõi từ xa bài bản",
    ],
    problems: [
      "Mua sản phẩm theo trend nhưng không hợp da",
      "Routine rườm rà, kích ứng, không cải thiện",
      "Không ai theo dõi và tinh chỉnh khi da thay đổi",
    ],
    steps: [
      { title: "Đọc vị làn da", desc: "Phân tích nền da, độ ẩm, hàng rào lipid và lịch sử sử dụng sản phẩm — trực tiếp hoặc qua video call." },
      { title: "Thiết kế phác đồ", desc: "Dược sĩ xây routine AM/PM riêng, chọn đúng hoạt chất và nồng độ phù hợp cơ địa, hạn chế kích ứng." },
      { title: "Đồng hành & tinh chỉnh", desc: "Theo dõi tiến triển hàng tuần qua Zalo/Messenger, điều chỉnh khi da sang giai đoạn mới." },
    ],
    includes: [
      "Phiên đọc vị da cùng chuyên gia",
      "Phác đồ AM/PM cá nhân hóa bằng văn bản",
      "Theo dõi & tinh chỉnh trọn liệu trình",
      "Tư vấn từ xa qua Zalo / Messenger",
    ],
    results: ["Routine gọn, đúng nhu cầu", "Giảm kích ứng do dùng sai hoạt chất", "Da ổn định và cải thiện bền vững"],
  },
  "Điều trị mụn": {
    icon: "Droplet",
    img: IMG + "model-glow.png",
    forWhom: ["Da mụn ẩn, mụn viêm, bít tắc lâu năm", "Da dầu, lỗ chân lông to", "Da đang lệ thuộc sản phẩm trị mụn mạnh"],
    problems: ["Mụn tái đi tái lại không dứt điểm", "Nặn mụn sai cách để lại thâm sẹo", "Da vừa đổ dầu vừa khô căng do mất nước"],
    steps: [
      { title: "Soi & đánh giá", desc: "Xác định loại mụn, mức độ viêm và tình trạng hàng rào bảo vệ trước khi can thiệp." },
      { title: "Làm sạch & kháng viêm", desc: "Lấy nhân mụn chuẩn y khoa, kháng viêm tầng sâu, kiểm soát dầu bằng hoạt chất dịu nhẹ." },
      { title: "Phục hồi & hướng dẫn", desc: "Phục hồi màng ẩm và xây routine tại nhà giúp duy trì kết quả, ngăn mụn quay lại." },
    ],
    includes: ["Soi da & tư vấn cùng kỹ thuật viên", "Lấy nhân mụn chuẩn y khoa", "Đắp mặt nạ kháng viêm phục hồi", "Hướng dẫn chăm sóc tại nhà"],
    results: ["Giảm sưng viêm rõ rệt", "Kiểm soát dầu, thông thoáng lỗ chân lông", "Hạn chế thâm và sẹo mới"],
  },
  "Nám & Sắc tố": {
    icon: "Sun",
    img: IMG + "herb-mix.png",
    forWhom: ["Nám mảng, nám sâu, tàn nhang", "Da xỉn màu, không đều màu", "Thâm sau mụn lâu ngày"],
    problems: ["Nám đậm hơn sau khi dùng kem trộn", "Da mỏng yếu vì lột tẩy quá mức", "Sạm trở lại do thiếu chống nắng đúng cách"],
    steps: [
      { title: "Phân tích sắc tố", desc: "Đánh giá loại nám, độ sâu sắc tố và tình trạng nền da để chọn cường độ phù hợp." },
      { title: "Điều trị làm sáng", desc: "Ứng dụng hoạt chất ức chế melanin và dưỡng sáng theo từng tầng, kết hợp công nghệ hỗ trợ." },
      { title: "Bảo vệ & duy trì", desc: "Xây thói quen chống nắng đủ lượng và routine dưỡng sáng bền vững tại nhà." },
    ],
    includes: ["Phân tích sắc tố chuyên sâu", "Liệu trình dưỡng sáng theo tầng", "Mặt nạ phục hồi & làm dịu", "Phác đồ chống nắng cá nhân hóa"],
    results: ["Nám mờ dần, đều màu hơn", "Da sáng khỏe tự nhiên", "Hạn chế tái sạm về sau"],
  },
  "Trẻ hóa & Nâng cơ": {
    icon: "Sparkles",
    img: IMG + "wellness-spa.png",
    forWhom: ["Da bắt đầu chùng nhão, giảm đàn hồi", "Nếp nhăn li ti, rãnh nhăn động", "Da khô ráp, thiếu sức sống tuổi 30+"],
    problems: ["Da xuống cấp nhanh sau 35 tuổi", "Dưỡng nhiều nhưng vẫn thiếu độ căng", "Lo ngại can thiệp xâm lấn mạnh"],
    steps: [
      { title: "Đánh giá lão hóa", desc: "Xác định loại nếp nhăn, độ đàn hồi và vùng cần nâng đỡ trên khuôn mặt." },
      { title: "Tái cấu trúc & nâng cơ", desc: "Ứng dụng hoạt chất kích hoạt collagen kết hợp thao tác nâng cơ, điện di dưỡng chất." },
      { title: "Duy trì độ trẻ", desc: "Thiết kế routine chống lão hóa tại nhà giúp giữ kết quả lâu dài." },
    ],
    includes: ["Đánh giá lão hóa chi tiết", "Liệu trình tái cấu trúc & nâng cơ", "Điện di tinh chất trẻ hóa", "Phác đồ chống lão hóa tại nhà"],
    results: ["Da căng mướt, đàn hồi hơn", "Đường nét gọn gàng tức thì", "Cải thiện nếp nhăn theo thời gian"],
  },
  "Phục hồi & Chuyên sâu": {
    icon: "Shield",
    img: IMG + "clinic-treatment.png",
    forWhom: ["Da mỏng yếu, dễ kích ứng mẩn đỏ", "Da tổn thương sau lột tẩy / treatment mạnh", "Da mất nước, bong tróc, châm chích"],
    problems: ["Hàng rào bảo vệ suy yếu, da nhạy cảm", "Đỏ rát, ngứa khi đổi thời tiết hoặc sản phẩm", "Da phụ thuộc corticoid, kích ứng kéo dài"],
    steps: [
      { title: "Đánh giá tổn thương", desc: "Soi tình trạng hàng rào bảo vệ, độ ẩm và mức độ nhạy cảm của làn da." },
      { title: "Làm dịu & phục hồi", desc: "Cấp ẩm đa tầng, làm dịu và tái thiết màng lipid bằng hoạt chất an toàn, không lột tẩy." },
      { title: "Củng cố & ổn định", desc: "Xây routine tối giản giúp da khỏe dần, tăng sức đề kháng trước khi điều trị chuyên sâu." },
    ],
    includes: ["Đánh giá hàng rào bảo vệ da", "Liệu trình cấp ẩm & làm dịu chuyên sâu", "Mặt nạ phục hồi sinh học", "Routine tối giản phục hồi tại nhà"],
    results: ["Da bớt đỏ rát, ổn định hơn", "Hàng rào bảo vệ khỏe, giữ ẩm tốt", "Giảm nhạy cảm, sẵn sàng cho điều trị tiếp theo"],
  },
  "Chăm sóc & Thư giãn": {
    icon: "Heart",
    img: IMG + "wellness-spa.png",
    forWhom: ["Người cần thư giãn & chăm sóc da định kỳ", "Da xỉn màu, mệt mỏi vì stress, thiếu ngủ", "Khách chuẩn bị cho sự kiện, cưới hỏi"],
    problems: ["Da thiếu sức sống, kém tươi tắn", "Bụi bẩn, bã nhờn tích tụ gây bít tắc", "Cần làn da rạng rỡ tức thì cho dịp quan trọng"],
    steps: [
      { title: "Làm sạch & thư giãn", desc: "Làm sạch sâu nhẹ nhàng kết hợp massage thư giãn giúp da và tinh thần thả lỏng." },
      { title: "Nuôi dưỡng chuyên sâu", desc: "Đắp mặt nạ và bổ sung dưỡng chất theo nhu cầu, đánh thức làn da rạng rỡ." },
      { title: "Hoàn thiện & duy trì", desc: "Khóa ẩm, chống nắng và gợi ý chăm sóc duy trì vẻ tươi tắn tại nhà." },
    ],
    includes: ["Làm sạch sâu & tẩy tế bào chết dịu nhẹ", "Massage thư giãn nâng cơ", "Mặt nạ dưỡng chuyên sâu", "Khóa ẩm & chống nắng hoàn thiện"],
    results: ["Da sạch thoáng, mềm mịn tức thì", "Rạng rỡ, tươi tắn hơn", "Thư giãn, giảm căng thẳng"],
  },
};

/** Fallback /services + /services/[slug] khi Strapi không trả dữ liệu — 1 dịch vụ tiêu biểu mỗi nhóm chính. */
export const fallbackServices = [
  {
    slug: "thiet-ke-routine-skincare-ca-nhan-hoa",
    category: "Tư vấn & Phác đồ",
    title: "Thiết kế Routine Skincare Cá nhân hóa",
    tagline: "Đọc vị làn da chuyên sâu — xây phác đồ riêng cho từng cơ địa.",
    duration: "60 phút phân tích + Đồng hành trọn liệu trình",
    price: "Tư vấn miễn phí",
    priceNote: "khi đồng hành cùng sản phẩm điều trị",
    img: IMG + "clinic-treatment.png",
    summary: "Không có một routine chung cho tất cả. Chuyên gia trực tiếp đọc vị nền da, hàng rào bảo vệ và khả năng thích nghi hoạt chất của riêng bạn, rồi thiết kế chu trình chăm sóc cá nhân hóa — điều chỉnh liên tục theo từng giai đoạn phục hồi.",
    flagship: true,
    ...serviceCategoryDefaults["Tư vấn & Phác đồ"],
  },
  {
    slug: "phuc-hoi-da-mun-an-va-bit-tac",
    category: "Điều trị mụn",
    title: "Phục hồi da mụn ẩn & Bít tắc",
    tagline: "Thông thoáng cổ nang lông, làm sạch nhân mụn ẩn dai dẳng.",
    duration: "75 phút",
    price: "750.000đ",
    priceNote: "/ buổi",
    img: IMG + "model-glow.png",
    summary: "Liệu trình tập trung làm sạch sâu và thông thoáng cổ nang lông cho da mụn ẩn, sần sùi. Kết hợp dược mỹ phẩm chọn lọc cùng thao tác lấy nhân mụn chuẩn y khoa, hạn chế tổn thương.",
    flagship: false,
    ...serviceCategoryDefaults["Điều trị mụn"],
  },
  {
    slug: "dieu-tri-nam-chuyen-sau",
    category: "Nám & Sắc tố",
    title: "Điều trị nám chuyên sâu",
    tagline: "Ức chế melanin, làm mờ nám mảng và nám sâu an toàn.",
    duration: "90 phút",
    price: "1.200.000đ",
    priceNote: "/ buổi",
    img: IMG + "herb-mix.png",
    summary: "Phác đồ xử lý nám mảng, nám sâu bằng cơ chế ức chế melanin kết hợp dưỡng sáng và củng cố hàng rào bảo vệ. Đề cao an toàn, tránh bào mòn da — phù hợp cả da nhạy cảm.",
    flagship: false,
    ...serviceCategoryDefaults["Nám & Sắc tố"],
  },
  {
    slug: "tre-hoa-chuyen-sau-nang-co-tuc-thi",
    category: "Trẻ hóa & Nâng cơ",
    title: "Trẻ hóa chuyên sâu & Nâng cơ tức thì",
    tagline: "Kích hoạt collagen, nâng đỡ đường nét, trả lại độ căng mướt.",
    duration: "80 phút",
    price: "1.500.000đ",
    priceNote: "/ buổi",
    img: IMG + "wellness-spa.png",
    summary: "Liệu trình trẻ hóa kết hợp hoạt chất tái cấu trúc và thao tác nâng cơ, cải thiện nếp nhăn, độ đàn hồi và đường viền khuôn mặt — hướng tới vẻ tươi trẻ tự nhiên, không cứng đơ.",
    flagship: false,
    ...serviceCategoryDefaults["Trẻ hóa & Nâng cơ"],
  },
];

/* ---------- SHOP filters/sort ---------- */
export const productTypes = ["Serum", "Toner", "Kem dưỡng", "Sữa rửa mặt"];
export const skinTypes = ["Da dầu", "Da khô", "Da hỗn hợp", "Da nhạy cảm"];

export const PRICE_BANDS = [
  { id: "all", label: "Tất cả mức giá", test: () => true },
  { id: "u1", label: "Dưới 1.000.000₫", test: (p) => p.priceValue < 1000000 },
  { id: "1-2", label: "1 – 2 triệu", test: (p) => p.priceValue >= 1000000 && p.priceValue < 2000000 },
  { id: "2-3", label: "2 – 3 triệu", test: (p) => p.priceValue >= 2000000 && p.priceValue < 3000000 },
  { id: "o3", label: "Trên 3 triệu", test: (p) => p.priceValue >= 3000000 },
];

export const SORTS = [
  { id: "featured", label: "Nổi bật" },
  { id: "price-asc", label: "Giá: Thấp → Cao" },
  { id: "price-desc", label: "Giá: Cao → Thấp" },
  { id: "rating", label: "Đánh giá cao" },
];

/** Fallback /shop + /shop/[slug] — 10 sản phẩm ported từ `data-pages.jsx` productCatalog. */
export const fallbackProductsCatalog = [
  { slug: "restorative-ha-serum", id: "pc1", brand: "Hydrinity · USA", name: "Restorative HA Serum", type: "Serum", skinTypes: ["Da khô", "Da nhạy cảm", "Da hỗn hợp"], tag: "Da khô", price: "2.890.000₫", priceValue: 2890000, oldPrice: "", badge: "Bán chạy", img: "/assets/product-hydrinity.png", rating: 5, reviews: 124, description: "Serum Hyaluronic Acid đa phân tử cấp nước sâu, phục hồi hàng rào ẩm cho da khô và mất nước." },
  { slug: "rescue-epidermal-repair", id: "pc2", brand: "Osmosis MD · USA", name: "Rescue Epidermal Repair", type: "Serum", skinTypes: ["Da nhạy cảm", "Da khô"], tag: "Da nhạy cảm", price: "3.250.000₫", priceValue: 3250000, oldPrice: "", badge: "Mới", img: "/assets/product-osmosis.png", rating: 5, reviews: 86, description: "Tinh chất phục hồi tổn thương biểu bì, làm dịu mẩn đỏ cho da yếu sau treatment." },
  { slug: "dark-spot-lifting-serum", id: "pc3", brand: "Vi Derm · USA", name: "Dark Spot Lifting Serum", type: "Serum", skinTypes: ["Da hỗn hợp", "Da dầu"], tag: "Da hỗn hợp", price: "2.490.000₫", priceValue: 2490000, oldPrice: "", badge: null, img: "/assets/product-viderm.png", rating: 5, reviews: 73, description: "Serum làm mờ thâm nám, dưỡng sáng và đều màu da nhờ hoạt chất ức chế melanin." },
  { slug: "cell-soft-toning-lotion", id: "pc4", brand: "Nescens · Switzerland", name: "Cell-Soft Toning Lotion", type: "Toner", skinTypes: ["Da khô", "Da hỗn hợp"], tag: "Da khô", price: "1.890.000₫", priceValue: 1890000, oldPrice: "2.220.000₫", badge: "−15%", img: "/assets/product-nescens.jpg", rating: 4, reviews: 58, description: "Toner cân bằng và cấp ẩm dịu nhẹ, chuẩn bị nền da hấp thu dưỡng chất tốt hơn." },
  { slug: "hyacical-ha-daily-serum", id: "pc5", brand: "Hydrinity · USA", name: "Hyacical HA Daily Serum", type: "Serum", skinTypes: ["Da hỗn hợp", "Da dầu"], tag: "Da hỗn hợp", price: "2.390.000₫", priceValue: 2390000, oldPrice: "", badge: null, img: "/assets/product-ha-serum.png", rating: 5, reviews: 41, description: "Serum dưỡng ẩm thường ngày, mỏng nhẹ thẩm thấu nhanh cho da hỗn hợp." },
  { slug: "balancing-clarity-toner", id: "pc6", brand: "Neoderma · Netherlands", name: "Balancing Clarity Toner", type: "Toner", skinTypes: ["Da dầu", "Da hỗn hợp"], tag: "Da dầu", price: "1.650.000₫", priceValue: 1650000, oldPrice: "", badge: null, img: "/assets/product-neoderma.png", rating: 4, reviews: 37, description: "Toner thông thoáng cổ nang lông, kiểm soát dầu thừa cho da dầu mụn." },
  { slug: "serum-ampoule-concentre", id: "pc7", brand: "Biologique Recherche · FR", name: "Sérum Ampoule Concentré", type: "Serum", skinTypes: ["Da khô", "Da hỗn hợp"], tag: "Da khô", price: "3.650.000₫", priceValue: 3650000, oldPrice: "", badge: "Cao cấp", img: IMG + "product-ampoule.png", rating: 5, reviews: 52, description: "Ampoule cô đặc tái thiết sinh học, phục hồi và làm rạng rỡ làn da chuyên sâu." },
  { slug: "creme-restructurante", id: "pc8", brand: "Biologique Recherche · FR", name: "Crème Restructurante", type: "Kem dưỡng", skinTypes: ["Da khô", "Da nhạy cảm"], tag: "Da khô", price: "2.980.000₫", priceValue: 2980000, oldPrice: "", badge: null, img: IMG + "product-cream.png", rating: 5, reviews: 64, description: "Kem dưỡng tái cấu trúc, nuôi dưỡng và khóa ẩm cho làn da mềm mướt." },
  { slug: "effaclar-purifying-foam", id: "pc9", brand: "La Roche-Posay · FR", name: "Effaclar Purifying Foam", type: "Sữa rửa mặt", skinTypes: ["Da dầu", "Da hỗn hợp"], tag: "Da dầu", price: "520.000₫", priceValue: 520000, oldPrice: "", badge: "Bán chạy", img: IMG + "product-foam.png", rating: 4, reviews: 198, description: "Gel rửa mặt tạo bọt làm sạch sâu, kiểm soát dầu dịu nhẹ cho da dầu mụn." },
  { slug: "barrier-repair-cream", id: "pc10", brand: "Osmosis MD · USA", name: "Barrier Repair Cream", type: "Kem dưỡng", skinTypes: ["Da nhạy cảm", "Da khô"], tag: "Da nhạy cảm", price: "2.150.000₫", priceValue: 2150000, oldPrice: "2.530.000₫", badge: "−15%", img: IMG + "product-repair.png", rating: 5, reviews: 47, description: "Kem phục hồi hàng rào bảo vệ, làm dịu và củng cố da mỏng yếu, dễ kích ứng." },
];

/* ---------- BLOG ---------- */
export const blogCategories = ["Tất cả", "Kiến thức da liễu", "Hoạt chất", "Routine", "Câu chuyện phục hồi"];

/** Fallback /blog + /blog/[slug] — 6 bài ported từ `data-pages.jsx` blogPosts. */
export const fallbackBlogPosts = [
  { slug: "hang-rao-bao-ve-da-nen-tang-cua-moi-lan-da-khoe", category: "Hoạt chất", date: "Ngày 02 Tháng 09, 2026", readTime: "6 phút đọc", author: "ThS. DS. Hoàng Hồng Thắm", featured: true, img: IMG + "clinic-treatment.png", title: "Hàng rào bảo vệ da: nền tảng của mọi làn da khỏe", excerpt: "Vì sao phục hồi hàng rào bảo vệ luôn là bước đầu tiên trong mọi phác đồ tại Lennie? Cùng đọc vị cơ chế mất nước xuyên biểu bì và cách củng cố màng lipid đúng khoa học.", body: toBlocks(["Vì sao phục hồi hàng rào bảo vệ luôn là bước đầu tiên trong mọi phác đồ tại Lennie? Cùng đọc vị cơ chế mất nước xuyên biểu bì và cách củng cố màng lipid đúng khoa học."]) },
  { slug: "ca-nhan-hoa-routine-vi-sao-khong-co-cong-thuc-chung", category: "Routine", date: "Ngày 24 Tháng 08, 2026", readTime: "5 phút đọc", author: "DS. Mai Phương Anh", featured: false, img: IMG + "wellness-spa.png", title: "Cá nhân hóa routine: vì sao không có công thức chung", excerpt: "Mỗi làn da là một cơ địa riêng. Bài viết phân tích vì sao việc sao chép routine của người khác có thể khiến da bạn tệ hơn.", body: toBlocks(["Mỗi làn da là một cơ địa riêng. Bài viết phân tích vì sao việc sao chép routine của người khác có thể khiến da bạn tệ hơn."]) },
  { slug: "nam-va-tang-sac-to-hieu-dung-de-dieu-tri-an-toan", category: "Kiến thức da liễu", date: "Ngày 15 Tháng 08, 2026", readTime: "7 phút đọc", author: "ThS. BS. Lê Hoài Nam", featured: false, img: IMG + "model-glow.png", title: "Nám và tăng sắc tố: hiểu đúng để điều trị an toàn", excerpt: "Phân biệt nám mảng, nám sâu, tàn nhang và tăng sắc tố sau viêm — cùng nguyên tắc điều trị an toàn không bào mòn da.", body: toBlocks(["Phân biệt nám mảng, nám sâu, tàn nhang và tăng sắc tố sau viêm — cùng nguyên tắc điều trị an toàn không bào mòn da."]) },
  { slug: "hanh-trinh-phuc-hoi-da-mun-viem-sau-6-tuan", category: "Câu chuyện phục hồi", date: "Ngày 04 Tháng 08, 2026", readTime: "4 phút đọc", author: "Lennie SkinLab", featured: false, img: IMG + "herb-mix.png", title: "Hành trình phục hồi da mụn viêm sau 6 tuần", excerpt: "Câu chuyện thật về một khách hàng đồng hành cùng Dược sĩ Thắm, từ làn da sưng viêm đến phục hồi khỏe mạnh.", body: toBlocks(["Câu chuyện thật về một khách hàng đồng hành cùng Dược sĩ Thắm, từ làn da sưng viêm đến phục hồi khỏe mạnh."]) },
  { slug: "retinol-cho-nguoi-moi-bat-dau-the-nao-cho-dung", category: "Hoạt chất", date: "Ngày 28 Tháng 07, 2026", readTime: "6 phút đọc", author: "ThS. DS. Đỗ Hải Yến", featured: false, img: "/assets/lennie-feature.jpg", title: "Retinol cho người mới: bắt đầu thế nào cho đúng", excerpt: "Hướng dẫn làm quen với retinol mà không gây kích ứng — nồng độ, tần suất và cách kết hợp dưỡng ẩm.", body: toBlocks(["Hướng dẫn làm quen với retinol mà không gây kích ứng — nồng độ, tần suất và cách kết hợp dưỡng ẩm."]) },
  { slug: "chong-nang-dung-cach-buoc-quan-trong-nhat", category: "Routine", date: "Ngày 19 Tháng 07, 2026", readTime: "5 phút đọc", author: "DS. Phạm Thành Nam", featured: false, img: IMG + "clinic-treatment.png", title: "Chống nắng đúng cách: bước quan trọng nhất", excerpt: "Lượng dùng, chỉ số và thói quen apply lại — những điều quyết định hiệu quả thật sự của kem chống nắng.", body: toBlocks(["Lượng dùng, chỉ số và thói quen apply lại — những điều quyết định hiệu quả thật sự của kem chống nắng."]) },
];

/* ---------- BOOKING ---------- */
export const BOOK_SLOTS = ["08:30", "10:00", "11:15", "13:30", "14:45", "16:00", "17:15", "18:45"];

/* ---------- BRANCHES (fallback /booking, /contact) ---------- */
export const branches = [
  { name: "TP. Hồ Chí Minh", tag: "Clinic chính", address: "Lầu 1, 142 Võ Văn Tần, P. Võ Thị Sáu, Quận 3, TP.HCM", note: "[PLACEHOLDER - số nhà cụ thể, chờ client xác nhận]", phone: "+84 909 123 456", hours: "T2 – T7 · 8:00 – 20:00" },
  { name: "Hà Nội Flagship", tag: "Clinic", address: "Hà Nội Flagship Clinic", note: "[PLACEHOLDER - địa chỉ cụ thể, chờ client cung cấp]", phone: "+84 909 123 456", hours: "T2 – T7 · 8:00 – 20:00" },
  { name: "Tư vấn từ xa", tag: "Online toàn cầu", address: "Phục vụ khách kiều bào tại Mỹ, Hàn, Nhật, châu Âu, Singapore", note: "Qua Zalo / Messenger", phone: "+84 909 123 456", hours: "Linh hoạt theo múi giờ" },
];

/* ---------- ABOUT ---------- */
export const brandValues = [
  { title: "Cá nhân hóa", desc: "Mỗi làn da được đọc vị riêng và xây liệu trình phù hợp từng cơ địa, từng thời điểm.", icon: "User" },
  { title: "Chuyên môn", desc: "Ứng dụng dược mỹ phẩm chính xác, an toàn, không chạy theo xu hướng ngắn hạn.", icon: "Microscope" },
  { title: "Minh bạch", desc: "Rõ ràng về sản phẩm, chi phí và khả năng cải thiện — không phóng đại kết quả.", icon: "Shield" },
  { title: "Bền vững", desc: "Hướng tới làn da khỏe từ gốc và đồng hành lâu dài, thay vì hiệu quả tức thời.", icon: "Leaf" },
];

export const founderTimeline = [
  { year: "2019", title: "Khởi nguồn Lennie SkinLab", desc: "Ra đời từ triết lý cá nhân hóa, đặt chuyên môn dược mỹ phẩm làm gốc." },
  { year: "2021", title: "Mở rộng theo dõi từ xa", desc: "Phục vụ khách kiều bào toàn cầu qua mô hình tư vấn và đồng hành trực tuyến." },
  { year: "2023", title: "Hợp tác 50+ thương hiệu", desc: "Liên kết ủy quyền trực tiếp với các nhãn dược mỹ phẩm quốc tế hàng đầu." },
  { year: "2026", title: "1.200+ khách hàng đồng hành", desc: "98% tỷ lệ phục hồi thành công và liên tục được giới thiệu người thân." },
];
