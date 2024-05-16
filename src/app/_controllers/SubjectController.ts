// SubjectController.ts
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { db } from "@/db/database"; // Adjust the import path as needed
import { SubjectSchema, handleError } from "@/utils/validation";
import { deleteContent } from "./ContentController";

interface SubjectCreationData {
  name: string;
  chapterId: string;
}
interface SubjectRenameProps {
  id: string;
  name: string;
}


export async function createSubject(subjectData: SubjectCreationData) {
  const { name, chapterId } = subjectData;
  try {
    SubjectSchema.parse({ name });

    const newSubject = await db
      .insertInto("Subject")
      .values({ name })
      .returning(["id", "name"])
      .executeTakeFirstOrThrow();

    await db
      .insertInto("SubjectChapter")
      .values({
        subjectId: newSubject.id,
        chapterId
      })
      .execute();

    return NextResponse.json(newSubject);
  } catch (error) {
    console.error("Error in createSubject:", error);
    return handleError(error);
  }
}
export async function deleteSubject(subjectId: string) {
    try {
      // Fetch and delete related content
      const contents = await db
        .selectFrom("ContentSubject")
        .innerJoin("Content", "Content.id", "ContentSubject.contentId")
        .where("ContentSubject.subjectId", "=", subjectId)
        .select(["Content.id", "Content.file_name"])
        .execute();
  
      for (let content of contents) {
        await deleteContent(content.id); // Ensuring deleteContent handles response correctly
      }
  
      // Delete the subject itself
      await db
        .deleteFrom("Subject")
        .where("Subject.id", "=", subjectId)
        .executeTakeFirst();
  
      // Update UserCourseProgress
      await db
        .updateTable("UserCourseProgress")
        .set({ lastSubjectId: null })
        .where("lastSubjectId", "=", subjectId)
        .execute();
  
      return NextResponse.json({ message: "Subject deleted successfully!" });
    } catch (error) {
      console.error("Error in deleteSubject:", error);
      return handleError(error); // Ensure you have a handleError function
    }
}

export async function editSubject(subjectRenameProps: SubjectRenameProps) {
  try {
    SubjectSchema.parse(subjectRenameProps);
    const updatedSubject = await db
      .updateTable("Subject")
      .set({
        name: subjectRenameProps.name,
      })
      .where("id", "=", subjectRenameProps.id)
      .returning(["name"])
      .executeTakeFirstOrThrow();

    return NextResponse.json(updatedSubject);
  } catch (error) {
    return handleError(error);
  }
}