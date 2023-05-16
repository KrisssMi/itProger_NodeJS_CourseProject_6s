import React from "react";
import "./VideoDetail.css";

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>Loading....</div>;
  }

  return (
    <div className="video-detail">
      <div className="cta-video-image">
        <div className="ui embed">
          <video
            className="video-player"
            controls
            src={`https://localhost:9000/${video.videoLink.split("\\")[2]}`}
            title="videoplayer"
          />
          {/* отображает видео плеер внутри DIV-элемента, ссылаясь на ссылку видео в свойстве videoLink объекта видео. */}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
