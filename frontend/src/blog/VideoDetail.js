import React from "react";

const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <div className="cta-video-image">
        <div className="ui embed">
          <video
            width="740"
            controls
            src={`http://localhost:9000/${video.videoLink.split("\\")[2]}`}
            title="videoplayer"
          />
          {/* отображает видео плеер внутри DIV-элемента, ссылаясь на ссылку видео в свойстве videoLink объекта видео. */}
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
