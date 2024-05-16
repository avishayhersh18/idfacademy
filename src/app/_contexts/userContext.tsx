import { create } from "zustand";
import {
  ContentData,
  CourseData,
  CoursesState,
  SubjectData,
  ChapterData,
  UserState,
  UserCourseProgress,
  ContentItemProgress,
  ContentProgress,
} from "@/app/types";
import { createInitialContentProgress } from "@/utils/progressUtils";

type CoursesActions = {
  setUser: (user: any) => void;
  setUserCourses: (courses: CourseData[]) => void;
  addUserCourse: (course: CourseData) => void;
  setAdminCourses: (courses: CourseData[]) => void;
  deleteCourseFromUser: (course: CourseData) => void;
  addNewCourseProcess: (course: CourseData) => void;
  setCoursesProgress: (coursesProgress: UserCourseProgress[]) => void;
  setSpecificCourseProgress: (coursesProgress: UserCourseProgress) => void;
  addAdminCourse: (course: CourseData) => void;
  markContentAsWatched: (
    courseId: string,
    chapterId: string,
    subjectId: string,
    contentId: string
  ) => void;
  ContentsSubjectStatus: (
    state: UserState & CoursesActions,
    courseId: string,
    chapterId: string,
    subjectId: string
  ) => ContentItemProgress[] | undefined;
};
const useUserStore = create<UserState & CoursesActions>((set) => ({
  user: null,
  userCourses: [],
  adminCourses: [],
  coursesProgress: [],

  setUser: (user: any) =>
    set((state) => {
      state.user = user;
      return { ...state };
    }),

  setUserCourses: (courses: CourseData[]) =>
    set((state) => {
      state.userCourses = courses;
      return { ...state };
    }),
  setAdminCourses: (courses: CourseData[]) =>
    set((state) => {
      state.adminCourses = courses;
      return { ...state };
    }),
  setCoursesProgress: (coursesProgress: UserCourseProgress[]) =>
    set((state) => {
      state.coursesProgress = coursesProgress;
      return { ...state };
    }),
  setSpecificCourseProgress: (courseProgress: UserCourseProgress) =>
    set((state) => {
      const updatedCoursesProgress = state.coursesProgress.map((cp) => {
        if (cp.courseId === courseProgress.courseId) {
          // Update this courseProgress with the new values
          return { ...cp, ...courseProgress };
        }
        return cp;
      });

      return { ...state, coursesProgress: updatedCoursesProgress };
    }),
  addUserCourse: (course: CourseData) =>
    set((state) => ({
      ...state,
      userCourses: [...state.userCourses, course],
    })),

  addAdminCourse: (course: CourseData) =>
    set((state) => ({
      ...state,
      adminCourses: [...state.adminCourses, course],
    })),
  deleteCourseFromUser: (course: CourseData) =>
    set((state) => {
      // Delete from userCourses
      const newUserCourses = state.userCourses.filter(
        (curCourse) => course.id !== curCourse.id
      );

      // Delete from adminCourses
      const newAdminCourses = state.adminCourses.filter(
        (curCourse) => course.id !== curCourse.id
      );

      // Delete from coursesProgress
      const newCoursesProgress = state.coursesProgress.filter(
        (courseProgress) => course.id !== courseProgress.courseId
      );

      return {
        ...state,
        userCourses: newUserCourses,
        adminCourses: newAdminCourses,
        coursesProgress: newCoursesProgress,
      };
    }),

  addNewCourseProcess: (course: CourseData) =>
    set((state) => ({
      ...state,
      coursesProgress: [
        ...state.coursesProgress,
        {
          courseId: course.id,
          lastChapterId: "",
          lastSubjectId: "",
          firstUnwatchedContentId: "",
          already_vote: false,
          contentProgress: [],
        },
      ],
    })),

  markContentAsWatched: (courseId, chapterId, subjectId, contentId) =>
    set((state) => {
      const courseProgressIndex = state.coursesProgress.findIndex(
        (cp) => cp.courseId === courseId
      );

      if (courseProgressIndex >= 0) {
        const courseProgress = state.coursesProgress[courseProgressIndex];
        let chapterSubjectIndex = courseProgress.contentProgress.findIndex(
          (cp) => cp.chapterId === chapterId && cp.subjectId === subjectId
        );

        if (chapterSubjectIndex >= 0) {
          const chapterSubject =
            courseProgress.contentProgress[chapterSubjectIndex];
          let contentIndex = chapterSubject.contents.findIndex(
            (c) => c.contentId === contentId
          );

          if (contentIndex >= 0) {
            chapterSubject.contents[contentIndex].watched = true;
          } else {
            chapterSubject.contents.push({ contentId, watched: true });
          }
        } else {
          courseProgress.contentProgress.push({
            chapterId,
            subjectId,
            contents: [{ contentId, watched: true }],
          });
        }
      } else {
        const course = state.userCourses.find(
          (course) => course.id === courseId
        );
        if (course) {
          state.coursesProgress.push({
            courseId,
            lastChapterId: course.chapters[0].id,
            lastSubjectId: course.chapters[0].subjects[0].id,
            firstUnwatchedContentId:
              course.chapters[0].subjects[0].contents[0].id,
            already_vote: false,
            contentProgress: [
              {
                chapterId,
                subjectId,
                contents: [{ contentId, watched: true }],
              },
            ],
          });
        }
      }
      // Logic to find next unwatched content
      let nextUnwatchedContentId = "";
      if (courseProgressIndex >= 0) {
        const courseProgress = state.coursesProgress[courseProgressIndex];
        for (const chapterSubject of courseProgress.contentProgress) {
          const unwatchedContent = chapterSubject.contents.find(
            (c) => !c.watched
          );
          if (unwatchedContent) {
            nextUnwatchedContentId = unwatchedContent.contentId;
            break;
          }
        }
        courseProgress.firstUnwatchedContentId = nextUnwatchedContentId;
      }

      return { ...state };
    }),
  ContentsSubjectStatus: (
    state: UserState,
    courseId: string,
    chapterId: string,
    subjectId: string
  ): ContentItemProgress[] | undefined => {
    // Find the course progress for the given courseId
    const courseProgress = state.coursesProgress?.find(
      (c) => c.courseId === courseId
    );
    if (!courseProgress) return undefined;

    // Find the chapter progress for the given chapterId
    const chapterSubjectProgress: ContentProgress | undefined =
      courseProgress.contentProgress?.find(
        (cp) => cp.chapterId === chapterId && cp.subjectId === subjectId
      );
    if (!chapterSubjectProgress) return undefined;

    // Find the specific content item by contentId and return its watched status
    return chapterSubjectProgress.contents;
  },
}));

export default useUserStore;
