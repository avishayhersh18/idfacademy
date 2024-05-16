"use client";
import React, { useState, useEffect } from "react";
import PresentCourseDetail from "../_components/PresentCourseDetail";
import { CourseData } from "@/app/types";
import useCoursesStore from "@/app/_contexts/courseContext";
interface PresentCourseDetailsProps {
  params: {
    courseid: string;
  };
}

const PresentCourse: React.FC<PresentCourseDetailsProps> = (props) => {
  const { courses } = useCoursesStore();
  const course = courses.find((course) => course.id === props.params.courseid);
  return <div>{course && <PresentCourseDetail course={course} />}</div>;
};

export default PresentCourse;
