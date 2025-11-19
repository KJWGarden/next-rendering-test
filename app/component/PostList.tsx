import { Post } from "@/type/type";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="space-y-3">
      {posts.map((post) => (
        <li key={post.id} className="border rounded p-3">
          <h2 className="font-semibold text-lg">{post.title}</h2>
          <p className="text-sm text-gray-600">{post.content}</p>
          <img
            src={`https://picsum.photos/seed/${post.id}/200/150`}
            alt={post.title}
            className="w-48 h-36 object-cover rounded-md"
          />
          <span className="text-xs text-gray-400">
            {new Date(post.created_at).toLocaleString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </li>
      ))}
    </ul>
  );
}
