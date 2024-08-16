import Button from "./Button";
import { useState } from "react";
export default function ChooseNewCourse({
  courses,
  currentUser,
  onEnrollCourse,
}) {
  const [filterBy, setFilterBy] = useState("none");
  const unEnrolledCourses = courses
    .slice()
    .filter((c) => c.author !== currentUser.name)
    .filter((c) => !currentUser.courses?.enrolled?.includes(c.id));
  console.log(unEnrolledCourses);
  let filteredCourses;
  if (filterBy === "none") {
    filteredCourses = unEnrolledCourses;
  } else if (filterBy === "title") {
    filteredCourses = unEnrolledCourses.sort((course1, course2) =>
      course1.title.localeCompare(course2.title)
    );
  } else if (filterBy === "author") {
    filteredCourses = unEnrolledCourses.sort((course1, course2) =>
      course1.author.localeCompare(course2.author)
    );
  }
  return (
    <form className="form-enroll-course">
      <h2>Enroll in new course</h2>
      <select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
        <option value="none">Original List</option>
        <option value="title">Filter by course name</option>
        <option value="author">Filter by author name</option>
      </select>
      <br />
      {filteredCourses && filteredCourses.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <tbody>
              <tr>
                <th></th>
                <th>Author</th>
                <th>Title</th>
                <th></th>
              </tr>
              {filteredCourses.map((c) => (
                <tr key={c.id}>
                  <td>
                    <img
                      style={{
                        borderRadius: "50%",
                        width: "100%",
                        textAlign: "center",
                        gridRow: "span 2",
                      }}
                      src={c.thumbnail}
                      alt="course thumbnail"
                    />
                  </td>
                  <td>{c.author}</td>
                  <td>{c.title}</td>
                  <td>
                    <Button onClick={() => onEnrollCourse(c.id)}>Enroll</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>You're currently enrolled in all our courses</p>
      )}
    </form>
  );
}
