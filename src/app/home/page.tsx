"use client";
import { HomeTexts, editTexts } from "@/HebrewStrings/Texts";
import { useEffect } from "react";
import useCoursesStore from "../_contexts/courseContext";
import axios from "axios";
import useUserStore from "../_contexts/userContext";
import { findFirstUnwatched } from "@/utils/progressUtils";
import { CourseData, UserCourseProgress } from "../types";
import { useRouter } from "next/navigation";
import Illustration from "@/app/assets/Education-illustration.svg";
import Image from "next/image"; // Assuming you have imported the Image component correctly
import PopularCourses from "./_component/popularCourses";
import SearchCourseHomePage from "./_component/searchCourseHomePage";

const HomePage = () => {
  const { setCourses, courses } = useCoursesStore();
  const {
    user,
    userCourses,
    coursesProgress,
    setUser,
    setUserCourses,
    setAdminCourses,
  } = useUserStore();
  // const router = useRouter();

  function getHebrewGreeting(): string {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return HomeTexts.goodMorning;
    } else if (currentHour < 18) {
      return HomeTexts.goodAfterNoon;
    } else {
      return HomeTexts.goodEvening;
    }
  }

  return (
    <>
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-black text-6xl font-bold font-assistant">
          !התחילו ללמוד אצלנו היום
        </h1>
        <h2 className="text-black text-2xl font-assistant font-semibold">
          חפשו בין ה{courses.length} קורסים הזמינים ללמידה
        </h2>
      </div>
      <div className="my-3 flex justify-center">
        <SearchCourseHomePage />
      </div>
      <Image src={Illustration} alt={""} />
      <PopularCourses />
    </>
  );
};

export default HomePage;
