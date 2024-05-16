import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { ChapterData, SubjectData } from "@/app/types";
import useCoursesStore from "@/app/_contexts/courseContext";
interface AddSubjectProps {
  chapter: ChapterData;
  courseId: string;
  chapterIndex: number;
  setIsAddingSubject: Dispatch<SetStateAction<boolean>>;
  setAddSubjectError: Dispatch<SetStateAction<string>>;
}
const AddSubject: React.FC<AddSubjectProps> = ({
  chapter,
  courseId,
  chapterIndex,
  setIsAddingSubject,
  setAddSubjectError,
}) => {
  const { updateChapter, deleteChapter, addSubject, courses } =
    useCoursesStore();
  const [newSubjectName, setNewSubjectName] = useState("");
  const handleAddSubject = async () => {
    const formData = new FormData();
    const addSubjectProps = { name: newSubjectName, chapterId: chapter.id };
    formData.append("addSubjectProps", JSON.stringify(addSubjectProps));
    const response = await axios.post("/api/addSubject", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (response.data?.message) {
      setAddSubjectError(response.data.message);
    } else {
      const newSubFromBd: SubjectData = {
        id: response.data.id,
        name: response.data.name,
        contents: [],
      };
      addSubject(courseId, chapterIndex, newSubFromBd);
      setIsAddingSubject(false);
    }
  };
  useEffect(() => {
    setNewSubjectName("");
  }, []);
  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto mt-10 flex flex-col space-y-4">
      <input
        type="text"
        placeholder={editTexts.subjectName}
        value={newSubjectName}
        onChange={(e) => setNewSubjectName(e.target.value)}
        className="p-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleAddSubject}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
      >
        {GeneralTexts.submit}
      </button>
      <button
        onClick={() => setIsAddingSubject(false)}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
      >
        {GeneralTexts.back}
      </button>
    </div>
  );
};
export default AddSubject;
