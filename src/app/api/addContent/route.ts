import { NextRequest, NextResponse } from "next/server";
import * as Minio from "minio";
import { NextApiResponse } from "next";
import { db } from "@/db/database";
import {
  addContentWithResponse,
  addTextContent,
} from "@/app/_controllers/ContentController";
import {
  s3Config,
  s3Client,
  uploadFileToS3Service,
  bucket,
} from "@/app/_minio/minio";
interface MulterRequest extends NextRequest {
  files?: Express.Multer.File[];
}
export async function POST(req: MulterRequest, res: NextApiResponse) {
  const data = await req.formData();
  let file;
  const title = data.get("title") as string;
  const comments = data.get("comments") as string;
  const subjectId = data.get("subjectId") as string;
  const estimated_time_seconds = data.get(
    "estimatedVideoTime"
  ) as unknown as number;
  if (data.get("file")) {
    const file = data.get("file") as unknown as File;
    return addContentWithResponse({
      file,
      title,
      comments,
      subjectId,
      estimated_time_seconds,
    });
  } else {
    return addTextContent(title, comments, subjectId);
  }
}
