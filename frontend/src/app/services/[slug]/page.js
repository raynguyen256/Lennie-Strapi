import { notFound } from "next/navigation";
import ServiceDetailView from "@/components/services/ServiceDetailView";
import { getServiceDetail } from "@/lib/page-content";

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = await getServiceDetail(slug);
  if (!service) notFound();
  return <ServiceDetailView service={service} />;
}
