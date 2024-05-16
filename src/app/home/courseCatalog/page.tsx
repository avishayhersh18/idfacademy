"use client"
// import { CourseDataCard } from "@/app/types";
import React, { useState, useEffect } from 'react';
import CourseCard from '@/app/home/_component/courseCard';
import useCoursesStore from '@/app/_contexts/courseContext';
import SearchCourse from './_components/searchCourse';
import { CourseData } from '@/app/types';
import useUserStore from '@/app/_contexts/userContext';
import { searchCourseTexts } from '@/HebrewStrings/Texts';

const CourseCatalog: React.FC = () => {
  const { courses } = useCoursesStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [hideRegistersCourses, sethideRegistersCourses] = useState(false);

  const [filterType, setFilterType] = useState('name'); // 'name' or 'date'
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const {userCourses}=useUserStore();

  const SearchfilteredCourses=()=>{
    let filtered:CourseData[]=[];
    if(filterType === ''){
      filtered=courses;
    }
    if (filterType === 'name') {
      filtered = courses.filter(course =>
        course.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    } if (filterType === 'date' && dateRange.start && dateRange.end) {
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      filtered = courses.filter(course => {
      if(course.creationTimestamp){
          const courseDate = new Date(course.creationTimestamp); 
          return courseDate >= startDate && courseDate <= endDate;
        }
      });
    }
    if (hideRegistersCourses) {
      filtered = filtered?.filter(course => 
        userCourses.every(userCourse => userCourse.id !== course.id)
      );
    }

    return filtered;
  }

  useEffect(() => {
    let filtered=SearchfilteredCourses()
    if(!filtered)
      filtered=[]
    setFilteredCourses(filtered)
  }, [hideRegistersCourses,searchTerm, courses, filterType, dateRange]);

  return (
    <div className="container flex flex-col items-center mx-auto p-4">
      <div>
      <SearchCourse 
        searchTerm={searchTerm} 
        filterType={filterType}
        setSearchTerm={setSearchTerm}
        setFilterType={setFilterType}
        setDateRange={setDateRange}
      />
      </div>
      <div className='flex flex-row'>
        <div><p>{searchCourseTexts.hideRegisterCourses}</p></div>
        <div>
        <input 
          type="checkbox" 
          checked={hideRegistersCourses} 
          onChange={() => sethideRegistersCourses(!hideRegistersCourses)}
       />
       </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-start">

      {filteredCourses.length > 0 ? (
        filteredCourses.map((course, index) => (
            <CourseCard key={index} course={course} isPresentMode={false}/>
        ))
    ) : (
        <p className="col-span-full text-center">No courses found for this search.</p>
    )}
      </div>
    </div>
  );
};

export default CourseCatalog;