import { bucket, getPresignedUrlFromS3Service } from "@/app/_minio/minio";
import { ChapterData, CourseData } from "@/app/types";
export const getMimeType = (extension: string | undefined) => {
  if (!extension) return "";

  const imageExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "tiff", "svg"];
  const videoExtensions = ["mp4", "webm", "ogv"];
  const audioExtensions = ["mp3", "wav", "ogg"];
  const textExtensions = ["txt", "csv", "log"];

  if (imageExtensions.includes(extension.toLowerCase()))
    return `image/${extension.toLowerCase()}`;
  if (videoExtensions.includes(extension.toLowerCase()))
    return `video/${extension.toLowerCase()}`;
  if (audioExtensions.includes(extension.toLowerCase()))
    return `audio/${extension.toLowerCase()}`;
  if (textExtensions.includes(extension.toLowerCase())) return "text/plain";

  return "application/octet-stream";
};
//estimated time of course to present in course details
export function EstimatedCourse(course: CourseData) {
  let estimated_seconds = 0;
  for (let chapter of course.chapters) {
    for (let subject of chapter.subjects) {
      for (let content of subject.contents) {
        estimated_seconds += content.estimated_time_seconds
          ? content.estimated_time_seconds
          : 0; // Assuming the correct naming
      }
    }
  }
  // Calculate hours and minutes from seconds
  const hours = Math.floor(estimated_seconds / 3600);
  let minutes = Math.floor((estimated_seconds % 3600) / 60);
  const seconds = Math.floor(estimated_seconds % 60); // Remaining seconds

  // Format hours, minutes, and seconds to ensure two digits
  const formattedHours = hours.toString().padStart(2, "0");

  const formattedSeconds = seconds.toString().padStart(2, "0");

  if (seconds > 0 && seconds < 60) minutes = minutes + 1;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}`;
}

export const generateVideoImageThumbnail = async (
  videoUrl: string
): Promise<string> => {
  // need to fix
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.src = videoUrl;

    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        reject("Canvas 2D context not available");
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      try {
        // Draw the video frame on the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Convert the canvas content to a data URI
        const thumbnailDataUri = canvas.toDataURL("image/jpeg");

        // Clean up and resolve the promise
        video.pause();
        video.removeAttribute("src");
        video.load();
        resolve(thumbnailDataUri);
      } catch (error) {
        reject(error);
      }
    });

    video.addEventListener("error", (error) => {
      reject(`Video error: ${error}`);
    });

    // Start loading the video
    video.load();
  });
};
