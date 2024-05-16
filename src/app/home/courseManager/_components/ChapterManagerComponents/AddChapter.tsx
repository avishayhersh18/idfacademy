import ErrorMessage from '@/app/home/_component/ErrorMessage';
import React, { useEffect } from 'react';

interface AddChapterFormProps {
    newChapterName: string;
    setNewChapterName: (name: string) => void;
    newChapterBrief: string;
    setNewChapterBrief: (brief: string) => void;
    handleAddChapter: () => void;
    setIsAddChapterPressed: (isPressed: boolean) => void;
    addChapterError: string;
    editTexts: any; 
    GeneralTexts: any; 
}

const AddChapterForm: React.FC<AddChapterFormProps> = ({
    newChapterName,
    setNewChapterName,
    newChapterBrief,
    setNewChapterBrief,
    handleAddChapter,
    setIsAddChapterPressed,
    addChapterError,
    editTexts,
    GeneralTexts
}) => {
    useEffect(()=>{
        setNewChapterName("")
        setNewChapterBrief("")
    },[])
    return (
        
        <div className="bg-white p-6 rounded shadow max-w-md mx-auto mt-10 flex flex-col space-y-4">
            <input
                type="text"
                placeholder={editTexts.chapterName}
                value={newChapterName}
                onChange={(e) => setNewChapterName(e.target.value)}
                className="p-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
            <input
                type="text"
                placeholder={editTexts.chapterBrief}
                value={newChapterBrief}
                onChange={(e) => setNewChapterBrief(e.target.value)}
                className="p-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
            />
            <button
                onClick={handleAddChapter}
                className="bg-green-500 text-white p-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
            >
                {GeneralTexts.submit}
            </button>
            <button
                onClick={() => setIsAddChapterPressed(false)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            >
                {GeneralTexts.back}
            </button>
            {addChapterError && (
                     <ErrorMessage message={addChapterError}/>
    
            )}
        </div>
    );
};

export default AddChapterForm;
