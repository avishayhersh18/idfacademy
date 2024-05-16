"use client";
import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { ContentData, SubjectData } from "@/app/types";
import { FormEvent, useState } from "react";
import axios from "axios";
import useCoursesStore from "@/app/_contexts/courseContext";
import Content from "../ContentManagerComponents/Content";
import RenameSubjectForm from "./RenameSubject";
import AddContentForm from "../ContentManagerComponents/AddContentSubject";
import { getMimeType } from "@/utils/filesUtils";

interface SubjectProps {
  subject: SubjectData;
  chapterId: string;
  courseId: string;
}

const Subject: React.FC<SubjectProps> = ({ subject, chapterId, courseId }) => {
  const { deleteSubject, updateSubject, addContent, courses } =
    useCoursesStore();
  const [isSelectedSubject, setIsSelectedSubject] = useState(false);
  const [subjectName, setSubjectName] = useState(subject.name);
  const [isRenameSubject, setIsRenameSubject] = useState(false);
  const [isAddingContent, setIsAddingContent] = useState(false);
  const [contentData, setContentData] = useState<ContentData>({
    id: "",
    title: "",
    file_name: "",
    comments: "",
    estimated_time_seconds: 0,
  });
  const [file, setFile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [addContentError, setAddContentError] = useState("");
  const [renameSubjectError, setRenameSubjectError] = useState("");

  const handleDeleteSubject = async () => {
    const formData = new FormData();
    formData.append("subjectId", subject.id);
    const response = await axios.post("/api/deleteSubject", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    deleteSubject(subject, chapterId, courseId);
  };

  const handleRenameSubject = async () => {
    const formData = new FormData();
    formData.append(
      "subjectRename",
      JSON.stringify({ id: subject.id, name: subjectName })
    );
    const response = await axios.post("/api/editSubject", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.data?.message) {
      setRenameSubjectError(response.data?.message);
    } else {
      const renamedSubject = {
        id: subject.id,
        name: subjectName,
        contents: subject.contents,
      };
      updateSubject(renamedSubject, chapterId, courseId);
      setIsRenameSubject(false);
    }
  };
  const submitFile = async (event: FormEvent) => {
    setLoading(true);
    event?.preventDefault();
    const formData: FormData = new FormData();
    const default_estimated_time_seconds = 120; // default to read text content 2 minutes=120 seconds

    // formData.append("mimeType", mimeType); // Including MIME type in the request
    formData.append("title", contentData.title);
    formData.append("comments", contentData.comments);
    formData.append("subjectId", subject.id);
    if (file) {
      formData.append("file", file, file.name);
      const fileExtension: string = file.name.split(".").pop() || "";
      const mimeType: string = getMimeType(fileExtension);

      // Check if the file is a video and attempt to get its duration
      if (mimeType.startsWith("video/")) {
        // Create a temporary video element to load the file and read its duration
        const videoElement: HTMLVideoElement = document.createElement("video");
        videoElement.preload = "metadata";

        videoElement.onloadedmetadata = () => {
          window.URL.revokeObjectURL(videoElement.src);
          let duration: number = Math.ceil(videoElement.duration);
          formData.append("estimatedVideoTime", duration.toString());

          // Proceed with the file upload after duration is obtained
          uploadFile(formData);
        };

        videoElement.onerror = () => {
          console.error("Error loading video file for duration estimation.");
          // Proceed with the file upload without duration if there's an error
          uploadFile(formData);
        };

        videoElement.src = window.URL.createObjectURL(file);
      } else {
        // If it's not a video, just proceed with the upload

        formData.append(
          "estimatedVideoTime",
          default_estimated_time_seconds.toString()
        );
        uploadFile(formData);
      }
    } else {
      // Proceed with the upload if there's no file selected (optional handling)
      formData.append(
        "estimatedVideoTime",
        default_estimated_time_seconds.toString()
      );
      uploadFile(formData);
    }
  };

  const uploadFile = async (formData: FormData) => {
    try {
      const response = await axios.post("/api/addContent", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.message) {
        setAddContentError(response.data?.message);
      } else {
        const newContent = response.data;
        setIsAddingContent(false);
        addContent(courseId, chapterId, subject.id, newContent);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div key={subject.name} className="p-4 bg-gray-300 rounded shadow mb-3">
      <span className="text-lg font-medium">{subject.name}</span>

      {isRenameSubject ? (
        <RenameSubjectForm
          subjectName={subjectName}
          setSubjectName={setSubjectName}
          handleRenameSubject={handleRenameSubject}
          renameSubjectError={renameSubjectError}
          setIsRenameSubject={setIsRenameSubject}
        />
      ) : (
        <div className="flex flex-row">
          <button
            onClick={handleDeleteSubject}
            className="p-2 ml-1 bg-red-500 text-white rounded hover:bg-red-700"
          >
            {editTexts.deleteSubject}
          </button>
          <button
            onClick={() => {
              setIsRenameSubject(true);
              setRenameSubjectError("");
            }}
            className="p-2 ml-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            {editTexts.rename}
          </button>
          <button
            onClick={() => setIsSelectedSubject(true)}
            className="p-2 ml-1 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {editTexts.contents}
          </button>
        </div>
      )}

      {isSelectedSubject && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <h4 className="text-lg mb-4">{editTexts.contents}</h4>
          <div className="space-y-2">
            {subject.contents?.map((content) => (
              <Content
                key={content.id}
                content={content}
                subjectId={subject.id}
                chapterId={chapterId}
                courseId={courseId}
              />
            ))}
            {isAddingContent ? (
              <AddContentForm
                contentData={contentData}
                setContentData={setContentData}
                submitFile={submitFile}
                loading={loading}
                setFile={setFile}
                addContentError={addContentError}
              />
            ) : (
              <button
                onClick={() => setIsAddingContent(true)}
                className="bg-purple-500 text-white w-12 h-12 rounded-full hover:bg-purple-700 active:scale-90 transition transform"
                aria-label="Add"
              >
                <svg
                  className="w-6 h-6 mx-auto my-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Subject;
