import React, { FormEvent, useEffect, useState } from "react";
import { Loading } from "react-daisyui";
import { EditorState, convertToRaw } from "draft-js";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import ReactQuill from "react-quill";
import { Toggle } from "react-daisyui";
import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { ContentData } from "@/app/types";

// ... Other imports

interface AddContentFormProps {
  contentData: ContentData;
  setContentData: (data: ContentData) => void;
  submitFile: (event: FormEvent) => void;
  loading: boolean;
  setFile: (file: File | null) => void;
  addContentError: string | null;
}

const AddContentForm: React.FC<AddContentFormProps> = ({
  contentData,
  setContentData,
  submitFile,
  loading,
  setFile,
  addContentError,
}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorValue, setEditorValue] = useState("");
  const [isTextContent, setIsTextContent] = useState(false);

  const handleToggle = () => {
    setIsTextContent(!isTextContent);
    setEditorState(EditorState.createEmpty());
    setEditorValue("");
    setContentData({
      ...contentData,
      title: "",
      comments: "",
      estimated_time_seconds: 2,
    });
    setFile(null);
  };

  const handleEditorChange = (newEditorValue: string) => {
    setEditorValue(newEditorValue);
  };

  useEffect(() => {
    setContentData({
      ...contentData,
      comments: isTextContent ? editorValue : "",
    });
  }, [editorValue, isTextContent]);

  return (
    <div className="flex flex-col">
      <div>
        <Toggle checked={isTextContent} onChange={handleToggle} />
        <div>
          <input
            type="text"
            placeholder={editTexts.title}
            value={contentData.title}
            onChange={(e) =>
              setContentData({ ...contentData, title: e.target.value })
            }
            className="p-2 w-full border rounded-md shadow-sm mb-4"
          />
        </div>
      </div>
      {isTextContent ? (
        <div>
          <ReactQuill
            value={editorValue}
            onChange={handleEditorChange}
            modules={{ toolbar: true }}
          />
        </div>
      ) : (
        <div>
          <input
            type="file"
            name="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
              }
            }}
            className="p-2 border rounded-md shadow-sm"
          />

          <input
            type="text"
            placeholder={editTexts.comments}
            value={contentData.comments}
            onChange={(e) =>
              setContentData({ ...contentData, comments: e.target.value })
            }
            className="p-2 w-full border rounded-md shadow-sm mb-4"
          />
        </div>
      )}

      <form onSubmit={submitFile} className="flex flex-col space-y-4">
        <button
          type="submit"
          disabled={loading}
          className={`p-2 ${
            loading ? "bg-gray-600" : "bg-green-600"
          } text-white rounded-md hover:bg-green-800 shadow-sm`}
        >
          {loading ? <Loading /> : GeneralTexts.submit}
        </button>
      </form>
      {addContentError && <div className="text-red-500">{addContentError}</div>}
    </div>
  );
};

export default AddContentForm;
