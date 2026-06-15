import CartView from "@/components/cart/CartView";

export const metadata = {
  title: "Giỏ Hàng · Lennie SkinLab",
  description: "Kiểm tra lại các sản phẩm dược mỹ phẩm bạn đã chọn trước khi tiến hành thanh toán.",
};

export default function CartPage() {
  return <CartView />;
}
