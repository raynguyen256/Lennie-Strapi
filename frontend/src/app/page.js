import HomeView from "@/components/home/HomeView";
import { getHomeContent } from "@/lib/home-content";

export default async function Home() {
  const content = await getHomeContent();
  return <HomeView content={content} />;
}
