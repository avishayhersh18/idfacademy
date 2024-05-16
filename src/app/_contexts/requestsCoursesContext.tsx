import { create } from "zustand";
import { ContentData,CourseData,CoursesState,SubjectData,ChapterData, UserState, UserRequestsCourse, UserRequestCourseState} from "@/app/types";

type CoursesActions = {
  setUserRequestsCourse: (userRequestsCourse:UserRequestsCourse[]) => void;
  setAllMyRequestToCourses:(allMyRequestToCourses:string[])=>void;
  addUserRequestsCourse:(user:any,course:CourseData)=>void;
  removeRequestUserCourse:(user:any,course:CourseData)=>void;
  removeFromAllRequestUser:(course:CourseData)=>void;
};

const useUserRequestCourseStore = create<UserRequestCourseState & CoursesActions>((set) => ({
  allMyRequestToCourses:[],
  userRequestsCourses: [],
  setUserRequestsCourse: (userRequestsCourse:UserRequestsCourse[]) => set((state) => {
    state.userRequestsCourses =userRequestsCourse;
    return { ...state };
  }),
  setAllMyRequestToCourses: (allMyRequestToCourses:string[]) => set((state) => {
    state.allMyRequestToCourses =allMyRequestToCourses;
    return { ...state };
  }),

  addUserRequestsCourse: (user:any,course:CourseData) => set((state) => ({
    ...state,
    userRequestsCourses: [...state.userRequestsCourses, {user,course}],
  })),
  removeRequestUserCourse: (user: any, course: CourseData) => set((state) => ({
    ...state,
    userRequestsCourses: state.userRequestsCourses.filter(item =>
        item.user !== user || item.course !== course
    ),
})),
  removeFromAllRequestUser: (course: CourseData) => set((state) => ({
  ...state,
  allMyRequestToCourses: state.allMyRequestToCourses.filter(item =>
      item !== course.id 
  ),
})),
}));


export default useUserRequestCourseStore;
