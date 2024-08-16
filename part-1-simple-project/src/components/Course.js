import Button from "./Button";

export default function Course({
  course,
  currentUser,
  onDeleteCourse,
  onRemoveCourse,
}) {
  return (
    <li>
      <img src={course.thumbnail} alt={course.title} />
      <h2>{course.title}</h2>
      <p>by {course.author === currentUser.name ? "You💪" : course.author}</p>
      {course.author === currentUser.name ? (
        <div>
          {/* <Button textColor="white" bgColor="green">
            ✏️
          </Button>
          &nbsp;&nbsp; */}

          <Button
            onClick={() => onRemoveCourse(course.id)}
            textColor="#fff"
            bgColor="red"
          >
            🗑️
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => onDeleteCourse(course.id)}
          bgColor="red"
          textColor="#fff"
        >
          Drop
        </Button>
      )}
    </li>
  );
}
