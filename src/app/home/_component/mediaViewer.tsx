import React, { useState, useEffect } from "react";
import axios from "axios";
import { ContentData } from "@/app/types";
import { Loading } from "react-daisyui";
import { getMimeType } from "@/utils/filesUtils";
import franc from "franc";
import { MediaViewerStyles } from "@/app/assets/design";
interface MediaViewerProps {
  content: ContentData;
  isPresentMode: boolean;
}
const MediaViewer: React.FC<MediaViewerProps> = ({
  content,
  isPresentMode,
}) => {
  const [mediaSrc, setMediaSrc] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cleanup = () => {
    if (mediaSrc) {
      URL.revokeObjectURL(mediaSrc);
    }
  };

  useEffect(() => {
    setLoading(true);

    if (content) {
      const fetchMedia = async () => {
        try {
          if (content.file_name !== "") {
            const response = await axios.get(`/api/getFile/${content.id}`);
            const presignedUrl = response.data.url; // Assuming the API sends back an object with the url

            const fileExtension = content.file_name.split(".").pop();
            const mimeType = getMimeType(fileExtension);
            // Directly use the pre-signed URL, no need for conversion
            setMediaSrc(presignedUrl);
            setMediaType(mimeType);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching media:", error);
          setError("Failed to load media.");
          setLoading(false);
        }
      };
      fetchMedia();
      return () => {
        cleanup();
      };
    }
  }, [content]);

  const renderLoading = () => (
    <div className={MediaViewerStyles.loading}>
      <Loading />
    </div>
  );

  const renderError = () => (
    <div className={MediaViewerStyles.error}>{error}</div>
  );

  const renderMedia = () => {
    if (loading) return renderLoading();
    if (error) return renderError();
    if (content.file_name === "") {
      return (
        <div className={MediaViewerStyles.textContainer}>
          <div
            className={MediaViewerStyles.textContent}
            dangerouslySetInnerHTML={{ __html: content.comments }}
          />
        </div>
      );
    }
    switch (true) {
      case mediaType.startsWith("image"):
        return (
          <img
            className={MediaViewerStyles.mediaImage}
            src={mediaSrc}
            alt={content.file_name}
          />
        );
      case mediaType.startsWith("video"):
        return (
          <video className={MediaViewerStyles.mediaVideo} controls>
            <source src={mediaSrc} type={mediaType} />
            Your browser does not support the video tag.
          </video>
        );
      case mediaType.startsWith("audio"):
        return (
          <audio className={MediaViewerStyles.mediaAudio} controls>
            <source src={mediaSrc} type={mediaType} />
            Your browser does not support the audio element.
          </audio>
        );
      case mediaType === "text/plain":
        return (
          <a
            className={MediaViewerStyles.downloadLink}
            href={mediaSrc}
            download
          >
            {`Download Text File ${content.file_name}`}
          </a>
        );
      default:
        return (
          <a
            className={MediaViewerStyles.downloadLink}
            href={mediaSrc}
            download
          >
            {`Download File ${content.file_name}`}
          </a>
        );
    }
  };

  return (
    <div className={MediaViewerStyles.container(isPresentMode)}>
      {renderMedia()}
    </div>
  );
};

export default MediaViewer;
