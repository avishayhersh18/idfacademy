import React from "react";
import {
  ContentData,
  ContentItemProgress,
  EnhancedContentData,
} from "@/app/types";

interface VideoListItemProps {
  content: EnhancedContentData;
  contentStatus: ContentItemProgress;
  onVideoSelect: (
    content: ContentData,
    contentStatus: ContentItemProgress
  ) => void;
}

const ItemVideoMenu: React.FC<VideoListItemProps> = ({
  content,
  contentStatus,
  onVideoSelect,
}) => {
  const hasValidMediaSrc = content.mediaSrc;

  // Define the default image source
  const defaultImageSrc = "@/app/src/assets/default-image-playlist.jpg";
  return (
    <div
      className={`flex justify-between items-center min-w-full p-2 rounded-md my-2 cursor-pointer hover:bg-white transition duration-200 ${
        hasValidMediaSrc ? "" : "bg-white"
      }`}
      onClick={() => onVideoSelect(content, contentStatus)}
    >
      <div className="flex items-center">
        <img
          src={hasValidMediaSrc ? content.mediaSrc : defaultImageSrc}
          alt={content.file_name}
          className="w-16 h-16 rounded mr-2"
        />
        <div className="flex flex-col">
          <p className="text-gray-800">{content.title}</p>
        </div>
      </div>
      <input
        type="checkbox"
        checked={contentStatus.watched}
        readOnly
        className="ml-2"
      />
    </div>
  );
};

export default ItemVideoMenu;
