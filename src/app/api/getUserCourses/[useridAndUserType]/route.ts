import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../db/database"; // adjust the import according to your actual db import
import { NextRequest, NextResponse } from "next/server";
import { ContentData, CourseData } from "@/app/types";
import { fetchData } from "@/app/_controllers/DataController";
import {
  getUserCoursesProgress,
  getUserCoursesIds,
} from "@/app/_controllers/CourseUserController";

interface getUserCourseProps {
  params: {
    useridAndUserType: string;
  };
}

export async function GET(req: NextRequest, context: getUserCourseProps) {
  try {
    const { useridAndUserType } = context.params;
    const stringsolited = useridAndUserType.split("|");
    const userid = stringsolited[0];
    const userType = parseInt(stringsolited[1], 10);
    const coursesIds = await getUserCoursesIds(userid, userType);
    if (userType === 4) {
      const coursesProgress = await getUserCoursesProgress(userid);
      const data = {
        coursesIds,
        coursesProgress,
      };
      console.log(data);
      return NextResponse.json(data);
    } else {
      const data = {
        coursesIds,
      };
      console.log(data);
      return NextResponse.json(data);
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ message: "Error fetching courses" });
  }
}
