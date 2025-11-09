import { supabase } from "@/lib/supabaseClient";
import PostList from "../component/PostList";

export const dynamic = "force-dynamic"; // SSR 강제

export default async function SSRPage() {
  const { data: posts } = await supabase.from("posts").select("*");

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">SSR (Sever-Side Rendering)</h1>
      <PostList posts={posts ?? []} />
    </main>
  );
}
