import { NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { SubjectSchema, handleError} from "@/utils/validation";
import { createSubject } from "@/app/_controllers/SubjectController"; 
interface SubjectRequest extends NextRequest {
  name?: string;
  chapterId: string;
}

export async function POST(req:SubjectRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("addSubjectProps")) {
    return NextResponse.json({ message: "There is no subject data!" });
  }
  const addSubjectProps = JSON.parse(data.get("addSubjectProps") as string);
  // const name = addSubjectProps.name;
  // const chapterId = addSubjectProps.chapterId;
  return createSubject(addSubjectProps);
}
