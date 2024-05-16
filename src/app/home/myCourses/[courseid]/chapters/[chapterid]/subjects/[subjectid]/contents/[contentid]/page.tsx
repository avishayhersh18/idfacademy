  "use client"
  import React, { useEffect, useState } from 'react';
  import MediaViewer from '@/app/home/_component/mediaViewer';
  import VideoLinkList from '../_components/videoLinkList';
  import useCoursesStore from '@/app/_contexts/courseContext';
  import { ContentData, ContentItemProgress, ContentProgress } from '@/app/types';
  import useUserStore from '@/app/_contexts/userContext';
  import axios from 'axios';
  import { updateContentProgress } from '@/utils/progressUtils';

  import { Button,Pagination } from 'react-daisyui';
  import ChevronRightIcon from '@/app/assets/icons/ChevronRightIcon';
  import ChevronLeftIcon from '@/app/assets/icons/ChevronLeftIcon';


  interface ContentListProps {
    params: {
      courseid: string;
      chapterid: string;
      subjectid: string;
      contentid?:string;
    };
  }

  const ContentList: React.FC<ContentListProps> = ({ params }) => {
    const { courses } = useCoursesStore();
    const {user,coursesProgress,markContentAsWatched,ContentsSubjectStatus } = useUserStore();
    const subjectId = params.subjectid;

    const chapterId = params.chapterid;
    const courseId = params.courseid;

    const courseToPresent = courses.find(course => course.id === courseId);
    const subjectTitleName=courseToPresent?.chapters.find((chapter)=>chapter.id===chapterId)?.subjects.find((subject)=>subject.id===subjectId)?.name
    const contentsToPresent:ContentData[]|undefined = courseToPresent?.chapters?.find(chapter => chapter.id === chapterId)?.subjects.find(subject => subject.id === subjectId)?.contents;
    const userState = useUserStore(); // This is how you access the state

    const contentsStatus:ContentItemProgress[]|undefined =ContentsSubjectStatus(userState,courseId, chapterId, subjectId);
    const [contentIndex, setContentIndex] = useState<number>(0);
    
    const [currContent, setCurrContent] = useState<ContentData | undefined>(contentsToPresent?.find(content=>content.id===params.contentid));
    useEffect(()=>{
      const curContentStatus=contentsStatus?.find(contentstatus=>contentstatus.contentId===currContent?.id)
      if(currContent)
        onVideoSelect(currContent,curContentStatus)}
      ,[])
    useEffect(()=>{
        const curContentStatus=contentsStatus?.find(contentstatus=>contentstatus.contentId===currContent?.id)
        if(currContent)
          onVideoSelect(currContent,curContentStatus)}
    ,[currContent])
    


    const onVideoSelect = async(content: ContentData,contentStatus:ContentItemProgress|undefined) => {
      const newIndex = contentsToPresent?.findIndex((c) => c.id === content?.id);
      if (typeof newIndex === 'number' && newIndex >= 0 &&contentsToPresent!==undefined) {
        setContentIndex(newIndex);
        setCurrContent(contentsToPresent[newIndex]);
        if(!contentStatus?.watched||contentStatus){ 
        
          try {
            let formData = new FormData();
            formData.append("courseId", courseId);
            formData.append("userId", user.id);
            formData.append("lastChapterId", chapterId); 
            formData.append("lastSubjectId", subjectId); 
            formData.append("firstUnwatchedContentId", contentsToPresent[newIndex].id);

            const updatedContentProgress:ContentProgress[]|undefined= coursesProgress?.find(courseProgress => courseProgress.courseId === courseId)?.contentProgress;
            let newupdatedContentProgress=updatedContentProgress?updatedContentProgress:[];
            formData.append("contentProgress", JSON.stringify(newupdatedContentProgress));
            const response = await axios.post('/api/updateProgressCourse', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if(!response.data.message)
            markContentAsWatched(courseId, chapterId, subjectId, contentsToPresent[newIndex].id);// No optional chaining needed, newIndex is a number
            else{
              console.log('ERRROR');
            }
        } catch (error) {
            console.error('Error updating course progress:', error);
        }
        } 
      }
    };
    
    const goToNextContent = () => {
      if (contentsToPresent && contentIndex < contentsToPresent.length - 1) {
        setContentIndex(contentIndex + 1);
        setCurrContent(contentsToPresent[contentIndex + 1]);
      }
    };

    const goToPreviousContent = () => {
      if (contentIndex > 0 &&contentsToPresent!==undefined) {
        setContentIndex(contentIndex - 1);
        setCurrContent(contentsToPresent[contentIndex - 1]);
      }
    };
    return (
      <div className="flex flex-col h-screen mr-11">
        <h1 className='text-center'>{subjectTitleName}</h1>
        <div className="flex justify-between items-start m-4 bg-gray-500 p-4 rounded">
          <div className="flex-1 flex justify-center items-center">
            {currContent ? (
              <div
                className="flex justify-center items-center"
                style={{
                  width: '500px',
                  backgroundColor: 'rgba(128, 128, 128, 0.2)',
                  borderRadius: '5%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 1px 2px rgba(6, 30, 58, 0.1)',
                  overflow: 'hidden',
                }}
              >
                <MediaViewer content={currContent} isPresentMode={true} />
              </div>
            ) : (
              <div className="text-white">No content selected or available</div>
            )}
          </div>
          <div className="flex flex-col items-center" style={{ width: '250px'   }}>
            <VideoLinkList
              contents={contentsToPresent}
              onVideoSelect={onVideoSelect}
              contentsStatus={contentsStatus}
              subjectTitleName={subjectTitleName}
            />
              <div className="mt-4">
          <Pagination>
          <Button
            variant="outline"
            className="join-item"
            onClick={goToPreviousContent}
            disabled={contentIndex === 0}
          >
            <ChevronLeftIcon />
        </Button>
         <Button
            variant="outline"
            className="join-item"
            onClick={goToNextContent}
            disabled={!contentsToPresent || contentIndex === contentsToPresent.length - 1}
          >
            <ChevronRightIcon />
      </Button>

          </Pagination>
        </div>
          </div>
        </div>
      </div>
    );
            }
  export default ContentList;