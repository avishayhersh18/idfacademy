import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { ContentData, CourseData } from "@/app/types";
import { fetchData } from "@/app/_controllers/DataController";
import { getUserCoursesProgress } from "@/app/_controllers/CourseUserController";

export async function GET(req: NextRequest, res: NextApiResponse) {
  try {
    const data = await req.formData();
    const userid = data.get("userId") as string;

    const userCourseProgress = await getUserCoursesProgress(userid);
    console.log(userCourseProgress);
    return NextResponse.json(userCourseProgress);
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ message: "Error fetching courses" });
  }
}
