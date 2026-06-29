import CaseStudyView from "@/components/case-study/CaseStudyView";
import { getCaseStudyContent } from "@/lib/page-content";

export const metadata = {
  title: "Lennie SkinLab | Câu Chuyện Khách Hàng",
  description:
    "Lưu giữ lại hành trình của những làn da từng điều trị tại Lennie. Câu chuyện thực tế, kết quả thực tế từ phác đồ phù hợp và sự kiên trì.",
};

export default async function CaseStudyPage() {
  const content = await getCaseStudyContent();
  return <CaseStudyView content={content} />;
}
