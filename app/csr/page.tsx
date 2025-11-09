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
    async function fetchPosts() {
      const { data, error } = await supabase.from("posts").select("*");
      if (error) {
        console.error("fething 하는중 오류 발생 :", error);
      } else if (data) {
        setPosts(data);
      }
    }

    fetchPosts();
  }, []);
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">CSR (Client-Side Rendering)</h1>
      <PostList posts={posts} />
    </main>
  );
}
