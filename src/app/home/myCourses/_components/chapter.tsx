import React, { Dispatch, SetStateAction } from 'react';
import { usePathname, useRouter } from 'next/navigation'; // Import from next/navigation
import { ChapterData } from '@/app/types';

interface ChapterProps {
  courseid: string;
  chapter: ChapterData;
  isRegister:boolean;
  setRegistererror:Dispatch<SetStateAction<string>>;
}

const Chapter: React.FC<ChapterProps> = ({ chapter, courseid,isRegister,setRegistererror }) => {
  const router = useRouter();
  const currentPath = usePathname();

  const navigateToChapter = (chapterId: string, courseid: string) => {
    setRegistererror("")
    if(isRegister){
    const newPath = `${currentPath}/${chapterId}/subjects`;
    router.push(newPath);
    }
    else{
      setRegistererror("אתה עדייו לא רשום קורס")
      setTimeout(() => {
        setRegistererror("")
      }, 3);
    }
  };

  return (
    <button className='bg-gray-500 min-w-90% text-center my-1' onClick={() => navigateToChapter(chapter.id, courseid)} >
      {chapter.name}
    </button>
  );
};

export default Chapter;
