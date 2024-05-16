import { CourseCardTexts } from '@/HebrewStrings/Texts';
import React from 'react';

interface ProgressPropsType {
  value: number;
}

const ProgressBar: React.FC<ProgressPropsType> = ({ value }) => {
  const progressStyle = {
    width: `${value}%`,
    backgroundColor: 'green',
    height: '20px',
    borderRadius: '4px',
  };

  return (
    <div className='min-w-full'>
        <p>{CourseCardTexts.progress} {value}%</p>
      <div className="progress-container border rounded-md bg-gray-300">
        <div className="progress-bar" style={progressStyle}></div>
      </div>
    </div>
  );
};

export default ProgressBar;