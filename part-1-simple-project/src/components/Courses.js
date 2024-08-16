import Course from "./Course";

export default function CurrentUserCourses({
  courses,
  currentUser,
  onDeleteCourse,
  onRemoveCourse,
}) {
  const enrolledIds = currentUser.courses?.enrolled;
  const createdIds = currentUser.courses?.created;

  const enrolledCourses =
    enrolledIds && enrolledIds.map((id) => courses.find((c) => c.id === id));

  const createdCourses =
    createdIds && createdIds.map((id) => courses.find((c) => c.id === id));

  if (!enrolledCourses && !createdCourses) {
    return <h3>Start enrolling in courses or creating your own</h3>;
  }
  return (
    <>
      {enrolledCourses && enrolledCourses.length > 0 && (
        <>
          <h2>Enrolled Courses</h2>
          <ul>
            {enrolledCourses.map((course) => (
              <Course
                onDeleteCourse={onDeleteCourse}
                key={course.id}
                course={course}
                currentUser={currentUser}
              />
            ))}
          </ul>
        </>
      )}
      {createdCourses && createdCourses.length > 0 && (
        <>
          <h2>Created Courses</h2>
          <ul>
            {createdCourses.map((cC) => (
              <Course
                onRemoveCourse={onRemoveCourse}
                onDeleteCourse={onDeleteCourse}
                key={cC.id}
                currentUser={currentUser}
                course={cC}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
}
