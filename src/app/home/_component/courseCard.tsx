"use client";
import { useEffect, useReducer, useState } from "react";
import { CourseData } from "@/app/types";
import { useRouter } from "next/navigation";
import { ChapterData } from "@/app/types";
import MediaViewer from "./mediaViewer";
import ErrorMessage from "./ErrorMessage";
import {
  CourseCardTexts,
  HomeTexts,
  LoginTexts,
  editTexts,
  messagesText,
} from "@/HebrewStrings/Texts";
import useUserStore from "@/app/_contexts/userContext";
import axios from "axios";
import { Users } from "@/app/types";
import useUserRequestCourseStore from "@/app/_contexts/requestsCoursesContext";
import { calculateProgress, findFirstUnwatched } from "@/utils/progressUtils";
import { Progress, RadialProgress } from "react-daisyui";
import ProgressBar from "../myCourses/_components/ProgressBar";
import { EstimatedCourse } from "@/utils/filesUtils";

interface CourseCardProps {
  course: CourseData;
  isPresentMode: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isPresentMode }) => {
  const router = useRouter();
  const { user, userCourses, adminCourses, addUserCourse, coursesProgress } =
    useUserStore();
  const { userRequestsCourses, addUserRequestsCourse } =
    useUserRequestCourseStore();
  const [currCourseProgress, setCurrCourseProgress] = useState(
    coursesProgress.find((cp) => cp.courseId === course.id)
  );
  const [isRegister, setIsRegister] = useState(false);
  const [registererror, setRegistererror] = useState("");
  const [isRequested, setIsRequested] = useState(false);

  useEffect(() => {
    setIsRegister(
      userCourses.some((userCourse) => userCourse.id === course.id)
    );
    setIsRequested(
      userRequestsCourses.some(
        (userrequestCourse) =>
          userrequestCourse.course?.id === course.id &&
          userrequestCourse.user.id === user.id
      )
    );
    const curcourseprogress = coursesProgress.find(
      (cp) => cp.courseId === course.id
    );
    if (curcourseprogress) setCurrCourseProgress(curcourseprogress);
  }, [course]);

  const formatDate = (timestamp: Date) => {
    const date = new Date(timestamp);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear().toString().slice(-2)}`;
  };
  const handleContinueButtonClick = () => {
    const unwatchedContentFound = findFirstUnwatched(
      course,
      router,
      coursesProgress
    );

    if (!unwatchedContentFound) {
      // Display an error message here
      setRegistererror(messagesText.finishCourse);
    }
  };

  return (
    <div
      className={`max-w-sm rounded-lg overflow-hidden shadow-lg border border-gray-300 bg-slate-200 m-4 text-right ${
        isPresentMode ? "h-4/5" : ""
      }`}
    >
      <div className="p-4">
        <div className="font-bold text-xl mb-2">{course.name}</div>
        <div>{course.description_sub_title}</div>
        {course.img_id && (
          <MediaViewer content={course.img_id} isPresentMode={false} />
        )}
        {<ErrorMessage message={registererror} warning={true} />}
        {course.creationTimestamp && (
          <p className="text-sm text-gray-500">
            {CourseCardTexts.createOn} {formatDate(course.creationTimestamp)}
          </p>
        )}
        <button
          className="p-2 ml-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={() => {
            router.push(`/home/myCourses/${course.id}/chapters`);
          }}
        >
          {editTexts.showCourse}
        </button>
        {isRegister && isPresentMode && (
          <div>
            <button
              className="p-2 ml-1 bg-green-500 text-white rounded hover:bg-green-600"
              onClick={handleContinueButtonClick}
            >
              {HomeTexts.continueStanding}
            </button>
            <div className="flex flex-col items-end gap-y-2">
              <ProgressBar
                value={calculateProgress(
                  course,
                  currCourseProgress?.contentProgress
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
