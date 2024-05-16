import React, { useState, useEffect } from "react";
import axios from "axios";
import { ContentData } from "@/app/types";
import { Loading } from "react-daisyui";
import { getMimeType } from "@/utils/filesUtils";
import franc from "franc";
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

  // const detectLanguage = (text:string) => {
  //   const language = franc(text);
  //   return language === 'he' ? 'hebrew' : 'english';
  // };
  const renderLoading = () => (
    <div className="text-center text-white">
      <Loading />
    </div>
  );

  const renderError = () => (
    <div className="text-center text-red-500">{error}</div>
  );

  const renderMedia = () => {
    if (loading) return renderLoading();
    if (error) return renderError();
    if (content.file_name === "") {
      return (
        <div className="flex items-start bg-white media-container w-screen max-h-full p-4 overflow-y-auto">
          <div
            className="w-[700px] h-[400px] max-h-full text-right"
            dangerouslySetInnerHTML={{ __html: content.comments }}
          />
        </div>
      );
    }
    switch (true) {
      case mediaType.startsWith("image"): {
        return (
          <img
            className="w-full max-h-full object-contain"
            src={mediaSrc}
            alt={content.file_name}
          />
        );
      }
      case mediaType.startsWith("video"):
        return (
          <video className="w-screen max-h-full object-contain" controls>
            <source src={mediaSrc} type={mediaType} />
            Your browser does not support the video tag.
          </video>
        );
      case mediaType.startsWith("audio"):
        return (
          <audio className="w-screen" controls>
            <source src={mediaSrc} type={mediaType} />
            Your browser does not support the audio element.
          </audio>
        );
      case mediaType === "text/plain":
        return (
          <a
            className="text-white bg-black"
            href={mediaSrc}
            download
          >{`Download Text File ${content.file_name}`}</a>
        );
      default:
        return (
          <a className="text-white bg-black" href={mediaSrc} download>
            {`Download File ${content.file_name}`}|
          </a>
        );
    }
  };
  return (
    <div
      className={`overflow-hidden flex justify-center items-center ${
        isPresentMode ? "w-[700px] h-[500px]" : "w-[100%] h-[250px]"
      }`}
    >
      {renderMedia()}
    </div>
  );
};

export default MediaViewer;
