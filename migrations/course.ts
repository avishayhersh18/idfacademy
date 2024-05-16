// migrations/20230928120002_create_course.ts

import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
  .createTable("Course")
  .addColumn("id", "uuid", (col) =>
    col.primaryKey().defaultTo(sql`gen_random_uuid()`)
  )
  .addColumn("name", "text")
  .addColumn("img_id", "text")
  .addColumn("creationTimestamp", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
  .addColumn("subscribe_num", "integer")
  .addColumn("description_sub_title", "text")
  .addColumn("description", "text")
  .addColumn("rate","float4")
  .addColumn("num_rates","integer")
  .addUniqueConstraint("unique_course_name", ["name"])
  .execute();
  await db.schema
  .createTable("Chapter")
  .addColumn("id", "uuid", (col) =>
    col.primaryKey().defaultTo(sql`gen_random_uuid()`)
  )
  .addColumn("name", "text")
  .addColumn("brief", "text")
  .addUniqueConstraint("unique_chapter_all_columns", [ "name", "brief"])
  .execute();

  await db.schema
  .createTable("Subject")
  .addColumn("id", "uuid", (col) =>
    col.primaryKey().defaultTo(sql`gen_random_uuid()`)
  )
  .addColumn("name", "text")
  .execute();

  await db.schema
  .createTable("Content")
  .addColumn("id", "uuid", (col) =>
    col.primaryKey().defaultTo(sql`gen_random_uuid()`)
  )
  .addColumn("title", "text")
  .addColumn("file_name", "text")
  .addColumn("comments", "text")
  .addColumn("estimated_time_seconds","integer")
  .addUniqueConstraint("unique_content_all_columns", ["title","file_name", "comments","estimated_time_seconds"])
  .execute();


  await db.schema
  .createTable("ContentSubject")
  .addColumn("contentId", "uuid", (col) =>
    col.references("Content.id").onDelete("cascade").notNull().unique()
  )
  .addColumn("subjectId", "uuid", (col) =>
    col.references("Subject.id").onDelete("cascade").notNull()
  )
  // .addUniqueConstraint("unique_contentsubject_all_columns", ["contentId", "subjectId"])
  .execute();

await db.schema
  .createTable("SubjectChapter")
  .addColumn("subjectId", "uuid", (col) =>
    col.references("Subject.id").onDelete("cascade").notNull().unique()
  )
  .addColumn("chapterId", "uuid", (col) =>
    col.references("Chapter.id").onDelete("cascade").notNull()
  )
  // .addUniqueConstraint("unique_subjectchapter_all_columns", ["subjectId", "chapterId"])
  .execute();

  await db.schema
  .createTable("ChapterCourse")
  .addColumn("chapterId", "uuid", (col) =>
    col.references("Chapter.id").onDelete("cascade").notNull().unique()
  )
  .addColumn("courseId", "uuid", (col) =>
    col.references("Course.id").onDelete("cascade").notNull()
  )
  // .addUniqueConstraint("unique_chaptercourse_all_columns", ["chapterId", "courseId"])
  .execute();


    //Account tables
    await db.schema
    .createTable("User")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("name", "text")
    .addColumn("email", "text", (col) => col.unique().notNull())
    .addColumn("emailVerified", "timestamptz")
    .addColumn("image", "text")
    .addUniqueConstraint("unique_user_all_columns", ["id", "name", "email", "emailVerified", "image"])
    .execute();
  
    await db.schema
    .createTable("Account")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("type", "text", (col) => col.notNull())
    .addColumn("provider", "text", (col) => col.notNull())
    .addColumn("providerAccountId", "text", (col) => col.notNull())
    .addColumn("refresh_token", "text")
    .addColumn("access_token", "text")
    .addColumn("expires_at", "bigint")
    .addColumn("token_type", "text")
    .addColumn("scope", "text")
    .addColumn("id_token", "text")
    .addColumn("session_state", "text")
    .addUniqueConstraint("unique_account_all_columns", [
      "id", "userId", "type", "provider", "providerAccountId", "refresh_token",
      "access_token", "expires_at", "token_type", "scope", "id_token", "session_state"
    ])
    .execute();
  
  
    await db.schema
    .createTable("Session")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("sessionToken", "text", (col) => col.notNull().unique())
    .addColumn("expires", "timestamptz", (col) => col.notNull())
    .addUniqueConstraint("unique_session_all_columns", [
      "id", "userId", "sessionToken", "expires"
    ])
    .execute();
  
    await db.schema
    .createTable("VerificationToken")
    .addColumn("identifier", "text", (col) => col.notNull())
    .addColumn("token", "text", (col) => col.notNull().unique())
    .addColumn("expires", "timestamptz", (col) => col.notNull())
    .addUniqueConstraint("unique_verificationtoken_all_columns", [
      "identifier", "token", "expires"
    ])
    .execute();
  
    await db.schema
      .createIndex("Account_userId_index")
      .on("Account")
      .column("userId")
      .execute();
  
    await db.schema
      .createIndex("Session_userId_index")
      .on("Session")
      .column("userId")
      .execute();

      //Users course schema
      await db.schema
      .createTable("UserCourses")
      .addColumn("userId", "uuid", (col) =>
        col.references("User.id").onDelete("cascade").notNull()
      )
      .addColumn("courseId", "uuid", (col) =>
        col.references("Course.id").onDelete("cascade").notNull()
      )
      .addColumn("role", "integer")
      .addUniqueConstraint("unique_user_course", ["userId", "courseId", "role"])
      .execute();

      await db.schema
      .createTable("UserRequestsCourse")
      .addColumn("userId", "uuid", (col) =>
        col.references("User.id").onDelete("cascade").notNull()
      )
      .addColumn("courseId", "uuid", (col) =>
        col.references("Course.id").onDelete("cascade").notNull()
      )
      .addUniqueConstraint("unique_user_course_requests", ["userId", "courseId"])
      .execute();

      await db.schema
      .createTable("UserCourseProgress")
      .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
      )
      .addColumn("courseId", "uuid", (col) =>
      col.references("Course.id").onDelete("cascade").notNull()
      )
      .addColumn("lastChapterId", "uuid",)
      .addColumn("lastSubjectId", "uuid")
      .addColumn("firstUnwatchedContentId","uuid")
      .addColumn("contentProgress", "jsonb") // JSONB for PostgreSQL, adjust according to your DBMS
      .addColumn("already_vote", "boolean", (col) =>
          col.defaultTo(false) // Assuming by default, a user has not voted.
      )
      .addUniqueConstraint("unique_user_course_progress", ["userId", "courseId"])
      .execute();

}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("Content").ifExists().execute();
  await db.schema.dropTable("ContentSubject").ifExists().execute();
  await db.schema.dropTable("Subject").ifExists().execute();
  await db.schema.dropTable("SubjectChapter").ifExists().execute();
  await db.schema.dropTable("Chapter").ifExists().execute();
  await db.schema.dropTable("ChapterCourse").ifExists().execute();
  await db.schema.dropTable("Course").ifExists().execute();

  await db.schema.dropTable("UserCourses").ifExists().execute();
  await db.schema.dropTable("UserRequestsCourse").ifExists().execute();
  await db.schema.dropTable("UserCourseProgress").ifExists().execute();
  
  await db.schema.dropTable("Account").ifExists().execute();
  await db.schema.dropTable("Session").ifExists().execute();
  await db.schema.dropTable("User").ifExists().execute();
  await db.schema.dropTable("VerificationToken").ifExists().execute();

}
