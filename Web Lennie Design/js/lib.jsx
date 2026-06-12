/* ============================================================
   Lennie SkinLab — shared library: icons, hooks, data
   ============================================================ */
const { useState, useEffect, useRef } = React;

/* ---------- ICONS (inline lucide-style SVGs) ---------- */
function Svg(props) {
  const { children, size = 24, stroke = 1.7, ...rest } = props;
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" {...rest}>
      {children}
    </svg>
  );
}
const Icon = {
  Search: (p) => <Svg {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></Svg>,
  Bag: (p) => <Svg {...p}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></Svg>,
  Menu: (p) => <Svg {...p}><path d="M3 6h18M3 12h18M3 18h18"/></Svg>,
  X: (p) => <Svg {...p}><path d="M18 6 6 18M6 6l12 12"/></Svg>,
  Heart: (p) => <Svg {...p}><path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z"/></Svg>,
  HeartPulse: (p) => <Svg {...p}><path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z"/><path d="M3.2 12H8l1.5-3 3 6 1.5-3h4.8"/></Svg>,
  Award: (p) => <Svg {...p}><circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/></Svg>,
  Shield: (p) => <Svg {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></Svg>,
  Check: (p) => <Svg {...p}><path d="M20 6 9 17l-5-5"/></Svg>,
  CheckCircle: (p) => <Svg {...p}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></Svg>,
  HeartHandshake: (p) => <Svg {...p}><path d="M19 14c1.5-1.5 3-3.3 3-5.5A4.5 4.5 0 0 0 12 5 4.5 4.5 0 0 0 2 8.5c0 2.2 1.5 4 3 5.5l7 7Z"/><path d="m12 5 1.9 1.9a2.1 2.1 0 0 1 0 3L12 11.8"/></Svg>,
  ChevronR: (p) => <Svg {...p}><path d="m9 18 6-6-6-6"/></Svg>,
  ChevronL: (p) => <Svg {...p}><path d="m15 18-6-6 6-6"/></Svg>,
  Activity: (p) => <Svg {...p}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></Svg>,
  Globe: (p) => <Svg {...p}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/></Svg>,
  Sparkles: (p) => <Svg {...p}><path d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4z"/><path d="M19 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/></Svg>,
  Star: (p) => <Svg {...p}><path d="m12 2 3 6.5 7 .8-5 4.7 1.3 7L12 17.8 5.4 21l1.3-7-5-4.7 7-.8z"/></Svg>,
  Mail: (p) => <Svg {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></Svg>,
  MailCheck: (p) => <Svg {...p}><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9"/><path d="m2 7 10 6 10-6"/><path d="m16 19 2 2 4-4"/></Svg>,
  Phone: (p) => <Svg {...p}><path d="M5 3h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-3"/></Svg>,
  Pin: (p) => <Svg {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></Svg>,
  Clock: (p) => <Svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></Svg>,
  ArrowR: (p) => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Svg>,
  Message: (p) => <Svg {...p}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></Svg>,
  Calendar: (p) => <Svg {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></Svg>,
  User: (p) => <Svg {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></Svg>,
  Sun: (p) => <Svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></Svg>,
  Droplet: (p) => <Svg {...p}><path d="M12 2.7 6.3 9a8 8 0 1 0 11.4 0z"/></Svg>,
  Clipboard: (p) => <Svg {...p}><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></Svg>,
  Plus: (p) => <Svg {...p}><path d="M12 5v14M5 12h14"/></Svg>,
  Flask: (p) => <Svg {...p}><path d="M9 3h6M10 3v6L5 19a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-10V3"/><path d="M7.5 14h9"/></Svg>,
  Microscope: (p) => <Svg {...p}><path d="M6 18h8M3 22h18M14 22a7 7 0 0 0 0-14"/><path d="M9 14h2a4 4 0 0 0 0-8H9z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></Svg>,
  Leaf: (p) => <Svg {...p}><path d="M11 20A7 7 0 0 1 4 13c0-6 7-9 16-9 0 9-3 16-9 16z"/><path d="M4 21c5-7 9-9 13-10"/></Svg>,
};

/* ---------- HOOKS ---------- */
// Scroll reveal: returns ref + visible bool
function useReveal(opts) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: '-40px', ...(opts || {}) });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, shown];
}

// Count-up number triggered when visible
function useCountUp(target, duration = 1800) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min((t - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.floor(eased * target));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [target]);
  const fmt = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return [ref, fmt(val)];
}

/* ---------- DATA ---------- */
const IMG = 'assets/remix/';

const productData = [
  { id: 'p1', brand: 'Hydrinity · USA', name: 'Restorative HA Serum', tag: 'Phục hồi · Cấp nước',
    price: '2.890.000₫', img: 'assets/product-hydrinity.png', badge: 'Bán chạy', cats: ['#XEMTẤTCẢ', '#BÁNCHẠY', '#PHỤCHỒIDA', '#CẤPẨMSÂU'] },
  { id: 'p2', brand: 'Osmosis MD · USA', name: 'Rescue Epidermal Repair', tag: 'Phục hồi tổn thương',
    price: '3.250.000₫', img: 'assets/product-osmosis.png', badge: 'Mới', cats: ['#XEMTẤTCẢ', '#PHỤCHỒIDA'] },
  { id: 'p3', brand: 'Vi Derm · USA', name: 'Dark Spot Lifting Serum', tag: 'Nám · Sắc tố',
    price: '2.490.000₫', img: 'assets/product-viderm.png', badge: null, cats: ['#XEMTẤTCẢ', '#BÁNCHẠY'] },
  { id: 'p4', brand: 'Nescens · Switzerland', name: 'Cell-Soft Toning Lotion', tag: 'Toner · Cấp ẩm',
    price: '1.890.000₫', img: 'assets/product-nescens.jpg', badge: '−15%', cats: ['#XEMTẤTCẢ', '#CẤPẨMSÂU'] },
];

const servicesSlides = [
  { tag: 'ROUTINE LÂM SÀNG CÁ NHÂN HÓA', title: 'Thiết kế chu trình chuyên biệt',
    desc: 'ThS. DS. Hoàng Hồng Thắm trực tiếp thăm khám lâm sàng, bóc tách chỉ số sinh học làn da nhằm thiết kế routine mượt mà, hạn chế tối đa nguy cơ kích ứng cho riêng bạn.',
    img: IMG + 'clinic-treatment.png' },
  { tag: 'DƯỢC CHẤT THẢO DƯỢC QUÝ HIẾM', title: 'Hoạt chất bóc tách phân tử tinh khiết',
    desc: 'Sự giao thoa hoàn hảo giữa các thảo dược chứa adaptogen thích ứng quý hiếm kết hợp hoạt chất sinh học tiên tiến bóc tách phân tử tối ưu giúp hồi sinh nhanh chóng tế bào hư tổn.',
    img: IMG + 'herb-mix.png' },
  { tag: 'KỶ LỤC LÂM SÀNG TẠI CLINIC', title: 'Phác đồ hồi phục thực tế trên 98%',
    desc: 'Lennie Clinic từ chối những thuật ngữ sáo rỗng. Mọi phác đồ trị liệu đều bám sát chặt chẽ sự phát triển tế bào của khách để khôi phục lớp màng sinh học nguyên bản, đạt kết quả mướt mịn thực tế.',
    img: IMG + 'model-glow.png' },
  { tag: 'CỐ VẤN KHOA HỌC ĐỒNG HÀNH', title: 'Chăm da sát sườn 24/7 từ tâm',
    desc: 'Không chỉ kê đơn sản phẩm, Lennie SkinLab là cố vấn thẩm mỹ đồng hành lâu dài, liên tục bám sát sự phục hồi và kiểm soát sinh lý biểu bì định kỳ hàng tuần cho bạn.',
    img: IMG + 'wellness-spa.png' },
];

const partnerBrands = ['Biologique Recherche', 'Obagi Medical', 'La Roche-Posay', 'Skinceuticals', 'Medik8', 'Isdin', 'Hydrinity', 'Osmosis MD'];

const mantraCards = [
  { title: 'Khơi Nguồn Sinh Lực Da', desc: 'Cung cấp vitamin và hoạt chất vi lượng giúp khôi phục hệ miễn dịch tự nhiên của làn da.', icon: 'Activity' },
  { title: 'Bảo Vệ Đa Tầng Tế Bào', desc: 'Củng cố hàng rào giữ ẩm, chống mất nước xuyên biểu bì và làm chậm lão hóa sớm.', icon: 'Heart' },
  { title: 'Cân Bằng Sinh Học', desc: 'Thiết kế độ pH dịu mượt và thúc đẩy chu trình tái sinh tế bào không bong tróc.', icon: 'Globe' },
  { title: 'Minh Bạch Y Khoa', desc: '100% dòng sản phẩm tuyển chọn sở hữu chứng nhận lâm sàng quốc tế khắt khe nhất.', icon: 'Sparkles' },
];

const teamData = [
  { name: 'DS. Phạm Thành Nam', role: 'Dược sĩ tư vấn chuyên môn', img: IMG + 'team-1.png' },
  { name: 'KTV. Nguyễn Thùy Trang', role: 'Trưởng nhóm Kỹ thuật viên', img: IMG + 'team-2.png' },
  { name: 'DS. Mai Phương Anh', role: 'Chuyên viên nghiên cứu hoạt chất', img: IMG + 'team-3.png' },
  { name: 'ThS. BS. Lê Hoài Nam', role: 'Thạc sĩ · Bác sĩ Da liễu Lâm sàng', img: IMG + 'team-4.png' },
  { name: 'BS. Trịnh Quốc Khánh', role: 'Chuyên gia Trị liệu Công nghệ cao', img: IMG + 'team-5.png' },
  { name: 'ThS. DS. Đỗ Hải Yến', role: 'Nhà nghiên cứu Công thức Mỹ phẩm', img: IMG + 'team-6.png' },
];

const reviewsData = [
  { name: 'Phạm Minh Trí', caseType: 'Phục hồi mụn mủ', stars: 5,
    text: '"Tôi cực kỳ ấn tượng với phác đồ dược mỹ phẩm sắc sảo của ThS. Hoàng Hồng Thắm. Da tôi từ sưng viêm kích ứng đau rát nặng nề giờ đã khôi phục khỏe mạnh, mướt mát hẳn lên chỉ sau một tháng rưỡi."',
    img: IMG + 'team-1.png', improvement: 'Khắc phục sưng viêm & Thâm sâu', beforeState: 'Mụn viêm sưng tấy', afterState: 'Da phẳng, sạch nhân mụn', duration: '6 tuần', expertNote: 'Giảm viêm tầng sâu, kiểm soát dầu thừa' },
  { name: 'Nguyễn Thanh Hằng', caseType: 'Điều trị sắc tố', stars: 5,
    text: '"Tôi đã dùng nhiều dòng treatment đắt đỏ nhưng không thấy da sáng mịn khỏe khoắn như khi chuyển hẳn sang phác đồ thích ứng sinh học của Lennie SkinLab. Da hồng hào, căng mượt rạng rỡ hẳn lên."',
    img: IMG + 'model-glow.png', improvement: 'Tái tạo sắc tố & Sáng mịn', beforeState: 'Sạm xỉn & Đốm nâu sẫm', afterState: 'Sáng hồng, căng bóng', duration: '8 tuần', expertNote: 'Ức chế melanin, thúc đẩy sinh trưởng' },
  { name: 'Trần Thế Vũ', caseType: 'Tái tạo thâm sẹo', stars: 5,
    text: '"Lennie SkinLab đặt chuẩn rất cao cho việc chăm sóc khách hàng. Không gian vô cùng tinh tế, lịch hẹn chuẩn xác và Dược sĩ Thắm bám sát da tôi hàng tuần, dặn dò vô cùng chu đáo tỉ mỉ."',
    img: IMG + 'team-3.png', improvement: 'Khôi phục hàng rào bảo vệ', beforeState: 'Da yếu lộ mao mạch đỏ', afterState: 'Nền da khỏe, dày dặn', duration: '4 tuần', expertNote: 'Củng cố màng vi sinh và độ ẩm nội bào' },
  { name: 'Nguyễn Thị Cẩm Tú', caseType: 'Trẻ hóa chuyên sâu', stars: 5,
    text: '"Dịch vụ chăm sóc tại đây thực sự chu đáo vượt ngoài mong đợi. Da tuổi 35 của tôi vốn dĩ sạm héo khô ráp, giờ lúc nào cũng được cấp nước căng mọng mướt mát hệt như được phục sinh."',
    img: IMG + 'team-2.png', improvement: 'Lấp đầy nếp nhăn & Căng đầy', beforeState: 'Nếp nhăn khô ráp, sạm sâu', afterState: 'Đàn hồi săn chắc, mướt mát', duration: '5 tuần', expertNote: 'Kích hoạt nguyên bào collagen tự nhiên' },
];

const servicesForBooking = [
  { id: 'flagship', name: 'Thiết kế Routine Cá nhân hóa', price: 'Tư vấn miễn phí' },
  { id: 'acne', name: 'Phục hồi da mụn & Kiểm soát bã nhờn', price: '750.000đ' },
  { id: 'pigment', name: 'Điều trị nám chuyên sâu & Sáng da', price: '1.200.000đ' },
  { id: 'aging', name: 'Trẻ hóa chuyên sâu & Nâng cơ', price: '1.500.000đ' },
];

const quizQuestions = [
  { id: 1, key: 'skinType', type: 'select',
    question: 'Da bạn thuộc nhóm nào khi để mặt mộc sau 1 giờ rửa mặt?',
    options: ['Khô ráp, căng tức khắp mặt', 'Đổ dầu nhiều toàn bộ khuôn mặt', 'Chỉ bóng dầu vùng chữ T, hai bên má khô', 'Bình thường, mịn màng, cân bằng', 'Đỏ ráp, dễ ngứa châm chích khi đổi thời tiết'] },
  { id: 2, key: 'primaryConcern', type: 'select',
    question: 'Mối quan tâm lớn nhất bạn muốn khắc phục hiện tại là gì?',
    options: ['Mụn trứng cá, mụn ẩn, sưng viêm, bít tắc', 'Vết thâm, sạm màu, tàn nhang, nám mảng / nám sâu', 'Da xỉn màu, thiếu sức sống, lỗ chân lông to', 'Nếp nhăn li ti, da chùng nhão, giảm đàn hồi', 'Mất nước, mẩn đỏ, yếu do dùng treatment quá liều'] },
  { id: 3, key: 'sunExposure', type: 'select',
    question: 'Một ngày bạn tiếp xúc với ánh nắng mặt trời khoảng bao lâu?',
    options: ['Dưới 1 giờ (chủ yếu trong nhà)', 'Từ 1 đến 3 giờ (di chuyển ngoài đường)', 'Trên 3 giờ (làm việc ngoài trời)'] },
  { id: 4, key: 'userName', type: 'input', placeholder: 'Ví dụ: Nguyễn Khánh Linh',
    question: 'Nhập tên của bạn để nhận phác đồ cá nhân từ Dược sĩ Thắm:' },
];

function generateRoutine(answers) {
  const { skinType, primaryConcern, userName } = answers;
  const name = userName || 'Khách hàng thân yêu';
  let skinAnalysis = '', am = [], pm = [], advice = '';
  if (skinType && skinType.includes('Khô ráp')) {
    skinAnalysis = 'Nền da của bạn đang thiếu hụt màng lipid tự nhiên, dẫn đến mất nước xuyên biểu bì (TEWL). Cần ưu tiên cấp ẩm sâu đa tầng và thiết lập lại hàng rào bảo vệ.';
    am = ['Sữa rửa mặt dịu nhẹ pH 5.5', 'Toner Nescens phục hồi màng ẩm', 'Serum Hyaluronic Acid (Hydrinity) cấp nước', 'Kem dưỡng phục hồi màng lipid', 'Kem chống nắng phổ rộng (Isdin)'];
    pm = ['Nước tẩy trang dịu làm sạch', 'Sữa rửa mặt cấp ẩm', 'Toner cân bằng pH', 'Serum B5 / HA cấp nước sâu', 'Kem dưỡng phục hồi ban đêm'];
  } else if (skinType && skinType.includes('Đổ dầu')) {
    skinAnalysis = 'Tuyến bã nhờn hoạt động quá mức, có thể do thiếu ẩm giả tạo hoặc cổ nang lông to. Ưu tiên làm sạch sâu và hoạt chất kiềm dầu kháng viêm nhẹ.';
    am = ['Gel rửa mặt La Roche-Posay Effaclar', 'Toner Neoderma kiểm soát dầu', 'Serum Niacinamide 10% (Medik8)', 'Gel dưỡng ẩm mỏng nhẹ, không dầu', 'Kem chống nắng kiềm dầu, không gây mụn'];
    pm = ['Nước tẩy trang micellar làm sạch sâu', 'Gel rửa mặt tạo bọt kiểm soát dầu', 'Toner thông thoáng cổ nang lông', 'Serum BHA 2% (3 tối/tuần)', 'Gel dưỡng ẩm phục hồi màng nước'];
  } else if (skinType && skinType.includes('châm chích')) {
    skinAnalysis = 'Làn da đang ở trạng thái cực kỳ nhạy cảm, hàng rào bảo vệ đã tổn thương nghiêm trọng. Nghiêm cấm mọi hoạt chất lột tẩy mạnh trong giai đoạn này.';
    am = ['Rửa mặt siêu dịu nhẹ với nước ấm', 'Toner Centella làm dịu mẩn đỏ', 'Serum Osmosis Rescue MD tái tạo', 'Kem dưỡng phục hồi Hydrinity', 'Kem chống nắng vật lý an toàn, không cồn'];
    pm = ['Nước tẩy trang dịu cho da tổn thương', 'Sữa rửa mặt phục hồi', 'Xịt khoáng làm dịu tức thì', 'Serum Osmosis Rescue MD phục hồi', 'Kem dưỡng khóa ẩm sâu'];
  } else {
    skinAnalysis = 'Nền da hỗn hợp thiên dầu hoặc bình thường. Cần duy trì cân bằng dầu - nước, tăng cường dưỡng sáng và duy trì sự tươi trẻ bền vững.';
    am = ['Sữa rửa mặt cân bằng pH', 'Toner cấp ẩm nhẹ', 'Serum Vitamin C (Skinceuticals)', 'Kem dưỡng ẩm mỏng nhẹ', 'Kem chống nắng phổ rộng'];
    pm = ['Tẩy trang làm sạch bụi mịn', 'Sữa rửa mặt tạo bọt dịu nhẹ', 'Toner cân bằng biểu bì', 'Serum Niacinamide / Retinol 0.3%', 'Kem dưỡng phục hồi ban đêm'];
  }
  if (primaryConcern && primaryConcern.includes('Mụn')) advice = 'Lời khuyên từ Dược sĩ Thắm: Tập trung làm sạch thông thoáng cổ nang lông bằng BHA 2% và kháng viêm bằng Niacinamide / Azelaic Acid. Tuyệt đối không tự nặn mụn bọc viêm tại nhà để tránh sẹo lõm.';
  else if (primaryConcern && primaryConcern.includes('thâm')) advice = 'Lời khuyên từ Dược sĩ Thắm: Da bạn cần hoạt chất ức chế melanin như Tranexamic Acid phối hợp Vitamin C buổi sáng. Luôn chống nắng đủ lượng (2 đốt ngón tay) mỗi ngày.';
  else if (primaryConcern && primaryConcern.includes('nhăn')) advice = 'Lời khuyên từ Dược sĩ Thắm: Làm quen với Retinol bọc phân tử để thúc đẩy collagen, kết hợp điện di peptide trẻ hóa nâng đỡ cơ mặt chùng nhão.';
  else advice = 'Lời khuyên từ Dược sĩ Thắm: Ưu tiên phục hồi tối đa, củng cố hàng rào lipid cho đến khi da hết đỏ rát châm chích trước khi điều trị làm sáng hay chống lão hóa mạnh.';
  return { customerName: name, skinAnalysis, morningSteps: am, eveningSteps: pm, expertAdvice: advice };
}

Object.assign(window, {
  Icon, useReveal, useCountUp,
  productData, servicesSlides, partnerBrands, mantraCards, teamData,
  reviewsData, servicesForBooking, quizQuestions, generateRoutine,
});
