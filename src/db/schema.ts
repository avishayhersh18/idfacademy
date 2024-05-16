import {
  ColumnType,
  Generated,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface Account {
  id: string;
  userId: string;
  type: "oidc" | "oauth" | "email";
  provider: string;
  providerAccountId: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: Lowercase<string>;
  scope?: string;
  id_token?: string;
  session_state?: string;
  [key: string]: string | number | undefined; // index signature
}
export interface Session {
  id: GeneratedAlways<string>;
  userId: string;
  sessionToken: string;
  expires: Date;
}

export interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date;
}

export interface ContentTable {
  id: GeneratedAlways<string>;
  title: string;
  file_name: string;
  comments: string;
  estimated_time_seconds: number | undefined;
}

export interface ContentSubjectTable {
  contentId: string;
  subjectId: string;
}

export interface SubjectTable {
  id: GeneratedAlways<string>; // Assuming gen_random_uuid() generates a string UUID
  name: string;
  // Uncomment the line below when you decide whether to include the chapterId column
  // chapterId: string;
}

export interface SubjectChapterTable {
  subjectId: string;
  chapterId: string;
}

export interface ChapterTable {
  id: GeneratedAlways<string>; // Assuming gen_random_uuid() generates a string UUID
  name: string;
  brief: string;
  // Uncomment the line below when you decide whether to include the courseId column
  // courseId: string;
}

export interface ChapterCourseTable {
  chapterId: string;
  courseId: string;
}
export interface UserCoursesTable {
  userId: string;
  courseId: string;
  role: number;
}

export interface CourseTable {
  id: GeneratedAlways<string>;
  name: string;
  img_id: string | null;
  creationTimestamp: Date | null;
  subscribe_num: number;
  description_sub_title: string;
  description: string;
  rate: number;
  num_rates: number;
}

export interface UserRequestsCourseTable {
  userId: string;
  courseId: string;
}

export interface UserCourseProgressTable {
  userId: string;
  courseId: string;
  lastChapterId: string | null;
  lastSubjectId: string | null;
  firstUnwatchedContentId: string | null;
  contentProgress: string;
  already_vote: boolean;
}
export interface Database {
  Account: Account;
  Session: Session;
  User: User;
  VerificationToken: VerificationToken;
  Course: CourseTable;
  Content: ContentTable;
  ContentSubject: ContentSubjectTable;
  Subject: SubjectTable;
  SubjectChapter: SubjectChapterTable;
  Chapter: ChapterTable;
  ChapterCourse: ChapterCourseTable;
  UserCourses: UserCoursesTable;
  UserRequestsCourse: UserRequestsCourseTable;
  UserCourseProgress: UserCourseProgressTable;
}

export type SelectContent = Selectable<ContentTable>;
export type NewContent = Insertable<ContentTable>;
export type ContentUpdate = Updateable<ContentTable>;

export type SelectContentSubject = Selectable<ContentSubjectTable>;
export type NewContentSubject = Insertable<ContentSubjectTable>;
export type ContentSubjectUpdate = Updateable<ContentSubjectTable>;

export type SelectSubject = Selectable<SubjectTable>;
export type NewSubject = Insertable<SubjectTable>;
export type SubjectUpdate = Updateable<SubjectTable>;

export type SelectSubjectChapter = Selectable<SubjectChapterTable>;
export type NewSubjectChapter = Insertable<SubjectChapterTable>;
export type SubjectChapterUpdate = Updateable<SubjectChapterTable>;

export type SelectChapter = Selectable<ChapterTable>;
export type NewChapter = Insertable<ChapterTable>;
export type ChapterUpdate = Updateable<ChapterTable>;

export type SelectChapterCourse = Selectable<ChapterCourseTable>;
export type NewChapterCourse = Insertable<ChapterCourseTable>;
export type ChapterCourseUpdate = Updateable<ChapterCourseTable>;

export type SelectCourse = Selectable<CourseTable>;
export type NewCourse = Insertable<CourseTable>;
export type CourseUpdate = Updateable<CourseTable>;

export type SelectUser = Selectable<User>;
export type NewUser = Insertable<User>;
export type UserUpdate = Updateable<User>;

export type SelectAccount = Selectable<Account>;
export type NewAccount = Insertable<Account>;
export type AccountUpdate = Updateable<Account>;

export type SelectUserCourses = Selectable<UserCoursesTable>;
export type NewUserCourses = Insertable<UserCoursesTable>;
export type UserCoursesUpdate = Updateable<UserCoursesTable>;

export type SelectUserCourseProgress = Selectable<UserCourseProgressTable>;
export type NewUserCourseProgress = Insertable<UserCourseProgressTable>;
export type UserRequestsCourseUpdate = Updateable<UserCourseProgressTable>;

export type SelectUserRequestsCourse = Selectable<UserCoursesTable>;
export type NewUserRequestsCourse = Insertable<UserCoursesTable>;
export type UserCourseProgressUpdate = Updateable<UserCoursesTable>;
