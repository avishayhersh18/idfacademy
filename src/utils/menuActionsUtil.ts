
// import axios from "axios";
// import { UserRequestsCourse } from "@/app/types";
// import useCoursesStore from "@/app/_contexts/courseContext";
// import useUserRequestCourseStore from "@/app/_contexts/requestsCoursesContext";
// import useUserStore from "@/app/_contexts/userContext";
// import { NavBarText } from "@/HebrewStrings/Texts";

// export const requestHandlerUserCourses = async (formData: FormData, rowInfo: string="",href:string="") => {

//     const { user, setUserCourses, setAdminCourses, setCourseProgress } = useUserStore();

//     const userType:string=(rowInfo!=="")?((rowInfo === NavBarText.myCourses) ? "4" : "1"):"4"
//     formData.append("userType", userType);
//     console.log(href,rowInfo)
//     const response = await axios.get("/api/getUserCourses/" + user.id + "|" + userType);
    
//     if (response.data.message) {
//         console.log("Error fetching data");
//     } else {
//         const ids = response.data.coursesIds;
//         const courses =  getCoursesByIds(ids);

//         if (userType === "4") {
//             setUserCourses(courses);
//             setCourseProgress(response.data.coursesProgress);
//         } else if (userType === "1") {
//             setAdminCourses(courses);
//         }
//     }
// }

// export const requestUserPremision = async (href:string) => {
//     const { courses } = useCoursesStore();
//     const { setUserRequestsCourse } = useUserRequestCourseStore();
//     const { user } = useUserStore();

//     const response = await axios.get("/api/getUserCourseRequests/" + user.id);
    
//     if (response.data.message) {
//         console.log("Error fetching data");
//     } else {
//         const requests: UserRequestsCourse[] = response.data.map((request: { user: any, courseId: string }) => {
//             return {
//                 user: request.user,
//                 course: courses.find((course) => course.id === request.courseId)
//             };
//         });

//         setUserRequestsCourse(requests);
//     }
// }
