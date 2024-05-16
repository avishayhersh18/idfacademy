import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { CourseSchema, handleError } from "@/utils/validation";
import { CourseData } from "@/app/types";
import { insertUserRequestForCourse } from "@/app/_controllers/CourseUserController";

interface CourseRequest extends NextRequest {
  courseId?: string;
  userId?: string;
}

export async function POST(req:CourseRequest, res: NextApiResponse) {
  const data = await req.formData();
  const courseId = data.get("courseId") as string;
  const userId = data.get("userId") as string;

  if (!courseId || !userId) {
    return NextResponse.json({ message: "courseId and userId are required" }, { status: 400 });
  }

  return insertUserRequestForCourse(courseId, userId);
}
