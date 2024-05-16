import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { CourseData } from "@/app/types";
import { Dispatch, SetStateAction, useState } from "react";
import ReactQuill from "react-quill";

interface EditCourseProps {
  course: CourseData;
  handleEditCourse: (editedCourse: CourseData) => Promise<void>;
}

const EditCourse: React.FC<EditCourseProps> = ({ course, handleEditCourse }) => {
  const [editCourse, setEditCourse] = useState<CourseData>(course);

  const handleEditName = (e:any) => {
    setEditCourse({ ...editCourse, name: e.target.value });
  };

  const handleEditDescriptionSubTitle = (e:any) => {
    setEditCourse({ ...editCourse, description_sub_title: e.target.value });
  };

  const handleEditDescription = (value:string) => {
    setEditCourse({ ...editCourse, description: value });
  };

  const handleSubmit = () => {
    handleEditCourse(editCourse);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mb-4">
        <span className="text-gray-600 mb-2">{editTexts.courseName}</span>
        <input
          type="text"
          placeholder={editTexts.courseName}
          value={editCourse.name}
          onChange={handleEditName}
          className="p-2 ml-4 border rounded"
        />
      </div>
  
      <div className="flex flex-col mb-4">
        <span className="text-gray-600 mb-2">{editTexts.descriptionSubTitleCourse}</span>
        <textarea
          placeholder={editTexts.courseDescriptionSubTitle}
          value={editCourse.description_sub_title}
          onChange={handleEditDescriptionSubTitle}
          className="p-2 ml-4 border rounded"
        />
      </div>
  
      <div className="mb-4">
        <span className="block text-gray-600 mb-2">{editTexts.descripiton}</span>
        <ReactQuill
          value={editCourse.description}
          onChange={handleEditDescription}
          modules={{ toolbar: true }}
        />
      </div>
  
      <button
        onClick={handleSubmit}
        className="p-2 ml-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        {GeneralTexts.submit}
      </button>
    </div>
  );
}

export default EditCourse;
