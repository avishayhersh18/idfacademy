import { create } from "zustand";
import { ContentData,CourseData,CoursesState,SubjectData,ChapterData} from "@/app/types";





type CoursesActions = {
  addCourse: (course: CourseData) => void;
  addChapter: (courseId: string, chapter: ChapterData) => void;
  addSubject: (
    courseId: string,
    chapterIndex: number,
    subject: SubjectData
  ) => void;
  addContent: (
    courseId: string,
    chapterId: string,
    subjectId: string,
    content: ContentData
  ) => void;
  deleteCourse: (course: CourseData) => void;
  deleteChapter: (chapter: ChapterData, courseId: string) => void;
  deleteSubject: (
    subject: SubjectData,
    chapterId: string,
    courseId: string
  ) => void;
  deleteContent: (
    content: ContentData,
    subjectId: string,
    chapterId: string,
    courseId: string
  ) => void;
  editCourse: (course: CourseData) => void;
  updateChapter: (chapter: ChapterData, courseId: string) => void;
  updateSubject: (
    subject: SubjectData,
    chapterId: string,
    courseId: string
  ) => void;
  updateComments: (
    content: ContentData,
    subjectId: string,
    chapterId: string,
    courseId: string
  ) => void;
  setCourseName: (courseId: string, name: string) => void;
  setChapterBrief: (
    courseId: string,
    chapterIndex: number,
    brief: string
  ) => void;
  setCourses: (courses: CourseData[]) => void;
};

