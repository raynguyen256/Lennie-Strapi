import { notFound } from "next/navigation";
import BlogDetailView from "@/components/blog/BlogDetailView";
import { getBlogDetail } from "@/lib/page-content";

export default async function BlogDetailPage({ params }) {
  const { slug } = await params;
  const post = await getBlogDetail(slug);
  if (!post) notFound();

  return <BlogDetailView post={post} related={post.related} />;
}
