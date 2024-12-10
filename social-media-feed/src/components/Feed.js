import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { collection, query, orderBy, limit, getDocs, startAfter } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async () => {
    const postCollection = collection(db, "posts");
    let q = lastDoc
      ? query(postCollection, orderBy("timestamp", "desc"), startAfter(lastDoc), limit(20))
      : query(postCollection, orderBy("timestamp", "desc"), limit(20));

    const data = await getDocs(q);
    const newPosts = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    setPosts(prev => [...prev, ...newPosts]);
    setLastDoc(data.docs[data.docs.length - 1]);
    if (data.docs.length < 20) setHasMore(false);
  }, [lastDoc]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchPosts}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.text}</h3>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default Feed;
