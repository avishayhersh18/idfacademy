import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { ContentData, CourseData } from "@/app/types";
import {fetchData} from "@/app/_controllers/DataController"

export async function GET(req: NextRequest, res: NextApiResponse) {
  try{
    const data = await fetchData();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
  console.error("Error in GET request:", error);
  return NextResponse.json({ message: "Error fetching courses" });
  }
}

