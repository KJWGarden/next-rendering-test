import { supabase } from "@/lib/supabaseClient";
import PostList from "../component/PostList";
import { Post } from "@/type/type";

export const revalidate = 10; // 10초마다 페이지 재생성

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

export default async function ISRPage() {
  const posts = await fetchAllPosts();
  const now = new Date().toLocaleTimeString("ko-KR");

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">
        ISR (Incremental Static Regeneration)
      </h1>
      <p className="text-sm text-gray-500 mb-2">페이지가 생성된 시각: {now}</p>
      <p className="text-sm text-gray-400 mt-2">
        (이 페이지는 10초마다 재생성됩니다.)
      </p>
      <PostList posts={posts ?? []} />
    </main>
  );
}
