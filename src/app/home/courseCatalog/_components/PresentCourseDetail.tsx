import {
  CourseCardTexts,
  LoginTexts,
  editTexts,
  presentCourseDetailTexts,
} from "@/HebrewStrings/Texts";
import useCoursesStore from "@/app/_contexts/courseContext";
import { ChapterData, CourseData } from "@/app/types";
import Chapter from "../../myCourses/_components/chapter";
import { useEffect, useState } from "react";
import useUserStore from "@/app/_contexts/userContext";
import useUserRequestCourseStore from "@/app/_contexts/requestsCoursesContext";
import axios from "axios";
import ErrorMessage from "../../_component/ErrorMessage";
import CustomRating from "../../_component/Rating";
import { EstimatedCourse } from "@/utils/filesUtils";
interface PresentCourseDetailsProps {
  course: CourseData;
}
const PresentCourseDetails: React.FC<PresentCourseDetailsProps> = ({
  course,
}) => {
  const { courses, editCourse } = useCoursesStore();
  const {
    user,
    userCourses,
    adminCourses,
    addUserCourse,
    coursesProgress,
    setSpecificCourseProgress,
  } = useUserStore();
  const { userRequestsCourses, addUserRequestsCourse, allMyRequestToCourses } =
    useUserRequestCourseStore();
  const [isRegister, setIsRegister] = useState(false);
  const [registererror, setRegistererror] = useState("");
  const [isRequested, setIsRequested] = useState(false);
  const [rating, setRating] = useState(0);
  const [currProggress, setCurrProgress] = useState(
    coursesProgress.find(
      (courseProgress) => courseProgress.courseId === course.id
    )
  );
  useEffect(() => {
    setCurrProgress(
      coursesProgress.find(
        (courseProgress) => courseProgress.courseId === course.id
      )
    );
  }, [course]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  // console.log("already vote ",currProggress?.already_vote)
  const submitRating = async () => {
    try {
      let formData = new FormData();
      formData.append("course", JSON.stringify(course));
      formData.append("rate", rating.toString());
      formData.append("userId", user.id);
      const response = await axios.post("/api/addCourseRate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.id) {
        editCourse(response.data);
        let newProggress = currProggress;
        if (newProggress) {
          newProggress.already_vote = true;
          setSpecificCourseProgress(newProggress);
          setCurrProgress(newProggress);
        }
      } else {
        setRegistererror("לא התבצע עדכון הדירוג נסה שנית ");
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  //const course= courses.find((course)=>course.id===courseid)
  const chaptersToPresent = course ? course.chapters : [];
  useEffect(() => {
    setIsRegister(
      userCourses.some((userCourse) => userCourse.id === course?.id)
    );
    setIsRequested(allMyRequestToCourses.includes(course.id));
  }, [course]);
  const registerCourse = async () => {
    let formData = new FormData();
    if (course) {
      formData.append("courseId", course?.id);

      formData.append("userId", user.id);
      const response = await axios.post("/api/registerCourse", formData);
      if (response.data?.message) {
        setRegistererror("problem to register please try again");
      } else {
        addUserRequestsCourse(user, course);
        setIsRequested(true);
      }
    }
  };

  return (
    <div className="max-w-md text-right rounded-lg overflow-hidden shadow-lg border border-gray-300 bg-slate-200 m-4">
      {/* <div className="p-4 text-right"></div> */}
      {course && (
        <>
          <div>
            <div className="font-bold text-xl mb-2">{course.name}</div>
            <div
              className="text-gray-700 text-base"
              dangerouslySetInnerHTML={{ __html: course.description }}
            />
            <span>{editTexts.courseName}</span>
            <h1> {course.name}</h1>
          </div>
          <span>{presentCourseDetailTexts.descripitonOfCourse}</span>
          <div className="w-[700px] h-[400px] max-h-full text-right">
            <div dangerouslySetInnerHTML={{ __html: course.description }} />
          </div>
          <div>
            <span>{presentCourseDetailTexts.subscribeNum}</span>
            {course.subscribe_num}
          </div>
          <div>
            <span>{presentCourseDetailTexts.rateOfCourse}</span>
            {course.rate}
          </div>
          {isRegister && !currProggress?.already_vote && (
            <div className="bg-white ">
              <button
                className="p-2 ml-1 bg-green-500 text-white rounded hover:bg-yellow-600"
                onClick={submitRating}
              >
                Submit Rating
              </button>
              <CustomRating
                value={rating}
                rating={rating}
                setRating={setRating}
              />

              <span>{presentCourseDetailTexts.rateThisCourse}</span>
            </div>
          )}
        </>
      )}
      <div>{`${CourseCardTexts.estimatedTimeText} ${EstimatedCourse(
        course
      )}`}</div>
      <br />
      <span>{presentCourseDetailTexts.chaptersOfCourse}</span>
      <div className="flex flex-col">
        {chaptersToPresent?.map((chapter: ChapterData) => (
          <Chapter
            chapter={chapter}
            courseid={course.id}
            isRegister={isRegister}
            setRegistererror={setRegistererror}
            key={chapter.id}
          />
        ))}
        <ErrorMessage message={registererror} />
      </div>
      {!isRegister && !isRequested && (
        <button
          className="p-2 ml-1 bg-pink-500 text-white rounded hover:bg-yellow-600"
          onClick={registerCourse}
        >
          {LoginTexts.register}
        </button>
      )}
      {isRequested && (
        <p className="text-blue-700">
          {CourseCardTexts.requestContinueToApprove}
        </p>
      )}
    </div>
  );
};

export default PresentCourseDetails;
