import AboutView from "@/components/about/AboutView";
import { getAboutContent } from "@/lib/page-content";

export const metadata = {
  title: "Về Chúng Tôi · Lennie SkinLab",
  description: "Câu chuyện, đội ngũ chuyên môn và triết lý chăm sóc da cá nhân hóa của Lennie SkinLab.",
};

export default async function AboutPage() {
  const content = await getAboutContent();
  return <AboutView content={content} />;
}
