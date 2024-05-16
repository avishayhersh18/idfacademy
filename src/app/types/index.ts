// export type CourseDataCard = {
//   name: string;
//   image: string;
//   chapters: ChapterData[];
// };

export enum Users {
  Admin = 1,
  Editor = 2,
  Creator = 3,
  User = 4,
}

export type ContentData = {
  id: string;
  title: string;
  file_name: string;
  comments: string;
  estimated_time_seconds?: number; 
};

export type SubjectData = {
  id: string;
  name: string;
  contents: ContentData[];
};

export type ChapterData = {
  id: string;
  name: string;
  brief: string;
  subjects: SubjectData[];
};

// export type CourseData = {
//   id: string;
//   name: string;
//   img_id:ContentData|null;
//   creationTimestamp:Date|null;
//   chapters: ChapterData[];
//   subscribe_num:number;
// };

export type CourseData = {
  id: string;                    // Unique identifier for the course.
  name: string;                  // The name or title of the course.
  img_id: ContentData | null;    // An optional reference to the course's image.
  creationTimestamp: Date | null; // The date and time when the course was created (nullable if unknown).
  subscribe_num: number;         // The number of users who have subscribed to this course.
  description_sub_title: string;            // Name of the primary course instructor.
  description: string;     // Names of sub-instructors, if any.
  rate: number;
  num_rates:number;                  // The average rating of the instructor(s).
  chapters: ChapterData[];  
};


export type UserRequestsCourse={
  user:any;
  course:CourseData;
};
// export type CourseData = {
//   id: string;
//   name: string;
//   chapters: ChapterData[];
// };

export type CoursesState = {
  courses: CourseData[];
  initinalCourse:CourseData;
};
export type UserState = {
  user: any;
  userCourses:CourseData[];
  adminCourses:CourseData[];
  coursesProgress: UserCourseProgress[]; 
}

//user process structre
export type UserCourseProgress = {
  courseId: string;
  lastChapterId: string;
  lastSubjectId: string;
  firstUnwatchedContentId:string;
  contentProgress: ContentProgress[];
  already_vote:boolean;
};
export type ContentProgress = {
  chapterId:string;
  subjectId: string;
  contents: ContentItemProgress[];
};

export type ContentItemProgress = {
  contentId: string;
  watched: boolean;
};

export type UserRequestCourseState={
  allMyRequestToCourses:string[];
  userRequestsCourses:UserRequestsCourse[];
}

export type EnhancedContentData = ContentData & {
  mediaSrc: string;
  mediaType: string;
};


//for the fiture of continue standing 


