// CourseUserRequestController.ts
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/db/database";
import { handleError } from "@/utils/validation";
import { CourseData } from "@/app/types";

interface CourseUserRequestData {
  course: CourseData;
  userId: string;
  answerType: string;
}
interface UpdateProcessProps {
  userId: string;
  courseId: string;
  lastChapterId: string;
  lastSubjectId: string;
  firstUnwatchedContentId: string;
  contentProgress: string;
  already_vote: boolean;
}

export async function processCourseUserRequest(
  requestData: CourseUserRequestData
) {
  const { course, userId, answerType } = requestData;
  try {
    // Delete from UserRequestsCourse
    await db
      .deleteFrom("UserRequestsCourse")
      .where("UserRequestsCourse.courseId", "=", course.id)
      .where("UserRequestsCourse.userId", "=", userId)
      .executeTakeFirstOrThrow();

    if (answerType === "Accept") {
      const roleType = 4; // Assuming 4 is the role for a user present in the course
      const insertIntoUserCourses = await db
        .insertInto("UserCourses")
        .values({ courseId: course.id, userId, role: roleType })
        .returning(["userId", "courseId", "role"])
        .executeTakeFirstOrThrow();

      await db
        .updateTable("Course")
        .set({ subscribe_num: course.subscribe_num + 1 })
        .where("id", "=", course.id)
        .execute();
      //if null take the []
      const [firstChapter] = course.chapters || [];
      const [firstSubject] = firstChapter?.subjects || [];
      const [firstContent] = firstSubject?.contents || [];

      await db
        .insertInto("UserCourseProgress")
        .values({
          userId,
          courseId: course.id,
          lastChapterId: firstChapter?.id || null,
          lastSubjectId: firstSubject?.id || null,
          firstUnwatchedContentId: firstContent?.id || null,
          contentProgress: JSON.stringify([]),
          already_vote: false,
        })
        .returning([
          "courseId",
          "lastChapterId",
          "lastSubjectId",
          "firstUnwatchedContentId",
          "contentProgress",
          "already_vote",
        ])
        .executeTakeFirstOrThrow();

      return NextResponse.json(insertIntoUserCourses);
    }

    return NextResponse.json(null);
  } catch (error) {
    console.error("Error in processCourseUserRequest:", error);
    return handleError(error);
  }
}

export async function getUserCoursesRequestsForAdmin(
  userId: string,
  adminCourseIds: string[]
) {
  const userRequestsCoursesDb =
    adminCourseIds.length > 0
      ? await db
          .selectFrom("UserRequestsCourse")
          .leftJoin("User", "User.id", "UserRequestsCourse.userId")
          .leftJoin("Course", "Course.id", "UserRequestsCourse.courseId")
          .where("UserRequestsCourse.courseId", "in", adminCourseIds)
          .select([
            "User.id as userId",
            "User.name as userName",
            "User.email as userEmail",
            "User.emailVerified as userEmailVerified",
            "User.image as userImage",

            "Course.id as id",
          ])
          .execute()
      : [];
  const userRequestsCourse = userRequestsCoursesDb.map((request) => ({
    user: {
      id: request.userId,
      name: request.userName,
      email: request.userEmail,
      emailVerified: request.userEmailVerified,
      image: request.userImage,
    },
    courseId: request.id,
  }));
  return userRequestsCourse;
}

export async function getAllUserCourseRequests(userId: string) {
  let userRequestsCoursesIdsDb = await db
    .selectFrom("UserRequestsCourse")

    .where("UserRequestsCourse.userId", "=", userId)
    .select(["UserRequestsCourse.courseId"])
    .execute();
  if (userRequestsCoursesIdsDb == undefined) userRequestsCoursesIdsDb = [];

  return userRequestsCoursesIdsDb.map((object) => object.courseId);
}

export async function getUserCoursesProgress(userId: string) {
  const userCourseProgressData = await db
    .selectFrom("UserCourseProgress")
    .where("userId", "=", userId)
    .selectAll()
    .execute();
  const formattedProgressData = userCourseProgressData.map((progress) => {
    const contentProgress =
      typeof progress.contentProgress === "string"
        ? JSON.parse(progress.contentProgress)
        : progress.contentProgress;
    return {
      courseId: progress.courseId,
      lastChapterId: progress.lastChapterId,
      lastSubjectId: progress.lastSubjectId,
      firstUnwatchedContentId: progress.firstUnwatchedContentId,
      contentProgress: contentProgress,
      already_vote: progress.already_vote,
    };
  });
  console.log(formattedProgressData);
  return formattedProgressData;
}
export async function getUserCoursesIds(
  userId: string,
  roleIndex: number
): Promise<string[]> {
  const coursesidofuser = await db
    .selectFrom("UserCourses")
    .where("userId", "=", userId)
    .where("role", "=", roleIndex) //4 is users courses
    .select(["UserCourses.courseId"])
    .execute();
  const coursesId = coursesidofuser.map(
    (courseidfromdb) => courseidfromdb.courseId
  );
  return coursesId;
}

export async function insertUserRequestForCourse(
  courseId: string,
  userId: string
) {
  try {
    const insertUserRequestCourse = await db
      .insertInto("UserRequestsCourse")
      .values({
        courseId: courseId,
        userId: userId,
      })
      .returning(["userId", "courseId"])
      .executeTakeFirstOrThrow();

    return NextResponse.json(insertUserRequestCourse);
  } catch (error) {
    console.error("Error in insertUserRequestForCourse:", error);
    return handleError(error);
  }
}
export async function updateUserCourseVote(courseId: string, userId: string) {
  const already_vote = await db
    .updateTable("UserCourseProgress")
    .set({ already_vote: true })
    .where("userId", "=", userId)
    .where("courseId", "=", courseId)
    .returning(["already_vote"])
    .executeTakeFirstOrThrow();
  console.log(already_vote);
}

export async function updateUserCourseProgress(
  updateProcessProps: UpdateProcessProps
) {
  const {
    userId,
    courseId,
    lastChapterId,
    lastSubjectId,
    firstUnwatchedContentId,
    contentProgress,
    already_vote,
  } = updateProcessProps;

  try {
    const result = await db
      .updateTable("UserCourseProgress")
      .set({
        lastChapterId,
        lastSubjectId,
        firstUnwatchedContentId,
        contentProgress,
        already_vote,
      })
      .where("userId", "=", userId)
      .where("courseId", "=", courseId)
      .returning("contentProgress")
      .executeTakeFirstOrThrow();

    const serializedResult = result;
    return NextResponse.json(serializedResult);
  } catch (error) {
    return handleError(error);
  }
}
