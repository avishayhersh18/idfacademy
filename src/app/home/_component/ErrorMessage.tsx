import React from 'react';
import { Alert } from 'react-daisyui';

interface ErrorMessageProps {
    message: string;
    warning?:boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message,warning }) => {
    if (!message) return null;

    return (
        <div className={`flex items-center flex-rowborder rounded-xl ${warning?'bg-green-200':'bg-red-600' }`}>
            <Alert
                className='flex flex-row py-1 '
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-8 w-8 px-2" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                }
            >
                <span className='pt-1'>{message}</span>
            </Alert>
        </div>
    );
};

export default ErrorMessage;
