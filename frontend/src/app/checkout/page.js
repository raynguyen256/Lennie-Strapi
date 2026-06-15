import CheckoutView from "@/components/checkout/CheckoutView";

export const metadata = {
  title: "Thanh Toán · Lennie SkinLab",
  description: "Điền địa chỉ giao hàng và chọn phương thức thanh toán. Nhân viên Lennie sẽ liên hệ xác nhận đơn hàng.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
