import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database";
import { NextRequest, NextResponse } from "next/server";
import { SubjectSchema, handleError } from "@/utils/validation";
import { editSubject } from "@/app/_controllers/SubjectController";

interface SubjectRequest extends NextRequest {
  name?: string;
}

export async function POST(req: SubjectRequest, res: NextApiResponse) {
  const data = await req.formData();
  if (!data.get("subjectRename"))
    return res.json({ message: "There is no subject input!" });

  const subjectRenameProps: { id: string; name: string } = JSON.parse(
    data.get("subjectRename") as string
  );

  return await editSubject(subjectRenameProps);
}