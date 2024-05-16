import useUserStore from '@/app/_contexts/userContext';
import { CourseData, UserCourseProgress,ChapterData,ContentProgress, ContentItemProgress } from '@/app/types'
import { useRouter } from 'next/navigation';

export const createInitialContentProgress = (course: CourseData): ContentProgress[] => {
  return course.chapters.map((chapter:ChapterData )=> ({
    chapterId: chapter.id,
    subjectId: '', // initially empty, will be filled when the first unwatched content is found
    contents: chapter.subjects.flatMap(subject =>
      subject.contents.map(content => ({
        contentId: content.id,
        watched: false
      }))
    )
  }));
};

// Function to find the first chapter with any unwatched content and create content progress
export const findFirstUnwatched = (course: CourseData, router: any, coursesProgress: UserCourseProgress[]): boolean => {
  let firstUnwatchedChapterId = '';
  let firstUnwatchedSubjectId = '';
  let firstUnwatchedContentId = '';

  const courseProgressById = coursesProgress?.find(cp => cp.courseId === course.id);

  outerLoop:
  for (const chapter of course.chapters) {
    for (const subject of chapter.subjects) {
      // Find the content progress for the current chapter and subject
      const currentContentProgress = courseProgressById?.contentProgress.find(cp => cp.chapterId === chapter.id && cp.subjectId === subject.id);

      // Loop through each content in the subject
      for (const content of subject.contents) {
        // Check if this content is not watched
        const isWatched = currentContentProgress?.contents.some(c => c.contentId === content.id && c.watched);
        if (!isWatched) {
          firstUnwatchedChapterId = chapter.id;
          firstUnwatchedSubjectId = subject.id;
          firstUnwatchedContentId = content.id;
          router.push(`/home/myCourses/${course.id}/chapters/${firstUnwatchedChapterId}/subjects/${firstUnwatchedSubjectId}/contents/${firstUnwatchedContentId}`);

          break outerLoop; // Break out of all loops
        }
      }
    }
  }

  return firstUnwatchedChapterId !== '' && firstUnwatchedSubjectId !== '' && firstUnwatchedContentId !== '';
}


 export function updateContentProgress(updatedContentProgress:ContentProgress[], subjectId:string, chapterId:string,contentId:string) {
    let found = false;

    for (let i = 0; i < updatedContentProgress.length; i++) {
        if (updatedContentProgress[i].subjectId === subjectId && updatedContentProgress[i].chapterId === chapterId) {
            // If content array does not exist, initialize it
            if (!updatedContentProgress[i].contents) {
                updatedContentProgress[i].contents = [];
            }

            // Add new content object
            updatedContentProgress[i].contents.push({ contentId, watched: true });
            found = true;
            break;
        }
    }

    // If no matching subjectId and chapterId were found, add a new element
    if (!found) {
        updatedContentProgress.push({
            subjectId: subjectId,
            chapterId: chapterId,
            contents: [{ contentId, watched: true }]
        });
    }
}

export function calculateProgress(course: CourseData, contentProgress: ContentProgress[] | undefined): number {
  if (!course || !course.chapters) {
    // Handle cases where course or chapters are undefined
    return 0;
  }

  let courseContentNum = 0;
  let completedCourseContentNum = 0;

  for (const chapter of course.chapters) {
    if (!chapter.subjects) {
  
      continue;
    }

    for (const subject of chapter.subjects) {
      if (!subject.contents) {
        continue;
      }

      courseContentNum += subject.contents.length;
    }
  }
  if (courseContentNum === 0) {
    // Handle the case where courseContentNum is zero (avoid division by zero)
    return 0;
  }

  if (contentProgress) {
    for (const cp of contentProgress) {
      if (cp.contents) {
        completedCourseContentNum += cp.contents.length;
      }
    }
  }
  return (completedCourseContentNum / courseContentNum) * 100;
}