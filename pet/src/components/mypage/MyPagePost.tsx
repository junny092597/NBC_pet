import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';

interface Post {
  id: string;
  title: string;
  // Add more fields as needed
}

const MyPagePost: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsRef = ref(getDatabase('reviews'));
        const snapshot = await onValue(postsRef);
        const data = snapshot.val() as Post[] || [];
        setPosts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
};

export default MyPagePost;