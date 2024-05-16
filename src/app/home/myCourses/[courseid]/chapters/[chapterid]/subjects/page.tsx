"use client"
import React from 'react';
import { useRouter } from 'next/router';
import useCoursesStore from '@/app/_contexts/courseContext';
import { ChapterData, CourseData, SubjectData } from '@/app/types';
import { usePathname } from 'next/navigation';
import Subject from '@/app/home/myCourses/_components/subject';

interface SubjectListProps{
  params:{
    courseid:string;
    chapterid:string;
  }
}
const SubjectList: React.FC<SubjectListProps>= (props:SubjectListProps) => {
  const { courses } = useCoursesStore();
  const chapterId = props.params.chapterid;
  const courseId = props.params.courseid;
  const courseToPresent = courses.find((course) => course.id === courseId);

  const subjectsToPresent = courseToPresent?.chapters?.find((chapter)=>chapter.id===chapterId)?.subjects;


  return (
    <div className='flex flex-col'>
      {subjectsToPresent?.map((subject: SubjectData) => (
        <Subject subject={subject} chapterid={chapterId} courseid={courseId} key={subject.id}/>
      ))}
    </div>
  );
};

export default SubjectList;

