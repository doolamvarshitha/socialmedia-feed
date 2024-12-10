import React, { useRef } from "react";
import { useInView } from "react-intersection-observer";

const VideoPost = ({ videoUrl }) => {
  const videoRef = useRef(null);
  const { ref, inView } = useInView({
    triggerOnce: false,
    onChange: (inView) => {
      if (inView) videoRef.current.play();
      else videoRef.current.pause();
    },
  });

  return (
    <div ref={ref}>
      <video ref={videoRef} src={videoUrl} controls muted />
    </div>
  );
};

export default VideoPost;
