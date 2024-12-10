import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const MyPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchMyPosts = async () => {
      const q = query(collection(db, "posts"), where("userId", "==", userId));
      const data = await getDocs(q);
      setPosts(data.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchMyPosts();
  }, [userId]);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.text}</div>
      ))}
    </div>
  );
};

export default MyPosts;
