import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { ContentData } from "@/app/types";
import { useState } from "react";
import axios from "axios";
import useCoursesStore from "@/app/_contexts/courseContext";
import { Loading } from "react-daisyui";
import ErrorMessage from "@/app/home/_component/ErrorMessage";
import ReactQuill from "react-quill";

interface ContentProps {
  content: ContentData;
  subjectId: string;
  chapterId: string;
  courseId: string;
}

const Content:React.FC<ContentProps> = ({ content, chapterId, subjectId, courseId }: ContentProps) => {
  const { deleteContent, updateComments } = useCoursesStore();
  const [isChangeCommentsContentPressed, setIsChangeCommentsContentPressed] =
    useState(false);
  const [title, setTitle] = useState(content.title);
  const [comments, setComments] = useState(content.comments);
  const [renameContentError,setRenameContentError]=useState(null);
  const [loading,setLoading]=useState(false)

  const handleDeleteContent = async () => {
    setLoading(true)
    setRenameContentError(null)
    const formData: any = new FormData();
    formData.append("contentId", content.id);
    const response =await axios.post("/api/deleteContent", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if(response.data?.message){
      setRenameContentError(response.data?.message)
    }
    else{
      deleteContent(content, subjectId, chapterId, courseId);
    }
    setLoading(false)
  };

  const handleChangeContent = async () => {
    setLoading(true)
    setRenameContentError(null)
    const formData: any = new FormData();
    const editContentProps = { contentId: content.id,title, comments: comments };
    formData.append("editContentProps", JSON.stringify(editContentProps));
    const response =await axios.post("/api/editContent", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if(response.data?.message){
      setRenameContentError(response.data?.message)
    }
    else{
    updateComments(
      { id: content.id,title:content.title, file_name: content.file_name, comments: comments },
      subjectId,
      chapterId,
      courseId
    );
    setIsChangeCommentsContentPressed(false);
    }
    setLoading(false)
  };
  return (
    <div className="p-2 bg-gray-100 rounded flex flex-col">
      <span className="text-md">{content.title}</span>
     { (content.file_name !== '') && <span className="text-md">
        {editTexts.comments} : {content.comments}
      </span>
}
      {isChangeCommentsContentPressed ? (
        <div className="flex items-center ml-1">
           {(content.file_name === '') ? (
        <div className="text-md">
          <ReactQuill value={comments} onChange={setComments} modules={{ toolbar: true }} />
        </div>
      ) : (
          <input
            type="text"
            placeholder={editTexts.subjectName}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="p-2 border rounded"
          />
          )}
          <input
            type="text"
            placeholder={editTexts.title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleChangeContent}
            className="p-2 ml-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            {GeneralTexts.submit}
           
          </button>
          <div>
          {renameContentError && (
                <  ErrorMessage message={renameContentError}/>
                )}
            </div>
        </div>
      ) : (
        <div className="flex fles-row">
        {/* Render Loading component if loading is true */}
        {loading ? (
            <Loading/>
        ) : (
            <>
                <button
                    onClick={handleDeleteContent}
                    className="p-2 ml-1 bg-red-500 text-white rounded hover:bg-red-700"
                >
                    {editTexts.deleteContent}
                </button>
                <button
                    onClick={() => setIsChangeCommentsContentPressed(true)}
                    className="p-2 ml-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                    {editTexts.rename}
                </button>
            </>
        )}
    </div>
      )}
    </div>
  );
};

export default Content;
