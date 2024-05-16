import useCoursesStore from "@/app/_contexts/courseContext";
import CourseCard from "./courseCard";

const PopularCourses = () => {
  const { courses } = useCoursesStore();

  // Sort courses by subscribe_num in descending order and take the top 20
  const popularCourses = courses
    .slice()
    .sort((a, b) => b.subscribe_num - a.subscribe_num)
    .slice(0, 20);

  return (
    <div className="w-full bg-gradient-to-b from-sky-50 to-transparent">
      <h1 className="text-end  text-black text-4xl font-bold font-assistant px-8  my-4">קורסים פופלרים</h1>
      <div className="flex flex-wrap justify-end gap-4">
        {popularCourses.length > 0 ? (
          popularCourses.map((course, index) => (
            <div
              key={index}
              className={`w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 2xl:w-1/6 ${
                // Calculate order based on the index to reverse the order
                `order-${popularCourses.length - index}`
              }`}
            >
              <CourseCard course={course} isPresentMode={false} />
            </div>
          ))
        ) : (
          <p className="text-center">No popular courses found.</p>
        )}
      </div>
    </div>
  );
};

export default PopularCourses;
