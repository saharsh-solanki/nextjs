import { useFetchData } from "../hooks/useFetchData";
import styles from "../styles/Home.module.css";

// Define TypeScript type for post data
type Post = {
  id: number;
  title: string;
  body: string;
};

export default function Home() {
  // Explicitly define the expected data type
  const { data: posts, error, isLoading } = useFetchData<Post[]>("/api/posts", "posts", { limit: 10 });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Dummy API Data</h1>
        <ul className={styles.list}>
          {posts?.map((post) => (
            <li key={post.id} className={styles.card}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
