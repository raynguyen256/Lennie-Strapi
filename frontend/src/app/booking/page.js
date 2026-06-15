import BookingView from "@/components/booking/BookingView";
import { getBookingContent } from "@/lib/page-content";

export const metadata = {
  title: "Đặt Lịch · Lennie SkinLab",
  description: "Đặt lịch trị liệu cùng chuyên gia tại Lennie SkinLab — chọn dịch vụ và để lại thông tin để được tư vấn nhanh nhất.",
};

export default async function BookingPage() {
  const content = await getBookingContent();
  return <BookingView content={content} />;
}
