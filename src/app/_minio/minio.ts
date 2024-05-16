import * as Minio from "minio";
import { Stream } from "stream";

import { PassThrough } from 'stream';

export const s3Config: Minio.ClientOptions = {
  endPoint: process.env.S3_ENDPOINT || '127.0.0.1', // Default value if not set
  port: parseInt(process.env.S3_PORT || '9000', 10), // Provide a default port and parse it as an integer
  accessKey: process.env.MINIO_ROOT_USER || '', // Default to empty string if not set
  secretKey: process.env.MINIO_ROOT_PASSWORD || '', // Default to empty string if not set
  useSSL: false, // Assuming SSL is not used; adjust as needed
};

export const bucket: string = process.env.S3_BUCKET ||"idfacademy"; // Specify the name of your MinIO bucket
export const s3Client = new Minio.Client(s3Config);

export async function uploadFileToS3Service(
    file: File | null,
    buffer: Buffer,
    bucket: string,
    fileid:string
  ) {
    const objectName: any = fileid;
    const objectSize = file?.size;
  
    await new Promise((resolve, reject) => {
      s3Client.putObject(
        bucket,
        objectName,
        buffer,
        objectSize,
        (err: any, etag: unknown) => {
          if (err) {
            console.error("Error uploading to Minio:", err);
            reject(err);
          } else {
            resolve(etag);
          }
        }
      );
    });
  }
  export async function getFileFromS3Service(bucket: string, fileName: string): Promise<Stream> {
    try {
        return await s3Client.getObject(bucket, fileName);
    } catch (error) {
        console.error('Error fetching file from S3:', error);
        throw error;
    }
}
export async function getPresignedUrlFromS3Service(bucket: string, fileName: string): Promise<string> {
  try {
      const presignedUrl = await s3Client.presignedGetObject(bucket, fileName, 24 * 60 * 60); // The URL will be valid for 24 hours
      return presignedUrl;
  } catch (error) {
      console.error('Error fetching presigned URL from S3:', error);
      throw error;
  }
}




export async function getFileChunkedBase64(bucket: string, fileName: string): Promise<PassThrough> {
    try {
        const dataStream = await s3Client.getObject(bucket, fileName);
        const passThrough = new PassThrough();

        dataStream.on('data', async (chunk) => {
            // Convert chunk to base64 and write to the passThrough stream
            passThrough.write(Buffer.from(chunk).toString('base64'));
        });

        dataStream.on('end', () => {
            passThrough.end();
        });

        return passThrough;
    } catch (error) {
        console.error('Error fetching file from S3:', error);
        throw error;
    }
}

    
    