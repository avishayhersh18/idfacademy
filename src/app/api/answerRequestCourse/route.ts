import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { CourseSchema, handleError } from "@/utils/validation";
import { CourseData } from "@/app/types";
import { processCourseUserRequest } from "@/app/_controllers/CourseUserController";

interface CourseRequestUser extends NextRequest {
  course?: CourseData;
  userId?: string;
  answerType?: string;
}

export async function POST(req:CourseRequestUser, res: NextApiResponse) {
  const data = await req.formData();
  const course: CourseData = JSON.parse(data.get("course") as string);
  const userId: string = data.get("userId") as string;
  const answerType: string = data.get("answerType") as string;
  return processCourseUserRequest({ course, userId, answerType });
}