const useCoursesStore = create<CoursesState & CoursesActions>((set) => ({
  courses: [],
  initinalCourse:{
    id: "",
    name: "",
    img_id:null,
    creationTimestamp: null,
    subscribe_num:0,
    description_sub_title:"",
    description:"",
    rate:0,
    num_rates:0,
    chapters: [],
  },
  addCourse: (course) =>
    set((state) => ({
      ...state,
      courses: [...state.courses, course],
    })),

  addChapter: (courseId, chapter) =>
    set((state) => {
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        course.chapters.push(chapter);
      }
      return { ...state };
    }),

  addSubject: (courseId, chapterIndex, subject) =>
    set((state) => {
      const course = state.courses.find((c) => c.id === courseId);
      if (course && course.chapters[chapterIndex]) {
        course.chapters[chapterIndex].subjects.push({
          ...subject,
          contents: [],
        });
      }
      return { ...state };
    }),

  addContent: (
    courseId: string,
    chapterId: string,
    subjectId: string,
    content: ContentData
  ) =>
    set((state) => {
      state.courses = state.courses.map((curCourse:CourseData) => {
        if (courseId === curCourse.id) {
          const newChapters = curCourse.chapters.map((curChapter) => {
            if (curChapter.id === chapterId) {
              const newSubjects = curChapter.subjects.map((curSubject) => {
                if (curSubject.id === subjectId) {
                  let newContents = curSubject.contents;
                  newContents.push(content);
                  return {
                    id: curSubject.id,
                    name: curSubject.name,
                    contents: newContents,
                  };
                }
                return curSubject;
              });
              return {
                id: curChapter.id,
                name: curChapter.name,
                brief: curChapter.brief,
                subjects: newSubjects,
              };
            }
            return curChapter;
          });
          return {
            id: curCourse.id,
            name: curCourse.name,
            img_id:curCourse.img_id,
            creationTimestamp:curCourse.creationTimestamp,
            subscribe_num:curCourse.subscribe_num,
            description_sub_title:curCourse.description_sub_title,
            description:curCourse.description,
            rate:curCourse.rate,
            num_rates:curCourse.num_rates,
            chapters: newChapters,
          };
        }
        return curCourse;
      });
      return { ...state };
    }),

  deleteCourse: (course: CourseData) =>
    set((state) => {
      state.courses = state.courses.filter(
        (curCourse) => course.id !== curCourse.id
      );
      return { ...state };
    }),

  deleteChapter: (chapter: ChapterData, courseId: string) =>
    set((state) => {
      state.courses = state.courses.map((curCourse) => {
        if (courseId === curCourse.id) {
          const updatedChapter = curCourse.chapters.filter(
            (curChapter) => chapter.id !== curChapter.id
          );
          return {
            id: curCourse.id,
            name: curCourse.name,
            img_id:curCourse.img_id,
            creationTimestamp:curCourse.creationTimestamp,
             subscribe_num:curCourse.subscribe_num,
            description_sub_title:curCourse.description_sub_title,
            description:curCourse.description,
            rate:curCourse.rate,
            num_rates:curCourse.num_rates,
            chapters: updatedChapter,
          };
        }
        return curCourse;
      });
      return { ...state };
    }),

  deleteSubject: (subject: SubjectData, chapterId: string, courseId: string) =>
    set((state) => {
      state.courses = state.courses.map((curCourse) => {
        if (courseId === curCourse.id) {
          const updatedChapters = curCourse.chapters.map((curChapter) => {
            if (chapterId === curChapter.id) {
              const updatedSubjects = curChapter.subjects.filter(
                (curSubject) => subject.id !== curSubject.id
              );
              return {
                id: curCourse.id,
                name: curCourse.name,
                brief: curChapter.brief,
                subjects: updatedSubjects,
              };
            }
            return curChapter;
          });
          return {
            id: curCourse.id,
            name: curCourse.name,
            img_id:curCourse.img_id,
            creationTimestamp:curCourse.creationTimestamp,
            subscribe_num:curCourse.subscribe_num,
            description_sub_title:curCourse.description_sub_title,
            description:curCourse.description,
            rate:curCourse.rate,
            num_rates:curCourse.num_rates,
            chapters: updatedChapters,
          };
        }
        return curCourse;
      });
      return { ...state };
    }),

  deleteContent: (
    content: ContentData,
    subjectId: string,
    chapterId: string,
    courseId: string
  ) =>
    set((state) => {
      state.courses = state.courses.map((curCourse) => {
        if (curCourse.id === courseId) {
          const newChapters = curCourse.chapters.map((curChapter) => {
            if (curChapter.id === chapterId) {
              const newSubjects = curChapter.subjects.map((curSubject) => {
                if (curSubject.id === subjectId) {
                  const newContents = curSubject.contents.filter(
                    (cont) => cont.id !== content.id
                  );
                  return {
                    id: curSubject.id,
                    name: curSubject.name,
                    contents: newContents,
                  };
                }
                return curSubject;
              });
              return {
                id: curChapter.id,
                name: curChapter.name,
                brief: curChapter.brief,
                subjects: newSubjects,
              };
            }
            return curChapter;
          });
          return {
            id: curCourse.id,
            name: curCourse.name,
            img_id:curCourse.img_id,
            creationTimestamp:curCourse.creationTimestamp,
            subscribe_num:curCourse.subscribe_num,
            description_sub_title:curCourse.description_sub_title,
            description:curCourse.description,
            rate:curCourse.rate,
            num_rates:curCourse.num_rates,
            chapters: newChapters,
          };
        }
        return curCourse;
      });
      return { ...state };
    }),

  editCourse: (course: CourseData) =>
    set((state) => {
      state.courses = state.courses.map((curCourse) => {
        if (course.id === curCourse.id)
          return {
            id: curCourse.id,
            name: course.name,
            img_id:curCourse.img_id,
            creationTimestamp:curCourse.creationTimestamp,
            subscribe_num:curCourse.subscribe_num,
            description_sub_title:curCourse.description_sub_title,
            description:curCourse.description,
            rate:curCourse.rate,
             num_rates:curCourse.num_rates,
            chapters: curCourse.chapters,
          };
        return curCourse;
      });
      return { ...state };
    }),

  updateChapter: (chapter: ChapterData, courseId: string) =>
    set((state) => {
      state.courses = state.courses.map((curCourse) => {
        if (courseId === curCourse.id) {
          const updatedChapter = curCourse.chapters.map((curChapter) => {
            if (chapter.id === curChapter.id) {
              return {
                id: curChapter.id,
                name: chapter.name,
                brief: chapter.brief,
                subjects: curChapter.subjects,
              };
            }
            return curChapter;
          });
          return {
            id: curCourse.id,
            name: curCourse.name,
            img_id:curCourse.img_id,
            creationTimestamp:curCourse.creationTimestamp,
            subscribe_num:curCourse.subscribe_num,
            description_sub_title:curCourse.description_sub_title,
            description:curCourse.description,
            rate:curCourse.rate,
            num_rates:curCourse.num_rates,
            chapters: updatedChapter,
          };
        }
        return curCourse;
      });
      return { ...state };
    }),
  updateSubject: (subject: SubjectData, chapterId: string, courseId: string) =>
    set((state) => {
      state.courses = state.courses.map((curCourse) => {
        if (courseId === curCourse.id) {
          const updatedChapters = curCourse.chapters.map((curChapter) => {
            if (chapterId === curChapter.id) {
              const updatedSubjects = curChapter.subjects.map((curSubject) => {
                if (subject.id === curSubject.id) {
                  return {
                    id: curSubject.id,
                    name: subject.name,
                    contents: curSubject.contents,
                  };
                }
                return curSubject;
              });
              return {
                id: curCourse.id,
                name: curCourse.name,
                brief: curChapter.brief,
                subjects: updatedSubjects,
              };
            }
            return curChapter;
          });
          return {
            id: curCourse.id,
            name: curCourse.name,
            img_id:curCourse.img_id,
            creationTimestamp:curCourse.creationTimestamp,
            subscribe_num:curCourse.subscribe_num,
            description_sub_title:curCourse.description_sub_title,
            description:curCourse.description,
            rate:curCourse.rate,
            num_rates:curCourse.num_rates,
            chapters: updatedChapters,
          };
        }
        return curCourse;
      });
      return { ...state };
    }),

  updateComments: (
    content: ContentData,
    subjectId: string,
    chapterId: string,
    courseId: string
  ) =>
    set((state) => {
      state.courses = state.courses.map((curCourse) => {
        if (curCourse.id === courseId) {
          const newChapters = curCourse.chapters.map((curChapter) => {
            if (curChapter.id === chapterId) {
              const newSubjects = curChapter.subjects.map((curSubject) => {
                if (curSubject.id === subjectId) {
                  const newContents = curSubject.contents.map((curContent) => {
                    if (curContent.id === content.id) return content;
                    return curContent;
                  });
                  return {
                    id: curSubject.id,
                    name: curSubject.name,
                    contents: newContents,
                  };
                }
                return curSubject;
              });
              return {
                id: curChapter.id,
                name: curChapter.name,
                brief: curChapter.brief,
                subjects: newSubjects,
              };
            }
            return curChapter;
          });
          return {
            id: curCourse.id,
            name: curCourse.name,
            img_id:curCourse.img_id,
            creationTimestamp:curCourse.creationTimestamp,
            subscribe_num:curCourse.subscribe_num,
            description_sub_title:curCourse.description_sub_title,
            description:curCourse.description,
            rate:curCourse.rate,
            num_rates:curCourse.num_rates,
            chapters: newChapters,
          };
        }
        return curCourse;
      });
      return { ...state };
    }),

  setCourseName: (courseId, name) =>
    set((state) => {
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        course.name = name;
      }
      return { ...state };
    }),

  setChapterBrief: (courseId, chapterIndex, brief) =>
    set((state) => {
      const course = state.courses.find((c) => c.id === courseId);
      if (course && course.chapters[chapterIndex]) {
        course.chapters[chapterIndex].brief = brief;
      }
      return { ...state };
    }),
  setCourses: (courses) =>
    set((state) => ({
      ...state,
      courses: courses,
    })),
}));

export default useCoursesStore;
