import TestimonialsView from "@/components/testimonials/TestimonialsView";
import { getTestimonialsArchive } from "@/lib/page-content";

export const metadata = {
  title: "Cảm Nhận Khách Hàng · Lennie SkinLab",
  description: "Hành trình thay đổi làn da thực tế từ khách hàng đã trải nghiệm phác đồ điều trị tại Lennie SkinLab.",
};

export default async function TestimonialsPage() {
  const reviews = await getTestimonialsArchive();
  return <TestimonialsView reviews={reviews} />;
}
