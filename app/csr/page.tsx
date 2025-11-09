"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";
import PostList from "../component/PostList";

type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function CSRPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const allPosts: Post[] = [];
        const limit = 1000;

        // 총 개수 확인
        const { count } = await supabase
          .from("posts")
          .select("*", { count: "exact", head: true });

        if (!count) {
          console.warn("총 개수를 가져올 수 없습니다.");
          return;
        }

        // 1000개씩 분할 요청
        const totalBatches = Math.ceil(count / limit);

        for (let i = 0; i < totalBatches; i++) {
          const from = i * limit;
          const to = from + limit - 1;
          const { data, error } = await supabase
            .from("posts")
            .select("*")
            .range(from, to)
            .order("id", { ascending: true });

          if (error) {
            console.error(`Batch ${i + 1} 요청 중 오류:`, error);
            break;
          }

          if (data) allPosts.push(...data);
        }

        setPosts(allPosts);
      } catch (err) {
        console.error("fetchAllPosts 오류:", err);
      } finally {
      }
    }

    fetchAllPosts();
  }, []);
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">CSR (Client-Side Rendering)</h1>
      <PostList posts={posts} />
    </main>
  );
}
