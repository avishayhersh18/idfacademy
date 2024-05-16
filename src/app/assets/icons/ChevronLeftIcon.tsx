import React from 'react';

const ChevronLeftIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...props}>
      <path d="M10 16L4 9l6-7 1.4 1.4-4.6 5.6H18v2H6.8l4.6 5.6z" />
    </svg>
  );
};

export default ChevronLeftIcon;