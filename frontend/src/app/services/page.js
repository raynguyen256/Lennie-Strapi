import ServicesView from "@/components/services/ServicesView";
import { getServicesArchive, getFaqsList } from "@/lib/page-content";

export const metadata = {
  title: "Dịch Vụ Điều Trị · Lennie SkinLab",
  description: "Các phác đồ điều trị da chuyên sâu, cá nhân hóa theo từng tình trạng da tại Lennie SkinLab.",
};

export default async function ServicesPage() {
  const [services, faqs] = await Promise.all([getServicesArchive(), getFaqsList()]);
  return <ServicesView services={services} faqs={faqs} />;
}
