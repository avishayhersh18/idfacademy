import React, { useState } from 'react';
import { editTexts, GeneralTexts } from "@/HebrewStrings/Texts";

interface AddChapterFormProps {
  onAddChapter: (name: string, brief: string) => void;
  onCancel: () => void;
  addChapterError: string;
}

export const AddChapterForm:React.FC<AddChapterFormProps> = ({ onAddChapter, onCancel, addChapterError }) => {
  const [chapterName, setChapterName] = useState('');
  const [chapterBrief, setChapterBrief] = useState('');

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto mt-10 flex flex-col space-y-4">
      <input
        type="text"
        placeholder={editTexts.chapterName}
        value={chapterName}
        onChange={(e) => setChapterName(e.target.value)}
        className="p-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
      />
      <input
        type="text"
        placeholder={editTexts.chapterBrief}
        value={chapterBrief}
        onChange={(e) => setChapterBrief(e.target.value)}
        className="p-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={() => onAddChapter(chapterName, chapterBrief)}
        className="bg-green-500 text-white p-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
      >
        {GeneralTexts.submit}
      </button>
      <button
        onClick={onCancel}
        className="bg-red-500 text-white p-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
      >
        {GeneralTexts.back}
      </button>
      {addChapterError && (
        <div className="text-red-500">
          Error: {addChapterError}
        </div>
      )}
    </div>
  );
};
