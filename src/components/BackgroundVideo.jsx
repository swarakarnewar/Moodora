function BackgroundVideo({
  entered,
  videoRef
}) {
  return (
    <video
      src="/bg.mp4"
      autoPlay
      muted
      loop
      playsInline
      ref={videoRef}
      className={`bg-video ${
        entered ? "video-blur" : ""
      }`}
    />
  );
}

export default BackgroundVideo;
