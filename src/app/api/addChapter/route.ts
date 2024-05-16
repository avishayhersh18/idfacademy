import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { ChapterSchema, handleError } from "@/utils/validation";
import { ZodError } from "zod";
import { addChapter } from "@/app/_controllers/ChapterController"

interface ChaptersRequest extends NextRequest {
  courseId?: string;
  chapterName?: string;
  chapterBrief?: string;
}

export async function POST(req: ChaptersRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("courseAddChapter"))
    return NextResponse.json({ message: "There is no course data!" });
    const addChapterProps = JSON.parse(data.get("courseAddChapter") as string);
    const { id: courseId, name: chapterName, brief: chapterBrief } = addChapterProps;
    return addChapter(courseId, chapterName, chapterBrief);
}
