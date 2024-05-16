import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { s3Client ,bucket, getFileFromS3Service, getFileChunkedBase64, getPresignedUrlFromS3Service} from "@/app/_minio/minio";
import { json } from "stream/consumers";


interface FileRequest extends NextRequest {
    fileName?: string;
  }
interface getFileProps{
    params:{
        contentId:string
    }
} 

export async function GET(req: FileRequest, context: getFileProps) {
    const { contentId } = context.params;
    try {
        const presignedUrl = await getPresignedUrlFromS3Service(bucket, contentId);
        const newHeaders = new Headers();
                newHeaders.set("Content-Type", "application/octet-stream");
                newHeaders.set("Content-Disposition", `attachment; filename="${contentId}"`);
        return new NextResponse(JSON.stringify({ url: presignedUrl }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'  
        }});
    } catch (err) {
        console.error("Error generating pre-signed URL:", err);
        return new Response(JSON.stringify({ message: "Error getting the file" }), { status: 500 });
    }
}
