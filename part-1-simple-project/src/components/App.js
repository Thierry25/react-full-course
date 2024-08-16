import "../styles/App.css";
import Courses from "./Courses";
import Button from "./Button";
import Header from "./Header";
import ChooseNewCourse from "./ChooseNewCourse";
import { useState } from "react";
import initialUsers from "../initialUsers";
import initialCourses from "../initialCourses";
import AddNewCourse from "./AddNewCourse";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showAddNewCourse, setShowAddNewCourse] = useState(false);
  // Set CurrentUser
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(239);
  // Courses
  const [courses, setCourses] = useState(initialCourses);
  function handleSelectedUser(id) {
    setCurrentUser(id);
  }

  function handleAddCourse(course) {
    // Add new courseId to the currentUser
    setUsers((users) =>
      users.map((u) =>
        u.id === currentUser
          ? {
              id: u.id,
              name: u.name,
              image: u.image,
              courses: {
                enrolled: u.courses?.enrolled,
                created: u.courses?.created
                  ? [...u.courses?.created, course.id]
                  : [course.id],
              },
            }
          : u
      )
    );

    // Add new course to courses state
    setCourses((courses) => [...courses, course]);
  }

  function handleAddUser(user) {
    setUsers((users) => [...users, user]);
  }

  function handleDeleteUserEnrolledCourse(courseId) {
    setUsers((users) =>
      users.map((u) =>
        u.id === currentUser
          ? {
              id: u.id,
              name: u.name,
              image: u.image,
              courses: {
                enrolled: u.courses?.enrolled?.filter((c) => c !== courseId),
                created: u.courses?.created,
              },
            }
          : u
      )
    );
  }

  function handleDeleteCourse(courseId) {
    // Remove id from all users courses obj
    setUsers((users) =>
      users.map((u) =>
        u.id === currentUser
          ? {
              id: u.id,
              name: u.name,
              image: u.image,
              courses: {
                enrolled: u.courses?.enrolled,
                created: u.courses?.created?.filter((c) => c !== courseId),
              },
            }
          : {
              id: u.id,
              name: u.name,
              image: u.image,
              courses: {
                enrolled: u.courses?.enrolled?.filter((c) => c !== courseId),
                created: u.courses?.created,
              },
            }
      )
    );
    setCourses((courses) => courses.filter((c) => c.id !== courseId));
  }

  function handleEnrollCourse(courseId) {
    setUsers((users) =>
      users.map((u) =>
        u.id === currentUser
          ? {
              id: u.id,
              name: u.name,
              image: u.image,
              courses: {
                enrolled: u.courses?.enrolled
                  ? [...u.courses?.enrolled, courseId]
                  : [courseId],
                created: u.courses?.created,
              },
            }
          : u
      )
    );
  }

  const currentUserObject = users.find((u) => u.id === currentUser);

  return (
    <>
      <Header
        users={users}
        onAddUser={handleAddUser}
        currentUser={currentUser}
        onSetCurrentUser={handleSelectedUser}
      />
      <div className="app">
        <div className="sidebar">
          <Courses
            courses={courses}
            currentUser={currentUserObject}
            onDeleteCourse={handleDeleteUserEnrolledCourse}
            onRemoveCourse={handleDeleteCourse}
          />
          <Button
            onClick={() => setShowAddNewCourse((shown) => !shown)}
            bgColor="#9E05FF"
            textColor="#fff"
          >
            Enroll in Courses
          </Button>
          <Button onClick={() => setShowModal((shown) => !shown)}>
            Create New Course
          </Button>
          <AddNewCourse
            currentUserName={currentUserObject.name}
            showModal={showModal}
            onHandleShow={setShowModal}
            onAddCourse={handleAddCourse}
          />
        </div>
        {showAddNewCourse && (
          <ChooseNewCourse
            courses={courses}
            currentUser={currentUserObject}
            onEnrollCourse={handleEnrollCourse}
          />
        )}
      </div>
    </>
  );
}

export default App;
