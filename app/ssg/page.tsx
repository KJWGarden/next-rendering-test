import { supabase } from "@/lib/supabaseClient";
import PostList from "../component/PostList";
import { Post } from "@/type/type";

export const dynamic = "force-static"; // 정적 빌드

async function fetchAllPosts(): Promise<Post[]> {
  const allPosts: Post[] = [];
  const limit = 1000;

  // 1️⃣ 총 데이터 개수 확인
  const { count, error: countError } = await supabase
    .from("posts")
    .select("*", { count: "exact", head: true });

  if (countError) {
    console.error("총 개수 확인 오류:", countError);
    return [];
  }

  // 2️⃣ 1000개 단위로 분할 요청
  const totalBatches = Math.ceil((count ?? 0) / limit);

  for (let i = 0; i < totalBatches; i++) {
    const from = i * limit;
    const to = from + limit - 1;

    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("id", { ascending: true })
      .range(from, to);

    if (error) {
      console.error(`Batch ${i + 1} 요청 중 오류:`, error);
      break;
    }

    if (data) allPosts.push(...(data as Post[]));
  }

  return allPosts;
}

export default async function SSGPage() {
  const posts = await fetchAllPosts();
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">SSG (Static Site Generatation)</h1>
      <PostList posts={posts ?? []} />
    </main>
  );
}
