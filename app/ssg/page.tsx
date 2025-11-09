import { supabase } from "@/lib/supabaseClient";
import PostList from "../component/PostList";

export const dynamic = "force-static"; // 정적 빌드

export default async function SSGPage() {
  const { data: posts } = await supabase.from("posts").select("*");

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">SSG (Static Site Generatation)</h1>
      <PostList posts={posts ?? []} />
    </main>
  );
}
