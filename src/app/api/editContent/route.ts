import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { editContentComments } from "@/app/_controllers/ContentController";

interface ContentRequest extends NextRequest {
  contentId?: string;
  comments?: string;
}

export async function POST(req:ContentRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("editContentProps")) {
    return NextResponse.json({ message: "There is no content input!" });
  }
  const editContentProps: { contentId: string;title:string; comments: string } = JSON.parse(data.get("editCommentsProps") as string);
  return editContentComments(editContentProps);
}
