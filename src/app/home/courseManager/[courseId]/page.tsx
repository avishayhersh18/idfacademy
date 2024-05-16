"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import useCoursesStore from "@/app/_contexts/courseContext";
import { CourseData } from "@/app/types";
import Course from "../_components/CourseMangerComponents/Course";
import { useRouter } from "next/navigation";
import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import axios from "axios";
interface singleCoureUpdateProps{
  params:{
    courseId:string
  }
}
const SingleCourseUpdate:React.FC<singleCoureUpdateProps> = (props:singleCoureUpdateProps) => {
  const {initinalCourse}=useCoursesStore();
  const courseId =props.params.courseId
  const [curCourse, setCurCourse] = useState<CourseData>(initinalCourse);
  const { courses, setCourses } = useCoursesStore();
  const router = useRouter();
  useEffect(() => {
    for (let course of courses) {
      if (course.id === courseId) {
        setCurCourse(course);
        break;
      }
    }
  }, []);

  return (
    <div>
      <button
        onClick={() => router.push("/home/courseManager")}
        className="mb-5 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
      >
        {GeneralTexts.back}
      </button>
      {courses.map((course) => {
        if (course.id === curCourse.id)
          return <Course key={course.id} course={course} />;
      })}
    </div>
  );
};

export default SingleCourseUpdate;
