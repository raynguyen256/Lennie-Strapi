import ShopView from "@/components/shop/ShopView";
import { getShopArchive } from "@/lib/page-content";

export const metadata = {
  title: "Sản Phẩm · Lennie SkinLab",
  description: "Dược mỹ phẩm chọn lọc độc quyền, được ThS. DS. Hoàng Hồng Thắm tuyển chọn từ các thương hiệu uy tín toàn cầu.",
};

export default async function ShopPage() {
  const { products, partnerBrands } = await getShopArchive();
  return <ShopView products={products} partnerBrands={partnerBrands} />;
}
