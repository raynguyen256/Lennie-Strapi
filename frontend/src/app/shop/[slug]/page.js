import { notFound } from "next/navigation";
import ProductDetailView from "@/components/shop/ProductDetailView";
import { getProductDetail } from "@/lib/page-content";

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProductDetail(slug);
  if (!product) notFound();
  return <ProductDetailView product={product} />;
}
