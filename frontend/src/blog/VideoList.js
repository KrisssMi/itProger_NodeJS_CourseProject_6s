import React from "react";
import VideoItem from "./VideoItem";

const VideoList = ({ videos, onVideoSelect }) => {  // массив видео, и onVideoSelect - обработчик события выбора видео.
  const renderedList = videos.map(v => {            // создает новый массив элементов, используя метод map() для каждого элемента массива videos.
    return (
      <VideoItem key={v.id} onVideoSelect={onVideoSelect} video={v} />
    );
  });

  return <div className="ui relaxed divided list">{renderedList}</div>;
};

export default VideoList;
