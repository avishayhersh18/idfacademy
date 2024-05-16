"use client"
import React from 'react';
import useCoursesStore from '@/app/_contexts/courseContext';
import { ChapterData, CourseData } from '@/app/types';
import Chapter from '../../_components/chapter';
import useUserStore from '@/app/_contexts/userContext';
import { editTexts, presentCourseDetailTexts } from '@/HebrewStrings/Texts';
import PresentCourseDetails from '@/app/home/courseCatalog/_components/PresentCourseDetail';
interface ChapterListProps{
  params:{
    courseid:string;
  }
}
const PresentCourseDetailsPage: React.FC<ChapterListProps> = (props:ChapterListProps) => {
  const { courses } = useCoursesStore();
  
  const courseid =props.params.courseid;
  const courseToPresent = courses.find((course) => course.id === courseid);
  const chaptersToPresent = courseToPresent ? courseToPresent.chapters : [];
  return (
    courseToPresent&&<PresentCourseDetails course={courseToPresent}/>
  )
  }
export default PresentCourseDetailsPage;
