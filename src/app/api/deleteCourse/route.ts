import { NextApiResponse } from "next";

import { NextRequest, NextResponse } from "next/server";
import { deleteCourse } from "@/app/_controllers/CourseController";

interface DeleteCourseRequest extends NextRequest {
  courseId?: string;
}

export async function POST(req:DeleteCourseRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("courseId")) {
    return NextResponse.json({ message: "There is no course data!" });
  }
  const courseId = data.get("courseId") as string;
  const img_id =data.get("courseImageId") as string
  return deleteCourse(courseId,img_id);
}