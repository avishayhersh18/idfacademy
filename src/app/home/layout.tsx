"use client";
import "../globals.css";
import { Inter } from "next/font/google";
import Sidebar from "./_component/SideBar";
import Navbar from "./_component/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import useCoursesStore from "../_contexts/courseContext";
import { User } from "next-auth";
import useUserStore from "../_contexts/userContext";
import useUserRequestCourseStore from "../_contexts/requestsCoursesContext";
import { Loading } from "react-daisyui";
import Illustration from "@/app/assets/Education-illustration.svg";
import Image from "next/image";
import useAppState from "../_contexts/globalContext";
import { CourseData } from "../types";

const inter = Inter({ subsets: ["latin"] });

enum Users {
  Admin = 1,
  Editor = 2,
  Creator = 3,
  User = 4,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setCourses, courses } = useCoursesStore();
  const {
    user,
    userCourses,
    adminCourses,
    coursesProgress,
    setUser,
    setUserCourses,
    setAdminCourses,
    setSpecificCourseProgress,
    setCoursesProgress,
  } = useUserStore();
  const { setAllMyRequestToCourses } = useUserRequestCourseStore();

  const [isLoading, setIsLoading] = useState(true);
  const { setIsSmallScreen, isSmallScreen } = useAppState();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 786);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getCoursesByIds = (corusesFromDb: CourseData[], ids: string[]) => {
    return ids ? corusesFromDb.filter((course) => ids.includes(course.id)) : [];
  };

  const getData = async () => {
    const response = await axios.get("/api/getData/");
    if (response.data.message) {
      console.log("error to fetch data");
    } else {
      setUser(response.data.user);
      setCourses(response.data.courses);
      const userCoursesFromDb = getCoursesByIds(
        response.data.courses,
        response.data.userCoursesIds
      );
      // console.log(userCoursesFromDb)
      setUserCourses(userCoursesFromDb);
      setCoursesProgress(response.data.userCourseProgress);
      setAllMyRequestToCourses(response.data.userAllRequestsCourse);
      setIsLoading(false);

      console.log("data from db :", response.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <html>
      <body className={inter.className}>
        <div className="relative">
          <main className="min-h-screen bg-gradient-to-b from-sky-100 to-transparent">
            {isLoading ? (
              <div className="flex flex-col justify-between items-center min-w-full">
                <div className="m-8">
                  <Loading size="lg" />
                </div>
                <Image src={Illustration} alt={""} />
              </div>
            ) : (
              <div className="flex flex-col justify-between items-center gap-10 w-full">
                <div className="absolute top-0 h-full max-w-64"></div>
                {user && <Navbar userType={Users.Admin} />}
                <div className="flex flex-col">
                  <>
                    {/* Main Content */}
                    {children}
                  </>
                  {user && isSmallScreen && (
                    <div className="absolute top-32 right-0 h-full max-w-64">
                      {/* Sidebar */}
                      <Sidebar userType={Users.Admin} />
                    </div>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>
      </body>
    </html>
  );
}
function setAllMyRequestToCourses(userAllRequestsCourse: any) {
  throw new Error("Function not implemented.");
}
