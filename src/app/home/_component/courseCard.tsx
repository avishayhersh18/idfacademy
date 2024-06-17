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
import { CourseCardStyles } from "@/app/assets/design";

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
    <div className={CourseCardStyles.cardContainer}>
      <div className={CourseCardStyles.cardPadding}>
        <div className={CourseCardStyles.courseTitle}>{course.name}</div>
        <div>{course.description_sub_title}</div>
        {course.img_id && (
          <MediaViewer content={course.img_id} isPresentMode={false} />
        )}
        {<ErrorMessage message={registererror} warning={true} />}
        {course.creationTimestamp && (
          <p className={CourseCardStyles.courseSubTitle}>
            {CourseCardTexts.createOn} {formatDate(course.creationTimestamp)}
          </p>
        )}
        <button
          className={CourseCardStyles.presentCourseButton}
          onClick={() => {
            router.push(`/home/myCourses/${course.id}/chapters`);
          }}
        >
          {editTexts.showCourse}
        </button>
        {isRegister && isPresentMode && (
          <div>
            <button
              className={CourseCardStyles.continueButton}
              onClick={handleContinueButtonClick}
            >
              {HomeTexts.continueStanding}
            </button>
            <div className={CourseCardStyles.progressBarContainer}>
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
