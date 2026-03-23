import { useEffect, useRef } from "react";

function IntroVideo() {
  const videoRef:any = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      
      <video
        ref={videoRef}
        src="/intro.mp4" // place video in public folder
        autoPlay
        playsInline
        className="w-full h-full object-cover"
      />

    </div>
  );
}

export default IntroVideo;