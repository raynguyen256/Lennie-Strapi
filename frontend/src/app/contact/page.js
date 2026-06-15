import ContactView from "@/components/contact/ContactView";
import { getContactContent } from "@/lib/page-content";

export const metadata = {
  title: "Liên Hệ · Lennie SkinLab",
  description: "Thông tin liên hệ, địa chỉ, giờ làm việc và kênh tư vấn nhanh của Lennie SkinLab.",
};

export default async function ContactPage() {
  const content = await getContactContent();
  return <ContactView content={content} />;
}
