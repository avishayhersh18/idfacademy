export const CourseCardStyles = {
  cardContainer: `max-w-sm rounded-lg overflow-hidden shadow-lg border border-gray-300 bg-slate-200 m-4 text-right`,
  presentModeHeight: `h-4/5`,
  cardPadding: `p-4`,
  courseTitle: `font-bold text-xl mb-2`,
  courseSubTitle: `text-sm text-gray-500`,
  mediaViewer: ``, // Add specific styles for MediaViewer if needed
  errorMessage: ``, // Add specific styles for ErrorMessage if needed
  presentCourseButton: `p-2 ml-1 bg-yellow-500 text-white rounded hover:bg-yellow-600`,
  continueButton: `p-2 ml-1 bg-green-500 text-white rounded hover:bg-green-600`,
  progressBarContainer: `flex flex-col items-end gap-y-2`,
};

export const ErrorMessageStyles = {
  container: "flex items-center flex-row border rounded-xl",
  warning: "bg-green-200",
  error: "bg-red-600",
  alert: "flex flex-row py-1",
  icon: "stroke-current shrink-0 h-8 w-8 px-2",
  message: "pt-1",
};

export const MediaViewerStyles = {
  container: (isPresentMode: boolean) =>
    `overflow-hidden flex justify-center items-center ${
      isPresentMode ? "w-[700px] h-[500px]" : "w-[100%] h-[250px]"
    }`,
  loading: `text-center text-white`,
  error: `text-center text-red-500`,
  mediaImage: `w-full max-h-full object-contain`,
  mediaVideo: `w-screen max-h-full object-contain`,
  mediaAudio: `w-screen`,
  textContainer: `flex items-start bg-white media-container w-screen max-h-full p-4 overflow-y-auto`,
  textContent: `w-[700px] h-[400px] max-h-full text-right`,
  downloadLink: `text-white bg-black`,
};
