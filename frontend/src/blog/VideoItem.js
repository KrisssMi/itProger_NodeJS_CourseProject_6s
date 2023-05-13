import React from "react";
import "./VideoItem.css";

const VideoItem = ({ video, onVideoSelect }) => {
  return (
    <div
      onClick={() => {
        onVideoSelect(video);
      }}
      className=""
    >
      <div className="content">
      <br/>
        <div>
        <h4>{video.name}</h4>
        <hr />
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
