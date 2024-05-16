import { NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { deleteChapter } from "@/app/_controllers/ChapterController";

interface DeleteChapterRequest extends NextRequest {
  chapterId?: string;
}

export async function POST(req:DeleteChapterRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("chapterId")) {
    return NextResponse.json({ message: "There is no chapter data!" });
  }
  const chapterId = data.get("chapterId") as string;

  return deleteChapter(chapterId);
}
