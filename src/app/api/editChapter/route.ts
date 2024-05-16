import { NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";

import { ChapterSchema, handleError } from "@/utils/validation";
import { editChapter } from "@/app/_controllers/ChapterController";

interface ChapterUpdateRequest extends NextRequest {
  name?: string;
  brief?: string;
}

export async function POST(req: ChapterUpdateRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("updateChapterProps"))
    return res.json({ message: "There is no course input!" });

  const updateChapterProps: { id: string; name: string; brief: string } =
    JSON.parse(data.get("updateChapterProps") as string);

  return await editChapter(updateChapterProps);
}