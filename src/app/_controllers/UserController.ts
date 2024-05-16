import { db } from "@/db/database";
import { CourseData } from "../types";


export async function getUser(userId:string){
    const userFromDb = await db
      .selectFrom("User")
      //.where("User.id", "=", ) need to fix when will be a lot of users
      .selectAll()
      .executeTakeFirstOrThrow();
    const coursesWithChapters = await db
      .selectFrom("Course")
      .selectAll()
      .execute();
    return userFromDb;  
}