// chaptersController.ts
import { db } from "@/db/database";
import { ChapterSchema, handleError } from "@/utils/validation";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { deleteContent } from "./ContentController";
import { deleteSubject } from "./SubjectController";
interface ChapterUpdateProps {
  id: string;
  name: string;
  brief: string;
}

export async function addChapter(
  courseId: string,
  chapterName: string,
  chapterBrief: string
) {
  try {
    ChapterSchema.parse({
      id: courseId,
      name: chapterName,
      brief: chapterBrief,
    });

    const newChapter = await db
      .insertInto("Chapter")
      .values({ name: chapterName, brief: chapterBrief })
      .returning(["id", "name", "brief"])
      .executeTakeFirstOrThrow();

    await db
      .insertInto("ChapterCourse")
      .values({ chapterId: newChapter.id, courseId: courseId })
      .execute();

    return NextResponse.json(newChapter);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}

export async function deleteChapter(chapterId: string) {
  try {
    const subjects = await db
      .selectFrom("SubjectChapter")
      .innerJoin("Subject", "Subject.id", "SubjectChapter.subjectId")
      .where("SubjectChapter.chapterId", "=", chapterId)
      .select(["Subject.id", "Subject.name"])
      .execute();

    //delete all the subject in chapter and the contents
    for (let subject of subjects) {
      const contents = await db
        .selectFrom("ContentSubject")
        .innerJoin("Content", "Content.id", "ContentSubject.contentId")
        .where("ContentSubject.subjectId", "=", subject.id)
        .select(["Content.id", "Content.file_name"])
        .execute();

      for (let content of contents) {
        await deleteContent(content.id);
      }

      deleteSubject(subject.id);
    }

    await db
      .deleteFrom("Chapter")
      .where("Chapter.id", "=", chapterId)
      .executeTakeFirst();

    await db
      .updateTable("UserCourseProgress")
      .set({ lastChapterId: null })
      .where("lastChapterId", "=", chapterId)
      .execute();

    return NextResponse.json({ chapterId });
  } catch (error) {
    return handleError(error);
  }
}

export async function editChapter(updateChapterProps: ChapterUpdateProps) {
  try {
    ChapterSchema.parse(updateChapterProps);
    const updatedChapter = await db
      .updateTable("Chapter")
      .set({
        name: updateChapterProps.name,
        brief: updateChapterProps.brief,
      })
      .where("id", "=", updateChapterProps.id)
      .returning(["name", "brief"])
      .executeTakeFirstOrThrow();

    return NextResponse.json(updatedChapter);
  } catch (error) {
    return handleError(error);
  }
}
