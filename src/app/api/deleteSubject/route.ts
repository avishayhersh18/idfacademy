import { NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { deleteContent } from "@/app/_controllers/ContentController";
import { deleteSubject } from "@/app/_controllers/SubjectController";

interface SubjectRequest extends NextRequest {
  subjectId?: string;
}

export async function POST(req:SubjectRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("subjectId")) {
    return NextResponse.json({ message: "There is no subject data!" });
  }
  const subjectId = data.get("subjectId") as string;
  return deleteSubject(subjectId);
}
