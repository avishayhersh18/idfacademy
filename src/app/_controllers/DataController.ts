import { CourseData, UserCourseProgress } from "../types";
import { getAllCourses } from "./CourseController";
import {
  getUserCoursesProgress,
  getAllUserCourseRequests,
  getUserCoursesIds,
} from "./CourseUserController";
import { getUser } from "./UserController";

export async function fetchData() {
  try {
    const coursesFromDb = await getAllCourses();
    const courses = coursesFromDb ? coursesFromDb : [];
    const userFromDb = await getUser(""); //need to put id or something
    if (courses) {
      const userCoursesIds = await getUserCoursesIds(userFromDb.id, 4); // 4 is user role index
      // const adminCourses = await filterUserCourses(userFromDb.id, courses, 1); // 1 is admin role index
      //  const adminCourseIds = adminCourses.map(course => course.id);
      const userRequests = await getAllUserCourseRequests(userFromDb.id);
      const userProgress: any = await getUserCoursesProgress(userFromDb.id);
      console.log("all user request courses ids", userRequests);
      const roleValue = 1; // need to fix when will be roles (define role 1-admin)
      const data = {
        user: {
          ...userFromDb,
          role: roleValue,
        },
        courses,
        userCoursesIds,
        // adminCourses,
        userAllRequestsCourse: userRequests,
        userCourseProgress: userProgress, // Include user course progress
      };

      return data;
    }
  } catch (error) {
    console.error("Error in fetchCourseData:", error);
    throw error;
  }
}
