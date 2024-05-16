import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import {  deleteContent } from "@/app/_controllers/ContentController";
interface ContentRequest extends NextRequest {
  contentId?: string;
}

export async function POST(req:ContentRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("contentId")) {
    return NextResponse.json({ message: "There is no content data!" });
  }
  const contentId = data.get("contentId") as string;
  return deleteContent(contentId);
}


