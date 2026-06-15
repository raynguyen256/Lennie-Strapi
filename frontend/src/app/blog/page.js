import BlogView from "@/components/blog/BlogView";
import { getBlogArchive } from "@/lib/page-content";

export const metadata = {
  title: "Blog · Lennie SkinLab",
  description: "Kiến thức da liễu, cẩm nang chăm da và chia sẻ chuyên môn từ đội ngũ Lennie SkinLab.",
};

export default async function BlogPage() {
  const posts = await getBlogArchive();
  return <BlogView posts={posts} />;
}
