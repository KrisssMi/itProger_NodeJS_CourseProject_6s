import React from "react";

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>Loading....</div>;
  }
  return (
    <div>
      <div className="cta-video-image">
        <div className="ui embed">
          <iframe src= {video.videoLink} title="videoplayer" />
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
