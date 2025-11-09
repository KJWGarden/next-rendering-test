type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <span>{new Date(post.created_at).toLocaleString()}</span>
        </li>
      ))}
    </ul>
  );
}
