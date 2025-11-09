import { supabase } from "@/lib/supabaseClient";
import PostList from "../component/PostList";

export const revalidate = 10; // 10초마다 페이지 재생성

export default async function ISRPage() {
  const { data: posts } = await supabase.from("posts").select("*");
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
