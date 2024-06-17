import React from "react";
import { Alert } from "react-daisyui";
import { ErrorMessageStyles } from "@/app/assets/design";

interface ErrorMessageProps {
  message: string;
  warning?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, warning }) => {
  if (!message) return null;

  return (
    <div
      className={`${ErrorMessageStyles.container} ${
        warning ? ErrorMessageStyles.warning : ErrorMessageStyles.error
      }`}
    >
      <Alert
        className={ErrorMessageStyles.alert}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={ErrorMessageStyles.icon}
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
      >
        <span className={ErrorMessageStyles.message}>{message}</span>
      </Alert>
    </div>
  );
};

export default ErrorMessage;
