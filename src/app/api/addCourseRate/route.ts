import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { CourseSchema, handleError } from "@/utils/validation";
import { CourseData } from "@/app/types";
import { editCourse } from "@/app/_controllers/CourseController";
import { updateUserCourseVote } from "@/app/_controllers/CourseUserController";

interface CourseRequest extends NextRequest {
  name?: string;
}

export async function POST(req: CourseRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("course"))
    return NextResponse.json({ message: "There is no course input!" });
  const courseRenameProps: CourseData = JSON.parse(
    data.get("course") as string
  );
  const userId = data.get("userId") as string;
  const Newrate = data.get("rate") as string as unknown as number;
  if (courseRenameProps.img_id) {
    const courseToDb = {
      id: courseRenameProps.id,
      name: courseRenameProps.name,
      img_id: courseRenameProps.img_id.id,
      creationTimestamp: courseRenameProps.creationTimestamp,
      subscribe_num: courseRenameProps.subscribe_num,
      description_sub_title: courseRenameProps.description_sub_title,
      description: courseRenameProps.description,
      rate: courseRenameProps.rate,
      num_rates: courseRenameProps.num_rates,
    };

    updateUserCourseVote(courseRenameProps.id, userId);

    return editCourse(courseToDb, Newrate);
  }
}
