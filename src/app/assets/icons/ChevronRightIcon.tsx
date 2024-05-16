import React from 'react';

const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" {...props}>
      <path d="M8 2l6 7-6 7-1.4-1.4 4.6-5.6H0V7h12.2l-4.6-5.6z" />
    </svg>
  );
};

export default ChevronRightIcon;